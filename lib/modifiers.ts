export type ModifierEntry = {
  /** Discovery slug the game reports on first sight ("ModHaste" ...). */
  slug: string;
  name: string;
  effect: string;
  advice: string;
};

/** Wave modifiers (wave 16+, 45% chance, announced on the wave readout).
 *  Entries unlock in the bestiary once you've survived a wave carrying one. */
export const MODIFIERS: ModifierEntry[] = [
  {
    slug: "ModHaste", name: "Haste",
    effect: "Every enemy in the wave moves 25% faster.",
    advice: "Lanes close sooner than your reflexes expect. Kill high, dodge early, and give the Darters their column.",
  },
  {
    slug: "ModIronclad", name: "Ironclad",
    effect: "Every enemy in the wave carries 35% more HP.",
    advice: "Your usual two-shot kills become three. Prioritize shooters over walls — you cannot afford to grind iron this wave.",
  },
  {
    slug: "ModFrenzy", name: "Frenzy",
    effect: "Enemy attack cooldowns drop to 75% — everything fires more often.",
    advice: "The bullet density rises, not the bullet speed. Smaller, calmer movements; the gaps still exist, they just arrive faster.",
  },
  {
    slug: "ModGilded", name: "Gilded",
    effect: "Kills score 1.5× for the whole wave.",
    advice: "The one modifier that smiles at you. Greed responsibly — a gilded death pays nothing.",
  },
  {
    slug: "ModSwarm", name: "Swarm",
    effect: "The wave's budget grows 30% — more groups on the field.",
    advice: "Density, not strength. Sweep the cheap bodies with your natural fire and keep moving diagonally; standing still is what kills you here.",
  },
];
