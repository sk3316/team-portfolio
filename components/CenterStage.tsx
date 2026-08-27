// components/CenterStage.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TeamMember, SubTeam, Project } from "@/data/portfolio-data";
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Code2,
  ArrowUpRight,
  Mail,
  Phone,
  GraduationCap,
  Award,
  ShieldCheck,
} from "lucide-react";

interface CenterStageProps {
  member: TeamMember | null;
  activeSubTeam: SubTeam | null;
  onSelectProject: (project: Project) => void;
}

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CenterStage({
  member,
  activeSubTeam,
  onSelectProject,
}: CenterStageProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [badgeErrors, setBadgeErrors] = useState<Record<string, boolean>>({});

  // Reset scroll position to top whenever active member changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [member?.id]);

  if (!member) {
    return (
      <div className="z-10 w-full max-w-xl mx-auto px-6 py-12 text-center text-neutral-500">
        Select a team member to view their portfolio.
      </div>
    );
  }

  const handleBadgeError = (badgeName: string) => {
    setBadgeErrors((prev) => ({ ...prev, [badgeName]: true }));
  };

  return (
    <div className="z-10 w-full max-w-2xl mx-auto py-2 sm:py-4 lg:py-6 flex flex-col my-auto select-none">
      <div className="relative flex flex-col w-full max-h-[calc(100vh-6.5rem)] lg:max-h-[calc(100vh-7.5rem)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.985, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.985, filter: "blur(4px)" }}
            transition={{ duration: 0.22, ease: smoothEase }}
            className="relative w-full bg-neutral-900/90 border border-neutral-800/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col group/card"
          >
            {/* Animated gradient border shimmer */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none -z-0">
              <div className="absolute inset-[0px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10" />
            </div>

            {/* Subtle ambient radial light */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

            {/* ── Fixed Card Header (Pinned at Top) ────────────────── */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-3.5 sm:pb-4 border-b border-neutral-800/80 bg-neutral-900/95 backdrop-blur-md flex flex-col sm:flex-row sm:items-start justify-between gap-3 flex-shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-indigo-950/90 text-indigo-400 border border-indigo-800/60 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
                    {activeSubTeam?.name || "Core Member"}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                  {member.name}
                </h1>
                <div className="text-[11px] sm:text-xs lg:text-sm font-medium text-neutral-300 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-indigo-400 font-semibold">{member.role}</span>
                  <span className="text-neutral-700 hidden sm:inline">•</span>
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-1 text-neutral-400 hover:text-indigo-300 transition-colors duration-200"
                  >
                    <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-500" />
                    <span>{member.email}</span>
                  </a>
                  <span className="text-neutral-700 hidden sm:inline">•</span>
                  <a
                    href={`tel:${member.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-1 text-neutral-400 hover:text-indigo-300 transition-colors duration-200"
                  >
                    <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-500" />
                    <span>{member.phone}</span>
                  </a>
                </div>
              </div>

              {/* Social Connect Icons */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                {member.socialLinks?.github && (
                  <a
                    href={member.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-neutral-800/80 hover:bg-indigo-600/20 text-neutral-400 hover:text-white hover:scale-105 border border-neutral-700/50 hover:border-indigo-500/40 transition-all duration-200"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </a>
                )}
                {member.socialLinks?.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-neutral-800/80 hover:bg-indigo-600/20 text-neutral-400 hover:text-white hover:scale-105 border border-neutral-700/50 hover:border-indigo-500/40 transition-all duration-200"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </a>
                )}
                {member.socialLinks?.twitter && (
                  <a
                    href={member.socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-neutral-800/80 hover:bg-indigo-600/20 text-neutral-400 hover:text-white hover:scale-105 border border-neutral-700/50 hover:border-indigo-500/40 transition-all duration-200"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </a>
                )}
                {member.socialLinks?.website && (
                  <a
                    href={member.socialLinks.website}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-neutral-800/80 hover:bg-indigo-600/20 text-neutral-400 hover:text-white hover:scale-105 border border-neutral-700/50 hover:border-indigo-500/40 transition-all duration-200"
                    aria-label="Personal Website"
                  >
                    <Globe className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* ── Scrollable Card Body ─────────────────────────────── */}
            <div
              ref={scrollContainerRef}
              className="relative z-0 flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 space-y-4 sm:space-y-5 custom-card-scroll"
            >
              {/* Bio Summary */}
              <div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  {member.bio}
                </p>
              </div>

              {/* Skills Matrix */}
              <div>
                <h2 className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-neutral-400 mb-2">
                  Core Skills & Technologies
                </h2>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 bg-neutral-800/70 border border-neutral-700/60 rounded-lg text-[11px] sm:text-xs font-medium text-neutral-200 hover:bg-indigo-950/50 hover:border-indigo-600/50 hover:text-indigo-300 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Qualifications & Certifications Grid */}
              {(member.qualifications?.length > 0 ||
                member.certifications?.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-1">
                  {/* Qualifications */}
                  {member.qualifications?.length > 0 && (
                    <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-800/30 border border-neutral-800/80">
                      <h2 className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-neutral-400 mb-2 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                        Qualifications
                      </h2>
                      <ul className="space-y-1.5">
                        {member.qualifications.map((q) => (
                          <li
                            key={q}
                            className="text-[11px] sm:text-xs text-neutral-300 leading-snug flex items-start gap-1.5"
                          >
                            <span className="text-indigo-400 mt-0.5">▸</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Certifications */}
                  {member.certifications?.length > 0 && (
                    <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-800/30 border border-neutral-800/80">
                      <h2 className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-neutral-400 mb-2 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-indigo-400" />
                        Certifications
                      </h2>
                      <ul className="space-y-1.5">
                        {member.certifications.map((c) => (
                          <li
                            key={c}
                            className="text-[11px] sm:text-xs text-neutral-300 leading-snug flex items-start gap-1.5"
                          >
                            <span className="text-indigo-400 mt-0.5">▸</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Earned Badges (Sleek Dark Mode Badges) */}
              {member.badges?.length > 0 && (
                <div className="pt-1">
                  <h2 className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-neutral-400 mb-2 sm:mb-2.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                    Earned Badges
                  </h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-2.5">
                    {member.badges.map((badge) => {
                      const hasImageError = badgeErrors[badge.name];
                      const canShowImage = !!badge.logoUrl && !hasImageError;
                      const brandColor = badge.color || "#6366F1";

                      return (
                        <div
                          key={badge.name}
                          title={badge.name}
                          className="group/badge flex flex-col items-center gap-1 p-2 rounded-xl bg-neutral-800/40 border border-neutral-700/50 hover:border-indigo-500/50 hover:bg-neutral-800/70 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-200 cursor-default"
                        >
                          <div
                            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg p-1.5 flex items-center justify-center bg-neutral-900 border border-neutral-700/60 group-hover/badge:border-indigo-400/60 transition-all duration-200"
                            style={{
                              boxShadow: `0 0 10px ${brandColor}20`,
                            }}
                          >
                            {canShowImage ? (
                              <Image
                                src={badge.logoUrl}
                                alt={badge.name}
                                width={32}
                                height={32}
                                className="object-contain w-full h-full filter brightness-95 group-hover/badge:brightness-110"
                                unoptimized
                                onError={() => handleBadgeError(badge.name)}
                              />
                            ) : (
                              <span
                                className="text-[10px] sm:text-[11px] font-bold tracking-tight"
                                style={{ color: brandColor }}
                              >
                                {badge.fallbackText ||
                                  badge.name.slice(0, 3).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <span className="text-[9px] font-medium text-neutral-400 group-hover/badge:text-indigo-300 leading-tight text-center line-clamp-2 transition-colors duration-200">
                            {badge.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Featured Projects Grid */}
              <div className="pt-1 pb-2">
                <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                  <h2 className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-neutral-400 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                    Featured Projects
                  </h2>
                  <span className="text-[10px] text-indigo-400/80 font-medium hidden sm:inline">
                    Click card for case study
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {member.featuredProjects.map((project) => (
                    <div
                      key={project.title}
                      onClick={() => onSelectProject(project)}
                      className="group/project cursor-pointer p-3.5 sm:p-4 rounded-2xl bg-neutral-800/30 border border-neutral-800 hover:border-indigo-500/50 hover:bg-neutral-800/60 hover:shadow-[0_4px_24px_rgba(99,102,241,0.12)] transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs sm:text-sm font-semibold text-white group-hover/project:text-indigo-300 transition-colors duration-200 flex items-center gap-1">
                            <span>{project.title}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/project:opacity-100 transition-opacity duration-200 text-indigo-400 flex-shrink-0" />
                          </h3>
                        </div>
                        <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-neutral-800/50">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded bg-indigo-950/50 text-indigo-300 border border-indigo-800/40 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 font-medium">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
