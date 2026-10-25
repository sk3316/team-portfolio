// app/api/portfolio/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getLivePortfolioData } from "@/lib/sheets/fetchGoogleSheet";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const forceRefresh = searchParams.get("refresh") === "true";
    const sheetIdOverride = searchParams.get("sheetId") || undefined;
    const sheetUrlOverride = searchParams.get("sheetUrl") || undefined;

    const result = await getLivePortfolioData({
      forceRefresh,
      sheetIdOverride,
      sheetUrlOverride,
    });

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": forceRefresh
          ? "no-cache, no-store, must-revalidate"
          : "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to retrieve portfolio data",
      },
      { status: 500 }
    );
  }
}
