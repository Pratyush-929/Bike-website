import React from "react";
import type { Metadata } from "next";
import BikeGrid from "@/components/BikeGrid";

export const metadata: Metadata = {
  title: "Search Mountain Bikes",
  description: "Search all 30 mountain bikes by model, manufacturer, brand, or category.",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  return (
    <div className="bg-[#0B0D0C] text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A3E635]">
            PRATYUSH WORLD Search
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight mt-1">
            Search Mountain Bikes
          </h1>
        </div>

        <BikeGrid initialQuery={searchParams?.q || ""} />
      </div>
    </div>
  );
}
