import React from "react";
import type { Metadata } from "next";
import BikeGrid from "@/components/BikeGrid";

export const metadata: Metadata = {
  title: "All Mountain Bikes (30 Models)",
  description:
    "Browse all 30 mountain bikes across six categories at PRATYUSH WORLD: All-Mountain, Enduro, Trail, Downhill & Freeride, Hardtail, and Cross-Country (XC).",
};

export default function BikesPage({
  searchParams,
}: {
  searchParams?: { category?: string; q?: string };
}) {
  return (
    <div className="bg-[#0B0D0C] text-white min-h-screen">
      <div className="border-b border-white/10 bg-[#151917]/60 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A3E635]">
            PRATYUSH WORLD Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight mt-1">
            All Mountain Bikes
          </h1>
          <p className="text-sm sm:text-base text-[#A1A1AA] mt-2 max-w-2xl">
            Explore all 30 mountain bike models across six riding disciplines. Search by model or manufacturer, filter by category, and compare specifications side by side.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BikeGrid
          initialCategory={searchParams?.category || "ALL"}
          initialQuery={searchParams?.q || ""}
        />
      </div>
    </div>
  );
}
