import DevScoreButton from "@/components/DevScoreButton";
import LeaderboardTable from "@/components/LeaderboardTable";
import { auth } from "@/auth";
import { getStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const [rows, session] = await Promise.all([getStore().leaderboard(50), auth()]);
  const devTools = process.env.DEV_LOGIN === "1" && !!session?.authId;

  return (
    <div>
      <h1 className="mb-1 text-2xl text-gold">Leaderboard</h1>
      <p className="mb-6 text-parchment-muted">One entry per knight — your best run only.</p>
      <LeaderboardTable rows={rows} />
      {devTools && <DevScoreButton />}
    </div>
  );
}
