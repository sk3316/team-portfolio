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
import PPTStudioModal from "@/components/PPTStudioModal";
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
  const [isPPTStudioOpen, setIsPPTStudioOpen] = useState(false);

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
    <main
      className={`relative min-h-screen w-full bg-neutral-950 text-white flex flex-col justify-between selection:bg-indigo-500/30 overflow-x-hidden ${
        activeTab === "members" ? "xl:h-screen xl:overflow-hidden" : ""
      }`}
    >
      {/* ── High-Performance Ambient Glow (Zero CPU/GPU Lag) ── */}
      <div
        className="pointer-events-none fixed inset-0 -z-0 overflow-hidden opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 20% 60%, rgba(6, 182, 212, 0.06) 0%, transparent 40%)
          `,
        }}
      />

      {/* ── Top Bar Header (3 Tabs: Home / Members / Contact) ── */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        selectedSubTeamName={selectedSubTeam.name}
        memberCount={filteredMembers.length}
        onOpenPPTStudio={() => setIsPPTStudioOpen(true)}
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
                    onOpenPPTStudio={() => setIsPPTStudioOpen(true)}
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

      {/* ── Global Footer (Rendered on Home & Contact; Members tab has fixed full-screen cockpit) ── */}
      {activeTab !== "members" && (
        <Footer
          onSelectTab={handleSelectTab}
          onSelectSubTeam={handleSelectSubTeam}
        />
      )}

      {/* ── Project Deep-Dive Modal (Available Globally) ── */}
      <ProjectModal
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
        authorName={activeMember?.name || "CXcel Engineer"}
      />

      {/* ── Global PPT Studio Modal (Dual-Engine PPT Generation & Duplication) ── */}
      <PPTStudioModal
        isOpen={isPPTStudioOpen}
        onClose={() => setIsPPTStudioOpen(false)}
        activeMember={activeMember}
        onSelectMember={(memberId) => setSelectedMemberId(memberId)}
      />
    </main>
  );
}
