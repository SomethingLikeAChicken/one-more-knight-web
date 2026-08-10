"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import UnityPlayer from "@/components/UnityPlayer";

/** The practice room: the page URL carries ?arena=<Slug>, which the Unity boot
 *  reads from Application.absoluteURL and turns into a one-type duel. */
export default function ArenaPage() {
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("arena");
    setTarget(slug);
  }, []);

  if (target === null) {
    return (
      <p className="text-parchment-muted">
        No duel chosen. Pick an opponent from the{" "}
        <Link href="/wiki" className="text-gold hover:underline">
          bestiary
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-parchment-muted">
        Dueling <span className="text-gold">{target}</span> — it returns forever; leave when
        you've learned it.{" "}
        <Link href={`/wiki/${target}`} className="text-gold hover:underline">
          Back to its page
        </Link>
      </p>
      <UnityPlayer />
    </div>
  );
}
