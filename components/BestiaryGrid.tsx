"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { WikiEntry } from "@/lib/wiki";
import { MODIFIERS } from "@/lib/modifiers";
import { discoveredSlugs } from "@/lib/encounters-client";

/* eslint-disable @next/next/no-img-element -- pixel-art sprites, no optimization wanted */

function Card({ entry, discovered }: { entry: WikiEntry; discovered: boolean }) {
  const label = entry.miniboss ? "miniboss" : entry.kind;
  if (!discovered) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-md border border-night-line bg-night-raised p-4 opacity-60">
        <div className="flex h-16 w-16 items-center justify-center text-4xl text-night-line">?</div>
        <span className="text-sm text-parchment-muted">???</span>
        <span className="text-xs uppercase tracking-wider text-night-line">{label}</span>
      </div>
    );
  }
  return (
    <Link
      href={`/wiki/${entry.slug}`}
      className="flex flex-col items-center gap-2 rounded-md border border-night-line bg-night-raised p-4 no-underline transition-colors hover:border-gold"
    >
      <img
        src={`/wiki/${entry.sprite}`}
        alt={entry.name}
        className="h-16 w-16 object-contain [image-rendering:pixelated]"
      />
      <span className="text-sm text-parchment">{entry.name}</span>
      <span className={`text-xs uppercase tracking-wider ${entry.kind === "boss" || entry.miniboss ? "text-gold" : "text-parchment-muted"}`}>
        {label}
      </span>
    </Link>
  );
}

export default function BestiaryGrid({ entries }: { entries: WikiEntry[] }) {
  const [discovered, setDiscovered] = useState<Set<string> | null>(null);

  useEffect(() => {
    discoveredSlugs().then(setDiscovered);
  }, []);

  const found = discovered ?? new Set<string>();
  const enemies = entries.filter((e) => e.kind === "enemy" && !e.miniboss);
  const minibosses = entries.filter((e) => e.kind === "enemy" && e.miniboss);
  const bosses = entries.filter((e) => e.kind === "boss");
  const count = entries.filter((e) => found.has(e.slug)).length;

  return (
    <div>
      <p className="mb-6 text-parchment-muted">
        {discovered === null
          ? "Consulting the chronicles…"
          : `${count} of ${entries.length} entries chronicled. The rest must be met in battle first.`}
      </p>
      <h2 className="mb-3 text-lg text-parchment">Enemies</h2>
      <div className="mb-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {enemies.map((e) => (
          <Card key={e.slug} entry={e} discovered={found.has(e.slug)} />
        ))}
      </div>
      <h2 className="mb-1 text-lg text-parchment">Minibosses</h2>
      <p className="mb-3 text-sm text-parchment-muted">
        Tracked HP bars, guaranteed spoils. Worth the detour.
      </p>
      <div className="mb-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {minibosses.map((e) => (
          <Card key={e.slug} entry={e} discovered={found.has(e.slug)} />
        ))}
      </div>
      <h2 className="mb-3 text-lg text-parchment">Bosses</h2>
      <div className="mb-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {bosses.map((e) => (
          <Card key={e.slug} entry={e} discovered={found.has(e.slug)} />
        ))}
      </div>
      <h2 className="mb-1 text-lg text-parchment">Wave Modifiers</h2>
      <p className="mb-3 text-sm text-parchment-muted">
        From wave 16, some waves carry one of these — announced on the wave readout. Survive one to
        chronicle it.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MODIFIERS.map((m) => {
          const got = found.has(m.slug);
          return got ? (
            <div key={m.slug} className="rounded-md border border-night-line bg-night-raised p-4">
              <div className="mb-1 font-bold uppercase tracking-wider text-gold">{m.name}</div>
              <p className="mb-2 text-sm leading-relaxed text-parchment">{m.effect}</p>
              <p className="text-sm italic leading-relaxed text-parchment-muted">{m.advice}</p>
            </div>
          ) : (
            <div key={m.slug} className="rounded-md border border-night-line bg-night-raised p-4 opacity-55">
              <div className="mb-1 font-bold uppercase tracking-wider text-night-line">???</div>
              <p className="text-sm text-parchment-muted">An unmet omen of the deep waves.</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
