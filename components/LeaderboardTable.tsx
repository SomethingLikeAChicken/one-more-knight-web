import type { LeaderboardRow } from "@/lib/store";

export default function LeaderboardTable({ rows }: { rows: LeaderboardRow[] }) {
  if (rows.length === 0) {
    return (
      <p className="py-8 text-parchment-muted">
        No runs recorded yet. Be the first knight on the board.
      </p>
    );
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left text-xs uppercase tracking-wider text-parchment-muted">
          <th className="border-b border-night-line px-3 py-2 font-normal">#</th>
          <th className="border-b border-night-line px-3 py-2 font-normal">Knight</th>
          <th className="border-b border-night-line px-3 py-2 font-normal">Score</th>
          <th className="border-b border-night-line px-3 py-2 font-normal">Achieved</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={`${row.username}-${row.achievedAt}`}>
            <td className="w-12 border-b border-night-line px-3 py-2.5 text-gold">{i + 1}</td>
            <td className="border-b border-night-line px-3 py-2.5">{row.username}</td>
            <td className="border-b border-night-line px-3 py-2.5">
              {row.score.toLocaleString("en-US")}
            </td>
            <td className="border-b border-night-line px-3 py-2.5 text-parchment-muted">
              {new Date(row.achievedAt).toLocaleDateString("en-GB")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
