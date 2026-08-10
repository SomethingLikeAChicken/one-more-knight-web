import { promises as fs } from "fs";
import path from "path";

export type LeaderboardRow = {
  username: string;
  score: number;
  achievedAt: string; // ISO timestamp of the personal-best run
};

export type RunMeta = Record<string, unknown>;

export interface Store {
  /** Append one run. Every submission is kept (ADR-0005: seed + summary stay
   *  auditable); the leaderboard query dedupes to personal bests. */
  submitScore(authId: string, username: string, score: number, meta: RunMeta): Promise<void>;
  /** Top N, exactly one row per player (their best run). */
  leaderboard(limit: number): Promise<LeaderboardRow[]>;
}

// ---------------------------------------------------------------------------
// Postgres store (production; used whenever DATABASE_URL is set)
// ---------------------------------------------------------------------------

function postgresStore(url: string): Store {
  // Lazy import keeps `postgres` out of the bundle when running the dev store.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const postgres = require("postgres") as typeof import("postgres");
  const sql = postgres(url);

  const ready = (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS players (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        username text NOT NULL,
        auth_id text NOT NULL UNIQUE,
        created_at timestamptz NOT NULL DEFAULT now()
      )`;
    await sql`
      CREATE TABLE IF NOT EXISTS scores (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        player_id uuid NOT NULL REFERENCES players(id),
        score int NOT NULL,
        meta jsonb NOT NULL DEFAULT '{}',
        created_at timestamptz NOT NULL DEFAULT now()
      )`;
    await sql`CREATE INDEX IF NOT EXISTS scores_player_score ON scores (player_id, score DESC)`;
  })();

  return {
    async submitScore(authId, username, score, meta) {
      await ready;
      const [player] = await sql`
        INSERT INTO players (username, auth_id) VALUES (${username}, ${authId})
        ON CONFLICT (auth_id) DO UPDATE SET username = EXCLUDED.username
        RETURNING id`;
      await sql`INSERT INTO scores (player_id, score, meta)
                VALUES (${player.id}, ${score}, ${sql.json(meta as never)})`;
    },
    async leaderboard(limit) {
      await ready;
      const rows = await sql`
        SELECT p.username, best.score, best.created_at
        FROM (
          SELECT DISTINCT ON (player_id) player_id, score, created_at
          FROM scores
          ORDER BY player_id, score DESC, created_at ASC
        ) best
        JOIN players p ON p.id = best.player_id
        ORDER BY best.score DESC, best.created_at ASC
        LIMIT ${limit}`;
      return rows.map((r) => ({
        username: r.username as string,
        score: r.score as number,
        achievedAt: (r.created_at as Date).toISOString(),
      }));
    },
  };
}

// ---------------------------------------------------------------------------
// File store (local dev fallback when DATABASE_URL is unset)
// ---------------------------------------------------------------------------

type FileRun = {
  authId: string;
  username: string;
  score: number;
  meta: RunMeta;
  createdAt: string;
};

function fileStore(): Store {
  const file = path.join(process.cwd(), ".data", "scores.json");

  async function readAll(): Promise<FileRun[]> {
    try {
      return JSON.parse(await fs.readFile(file, "utf-8")) as FileRun[];
    } catch {
      return [];
    }
  }

  return {
    async submitScore(authId, username, score, meta) {
      const runs = await readAll();
      runs.push({ authId, username, score, meta, createdAt: new Date().toISOString() });
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, JSON.stringify(runs, null, 2));
    },
    async leaderboard(limit) {
      const runs = await readAll();
      const best = new Map<string, FileRun>();
      for (const run of runs) {
        const prev = best.get(run.authId);
        if (!prev || run.score > prev.score) best.set(run.authId, run);
      }
      return [...best.values()]
        .sort((a, b) => b.score - a.score || a.createdAt.localeCompare(b.createdAt))
        .slice(0, limit)
        .map((r) => ({ username: r.username, score: r.score, achievedAt: r.createdAt }));
    },
  };
}

// ---------------------------------------------------------------------------

let store: Store | undefined;

export function getStore(): Store {
  if (!store) {
    store = process.env.DATABASE_URL
      ? postgresStore(process.env.DATABASE_URL)
      : fileStore();
  }
  return store;
}
