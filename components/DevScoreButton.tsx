"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/** Dev-only: proves the submit → leaderboard pipeline without the game.
 *  Rendered only when DEV_LOGIN=1 and signed in (see leaderboard page). */
export default function DevScoreButton() {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);

  async function submit() {
    const score = 500 + Math.floor(Math.random() * 5000);
    const res = await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score, meta: { source: "dev-button" } }),
    });
    if (res.ok) {
      setStatus(`submitted ${score}`);
      router.refresh();
    } else {
      const body = await res.json().catch(() => ({}));
      setStatus(`error ${res.status}: ${body.error ?? "unknown"}`);
    }
  }

  return (
    <p className="mt-6 flex items-center gap-3 text-parchment-muted">
      <button
        onClick={submit}
        className="cursor-pointer rounded border border-night-line px-3 py-1 text-sm transition-colors hover:border-gold hover:text-gold"
      >
        Submit random test score
      </button>
      {status && <span className="text-sm">{status}</span>}
    </p>
  );
}
