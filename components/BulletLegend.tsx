const COLORS = [
  { dot: "bg-green-400", name: "Green", meaning: "flies straight — where it points is where it goes" },
  { dot: "bg-violet-400", name: "Violet", meaning: "snakes side to side — dodge the wave, not the bolt" },
  { dot: "bg-red-400", name: "Red", meaning: "hunts you — keep moving, it loses the scent after a moment" },
];

/** The motion color code every enemy bullet obeys (engine-enforced, game #48). */
export default function BulletLegend() {
  return (
    <div className="max-w-2xl rounded-md border border-night-line bg-night-raised p-4">
      <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-parchment">
        Read the bullets
      </h3>
      <ul className="flex flex-col gap-1.5">
        {COLORS.map((c) => (
          <li key={c.name} className="flex items-baseline gap-2 text-sm leading-relaxed">
            <span aria-hidden className={`h-2.5 w-2.5 shrink-0 self-center rounded-full ${c.dot}`} />
            <span className="text-parchment">{c.name}</span>
            <span className="text-parchment-muted">{c.meaning}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
