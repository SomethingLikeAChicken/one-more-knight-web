import { promises as fs } from "fs";
import path from "path";

export type LeaderboardRow = {
  username: string;
  score: number;
  achievedAt: string; // ISO timestamp of the personal-best run
  wave?: number;      // from the best run's meta
  bosses?: number;
};

export type RunMeta = Record<string, unknown>;

export interface Store {
  /** Append one run. Every submission is kept (ADR-0005: seed + summary stay
   *  auditable); the leaderboard query dedupes to personal bests. */
  submitScore(authId: string, username: string, score: number, meta: RunMeta): Promise<void>;
  /** Top N, exactly one row per player (their best run). */
  leaderboard(limit: number): Promise<LeaderboardRow[]>;
  /** Bestiary diary: remember that this player has seen this entry. Idempotent. */
  recordEncounter(authId: string, username: string, slug: string): Promise<void>;
  /** All slugs this player has encountered. */
  encounters(authId: string): Promise<string[]>;
  /** The player's stored runs, newest first — achievement raw material. */
  runs(authId: string, limit: number): Promise<RunRow[]>;
}

export type RunRow = { score: number; meta: RunMeta; createdAt: string };

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
    await sql`
      CREATE TABLE IF NOT EXISTS encounters (
        player_id uuid NOT NULL REFERENCES players(id),
        slug text NOT NULL,
        first_seen timestamptz NOT NULL DEFAULT now(),
        PRIMARY KEY (player_id, slug)
      )`;
  })();

  async function ensurePlayer(authId: string, username: string): Promise<string> {
    const [player] = await sql`
      INSERT INTO players (username, auth_id) VALUES (${username}, ${authId})
      ON CONFLICT (auth_id) DO UPDATE SET username = EXCLUDED.username
      RETURNING id`;
    return player.id as string;
  }

  return {
    async submitScore(authId, username, score, meta) {
      await ready;
      const playerId = await ensurePlayer(authId, username);
      await sql`INSERT INTO scores (player_id, score, meta)
                VALUES (${playerId}, ${score}, ${sql.json(meta as never)})`;
    },
    async recordEncounter(authId, username, slug) {
      await ready;
      const playerId = await ensurePlayer(authId, username);
      await sql`INSERT INTO encounters (player_id, slug) VALUES (${playerId}, ${slug})
                ON CONFLICT DO NOTHING`;
    },
    async encounters(authId) {
      await ready;
      const rows = await sql`
        SELECT e.slug FROM encounters e
        JOIN players p ON p.id = e.player_id
        WHERE p.auth_id = ${authId}`;
      return rows.map((r) => r.slug as string);
    },
    async runs(authId, limit) {
      await ready;
      const rows = await sql`
        SELECT s.score, s.meta, s.created_at FROM scores s
        JOIN players p ON p.id = s.player_id
        WHERE p.auth_id = ${authId}
        ORDER BY s.created_at DESC LIMIT ${limit}`;
      return rows.map((r) => ({
        score: r.score as number,
        meta: (r.meta ?? {}) as RunMeta,
        createdAt: (r.created_at as Date).toISOString(),
      }));
    },
    async leaderboard(limit) {
      await ready;
      const rows = await sql`
        SELECT p.username, best.score, best.created_at, best.meta
        FROM (
          SELECT DISTINCT ON (player_id) player_id, score, created_at, meta
          FROM scores
          ORDER BY player_id, score DESC, created_at ASC
        ) best
        JOIN players p ON p.id = best.player_id
        ORDER BY best.score DESC, best.created_at ASC
        LIMIT ${limit}`;
      return rows.map((r) => {
        const meta = (r.meta ?? {}) as { wave?: number; bosses?: number };
        return {
          username: r.username as string,
          score: r.score as number,
          achievedAt: (r.created_at as Date).toISOString(),
          wave: meta.wave,
          bosses: meta.bosses,
        };
      });
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

type FileEncounter = { authId: string; slug: string; at: string };

function fileStore(): Store {
  const file = path.join(process.cwd(), ".data", "scores.json");
  const encFile = path.join(process.cwd(), ".data", "encounters.json");

  async function readAll(): Promise<FileRun[]> {
    try {
      return JSON.parse(await fs.readFile(file, "utf-8")) as FileRun[];
    } catch {
      return [];
    }
  }
  async function readEncounters(): Promise<FileEncounter[]> {
    try {
      return JSON.parse(await fs.readFile(encFile, "utf-8")) as FileEncounter[];
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
    async recordEncounter(authId, _username, slug) {
      const all = await readEncounters();
      if (all.some((e) => e.authId === authId && e.slug === slug)) return;
      all.push({ authId, slug, at: new Date().toISOString() });
      await fs.mkdir(path.dirname(encFile), { recursive: true });
      await fs.writeFile(encFile, JSON.stringify(all, null, 2));
    },
    async encounters(authId) {
      return (await readEncounters()).filter((e) => e.authId === authId).map((e) => e.slug);
    },
    async runs(authId, limit) {
      return (await readAll())
        .filter((r) => r.authId === authId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, limit)
        .map((r) => ({ score: r.score, meta: r.meta, createdAt: r.createdAt }));
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
        .map((r) => ({
          username: r.username,
          score: r.score,
          achievedAt: r.createdAt,
          wave: (r.meta as { wave?: number }).wave,
          bosses: (r.meta as { bosses?: number }).bosses,
        }));
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
