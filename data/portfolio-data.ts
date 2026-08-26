// data/portfolio-data.ts

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  subTeamIds: string[]; // Allows members to belong to multiple sub-teams
  avatarUrl: string;
  bio: string;
  skills: string[];
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
    name: "Nexus Core Lab",
    tagline:
      "Autonomous systems, high-performance UI engines, and cloud distributed clusters.",
    mission:
      "Engineering resilient, low-latency software from silicon interfaces to spatial interfaces.",
  },
  subTeams: [
    {
      id: "all",
      name: "All Members",
      shortCode: "ALL",
      description: "Full engineering roster across all disciplines.",
    },
    {
      id: "ai",
      name: "AI & Neural Systems",
      shortCode: "AI",
      description:
        "Edge LLM quantization, vector indexing, and autonomous agent swarms.",
    },
    {
      id: "frontend",
      name: "UI & Interaction",
      shortCode: "UI",
      description:
        "Design systems, spatial UI, WebGL shaders, and fluid web animations.",
    },
    {
      id: "infra",
      name: "Cloud & Distributed",
      shortCode: "INF",
      description:
        "Kubernetes orchestration, eBPF telemetry, and global edge runtimes.",
    },
  ],
  members: [
    {
      id: "m-1",
      slug: "elena-rostova",
      name: "Elena Rostova",
      role: "Principal AI Researcher",
      subTeamIds: ["ai"],
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      bio: "Focuses on localized model quantization, memory graphs for agent systems, and custom CUDA tensor operations.",
      skills: ["PyTorch", "CUDA", "Transformers", "LangGraph", "Rust"],
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
      },
      featuredProjects: [
        {
          title: "SynapseEngine",
          description:
            "Sub-10ms localized vector inference engine written in C++ with custom CUDA kernels.",
          technologies: ["C++", "CUDA", "ONNX", "gRPC"],
          githubUrl: "https://github.com",
        },
        {
          title: "MemoryGraph Agent",
          description:
            "Stateful context management framework extending LLM context retrieval over infinite sessions.",
          technologies: ["Python", "LangChain", "Qdrant"],
          liveUrl: "https://example.com",
        },
      ],
    },
    {
      id: "m-2",
      slug: "marcus-vance",
      name: "Marcus Vance",
      role: "Staff UI Architect",
      subTeamIds: ["frontend"],
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      bio: "Specializes in 60fps gesture-driven animations, polar coordinate UI layouts, and accessible component architectures.",
      skills: ["React", "Next.js", "Framer Motion", "Three.js", "Tailwind CSS"],
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        website: "https://example.com",
      },
      featuredProjects: [
        {
          title: "RotaryUI Engine",
          description:
            "Mathematical coordinate-based wheel navigation library for spatial web applications.",
          technologies: ["TypeScript", "Framer Motion", "Tailwind"],
          githubUrl: "https://github.com",
        },
        {
          title: "Neumorphic Glass Kit",
          description:
            "GPU-accelerated CSS/WebGL backdrop blur component collection for enterprise web apps.",
          technologies: ["Next.js", "GLSL", "React"],
          liveUrl: "https://example.com",
        },
      ],
    },
    {
      id: "m-3",
      slug: "sarah-lin",
      name: "Sarah Lin",
      role: "Lead Platform Engineer",
      subTeamIds: ["infra"],
      avatarUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
      bio: "Designs zero-downtime distributed service meshes, automated global edge routing, and eBPF kernel filters.",
      skills: ["Kubernetes", "Rust", "Terraform", "Go", "eBPF"],
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
      featuredProjects: [
        {
          title: "Aegis ZeroTrust Mesh",
          description:
            "Ultra-fast sidecar-less service mesh built on top of eBPF and WireGuard.",
          technologies: ["eBPF", "Rust", "Linux Kernel", "Kubernetes"],
          githubUrl: "https://github.com",
        },
        {
          title: "Dynamic Kube Autoscaler",
          description:
            "Predictive traffic autoscaler utilizing ARIMA time-series models for spot instances.",
          technologies: ["Go", "Prometheus", "AWS EKS"],
          liveUrl: "https://example.com",
        },
      ],
    },
    {
      id: "m-4",
      slug: "david-kim",
      name: "David Kim",
      role: "Computer Vision Engineer",
      subTeamIds: ["ai"],
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      bio: "Designs real-time edge segmentation pipelines and vision-language spatial models for browser runtime.",
      skills: ["OpenCV", "PyTorch", "TensorRT", "C++", "WebGL"],
      socialLinks: {
        github: "https://github.com",
        twitter: "https://x.com",
      },
      featuredProjects: [
        {
          title: "OmniSegment Realtime",
          description:
            "Zero-shot segmentation model running directly in-browser using WebGPU.",
          technologies: ["WebGPU", "ONNX Web", "TypeScript"],
          liveUrl: "https://example.com",
        },
      ],
    },
    {
      id: "m-5",
      slug: "priya-patel",
      name: "Priya Patel",
      role: "Creative Technologist",
      subTeamIds: ["frontend", "ai"],
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
      bio: "Combines generative AI models with interactive 3D WebGL scenes and spatial audio visualization.",
      skills: ["Three.js", "GLSL", "React Three Fiber", "WebAudio", "Python"],
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
      },
      featuredProjects: [
        {
          title: "Aura 3D Audio Visualizer",
          description:
            "Real-time generative WebGL audio visualizer responding to voice frequencies.",
          technologies: ["Three.js", "WebAudio API", "GLSL Shaders"],
          liveUrl: "https://example.com",
        },
      ],
    },
  ],
};

// Helper query functions
export function getMembersBySubTeam(subTeamId: string): TeamMember[] {
  if (subTeamId === "all") return portfolioData.members;
  return portfolioData.members.filter((m) => m.subTeamIds.includes(subTeamId));
}

export function getMemberById(id: string): TeamMember | undefined {
  return portfolioData.members.find((m) => m.id === id);
}
