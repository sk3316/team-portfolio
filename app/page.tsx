// app/page.tsx
"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  portfolioData,
  SubTeam,
  TeamMember,
  Project,
  getMembersBySubTeam,
} from "@/data/portfolio-data";
import LeftMemberDial from "@/components/LeftMemberDial";
import RightSubTeamDial from "@/components/RightSubTeamDial";
import CenterStage from "@/components/CenterStage";
import MobileNavigation from "@/components/MobileNavigation";
import ProjectModal from "@/components/ProjectModal";
import { Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function Page() {
  const [selectedSubTeam, setSelectedSubTeam] = useState<SubTeam>(
    portfolioData.subTeams[0],
  );
  const [selectedMemberId, setSelectedMemberId] = useState<string>(
    portfolioData.members[0].id,
  );
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Filter members based on chosen sub-team
  const filteredMembers = useMemo(() => {
    return getMembersBySubTeam(selectedSubTeam.id);
  }, [selectedSubTeam]);

  // Derive active member purely from the filtered pool
  const activeMember = useMemo<TeamMember | null>(() => {
    const found = filteredMembers.find((m) => m.id === selectedMemberId);
    return found ?? filteredMembers[0] ?? null;
  }, [filteredMembers, selectedMemberId]);

  // Sub-team change handler: reconcile member selection smoothly
  const handleSelectSubTeam = useCallback((subTeam: SubTeam) => {
    const nextPool = getMembersBySubTeam(subTeam.id);
    setSelectedSubTeam(subTeam);
    setSelectedMemberId((current) => {
      const stillThere = nextPool.find((m) => m.id === current);
      return stillThere ? current : (nextPool[0]?.id ?? current);
    });
  }, []);

  // Keyboard navigation support (ArrowUp/Down for members, ArrowLeft/Right for sub-teams)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Do not navigate dials if modal is open
      if (activeProject) return;

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const currentIndex = filteredMembers.findIndex(
          (m) => m.id === activeMember?.id,
        );
        const direction = e.key === "ArrowDown" ? 1 : -1;
        const nextIndex = Math.min(
          Math.max(currentIndex + direction, 0),
          filteredMembers.length - 1,
        );
        if (filteredMembers[nextIndex]) {
          setSelectedMemberId(filteredMembers[nextIndex].id);
        }
      } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const currentSubIndex = portfolioData.subTeams.findIndex(
          (t) => t.id === selectedSubTeam.id,
        );
        const direction = e.key === "ArrowRight" ? 1 : -1;
        const nextSubIndex = Math.min(
          Math.max(currentSubIndex + direction, 0),
          portfolioData.subTeams.length - 1,
        );
        const nextSubTeam = portfolioData.subTeams[nextSubIndex];
        if (nextSubTeam) {
          handleSelectSubTeam(nextSubTeam);
        }
      }
    },
    [
      filteredMembers,
      activeMember,
      selectedSubTeam,
      handleSelectSubTeam,
      activeProject,
    ],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <main className="relative w-screen h-screen bg-neutral-950 text-white flex flex-col justify-between overflow-hidden select-none selection:bg-indigo-500/30">
      {/* ── Ambient Background Glow ──────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]"
          style={{ animation: "ambient-drift 18s ease-in-out infinite" }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/8 blur-[100px]"
          style={{ animation: "ambient-drift-alt 22s ease-in-out infinite" }}
        />
        <div
          className="absolute left-1/4 bottom-1/3 w-[350px] h-[350px] rounded-full bg-cyan-500/5 blur-[90px]"
          style={{
            animation: "ambient-drift 25s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* ── Top Bar Header ──────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-4 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between border-b border-neutral-900/80 bg-neutral-950/85 backdrop-blur-md z-30 flex-shrink-0"
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            N
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold tracking-tight">
              {portfolioData.teamInfo.name}
            </h1>
            <p className="text-[10px] sm:text-[11px] text-neutral-400 hidden sm:block">
              {portfolioData.teamInfo.tagline}
            </p>
          </div>
        </div>

        {/* Live Filter Indicator */}
        <motion.div
          key={selectedSubTeam.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-center gap-2 sm:gap-3 bg-neutral-900/80 border border-neutral-800 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs text-neutral-400"
        >
          <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400" />
          <span>
            <span className="hidden sm:inline">Scope: </span>
            <strong className="text-white font-medium">
              {selectedSubTeam.name}
            </strong>
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-600 hidden sm:inline-block" />
          <motion.span
            key={filteredMembers.length}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-indigo-400 font-medium hidden sm:inline-block"
          >
            {filteredMembers.length}{" "}
            {filteredMembers.length === 1 ? "member" : "members"}
          </motion.span>
        </motion.div>
      </motion.header>

      {/* ── Mobile & Tablet Navigation (< xl: screens under 1280px) ── */}
      <div className="block xl:hidden flex-shrink-0 z-20">
        <MobileNavigation
          subTeams={portfolioData.subTeams}
          selectedSubTeamId={selectedSubTeam.id}
          onSelectSubTeam={handleSelectSubTeam}
          members={filteredMembers}
          selectedMemberId={activeMember?.id || ""}
          onSelectMember={(member) => setSelectedMemberId(member.id)}
        />
      </div>

      {/* ── Main Viewport: Desktop Dual Dials (xl+) + Center Stage ── */}
      <div className="relative flex-1 min-h-0 w-full overflow-hidden flex flex-col xl:flex-row items-center justify-center p-2 sm:p-3 xl:p-0">
        {/* Desktop Left Rotary Dial (xl+) */}
        <div className="hidden xl:block">
          <LeftMemberDial
            members={filteredMembers}
            selectedMemberId={activeMember?.id || ""}
            onSelectMember={(member) => setSelectedMemberId(member.id)}
          />
        </div>

        {/* Center Stage Showcase (All screens) */}
        <div className="relative w-full h-full min-h-0 flex flex-col items-center justify-center">
          <CenterStage
            member={activeMember}
            activeSubTeam={selectedSubTeam}
            onSelectProject={(project) => setActiveProject(project)}
          />
        </div>

        {/* Desktop Right Rotary Dial (xl+) */}
        <div className="hidden xl:block">
          <RightSubTeamDial
            subTeams={portfolioData.subTeams}
            selectedSubTeamId={selectedSubTeam.id}
            onSelectSubTeam={handleSelectSubTeam}
          />
        </div>
      </div>

      {/* ── Project Deep-Dive Modal ── */}
      <ProjectModal
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
        authorName={activeMember?.name || "Nexus Engineer"}
      />
    </main>
  );
}
