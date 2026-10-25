// data/portfolio-data.ts

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  title: string;
  category?: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  metrics?: ProjectMetric[];
  highlights?: string[];
  liveUrl?: string;
  githubUrl?: string;
  docsUrl?: string;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  subTeamIds: string[];
  avatarUrl: string;
  bio: string;
  skills: string[];
  qualifications: string[];
  certifications: string[];
  badges: {
    name: string;
    logoUrl: string;
    fallbackText?: string;
    color?: string;
    base64?: string;
  }[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  featuredProjects: Project[];
}

export interface SubTeam {
  id: string;
  name: string;
  shortCode: string;
  description: string;
}

export interface TeamPortfolioData {
  teamInfo: {
    name: string;
    tagline: string;
    mission: string;
  };
  subTeams: SubTeam[];
  members: TeamMember[];
}

export const defaultTeamInfo = {
  name: "CX Studio — SAP Customer Experience Practice",
  tagline:
    "End-to-end SAP CX delivery — CRM, SAP Commerce, Marketing Cloud, CPI integrations, and S/4HANA extensions.",
  mission:
    "Design, build, integrate, and operate the full SAP Customer Experience stack for enterprises — from blueprint and BTP side-by-side extensions to B2B EDI, CPI iFlows, and run-the-business support.",
};

export const defaultSubTeams: SubTeam[] = [
  {
    id: "all",
    name: "All Members",
    shortCode: "ALL",
    description: "Full delivery roster across every SAP CX discipline.",
  },
  {
    id: "crm",
    name: "SAP CRM & Service",
    shortCode: "CRM",
    description:
      "SAP CRM, S/4HANA Service, interaction center, and field service management.",
  },
  {
    id: "cpi",
    name: "SAP CPI & Integration",
    shortCode: "CPI",
    description:
      "SAP Integration Suite (CPI), iFlows, legacy PI/PO, B2B/EDI, and Ariba network.",
  },
  {
    id: "functional",
    name: "SAP Functional",
    shortCode: "FNC",
    description:
      "S/4HANA SD/MM/FI/PP functional consulting, MDG, and business blueprinting.",
  },
  {
    id: "technical",
    name: "SAP Technical (ABAP / Fiori)",
    shortCode: "TEC",
    description:
      "ABAP, CDS, OData, RAP, SAP UI5, and Fiori Elements development.",
  },
  {
    id: "commerce",
    name: "SAP Commerce (Hybris)",
    shortCode: "CMC",
    description:
      "SAP Commerce Cloud, OCC API, Spartacus headless storefronts, and B2B accelerators.",
  },
  {
    id: "marketing",
    name: "SAP Marketing & Emarsys",
    shortCode: "MKT",
    description:
      "SAP Marketing Cloud, Emarsys journeys, Customer Data Platform, and segmentation.",
  },
  {
    id: "btp",
    name: "SAP BTP & Extensions",
    shortCode: "BTP",
    description:
      "SAP Business Technology Platform, CAP, SAP Build, side-by-side extensions, and HANA Cloud.",
  },
  {
    id: "analytics",
    name: "SAP Analytics & BW",
    shortCode: "ANL",
    description:
      "SAP Analytics Cloud, BW/4HANA, Datasphere, and embedded analytics.",
  },
  {
    id: "qa",
    name: "QA & Test Automation",
    shortCode: "QA",
    description:
      "CBTA, Solution Manager test suite, Tricentis Tosca, and CI/CD test pipelines.",
  },
  {
    id: "basis",
    name: "SAP Basis & DevOps",
    shortCode: "BAS",
    description:
      "HANA administration, Basis operations, BTP subaccounts, and landscape DevOps.",
  },
];

/**
 * Empty baseline structure. The single source of truth is the Google Sheet.
 */
export const emptyPortfolioData: TeamPortfolioData = {
  teamInfo: defaultTeamInfo,
  subTeams: defaultSubTeams,
  members: [],
};

// Backward-compatible alias — contains zero mock members
export const portfolioData: TeamPortfolioData = emptyPortfolioData;

export function getMembersBySubTeam(subTeamId: string): TeamMember[] {
  return [];
}

export function getMemberById(id: string): TeamMember | undefined {
  return undefined;
}
