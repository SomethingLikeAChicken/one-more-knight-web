export type PatchNote = {
  version: string;
  title: string;
  date: string;
  sections: { heading: string; items: string[] }[];
};

/** Newest first. The in-game Menu version string must match the top entry. */
export const PATCH_NOTES: PatchNote[] = [
  {
    version: "alpha 1.2.1",
    title: "The Pacing Hotfix",
    date: "2026-08-11",
    sections: [
      {
        heading: "Endgame bosses respect your time now",
        items: [
          "1000 HP is now the absolute ceiling for any boss. The Pale King dropped from 1200 to 1000 — the fight was not harder above that line, just longer. His patterns, guards and ward are untouched; the challenge stays, the grind goes.",
          "Difficulty 8+ bosses now DROP A POWERUP at the start of every phase they enter — watch for it falling just below the boss. A long fight against Apocrypha, Eternity or the Pale King funds the dodging it demands: the Pale King's three phases pay out three times. Bosses below d8 are unchanged.",
        ],
      },
    ],
  },
  {
    version: "alpha 1.2.0",
    title: "Shields & Squires",
    date: "2026-08-11",
    sections: [
      {
        heading: "Shield bosses — break the ward first",
        items: [
          "Some bosses now enter behind a WARD: a floating blue shield (you'll recognize the Bulwark slab) that soaks every point of damage before the boss's own health can be touched. While the ward holds, the boss bar is BLUE and shows the ward, with a SHIELD tag on the name — when it shatters (you'll see it), the bar flips to the familiar violet and the real fight begins at full health. The Castellan (d2) teaches the mechanic gently; the Warlord (d4) and Iconoclast (d6) do not.",
          "Fair warning: warded bosses keep firing while you grind the blue bar. The ward is not a free damage phase.",
        ],
      },
      {
        heading: "Lackey bosses — kill the guard, then the king",
        items: [
          "Other bosses arrive GUARDED: two smaller bosses flank them, each with its own name tag and health bar, while the main boss's bar sits GREY — he is untouchable until both guards fall. Don't waste a single arrow on a grey bar. Every fallen guard pays a score reward and drops a powerup, and when the last one dies the boss visibly rages and his bar lights violet: now it's a duel.",
          "The Baron (d3) with his two Squires is the introduction; The Regent (d7) with his Blades is the exam.",
        ],
      },
      {
        heading: "The Pale King — difficulty 9",
        items: [
          "A new stage opens at 64,000 score, and one boss rules it: The Pale King, 1200 HP behind BOTH mechanics at once — two rift-casting Pale Heralds guard him, then a 150-point ward, then three phases of dense rings, storm crosses, rift gyres and homing volleys while Riftlings pour in. Reward: 12,000. Bank every Aegis and Purge you can carry.",
          "Six more bosses fill the ladder below him: The Plaguebearer (d2), The Runesmith (d3), The Gravewright (d4, summons CURSED help — fire discipline is the fight), The Covenant (d5, pure rift-caster). 31 bosses in the bestiary, difficulty 1 through 9.",
        ],
      },
      {
        heading: "New defensive powerups (wave 12+)",
        items: [
          "AEGIS — a blue shield icon. The next hit that would hurt you is blocked entirely; a spinning blue ring around your knight shows the ward, and it lasts 10 seconds if unspent. Picking up another refreshes it.",
          "PURGE — a violet starburst. The instant you touch it, EVERY enemy bullet on screen vanishes. The panic button for deep-wave density; your own bullets are untouched.",
          "Both only start dropping from wave 12 and are rarer than swords — the early game is unchanged.",
        ],
      },
      {
        heading: "The Wardrobe — achievements pay out now",
        items: [
          "The main menu is rebuilt (real UI at last) and gains the WARDROBE: eight knight skins, each locked behind an achievement. Reach 100k for the Golden Knight, fell the Warbringer for the Crimson, the Voidmother for the Void, the Pale King himself for the Pale Knight — and chronicle the entire bestiary for the form-changing Rift Knight. Your choice persists between sessions and your knight wears it in every run.",
          "Skins are cosmetic: your hitbox never changes.",
        ],
      },
      {
        heading: "New blood — 18 enemies, rifts in the waves",
        items: [
          "15 new regular enemies from fodder to elite — including the first RIFT-casting wave enemies: the Riftling opens rifts on your position, the Voidcaller from random sky-points. They're expensive for the wave budget, so they arrive as punctuation, not floods.",
          "3 new minibosses in the actually-killable range, each with a GUARANTEED drop: the Standard-Bearer (18 HP → wing), the Ossuary (22 HP → bolt), and the rift-spitting Riftmaw (20 HP → sword). The old wall minibosses were tuned down to match (DreadCaptain 40→30, Direhound 45→35) and now always drop a sword too — minibosses are worth the detour, every time.",
          "56 enemy types, 49 wave groups.",
        ],
      },
      {
        heading: "Achievements & website",
        items: [
          "8 new achievements (42 total), including the hard tier the Wardrobe hangs off: Regicide, Warbreaker, Void Seal, Coup, Guard-Breaker, Headhunter, Rift-Closer, and Half the Kingdom (500k). Your runs now record WHICH bosses you slew, not just how many.",
          "The bestiary gained a MINIBOSSES section, and 'Read the bullets' explains the color code on the Play page and the Bestiary: green flies straight, violet snakes, red hunts.",
          "The Complete Bestiary achievement now demands all 92 entries. We know. Good luck.",
        ],
      },
    ],
  },
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
