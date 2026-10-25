// lib/pptx/types.ts
import { TeamMember, SubTeam, Project } from "@/data/portfolio-data";

export type PPTTemplateType = "executive-one-pager" | "consulting-two-pager";
export type PPTTheme = "dark" | "light";

export interface NormalizedProject {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  highlights: string[];
}

export interface NormalizedMember {
  id: string;
  name: string;
  role: string;
  subTeamName: string;
  email: string;
  phone: string;
  bio: string;
  skills: string[];
  qualifications: string[];
  certifications: string[];
  badges: {
    name: string;
    fallbackText?: string;
    color?: string;
    logoUrl?: string;
    base64?: string;
  }[];
  featuredProjects: NormalizedProject[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface PPTGenerationOptions {
  template: PPTTemplateType;
  theme?: PPTTheme;
  subTeamName?: string;
}

export interface TokenReplacementMap {
  [token: string]: string;
}

export interface ReplicationResult {
  success: boolean;
  replacementsCount: number;
  tokensFound: string[];
  error?: string;
}
