// components/CenterStage.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TeamMember, SubTeam } from "@/data/portfolio-data";
import {
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Code2,
} from "lucide-react";

interface CenterStageProps {
  member: TeamMember | null;
  activeSubTeam: SubTeam | null;
}

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CenterStage({
  member,
  activeSubTeam,
}: CenterStageProps) {
  if (!member) {
    return (
      <div className="z-10 w-full max-w-xl mx-auto px-6 py-12 text-center text-neutral-500">
        Select a team member to view their portfolio.
      </div>
    );
  }

  return (
    <div className="z-10 w-full max-w-2xl mx-auto py-2 sm:py-4 lg:py-8 flex flex-col my-auto select-none">
      <div className="relative min-h-[300px] lg:min-h-[500px] flex flex-col justify-center w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.985, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.985, filter: "blur(4px)" }}
            transition={{ duration: 0.22, ease: smoothEase }}
            className="relative w-full bg-neutral-900/85 border border-neutral-800/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl overflow-hidden group/card"
          >
            {/* Animated gradient border shimmer */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-[0px] rounded-3xl bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10" />
            </div>

            {/* Subtle ambient radial light */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Header Info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-neutral-800/80 pb-4 sm:pb-5 gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
                    {activeSubTeam?.name || "Core Member"}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                  {member.name}
                </h1>
                <p className="text-xs sm:text-sm font-medium text-indigo-400/90 mt-0.5">
                  {member.role}
                </p>
              </div>

              {/* Social Connect Icons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {member.socialLinks.github && (
                  <a
                    href={member.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-neutral-800/60 hover:bg-indigo-600/20 text-neutral-400 hover:text-white hover:scale-110 transition-all duration-200"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </a>
                )}
                {member.socialLinks.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-neutral-800/60 hover:bg-indigo-600/20 text-neutral-400 hover:text-white hover:scale-110 transition-all duration-200"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </a>
                )}
                {member.socialLinks.twitter && (
                  <a
                    href={member.socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-neutral-800/60 hover:bg-indigo-600/20 text-neutral-400 hover:text-white hover:scale-110 transition-all duration-200"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </a>
                )}
                {member.socialLinks.website && (
                  <a
                    href={member.socialLinks.website}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-neutral-800/60 hover:bg-indigo-600/20 text-neutral-400 hover:text-white hover:scale-110 transition-all duration-200"
                    aria-label="Personal Website"
                  >
                    <Globe className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Bio Summary */}
            <div className="mt-3.5 sm:mt-4">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                {member.bio}
              </p>
            </div>

            {/* Skills Matrix */}
            <div className="mt-4 sm:mt-5">
              <h2 className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-neutral-400 mb-2">
                Core Skills & Technologies
              </h2>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-neutral-800/60 border border-neutral-700/60 rounded-lg text-[11px] sm:text-xs font-medium text-neutral-300 hover:bg-indigo-950/40 hover:border-indigo-700/50 hover:text-indigo-300 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Projects Grid */}
            <div className="mt-4 sm:mt-6">
              <h2 className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-neutral-400 mb-2 sm:mb-2.5 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {member.featuredProjects.map((project) => (
                  <div
                    key={project.title}
                    className="p-3 sm:p-3.5 rounded-2xl bg-neutral-800/30 border border-neutral-800 hover:border-indigo-600/40 hover:bg-neutral-800/50 hover:shadow-[0_4px_24px_rgba(99,102,241,0.08)] transition-all duration-200 flex flex-col justify-between group/project"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs sm:text-sm font-semibold text-white group-hover/project:text-indigo-300 transition-colors duration-200">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-1.5">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-neutral-400 hover:text-white hover:scale-110 transition-all duration-200"
                              aria-label="Project Repository"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-neutral-400 hover:text-indigo-400 hover:scale-110 transition-all duration-200"
                              aria-label="Live Project"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-neutral-800/50">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded bg-indigo-950/40 text-indigo-300 border border-indigo-800/30 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
