"use client";

import React from "react";
import {
  Sparkles,
  Users,
  Mail,
  ShieldCheck,
  Globe,
  Phone,
  Clock,
  ArrowUpRight,
  Github,
  Linkedin,
  Server,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { portfolioData, SubTeam } from "@/data/portfolio-data";
import { NavTab } from "./Header";

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onSelectSubTeam?: (subTeam: SubTeam) => void;
}

export default function Footer({ onSelectTab, onSelectSubTeam }: FooterProps) {
  const quickLinks: { id: NavTab; label: string; desc: string }[] = [
    { id: "home", label: "Home (About Us)", desc: "Studio mission & delivery pillars" },
    { id: "members", label: "Members (Core Portfolio)", desc: "Interactive dual-dial team showcase" },
    { id: "contact", label: "Contact Us", desc: "Consultation & architectural review" },
  ];

  const handleSubTeamClick = (subTeamId: string) => {
    const found = portfolioData.subTeams.find((st) => st.id === subTeamId);
    if (found && onSelectSubTeam) {
      onSelectSubTeam(found);
    }
    onSelectTab("members");
  };

  return (
    <footer className="relative w-full border-t border-neutral-800/90 bg-neutral-950/95 text-white select-none z-20">
      {/* ── Top Subtle Glow Ribbon ─────────────────── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      {/* ── Main Footer Content ────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Studio Identity & Live Status (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 flex items-center justify-center font-black text-xs text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-indigo-400/30">
                CX
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight text-white">
                  CXcel Studio
                </h3>
                <p className="text-[11px] text-neutral-400">
                  SAP Customer Experience Studio
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              {portfolioData.teamInfo.mission}
            </p>

            {/* Live Operational Status Badge */}
            <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400">
                    All Systems Operational
                  </span>
                </div>
                <span className="text-[10px] text-neutral-500 font-mono">
                  SLA 99.9%
                </span>
              </div>
              <p className="text-[10px] text-neutral-400">
                CPI iFlow monitoring, BTP runtimes & 24/7 severity-1 production support active.
              </p>
            </div>

            {/* Clean Core / Architecture Badge */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span className="text-[11px]">
                Clean Core & Enterprise SAP BTP Architecture Certified
              </span>
            </div>
          </div>

          {/* Column 2: Navigation & Quick Access (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold text-white tracking-wider uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onSelectTab(link.id)}
                    className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 group text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover:bg-indigo-400 transition-colors" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onSelectTab("contact")}
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors flex items-center gap-1 mt-2"
                >
                  <span>Book Architecture Review</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Disciplines / Sub-teams (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-white tracking-wider uppercase flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-indigo-400" />
              Practice Disciplines
            </div>
            <div className="grid grid-cols-1 gap-1.5 text-xs">
              {portfolioData.subTeams.slice(1, 8).map((st) => (
                <button
                  key={st.id}
                  onClick={() => handleSubTeamClick(st.id)}
                  className="text-left text-neutral-400 hover:text-indigo-300 hover:bg-neutral-900/60 px-2 py-1 -mx-2 rounded transition-colors flex items-center justify-between group"
                >
                  <span className="truncate">{st.name}</span>
                  <span className="text-[10px] font-mono text-neutral-600 group-hover:text-indigo-400 transition-colors">
                    {st.shortCode}
                  </span>
                </button>
              ))}
              <button
                onClick={() => handleSubTeamClick("all")}
                className="text-left text-indigo-400/90 hover:text-indigo-300 px-2 py-1 -mx-2 text-[11px] font-medium flex items-center gap-1"
              >
                <span>View All 11 Disciplines & Roster</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Column 4: Essential Contact Info & Global Hubs (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-white tracking-wider uppercase flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              Global Delivery Hubs
            </div>

            <div className="space-y-2.5 text-xs text-neutral-400">
              {/* Bengaluru Tech Centre */}
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-neutral-200">
                  Global Technology Centre
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Outer Ring Road, Bellandur, Bengaluru, KA 560103, India
                </p>
              </div>

              {/* Frankfurt Delivery Hub */}
              <div className="space-y-1 pt-1 border-t border-neutral-900">
                <div className="text-[11px] font-semibold text-neutral-200">
                  Frankfurt Innovation Hub
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Mainzer Landstraße, 60329 Frankfurt am Main, Germany
                </p>
              </div>

              {/* Direct Communications */}
              <div className="space-y-1.5 pt-1 border-t border-neutral-900 text-[11px]">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <a
                    href="mailto:contact@cxcel.io"
                    className="hover:text-indigo-300 transition-colors"
                  >
                    contact@cxcel.io
                  </a>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                  <span>+91 98450 11201 / +49 69 1234 5678</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400 text-[10px]">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Mon – Fri: 08:00 – 20:00 IST / CET (24/7 P1 SLA)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar: Copyright & Compliance ───────────────── */}
        <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} CXcel Studio. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-neutral-400">
              Enterprise SAP CX Delivery Practice
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => onSelectTab("home")}
              className="hover:text-neutral-300 transition-colors"
            >
              Overview
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectTab("members")}
              className="hover:text-neutral-300 transition-colors"
            >
              Engineers
            </button>
            <span>•</span>
            <button
              onClick={() => onSelectTab("contact")}
              className="hover:text-neutral-300 transition-colors"
            >
              Enterprise Consultation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
