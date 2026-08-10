import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getStore } from "@/lib/store";

export const dynamic = "force-dynamic";

/** The signed-in player's stored runs — the achievement page's raw material. */
export async function GET() {
  const session = await auth();
  if (!session?.authId) return NextResponse.json({ runs: [] });
  const runs = await getStore().runs(session.authId, 500);
  return NextResponse.json({ runs });
}
