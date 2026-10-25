// lib/sheets/sheetMapper.ts
import { TeamMember, Project } from "@/data/portfolio-data";
import { resolveBadge, BADGE_DEFINITIONS } from "@/lib/pptx/badgeLogos";

/**
 * Normalizes an image URL from various spreadsheet formats:
 * - Google Drive share link -> converts to direct lh3.googleusercontent.com CDN stream
 * - =IMAGE("url") formula -> extracts the inner URL
 * - Dropbox share link -> converts to direct download stream
 */
export function cleanImageUrl(input?: string): string | null {
  if (!input) return null;
  let trimmed = input.trim();

  // If wrapped in =IMAGE("...") or =IMAGE('...')
  const formulaMatch = trimmed.match(/^=IMAGE\s*\(\s*["']([^"']+)["']/i);
  if (formulaMatch && formulaMatch[1]) {
    trimmed = formulaMatch[1].trim();
  }

  // Google Drive share link: /file/d/([a-zA-Z0-9_-]+) or id=([a-zA-Z0-9_-]+)
  const gDriveMatch =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (gDriveMatch && gDriveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${gDriveMatch[1]}`;
  }

  // Dropbox share link: convert www.dropbox.com to dl.dropboxusercontent.com
  if (trimmed.includes("dropbox.com")) {
    return trimmed
      .replace("www.dropbox.com", "dl.dropboxusercontent.com")
      .replace(/[?&]dl=[01]/, "");
  }

  // Direct HTTP/HTTPS link or Base64 data URL
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:image/")
  ) {
    return trimmed;
  }

  return null;
}

/**
 * Maps a single CSV row from Google Sheets into a strongly-typed TeamMember.
 */
export function mapRowToMember(
  row: Record<string, string>,
  index: number
): TeamMember {
  const rawName = row["name"] || row["full_name"] || row["consultant_name"] || `Consultant ${index + 1}`;
  const rawId =
    row["id"] ||
    row["member_id"] ||
    rawName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") ||
    `m-${index + 1}`;

  const slug =
    row["slug"] ||
    rawName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const role = row["role"] || row["designation"] || row["title"] || "SAP CX Consultant";
  const email = row["email"] || "";
  const phone = row["phone"] || row["mobile"] || "";
  const bio = row["bio"] || row["summary"] || row["executive_summary"] || "";

  // Parse SubTeam IDs (e.g. "cpi, crm" or "cpi|functional")
  const rawSubTeams = row["subteamids"] || row["subteams"] || row["discipline"] || row["subteam"] || "";
  let subTeamIds = rawSubTeams
    .split(/[,|]/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0);

  // If no subteams specified or valid, assign to "all" and first valid discipline
  if (subTeamIds.length === 0) {
    subTeamIds = ["cpi"];
  }

  // Parse Skills (comma separated)
  const rawSkills = row["skills"] || row["key_skills"] || row["technologies"] || "";
  const skills = rawSkills
    .split(/[,|]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // Parse Qualifications (pipe or newline separated)
  const rawQuals = row["qualifications"] || row["education"] || row["degree"] || "";
  const qualifications = rawQuals
    .split(/[\n|]/)
    .map((q) => q.trim())
    .filter((q) => q.length > 0);

  // Parse Certifications (pipe or newline separated)
  const rawCerts = row["certifications"] || row["certificates"] || "";
  const certifications = rawCerts
    .split(/[\n|]/)
    .map((c) => c.trim())
    .filter((c) => c.length > 0);

  // Default avatar or custom URL
  const defaultAvatars = [
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  ];

  const rawAvatar =
    row["avatarurl"] ||
    row["avatar"] ||
    row["photo"] ||
    row["image"] ||
    "";

  const avatarUrl =
    cleanImageUrl(rawAvatar) || defaultAvatars[index % defaultAvatars.length];

  // Parse Featured Projects (support Project 1 through 6 dynamically)
  const featuredProjects: Project[] = [];

  for (let p = 1; p <= 6; p++) {
    const pTitle =
      row[`project${p}_title`] ||
      row[`p${p}_title`] ||
      (p === 1 ? row["project_title"] : undefined);

    if (pTitle && pTitle.trim().length > 0) {
      const pCat =
        row[`project${p}_category`] ||
        row[`p${p}_category`] ||
        "Enterprise Delivery";
      const pDesc =
        row[`project${p}_description`] ||
        row[`project${p}_desc`] ||
        row[`p${p}_desc`] ||
        "Designed and executed enterprise SAP solution.";
      const pTech = (
        row[`project${p}_technologies`] ||
        row[`project${p}_tech`] ||
        row[`p${p}_tech`] ||
        ""
      )
        .split(/[,|]/)
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      featuredProjects.push({
        title: pTitle.trim(),
        category: pCat.trim(),
        description: pDesc.trim(),
        technologies: pTech.length > 0 ? pTech : skills.slice(0, 4),
      });
    }
  }

  // Fallback projects if none provided
  if (featuredProjects.length === 0) {
    featuredProjects.push({
      title: `Worked as ${role} on Enterprise CX Transformation`,
      category: "Solution Architecture",
      description: `Spearheaded architecture, end-to-end integration design, and functional cutover for enterprise SAP landscapes.`,
      technologies: skills.slice(0, 4),
    });
  }

  // Badges: parse from explicit CSV column if present, or infer from portfolio data / certs / skills
  const rawBadges =
    row["badges"] ||
    row["earned_badges"] ||
    row["certifications_badges"] ||
    row["logos"] ||
    row["badge_logos"] ||
    "";

  let badges: {
    name: string;
    logoUrl: string;
    fallbackText?: string;
    color?: string;
    base64?: string;
  }[] = [];

  if (rawBadges.trim().length > 0) {
    const splitNames = rawBadges
      .split(/[,|]/)
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    for (const bName of splitNames) {
      const resolved = resolveBadge(bName);
      if (resolved) {
        badges.push({
          name: resolved.name,
          logoUrl: resolved.localPath,
          fallbackText: resolved.fallbackText,
          color: resolved.color,
          base64: resolved.base64,
        });
      } else {
        badges.push({
          name: bName,
          logoUrl: "",
          fallbackText: bName.slice(0, 4).toUpperCase(),
          color: "#0090D6",
        });
      }
    }
  } else {
    // Automatic intelligent inference from certifications and skills
    const badgeMap = new Map<string, any>();
    // Always include SAP for CX Consultants
    const sapBadge = BADGE_DEFINITIONS["sap"];
    if (sapBadge) {
      badgeMap.set(sapBadge.id, {
        name: sapBadge.name,
        logoUrl: sapBadge.localPath,
        fallbackText: sapBadge.fallbackText,
        color: sapBadge.color,
        base64: sapBadge.base64,
      });
    }

    const searchTerms = [...certifications, ...skills];
    for (const term of searchTerms) {
      const found = resolveBadge(term);
      if (found && !badgeMap.has(found.id)) {
        badgeMap.set(found.id, {
          name: found.name,
          logoUrl: found.localPath,
          fallbackText: found.fallbackText,
          color: found.color,
          base64: found.base64,
        });
      }
    }

    badges = Array.from(badgeMap.values());
  }

  // Fallback to at least SAP
  if (badges.length === 0) {
    const sap = BADGE_DEFINITIONS["sap"];
    badges.push({
      name: sap?.name || "SAP",
      logoUrl: sap?.localPath || "/assets/badges/sap.png",
      fallbackText: "SAP",
      color: "#0090D6",
      base64: sap?.base64,
    });
  }

  return {
    id: rawId,
    slug,
    name: rawName,
    role,
    email,
    phone,
    subTeamIds,
    avatarUrl,
    bio: bio || `Specialist in ${role} with core focus on enterprise SAP customer experience architectures and reliable solution engineering.`,
    skills: skills.length > 0 ? skills : ["SAP Architecture", "Enterprise Integration", "Cloud Extensibility"],
    qualifications,
    certifications,
    badges,
    socialLinks: {
      linkedin: row["linkedin"] || "https://linkedin.com",
      github: row["github"] || "",
      website: row["website"] || "",
    },
    featuredProjects,
  };
}

/**
 * Maps an array of raw CSV rows to a full member roster.
 */
export function mapCsvRowsToMembers(rows: Record<string, string>[]): TeamMember[] {
  return rows.map((row, idx) => mapRowToMember(row, idx));
}
