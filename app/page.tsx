import Link from "next/link";
import UnityPlayer from "@/components/UnityPlayer";

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-night-line bg-night-raised px-1.5 py-0.5 font-mono text-[0.9em]">
      {children}
    </kbd>
  );
}

export default function PlayPage() {
  return (
    <div className="flex flex-col gap-8">
      <UnityPlayer />
      <section className="max-w-2xl leading-relaxed text-parchment-muted">
        <h2 className="mb-2 text-lg text-parchment">How to play</h2>
        <p>
          Move with <Key>WASD</Key> or the arrow keys, fire with <Key>Space</Key>. Survive the
          endless waves, duel the bosses, and watch the sky change each time one falls. Red,
          violet and green shots hurt — everything gold and blue is yours.
        </p>
        <p className="mt-2">
          Sign in and your best run will appear on the{" "}
          <Link href="/leaderboard" className="text-gold hover:underline">
            leaderboard
          </Link>{" "}
          — one entry per knight, only your best counts.
        </p>
      </section>
    </div>
  );
}
