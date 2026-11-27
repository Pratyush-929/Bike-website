"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BikeModel } from "@/data/bikes";
import SafeBikeImage from "./SafeBikeImage";
import { useCompare } from "@/context/CompareContext";
import {
  ArrowLeft,
  CheckCircle2,
  GitCompareArrows,
  Check,
} from "lucide-react";

interface BikeDetailsProps {
  bike: BikeModel;
}

export default function BikeDetails({ bike }: BikeDetailsProps) {
  const images =
    bike.images && bike.images.length > 0
      ? bike.images
      : bike.gallery && bike.gallery.length > 0
      ? bike.gallery
      : [bike.image];
  const [activeImage, setActiveImage] = useState(images[0]);
  const { toggleCompare, isSelected } = useCompare();
  const selected = isSelected(bike.slug);

  const specRows = [
    { label: "Manufacturer", value: bike.manufacturer || "Not specified" },
    { label: "Category", value: bike.categoryName || "Not specified" },
    { label: "Intended Riding Style", value: bike.intendedRidingStyle || "Not specified" },
    { label: "Frame Material", value: bike.frameMaterial || "Not specified" },
    { label: "Wheel Size", value: bike.wheelSize || "Not specified" },
    { label: "Suspension Travel", value: bike.suspensionTravel || "Not specified" },
    { label: "Suspension Type", value: bike.suspensionType || "Not specified" },
  ];

  return (
    <div className="space-y-14">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/bikes"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151917] hover:bg-white/10 text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#4CAF50]" />
          <span>BACK TO BIKES</span>
        </Link>

        <button
          type="button"
          onClick={() => toggleCompare(bike.slug)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-colors ${
            selected
              ? "bg-[#4CAF50] text-[#0B0D0C] border-[#4CAF50]"
              : "bg-[#151917] text-white border-white/15 hover:border-[#4CAF50]"
          }`}
        >
          {selected ? <Check className="w-4 h-4" /> : <GitCompareArrows className="w-4 h-4 text-[#4CAF50]" />}
          <span>{selected ? "Added to Compare" : "Compare This Bike"}</span>
        </button>
      </div>

      {/* Main Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Primary Bike Image & Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-[#0F1311] border border-white/10 shadow-2xl p-3">
            <SafeBikeImage
              src={activeImage}
              alt={`${bike.manufacturer} ${bike.name}`}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain object-center"
            />
          </div>

          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`relative w-28 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all bg-[#0F1311] p-1 ${
                    activeImage === img
                      ? "border-[#4CAF50]"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <SafeBikeImage
                    src={img}
                    alt={`${bike.name} view ${idx + 1}`}
                    sizes="120px"
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Bike Info */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <Link
              href={`/bikes?category=${bike.categorySlug}`}
              className="inline-block px-3 py-1 rounded-full bg-[#151917] border border-[#4CAF50]/40 text-[#A3E635] text-xs font-bold uppercase tracking-wider hover:border-[#A3E635] transition-colors"
            >
              {bike.categoryName}
            </Link>

            <div className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#4CAF50]">
              {bike.manufacturer}
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight mt-1">
              {bike.name}
            </h1>
          </div>

          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            {bike.description}
          </p>

          {/* Quick Highlights Box */}
          <div className="bg-[#151917] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
              <span className="text-[#A1A1AA]">Intended Riding Style</span>
              <span className="text-white font-semibold text-right">
                {bike.intendedRidingStyle || "Not specified"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
              <span className="text-[#A1A1AA]">Wheel Size</span>
              <span className="text-white font-semibold text-right">
                {bike.wheelSize || "Not specified"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A1A1AA]">Suspension Travel</span>
              <span className="text-[#A3E635] font-semibold text-right">
                {bike.suspensionTravel || "Not specified"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Key Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/10 pt-12">
        {/* Verified Technical Specs Table */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#4CAF50]">
            Verified Overview
          </span>
          <h2 className="text-2xl font-display font-extrabold text-white uppercase">
            Specifications
          </h2>

          <div className="bg-[#151917] border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs sm:text-sm">
              <tbody className="divide-y divide-white/10">
                {specRows.map((row, idx) => (
                  <tr key={row.label} className={idx % 2 === 0 ? "bg-[#151917]" : "bg-[#0B0D0C]/50"}>
                    <td className="py-3.5 px-5 font-semibold text-[#A1A1AA] w-2/5">
                      {row.label}
                    </td>
                    <td className="py-3.5 px-5 text-white font-medium">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Features */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A3E635]">
            Platform Highlights
          </span>
          <h2 className="text-2xl font-display font-extrabold text-white uppercase">
            Key Features
          </h2>

          <div className="bg-[#151917] border border-white/10 rounded-2xl p-6 space-y-3.5">
            {bike.keyFeatures && bike.keyFeatures.length > 0 ? (
              bike.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
                  <span className="text-[#A1A1AA] leading-relaxed">{feat}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#A1A1AA]">Not specified</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
