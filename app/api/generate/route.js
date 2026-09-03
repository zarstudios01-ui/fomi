import { NextResponse } from "next/server";
import { mockGenerate } from "@/lib/mockGenerate";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { prompt, creativeDirection, count } = body;

  const result = await mockGenerate({ prompt, creativeDirection, count });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 422 });
  }

  return NextResponse.json({ variations: result.variations });
}
