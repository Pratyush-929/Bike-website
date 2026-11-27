import React from "react";
import Link from "next/link";
import { Mountain, ArrowRight, Bike } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#0B0D0C] text-white flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="w-16 h-16 rounded-2xl bg-[#151917] border border-[#4CAF50]/40 flex items-center justify-center text-[#4CAF50] mb-6">
        <Mountain className="w-8 h-8" />
      </div>
      <span className="text-xs font-bold text-[#A3E635] uppercase tracking-[0.2em]">
        404 • Off Trail
      </span>
      <h1 className="text-3xl sm:text-5xl font-display font-black text-white mt-2 uppercase tracking-tight">
        Trail Not Found
      </h1>
      <p className="mt-3 text-sm text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
        The mountain bike or page you requested could not be found in the PRATYUSH WORLD catalog.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-[#0B0D0C] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
        >
          <span>Return Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/bikes"
          className="px-6 py-3 rounded-xl bg-[#151917] hover:bg-white/10 text-white border border-white/15 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
        >
          <Bike className="w-4 h-4 text-[#A3E635]" />
          <span>Explore All 30 Bikes</span>
        </Link>
      </div>
    </div>
  );
}
