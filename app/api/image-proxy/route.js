import { NextResponse } from "next/server";
import { buildPollinationsUrl } from "@/lib/pollinations";

export const maxDuration = 60;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt");
  const width = searchParams.get("width") || "1024";
  const height = searchParams.get("height") || "576";
  const seed = searchParams.get("seed") || "0";

  if (!prompt) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  const target = buildPollinationsUrl({ prompt, width, height, seed });

  try {
    const upstream = await fetch(target);

    if (!upstream.ok) {
      let bodyText = "";
      try {
        bodyText = (await upstream.text()).slice(0, 200);
      } catch {}
      console.error(`[image-proxy] upstream ${upstream.status}: ${bodyText}`);
      return NextResponse.json(
        { error: `Upstream returned ${upstream.status}${bodyText ? ` — ${bodyText}` : ""}` },
        { status: 502 }
      );
    }

    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, immutable",
      },
    });
  } catch (err) {
    console.error("[image-proxy] fetch threw:", err);
    return NextResponse.json(
      { error: `Image generation failed — ${err.message || "unknown error"}` },
      { status: 502 }
    );
  }
}
