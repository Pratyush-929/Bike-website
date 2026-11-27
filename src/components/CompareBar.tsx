"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCompare } from "@/context/CompareContext";
import { getBikeBySlug } from "@/data/bikes";
import { GitCompareArrows, X, ArrowRight } from "lucide-react";

export default function CompareBar() {
  const { selectedSlugs, removeCompare, clearCompare } = useCompare();
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname === "/compare" || selectedSlugs.length === 0) {
    return null;
  }

  const bikes = selectedSlugs
    .map((slug) => getBikeBySlug(slug))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  if (bikes.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 max-w-4xl mx-auto">
      <div className="bg-[#151917]/95 backdrop-blur-md border border-[#4CAF50]/50 rounded-2xl p-3.5 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A3E635] mr-1">
            <GitCompareArrows className="w-4 h-4 text-[#4CAF50]" />
            Compare ({bikes.length}/3):
          </span>
          {bikes.map((bike) => (
            <span
              key={bike.slug}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0D0C] border border-white/15 text-xs text-white"
            >
              <span className="truncate max-w-[140px]">{bike.name}</span>
              <button
                type="button"
                onClick={() => removeCompare(bike.slug)}
                aria-label={`Remove ${bike.name}`}
                className="text-[#A1A1AA] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={clearCompare}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-[#A1A1AA] hover:text-white transition-colors"
          >
            Clear
          </button>
          <Link
            href="/compare"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-[#0B0D0C] font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
