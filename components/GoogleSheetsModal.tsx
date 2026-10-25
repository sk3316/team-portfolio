// components/GoogleSheetsModal.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileSpreadsheet,
  RefreshCw,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Database,
} from "lucide-react";
import { usePortfolio } from "./PortfolioContext";

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GoogleSheetsModal({ isOpen, onClose }: GoogleSheetsModalProps) {
  const { isLive, source, lastSync, isRefreshing, memberCount, refresh, error } =
    usePortfolio() as any;

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/80 bg-neutral-950/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Google Sheets Live Data Sync</span>
                  {isLive ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Connected
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-800 text-neutral-300 border border-neutral-700">
                      Local Fallback Mode
                    </span>
                  )}
                </h3>
                <p className="text-xs text-neutral-400">
                  Collaborative spreadsheet as the Single Source of Truth
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
            {/* Status Card */}
            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Sync Status
                </div>
                <div className="text-sm font-medium text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span>
                    Source:{" "}
                    <strong className="text-emerald-300">
                      {isLive ? "Google Sheets (Live)" : "Codebase JSON (Fallback)"}
                    </strong>
                  </span>
                </div>
                {lastSync && (
                  <div className="text-xs text-neutral-500">
                    Last synchronized: {new Date(lastSync).toLocaleTimeString()}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => refresh()}
                disabled={isRefreshing}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
                />
                <span>{isRefreshing ? "Syncing..." : "Sync Now"}</span>
              </button>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Quick Actions */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>How to Connect Your Team Spreadsheet</span>
              </div>

              <div className="space-y-2.5 text-xs text-neutral-300">
                <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-semibold text-white">
                      Download Starter Template CSV
                    </div>
                    <p className="text-neutral-400">
                      Download the pre-formatted CSV template containing all columns and existing team members.
                    </p>
                    <a
                      href="/api/export-template"
                      download="CX_Studio_Team_Template.csv"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-medium text-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Starter CSV Template</span>
                    </a>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-semibold text-white">
                      Create & Share Google Sheet
                    </div>
                    <p className="text-neutral-400">
                      Create a new Google Sheet, click <strong>File &gt; Import &gt; Upload</strong> the CSV, and set Share to <strong>"Anyone with the link can view"</strong> (or File &gt; Share &gt; Publish to web as CSV).
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-semibold text-white">
                      Add GOOGLE_SHEET_ID in Vercel
                    </div>
                    <p className="text-neutral-400">
                      Copy the Sheet ID from the URL (the string between <code className="text-emerald-400 bg-neutral-900 px-1 py-0.5 rounded">/d/</code> and <code className="text-emerald-400 bg-neutral-900 px-1 py-0.5 rounded">/edit</code>) and set it as an Environment Variable in your Vercel project settings:
                    </p>
                    <div className="p-2 rounded bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-emerald-300 select-all">
                      GOOGLE_SHEET_ID = your_sheet_id_here
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-between">
            <span className="text-[11px] text-neutral-500">
              Vercel automatically caches and revalidates every 60 seconds
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
