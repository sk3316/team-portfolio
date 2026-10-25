"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Users,
  Mail,
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  Presentation,
  RefreshCw,
  Check,
} from "lucide-react";

export type NavTab = "home" | "members" | "contact";

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  selectedSubTeamName?: string;
  memberCount?: number;
  onOpenPPTStudio?: () => void;
  onSync?: () => Promise<void> | void;
  isSyncing?: boolean;
  isLiveSync?: boolean;
}

export default function Header({
  activeTab,
  onSelectTab,
  selectedSubTeamName,
  memberCount,
  onOpenPPTStudio,
  onSync,
  isSyncing,
  isLiveSync,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [justSynced, setJustSynced] = useState(false);

  const handleSyncClick = async () => {
    if (onSync && !isSyncing) {
      await onSync();
      setJustSynced(true);
      setTimeout(() => setJustSynced(false), 2000);
    }
  };

  const tabs: { id: NavTab; label: string; icon: React.ElementType }[] = [
    {
      id: "home",
      label: "Home",
      icon: Home,
    },
    {
      id: "members",
      label: "Members",
      icon: Users,
    },
    {
      id: "contact",
      label: "Contact Us",
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
          <div className="flex items-center gap-2.5 sm:gap-3">
            <img
              src="/assets/images/deloitte-white.svg"
              alt="Deloitte"
              className="h-4 sm:h-5 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
            <span className="h-5 w-px bg-neutral-800 hidden sm:inline-block" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                CX Studio
              </h1>
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
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600/90 via-emerald-600 to-teal-600 shadow-[0_0_15px_rgba(16,185,129,0.5)] border border-emerald-400/30"
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
                </span>
              </button>
            );
          })}
        </nav>

        {/* ── Right Actions ──────────────────── */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          {/* Direct 1-Click Sync Button */}
          {onSync && (
            <button
              type="button"
              onClick={handleSyncClick}
              disabled={isSyncing}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer disabled:opacity-60 shadow-sm ${
                justSynced
                  ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                  : "bg-neutral-900/90 hover:bg-neutral-800 border-neutral-800 hover:border-emerald-500/40 text-neutral-300 hover:text-white"
              }`}
              title="Click to directly sync latest changes from Google Sheets"
            >
              {justSynced ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <RefreshCw
                  className={`w-3.5 h-3.5 text-emerald-400 ${
                    isSyncing ? "animate-spin" : ""
                  }`}
                />
              )}
              <span className="hidden sm:inline">
                {isSyncing ? "Syncing..." : justSynced ? "Synced!" : "Sync Data"}
              </span>
              {isLiveSync && !justSynced && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              )}
            </button>
          )}

          {/* PPT Studio Button */}
          {onOpenPPTStudio && (
            <button
              type="button"
              onClick={onOpenPPTStudio}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-xs font-semibold text-emerald-300 hover:text-white transition-all duration-200 shadow-[0_0_12px_rgba(16,185,129,0.2)] cursor-pointer"
            >
              <Presentation className="w-3.5 h-3.5 text-emerald-400" />
              <span>PPT Studio</span>
            </button>
          )}

          {/* Quick CTA to Contact / Schedule */}
          {activeTab !== "contact" && (
            <button
              onClick={() => handleTabClick("contact")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-medium text-neutral-200 hover:text-white transition-all duration-200 hover:border-neutral-700"
            >
              <span>Consult Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
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
                      ? "bg-emerald-600/15 border border-emerald-500/30 text-white"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive
                          ? "bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                          : "bg-neutral-900 text-neutral-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{tab.label}</div>
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  )}
                </button>
              );
            })}

            {onSync && (
              <button
                type="button"
                onClick={async () => {
                  await handleSyncClick();
                  setMobileMenuOpen(false);
                }}
                disabled={isSyncing}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white transition-all disabled:opacity-60"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                    {justSynced ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <RefreshCw
                        className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`}
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                      <span>
                        {isSyncing
                          ? "Syncing Data..."
                          : justSynced
                          ? "Data Synced!"
                          : "Sync Data"}
                      </span>
                      {isLiveSync && !justSynced && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Directly sync changes from Google Sheets
                    </div>
                  </div>
                </div>
              </button>
            )}

            {onOpenPPTStudio && (
              <button
                type="button"
                onClick={() => {
                  onOpenPPTStudio();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 hover:text-white transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                    <Presentation className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">PPT Studio</div>
                    <div className="text-[11px] text-emerald-300">Generate & Duplicate Presentations</div>
                  </div>
                </div>
              </button>
            )}

            <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-400 px-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Enterprise SLA 99.9%
              </span>
              <span className="text-neutral-500">CX Studio 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
