export type PatchNote = {
  version: string;
  title: string;
  date: string;
  sections: { heading: string; items: string[] }[];
};

/** Newest first. The in-game Menu version string must match the top entry. */
export const PATCH_NOTES: PatchNote[] = [
  {
    version: "alpha 1.1.0",
    title: "Rifts & Hunters",
    date: "2026-08-11",
    sections: [
      {
        heading: "Balance — the 120k hotfix",
        items: [
          "Powerups are now 10-second timed effects: sword +2 damage, wing +30% speed, bolt −35% fire cooldown. Picking the same type again refreshes the clock. Permanent stacking is gone.",
          "The heart now refills one lost heart only — it never raises max HP, and it's much rarer (drop weight 0.35 → 0.12).",
          "Boss rewards no longer count toward boss-stage thresholds — no more back-to-back bosses after a big payout.",
          "The HUD shows active buffs in gold with countdowns, next to the violet curse line.",
        ],
      },
      {
        heading: "Rifts — remote bullet hell",
        items: [
          "New pattern origin: a violet square RIFT opens somewhere on the field, contracts and strobes for a beat, then the whole pattern erupts FROM the square — rings, crosses, gyres, even homing volleys. The boss doesn't have to be where the danger is anymore.",
          "Five rift bosses from difficulty 5 up: The Riftwarden (d5), The Executioner (d6), The Voidmother (d7, rift homing volleys + a Locust brood), The Tribunal (d7, THREE simultaneous rifts + cursed summons), and Apocrypha (d8, 1000 HP, summons a Direhound miniboss). 18 bosses total.",
        ],
      },
      {
        heading: "The hunters",
        items: [
          "Ten homing-focused enemies: Stalker, Gemini, Bloodhound, Lamprey, Vulture, Shepherd, Locust, the Direhound miniboss, and two new cursed carriers — Curseweaver (killing it BLINDS you) and Penitent (killing it dulls your damage). 38 enemy types total.",
          "Two new curses: Blind (the screen closes in) and Weakness (−1 damage). Cursed enemies now appear in far more late-game groups — debuffs scale with depth.",
          "Six new groups from wave 8 to 19, including CursedCongregation and DirehoundHunt. 39 groups total.",
        ],
      },
      {
        heading: "Website",
        items: [
          "Wave modifiers are now explained in the bestiary — survive a wave with one to unlock its entry.",
          "Leaderboard entries show the wave reached and bosses killed of each knight's best run.",
          "Twelve new achievements (34 total), including Ten Crowns, Walking Omen, and The Wave Has No Number.",
          "All 56 bestiary entries have full lore plus a How-to-fight-it tactics section.",
        ],
      },
    ],
  },
  {
    version: "alpha 1.0.0",
    title: "The Bestiary & The Wall",
    date: "2026-08-11",
    sections: [
      {
        heading: "New features",
        items: [
          "Bestiary: an achievement-diary wiki — entries stay ??? until you actually meet them in a run; discovered entries show lore, tactics, stats, and an Arena link.",
          "Arena: duel any discovered enemy or boss from its bestiary page; it respawns forever, and nothing you do there unlocks diary entries.",
          "Achievements: 22 of them, evaluated from your recorded runs — including dying on wave 1, 100 Bulwark kills, and reaching wave 10 untouched.",
          "Powerups: golden drops (sword +1 damage, heart +1 max HP, wing +move speed, bolt +fire rate), 5% on kills, guaranteed on boss kills. All capped — hearts at 6.",
          "Curses: killing a cursed enemy (dark pulsing aura) slows you or jams your gun for 4s. Holding fire is now a real decision.",
          "Wave modifiers from wave 16: HASTE, IRONCLAD, FRENZY, GILDED, SWARM — announced on the wave readout.",
          "Minibosses with floating HP bars; boss name tags (NAME · PHASE) over the boss bar.",
          "Motion-coded bullets: green flies straight, violet snakes, red hunts. Learn the colors, live longer.",
          "Motivational Game Over quotes. Du bist gut genuuuuug.",
        ],
      },
      {
        heading: "New content",
        items: [
          "5 elite enemies: Dread Captain (miniboss), Reliquary (cursed miniboss), Grudge (cursed swarm bait), Inquisitor (twin homing brands), Seraph (rotating wheel) — 28 enemy types total.",
          "6 late-game groups at costs 26–40 from wave 15 on, including TheHost (a 40-point wall of everything). Wave budget cap 42 → 64.",
          "2 endgame bosses: Warbringer (difficulty 7, summons a Dread Captain miniboss mid-fight) at 34,000 score and Eternity (difficulty 8, 900 HP) at 48,000 — 13 bosses total.",
          "FirstBoss is now The Gatekeeper.",
        ],
      },
      {
        heading: "Balance & fixes",
        items: [
          "Difficulty wall aimed at the 40–60k crowd: elite groups + modifiers + d7/d8 stages; endless boss step 6,000 → 8,000 at difficulty cap 8.",
          "Colliders now match sprite size for every enemy and boss (bosses could be shot through their edges; Wisps had contact hitboxes larger than their sprite).",
          "Heart HP display: tight heart row (was widely spaced squares); hit feedback via hero flash + red screen vignette.",
          "Bosses always fight unmodified — wave modifiers end when a boss takes the stage.",
        ],
      },
    ],
  },
  {
    version: "alpha 0.9.0",
    title: "The Host Grows",
    date: "2026-08-10",
    sections: [
      {
        heading: "New features",
        items: [
          "The website: play in the browser, OAuth sign-in (GitHub/Discord), and a leaderboard with one best-run entry per knight.",
          "Score submission straight from the game on death — no manual anything.",
          "Boss stages: each score threshold rolls a random boss up to the stage's difficulty cap; the sky changes color after every kill.",
          "Telegraphs: strong attacks announce themselves; a real HUD (score, wave, hearts, boss bar).",
          "Space fires too.",
        ],
      },
      {
        heading: "New content",
        items: [
          "10 enemy types (Lancer, Skirmisher, Orbiter, Marauder, Wisp, Hexblade, Ravager, Pyromancer, Aegis, Chanter) and 9 mixed wave groups — 23 types, 27 groups at the release.",
          "Escort formations: shields in front, matched-speed shooters trailing in the same lane (BulwarkHunt, AegisEscort).",
          "5 bosses: Herald, Lich, Stormcaller, Behemoth, and the Summoner — the first boss that calls reinforcements mid-fight. Archon (d5) and Oblivion (d6) opened stages 16,000 and 24,000.",
        ],
      },
      {
        heading: "Balance & fixes",
        items: [
          "Budget waves: fixed difficulty per wave, random group composition — beatable by construction, different every run.",
          "Fairness caps: post-curve scaling stops at HP ×4 / speed ×1.5 so escalation never becomes an undodgeable wall.",
        ],
      },
    ],
  },
  {
    version: "alpha 0.8.0",
    title: "Foundations",
    date: "2026-08-10",
    sections: [
      {
        heading: "The game exists",
        items: [
          "Hero with full 2D movement, pooled bullets, health, score, waves of enemies, game over, restart.",
          "The attack pattern engine: every enemy shot is a data asset composed from formation, direction, motion, and timing axes — new attacks need zero code.",
          "First bosses (The Gatekeeper, Serpent, Tyrant, Monarch) with phases that change look and behavior at HP thresholds.",
          "Endless by design: no victory screen. There is always one more knight.",
          "WebGL build pipeline (Brotli + decompression fallback).",
        ],
      },
    ],
  },
];
