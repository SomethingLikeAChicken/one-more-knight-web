export type RunMetaStats = {
  wave?: number;
  bosses?: number;
  dmg?: number;
  firstHitWave?: number;
  powerups?: number;
  curses?: number;
  kills?: Record<string, number>;
};

export type AchievementRun = { score: number; meta: RunMetaStats; createdAt: string };

export type Achievement = {
  slug: string;
  name: string;
  description: string;
  /** Evaluates against all stored runs + the bestiary discovery count. */
  earned: (runs: AchievementRun[], discovered: number) => boolean;
};

const totalKills = (runs: AchievementRun[], type?: string) =>
  runs.reduce((sum, r) => {
    const kills = r.meta.kills ?? {};
    return sum + (type ? (kills[type] ?? 0) : Object.values(kills).reduce((a, b) => a + b, 0));
  }, 0);

const bestWave = (runs: AchievementRun[]) => Math.max(0, ...runs.map((r) => r.meta.wave ?? 0));
const bestScore = (runs: AchievementRun[]) => Math.max(0, ...runs.map((r) => r.score));

export const ACHIEVEMENTS: Achievement[] = [
  { slug: "first-fall", name: "First Fall",
    description: "Complete a run. Every knight falls; you are officially a knight.",
    earned: (runs) => runs.length >= 1 },
  { slug: "wave-1-wonder", name: "Wave 1 Wonder",
    description: "Die on wave 1. Speedrunning the afterlife.",
    earned: (runs) => runs.some((r) => (r.meta.wave ?? 0) <= 1) },
  { slug: "persistent", name: "One More. And One More.",
    description: "Finish 20 runs. It's in the name of the game.",
    earned: (runs) => runs.length >= 20 },
  { slug: "wave-10", name: "Tenth Bell", description: "Reach wave 10.",
    earned: (runs) => bestWave(runs) >= 10 },
  { slug: "wave-25", name: "Deep Sky", description: "Reach wave 25, where the modifiers live.",
    earned: (runs) => bestWave(runs) >= 25 },
  { slug: "wave-50", name: "Cartographer of Nothing", description: "Reach wave 50. There is no map this far.",
    earned: (runs) => bestWave(runs) >= 50 },
  { slug: "score-10k", name: "Squire's Ledger", description: "Score 10,000 in one run.",
    earned: (runs) => bestScore(runs) >= 10_000 },
  { slug: "score-50k", name: "Knight's Ransom", description: "Score 50,000 in one run.",
    earned: (runs) => bestScore(runs) >= 50_000 },
  { slug: "score-100k", name: "Crown Debt", description: "Score 100,000 in one run. The host is filing a complaint.",
    earned: (runs) => bestScore(runs) >= 100_000 },
  { slug: "boss-slayer", name: "Regicide", description: "Defeat a boss.",
    earned: (runs) => runs.some((r) => (r.meta.bosses ?? 0) >= 1) },
  { slug: "boss-marathon", name: "Five Crowns",
    description: "Defeat 5 bosses in a single run.",
    earned: (runs) => runs.some((r) => (r.meta.bosses ?? 0) >= 5) },
  { slug: "wall-inspector", name: "Wall Inspector",
    description: "Kill 100 Bulwarks across all runs. They never even shot back.",
    earned: (runs) => totalKills(runs, "Bulwark") >= 100 },
  { slug: "wisp-whisperer", name: "Wisp Whisperer",
    description: "Extinguish 250 Wisps across all runs.",
    earned: (runs) => totalKills(runs, "Wisp") >= 250 },
  { slug: "exterminator", name: "The Host Notices You",
    description: "1,000 total kills across all runs.",
    earned: (runs) => totalKills(runs) >= 1000 },
  { slug: "untouched-5", name: "Untouched",
    description: "Reach wave 5 before taking your first hit.",
    earned: (runs) => runs.some((r) =>
      (r.meta.wave ?? 0) >= 5 && ((r.meta.firstHitWave ?? -1) < 0 || (r.meta.firstHitWave ?? 0) > 5)) },
  { slug: "untouched-10", name: "Ghost in Gold",
    description: "Reach wave 10 before taking your first hit.",
    earned: (runs) => runs.some((r) =>
      (r.meta.wave ?? 0) >= 10 && ((r.meta.firstHitWave ?? -1) < 0 || (r.meta.firstHitWave ?? 0) > 10)) },
  { slug: "greedy", name: "Magpie Knight",
    description: "Collect 8 powerups in a single run.",
    earned: (runs) => runs.some((r) => (r.meta.powerups ?? 0) >= 8) },
  { slug: "cursed-collector", name: "Connoisseur of Curses",
    description: "Suffer 15 death-curses across all runs. The Grudges thank you for your patronage.",
    earned: (runs) => runs.reduce((s, r) => s + (r.meta.curses ?? 0), 0) >= 15 },
  { slug: "clean-hands", name: "Clean Hands",
    description: "Reach wave 3 without killing a single enemy. Pacifism is a dodge-roll.",
    earned: (runs) => runs.some((r) => (r.meta.wave ?? 0) >= 3 && totalKills([r]) === 0) },
  { slug: "chronicler-10", name: "Apprentice Chronicler", description: "Chronicle 10 bestiary entries.",
    earned: (_r, discovered) => discovered >= 10 },
  { slug: "chronicler-25", name: "Lorekeeper", description: "Chronicle 25 bestiary entries.",
    earned: (_r, discovered) => discovered >= 25 },
  { slug: "chronicler-all", name: "The Complete Bestiary",
    description: "Chronicle all 41 entries. Yes, including Eternity.",
    earned: (_r, discovered) => discovered >= 41 },
];
