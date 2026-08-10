import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getStore } from "@/lib/store";

export const dynamic = "force-dynamic";

const SLUG = /^[A-Za-z0-9_-]{1,40}$/;

export async function GET() {
  const session = await auth();
  if (!session?.authId) return NextResponse.json({ slugs: [] });
  const slugs = await getStore().encounters(session.authId);
  return NextResponse.json({ slugs });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.authId) return NextResponse.json({ ok: false }); // anonymous: localStorage only

  let body: { slug?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }
  if (typeof body.slug !== "string" || !SLUG.test(body.slug)) {
    return NextResponse.json({ error: "invalid slug" }, { status: 400 });
  }
  await getStore().recordEncounter(session.authId, session.user?.name ?? "Knight", body.slug);
  return NextResponse.json({ ok: true });
}
