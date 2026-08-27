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

export const portfolioData: TeamPortfolioData = {
  teamInfo: {
    name: "CXcel — SAP Customer Experience Studio",
    tagline:
      "End-to-end SAP CX delivery — CRM, SAP Commerce, Marketing Cloud, CPI integrations, and S/4HANA extensions.",
    mission:
      "Design, build, integrate, and operate the full SAP Customer Experience stack for enterprises — from blueprint and BTP side-by-side extensions to B2B EDI, CPI iFlows, and run-the-business support.",
  },
  subTeams: [
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
  ],
  members: [
    {
      id: "m-1",
      slug: "arjun-mehta",
      name: "Arjun Mehta",
      role: "SAP CRM & Service Lead",
      email: "arjun.mehta@cxcel.io",
      phone: "+91 98450 11201",
      subTeamIds: ["crm", "functional"],
      avatarUrl:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&auto=format&fit=crop&q=80",
      bio: "Leads CRM and S/4HANA Service functional streams — service ticket design, interaction center, and SLA-driven workflow with BRF+.",
      skills: [
        "SAP CRM 7.0",
        "S/4HANA Service",
        "BRF+",
        "Web UI",
        "SAP Fiori",
        "Business Workflow",
      ],
      qualifications: [
        "B.Tech, Computer Science — IIT Madras",
        "MBA, Operations — IIM Bangalore",
      ],
      certifications: [
        "SAP Certified Application Associate — SAP CRM 7.0",
        "SAP Certified Development Associate — ABAP with SAP NetWeaver 7.40",
        "S/4HANA Service 1909 Certification",
      ],
      badges: [
        {
          name: "SAP",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/200px-SAP_2011_logo.svg.png",
        },
        {
          name: "Salesforce Administrator",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/200px-Salesforce.com_logo.svg.png",
        },
        {
          name: "AWS",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/200px-Amazon_Web_Services_Logo.svg.png",
        },
      ],
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
        website: "https://example.com",
      },
      featuredProjects: [
        {
          title: "Intelligent Service Ticket Routing",
          category: "Service Automation",
          description:
            "Rule-based auto-triage engine using BRF+ and SAP Business Workflow to route inbound service tickets to the right agent queue in under 3 seconds.",
          longDescription:
            "Replaces 14 hard-coded custom tables with a single BRF+ ruleset that scores every incoming ticket on product line, SLA window, region, customer tier, and language. Routing decisions are persisted via custom workflow containers and exposed back to the Interaction Center through a custom Web UI component.",
          technologies: [
            "BRF+",
            "SAP Business Workflow",
            "Web UI",
            "ABAP OO",
            "SAP CRM",
          ],
          metrics: [
            { label: "Avg. Triage Time", value: "2.1s" },
            { label: "Mis-routes", value: "-71%" },
            {
              label: "Rule Set Maintainability",
              value: "1 ruleset vs 14 tables",
            },
          ],
          highlights: [
            "Hot-reloadable BRF+ ruleset with version history",
            "Embedded analytics tile showing real-time triage SLA in Web UI",
          ],
        },
      ],
    },
    {
      id: "m-2",
      slug: "priya-iyer",
      name: "Priya Iyer",
      role: "SAP CPI Integration Architect",
      email: "priya.iyer@cxcel.io",
      phone: "+91 99008 21542",
      subTeamIds: ["cpi"],
      avatarUrl:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80",
      bio: "Designs SAP Integration Suite (CPI) iFlows for O2C, B2B EDI, and Ariba. Owns the integration architecture playbook across the CX landscape.",
      skills: [
        "SAP CPI",
        "iFlows",
        "Groovy",
        "XSLT",
        "SAP PI/PO",
        "REST/SOAP",
        "SAP BTP",
      ],
      qualifications: [
        "B.E., Information Technology — Anna University, Chennai",
        "Certified Cloud Architect — SAP BTP",
      ],
      certifications: [
        "SAP Certified Integration Associate — SAP Integration Suite",
        "SAP Certified Development Associate — SAP BTP Extension Developer",
        "Togaf 9.2 Certified",
        "MuleSoft Certified Integration Architect",
      ],
      badges: [
        {
          name: "SAP",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/200px-SAP_2011_logo.svg.png",
        },
        {
          name: "MuleSoft",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/MuleSoft_logo.svg/200px-MuleSoft_logo.svg.png",
          color: "#00A0DF",
        },
        {
          name: "TOGAF",
          logoUrl: "",
          fallbackText: "TG",
          color: "#7A2C8E",
        },
      ],
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        website: "https://example.com",
      },
      featuredProjects: [
        {
          title: "S/4HANA ↔ Salesforce Order-to-Cash",
          category: "CX Integration",
          description:
            "Bi-directional sync of sales orders, line items, invoice status, and payments between S/4HANA Sales and Salesforce Sales Cloud via SAP CPI and SAP BTP.",
          longDescription:
            "Architects the O2C flow that pushes S/4HANA sales orders to Salesforce as Opportunities, pulls Salesforce quote-to-orders back as S/4HANA Sales Orders, and reconciles invoice + payment status in near real time. Handles IDoc, ODATA, and REST adapters in a single tenant with proper message-level idempotency and dead-letter handling.",
          technologies: [
            "SAP CPI",
            "SAP BTP",
            "OData V4",
            "IDoc",
            "Groovy",
            "Salesforce REST API",
          ],
          metrics: [
            { label: "Avg. Sync Latency", value: "14s" },
            { label: "Throughput", value: "1,200 docs/min" },
            { label: "Reconciliation Drift", value: "< 0.03%" },
          ],
          highlights: [
            "Idempotent message store with retry + dead-letter queue",
            "Custom Groovy mapping for SAP date/time zone normalization",
          ],
          githubUrl: "https://github.com",
          docsUrl: "https://example.com/docs",
        },
        {
          title: "B2B EDI Integration Hub",
          category: "B2B / EDI",
          description:
            "Centralized EDI 850/855/856/810 flow for 40+ trading partners with AS2 connectivity, partner-specific envelopes, and SAP CPI as the integration backbone.",
          longDescription:
            "Replaces a fragmented set of legacy PI/PO EDI interfaces with a single CPI-based B2B hub. Each trading partner has its own iFlow variant with a shared core for envelope parsing, validation, and IDoc generation, drastically reducing partner onboarding time.",
          technologies: [
            "SAP CPI",
            "EDI X12",
            "AS2",
            "OpenText GXS",
            "IDoc",
            "XSLT",
          ],
          metrics: [
            { label: "Onboarded Partners", value: "40+" },
            { label: "Avg. Onboarding", value: "3.5 days" },
            { label: "Rejection Rate", value: "0.18%" },
          ],
          highlights: [
            "Partner-isolated error queues with email + Teams alerts",
            "Replay UI built on SAP BTP for ops to re-trigger failed messages",
          ],
        },
      ],
    },
    {
      id: "m-3",
      slug: "rahul-krishnan",
      name: "Rahul Krishnan",
      role: "SAP Technical Lead (ABAP / Fiori)",
      email: "rahul.krishnan@cxcel.io",
      phone: "+91 96321 47890",
      subTeamIds: ["technical"],
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      bio: "Builds reusable ABAP, CDS, OData, and RAP layers for S/4HANA — also runs the team's Fiori Elements development guidelines.",
      skills: [
        "ABAP OO",
        "CDS Views",
        "AMDP",
        "OData V4",
        "RAP",
        "SAP UI5",
        "Fiori Elements",
      ],
      qualifications: [
        "M.Tech, Software Engineering — NIT Trichy",
        "SAP Mentor (2024)",
      ],
      certifications: [
        "SAP Certified Development Specialist — ABAP for S/4HANA",
        "SAP Certified Development Associate — SAP Fiori Application Developer",
        "C_S4HANA250 — SAP S/4HANA Cloud Private Edition",
      ],
      badges: [
        {
          name: "SAP",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/200px-SAP_2011_logo.svg.png",
        },
        {
          name: "OpenJS",
          logoUrl: "",
          fallbackText: "JS",
          color: "#F7DF1E",
        },
      ],
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
      featuredProjects: [
        {
          title: "Custom Sales Order Approval App",
          category: "Fiori / RAP",
          description:
            "RAP-based Fiori Elements app for multi-level sales order approval with custom actions, attachments, and email notifications.",
          longDescription:
            "A clean RAP (RESTful ABAP Programming Model) implementation: managed scenario with behavior definition, custom actions for approve/reject, draft handling, and a side-by-side integration into the standard SAP Fiori launchpad. Approvals route by amount, plant, and sales org hierarchy — fully configurable via a custom approval table.",
          technologies: [
            "RAP",
            "ABAP OO",
            "CDS Views",
            "OData V4",
            "Fiori Elements",
            "Workflow",
          ],
          metrics: [
            { label: "Avg. Approval Cycle", value: "4.2 hrs → 28 min" },
            { label: "Custom Actions", value: "11" },
            { label: "E2E Tests", value: "92% coverage" },
          ],
          highlights: [
            "Behavior definition with late numbering and draft handling",
            "Side-by-side reuse of standard SAP BTP destinations",
          ],
          githubUrl: "https://github.com",
        },
        {
          title: "Field Service OData Suite",
          category: "Reusable Service Layer",
          description:
            "A library of 28 reusable CDS-based OData services powering the field service mobile app — including pagination, ETags, and delta queries.",
          longDescription:
            "Defines a standardized CDS pattern for field service entities: header, item, status, attachment, and log CDS views with proper annotations for mobile consumption. Includes a custom gateway log analyzer that surfaces the slowest 1% of requests.",
          technologies: [
            "CDS Views",
            "OData V4",
            "SAP Gateway",
            "ABAP",
            "ST05",
          ],
          metrics: [
            { label: "Reusable Services", value: "28" },
            { label: "P95 Latency", value: "184ms" },
            { label: "Bandwidth Saved (Delta)", value: "62%" },
          ],
          highlights: [
            "Standardized @OData annotations for offline sync",
            "ETag-based optimistic concurrency for the mobile app",
          ],
        },
      ],
    },
    {
      id: "m-4",
      slug: "sneha-reddy",
      name: "Sneha Reddy",
      role: "SAP Commerce (Hybris) Lead",
      email: "sneha.reddy@cxcel.io",
      phone: "+91 91773 60812",
      subTeamIds: ["commerce"],
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
      bio: "Architects B2B and B2C storefronts on SAP Commerce Cloud — from accelerators to Spartacus headless.",
      skills: [
        "SAP Commerce",
        "Java",
        "Spring",
        "OCC API",
        "SmartEdit",
        "Spartacus",
      ],
      qualifications: [
        "B.Tech, Computer Science — BITS Pilani",
        "AWS Certified Solutions Architect — Associate",
      ],
      certifications: [
        "SAP Certified Development Professional — SAP Commerce Cloud 2105 Developer",
        "SAP Certified Development Associate — SAP Commerce Cloud 2005 Developer",
        "Oracle Certified Professional, Java SE 11 Developer",
      ],
      badges: [
        {
          name: "SAP",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/200px-SAP_2011_logo.svg.png",
        },
        {
          name: "Java",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Java_logo.svg/200px-Java_logo.svg.png",
          color: "#E76F00",
        },
        {
          name: "Spring",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Spring_Framework_Logo_2018.svg/200px-Spring_Framework_Logo_2018.svg.png",
          color: "#6DB33F",
        },
      ],
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        website: "https://example.com",
      },
      featuredProjects: [
        {
          title: "B2B Accelerator Storefront",
          category: "SAP Commerce",
          description:
            "Custom B2B accelerator on SAP Commerce 2105 with role-based pricing, quote-to-order, and integration into the S/4HANA pricing engine.",
          longDescription:
            "Built a B2B storefront on top of the SAP Commerce B2B accelerator with custom price factory logic that calls the S/4HANA pricing API in real time. Includes a quote-to-order flow with approver hierarchy, an account-specific catalog, and customer-specific payment terms.",
          technologies: [
            "SAP Commerce 2105",
            "Java 11",
            "Spring",
            "OCC API",
            "SmartEdit",
            "Karma",
          ],
          metrics: [
            { label: "Page Load (P95)", value: "1.1s" },
            { label: "Cart Conversion", value: "+18.4%" },
            { label: "Custom Addons", value: "12" },
          ],
          highlights: [
            "Real-time price/availability calls into S/4HANA via CPI",
            "Custom SmartEdit components for merchandising team",
          ],
          liveUrl: "https://example.com",
        },
        {
          title: "Spartacus Headless Storefront",
          category: "Headless Commerce",
          description:
            "PWA storefront built on Spartacus 5.x with Adobe Experience Platform integration, headless CMS, and edge-cached product APIs.",
          longDescription:
            "Migrated the legacy accelerator-based storefront to a fully headless Spartacus PWA, decoupled from the CMS and fronted by a CDN-cached OCC layer. Added Adobe Experience Platform events for real-time personalization.",
          technologies: [
            "Spartacus 5",
            "Angular",
            "Node.js",
            "AEP",
            "Contentful",
            "Akamai",
          ],
          metrics: [
            { label: "Lighthouse Perf", value: "94" },
            { label: "Edge Cache Hit", value: "82%" },
            { label: "Time to Interactive", value: "1.6s" },
          ],
          highlights: [
            "Stream-based AEP event pipeline for personalization",
            "Pre-rendered PDP pages with on-demand ISR",
          ],
          liveUrl: "https://example.com",
        },
      ],
    },
    {
      id: "m-5",
      slug: "vikram-sharma",
      name: "Vikram Sharma",
      role: "SAP Marketing Cloud / Emarsys Specialist",
      email: "vikram.sharma@cxcel.io",
      phone: "+91 99802 33419",
      subTeamIds: ["marketing"],
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      bio: "Builds multi-channel customer journeys in Emarsys and SAP Marketing Cloud — connected to S/4HANA sales and CX commerce data.",
      skills: [
        "SAP Emarsys",
        "SAP Marketing Cloud",
        "Customer Journey",
        "CDP",
        "Segmentation",
        "SQL",
      ],
      qualifications: [
        "PGDM, Marketing — ISB Hyderabad",
        "Google Data Analytics Professional Certificate",
      ],
      certifications: [
        "SAP Certified Application Associate — SAP Marketing Cloud 2002",
        "Emarsys Master Solutions Architect",
        "Adobe Certified Expert — Adobe Experience Platform",
      ],
      badges: [
        {
          name: "SAP",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/200px-SAP_2011_logo.svg.png",
        },
        {
          name: "Adobe",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Adobe_Systems_logo_and_wordmark.svg/200px-Adobe_Systems_logo_and_wordmark.svg.png",
          color: "#FA0F00",
        },
        {
          name: "Google",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png",
          color: "#4285F4",
        },
      ],
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
        website: "https://example.com",
      },
      featuredProjects: [
        {
          title: "Omnichannel Customer Journey Orchestration",
          category: "Marketing Automation",
          description:
            "Lifecycle journey program in Emarsys that triggers SAP CPI workflows back into S/4HANA for personalized offers, stock checks, and store credits.",
          longDescription:
            "Replaces 6 disconnected email/WhatsApp/SMS campaigns with a single Emarsys journey builder. The journey calls custom SAP CPI endpoints via webhook nodes to fetch real-time stock and customer credit, then branches the customer into the right next-best-action.",
          technologies: [
            "SAP Emarsys",
            "SAP CPI",
            "Webhook",
            "JavaScript",
            "S/4HANA OData",
          ],
          metrics: [
            { label: "Journey Reach", value: "1.2M / month" },
            { label: "Conversion Lift", value: "+23%" },
            { label: "Unsubscribe Rate", value: "-41%" },
          ],
          highlights: [
            "Real-time stock-aware offer personalization",
            "Fallback rules for customers with empty CDP profiles",
          ],
          liveUrl: "https://example.com",
        },
        {
          title: "Customer Data Platform 360",
          category: "Customer Data Platform",
          description:
            "Unified customer profile stitched from web, mobile, POS, and S/4HANA sales data, exposed as a single audience layer to Emarsys and the contact center.",
          longDescription:
            "Built a CDP unification layer that ingests events from web SDK, mobile SDK, POS nightly files, and S/4HANA master + transaction data via SAP CPI. Resolves identity using a deterministic match table with probabilistic fallback. Exposes segments to Emarsys, the contact center, and the SAP Marketing Cloud prediction engine.",
          technologies: [
            "SAP Customer Data Platform",
            "SAP CPI",
            "Kafka",
            "Identity Resolution",
            "SQL",
          ],
          metrics: [
            { label: "Stitched Profiles", value: "3.4M" },
            { label: "Identity Match Rate", value: "91.3%" },
            { label: "Audience Latency", value: "< 5 min" },
          ],
          highlights: [
            "Probabilistic matching with audit trail and GDPR delete propagation",
            "Segment publish API reusable by contact center UI",
          ],
        },
      ],
    },
    {
      id: "m-6",
      slug: "anjali-desai",
      name: "Anjali Desai",
      role: "S/4HANA Functional Consultant (SD / MM / FI)",
      email: "anjali.desai@cxcel.io",
      phone: "+91 97412 55067",
      subTeamIds: ["functional"],
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
      bio: "Owns end-to-end functional blueprints for S/4HANA Sales, Procurement, and Finance for manufacturing and retail clients.",
      skills: [
        "S/4HANA SD",
        "S/4HANA MM",
        "S/4HANA FI",
        "Signavio",
        "Business Blueprint",
        "Fiori Apps",
      ],
      qualifications: [
        "Chartered Accountant (CA) — ICAI",
        "B.Com (Hons), SRCC — University of Delhi",
      ],
      certifications: [
        "SAP Certified Application Professional — S/4HANA Sales 2022",
        "SAP Certified Application Associate — S/4HANA Sourcing and Procurement",
        "Signavio Process Insights Certified",
      ],
      badges: [
        {
          name: "SAP",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/200px-SAP_2011_logo.svg.png",
        },
        {
          name: "CA",
          logoUrl: "",
          fallbackText: "CA",
          color: "#1B3B6F",
        },
      ],
      socialLinks: {
        linkedin: "https://linkedin.com",
        website: "https://example.com",
      },
      featuredProjects: [
        {
          title: "S/4HANA SD Greenfield Blueprint",
          category: "Functional Blueprint",
          description:
            "From-scratch S/4HANA SD blueprint for a global manufacturing group — order-to-cash, billing, output management, and credit management — designed in Signavio.",
          longDescription:
            "Mapped 220+ as-is processes to S/4HANA to-be in Signavio, with a strong focus on simplification items, custom code retirement, and Fiori app adoption. The blueprint covered cross-border pricing, output channels, and a unified credit management design across 14 legal entities.",
          technologies: ["S/4HANA SD", "Signavio", "Fiori Apps", "IDoc", "EDI"],
          metrics: [
            { label: "Processes Mapped", value: "220+" },
            { label: "Simplification Items", value: "74 closed" },
            { label: "Legal Entities in Scope", value: "14" },
          ],
          highlights: [
            "Cross-border pricing with condition technique simplifications",
            "Single credit management cockpit with regional limit hierarchies",
          ],
          docsUrl: "https://example.com/docs",
        },
        {
          title: "Cross-Module Pricing & Rebate Engine",
          category: "Cross-Module Customization",
          description:
            "Unified pricing and customer rebate engine spanning SD, MM, and FI with signavio-traceable rules and monthly accrual posting.",
          longDescription:
            "Designed a pricing architecture that combines standard condition technique with a custom rebate framework posting accruals into FI-CO on a monthly basis. All rules are versioned in Signavio and exposed to business via a custom Fiori app for simulation.",
          technologies: [
            "S/4HANA SD",
            "S/4HANA FI",
            "BRF+",
            "Signavio",
            "Fiori",
          ],
          metrics: [
            { label: "Rebate Variants", value: "38" },
            { label: "Accrual Posting Time", value: "12 min" },
            { label: "Manual Adjustments", value: "-86%" },
          ],
          highlights: [
            "Fiori-based rebate simulation app for sales ops",
            "Automatic accrual posting with audit-trail workflow",
          ],
        },
      ],
    },
    {
      id: "m-7",
      slug: "karthik-nair",
      name: "Karthik Nair",
      role: "SAP BTP & CAP Developer",
      email: "karthik.nair@cxcel.io",
      phone: "+91 95009 18842",
      subTeamIds: ["btp", "technical"],
      avatarUrl:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&auto=format&fit=crop&q=80",
      bio: "Builds side-by-side extensions on SAP BTP using CAP, Node.js, and SAP Build — the team's go-to for anything cloud-native.",
      skills: [
        "SAP BTP",
        "CAP",
        "Node.js",
        "Java",
        "SAP Build",
        "HANA Cloud",
        "MTA",
      ],
      qualifications: [
        "B.Tech, Information Technology — College of Engineering, Pune",
        "Kubernetes Application Developer (CKAD)",
      ],
      certifications: [
        "SAP Certified Development Associate — SAP BTP, Cloud Foundry and Kyma",
        "SAP Certified Development Associate — SAP Cloud Application Programming Model",
        "AWS Certified Developer — Associate",
      ],
      badges: [
        {
          name: "SAP",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/200px-SAP_2011_logo.svg.png",
        },
        {
          name: "Kubernetes",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/200px-Kubernetes_logo_without_workmark.svg.png",
          color: "#326CE5",
        },
        {
          name: "Node.js",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/200px-Node.js_logo.svg.png",
          color: "#339933",
        },
      ],
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
      },
      featuredProjects: [
        {
          title: "Side-by-Side Subscription Billing",
          category: "BTP / CAP",
          description:
            "A subscription billing micro-service built on CAP and SAP BTP, Kyma runtime — with event-driven reactivation tied to S/4HANA billing.",
          longDescription:
            "A clean side-by-side extension: a CAP-based service that owns the subscription lifecycle, emits business events, and consumes S/4HANA events via SAP Event Mesh. Deployed as a multi-target application (MTA) on the Kyma runtime, with HANA Cloud for persistence.",
          technologies: [
            "CAP",
            "Node.js",
            "SAP BTP Kyma",
            "HANA Cloud",
            "SAP Event Mesh",
            "MTA",
          ],
          metrics: [
            { label: "Active Subscriptions", value: "180K" },
            { label: "Event Latency (P95)", value: "210ms" },
            { label: "Deploy Frequency", value: "8 / day" },
          ],
          highlights: [
            "Event-driven reactivation via SAP Event Mesh",
            "Zero-downtime blue/green deploys on Kyma",
          ],
          githubUrl: "https://github.com",
          liveUrl: "https://example.com",
        },
        {
          title: "Invoice Approval via SAP Build Process Automation",
          category: "Process Automation",
          description:
            "Invoice approval workflow built on SAP Build Process Automation with OCR-based invoice intake, multi-level routing, and S/4HANA posting.",
          longDescription:
            "Drag-and-drop workflow in SAP Build PA, with a custom bot extracting invoice fields via OCR and pushing the approved FI document into S/4HANA via an OData call. Configurable routing rules per company code and amount threshold.",
          technologies: [
            "SAP Build Process Automation",
            "OCR",
            "SAP BTP",
            "S/4HANA OData",
            "Low-code",
          ],
          metrics: [
            { label: "Invoices / Month", value: "42K" },
            { label: "Avg. Approval Time", value: "6h → 38m" },
            { label: "OCR Accuracy", value: "97.4%" },
          ],
          highlights: [
            "Bot-driven OCR with manual correction UI",
            "Configurable approver hierarchy per company code",
          ],
          liveUrl: "https://example.com",
        },
      ],
    },
    {
      id: "m-8",
      slug: "divya-menon",
      name: "Divya Menon",
      role: "SAP Analytics Cloud (SAC) Lead",
      email: "divya.menon@cxcel.io",
      phone: "+91 94470 32615",
      subTeamIds: ["analytics"],
      avatarUrl:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&auto=format&fit=crop&q=80",
      bio: "Designs real-time CX analytics in SAP Analytics Cloud, BW/4HANA, and Datasphere — including Smart Predict churn models.",
      skills: [
        "SAP Analytics Cloud",
        "BW/4HANA",
        "Datasphere",
        "CDS Analytical",
        "HANA Calc Views",
        "Smart Predict",
      ],
      qualifications: [
        "M.Sc, Data Science — IIT Bombay",
        "Microsoft Certified: Azure Data Scientist Associate",
      ],
      certifications: [
        "SAP Certified Application Associate — SAP Analytics Cloud",
        "SAP Certified Application Associate — SAP BW/4HANA 2.0",
        "Google Professional Data Engineer",
      ],
      badges: [
        {
          name: "SAP",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/200px-SAP_2011_logo.svg.png",
        },
        {
          name: "Azure",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Microsoft_Azure_Logo.svg/200px-Microsoft_Azure_Logo.svg.png",
          color: "#0078D4",
        },
        {
          name: "Google Cloud",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/200px-Google_Cloud_logo.svg.png",
          color: "#4285F4",
        },
      ],
      socialLinks: {
        linkedin: "https://linkedin.com",
        website: "https://example.com",
      },
      featuredProjects: [
        {
          title: "CX Real-Time Sales Dashboard",
          category: "Embedded Analytics",
          description:
            "Real-time CX sales dashboard in SAC consuming CDS analytical views from S/4HANA and SAP Commerce — refreshed every 5 minutes.",
          longDescription:
            "Built a curated CDS analytical layer on S/4HANA Sales + SAP Commerce OCC data, modeled in Datasphere, and surfaced as a SAC story with drill-down by region, channel, and product line. Includes alerts on revenue variance and a side-by-side comparison vs. plan.",
          technologies: [
            "SAP Analytics Cloud",
            "CDS Analytical",
            "Datasphere",
            "S/4HANA",
            "HANA Calc Views",
          ],
          metrics: [
            { label: "Refresh Latency", value: "5 min" },
            { label: "Concurrent Users", value: "320" },
            { label: "Dashboards", value: "18" },
          ],
          highlights: [
            "Alerts-driven narrative insight tiles",
            "Embedded SAP Datasphere replication flows",
          ],
          liveUrl: "https://example.com",
        },
        {
          title: "Predictive Customer Churn Model",
          category: "Smart Predict",
          description:
            "Predictive churn model in SAC Smart Predict that scores every active customer weekly and feeds risk lists back to Emarsys and the contact center.",
          longDescription:
            "A classification model trained on 24 months of transaction, complaint, and engagement data. The risk list is published as a SAP Analytics Cloud catalog dataset and consumed by Emarsys for retention journeys and by the SAP Contact Center for agent guidance.",
          technologies: [
            "SAC Smart Predict",
            "Datasphere",
            "Python",
            "SAP Emarsys API",
          ],
          metrics: [
            { label: "Model AUC", value: "0.87" },
            { label: "Customers Scored", value: "1.4M / week" },
            { label: "Retention Campaign ROI", value: "3.6x" },
          ],
          highlights: [
            "Model drift monitoring with auto-retrain trigger",
            "Closed-loop publishing back to Emarsys and contact center",
          ],
        },
      ],
    },
    {
      id: "m-9",
      slug: "rohan-banerjee",
      name: "Rohan Banerjee",
      role: "SAP PI/PO & B2B Integration Consultant",
      email: "rohan.banerjee@cxcel.io",
      phone: "+91 98367 11290",
      subTeamIds: ["cpi"],
      avatarUrl:
        "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?w=200&auto=format&fit=crop&q=80",
      bio: "Lives in the legacy SAP PI/PO world and is leading the customer's migration to SAP Integration Suite (CPI).",
      skills: [
        "SAP PI/PO",
        "EDI",
        "AS2",
        "IDoc",
        "Proxies",
        "SAP Ariba",
        "SAP BTP",
      ],
      qualifications: [
        "B.Tech, Electronics & Communication — Jadavpur University",
        "EDI Standards Specialist — X12 / EDIFACT",
      ],
      certifications: [
        "SAP Certified Development Associate — SAP PI 7.5 / SAP NetWeaver",
        "SAP Certified Integration Associate — SAP Ariba",
        "OpenText GXS Certified B2B Specialist",
      ],
      badges: [
        {
          name: "SAP",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/200px-SAP_2011_logo.svg.png",
        },
        {
          name: "OpenText",
          logoUrl: "",
          fallbackText: "OT",
          color: "#D52B1E",
        },
        {
          name: "IBM",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/200px-IBM_logo.svg.png",
          color: "#1F70C1",
        },
      ],
      socialLinks: {
        linkedin: "https://linkedin.com",
      },
      featuredProjects: [
        {
          title: "PI 7.5 → CPI Migration Factory",
          category: "Integration Modernization",
          description:
            "Migration factory to move 180+ SAP PI 7.5 interfaces to SAP Integration Suite with reusable iFlow templates and a wave plan.",
          longDescription:
            "Built a migration factory that re-platforms PI interfaces in 3 archetypes (sync, async, B2B) into reusable CPI iFlow templates. Includes a meta-data extraction tool from PI ESR, automated iFlow generation, and a side-by-side cutover playbook with reconciliation reports.",
          technologies: [
            "SAP PI 7.5",
            "SAP CPI",
            "Java Mapping",
            "XSLT",
            "Groovy",
          ],
          metrics: [
            { label: "Interfaces Migrated", value: "180+" },
            { label: "Avg. Cutover / interface", value: "1.8 days" },
            { label: "Reuse from Templates", value: "73%" },
          ],
          highlights: [
            "Auto-generation of iFlows from PI ESR metadata",
            "Cutover report comparing PI vs CPI payloads byte-for-byte",
          ],
        },
        {
          title: "Ariba Network Integration",
          category: "Procurement Integration",
          description:
            "cXML and PunchOut integration between Ariba Network and S/4HANA Procurement with PI/PO as the integration backbone.",
          longDescription:
            "A complete Ariba integration: cXML inbound from suppliers, PunchOut catalog requests routed to the supplier network, and PO confirmations posted back to S/4HANA MM. Includes a custom mapping for unit-of-measure, currency, and Incoterms normalization.",
          technologies: [
            "SAP Ariba",
            "SAP PI/PO",
            "cXML",
            "IDoc",
            "S/4HANA MM",
          ],
          metrics: [
            { label: "Suppliers Live", value: "260+" },
            { label: "PunchOut Sessions / day", value: "1.1K" },
            { label: "PO Sync Error Rate", value: "0.04%" },
          ],
          highlights: [
            "cXML parser with namespace normalization",
            "Idempotent PO confirmation using cXML document ID",
          ],
        },
      ],
    },
    {
      id: "m-10",
      slug: "meera-joshi",
      name: "Meera Joshi",
      role: "SAP CX QA & Test Automation Lead",
      email: "meera.joshi@cxcel.io",
      phone: "+91 99015 40788",
      subTeamIds: ["qa", "functional"],
      avatarUrl:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=80",
      bio: "Owns the regression and E2E test strategy across SAP CRM, CPI, and S/4HANA — using CBTA, Solution Manager, and Tosca.",
      skills: [
        "SAP CBTA",
        "HP ALM",
        "Solution Manager",
        "Tricentis Tosca",
        "Test Analytics",
        "OData",
      ],
      qualifications: [
        "B.Tech, Information Technology — VJTI Mumbai",
        "ISTQB Certified Tester, Advanced Level — Test Manager",
      ],
      certifications: [
        "SAP Certified Application Associate — SAP Solution Manager (Testing)",
        "Tricentis Tosca Automation Specialist",
        "ISTQB Certified Tester, Foundation Level",
      ],
      badges: [
        {
          name: "Tricentis",
          logoUrl: "",
          fallbackText: "TC",
          color: "#0070BA",
        },
        {
          name: "ISTQB",
          logoUrl: "",
          fallbackText: "IQ",
          color: "#00549E",
        },
        {
          name: "Jenkins",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Jenkins_logo.svg/200px-Jenkins_logo.svg.png",
          color: "#D33833",
        },
      ],
      socialLinks: {
        linkedin: "https://linkedin.com",
        website: "https://example.com",
      },
      featuredProjects: [
        {
          title: "CBTA Regression Suite for SAP CRM",
          category: "Test Automation",
          description:
            "850+ CBTA test cases covering SAP CRM service tickets, interactions, and SLAs — running nightly with full reporting in Solution Manager.",
          longDescription:
            "A regression suite that runs every night on the QA CRM client, with auto-categorization of failures, and a Trello-style status board for the team. Includes a self-healing library for common UI element changes.",
          technologies: [
            "SAP CBTA",
            "Solution Manager",
            "eCATT",
            "HP ALM",
            "Jenkins",
          ],
          metrics: [
            { label: "Automated Test Cases", value: "850+" },
            { label: "Regression Cycle Time", value: "9 hrs → 2.4 hrs" },
            { label: "Flake Rate", value: "2.1%" },
          ],
          highlights: [
            "Self-healing locators for Web UI changes",
            "Slack bot posting nightly pass/fail summary with linked logs",
          ],
        },
        {
          title: "End-to-End Test Automation Framework",
          category: "E2E Automation",
          description:
            "Reusable E2E framework spanning SAP CRM, CPI, S/4HANA, and Salesforce — using Tosca and a custom data setup toolkit.",
          longDescription:
            "A framework that runs business scenarios (Order-to-Cash, Lead-to-Quote, Service-to-Resolution) end-to-end across the CX landscape, with deterministic data setup, automated test data masking, and full execution traces.",
          technologies: [
            "Tricentis Tosca",
            "SAP CBTA",
            "Postman",
            "Salesforce",
            "CPI",
          ],
          metrics: [
            { label: "E2E Scenarios", value: "62" },
            { label: "Avg. E2E Run", value: "3.2 hrs" },
            { label: "Defect Leakage", value: "-58%" },
          ],
          highlights: [
            "Cross-system data setup toolkit with masking",
            "Trace correlation ID propagated across CRM, CPI, and S/4HANA",
          ],
        },
      ],
    },
    {
      id: "m-11",
      slug: "aditya-patel",
      name: "Aditya Patel",
      role: "SAP Basis & HANA Administrator",
      email: "aditya.patel@cxcel.io",
      phone: "+91 97242 88016",
      subTeamIds: ["basis"],
      avatarUrl:
        "https://images.unsplash.com/photo-1542178243-bc20204b769f?w=200&auto=format&fit=crop&q=80",
      bio: "Runs the S/4HANA, BW/4HANA, and BTP landscape — HANA scale-out, performance tuning, and zero-downtime patching.",
      skills: [
        "SAP Basis",
        "HANA Admin",
        "S/4HANA",
        "SAP BTP",
        "Linux",
        "HANA Studio",
      ],
      qualifications: [
        "B.Tech, Computer Science — NIT Warangal",
        "Red Hat Certified Engineer (RHCE)",
      ],
      certifications: [
        "SAP Certified Technology Associate — SAP HANA 2.0 SPS06",
        "SAP Certified Technology Professional — SAP S/4HANA 2022",
        "SUSE Certified Linux Administrator",
      ],
      badges: [
        {
          name: "SAP",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/200px-SAP_2011_logo.svg.png",
        },
        {
          name: "Red Hat",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Red_Hat_logo.svg/200px-Red_Hat_logo.svg.png",
          color: "#EE0000",
        },
        {
          name: "SUSE",
          logoUrl: "",
          fallbackText: "SU",
          color: "#73BA25",
        },
      ],
      socialLinks: {
        linkedin: "https://linkedin.com",
      },
      featuredProjects: [
        {
          title: "HANA Scale-Out for CX Landscape",
          category: "Infrastructure",
          description:
            "Designed and rolled out a 6-node HANA scale-out cluster hosting the 4.2 TB S/4HANA CX database with multi-tenant isolation.",
          longDescription:
            "Designed the HANA scale-out topology, partition strategy, and failover configuration for a 4.2 TB S/4HANA database serving CRM, S/4, BW, and SAP Commerce. Includes a custom monitoring dashboard and a quarterly DR drill playbook.",
          technologies: [
            "HANA 2.0",
            "S/4HANA",
            "Linux SLES",
            "HANA Studio",
            "SUSE HAE",
          ],
          metrics: [
            { label: "DB Size", value: "4.2 TB" },
            { label: "Active Nodes", value: "6" },
            { label: "Planned Downtime / yr", value: "< 4 hrs" },
          ],
          highlights: [
            "Zero-downtime kernel + HANA revision patching",
            "Per-tenant resource isolation via HANA multi-DB",
          ],
        },
        {
          title: "BTP Multi-Account Strategy & Trust Setup",
          category: "BTP Operations",
          description:
            "Multi-account SAP BTP topology with custom IdP integration, trust configuration, and CI/CD for subaccount provisioning.",
          longDescription:
            "Designed the BTP landscape: dev / test / prod subaccounts per business unit, trust setup with Azure AD, and a Terraform-based pipeline to provision new subaccounts with pre-baked entitlements and destinations.",
          technologies: [
            "SAP BTP",
            "Azure AD",
            "Terraform",
            "Cloud Foundry",
            "Kyma",
          ],
          metrics: [
            { label: "Subaccounts Managed", value: "28" },
            { label: "Provisioning Time", value: "6 hrs → 22 min" },
            { label: "Drift Incidents", value: "0 / quarter" },
          ],
          highlights: [
            "IdP-aware destination management",
            "Policy-as-code guardrails on subaccount entitlements",
          ],
        },
      ],
    },
    {
      id: "m-12",
      slug: "lakshmi-subramanian",
      name: "Lakshmi Subramanian",
      role: "SAP MDG / Master Data Lead",
      email: "lakshmi.subramanian@cxcel.io",
      phone: "+91 90923 17544",
      subTeamIds: ["functional", "crm"],
      avatarUrl:
        "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=200&auto=format&fit=crop&q=80",
      bio: "Owns SAP Master Data Governance for customer, vendor, and material — with data quality rules and master data integration.",
      skills: [
        "SAP MDG",
        "Master Data",
        "Data Quality",
        "MDG Workflow",
        "BRF+",
        "MDG Hub",
      ],
      qualifications: [
        "M.Tech, Information Systems — IIT Kharagpur",
        "PMP — Project Management Professional",
      ],
      certifications: [
        "SAP Certified Application Associate — SAP Master Data Governance",
        "SAP Certified Application Associate — SAP Data Quality Management",
        "Six Sigma Green Belt",
      ],
      badges: [
        {
          name: "SAP",
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/200px-SAP_2011_logo.svg.png",
        },
        {
          name: "PMP",
          logoUrl: "",
          fallbackText: "PMP",
          color: "#1B3B6F",
        },
        {
          name: "Six Sigma",
          logoUrl: "",
          fallbackText: "6σ",
          color: "#003D7A",
        },
      ],
      socialLinks: {
        linkedin: "https://linkedin.com",
        website: "https://example.com",
      },
      featuredProjects: [
        {
          title: "Central Customer Master via MDG-C",
          category: "Master Data",
          description:
            "Central customer master with SAP MDG-C, multi-source consolidation, duplicate check, and downstream distribution to S/4HANA, CRM, and Commerce.",
          longDescription:
            "Designed the MDG-C data model, governance workflow, and consolidation logic across SAP CRM, S/4HANA, and SAP Commerce. Custom duplicate check uses a fuzzy match on name + tax ID + address, with a manual review UI for the steward.",
          technologies: [
            "SAP MDG-C",
            "MDG Workflow",
            "BRF+",
            "Fuzzy Match",
            "S/4HANA",
          ],
          metrics: [
            { label: "Active Customer Records", value: "2.1M" },
            { label: "Duplicate Rate", value: "0.6%" },
            { label: "Steward Throughput", value: "+3.1x" },
          ],
          highlights: [
            "Steward UI for ambiguous-match disambiguation",
            "Downstream distribution to CRM, S/4HANA, and Commerce in 1 hop",
          ],
        },
        {
          title: "Material Master Data Quality Framework",
          category: "Data Quality",
          description:
            "Custom data quality framework for material master with field-level rules, profiling, and a quality dashboard in SAP Analytics Cloud.",
          longDescription:
            "A reusable data quality layer for MDG-M: configurable field-level rules (completeness, validity, consistency), automatic profiling, and a SAC dashboard showing data quality KPIs by plant and material type.",
          technologies: ["SAP MDG-M", "BRF+", "SAC", "SQL", "InfoObjects"],
          metrics: [
            { label: "Materials in Scope", value: "640K" },
            { label: "Field Completeness", value: "+22 pts" },
            { label: "Rule Coverage", value: "118 rules" },
          ],
          highlights: [
            "Configurable rules engine — no redeploy for new rules",
            "Quality KPIs feed into data steward review dashboard",
          ],
        },
      ],
    },
  ],
};

export function getMembersBySubTeam(subTeamId: string): TeamMember[] {
  if (subTeamId === "all") return portfolioData.members;
  return portfolioData.members.filter((m) => m.subTeamIds.includes(subTeamId));
}

export function getMemberById(id: string): TeamMember | undefined {
  return portfolioData.members.find((m) => m.id === id);
}
