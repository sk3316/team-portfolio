// lib/sheets/fetchGoogleSheet.ts
import {
  TeamMember,
  TeamPortfolioData,
  defaultTeamInfo,
  defaultSubTeams,
  emptyPortfolioData,
} from "@/data/portfolio-data";
import { parseCSV } from "./csvParser";
import { mapCsvRowsToMembers } from "./sheetMapper";

export interface GoogleSheetsSyncResult {
  isLive: boolean;
  source: "google-sheets";
  memberCount: number;
  lastSync: string;
  sheetId?: string;
  error?: string;
  data: TeamPortfolioData;
}

/**
 * Extracts a clean Google Sheet ID from either a raw ID or a full Google Sheets URL.
 */
export function extractSheetId(input?: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  // Match /spreadsheets/d/([a-zA-Z0-9-_]+)
  const urlMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }

  // If it's already an ID (alphanumeric with dashes/underscores)
  if (/^[a-zA-Z0-9-_]{20,}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Fetches and parses the Google Sheet into the application's TeamPortfolioData structure.
 * Google Sheets is the SINGLE source of truth.
 */
export async function getLivePortfolioData(options?: {
  sheetIdOverride?: string;
  sheetUrlOverride?: string;
  forceRefresh?: boolean;
}): Promise<GoogleSheetsSyncResult> {
  const envSheetId =
    options?.sheetIdOverride ||
    process.env.GOOGLE_SHEET_ID ||
    process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;

  const envSheetUrl =
    options?.sheetUrlOverride ||
    process.env.GOOGLE_SHEETS_CSV_URL ||
    process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

  const resolvedSheetId = extractSheetId(envSheetId) || extractSheetId(envSheetUrl);

  // If no Google Sheet is configured, return empty state with clear error
  if (!resolvedSheetId && !envSheetUrl) {
    return {
      isLive: false,
      source: "google-sheets",
      memberCount: 0,
      lastSync: new Date().toISOString(),
      error: "No Google Sheet ID configured in environment variables",
      data: emptyPortfolioData,
    };
  }

  try {
    let csvUrl = envSheetUrl;

    if (resolvedSheetId) {
      // GViz CSV export endpoint: public without requiring OAuth
      csvUrl = `https://docs.google.com/spreadsheets/d/${resolvedSheetId}/gviz/tq?tqx=out:csv`;
    }

    if (!csvUrl) {
      throw new Error("Invalid Google Sheets configuration.");
    }

    const fetchOptions: RequestInit = options?.forceRefresh
      ? { cache: "no-store" }
      : { next: { revalidate: 60 } }; // Revalidate every 60 seconds automatically on Vercel

    const response = await fetch(csvUrl, fetchOptions);

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          "Google Sheet is set to 'Restricted'. In your Google Sheet, click 'Share' (top right) and set General Access to 'Anyone with the link can view' (Viewer)."
        );
      }
      throw new Error(`Google Sheets responded with HTTP status ${response.status}`);
    }

    const csvText = await response.text();

    if (!csvText || csvText.trim().length === 0) {
      throw new Error("Received empty response from Google Sheet.");
    }

    if (csvText.includes("<!DOCTYPE html>") || csvText.includes("<html")) {
      throw new Error(
        "Google Sheet returned a login page. In your Google Sheet, click 'Share' and set General Access to 'Anyone with the link can view' (or File > Share > Publish to web)."
      );
    }

    // Parse the CSV
    const parsedRows = parseCSV(csvText);

    if (parsedRows.length === 0) {
      throw new Error("No data rows found in Google Sheet.");
    }

    // Map rows to TeamMember instances
    const liveMembers = mapCsvRowsToMembers(parsedRows);

    // Dynamically discover any newly created teams from members' subTeamIds
    const existingSubTeamMap = new Map(
      defaultSubTeams.map((st) => [st.id.toLowerCase(), st])
    );
    const dynamicSubTeams = [...defaultSubTeams];

    for (const m of liveMembers) {
      for (const stId of m.subTeamIds) {
        const cleanId = stId.toLowerCase().trim();
        if (cleanId && !existingSubTeamMap.has(cleanId)) {
          const formattedName = cleanId
            .split(/[-_]/)
            .map((w) =>
              w.length <= 3
                ? w.toUpperCase()
                : w.charAt(0).toUpperCase() + w.slice(1)
            )
            .join(" ");

          const newSubTeam = {
            id: cleanId,
            name: `${formattedName} Team`,
            shortCode: cleanId.slice(0, 3).toUpperCase(),
            description: `Specialized delivery and engineering for ${formattedName}.`,
          };

          existingSubTeamMap.set(cleanId, newSubTeam);
          dynamicSubTeams.push(newSubTeam);
        }
      }
    }

    return {
      isLive: true,
      source: "google-sheets",
      sheetId: resolvedSheetId || undefined,
      memberCount: liveMembers.length,
      lastSync: new Date().toISOString(),
      data: {
        teamInfo: defaultTeamInfo,
        subTeams: dynamicSubTeams,
        members: liveMembers,
      },
    };
  } catch (err: any) {
    console.error("Failed to sync from Google Sheets:", err.message);

    return {
      isLive: false,
      source: "google-sheets",
      memberCount: 0,
      lastSync: new Date().toISOString(),
      error: err.message || "Failed to fetch from Google Sheets",
      data: emptyPortfolioData,
    };
  }
}
