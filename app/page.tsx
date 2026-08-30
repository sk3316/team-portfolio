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
import Header, { NavTab } from "@/components/Header";
import Footer from "@/components/Footer";
import AboutUsSection from "@/components/AboutUsSection";
import ContactSection from "@/components/ContactSection";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const [activeTab, setActiveTab] = useState<NavTab>("home");
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

  // Smooth Tab Switcher
  const handleSelectTab = useCallback((tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Keyboard navigation support (ArrowUp/Down for members, ArrowLeft/Right for sub-teams)
  // Only active when viewing the 'members' tab
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeTab !== "members") return;
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
      activeTab,
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
    <main className="relative min-h-screen w-full bg-neutral-950 text-white flex flex-col justify-between selection:bg-indigo-500/30 overflow-x-hidden">
      {/* ── Ambient Background Glow ──────────────── */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-indigo-600/10 blur-[130px]"
          style={{ animation: "ambient-drift 18s ease-in-out infinite" }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 w-[450px] h-[450px] rounded-full bg-violet-600/8 blur-[110px]"
          style={{ animation: "ambient-drift-alt 22s ease-in-out infinite" }}
        />
        <div
          className="absolute left-1/4 bottom-1/3 w-[380px] h-[380px] rounded-full bg-cyan-500/5 blur-[95px]"
          style={{
            animation: "ambient-drift 25s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* ── Top Bar Header (3 Tabs: Home / Members / Contact) ── */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        selectedSubTeamName={selectedSubTeam.name}
        memberCount={filteredMembers.length}
      />

      {/* ── Dynamic Tab Content ──────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {/* TAB 1: HOME (ABOUT US) */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex-1 w-full"
            >
              <AboutUsSection
                onSelectTab={handleSelectTab}
                onSelectSubTeam={handleSelectSubTeam}
              />
            </motion.div>
          )}

          {/* TAB 2: MEMBERS (THE CORE TEAM PORTFOLIO) */}
          {activeTab === "members" && (
            <motion.div
              key="members"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex-1 flex flex-col justify-between w-full"
            >
              {/* Mobile & Tablet Navigation (< xl: screens under 1280px) */}
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

              {/* Main Viewport: Desktop Dual Rotary Dials (xl+) + Center Stage */}
              <div className="relative flex-1 min-h-[calc(100vh-10rem)] w-full overflow-hidden flex flex-col xl:flex-row items-center justify-center p-2 sm:p-3 xl:p-0">
                {/* Desktop Left Rotary Dial (xl+) */}
                <div className="hidden xl:block">
                  <LeftMemberDial
                    members={filteredMembers}
                    selectedMemberId={activeMember?.id || ""}
                    onSelectMember={(member) => setSelectedMemberId(member.id)}
                  />
                </div>

                {/* Center Stage Showcase (All screens) */}
                <div className="relative w-full h-full min-h-[580px] xl:min-h-0 flex flex-col items-center justify-center">
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
            </motion.div>
          )}

          {/* TAB 3: CONTACT US */}
          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex-1 w-full"
            >
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Global Footer With Essential Information ── */}
      <Footer
        onSelectTab={handleSelectTab}
        onSelectSubTeam={handleSelectSubTeam}
      />

      {/* ── Project Deep-Dive Modal (Available Globally) ── */}
      <ProjectModal
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
        authorName={activeMember?.name || "CXcel Engineer"}
      />
    </main>
  );
}
