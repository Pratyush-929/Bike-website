"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CompareContextValue {
  selectedSlugs: string[];
  toggleCompare: (slug: string) => void;
  removeCompare: (slug: string) => void;
  clearCompare: () => void;
  isSelected: (slug: string) => boolean;
}

const CompareContext = createContext<CompareContextValue>({
  selectedSlugs: [],
  toggleCompare: () => {},
  removeCompare: () => {},
  clearCompare: () => {},
  isSelected: () => false,
});

const STORAGE_KEY = "pratyush_world_compare_slugs";

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSelectedSlugs(parsed.slice(0, 3));
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const persist = (next: string[]) => {
    setSelectedSlugs(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const toggleCompare = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      persist(selectedSlugs.filter((s) => s !== slug));
    } else if (selectedSlugs.length < 3) {
      persist([...selectedSlugs, slug]);
    } else {
      persist([...selectedSlugs.slice(1), slug]);
    }
  };

  const removeCompare = (slug: string) => {
    persist(selectedSlugs.filter((s) => s !== slug));
  };

  const clearCompare = () => {
    persist([]);
  };

  const isSelected = (slug: string) => selectedSlugs.includes(slug);

  return (
    <CompareContext.Provider
      value={{ selectedSlugs, toggleCompare, removeCompare, clearCompare, isSelected }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
