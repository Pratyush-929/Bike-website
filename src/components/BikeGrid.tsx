"use client";

import React, { useState, useMemo, useEffect } from "react";
import { BIKES, CATEGORIES } from "@/data/bikes";
import BikeCard from "./BikeCard";
import SearchBar from "./SearchBar";
import FilterPanel, { SortOption } from "./FilterPanel";
import { Bike, RotateCcw } from "lucide-react";

interface BikeGridProps {
  initialCategory?: string;
  initialQuery?: string;
}

export default function BikeGrid({
  initialCategory = "ALL",
  initialQuery = "",
}: BikeGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "ALL");
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery || "");
  const [sortBy, setSortBy] = useState<SortOption>("AZ");

  useEffect(() => {
    setSelectedCategory(initialCategory || "ALL");
  }, [initialCategory]);

  useEffect(() => {
    setSearchQuery(initialQuery || "");
  }, [initialQuery]);

  const filteredBikes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return BIKES.filter((bike) => {
      if (selectedCategory !== "ALL" && bike.categorySlug !== selectedCategory) {
        return false;
      }
      if (q) {
        const matchName = bike.name.toLowerCase().includes(q);
        const matchMaker = bike.manufacturer.toLowerCase().includes(q);
        const matchCategory = bike.categoryName.toLowerCase().includes(q);
        const matchStyle = bike.intendedRidingStyle.toLowerCase().includes(q);
        if (!matchName && !matchMaker && !matchCategory && !matchStyle) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "AZ") return a.name.localeCompare(b.name);
      if (sortBy === "ZA") return b.name.localeCompare(a.name);
      if (sortBy === "MANUFACTURER") {
        const m = a.manufacturer.localeCompare(b.manufacturer);
        return m !== 0 ? m : a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategory);
  const hasActiveFilters =
    selectedCategory !== "ALL" || searchQuery.trim() !== "" || sortBy !== "AZ";

  const handleResetFilters = () => {
    setSelectedCategory("ALL");
    setSearchQuery("");
    setSortBy("AZ");
  };

  return (
    <div className="space-y-8">
      {/* Search + Filters Container */}
      <div className="bg-[#151917] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />

        <div className="border-t border-white/10 pt-4">
          <FilterPanel
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#A1A1AA] px-1">
        <span>
          Showing <strong className="text-white">{filteredBikes.length}</strong> of{" "}
          <strong className="text-white">{BIKES.length}</strong> mountain bikes
          {activeCategoryObj ? ` in ${activeCategoryObj.name}` : ""}
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 text-[#A3E635] hover:text-white font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Grid: Desktop 4 columns, Tablet 2 columns, Mobile 1 column */}
      {filteredBikes.length === 0 ? (
        <div className="bg-[#151917] border border-white/10 rounded-2xl p-16 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0B0D0C] border border-white/10 flex items-center justify-center mx-auto text-[#4CAF50]">
            <Bike className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-display font-bold text-white">
            No mountain bikes match your search
          </h3>
          <p className="text-sm text-[#A1A1AA] max-w-md mx-auto">
            Try searching another bike model, manufacturer (e.g. Trek, Canyon, Yeti), or reset your category filters.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-6 py-3 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-[#0B0D0C] font-bold text-xs uppercase tracking-wider transition-colors"
          >
            RESET FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      )}
    </div>
  );
}
