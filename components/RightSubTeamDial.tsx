// components/RightSubTeamDial.tsx
"use client";

import React, { useCallback, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SubTeam, getMembersBySubTeam } from "@/data/portfolio-data";
import { Users, ChevronDown } from "lucide-react";

interface RightSubTeamDialProps {
  subTeams: SubTeam[];
  selectedSubTeamId: string;
  onSelectSubTeam: (subTeam: SubTeam) => void;
}

export default function RightSubTeamDial({
  subTeams,
  selectedSubTeamId,
  onSelectSubTeam,
}: RightSubTeamDialProps) {
  const selectedIndex = Math.max(
    0,
    subTeams.findIndex((t) => t.id === selectedSubTeamId),
  );

  const [hasScrolled, setHasScrolled] = useState(false);
  const wheelAccumulator = useRef(0);
  const lastScrollTime = useRef(0);

  // Radial Geometry Constants
  const angleStep = 32; // Degrees between sub-team pills
  const radius = 300; // Radius of circular arc
  const originXFromRight = -120; // Virtual origin off-screen to the right

  // Smooth, throttled scroll wheel navigation
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!hasScrolled) setHasScrolled(true);

      const now = Date.now();
      wheelAccumulator.current += e.deltaY;

      // Prevent runaway scrolling (120ms throttle)
      if (now - lastScrollTime.current < 120) {
        return;
      }

      if (Math.abs(wheelAccumulator.current) >= 30) {
        const direction = wheelAccumulator.current > 0 ? 1 : -1;
        wheelAccumulator.current = 0;
        lastScrollTime.current = now;

        const nextIndex = Math.min(
          Math.max(selectedIndex + direction, 0),
          subTeams.length - 1,
        );

        if (nextIndex !== selectedIndex && subTeams[nextIndex]) {
          onSelectSubTeam(subTeams[nextIndex]);
        }
      }
    },
    [selectedIndex, subTeams, onSelectSubTeam, hasScrolled],
  );

  return (
    <div
      onWheel={handleWheel}
      className="absolute right-0 top-0 bottom-0 w-72 select-none z-20 flex items-center justify-end pointer-events-auto"
      style={{ touchAction: "none" }}
    >
      {/* Faint Orbit Guideline (Mirrored Arc) */}
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-[600px] pointer-events-none opacity-20"
        style={{ overflow: "visible" }}
      >
        <circle
          cx={-originXFromRight + 80}
          cy="300"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          className="text-indigo-400"
        />
      </svg>

      {/* Focal Apex Indicator (Aligned with selected pill at 0 degrees) */}
      <div className="absolute right-[180px] top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-30 flex-row-reverse">
        <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_14px_rgba(129,140,248,1)] animate-pulse" />
        <div className="w-8 h-[1.5px] bg-gradient-to-l from-indigo-500/80 to-transparent" />
      </div>

      {/* Scroll Hint */}
      <AnimatePresence>
        {!hasScrolled && subTeams.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.25 } }}
            className="absolute right-6 bottom-8 z-40 flex flex-col items-center gap-1 pointer-events-none"
          >
            <span className="text-[10px] font-medium text-neutral-500 tracking-wide uppercase">
              Scroll to filter
            </span>
            <ChevronDown
              className="w-3.5 h-3.5 text-indigo-400"
              style={{ animation: "scroll-hint-bounce 1.5s ease-in-out infinite" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rotary Nodes Container */}
      <div className="relative w-full h-full">
        {subTeams.map((team, index) => {
          const relativeIndex = index - selectedIndex;
          const angleDeg = relativeIndex * angleStep;
          const angleRad = (angleDeg * Math.PI) / 180;

          // Pure numeric coordinates relative to right edge & vertical center
          const xFromRight = originXFromRight + radius * Math.cos(angleRad);
          const y = radius * Math.sin(angleRad);

          const isSelected = team.id === selectedSubTeamId;
          const distance = Math.abs(relativeIndex);

          // Cull nodes beyond 3 steps
          if (distance > 3) return null;

          const scale = isSelected ? 1.08 : Math.max(0.75, 1 - distance * 0.1);
          const opacity = isSelected ? 1 : Math.max(0.22, 1 - distance * 0.26);

          // Get member count for the badge
          const memberCount = getMembersBySubTeam(team.id).length;

          return (
            <motion.div
              key={team.id}
              initial={false}
              animate={{
                x: -Math.round(xFromRight),
                y: Math.round(y),
                scale,
                opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 24,
                mass: 0.8,
              }}
              onClick={() => onSelectSubTeam(team)}
              className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer group flex items-center flex-row-reverse gap-2.5"
              style={{ zIndex: isSelected ? 20 : 10 - distance }}
            >
              {/* Sub-Team Badge / Pill */}
              <div
                className={`px-3.5 py-2 rounded-2xl flex items-center gap-2 transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-[0_0_24px_rgba(99,102,241,0.55)] border border-indigo-400 font-semibold scale-105"
                    : "bg-neutral-900/90 text-neutral-400 border border-neutral-800 hover:border-indigo-400/50 hover:text-white hover:shadow-[0_0_12px_rgba(99,102,241,0.15)] backdrop-blur-md"
                }`}
              >
                <Users
                  className={`w-3.5 h-3.5 ${
                    isSelected
                      ? "text-white"
                      : "text-neutral-500 group-hover:text-indigo-400 transition-colors duration-200"
                  }`}
                />
                <span className="text-xs tracking-wide whitespace-nowrap font-medium">
                  {team.name}
                </span>

                {/* Live Member count badge */}
                <span
                  className={`ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-all duration-200 ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-neutral-800 text-neutral-500 group-hover:bg-indigo-950/60 group-hover:text-indigo-400"
                  }`}
                >
                  {memberCount}
                </span>
              </div>

              {/* Shortcode Badge */}
              <div
                className={`pointer-events-none whitespace-nowrap bg-neutral-900/80 border border-neutral-800 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold transition-opacity duration-200 ${
                  isSelected ? "text-indigo-400 opacity-100" : "text-neutral-500 opacity-0 group-hover:opacity-60"
                }`}
              >
                {team.shortCode}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
