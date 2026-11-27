"use client";

import React from "react";
import { CATEGORIES } from "@/data/bikes";
import { RotateCcw, ArrowUpDown } from "lucide-react";

export type SortOption = "AZ" | "ZA" | "MANUFACTURER";

interface FilterPanelProps {
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export default function FilterPanel({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onResetFilters,
  hasActiveFilters,
}: FilterPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onCategoryChange("ALL")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              selectedCategory === "ALL"
                ? "bg-[#4CAF50] text-[#0B0D0C] border-[#4CAF50]"
                : "bg-[#0B0D0C] text-[#A1A1AA] border-white/10 hover:text-white hover:border-white/25"
            }`}
          >
            All Categories (30)
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.slug)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                selectedCategory === cat.slug
                  ? "bg-[#4CAF50] text-[#0B0D0C] border-[#4CAF50]"
                  : "bg-[#0B0D0C] text-[#A1A1AA] border-white/10 hover:text-white hover:border-white/25"
              }`}
            >
              {cat.shortName}
            </button>
          ))}
        </div>

        {/* Sort & Reset */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-[#0B0D0C] border border-white/15 rounded-xl px-3 py-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#4CAF50]" />
            <label htmlFor="bike-sort" className="text-xs text-[#A1A1AA] font-medium">
              Sort:
            </label>
            <select
              id="bike-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
            >
              <option value="AZ" className="bg-[#151917] text-white">
                Alphabetical A–Z
              </option>
              <option value="ZA" className="bg-[#151917] text-white">
                Alphabetical Z–A
              </option>
              <option value="MANUFACTURER" className="bg-[#151917] text-white">
                Manufacturer Name
              </option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B0D0C] hover:bg-white/5 text-[#A3E635] border border-[#4CAF50]/40 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET FILTERS</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
