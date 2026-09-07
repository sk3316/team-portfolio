// lib/pptx/nativePptxGenerator.ts
import { NormalizedMember } from "./types";
import { normalizeMemberData } from "./normalizeMemberData";
import { TeamMember } from "@/data/portfolio-data";

/**
 * Downloads a candidate profile in the EXACT corporate 1-page format
 * matching the user's specification image:
 * - Top: Name : <Candidate Name>
 * - Left: Avatar circle, DESIGNATION, Phone, EMAIL, Qualifications, Certificate, Skill Set
 * - Right: Gray container (#F5F6F8), Professional Experience, Tools & Technology, Key Engagements
 */
export async function downloadCandidatePPT(
  rawMember: TeamMember | NormalizedMember
): Promise<void> {
  const member: NormalizedMember =
    "subTeamName" in rawMember
      ? (rawMember as NormalizedMember)
      : normalizeMemberData(rawMember);

  const pptxgenModule = await import("pptxgenjs");
  const PptxGenJS = pptxgenModule.default;
  const pres = new PptxGenJS();

  // Explicitly use LAYOUT_WIDE (13.333 x 7.5 inches) so 16:9 widescreen bounds are fully honored
  pres.layout = "LAYOUT_WIDE";
  pres.author = "CXcel Studio";
  pres.company = "CXcel Studio";
  pres.title = `${member.name} — Profile`;

  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };

  // Color Palette matching the reference image exactly
  const cyanBlue = "0090D6"; // Solid vibrant cyan header banner
  const rightBg = "F5F6F8"; // Light gray right column container
  const textColor = "222222"; // Main body dark text
  const mutedText = "555555"; // Secondary text
  const fontFace = "Calibri";

  // ── Top Header: Name : <Candidate Name> ─────────────────────
  slide.addText(
    [
      { text: "Name : ", options: { bold: true, fontSize: 24, fontFace, color: "000000" } },
      { text: member.name, options: { bold: true, fontSize: 24, fontFace, color: "000000" } },
    ],
    {
      x: 0.5,
      y: 0.28,
      w: 12.33,
      h: 0.55,
      valign: "middle",
    }
  );

  // ── Left Column (x = 0.5, w = 3.2) ──────────────────────────
  const leftX = 0.5;
  const leftW = 3.2;

  // Avatar circular outline
  const avatarSize = 1.6;
  const avatarX = leftX + (leftW - avatarSize) / 2;
  const avatarY = 0.95;

  slide.addShape(pres.ShapeType.ellipse, {
    x: avatarX,
    y: avatarY,
    w: avatarSize,
    h: avatarSize,
    fill: { color: "FFFFFF" },
    line: { color: "333333", width: 1.5 },
  });

  // Silhouette representation inside circle (head & shoulders icon shape)
  slide.addShape(pres.ShapeType.ellipse, {
    x: avatarX + 0.48,
    y: avatarY + 0.22,
    w: 0.64,
    h: 0.64,
    fill: { color: "111111" },
    line: { color: "111111" },
  });
  slide.addShape(pres.ShapeType.ellipse, {
    x: avatarX + 0.2,
    y: avatarY + 0.9,
    w: 1.2,
    h: 0.7,
    fill: { color: "111111" },
    line: { color: "111111" },
  });

  // Contact & Designation Information below Avatar
  const contactY = 2.68;
  const phoneText = member.phone ? member.phone : "yet to be given";
  const emailText = member.email ? member.email : "yet to be given";

  slide.addText(
    [
      { text: "DESIGNATION: ", options: { bold: true, fontSize: 9.5, fontFace, color: "333333" } },
      { text: `${member.role}\n`, options: { bold: false, fontSize: 9.5, fontFace, color: "333333" } },
      { text: "Phone: ", options: { bold: true, fontSize: 9.5, fontFace, color: "333333" } },
      { text: `${phoneText}\n`, options: { bold: false, italic: !member.phone, fontSize: 9.5, fontFace, color: mutedText } },
      { text: "EMAIL: ", options: { bold: true, fontSize: 9.5, fontFace, color: "333333" } },
      { text: `${emailText}`, options: { bold: false, italic: !member.email, fontSize: 9.5, fontFace, color: mutedText } },
    ],
    {
      x: leftX,
      y: contactY,
      w: leftW,
      h: 0.78,
      valign: "top",
      lineSpacing: 15,
    }
  );

  // ── Left Section 1: Qualifications ──────────────────────────
  const bannerH = 0.28;
  const qualBannerY = 3.56;

  slide.addShape(pres.ShapeType.rect, {
    x: leftX,
    y: qualBannerY,
    w: leftW,
    h: bannerH,
    fill: { color: cyanBlue },
    line: { color: cyanBlue },
  });
  slide.addText("Qualifications", {
    x: leftX + 0.15,
    y: qualBannerY,
    w: leftW - 0.3,
    h: bannerH,
    fontSize: 10.5,
    fontFace,
    bold: true,
    color: "FFFFFF",
    valign: "middle",
  });

  const qualItems =
    member.qualifications.length > 0
      ? member.qualifications
      : ["Yet to be given"];

  const qualBulletText = qualItems.map((q) => ({
    text: `-  ${q}\n`,
    options: {
      fontSize: 9,
      fontFace,
      color: textColor,
    },
  }));

  slide.addText(qualBulletText, {
    x: leftX,
    y: qualBannerY + bannerH + 0.05,
    w: leftW,
    h: 0.62,
    valign: "top",
    lineSpacing: 14,
  });

  // ── Left Section 2: Certificate ─────────────────────────────
  const certBannerY = 4.58;

  slide.addShape(pres.ShapeType.rect, {
    x: leftX,
    y: certBannerY,
    w: leftW,
    h: bannerH,
    fill: { color: cyanBlue },
    line: { color: cyanBlue },
  });
  slide.addText("Certificate", {
    x: leftX + 0.15,
    y: certBannerY,
    w: leftW - 0.3,
    h: bannerH,
    fontSize: 10.5,
    fontFace,
    bold: true,
    color: "FFFFFF",
    valign: "middle",
  });

  const certItems =
    member.certifications.length > 0
      ? member.certifications.slice(0, 3)
      : ["Yet to be given"];

  const certBulletText = certItems.map((c) => ({
    text: `•  ${c}\n`,
    options: {
      fontSize: 9,
      fontFace,
      color: textColor,
      italic: c === "Yet to be given",
    },
  }));

  slide.addText(certBulletText, {
    x: leftX,
    y: certBannerY + bannerH + 0.05,
    w: leftW,
    h: 0.65,
    valign: "top",
    lineSpacing: 14,
  });

  // ── Left Section 3: Skill Set ───────────────────────────────
  const skillBannerY = 5.62;

  slide.addShape(pres.ShapeType.rect, {
    x: leftX,
    y: skillBannerY,
    w: leftW,
    h: bannerH,
    fill: { color: cyanBlue },
    line: { color: cyanBlue },
  });
  slide.addText("Skill Set", {
    x: leftX + 0.15,
    y: skillBannerY,
    w: leftW - 0.3,
    h: bannerH,
    fontSize: 10.5,
    fontFace,
    bold: true,
    color: "FFFFFF",
    valign: "middle",
  });

  const skillItems =
    member.skills.length > 0
      ? member.skills.slice(0, 5)
      : ["SAP Consulting", "Technical Delivery"];

  const skillBulletText = skillItems.map((s) => ({
    text: `•  ${s}\n`,
    options: {
      fontSize: 9,
      fontFace,
      color: textColor,
    },
  }));

  slide.addText(skillBulletText, {
    x: leftX,
    y: skillBannerY + bannerH + 0.05,
    w: leftW,
    h: 1.15,
    valign: "top",
    lineSpacing: 14,
  });

  // ── Right Column (x = 3.9, w = 8.9, h = 6.1) ────────────────
  const rightX = 3.9;
  const rightW = 8.9;
  const rightH = 6.1;

  // Gray container covering the entire right side
  slide.addShape(pres.ShapeType.rect, {
    x: rightX,
    y: 0.95,
    w: rightW,
    h: rightH,
    fill: { color: rightBg },
    line: { color: rightBg },
  });

  // ── Right Section 1: Professional Experience ────────────────
  const expBannerY = 0.95;

  slide.addShape(pres.ShapeType.rect, {
    x: rightX,
    y: expBannerY,
    w: rightW,
    h: bannerH,
    fill: { color: cyanBlue },
    line: { color: cyanBlue },
  });
  slide.addText("Professional Experience", {
    x: rightX + 0.2,
    y: expBannerY,
    w: rightW - 0.4,
    h: bannerH,
    fontSize: 10.5,
    fontFace,
    bold: true,
    color: "FFFFFF",
    valign: "middle",
  });

  // Bio Summary Paragraph
  const bioSummary =
    member.bio ||
    `Results-driven ${member.role} with proven enterprise experience in designing, developing, and deploying end-to-end integration solutions. Proficient in architecture, business processes, and delivery methodologies to provide reliable, scalable, and secure solutions aligned with business needs.`;

  slide.addText(bioSummary, {
    x: rightX + 0.2,
    y: expBannerY + bannerH + 0.1,
    w: rightW - 0.4,
    h: 0.92,
    fontSize: 9.5,
    fontFace,
    color: textColor,
    lineSpacing: 14,
    valign: "top",
  });

  // Tools & Technology Line
  const toolsList = member.skills.join(", ");
  slide.addText(
    [
      { text: "Tools & Technology: ", options: { bold: true, fontSize: 9.5, fontFace, color: textColor } },
      { text: toolsList, options: { bold: false, fontSize: 9.5, fontFace, color: textColor } },
    ],
    {
      x: rightX + 0.2,
      y: expBannerY + bannerH + 1.05,
      w: rightW - 0.4,
      h: 0.35,
      valign: "top",
      lineSpacing: 13.5,
    }
  );

  // ── Right Section 2: Key Engagements ────────────────────────
  const engBannerY = 2.7;

  slide.addShape(pres.ShapeType.rect, {
    x: rightX,
    y: engBannerY,
    w: rightW,
    h: bannerH,
    fill: { color: cyanBlue },
    line: { color: cyanBlue },
  });
  slide.addText("Key Engagements", {
    x: rightX + 0.2,
    y: engBannerY,
    w: rightW - 0.4,
    h: bannerH,
    fontSize: 10.5,
    fontFace,
    bold: true,
    color: "FFFFFF",
    valign: "middle",
  });

  // Prepare Key Engagements / Featured Projects
  const projects =
    member.featuredProjects.length > 0
      ? member.featuredProjects.slice(0, 2)
      : [
          {
            title: `Worked as ${member.role} with Global Enterprise Client`,
            category: "Enterprise Solution",
            description:
              "Designed and developed end-to-end integration solutions connecting core business systems. Handled complex transformations, monitoring, performance tuning, and technical specification documents to ensure reliable operations.",
            technologies: member.skills.slice(0, 4),
            metrics: [],
            highlights: [],
          },
          {
            title: `Worked as ${member.role} with Regional Implementation Partner`,
            category: "Integration",
            description:
              "Engineered robust interfaces and API flows with secure connectivity configurations. Collaborated with functional and onsite teams to validate requirements, conduct UAT, and provide post-production support.",
            technologies: member.skills.slice(2, 6),
            metrics: [],
            highlights: [],
          },
        ];

  // Render Project 1
  const p1 = projects[0];
  const p1Lead = p1.title.startsWith("Worked as")
    ? p1.title
    : `Worked as ${member.role} on ${p1.title} (${p1.category || "Enterprise Project"})`;

  slide.addText(
    [
      {
        text: `•  ${p1Lead}, `,
        options: { bold: true, fontSize: 8.8, fontFace, color: textColor },
      },
      {
        text: `${p1.description} Authored Technical Specification Documents, supported UAT, Go-Live, and post-production activities. Performed system monitoring, performance tuning, and proactive issue resolution to maintain stable operations.`,
        options: { bold: false, fontSize: 8.8, fontFace, color: textColor },
      },
    ],
    {
      x: rightX + 0.2,
      y: engBannerY + bannerH + 0.08,
      w: rightW - 0.4,
      h: 1.85,
      valign: "top",
      lineSpacing: 13.5,
    }
  );

  // Render Project 2
  if (projects.length > 1) {
    const p2 = projects[1];
    const p2Lead = p2.title.startsWith("Worked as")
      ? p2.title
      : `Worked as ${member.role} on ${p2.title} (${p2.category || "Delivery"})`;

    slide.addText(
      [
        {
          text: `•  ${p2Lead}, `,
          options: { bold: true, fontSize: 8.8, fontFace, color: textColor },
        },
        {
          text: `${p2.description} Managed certificates, keystores, and secure connectivity configurations, while collaborating with functional and onsite teams to validate requirements and mapping logic. Reviewed mapping documents, supported UAT, Go-Live, and post-production support.`,
          options: { bold: false, fontSize: 8.8, fontFace, color: textColor },
        },
      ],
      {
        x: rightX + 0.2,
        y: engBannerY + bannerH + 1.98,
        w: rightW - 0.4,
        h: 1.9,
        valign: "top",
        lineSpacing: 13.5,
      }
    );
  }

  // File download with clean name
  const safeFilename = `${member.name.replace(/[^a-zA-Z0-9_-]/g, "_")}_Profile.pptx`;
  await pres.writeFile({ fileName: safeFilename });
}

/**
 * Backward compatibility alias for generateNativePPTX
 */
export async function generateNativePPTX(
  member: NormalizedMember,
  _options?: any
): Promise<void> {
  return downloadCandidatePPT(member);
}
