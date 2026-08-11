export type RunMetaStats = {
  wave?: number;
  bosses?: number;
  dmg?: number;
  firstHitWave?: number;
  powerups?: number;
  curses?: number;
  kills?: Record<string, number>;
  /** Per-boss-slug kills (game #91) - mains and lackeys, keyed by asset name. */
  bossKills?: Record<string, number>;
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

const totalBossKills = (runs: AchievementRun[], ...slugs: string[]) =>
  runs.reduce((sum, r) => {
    const bk = r.meta.bossKills ?? {};
    return sum + slugs.reduce((a, s) => a + (bk[s] ?? 0), 0);
  }, 0);

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
  { slug: "grudge-holder", name: "Grudge Holder",
    description: "Kill 25 Grudges across all runs — knowing full well what it costs.",
    earned: (runs) => totalKills(runs, "Grudge") >= 25 },
  { slug: "captain-down", name: "Chain of Command",
    description: "Kill 10 Dread Captains across all runs.",
    earned: (runs) => totalKills(runs, "DreadCaptain") >= 10 },
  { slug: "zealot-purge", name: "Heresy Works Both Ways",
    description: "Kill 100 Zealots across all runs.",
    earned: (runs) => totalKills(runs, "Zealot") >= 100 },
  { slug: "colossus-fall", name: "Siegebreaker",
    description: "Bring down 25 Colossi across all runs.",
    earned: (runs) => totalKills(runs, "Colossus") >= 25 },
  { slug: "boss-10-one-run", name: "Ten Crowns",
    description: "Defeat 10 bosses in a single run. The throne room is getting crowded.",
    earned: (runs) => runs.some((r) => (r.meta.bosses ?? 0) >= 10) },
  { slug: "boss-50-total", name: "Kingmaker's Opposite",
    description: "Defeat 50 bosses across all runs.",
    earned: (runs) => runs.reduce((s, r) => s + (r.meta.bosses ?? 0), 0) >= 50 },
  { slug: "score-250k", name: "The Host Files a Complaint",
    description: "Score 250,000 in one run.",
    earned: (runs) => bestScore(runs) >= 250_000 },
  { slug: "glass-cannon", name: "Glass Cannon",
    description: "Score 20,000+ in a run where you took 5 or more hits. Living dangerously, loudly.",
    earned: (runs) => runs.some((r) => r.score >= 20_000 && (r.meta.dmg ?? 0) >= 5) },
  { slug: "shopping-spree", name: "Blessed Beyond Reason",
    description: "Collect 20 powerups in a single run.",
    earned: (runs) => runs.some((r) => (r.meta.powerups ?? 0) >= 20) },
  { slug: "triple-cursed", name: "Walking Omen",
    description: "Suffer 3 curses in a single run and still make it past wave 15.",
    earned: (runs) => runs.some((r) => (r.meta.curses ?? 0) >= 3 && (r.meta.wave ?? 0) > 15) },
  { slug: "wave-100", name: "The Wave Has No Number",
    description: "Reach wave 100. We didn't test this far. Genuinely.",
    earned: (runs) => bestWave(runs) >= 100 },
  { slug: "die-hard", name: "Fifty Funerals",
    description: "Finish 50 runs. The graveyard has a season ticket for you.",
    earned: (runs) => runs.length >= 50 },
  { slug: "chronicler-10", name: "Apprentice Chronicler", description: "Chronicle 10 bestiary entries.",
    earned: (_r, discovered) => discovered >= 10 },
  { slug: "chronicler-25", name: "Lorekeeper", description: "Chronicle 25 bestiary entries.",
    earned: (_r, discovered) => discovered >= 25 },
  // 61 = 56 creatures + 5 wave modifiers, the full discovery diary. Bump alongside
  // content batches, like the version string.
  { slug: "chronicler-all", name: "The Complete Bestiary",
    description: "Chronicle all 61 entries. Yes, including Eternity.",
    earned: (_r, discovered) => discovered >= 61 },
  // --- The hard tier (game #91): wardrobe skins hang off these.
  { slug: "slay-warbringer", name: "Warbreaker",
    description: "Defeat the Warbringer. The war, remarkably, continues without him.",
    earned: (runs) => totalBossKills(runs, "BossWarbringer") >= 1 },
  { slug: "slay-voidmother", name: "Void Seal",
    description: "Defeat the Voidmother. Somewhere, a thousand rifts quietly close.",
    earned: (runs) => totalBossKills(runs, "BossVoidmother") >= 1 },
  { slug: "slay-regent", name: "Coup",
    description: "Defeat the Regent - after both his Blades. Power abhors a vacuum; you ARE the vacuum.",
    earned: (runs) => totalBossKills(runs, "BossRegent") >= 1 },
  { slug: "slay-pale-king", name: "Regicide",
    description: "Defeat the Pale King. There is no trick. There is only being good enough.",
    earned: (runs) => totalBossKills(runs, "BossPaleKing") >= 1 },
  { slug: "guard-breaker", name: "Guard-Breaker",
    description: "Fell 10 boss guards - Squires, Blades, or Pale Heralds.",
    earned: (runs) => totalBossKills(runs, "BossSquire", "BossRegentBlade", "BossPaleHerald") >= 10 },
  { slug: "miniboss-hunter", name: "Headhunter",
    description: "Slay 15 minibosses. The tracking bars have learned to fear you.",
    earned: (runs) => totalKills(runs, "DreadCaptain") + totalKills(runs, "Direhound")
      + totalKills(runs, "StandardBearer") + totalKills(runs, "Ossuary") + totalKills(runs, "Riftmaw")
      + totalKills(runs, "Reliquary") + totalKills(runs, "Colossus") >= 15 },
  { slug: "rift-hunter", name: "Rift-Closer",
    description: "Destroy 25 rift-creatures - Riftlings, Voidcallers, Riftmaws.",
    earned: (runs) => totalKills(runs, "Riftling") + totalKills(runs, "Voidcaller")
      + totalKills(runs, "Riftmaw") >= 25 },
  { slug: "score-500k", name: "Half the Kingdom",
    description: "Score 500,000 in one run. The other half is still shooting at you.",
    earned: (runs) => bestScore(runs) >= 500_000 },
];
