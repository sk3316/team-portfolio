// components/MobileNavigation.tsx
"use client";

import React from "react";
import Image from "next/image";
import { SubTeam, TeamMember, getMembersBySubTeam } from "@/data/portfolio-data";
import { Users } from "lucide-react";

interface MobileNavigationProps {
  subTeams: SubTeam[];
  selectedSubTeamId: string;
  onSelectSubTeam: (team: SubTeam) => void;
  members: TeamMember[];
  selectedMemberId: string;
  onSelectMember: (member: TeamMember) => void;
}

export default function MobileNavigation({
  subTeams,
  selectedSubTeamId,
  onSelectSubTeam,
  members,
  selectedMemberId,
  onSelectMember,
}: MobileNavigationProps) {
  return (
    <div className="w-full flex flex-col gap-2.5 px-4 py-3 bg-neutral-950/90 border-b border-neutral-900/80 backdrop-blur-xl lg:hidden z-20 flex-shrink-0">
      {/* Sub-Team Horizontal Pill Rail */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
        {subTeams.map((team) => {
          const isSelected = team.id === selectedSubTeamId;
          const memberCount = getMembersBySubTeam(team.id).length;

          return (
            <button
              key={team.id}
              onClick={() => onSelectSubTeam(team)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all flex-shrink-0 cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.45)] border border-indigo-400"
                  : "bg-neutral-900/90 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700"
              }`}
            >
              <Users
                className={`w-3 h-3 ${isSelected ? "text-white" : "text-neutral-500"}`}
              />
              <span>{team.name}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-neutral-800 text-neutral-500"
                }`}
              >
                {memberCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Member Avatars Horizontal Swipe Rail */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
        {members.map((member) => {
          const isSelected = member.id === selectedMemberId;

          return (
            <button
              key={member.id}
              onClick={() => onSelectMember(member)}
              className="flex flex-col items-center gap-1 flex-shrink-0 group focus:outline-none cursor-pointer"
            >
              <div
                className={`relative w-11 h-11 rounded-full p-0.5 transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-indigo-500 shadow-[0_0_16px_rgba(99,102,241,0.6)] border-2 border-indigo-400 scale-105"
                    : "border border-neutral-800 opacity-60 group-hover:opacity-100 group-hover:border-neutral-700"
                }`}
              >
                <Image
                  src={member.avatarUrl}
                  alt={member.name}
                  width={44}
                  height={44}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight max-w-[68px] truncate transition-colors ${
                  isSelected
                    ? "text-indigo-300 font-semibold"
                    : "text-neutral-400 group-hover:text-neutral-300"
                }`}
              >
                {member.name.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
