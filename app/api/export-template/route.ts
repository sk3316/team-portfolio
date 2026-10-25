// app/api/export-template/route.ts
import { NextResponse } from "next/server";
import { getLivePortfolioData } from "@/lib/sheets/fetchGoogleSheet";

/**
 * Escapes a cell value for CSV export according to RFC-4180.
 */
function escapeCsvCell(val: string | undefined | null): string {
  if (!val) return '""';
  const stringVal = String(val);
  if (
    stringVal.includes(",") ||
    stringVal.includes('"') ||
    stringVal.includes("\n") ||
    stringVal.includes("\r")
  ) {
    return `"${stringVal.replace(/"/g, '""')}"`;
  }
  return `"${stringVal}"`;
}

export async function GET() {
  const headers = [
    "id",
    "name",
    "role",
    "subTeamIds",
    "email",
    "phone",
    "avatarUrl",
    "bio",
    "skills",
    "qualifications",
    "certifications",
    "badges",
    "project1_title",
    "project1_category",
    "project1_description",
    "project1_technologies",
    "project2_title",
    "project2_category",
    "project2_description",
    "project2_technologies",
    "project3_title",
    "project3_category",
    "project3_description",
    "project3_technologies",
    "project4_title",
    "project4_category",
    "project4_description",
    "project4_technologies",
    "linkedin",
  ];

  const rows: string[] = [headers.join(",")];

  const syncResult = await getLivePortfolioData();
  const members = syncResult.data.members;

  if (members.length === 0) {
    // Provide a sample row so users have a template to follow
    rows.push(
      [
        escapeCsvCell("m-1"),
        escapeCsvCell("Sample Consultant"),
        escapeCsvCell("Lead SAP Consultant"),
        escapeCsvCell("crm, btp"),
        escapeCsvCell("consultant@cxstudio.io"),
        escapeCsvCell("+1-555-0199"),
        escapeCsvCell(""),
        escapeCsvCell("Enterprise SAP CX consultant with over 10 years experience."),
        escapeCsvCell("SAP S/4HANA, SAP BTP, ABAP Cloud"),
        escapeCsvCell("B.Tech Computer Science | MBA Information Systems"),
        escapeCsvCell("SAP Certified Application Associate | AWS Certified Solutions Architect"),
        escapeCsvCell("SAP, AWS"),
        escapeCsvCell("Global CX Modernization"),
        escapeCsvCell("Architecture"),
        escapeCsvCell("Led the transformation of global customer engagement workflows."),
        escapeCsvCell("SAP S/4HANA, BTP, Fiori"),
        escapeCsvCell(""),
        escapeCsvCell(""),
        escapeCsvCell(""),
        escapeCsvCell(""),
        escapeCsvCell(""),
        escapeCsvCell(""),
        escapeCsvCell(""),
        escapeCsvCell(""),
        escapeCsvCell(""),
        escapeCsvCell(""),
        escapeCsvCell(""),
        escapeCsvCell(""),
        escapeCsvCell("https://linkedin.com/in/sample"),
      ].join(",")
    );
  } else {
    for (const member of members) {
      const p1 = member.featuredProjects[0];
      const p2 = member.featuredProjects[1];
      const p3 = member.featuredProjects[2];
      const p4 = member.featuredProjects[3];

    const row = [
      escapeCsvCell(member.id),
      escapeCsvCell(member.name),
      escapeCsvCell(member.role),
      escapeCsvCell(member.subTeamIds.join(", ")),
      escapeCsvCell(member.email),
      escapeCsvCell(member.phone),
      escapeCsvCell(member.avatarUrl),
      escapeCsvCell(member.bio),
      escapeCsvCell(member.skills.join(", ")),
      escapeCsvCell(member.qualifications.join(" | ")),
      escapeCsvCell(member.certifications.join(" | ")),
      escapeCsvCell(member.badges?.map((b) => b.name).join(", ") || "SAP"),
      escapeCsvCell(p1?.title || ""),
      escapeCsvCell(p1?.category || ""),
      escapeCsvCell(p1?.description || ""),
      escapeCsvCell(p1?.technologies?.join(", ") || ""),
      escapeCsvCell(p2?.title || ""),
      escapeCsvCell(p2?.category || ""),
      escapeCsvCell(p2?.description || ""),
      escapeCsvCell(p2?.technologies?.join(", ") || ""),
      escapeCsvCell(p3?.title || ""),
      escapeCsvCell(p3?.category || ""),
      escapeCsvCell(p3?.description || ""),
      escapeCsvCell(p3?.technologies?.join(", ") || ""),
      escapeCsvCell(p4?.title || ""),
      escapeCsvCell(p4?.category || ""),
      escapeCsvCell(p4?.description || ""),
      escapeCsvCell(p4?.technologies?.join(", ") || ""),
      escapeCsvCell(member.socialLinks?.linkedin || ""),
    ];

    rows.push(row.join(","));
    }
  }

  const csvContent = rows.join("\r\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="CX_Studio_Team_Template.csv"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
