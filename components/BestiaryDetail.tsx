"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { WikiEntry } from "@/lib/wiki";
import { discoveredSlugs } from "@/lib/encounters-client";

/* eslint-disable @next/next/no-img-element -- pixel-art sprite, no optimization wanted */

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded border border-night-line bg-night-raised px-4 py-2 text-center">
      <div className="text-xs uppercase tracking-wider text-parchment-muted">{label}</div>
      <div className="text-lg text-parchment">{value}</div>
    </div>
  );
}

export default function BestiaryDetail({ entry }: { entry: WikiEntry }) {
  const [discovered, setDiscovered] = useState<boolean | null>(null);

  useEffect(() => {
    discoveredSlugs().then((set) => setDiscovered(set.has(entry.slug)));
  }, [entry.slug]);

  if (discovered === null) {
    return <p className="text-parchment-muted">Consulting the chronicles…</p>;
  }
  if (!discovered) {
    return (
      <div className="py-10 text-center">
        <div className="mb-4 text-6xl text-night-line">?</div>
        <h1 className="mb-2 text-2xl text-gold">Unchronicled</h1>
        <p className="text-parchment-muted">
          You have not met this {entry.kind} yet. Its page will be written when you do —{" "}
          <Link href="/" className="text-gold hover:underline">
            go find it
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-6">
        <img
          src={`/wiki/${entry.sprite}`}
          alt={entry.name}
          className="h-24 w-24 object-contain [image-rendering:pixelated]"
        />
        <div>
          <h1 className="text-3xl text-gold">{entry.name}</h1>
          <span className={`text-sm uppercase tracking-wider ${entry.kind === "boss" ? "text-gold" : "text-parchment-muted"}`}>
            {entry.kind}
          </span>
        </div>
      </div>
      <p className="mb-6 max-w-xl italic leading-relaxed text-parchment">{entry.description}</p>
      <div className="mb-8 flex flex-wrap gap-3">
        <Stat label="HP" value={entry.hp} />
        {entry.kind === "enemy" && (
          <>
            <Stat label="Speed" value={entry.speed ?? "?"} />
            <Stat label="Score" value={entry.score ?? "?"} />
            <Stat label="Shoots" value={entry.shoots ? "yes" : "no"} />
          </>
        )}
        {entry.kind === "boss" && (
          <>
            <Stat label="Difficulty" value={entry.difficulty ?? "?"} />
            <Stat label="Phases" value={entry.phases ?? "?"} />
            <Stat label="Reward" value={entry.reward ?? "?"} />
          </>
        )}
        <Stat label="Contact dmg" value={entry.contact ?? 1} />
      </div>
      <Link
        href={`/arena?arena=${entry.slug}`}
        className="rounded border border-gold px-4 py-2 text-gold no-underline transition-colors hover:bg-gold hover:text-night"
      >
        ⚔ Duel it in the Arena
      </Link>
    </div>
  );
}
