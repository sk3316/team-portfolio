// components/PortfolioContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  emptyPortfolioData,
  TeamMember,
  SubTeam,
  TeamPortfolioData,
} from "@/data/portfolio-data";
import { GoogleSheetsSyncResult } from "@/lib/sheets/fetchGoogleSheet";

interface PortfolioContextType {
  data: TeamPortfolioData;
  members: TeamMember[];
  subTeams: SubTeam[];
  isLive: boolean;
  source: "google-sheets";
  lastSync: string | null;
  isRefreshing: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getMembersBySubTeam: (subTeamId: string) => TeamMember[];
  getMemberById: (id: string) => TeamMember | undefined;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export interface PortfolioProviderProps {
  children: ReactNode;
  initialData?: TeamPortfolioData;
  initialSyncResult?: GoogleSheetsSyncResult;
}

export function PortfolioProvider({
  children,
  initialData,
  initialSyncResult,
}: PortfolioProviderProps) {
  const [data, setData] = useState<TeamPortfolioData>(
    initialData && initialData.members && initialData.members.length > 0
      ? initialData
      : emptyPortfolioData
  );

  const [isLive, setIsLive] = useState<boolean>(
    initialSyncResult?.isLive ?? Boolean(initialData && initialData.members.length > 0)
  );

  const [lastSync, setLastSync] = useState<string | null>(
    initialSyncResult?.lastSync || (initialData?.members?.length ? new Date().toISOString() : null)
  );

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(initialSyncResult?.error || null);

  const fetchLivePortfolio = useCallback(async (isManualRefresh = false) => {
    try {
      setIsRefreshing(true);
      setError(null);

      const url = isManualRefresh ? "/api/portfolio?refresh=true" : "/api/portfolio";
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const json = await res.json();

      if (json && json.data && Array.isArray(json.data.members)) {
        setData(json.data);
        setIsLive(Boolean(json.isLive));
        setLastSync(json.lastSync || new Date().toISOString());
      }

      if (json.error) {
        setError(json.error);
      } else {
        setError(null);
      }
    } catch (err: any) {
      console.warn("Could not load live Google Sheets data:", err);
      setError(err.message || "Failed to sync");
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // If no initialData was provided on server, fetch on client mount
  useEffect(() => {
    if (!initialData || !initialData.members || initialData.members.length === 0) {
      fetchLivePortfolio(false);
    }
  }, [initialData, fetchLivePortfolio]);

  const getMembersBySubTeam = useCallback(
    (subTeamId: string): TeamMember[] => {
      if (!subTeamId || subTeamId === "all") return data.members;
      return data.members.filter((m) => m.subTeamIds.includes(subTeamId));
    },
    [data.members]
  );

  const getMemberById = useCallback(
    (id: string): TeamMember | undefined => {
      return data.members.find((m) => m.id === id);
    },
    [data.members]
  );

  return (
    <PortfolioContext.Provider
      value={{
        data,
        members: data.members,
        subTeams: data.subTeams,
        isLive,
        source: "google-sheets",
        lastSync,
        isRefreshing,
        error,
        refresh: () => fetchLivePortfolio(true),
        getMembersBySubTeam,
        getMemberById,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
