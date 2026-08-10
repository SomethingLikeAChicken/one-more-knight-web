import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getStore, type RunMeta } from "@/lib/store";

// ADR-0005: trust-based v1 with a hardenable endpoint — bound the score,
// keep every submission (with meta: seed, wave, boss reached) for later audit.
const MAX_SCORE = 100_000_000;

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.authId) {
    return NextResponse.json({ error: "sign in to submit scores" }, { status: 401 });
  }

  let body: { score?: unknown; meta?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const score = body.score;
  if (typeof score !== "number" || !Number.isInteger(score) || score < 0 || score > MAX_SCORE) {
    return NextResponse.json({ error: "score must be an integer in [0, 1e8]" }, { status: 400 });
  }
  const meta: RunMeta =
    body.meta && typeof body.meta === "object" ? (body.meta as RunMeta) : {};

  await getStore().submitScore(
    session.authId,
    session.user?.name ?? "Knight",
    score,
    meta,
  );
  return NextResponse.json({ ok: true });
}
