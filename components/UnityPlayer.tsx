"use client";

import { useEffect, useRef, useState } from "react";
import { addLocalEncounter, discoveredSlugs } from "@/lib/encounters-client";
import { ACHIEVEMENTS, type AchievementRun } from "@/lib/achievements";

declare global {
  interface Window {
    createUnityInstance?: (
      canvas: HTMLCanvasElement,
      config: Record<string, unknown>,
      onProgress?: (progress: number) => void,
    ) => Promise<UnityInstance>;
    __unity?: UnityInstance;
    __omk?: {
      submitScore: (score: number, meta?: Record<string, unknown>) => Promise<void>;
      encounter: (slug: string) => void;
      requestUnlocks: () => void;
    };
  }
}

// Evaluates the same client-side achievement set the /achievements page renders and
// hands the earned slugs into the game (wardrobe unlocks, game #89). Pushed once on
// ready and re-sent whenever the game pulls via OMK_RequestUnlocks (each Menu load).
async function sendUnlocks(unity: UnityInstance) {
  try {
    const [runsRes, discovered] = await Promise.all([
      fetch("/api/runs").then((r) => r.json() as Promise<{ runs: AchievementRun[] }>),
      discoveredSlugs(),
    ]);
    const earned = ACHIEVEMENTS.filter((a) =>
      a.earned(runsRes.runs ?? [], discovered.size),
    ).map((a) => a.slug);
    unity.SendMessage("Unlocks", "OMK_SetUnlocks", earned.join(","));
  } catch {
    // Signed out or offline: no unlocks to report; the game keeps its cached set.
  }
}

type UnityInstance = {
  SendMessage: (obj: string, method: string, arg?: string | number) => void;
  SetFullscreen: (on: number) => void;
  Quit: () => Promise<void>;
};

const BUILD_URL = "/game/Build";

export default function UnityPlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // CSS pseudo-fullscreen (game #97): the real Fullscreen API is unavailable on
  // iPhones, so "fullscreen" is a fixed-inset overlay that works everywhere.
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    if (!maximized) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMaximized(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [maximized]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let instance: UnityInstance | undefined;
    let cancelled = false;

    const script = document.createElement("script");
    script.src = `${BUILD_URL}/WebGL.loader.js`;
    script.onload = () => {
      if (cancelled || !window.createUnityInstance) return;
      window
        .createUnityInstance(
          canvas,
          {
            arguments: [],
            dataUrl: `${BUILD_URL}/WebGL.data.unityweb`,
            frameworkUrl: `${BUILD_URL}/WebGL.framework.js.unityweb`,
            codeUrl: `${BUILD_URL}/WebGL.wasm.unityweb`,
            streamingAssetsUrl: "StreamingAssets",
            companyName: "DefaultCompany",
            productName: "One More Knight",
            productVersion: "1.0",
          },
          (p) => setProgress(p),
        )
        .then((unity) => {
          if (cancelled) {
            unity.Quit();
            return;
          }
          instance = unity;
          window.__unity = unity;
          // Bridge for the game's .jslib calls (score submission + bestiary).
          window.__omk = {
            async submitScore(score, meta) {
              await fetch("/api/scores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ score, meta }),
              });
            },
            encounter(slug) {
              addLocalEncounter(slug);
              fetch("/api/encounters", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug }),
              }).catch(() => {});
            },
            requestUnlocks() {
              void sendUnlocks(unity);
            },
          };
          void sendUnlocks(unity);
          setReady(true);
        })
        .catch((message) => setError(String(message)));
    };
    script.onerror = () => setError("failed to load the game loader script");
    document.body.appendChild(script);

    return () => {
      cancelled = true;
      instance?.Quit();
      delete window.__unity;
      delete window.__omk;
      script.remove();
    };
  }, []);

  return (
    <div
      className={
        maximized
          ? "fixed inset-0 z-50 flex items-center justify-center bg-black"
          : "relative flex flex-col items-center gap-2.5"
      }
    >
      <canvas
        ref={canvasRef}
        id="unity-canvas"
        width={960}
        height={600}
        tabIndex={-1}
        className={
          maximized
            ? "aspect-[960/600] max-h-full max-w-full touch-none bg-black landscape:h-full landscape:w-auto portrait:w-full portrait:h-auto"
            : "aspect-[960/600] w-full max-w-[960px] touch-none rounded-md border border-night-line bg-black"
        }
      />
      {!ready && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-parchment-muted">
          <div className="h-2.5 w-64 overflow-hidden rounded-full border border-gold">
            <div
              className="h-full bg-gold transition-[width] duration-200"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p>Summoning the knight…</p>
        </div>
      )}
      {error && <p className="text-red-400">The game failed to load: {error}</p>}
      {ready && !maximized && (
        <button
          onClick={() => setMaximized(true)}
          className="self-end cursor-pointer rounded border border-night-line px-3 py-1 text-sm text-parchment-muted transition-colors hover:border-gold hover:text-gold"
        >
          Fullscreen
        </button>
      )}
      {maximized && (
        <>
          <button
            onClick={() => setMaximized(false)}
            className="absolute right-3 top-3 z-10 cursor-pointer rounded border border-night-line bg-night-raised px-3 py-1 text-sm text-parchment-muted transition-colors hover:border-gold hover:text-gold"
          >
            ✕ Exit
          </button>
          <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center portrait:flex">
            <p className="rounded bg-night-raised/90 px-4 py-2 text-parchment">
              ⟳ Rotate your device — the battlefield is wide.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
