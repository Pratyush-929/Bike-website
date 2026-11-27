import React from "react";
import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";
import CategorySection from "@/components/CategorySection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about PRATYUSH WORLD — a mountain bike discovery platform celebrating innovation, performance, and exploration across six disciplines.",
};

export default function AboutUsPage() {
  return (
    <div className="bg-[#0B0D0C] text-white min-h-screen">
      <div className="border-b border-white/10 bg-[#151917]/60 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A3E635]">
            RIDE BEYOND LIMITS. EXPLORE WITHOUT BOUNDARIES.
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight mt-1">
            About PRATYUSH WORLD
          </h1>
        </div>
      </div>

      <AboutSection standalone />
      <CategorySection />
    </div>
  );
}
