import React from "react";
import Link from "next/link";
import { Compass, Mountain, ShieldCheck, ArrowRight } from "lucide-react";

export default function AboutSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className="py-20 bg-[#0B0D0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#151917] border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#A3E635]">
                RIDE BEYOND LIMITS. EXPLORE WITHOUT BOUNDARIES.
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
                ABOUT PRATYUSH WORLD
              </h2>
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                PRATYUSH WORLD is dedicated to exploring the world of mountain biking. Our platform brings together a collection of mountain bikes from leading manufacturers, helping cycling enthusiasts discover different bike categories, explore popular models, and learn about the machines designed for every type of terrain.
              </p>
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                From cross-country adventures to aggressive downhill riding, PRATYUSH WORLD celebrates mountain biking, innovation, performance, and exploration.
              </p>

              {!standalone && (
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-[#0B0D0C] font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>Learn More About Us</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/bikes"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B0D0C] hover:bg-white/5 text-white border border-white/15 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>Explore All Bikes</span>
                  </Link>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              <div className="p-5 rounded-2xl bg-[#0B0D0C] border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#151917] border border-[#4CAF50]/40 flex items-center justify-center text-[#4CAF50] shrink-0">
                  <Mountain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-white uppercase">
                    30 Curated Models
                  </h3>
                  <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                    Five iconic mountain bikes in each of six core riding disciplines, with verified specifications.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B0D0C] border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#151917] border border-[#4CAF50]/40 flex items-center justify-center text-[#A3E635] shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-white uppercase">
                    Compare &amp; Discover
                  </h3>
                  <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                    Filter by discipline, search across brands and models, and compare bikes side by side.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B0D0C] border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#151917] border border-[#4CAF50]/40 flex items-center justify-center text-[#4CAF50] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-white uppercase">
                    Accurate Specifications
                  </h3>
                  <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                    Verified travel, wheel size, frame material, and direct links to official manufacturers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
