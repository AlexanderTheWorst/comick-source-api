import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import { getScraperByName } from "@/lib/scrapers";

interface PageResult {
  index: number;
  url: string;
  buffer?: string;
  filename?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { url, source } = body;

    if (!url) {
      return NextResponse.json(
        { error: "Missing chapter URL" },
        { status: 400 }
      );
    }

    if (source) {
      const pages = await getScraperByName(source)?.getPages(url);
      return new NextResponse(JSON.stringify(pages), {
        headers: {
            "Content-Type": "application/json"
        }
      })
    }
  } catch {}
}
