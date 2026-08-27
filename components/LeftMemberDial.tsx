// components/LeftMemberDial.tsx
"use client";

import React, { useCallback, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TeamMember } from "@/data/portfolio-data";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface LeftMemberDialProps {
  members: TeamMember[];
  selectedMemberId: string;
  onSelectMember: (member: TeamMember) => void;
}

export default function LeftMemberDial({
  members,
  selectedMemberId,
  onSelectMember,
}: LeftMemberDialProps) {
  const selectedIndex = Math.max(
    0,
    members.findIndex((m) => m.id === selectedMemberId),
  );

  const [hasScrolled, setHasScrolled] = useState(false);
  const wheelAccumulator = useRef(0);
  const lastScrollTime = useRef(0);

  // Radial Geometry Constants (Compact & Fluid for 14"/15.6" laptops + large monitors)
  const angleStep = 24; // Degrees between avatar nodes
  const radius = 260; // Radius of circular arc
  const originX = -130; // Virtual center off-screen to the left

  // Smooth, throttled scroll wheel navigation
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!hasScrolled) setHasScrolled(true);

      const now = Date.now();
      wheelAccumulator.current += e.deltaY;

      // Prevent runaway scrolling on trackpads/fast scroll wheels (120ms throttle)
      if (now - lastScrollTime.current < 120) {
        return;
      }

      if (Math.abs(wheelAccumulator.current) >= 30) {
        const direction = wheelAccumulator.current > 0 ? 1 : -1;
        wheelAccumulator.current = 0;
        lastScrollTime.current = now;

        const nextIndex = Math.min(
          Math.max(selectedIndex + direction, 0),
          members.length - 1,
        );

        if (nextIndex !== selectedIndex && members[nextIndex]) {
          onSelectMember(members[nextIndex]);
        }
      }
    },
    [selectedIndex, members, onSelectMember, hasScrolled],
  );

  return (
    <div
      onWheel={handleWheel}
      className="absolute left-0 top-0 bottom-0 w-64 select-none z-20 flex items-center justify-start pointer-events-auto"
      style={{ touchAction: "none" }}
    >
      {/* Faint Orbit Guideline */}
      <svg
        className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-[600px] pointer-events-none opacity-20"
        style={{ overflow: "visible" }}
      >
        <circle
          cx={originX}
          cy="300"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          className="text-indigo-400"
        />
      </svg>

      {/* Focal Apex Indicator (Aligned with selected node at 0 degrees) */}
      <div className="absolute left-[130px] top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none z-30">
        <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_14px_rgba(129,140,248,1)] animate-pulse" />
        <div className="w-6 h-[1.5px] bg-gradient-to-r from-indigo-500/80 to-transparent" />
      </div>

      {/* Scroll Hint */}
      <AnimatePresence>
        {!hasScrolled && members.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.25 } }}
            className="absolute left-5 bottom-8 z-40 flex flex-col items-center gap-1 pointer-events-none"
          >
            <span className="text-[10px] font-medium text-neutral-500 tracking-wide uppercase">
              Scroll to browse
            </span>
            <ChevronDown
              className="w-3.5 h-3.5 text-indigo-400"
              style={{
                animation: "scroll-hint-bounce 1.5s ease-in-out infinite",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rotary Nodes Container */}
      <div className="relative w-full h-full">
        {members.map((member, index) => {
          const relativeIndex = index - selectedIndex;
          const angleDeg = relativeIndex * angleStep;
          const angleRad = (angleDeg * Math.PI) / 180;

          // Pure numeric coordinates relative to left edge & vertical center (top: 50%)
          const x = originX + radius * Math.cos(angleRad);
          const y = radius * Math.sin(angleRad);

          const isSelected = member.id === selectedMemberId;
          const distance = Math.abs(relativeIndex);

          // Cull nodes beyond 3 steps
          if (distance > 3) return null;

          const scale = isSelected ? 1.18 : Math.max(0.68, 1 - distance * 0.12);
          const opacity = isSelected ? 1 : Math.max(0.2, 1 - distance * 0.26);

          return (
            <motion.div
              key={member.id}
              initial={false}
              animate={{
                x: Math.round(x),
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
              onClick={() => onSelectMember(member)}
              className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer group flex items-center gap-2.5"
              style={{ zIndex: isSelected ? 20 : 10 - distance }}
            >
              {/* Avatar Bubble */}
              <div
                className={`relative w-12 h-12 rounded-full p-0.5 transition-all duration-300 ${
                  isSelected
                    ? "ring-3 ring-indigo-500/60 shadow-[0_0_24px_rgba(99,102,241,0.7)] border-2 border-indigo-400 scale-105"
                    : "border border-neutral-700/80 bg-neutral-900 group-hover:border-indigo-400/60 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(99,102,241,0.25)]"
                }`}
              >
                <Image
                  src={member.avatarUrl}
                  alt={member.name}
                  width={48}
                  height={48}
                  className={`w-full h-full rounded-full object-cover transition-all duration-300 ${
                    isSelected
                      ? "grayscale-0"
                      : "grayscale-[35%] group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                  }`}
                />
              </div>

              {/* Compact Name Tag for selected member */}
              <motion.div
                animate={{
                  opacity: isSelected ? 1 : 0,
                  x: isSelected ? 0 : -6,
                  scale: isSelected ? 1 : 0.95,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`pointer-events-none whitespace-nowrap bg-neutral-900/90 border border-neutral-800 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-lg max-w-[130px] ${
                  isSelected ? "block" : "hidden"
                }`}
              >
                <p className="text-xs font-semibold text-white tracking-tight leading-tight truncate">
                  {member.name}
                </p>
                <p className="text-[9.5px] font-medium text-indigo-400 leading-tight truncate">
                  {member.role}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
