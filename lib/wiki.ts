import { promises as fs } from "fs";
import path from "path";

export type WikiEntry = {
  slug: string;
  kind: "enemy" | "boss";
  name: string;
  hp: number;
  description: string;
  tactics?: string;
  sprite: string;
  // enemy-only
  speed?: number;
  score?: number;
  shoots?: boolean;
  miniboss?: boolean;
  cursed?: boolean;
  // boss-only
  difficulty?: number;
  reward?: number;
  phases?: number;
  contact?: number;
};

let cache: WikiEntry[] | undefined;

/** The bestiary data exported from Unity (public/wiki/wiki.json). */
export async function wikiEntries(): Promise<WikiEntry[]> {
  if (!cache) {
    const file = path.join(process.cwd(), "public", "wiki", "wiki.json");
    const parsed = JSON.parse(await fs.readFile(file, "utf-8")) as { entries: WikiEntry[] };
    cache = parsed.entries;
  }
  return cache;
}
