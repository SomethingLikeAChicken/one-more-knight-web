"use client";

import { useEffect, useState } from "react";
import { ACHIEVEMENTS, type AchievementRun } from "@/lib/achievements";
import { discoveredSlugs } from "@/lib/encounters-client";

export default function AchievementsPage() {
  const [runs, setRuns] = useState<AchievementRun[] | null>(null);
  const [discovered, setDiscovered] = useState(0);
  const [signedIn, setSignedIn] = useState(true);

  useEffect(() => {
    (async () => {
      const [runsRes, found] = await Promise.all([
        fetch("/api/runs").then((r) => r.json()).catch(() => ({ runs: [] })),
        discoveredSlugs(),
      ]);
      setRuns(runsRes.runs ?? []);
      setDiscovered(found.size);
      const session = await fetch("/api/auth/session").then((r) => r.json()).catch(() => null);
      setSignedIn(!!session?.user);
    })();
  }, []);

  if (runs === null) return <p className="text-parchment-muted">Consulting the chronicles…</p>;

  const earned = ACHIEVEMENTS.filter((a) => a.earned(runs, discovered));

  return (
    <div>
      <h1 className="mb-1 text-2xl text-gold">Achievements</h1>
      <p className="mb-2 text-parchment-muted">
        {earned.length} of {ACHIEVEMENTS.length} earned across {runs.length} recorded runs.
      </p>
      {!signedIn && (
        <p className="mb-4 text-sm text-parchment-muted">
          Sign in so your runs are recorded — achievements are read from your run history.
        </p>
      )}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a) => {
          const got = a.earned(runs, discovered);
          return (
            <div
              key={a.slug}
              className={`rounded-md border p-4 ${
                got ? "border-gold bg-night-raised" : "border-night-line bg-night-raised opacity-55"
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="text-lg">{got ? "🏅" : "🔒"}</span>
                <span className={got ? "text-gold" : "text-parchment"}>{a.name}</span>
              </div>
              <p className="text-sm leading-relaxed text-parchment-muted">{a.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
