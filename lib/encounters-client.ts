"use client";

const KEY = "omk-encounters";

/** Slugs stored locally (anonymous play still fills the diary on this device). */
export function localEncounters(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function addLocalEncounter(slug: string): void {
  try {
    const all = localEncounters();
    if (!all.includes(slug)) {
      all.push(slug);
      window.localStorage.setItem(KEY, JSON.stringify(all));
    }
  } catch {
    // storage unavailable (private mode) - the account copy still works
  }
}

/** Union of account + device discoveries; syncs device-only ones up when signed in. */
export async function discoveredSlugs(): Promise<Set<string>> {
  const local = localEncounters();
  let account: string[] = [];
  try {
    const res = await fetch("/api/encounters");
    if (res.ok) account = ((await res.json()) as { slugs: string[] }).slugs;
  } catch {
    // offline is fine - device copy carries it
  }
  const merged = new Set([...account, ...local]);
  for (const slug of local.filter((s) => !account.includes(s))) {
    fetch("/api/encounters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    }).catch(() => {});
  }
  return merged;
}
