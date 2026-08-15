export type PatchNote = {
  version: string;
  title: string;
  date: string;
  sections: { heading: string; items: string[] }[];
};

/** Newest first. The in-game Menu version string must match the top entry. */
export const PATCH_NOTES: PatchNote[] = [
  {
    version: "alpha 1.5.0-preview",
    title: "The Bargain (preview)",
    date: "2026-08-15",
    sections: [
      {
        heading: "Preview update 2 — the sponge wall falls (same day)",
        items: [
          "First play-test verdict was clear: wave 50 was a wall of unkillable sponges. FIXED — with the trash retired, late waves are already all elite squads, so the old HP curve on top was double-dipping. Enemy health now peaks at a gentle ×1.5 (was ×4), and the wave-based DAMAGE creep is gone entirely: this game runs on a 3-HP principle — three chances, always readable — and no enemy will ever hit for 2 just because your run got long. The only double-damage in the game is now the one you SIGN FOR (Pact of Blood).",
          "So where does late-game difficulty come from? Content. FOURTEEN new enemy squads, most of them built for the deep waves: the Siege Train, the Black Procession, twin-Riftmaw TwinMaws, the Vault Guard (a Reliquary behind Aegis shields), the Storm of Wings, and The Last Court — the new hardest formation in the game. The late-wave pool more than doubled, so skipping waves with a Pact now means meeting DIFFERENT armies, not fatter ones. And wave-skip pacts cap at +10 waves — no more triple-Abyss teleporting to wave 45.",
          "The Pact table grew from 9 to 17 contracts across five new kinds of bargain: heavy boots, slow staffs, drought (fewer or NO powerup drops), longer curses, and a stampede. Choosing a Pact also PURGES every bullet on screen first — time never resumes into a hit you couldn't see coming.",
          "Three new death-curses join the palette: FROST (slow and stiff), SILENCE (pickups do nothing while the bell tolls — they wait for you), and HEX (your controls invert — good luck). Carried by the Dirgesinger, the Bellringer, and — of course — the Hexblade.",
          "And yes: there's a PAUSE button now. Esc or the corner button; the game freezes mid-bullet. Pact offers already froze time, now you can too.",
        ],
      },
      {
        heading: "Sign here — the Pact system",
        items: [
          "At the start of every run, and again after every boss you fell, the game slides three contracts across the table: an easy, a medium, and a hard one. Each makes your run genuinely harder — faster foes, ironclad foes, crueler blows, a battlefield that refills sooner, or a straight leap forward on the wave clock — and pays every point you earn while it holds at ×1.4, ×2, or ×3 into your leaderboard score. Exactly ONE pact holds at a time: signing a new one breaks the old, and refusing drops you back to ×1. The multiplier is bound to the tier, never the individual pact — luck decides what flavor of pain you're offered, never how high your ceiling goes.",
          "Your standing pact is always visible in the HUD, your run summary remembers every pact you held and when, and the leaderboard now ranks the multiplied figure. Clean runs stay competitive — a ×3 pact is worth exactly as much as being three times better, and considerably more likely to kill you.",
        ],
      },
      {
        heading: "The ladder is a ladder now",
        items: [
          "The boss ladder had a dirty secret: reaching the top only RAISED THE CEILING — all 28 bosses stayed in the draw, so your 64,000-point climax was a d1 pushover four times out of ten, and the Pale King was a 1-in-28 lottery ticket. Every stage now draws from a difficulty BAND: the top of the ladder offers d8 and d9 bosses only, every single time. The fun no longer starts when the dice feel like it.",
          "Late waves stopped hoarding trash. Past wave 20 the cheap early-game squads begin to RETIRE from the spawn pool, and by wave ~70 every wave spends its full budget on a couple of genuinely dangerous formations — half the enemies, none of the filler, same density law as always: harder never meant more, and now it finally means harder.",
          "Enemies past wave 30 start hitting harder — up to TRIPLE damage by wave ~57. Their health and speed curves are untouched; the endgame kills you through stakes, not sponges. Below wave 20 nothing changed at all: the early game is exactly the ramp it was.",
        ],
      },
      {
        heading: "The host stirs",
        items: [
          "Nothing on the battlefield stands like a statue anymore: all 87 enemies and bosses got idle animations — cloaks sway, flames gutter, banners ripple, the Pale King breathes. Generated with PixelLab from each creature's own sprite, frame zero is the exact art you knew, so nothing changed identity — it just came alive.",
          "Every wardrobe skin now has its own full 8-direction walk cycle. The 1.4.0 quirk where a Crimson or Void mage snapped back to blue robes the moment he moved is gone — your mage walks in his own colors.",
          "The Baron and the Lich were wearing the WRONG BODIES since 1.4.0 — a sprite-import slip left both falling back to a default sprite in the game and their old 1.3 art in the bestiary. The vampire lord raises his chalice and the ice-crowned king holds court, in the run and in the wiki, as intended.",
        ],
      },
      {
        heading: "Preview notes",
        items: [
          "This is a PREVIEW build of alpha 1.5 — the endgame-scaling update is still growing (new top-tier bosses, deadzones, 2D boss movement, the HUD rework, and more pacts are on the spec). Numbers may move. Tell us where it bends before it ships as 1.5.0 proper.",
        ],
      },
    ],
  },
  {
    version: "alpha 1.4.0",
    title: "The Painted March",
    date: "2026-08-13",
    sections: [
      {
        heading: "A whole new face — every face",
        items: [
          "Every creature in the game was redrawn, this time generated with PixelLab and anchored to hand-made concept art: 56 enemies, 7 minibosses, 31 bosses, and the hero. The style is darker and more medieval — cultists, wraiths, siege engines, vampire lords, a lich in an ice crown, a pale king with antlers. Pixel density is uniform everywhere now: small enemies are 32 pixels, minibosses 48, bosses 64, and the end-game colossals a full 96, so everything sits in the same world instead of the same soup.",
          "Every enemy that shoots VISIBLY can: crossbows, slings, censers, warhorns, void portals. The pure knights — Bulwark, Aegis, the Colossus — are exactly the ones that come to crush you in person. The whole bestiary got fresh lore written for the new bodies, so the wiki reads true again.",
          "Your knight is a battle MAGE now — and after a day as a woman, he grew a beard. Same blue robe, same golden flame; all eight wardrobe skins recolor his robe, hat, and staff-fire.",
        ],
      },
      {
        heading: "The ground moves",
        items: [
          "The black void under your feet is gone. The host now marches across actual land — trampled battlefields, a cursed forest, graveyard slabs, castle carpets, and cracked rift-stone at the end. The ground scrolls beneath you, and every boss you fell carries you into the next region: the land changes at the horizon, never under your feet. The terrain is dimmed on purpose so bullets and enemies always pop against it.",
        ],
      },
      {
        heading: "A proper coat of arms",
        items: [
          "The interface is PixelLab-made too: a hand-drawn medieval game font on every screen, oak-and-iron buttons, wooden wardrobe tiles, an iron-and-gold frame around boss health bars, and a crowned-helm emblem above the title.",
          "First animation experiment shipped: the mage has a full 8-direction walk cycle, generated from his own sprite. He strides when you move and plants his staff when you stand. (Known quirk we accepted for now: while walking, non-default skins show the base blue robe — per-skin walk sets come later if the experiment sticks.)",
        ],
      },
    ],
  },
  {
    version: "alpha 1.3.3",
    title: "The Visible Host",
    date: "2026-08-12",
    sections: [
      {
        heading: "Fixes",
        items: [
          "Every enemy and boss was INVISIBLE since 1.3.2 — you were dodging ghosts. The staff-fix in 1.3.2 changed how all our sprite files are imported, which silently gave every sprite a new internal ID. We re-pointed the eight hero skins to the new IDs but missed the other 89 references: all 56 enemies, all the bosses, the boss shields, and the boss template itself. Their sprite links quietly resolved to nothing, and Unity draws 'nothing' as exactly that. All 89 references are rewired and verified one by one — the host is visible again.",
          "The bullets, powerups, and your mage were never affected, which is why the game LOOKED like it was running fine — it was, you just couldn't see who was shooting at you. Sorry: this one shipped because our release check verified the skins we were fixing but not everything else that leaned on the same import change.",
        ],
      },
    ],
  },
  {
    version: "alpha 1.3.2",
    title: "One Small Oval",
    date: "2026-08-11",
    sections: [
      {
        heading: "Fixes",
        items: [
          "The hero's fire bolt is a clean symmetric oval again — the 1.3.1 trailing-flame shape read poorly in dense fights. Still colored by your skin's flame.",
          "The wardrobe skins showed only the mage's STAFF — the new skin textures auto-sliced on import and the first slice happened to be the staff. Every skin now shows the whole mage, in the wardrobe and in the run.",
        ],
      },
    ],
  },
  {
    version: "alpha 1.3.1",
    title: "The Mage Patch",
    date: "2026-08-11",
    sections: [
      {
        heading: "Your knight took up the staff",
        items: [
          "The hero is a battle-mage now: robe, wizard hat, and a staff that casts FIRE instead of loosing arrows. And the Wardrobe got serious — every skin now changes your whole look (robe and hat colors) AND the color of your flames: golden fire by default, ember-orange for the Crimson, blue-violet for the Void, ghost-white for the Spectral, pink rift-fire for the Rift mage, and more.",
          "Flame colors deliberately stay out of the enemy palette (their red/violet/green warning colors mean what they always meant) — your fire flies UP and burns in gold-family hues, so readability holds.",
        ],
      },
      {
        heading: "Fixes",
        items: [
          "The Descender and The Gatekeeper finally joined the art overhaul — they were hiding in two files from the very first week of the project and slipped through 1.3.0's redraw.",
          "Fullscreen on desktop actually fills your screen now instead of keeping the game at its small size inside a black void. Sorry about that.",
        ],
      },
    ],
  },
  {
    version: "alpha 1.3.0",
    title: "Touch & Steel",
    date: "2026-08-11",
    sections: [
      {
        heading: "Play on your phone",
        items: [
          "Touch controls are in: rest your left thumb anywhere on the left half of the screen and a joystick appears under it — drag to move in any direction. Hold anywhere on the right half to fire. Both at once works, exactly like it should.",
          "The Fullscreen button now actually works on phones (iPhones don't support real browser fullscreen — we stopped fighting it and built our own): the game fills your screen edge to edge, with an Exit button and ESC to leave. Hold your phone sideways — the battlefield is wide, and the game will remind you if you don't.",
          "The menu has a proper BEGIN THE RUN button and the death screen restarts on a tap, so a whole session never needs a keyboard.",
        ],
      },
      {
        heading: "The host got new armor — all of it",
        items: [
          "Every creature in the game has been redrawn: 85 sprites across 16 distinct medieval archetypes — soldiers with different weapons, hooded monks, pointed-hat witches, wailing ghosts, skeletons, gargoyles, wyverns, hounds, serpents, carrion crows, walking siege engines, demon lords, crowned kings. No more same-knight-five-times: no two creatures share a body and a palette.",
          "Your knight got the treatment too (gold and blue, as the color law demands), and the bestiary shows all the new faces.",
          "Identities held: the Direhound is still a hound, the Bulwark is still a wall, cursed creatures still wear the dark palette. Sprite sizes are unchanged, so hitboxes and game feel are exactly as before — this is paint, not balance.",
        ],
      },
    ],
  },
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
