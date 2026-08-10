# One More Knight — Web

Website + backend for [One More Knight](https://github.com/SomethingLikeAChicken/One-More-Knight-2026-07-27_11-10-59):
play the Unity WebGL build in the browser, sign in with OAuth, climb the leaderboard.

Stack: **Next.js** (App Router, one app = site + API, same origin per ADR-0004) ·
**Tailwind v4** · **Auth.js v5** (Google / GitHub / Discord, no passwords) ·
**Postgres** (Neon) with a JSON-file fallback store for local dev.

## Local development

```bash
cp .env.example .env.local   # defaults are fine: dev login on, file store, no DB
npm install
npm run dev                  # http://localhost:3000
```

With `DEV_LOGIN=1` you get a fake "Dev login" provider (any username, no
password) and a "Submit random test score" button on the leaderboard, so the
whole flow — sign in → submit → deduped leaderboard — works with zero external
accounts. Scores land in `.data/scores.json` (gitignored).

## The game build

`public/game/` holds the Unity WebGL build (Brotli **with decompression
fallback**, so no special headers are needed on any host). To update it, build
WebGL in the Unity project and copy `Builds/WebGL/Build` + `TemplateData` over
`public/game/`, then commit.

## Leaderboard rules

Every submitted run is stored (`scores` is append-only — ADR-0005 keeps seed +
run summary auditable for future hardening), but the leaderboard shows **one row
per player: their best run**. Identity comes from the OAuth subject
(`players.auth_id`), so sessions/devices don't create duplicate entries.

## API

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/leaderboard` | GET | none | top 50, one best-run row per player |
| `/api/scores` | POST | session | submit `{ score: int, meta?: object }` |
| `/api/auth/*` | — | — | Auth.js sign-in/out/callback |

The game page exposes `window.__omk.submitScore(score, meta)` for the Unity
client's `.jslib` bridge (game-side wiring is a game-repo issue).

## Deploying to Vercel

1. **Vercel**: New Project → import `one-more-knight-web` → framework auto-detects
   Next.js. Deploy once to learn your production URL.
2. **Neon**: create a free project → copy the connection string → set it as
   `DATABASE_URL` in Vercel env vars. Tables are created automatically on first use.
3. **Secrets**: set `AUTH_SECRET` (`npx auth secret` prints one). Do **not** set
   `DEV_LOGIN` in production.
4. **OAuth apps** (all free) — register one per provider, callback URL
   `https://<your-domain>/api/auth/callback/<provider>`:
   - Google: console.cloud.google.com → APIs & Services → Credentials → OAuth client ID (Web).
   - GitHub: github.com/settings/developers → New OAuth App.
   - Discord: discord.com/developers/applications → New Application → OAuth2.
   Put each client ID/secret into Vercel env vars (`AUTH_<PROVIDER>_ID`/`_SECRET`).
5. Redeploy. Providers appear on the sign-in page automatically once their env
   vars exist.
