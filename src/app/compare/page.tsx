"use client";

import React from "react";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { BIKES, getBikeBySlug, BikeModel } from "@/data/bikes";
import SafeBikeImage from "@/components/SafeBikeImage";
import { ArrowLeft, X, Plus, GitCompareArrows } from "lucide-react";

export default function ComparePage() {
  const { selectedSlugs, toggleCompare, removeCompare, clearCompare } = useCompare();

  const selectedBikes = selectedSlugs
    .map((slug) => getBikeBySlug(slug))
    .filter((b): b is BikeModel => Boolean(b));

  const specRows: Array<{ label: string; getValue: (b: BikeModel) => string }> = [
    { label: "Manufacturer", getValue: (b) => b.manufacturer || "Not specified" },
    { label: "Category", getValue: (b) => b.categoryName || "Not specified" },
    { label: "Riding Style", getValue: (b) => b.intendedRidingStyle || "Not specified" },
    { label: "Frame Material", getValue: (b) => b.frameMaterial || "Not specified" },
    { label: "Wheel Size", getValue: (b) => b.wheelSize || "Not specified" },
    { label: "Suspension Travel", getValue: (b) => b.suspensionTravel || "Not specified" },
    { label: "Suspension Type", getValue: (b) => b.suspensionType || "Not specified" },
  ];

  return (
    <div className="bg-[#0B0D0C] text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A3E635]">
              Side-by-Side Comparison
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight mt-1">
              Compare Mountain Bikes
            </h1>
            <p className="text-sm text-[#A1A1AA] mt-1">
              Select up to 3 bikes to compare verified specifications side by side.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {selectedBikes.length > 0 && (
              <button
                type="button"
                onClick={clearCompare}
                className="px-4 py-2.5 rounded-xl bg-[#151917] hover:bg-white/10 text-[#A1A1AA] hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Clear All
              </button>
            )}
            <Link
              href="/bikes"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-[#0B0D0C] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Browse All Bikes</span>
            </Link>
          </div>
        </div>

        {/* Add bike selector */}
        <div className="bg-[#151917] border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
            <Plus className="w-4 h-4 text-[#4CAF50]" />
            <span>Add a bike to compare ({selectedBikes.length}/3 selected):</span>
          </div>
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) toggleCompare(e.target.value);
            }}
            aria-label="Add a bike to compare"
            className="px-4 py-2.5 rounded-xl bg-[#0B0D0C] border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#4CAF50]"
          >
            <option value="">Choose a mountain bike model...</option>
            {BIKES.filter((b) => !selectedSlugs.includes(b.slug)).map((bike) => (
              <option key={bike.id} value={bike.slug}>
                {bike.name} ({bike.manufacturer} — {bike.categoryName})
              </option>
            ))}
          </select>
        </div>

        {selectedBikes.length === 0 ? (
          <div className="bg-[#151917] border border-white/10 rounded-2xl p-16 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0B0D0C] border border-white/10 flex items-center justify-center mx-auto text-[#4CAF50]">
              <GitCompareArrows className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-display font-bold text-white">
              No bikes selected for comparison yet
            </h2>
            <p className="text-sm text-[#A1A1AA] max-w-md mx-auto">
              Use the dropdown above or click &ldquo;Compare&rdquo; on any bike card in the catalog to compare up to 3 models side by side.
            </p>
            <Link
              href="/bikes"
              className="inline-block px-6 py-3 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-[#0B0D0C] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Explore 30 Bikes
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-[#151917] border border-white/10 rounded-2xl">
            <table className="w-full min-w-[680px] text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-5 w-48 text-xs font-bold uppercase tracking-wider text-[#A1A1AA] align-top">
                    Model
                  </th>
                  {selectedBikes.map((bike) => (
                    <th key={bike.slug} className="p-5 align-top border-l border-white/10">
                      <div className="space-y-3">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#0F1311] border border-white/10 p-1.5">
                          <SafeBikeImage
                            src={bike.image}
                            alt={bike.name}
                            sizes="300px"
                            className="object-contain"
                          />
                          <button
                            type="button"
                            onClick={() => removeCompare(bike.slug)}
                            aria-label={`Remove ${bike.name}`}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-[#0B0D0C]/85 text-white hover:text-[#A3E635] border border-white/15"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#4CAF50] block">
                            {bike.manufacturer}
                          </span>
                          <Link
                            href={`/bikes/${bike.slug}`}
                            className="text-lg font-display font-extrabold text-white hover:text-[#A3E635] transition-colors block mt-0.5"
                          >
                            {bike.name}
                          </Link>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
                {specRows.map((row) => (
                  <tr key={row.label}>
                    <td className="p-4 sm:p-5 font-semibold text-[#A1A1AA] bg-[#0B0D0C]/40">
                      {row.label}
                    </td>
                    {selectedBikes.map((bike) => (
                      <td
                        key={bike.slug}
                        className="p-4 sm:p-5 text-white border-l border-white/10"
                      >
                        {row.getValue(bike)}
                      </td>
                    ))}
                  </tr>
                ))}

                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#A1A1AA] bg-[#0B0D0C]/40 align-top">
                    Key Features
                  </td>
                  {selectedBikes.map((bike) => (
                    <td
                      key={bike.slug}
                      className="p-4 sm:p-5 text-[#A1A1AA] border-l border-white/10 align-top"
                    >
                      <ul className="list-disc pl-4 space-y-1.5 text-xs">
                        {bike.keyFeatures.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#A1A1AA] bg-[#0B0D0C]/40">
                    Links
                  </td>
                    {selectedBikes.map((bike) => (
                    <td key={bike.slug} className="p-4 sm:p-5 border-l border-white/10">
                      <Link
                        href={`/bikes/${bike.slug}`}
                        className="inline-block px-4 py-2 rounded-lg bg-[#4CAF50] hover:bg-[#43a047] text-[#0B0D0C] text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        View Details
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
