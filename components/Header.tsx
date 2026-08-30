"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Users,
  Mail,
  Layers,
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export type NavTab = "home" | "members" | "contact";

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  selectedSubTeamName?: string;
  memberCount?: number;
}

export default function Header({
  activeTab,
  onSelectTab,
  selectedSubTeamName,
  memberCount,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs: { id: NavTab; label: string; subLabel: string; icon: React.ElementType }[] = [
    {
      id: "home",
      label: "Home",
      subLabel: "About Us",
      icon: Sparkles,
    },
    {
      id: "members",
      label: "Members",
      subLabel: "Core Portfolio",
      icon: Users,
    },
    {
      id: "contact",
      label: "Contact Us",
      subLabel: "Get in Touch",
      icon: Mail,
    },
  ];

  const handleTabClick = (tabId: NavTab) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-neutral-950/85 backdrop-blur-xl select-none transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[4.25rem] flex items-center justify-between gap-4">
        {/* ── Brand / Logo ────────────────────────── */}
        <div
          onClick={() => handleTabClick("home")}
          className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
        >
          <div className="relative">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 flex items-center justify-center font-black text-xs sm:text-sm text-white tracking-wider shadow-[0_0_20px_rgba(99,102,241,0.45)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.7)] transition-all duration-300 group-hover:scale-105 border border-indigo-400/30">
              CX
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-neutral-950 rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                CXcel
              </h1>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-indigo-400/90 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 hidden md:inline-block">
                Studio
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-neutral-400 tracking-tight line-clamp-1 max-w-[200px] sm:max-w-none">
              SAP Customer Experience Studio
            </p>
          </div>
        </div>

        {/* ── Desktop Central Tab Navigation ─────────────────── */}
        <nav className="hidden md:flex items-center p-1 rounded-full bg-neutral-900/90 border border-neutral-800/90 shadow-inner">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "text-white shadow-sm"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="headerActiveTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600/90 via-indigo-600 to-violet-600 shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-indigo-400/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon
                    className={`w-3.5 h-3.5 transition-colors ${
                      isActive ? "text-white" : "text-neutral-400"
                    }`}
                  />
                  <span className="font-semibold">{tab.label}</span>
                  <span
                    className={`text-[10px] transition-opacity ${
                      isActive
                        ? "text-indigo-200 opacity-90 font-normal"
                        : "text-neutral-500 opacity-80"
                    }`}
                  >
                    ({tab.subLabel})
                  </span>
                </span>
              </button>
            );
          })}
        </nav>

        {/* ── Right Actions / Scope Info ──────────────────── */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          {/* Members Scope indicator if on Members tab */}
          {activeTab === "members" && selectedSubTeamName && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden lg:flex items-center gap-2 bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 rounded-full text-xs text-neutral-400"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                Scope:{" "}
                <strong className="text-white font-medium">
                  {selectedSubTeamName}
                </strong>
              </span>
              {typeof memberCount === "number" && (
                <>
                  <span className="w-1 h-1 rounded-full bg-neutral-600" />
                  <span className="text-indigo-400 font-medium">
                    {memberCount} {memberCount === 1 ? "expert" : "experts"}
                  </span>
                </>
              )}
            </motion.div>
          )}

          {/* Quick CTA to Contact / Schedule */}
          {activeTab !== "contact" && (
            <button
              onClick={() => handleTabClick("contact")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-medium text-neutral-200 hover:text-white transition-all duration-200 hover:border-neutral-700"
            >
              <span>Consult Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer / Dropdown ────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-neutral-800/90 bg-neutral-950/95 backdrop-blur-2xl px-4 py-4 space-y-2 overflow-hidden"
          >
            <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider px-2 pb-1">
              Navigation Tabs
            </div>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? "bg-indigo-600/15 border border-indigo-500/30 text-white"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.4)]"
                          : "bg-neutral-900 text-neutral-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{tab.label}</div>
                      <div className="text-[11px] text-neutral-400">
                        {tab.subLabel}
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                  )}
                </button>
              );
            })}

            <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-400 px-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Enterprise SLA 99.9%
              </span>
              <span className="text-neutral-500">CXcel Studio 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
