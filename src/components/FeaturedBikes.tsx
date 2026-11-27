import React from "react";
import Link from "next/link";
import { getFeaturedBikes } from "@/data/bikes";
import BikeCard from "./BikeCard";
import { ArrowRight } from "lucide-react";

export default function FeaturedBikes() {
  const featured = getFeaturedBikes();

  return (
    <section className="py-20 bg-[#151917]/50 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#4CAF50]">
              Curated Highlights
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight mt-1">
              Featured Mountain Bikes
            </h2>
            <p className="text-sm text-[#A1A1AA] mt-2 max-w-2xl">
              Standout models selected across all six mountain biking disciplines—from World Cup downhill machines to featherweight XC racers.
            </p>
          </div>
          <Link
            href="/bikes"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A3E635] hover:text-white transition-colors shrink-0"
          >
            <span>Browse All 30 Bikes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((bike) => (
            <BikeCard key={bike.id} bike={bike} ctaLabel="Explore Bike" />
          ))}
        </div>
      </div>
    </section>
  );
}
