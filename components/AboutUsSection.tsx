"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  Server,
  Workflow,
  ShoppingBag,
  Database,
  CheckCircle2,
  Cpu,
  LineChart,
  GitMerge,
  Headphones,
  Award,
} from "lucide-react";
import { portfolioData, SubTeam } from "@/data/portfolio-data";
import { NavTab } from "./Header";

interface AboutUsSectionProps {
  onSelectTab: (tab: NavTab) => void;
  onSelectSubTeam: (subTeam: SubTeam) => void;
}

export default function AboutUsSection({
  onSelectTab,
  onSelectSubTeam,
}: AboutUsSectionProps) {
  const stats = [
    { value: "11", label: "Specialized Disciplines", hint: "Full SAP CX coverage" },
    { value: "100%", label: "Certified Architects", hint: "SAP S/4HANA & BTP" },
    { value: "45+", label: "Enterprise Go-Lives", hint: "Global Fortune 500 rollouts" },
    { value: "99.9%", label: "Integration Uptime", hint: "Zero-loss CPI pipeline SLA" },
  ];

  const pillars = [
    {
      icon: Cpu,
      title: "Clean Core & BTP Extensibility",
      desc: "Architecting side-by-side cloud applications using SAP BTP, CAP, and RAP to keep the S/4HANA core pristine, upgrade-ready, and hyper-scalable.",
      color: "from-blue-500/20 to-indigo-500/10",
      border: "border-blue-500/30",
      iconColor: "text-blue-400",
    },
    {
      icon: Workflow,
      title: "Resilient CPI & B2B Integration",
      desc: "Industrial-grade SAP Integration Suite (CPI) iFlows, B2B EDI mappings, Ariba network connectivity, and asynchronous event-driven queues.",
      color: "from-indigo-500/20 to-violet-500/10",
      border: "border-indigo-500/30",
      iconColor: "text-indigo-400",
    },
    {
      icon: ShoppingBag,
      title: "Headless Composable Commerce",
      desc: "Sub-second SAP Commerce Cloud (Hybris) architectures, custom OCC REST APIs, Spartacus Angular storefronts, and complex B2B pricing matrices.",
      color: "from-violet-500/20 to-purple-500/10",
      border: "border-violet-500/30",
      iconColor: "text-violet-400",
    },
    {
      icon: Database,
      title: "Omnichannel Service & Marketing",
      desc: "Unified customer data platforms (CDP), real-time Emarsys customer journeys, and automated S/4HANA Service & CRM ticket resolution engines.",
      color: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-500/30",
      iconColor: "text-cyan-400",
    },
  ];

  const methodologySteps = [
    {
      step: "01",
      title: "Clean Core Blueprinting",
      desc: "Architecture assessment, gap-fit analysis against standard SAP CX capabilities, and extensibility roadmapping.",
    },
    {
      step: "02",
      title: "Rapid Agile Sprints",
      desc: "Iterative BTP cloud app development, CPI iFlow construction, and mock data integrations with continuous client demos.",
    },
    {
      step: "03",
      title: "Rigorous Test Automation",
      desc: "End-to-end regression testing using Tosca, CBTA, and mock trading partner simulators for zero surprise cutovers.",
    },
    {
      step: "04",
      title: "Hypercare & 24/7 Run",
      desc: "Zero-downtime go-live orchestration, round-the-clock CPI queue monitoring, and SLA-backed production support.",
    },
  ];

  const handleDisciplineClick = (subTeam: SubTeam) => {
    onSelectSubTeam(subTeam);
    onSelectTab("members");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col space-y-16 sm:space-y-24 py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* ── Hero Section ───────────────────────────── */}
      <section className="relative text-center space-y-6 pt-4 sm:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-medium backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Enterprise SAP Customer Experience Studio</span>
          <span className="w-1 h-1 rounded-full bg-indigo-400" />
          <span className="text-neutral-400 font-normal">Est. 2026</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight"
        >
          Architecting High-Performance{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            SAP Digital CX
          </span>{" "}
          Ecosystems
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base lg:text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed"
        >
          {portfolioData.teamInfo.tagline}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2"
        >
          <button
            onClick={() => onSelectTab("members")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
          >
            <Users className="w-4 h-4 text-indigo-200 group-hover:scale-110 transition-transform" />
            <span>Explore Core Team Portfolio</span>
            <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onSelectTab("contact")}
            className="px-6 py-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white font-medium text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <span>Consult Our Practice Leads</span>
          </button>
        </motion.div>
      </section>

      {/* ── Key Metrics & Stats ─────────────────────── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
            className="p-4 sm:p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm text-center relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300"
          >
            <div className="text-2xl sm:text-4xl font-black text-white group-hover:text-indigo-300 transition-colors">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-neutral-200 mt-1">
              {stat.label}
            </div>
            <div className="text-[10px] sm:text-xs text-neutral-400 mt-0.5">
              {stat.hint}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent group-hover:via-indigo-400 transition-all" />
          </motion.div>
        ))}
      </section>

      {/* ── Mission & Vision Statement ─────────────── */}
      <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-neutral-900/70 to-neutral-950/70 border border-neutral-800/90 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            <Award className="w-4 h-4" />
            Our Mission & Commitment
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug">
            Bridging Enterprise ERP Power with Frictionless Customer Journeys
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Enterprises frequently struggle with fragmented customer data trapped between core ERP
            installations and customer-facing touchpoints. CXcel eliminates these boundaries. We combine
            deep SAP functional domain mastery with cutting-edge integration pipelines (CPI), headless
            storefront architectures, and cloud-native BTP extensions.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Zero core modification — strictly aligned with SAP Clean Core directives.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Full lifecycle coverage from initial blueprint to round-the-clock Hypercare.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>End-to-end B2B/EDI transaction tracking with zero packet drop guarantees.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Pre-built integration accelerators reducing project time-to-market by 40%.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Architectural Pillars ────────────────── */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Core Architecture Competencies
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How We Deliver Enterprise Success
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto">
            Our multi-disciplinary team unites functional ERP consultants, integration architects, and
            frontend engineers under a cohesive delivery standard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border ${pillar.border} hover:bg-neutral-900/70 transition-all duration-300 space-y-3 group`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform`}
                >
                  <Icon className={`w-5 h-5 ${pillar.iconColor}`} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Interactive Practice Disciplines Grid ───── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              The Delivery Roster
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              11 Specialized Practice Streams
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Select any discipline to directly browse its active architects, engineers, and project showcases.
            </p>
          </div>
          <button
            onClick={() => onSelectTab("members")}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
          >
            <span>Launch Interactive Rotary Dial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {portfolioData.subTeams
            .filter((st) => st.id !== "all")
            .map((subTeam) => (
              <div
                key={subTeam.id}
                onClick={() => handleDisciplineClick(subTeam)}
                className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/90 hover:border-indigo-500/40 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {subTeam.shortCode}
                    </span>
                    <span className="text-[10px] text-neutral-500 group-hover:text-neutral-400">
                      Discipline
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {subTeam.name}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {subTeam.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-indigo-400 font-medium group-hover:text-indigo-300">
                  <span>View Practice Members</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ── Delivery Framework Roadmap ──────────────── */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Lifecycle Methodology
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How Projects Progress From Concept to Live Support
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {methodologySteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 relative space-y-2"
            >
              <div className="text-2xl font-black text-indigo-500/40 font-mono">
                {step.step}
              </div>
              <h4 className="text-sm font-bold text-white">{step.title}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA Banner ──────────────────────── */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-neutral-900/80 to-neutral-950 border border-indigo-500/30 text-center space-y-4">
        <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
          Ready to Modernize Your SAP CX Landscape?
        </h3>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto">
          Whether you need a dedicated CPI integration team, a headless commerce rebuild, or an S/4HANA
          clean core architecture audit, our leads are ready to collaborate.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onSelectTab("members")}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all cursor-pointer"
          >
            Meet the Core Team
          </button>
          <button
            onClick={() => onSelectTab("contact")}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white text-xs font-medium transition-all cursor-pointer"
          >
            Schedule Architecture Session
          </button>
        </div>
      </section>
    </div>
  );
}
