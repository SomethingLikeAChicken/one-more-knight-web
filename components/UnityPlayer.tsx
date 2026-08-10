"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    createUnityInstance?: (
      canvas: HTMLCanvasElement,
      config: Record<string, unknown>,
      onProgress?: (progress: number) => void,
    ) => Promise<UnityInstance>;
    __unity?: UnityInstance;
    __omk?: { submitScore: (score: number, meta?: Record<string, unknown>) => Promise<void> };
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
          // Bridge for the game's future score submission (.jslib calls this).
          window.__omk = {
            async submitScore(score, meta) {
              await fetch("/api/scores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ score, meta }),
              });
            },
          };
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
    <div className="relative flex flex-col items-center gap-2.5">
      <canvas
        ref={canvasRef}
        id="unity-canvas"
        width={960}
        height={600}
        tabIndex={-1}
        className="aspect-[960/600] w-full max-w-[960px] rounded-md border border-night-line bg-black"
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
      {ready && (
        <button
          onClick={() => window.__unity?.SetFullscreen(1)}
          className="self-end cursor-pointer rounded border border-night-line px-3 py-1 text-sm text-parchment-muted transition-colors hover:border-gold hover:text-gold"
        >
          Fullscreen
        </button>
      )}
    </div>
  );
}
