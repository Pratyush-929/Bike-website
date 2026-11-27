"use client";

import React from "react";
import Link from "next/link";
import { BikeModel } from "@/data/bikes";
import SafeBikeImage from "./SafeBikeImage";
import { ArrowRight, GitCompareArrows, Check } from "lucide-react";
import { useCompare } from "@/context/CompareContext";

interface BikeCardProps {
  bike: BikeModel;
  ctaLabel?: string;
}

export default function BikeCard({ bike, ctaLabel = "View Details" }: BikeCardProps) {
  const { toggleCompare, isSelected } = useCompare();
  const selected = isSelected(bike.slug);

  return (
    <div className="group bg-[#151917] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#4CAF50]/60 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/30">
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0F1311] p-2">
        <Link href={`/bikes/${bike.slug}`} className="relative block w-full h-full">
          <SafeBikeImage
            src={bike.image}
            alt={`${bike.manufacturer} ${bike.name}`}
            className="object-contain object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block px-2.5 py-1 rounded-full bg-[#0B0D0C]/85 border border-[#4CAF50]/40 text-[#A3E635] text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
            {bike.categoryName}
          </span>
        </div>

        {/* Compare Toggle */}
        <button
          type="button"
          onClick={() => toggleCompare(bike.slug)}
          aria-label={selected ? `Remove ${bike.name} from compare` : `Add ${bike.name} to compare`}
          className={`absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-sm transition-colors ${
            selected
              ? "bg-[#4CAF50] text-[#0B0D0C] border-[#4CAF50]"
              : "bg-[#0B0D0C]/80 text-[#A1A1AA] border-white/15 hover:text-white hover:border-[#4CAF50]/50"
          }`}
        >
          {selected ? <Check className="w-3 h-3" /> : <GitCompareArrows className="w-3 h-3" />}
          <span>{selected ? "Added" : "Compare"}</span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#4CAF50] block">
            {bike.manufacturer}
          </span>
          <Link href={`/bikes/${bike.slug}`} className="block mt-1">
            <h3 className="text-lg font-display font-extrabold text-white group-hover:text-[#A3E635] transition-colors leading-snug">
              {bike.name}
            </h3>
          </Link>
          <p className="text-xs text-[#A1A1AA] mt-2 line-clamp-2 leading-relaxed">
            {bike.shortDescription}
          </p>
        </div>

        <Link
          href={`/bikes/${bike.slug}`}
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#0B0D0C] hover:bg-[#4CAF50] text-white hover:text-[#0B0D0C] border border-white/10 hover:border-[#4CAF50] font-bold text-xs uppercase tracking-wider transition-all"
        >
          <span>{ctaLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
