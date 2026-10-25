// lib/pptx/sampleTemplateGenerator.ts

/**
 * Generates and downloads a clean sample starter .pptx template containing
 * all standard placeholders (e.g. {{name}}, {{role}}, {{skills}}).
 * Users can download this file, customize it in PowerPoint, and upload it.
 */
export async function downloadStarterTemplate(): Promise<void> {
  const pptxgenModule = await import("pptxgenjs");
  const PptxGenJS = pptxgenModule.default;
  const pres = new PptxGenJS();

  pres.layout = "LAYOUT_16x9";
  pres.title = "Sample Starter Template with Placeholders";

  const slide = pres.addSlide();
  slide.background = { color: "0B0F19" };

  // Top accent
  slide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.33,
    h: 0.1,
    fill: { color: "10B981" },
    line: { color: "10B981" },
  });

  // Header
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8,
    y: 0.4,
    w: 2.2,
    h: 0.3,
    rectRadius: 0.08,
    fill: { color: "064E3B" },
    line: { color: "10B981", width: 1 },
  });
  slide.addText("{{subteam}}", {
    x: 0.8,
    y: 0.4,
    w: 2.2,
    h: 0.3,
    fontSize: 10,
    fontFace: "Segoe UI",
    bold: true,
    color: "34D399",
    align: "center",
    valign: "middle",
  });

  slide.addText("{{name}}", {
    x: 0.8,
    y: 0.8,
    w: 7.5,
    h: 0.6,
    fontSize: 26,
    fontFace: "Segoe UI",
    bold: true,
    color: "FFFFFF",
  });

  slide.addText("{{role}}", {
    x: 0.8,
    y: 1.4,
    w: 7.5,
    h: 0.35,
    fontSize: 14,
    fontFace: "Segoe UI",
    bold: true,
    color: "34D399",
  });

  slide.addText("Email: {{email}}   |   Phone: {{phone}}", {
    x: 6.5,
    y: 0.5,
    w: 6.0,
    h: 0.35,
    fontSize: 10,
    fontFace: "Segoe UI",
    color: "94A3B8",
    align: "right",
  });

  // Left Column
  // Bio
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8,
    y: 1.9,
    w: 4.2,
    h: 1.7,
    rectRadius: 0.08,
    fill: { color: "131B2E" },
    line: { color: "1E293B", width: 1 },
  });
  slide.addText("EXECUTIVE SUMMARY", {
    x: 1.05,
    y: 2.05,
    w: 3.7,
    h: 0.25,
    fontSize: 10,
    fontFace: "Segoe UI",
    bold: true,
    color: "34D399",
  });
  slide.addText("{{bio}}", {
    x: 1.05,
    y: 2.35,
    w: 3.7,
    h: 1.1,
    fontSize: 10,
    fontFace: "Segoe UI",
    color: "94A3B8",
    lineSpacing: 16,
  });

  // Skills
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8,
    y: 3.75,
    w: 4.2,
    h: 1.6,
    rectRadius: 0.08,
    fill: { color: "131B2E" },
    line: { color: "1E293B", width: 1 },
  });
  slide.addText("CORE COMPETENCIES", {
    x: 1.05,
    y: 3.9,
    w: 3.7,
    h: 0.25,
    fontSize: 10,
    fontFace: "Segoe UI",
    bold: true,
    color: "34D399",
  });
  slide.addText("{{skills_bullets}}", {
    x: 1.05,
    y: 4.2,
    w: 3.7,
    h: 1.05,
    fontSize: 10,
    fontFace: "Segoe UI",
    color: "FFFFFF",
    lineSpacing: 17,
  });

  // Certifications
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8,
    y: 5.5,
    w: 4.2,
    h: 1.45,
    rectRadius: 0.08,
    fill: { color: "131B2E" },
    line: { color: "1E293B", width: 1 },
  });
  slide.addText("CREDENTIALS", {
    x: 1.05,
    y: 5.65,
    w: 3.7,
    h: 0.25,
    fontSize: 10,
    fontFace: "Segoe UI",
    bold: true,
    color: "34D399",
  });
  slide.addText("{{certifications}}", {
    x: 1.05,
    y: 5.95,
    w: 3.7,
    h: 0.9,
    fontSize: 9.5,
    fontFace: "Segoe UI",
    color: "94A3B8",
    lineSpacing: 16,
  });

  // Right Column (Projects)
  // Project 1
  slide.addShape(pres.ShapeType.roundRect, {
    x: 5.25,
    y: 1.9,
    w: 7.28,
    h: 2.45,
    rectRadius: 0.08,
    fill: { color: "131B2E" },
    line: { color: "1E293B", width: 1 },
  });
  slide.addText("PROJECT 01: {{project_1_title}}", {
    x: 5.55,
    y: 2.1,
    w: 6.68,
    h: 0.35,
    fontSize: 13,
    fontFace: "Segoe UI",
    bold: true,
    color: "FFFFFF",
  });
  slide.addText("Category: {{project_1_category}}", {
    x: 5.55,
    y: 2.45,
    w: 6.68,
    h: 0.25,
    fontSize: 9.5,
    fontFace: "Segoe UI",
    color: "34D399",
  });
  slide.addText("{{project_1_desc}}", {
    x: 5.55,
    y: 2.75,
    w: 6.68,
    h: 0.9,
    fontSize: 10,
    fontFace: "Segoe UI",
    color: "94A3B8",
    lineSpacing: 16,
  });
  slide.addText("Technologies: {{project_1_tech}}", {
    x: 5.55,
    y: 3.9,
    w: 6.68,
    h: 0.25,
    fontSize: 9,
    fontFace: "Segoe UI",
    bold: true,
    color: "34D399",
  });

  // Project 2
  slide.addShape(pres.ShapeType.roundRect, {
    x: 5.25,
    y: 4.5,
    w: 7.28,
    h: 2.45,
    rectRadius: 0.08,
    fill: { color: "131B2E" },
    line: { color: "1E293B", width: 1 },
  });
  slide.addText("PROJECT 02: {{project_2_title}}", {
    x: 5.55,
    y: 4.7,
    w: 6.68,
    h: 0.35,
    fontSize: 13,
    fontFace: "Segoe UI",
    bold: true,
    color: "FFFFFF",
  });
  slide.addText("Category: {{project_2_category}}", {
    x: 5.55,
    y: 5.05,
    w: 6.68,
    h: 0.25,
    fontSize: 9.5,
    fontFace: "Segoe UI",
    color: "34D399",
  });
  slide.addText("{{project_2_desc}}", {
    x: 5.55,
    y: 5.35,
    w: 6.68,
    h: 0.9,
    fontSize: 10,
    fontFace: "Segoe UI",
    color: "94A3B8",
    lineSpacing: 16,
  });
  slide.addText("Technologies: {{project_2_tech}}", {
    x: 5.55,
    y: 6.5,
    w: 6.68,
    h: 0.25,
    fontSize: 9,
    fontFace: "Segoe UI",
    bold: true,
    color: "34D399",
  });

  await pres.writeFile({ fileName: "Sample_Candidate_Profile_Template.pptx" });
}
