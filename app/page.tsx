// app/page.tsx
"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  portfolioData,
  SubTeam,
  getMembersBySubTeam,
} from "@/data/portfolio-data";
import LeftMemberDial from "@/components/LeftMemberDial";
import RightSubTeamDial from "@/components/RightSubTeamDial";
import CenterStage from "@/components/CenterStage";
import { Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function Page() {
  const [selectedSubTeam, setSelectedSubTeam] = useState<SubTeam>(
    portfolioData.subTeams[0],
  );
  const [selectedMemberId, setSelectedMemberId] = useState<string>(
    portfolioData.members[0].id,
  );

  // Filter members based on chosen sub-team
  const filteredMembers = useMemo(() => {
    return getMembersBySubTeam(selectedSubTeam.id);
  }, [selectedSubTeam]);

  // Derive active member purely
  const activeMember = useMemo(() => {
    const found = filteredMembers.find((m) => m.id === selectedMemberId);
    return found || filteredMembers[0] || null;
  }, [filteredMembers, selectedMemberId]);

  // Sync selectedMemberId when active member changes on sub-team switch
  useEffect(() => {
    if (activeMember && activeMember.id !== selectedMemberId) {
      setSelectedMemberId(activeMember.id);
    }
  }, [activeMember, selectedMemberId]);

  // Keyboard navigation support (ArrowUp/Down for members, ArrowLeft/Right for sub-teams)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
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
        if (portfolioData.subTeams[nextSubIndex]) {
          setSelectedSubTeam(portfolioData.subTeams[nextSubIndex]);
        }
      }
    },
    [filteredMembers, activeMember, selectedSubTeam],
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

      {/* ── Top Bar Navigation ──────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-8 py-4 flex items-center justify-between border-b border-neutral-900/80 bg-neutral-950/80 backdrop-blur-md z-30 flex-shrink-0"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            N
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">
              {portfolioData.teamInfo.name}
            </h1>
            <p className="text-[11px] text-neutral-400">
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
          className="flex items-center gap-3 bg-neutral-900/80 border border-neutral-800 px-3.5 py-1.5 rounded-full text-xs text-neutral-400"
        >
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>
            Scope:{" "}
            <strong className="text-white font-medium">
              {selectedSubTeam.name}
            </strong>
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <motion.span
            key={filteredMembers.length}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-indigo-400 font-medium"
          >
            {filteredMembers.length}{" "}
            {filteredMembers.length === 1 ? "member" : "members"}
          </motion.span>
        </motion.div>
      </motion.header>

      {/* ── Main Viewport: Dual Dials + Center Stage ── */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
        {/* Left Member Rotary Dial */}
        <LeftMemberDial
          members={filteredMembers}
          selectedMemberId={activeMember?.id || ""}
          onSelectMember={(member) => setSelectedMemberId(member.id)}
        />

        {/* Center Stage Showcase */}
        <CenterStage member={activeMember} activeSubTeam={selectedSubTeam} />

        {/* Right Sub-Team Rotary Dial */}
        <RightSubTeamDial
          subTeams={portfolioData.subTeams}
          selectedSubTeamId={selectedSubTeam.id}
          onSelectSubTeam={(subTeam) => setSelectedSubTeam(subTeam)}
        />
      </div>
    </main>
  );
}
