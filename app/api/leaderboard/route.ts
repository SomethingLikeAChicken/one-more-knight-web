import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await getStore().leaderboard(50);
  return NextResponse.json({ rows });
}
