// lib/pptx/normalizeMemberData.ts
import { TeamMember, SubTeam } from "@/data/portfolio-data";
import { NormalizedMember, NormalizedProject, TokenReplacementMap } from "./types";

/**
 * Leniently normalizes any member object, safely handling:
 * - null or undefined inputs
 * - missing properties or unusual data types
 * - empty arrays / comma-delimited strings
 * - edge cases like long descriptions or zero projects
 */
export function normalizeMemberData(
  rawMember: any,
  subTeam?: SubTeam | string | null
): NormalizedMember {
  const member = rawMember || {};

  // Safe Name & Role
  const name = (typeof member.name === "string" && member.name.trim()) || "Candidate Profile";
  const role = (typeof member.role === "string" && member.role.trim()) || "Enterprise Consultant";

  // Subteam resolution
  let subTeamName = "Core Team";
  if (typeof subTeam === "string" && subTeam.trim()) {
    subTeamName = subTeam.trim();
  } else if (subTeam && typeof subTeam === "object" && subTeam.name) {
    subTeamName = subTeam.name;
  } else if (typeof member.subTeamName === "string") {
    subTeamName = member.subTeamName;
  }

  // Safe Contact Details
  const email = (typeof member.email === "string" && member.email.trim()) || "contact@cxcel.com";
  const phone = (typeof member.phone === "string" && member.phone.trim()) || "";

  // Safe Bio
  let bio = (typeof member.bio === "string" && member.bio.trim()) || 
    "Experienced enterprise professional with proven delivery track record in architecture, integration, and solution engineering.";

  // Safe Skills (can be array of strings or comma-separated string)
  let skills: string[] = [];
  if (Array.isArray(member.skills)) {
    skills = member.skills
      .map((s: any) => (typeof s === "string" ? s.trim() : String(s || "")))
      .filter((s: string) => s.length > 0);
  } else if (typeof member.skills === "string") {
    skills = member.skills
      .split(",")
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 0);
  }
  if (skills.length === 0) {
    skills = ["Architecture & Delivery", "Technical Consulting", "Solution Design"];
  }

  // Safe Qualifications
  let qualifications: string[] = [];
  if (Array.isArray(member.qualifications)) {
    qualifications = member.qualifications
      .map((q: any) => (typeof q === "string" ? q.trim() : String(q || "")))
      .filter((q: string) => q.length > 0);
  } else if (typeof member.qualifications === "string") {
    qualifications = member.qualifications
      .split("\n")
      .map((q: string) => q.trim())
      .filter((q: string) => q.length > 0);
  }

  // Safe Certifications
  let certifications: string[] = [];
  if (Array.isArray(member.certifications)) {
    certifications = member.certifications
      .map((c: any) => (typeof c === "string" ? c.trim() : String(c || "")))
      .filter((c: string) => c.length > 0);
  } else if (typeof member.certifications === "string") {
    certifications = member.certifications
      .split("\n")
      .map((c: string) => c.trim())
      .filter((c: string) => c.length > 0);
  }

  // Safe Badges
  let badges: { name: string; fallbackText?: string; color?: string }[] = [];
  if (Array.isArray(member.badges)) {
    badges = member.badges.map((b: any) => ({
      name: typeof b?.name === "string" ? b.name : "Badge",
      fallbackText: typeof b?.fallbackText === "string" ? b.fallbackText : undefined,
      color: typeof b?.color === "string" ? b.color : "#6366F1",
    }));
  }

  // Safe Featured Projects
  let featuredProjects: NormalizedProject[] = [];
  if (Array.isArray(member.featuredProjects) && member.featuredProjects.length > 0) {
    featuredProjects = member.featuredProjects.map((p: any) => {
      const pTitle = (typeof p?.title === "string" && p.title.trim()) || "Enterprise Delivery Case";
      const pDesc = (typeof p?.description === "string" && p.description.trim()) || "Successfully engineered and delivered enterprise solution.";
      const pCat = (typeof p?.category === "string" && p.category.trim()) || "Enterprise Architecture";
      
      let pTech: string[] = [];
      if (Array.isArray(p?.technologies)) {
        pTech = p.technologies.map((t: any) => (typeof t === "string" ? t.trim() : String(t))).filter(Boolean);
      }

      let pMetrics: { label: string; value: string }[] = [];
      if (Array.isArray(p?.metrics)) {
        pMetrics = p.metrics
          .filter((m: any) => m && (m.label || m.value))
          .map((m: any) => ({
            label: String(m.label || "Impact"),
            value: String(m.value || "100%"),
          }));
      }

      let pHighlights: string[] = [];
      if (Array.isArray(p?.highlights)) {
        pHighlights = p.highlights.map((h: any) => String(h || "")).filter(Boolean);
      }

      return {
        title: pTitle,
        category: pCat,
        description: pDesc,
        technologies: pTech,
        metrics: pMetrics,
        highlights: pHighlights,
      };
    });
  }

  // Safe Social Links
  const socialLinks = {
    github: typeof member.socialLinks?.github === "string" ? member.socialLinks.github : undefined,
    linkedin: typeof member.socialLinks?.linkedin === "string" ? member.socialLinks.linkedin : undefined,
    twitter: typeof member.socialLinks?.twitter === "string" ? member.socialLinks.twitter : undefined,
    website: typeof member.socialLinks?.website === "string" ? member.socialLinks.website : undefined,
  };

  return {
    id: String(member.id || `candidate_${Date.now()}`),
    name,
    role,
    subTeamName,
    email,
    phone,
    bio,
    skills,
    qualifications,
    certifications,
    badges,
    featuredProjects,
    socialLinks,
  };
}

/**
 * Builds a comprehensive dictionary of replacement tokens for template duplication.
 * Handles single tokens, numbered arrays, and bulleted text blocks.
 */
export function buildTokenMap(member: NormalizedMember): TokenReplacementMap {
  const map: TokenReplacementMap = {
    // Identity
    name: member.name,
    role: member.role,
    subteam: member.subTeamName,
    email: member.email,
    phone: member.phone,
    bio: member.bio,
    summary: member.bio,

    // Skills
    skills: member.skills.join(", "),
    skills_bullets: member.skills.map((s) => `• ${s}`).join("\n"),

    // Certifications
    certifications: member.certifications.length > 0
      ? member.certifications.map((c) => `• ${c}`).join("\n")
      : "• Certified Professional",
    certifications_inline: member.certifications.join(", ") || "Certified Professional",

    // Qualifications
    qualifications: member.qualifications.length > 0
      ? member.qualifications.map((q) => `• ${q}`).join("\n")
      : "• Bachelor of Engineering / Technology",
    qualifications_inline: member.qualifications.join(", ") || "Bachelor of Engineering",
  };

  // Populate individual skill slots {{skill_1}} to {{skill_12}}
  for (let i = 0; i < 12; i++) {
    map[`skill_${i + 1}`] = member.skills[i] || "";
  }

  // Populate individual certification slots {{cert_1}} to {{cert_5}}
  for (let i = 0; i < 5; i++) {
    map[`cert_${i + 1}`] = member.certifications[i] || "";
  }

  // Populate individual qualification slots {{qual_1}} to {{qual_3}}
  for (let i = 0; i < 3; i++) {
    map[`qual_${i + 1}`] = member.qualifications[i] || "";
  }

  // Populate Project 1 details
  const p1 = member.featuredProjects[0];
  map["project_1_title"] = p1 ? p1.title : "Enterprise Solution Delivery";
  map["project_1_desc"] = p1 ? p1.description : "Lead consultant delivering robust scalable enterprise capabilities.";
  map["project_1_tech"] = p1 ? p1.technologies.join(", ") : member.skills.slice(0, 4).join(", ");
  map["project_1_category"] = p1 ? p1.category : "Enterprise Delivery";
  map["project_1_metric"] = p1?.metrics[0] ? `${p1.metrics[0].value} ${p1.metrics[0].label}` : "";

  // Populate Project 2 details
  const p2 = member.featuredProjects[1];
  map["project_2_title"] = p2 ? p2.title : "High-Performance Integration Initiative";
  map["project_2_desc"] = p2 ? p2.description : "Executed end-to-end integration and solution modernization.";
  map["project_2_tech"] = p2 ? p2.technologies.join(", ") : member.skills.slice(2, 6).join(", ");
  map["project_2_category"] = p2 ? p2.category : "System Integration";
  map["project_2_metric"] = p2?.metrics[0] ? `${p2.metrics[0].value} ${p2.metrics[0].label}` : "";

  return map;
}
