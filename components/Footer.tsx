"use client";

import React from "react";
import {
  Mail,
  ShieldCheck,
  MapPin,
  Phone,
  Clock,
  ArrowUpRight,
  Server,
  Layers,
} from "lucide-react";
import { SubTeam } from "@/data/portfolio-data";
import { usePortfolio } from "@/components/PortfolioContext";
import { NavTab } from "./Header";

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onSelectSubTeam?: (subTeam: SubTeam) => void;
}

export default function Footer({ onSelectTab, onSelectSubTeam }: FooterProps) {
  const { data, subTeams } = usePortfolio();

  const quickLinks: { id: NavTab; label: string; desc: string }[] = [
    { id: "home", label: "Home", desc: "Studio mission & delivery pillars" },
    { id: "members", label: "Members", desc: "Interactive dual-dial team showcase" },
    { id: "contact", label: "Contact Us", desc: "Consultation & architectural review" },
  ];

  const handleSubTeamClick = (subTeamId: string) => {
    const found = subTeams.find((st) => st.id === subTeamId);
    if (found && onSelectSubTeam) {
      onSelectSubTeam(found);
    }
    onSelectTab("members");
  };

  return (
    <footer className="relative w-full border-t border-neutral-800/90 bg-neutral-950/95 text-white select-none z-20">
      {/* ── Top Subtle Glow Ribbon ─────────────────── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      {/* ── Main Footer Content ────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Studio Identity & Live Status (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/deloitte-white.svg"
                alt="Deloitte"
                className="h-4 sm:h-5 w-auto object-contain"
              />
              <span className="h-5 w-px bg-neutral-800 hidden sm:inline-block" />
              <div>
                <h3 className="text-base font-bold tracking-tight text-white">
                  CX Studio
                </h3>
                <p className="text-[11px] text-neutral-400">
                  SAP Customer Experience Studio
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              {data.teamInfo.mission}
            </p>

            {/* Clean Core / Architecture Badge */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-[11px]">
                Clean Core & Enterprise SAP BTP Architecture Certified
              </span>
            </div>
          </div>

          {/* Column 2: Navigation & Quick Access (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold text-white tracking-wider uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onSelectTab(link.id)}
                    className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 group text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover:bg-emerald-400 transition-colors" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onSelectTab("contact")}
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center gap-1 mt-2"
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
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              Practice Disciplines
            </div>
            <div className="grid grid-cols-1 gap-1.5 text-xs">
              {subTeams.slice(1, 8).map((st) => (
                <button
                  key={st.id}
                  onClick={() => handleSubTeamClick(st.id)}
                  className="text-left text-neutral-400 hover:text-emerald-300 hover:bg-neutral-900/60 px-2 py-1 -mx-2 rounded transition-colors flex items-center justify-between group"
                >
                  <span className="truncate">{st.name}</span>
                  <span className="text-[10px] font-mono text-neutral-600 group-hover:text-emerald-400 transition-colors">
                    {st.shortCode}
                  </span>
                </button>
              ))}
              <button
                onClick={() => handleSubTeamClick("all")}
                className="text-left text-emerald-400/90 hover:text-emerald-300 px-2 py-1 -mx-2 text-[11px] font-medium flex items-center gap-1"
              >
                <span>View All 11 Disciplines & Roster</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Column 4: Essential Contact Info & Studio Address (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-white tracking-wider uppercase flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Studio Address
            </div>

            <div className="space-y-2.5 text-xs text-neutral-400">
              {/* Bengaluru Headquarters */}
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-neutral-200">
                  Prestige Trade Tower
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  High Grounds, Palace Road, Sampangi Rama Nagara, Bengaluru, Karnataka — 560001, India
                </p>
              </div>

              {/* Direct Communications */}
              <div className="space-y-1.5 pt-2 border-t border-neutral-900 text-[11px]">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <a
                    href="mailto:contact@cxstudio.io"
                    className="hover:text-emerald-300 transition-colors"
                  >
                    contact@cxstudio.io
                  </a>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+91 98450 11201</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400 text-[10px]">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Mon – Fri: 09:00 – 18:00 IST</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar: Copyright & Compliance ───────────────── */}
        <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} CX Studio. All rights reserved.</span>
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
