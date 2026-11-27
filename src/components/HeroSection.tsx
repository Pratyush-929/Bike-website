import React from "react";
import Link from "next/link";
import SafeBikeImage from "./SafeBikeImage";
import { ArrowRight, Compass } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[84vh] flex items-center overflow-hidden bg-[#0B0D0C] border-b border-white/10">
      {/* Full-width cinematic mountain biking background */}
      <div className="absolute inset-0 z-0">
        <SafeBikeImage
          src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80"
          alt="Mountain biker riding on a dramatic alpine mountain trail"
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.48]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0C] via-[#0B0D0C]/55 to-[#0B0D0C]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D0C]/90 via-[#0B0D0C]/45 to-transparent" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-3xl space-y-6 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151917]/90 border border-[#4CAF50]/40 text-[#A3E635] text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#4CAF50]" />
            <span>30 Leading Mountain Bikes • 6 Disciplines</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-white uppercase tracking-tight leading-[1.05]">
            EXPLORE THE WORLD OF{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] to-[#A3E635]">
              MOUNTAIN BIKES
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#A1A1AA] max-w-2xl leading-relaxed">
            Discover the perfect mountain bike for every trail, mountain, and adventure. Explore the world&apos;s leading mountain bike models with PRATYUSH WORLD.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/bikes"
              className="px-7 py-4 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-[#0B0D0C] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5 flex items-center gap-2 shadow-lg shadow-[#4CAF50]/20"
            >
              <span>EXPLORE BIKES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/#categories"
              className="px-7 py-4 rounded-xl bg-[#151917]/90 hover:bg-[#1e2421] text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/15 hover:border-[#A3E635]/60 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#A3E635]" />
              <span>DISCOVER CATEGORIES</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
