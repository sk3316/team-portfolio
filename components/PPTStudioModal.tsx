// components/PPTStudioModal.tsx
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileDown,
  Presentation,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { TeamMember, portfolioData } from "@/data/portfolio-data";
import { normalizeMemberData } from "@/lib/pptx/normalizeMemberData";
import { downloadCandidatePPT } from "@/lib/pptx/nativePptxGenerator";

interface PPTStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeMember: TeamMember | null;
  onSelectMember?: (memberId: string) => void;
}

export default function PPTStudioModal({
  isOpen,
  onClose,
  activeMember,
  onSelectMember,
}: PPTStudioModalProps) {
  // Current candidate selection from codebase JSON
  const [selectedId, setSelectedId] = useState<string>(activeMember?.id || portfolioData.members[0].id);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sync selectedId when activeMember changes externally
  React.useEffect(() => {
    if (activeMember?.id) {
      setSelectedId(activeMember.id);
    }
  }, [activeMember?.id]);

  // Derive current member object strictly from codebase JSON
  const currentRawMember = useMemo(() => {
    return (
      portfolioData.members.find((m) => m.id === selectedId) ||
      activeMember ||
      portfolioData.members[0]
    );
  }, [selectedId, activeMember]);

  const normalized = useMemo(() => {
    return normalizeMemberData(currentRawMember);
  }, [currentRawMember]);

  // Handle member selection change
  const handleMemberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setSelectedId(newId);
    if (onSelectMember) {
      onSelectMember(newId);
    }
  };

  // Generate official format presentation
  const handleDownloadOfficial = async () => {
    try {
      setIsGenerating(true);
      await downloadCandidatePPT(normalized);
    } catch (err) {
      console.error("Failed to generate PPTX:", err);
      alert("Failed to generate presentation. Please check console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

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
          className="relative z-10 w-full max-w-4xl max-h-[92vh] bg-neutral-900 border border-neutral-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* ── Modal Header ── */}
          <div className="px-5 sm:px-7 py-4 border-b border-neutral-800/90 bg-neutral-900/95 flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.35)] text-white">
                <Presentation className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Candidate Profile Presentation
                  </h2>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded-full border border-sky-500/30">
                    Official Format
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Instant PowerPoint generator built directly from the codebase profile database
                </p>
              </div>
            </div>

            {/* Candidate Selector Dropdown & Close */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <select
                  value={selectedId}
                  onChange={handleMemberChange}
                  className="appearance-none bg-neutral-800 border border-neutral-700 text-white text-xs font-semibold py-1.5 pl-3 pr-8 rounded-xl focus:outline-none focus:border-sky-500 cursor-pointer shadow-sm hover:bg-neutral-800/80 transition-colors"
                >
                  {portfolioData.members.map((m) => (
                    <option key={m.id} value={m.id} className="bg-neutral-900 text-white">
                      {m.name} ({m.role.split("&")[0].trim()})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Active Candidate Quick Info Bar ── */}
          <div className="px-5 sm:px-7 py-2.5 bg-neutral-950/70 border-b border-neutral-800/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-400 font-medium">Selected Profile:</span>
              <span className="text-white font-semibold">{normalized.name}</span>
              <span className="text-neutral-600">•</span>
              <span className="text-sky-400 font-medium">{normalized.role}</span>
              <span className="text-neutral-600 hidden md:inline">•</span>
              <span className="text-neutral-400 hidden md:inline">{normalized.skills.length} skills</span>
            </div>
            <span className="text-[11px] text-emerald-400/90 font-medium bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 hidden sm:inline">
              Verified Codebase Source
            </span>
          </div>

          {/* ── Modal Content Area: Pure Slide Preview & 1-Click Exporter ── */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5 space-y-5 custom-card-scroll">
            <div className="space-y-4">
              {/* Live Preview Card matching the exact corporate image */}
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/90 space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-semibold uppercase tracking-wider text-[11px] text-neutral-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    Widescreen Slide Preview (16:9 • Exact Corporate Format)
                  </span>
                  <span className="text-sky-400 font-medium">1-Slide Profile</span>
                </div>

                {/* Simulated PPT Slide Mockup */}
                <div className="aspect-[16/9] w-full rounded-xl border border-slate-300 bg-white text-slate-900 p-4 sm:p-5 flex flex-col justify-between shadow-lg overflow-hidden relative font-sans select-text">
                  {/* Header */}
                  <div className="border-b border-slate-200 pb-2 mb-2 flex items-baseline gap-1">
                    <span className="text-base sm:text-lg font-bold text-slate-900">Name :</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900">{normalized.name}</span>
                  </div>

                  {/* Body Columns */}
                  <div className="grid grid-cols-12 gap-3 flex-1 min-h-0 text-[9px] sm:text-[10px]">
                    {/* Left Column (x = 4 cols) */}
                    <div className="col-span-4 flex flex-col gap-2">
                      {/* Avatar & Contact */}
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-slate-800 bg-slate-50 flex items-center justify-center p-1 mb-1">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-[10px] font-bold">
                            {normalized.name.charAt(0)}
                          </div>
                        </div>
                        <div className="text-left w-full text-[8.5px] sm:text-[9.5px] space-y-0.5 text-slate-800 leading-tight">
                          <p><strong className="text-slate-950">DESIGNATION:</strong> {normalized.role}</p>
                          <p><strong className="text-slate-950">Phone:</strong> {normalized.phone || "yet to be given"}</p>
                          <p><strong className="text-slate-950">EMAIL:</strong> {normalized.email || "yet to be given"}</p>
                        </div>
                      </div>

                      {/* Qualifications Banner */}
                      <div>
                        <div className="bg-[#0090D6] text-white px-2 py-0.5 font-bold text-[8.5px] sm:text-[9.5px]">
                          Qualifications
                        </div>
                        <ul className="list-disc list-inside text-[8px] sm:text-[9px] text-slate-700 mt-0.5 space-y-0.5 leading-tight">
                          {normalized.qualifications.length > 0 ? (
                            normalized.qualifications.slice(0, 2).map((q, idx) => <li key={idx}>{q}</li>)
                          ) : (
                            <li>Yet to be given</li>
                          )}
                        </ul>
                      </div>

                      {/* Certificate Banner */}
                      <div>
                        <div className="bg-[#0090D6] text-white px-2 py-0.5 font-bold text-[8.5px] sm:text-[9.5px]">
                          Certificate
                        </div>
                        <ul className="list-disc list-inside text-[8px] sm:text-[9px] text-slate-700 mt-0.5 space-y-0.5 leading-tight">
                          {normalized.certifications.length > 0 ? (
                            normalized.certifications.slice(0, 2).map((c, idx) => <li key={idx}>{c}</li>)
                          ) : (
                            <li>Yet to be given</li>
                          )}
                        </ul>
                      </div>

                      {/* Skill Set Banner */}
                      <div>
                        <div className="bg-[#0090D6] text-white px-2 py-0.5 font-bold text-[8.5px] sm:text-[9.5px]">
                          Skill Set
                        </div>
                        <ul className="list-disc list-inside text-[8px] sm:text-[9px] text-slate-700 mt-0.5 space-y-0.5 leading-tight">
                          {normalized.skills.slice(0, 3).map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column (x = 8 cols) */}
                    <div className="col-span-8 bg-[#F5F6F8] p-2 sm:p-2.5 rounded flex flex-col gap-2 border border-slate-200">
                      {/* Professional Experience */}
                      <div>
                        <div className="bg-[#0090D6] text-white px-2 py-0.5 font-bold text-[8.5px] sm:text-[9.5px] mb-1">
                          Professional Experience
                        </div>
                        <p className="text-[8px] sm:text-[9px] text-slate-800 leading-snug line-clamp-3">
                          {normalized.bio}
                        </p>
                        <p className="text-[8px] sm:text-[9px] text-slate-800 mt-1">
                          <strong className="text-slate-950">Tools & Technology:</strong> {normalized.skills.slice(0, 8).join(", ")}
                        </p>
                      </div>

                      {/* Key Engagements */}
                      <div>
                        <div className="bg-[#0090D6] text-white px-2 py-0.5 font-bold text-[8.5px] sm:text-[9.5px] mb-1">
                          Key Engagements
                        </div>
                        <div className="space-y-1 text-[8px] sm:text-[9px] text-slate-800 leading-snug">
                          {normalized.featuredProjects.slice(0, 2).map((p, idx) => (
                            <p key={idx} className="line-clamp-2">
                              • <strong className="text-slate-950">{p.title}:</strong> {p.description}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <div className="text-xs text-neutral-400">
                  File will download as:{" "}
                  <span className="text-neutral-200 font-mono font-medium">
                    {normalized.name.replace(/[^a-zA-Z0-9_-]/g, "_")}_Profile.pptx
                  </span>
                </div>

                <button
                  onClick={handleDownloadOfficial}
                  disabled={isGenerating}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(14,165,233,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating Presentation...
                    </>
                  ) : (
                    <>
                      <FileDown className="w-4 h-4" />
                      Download PPT in Official Format
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
