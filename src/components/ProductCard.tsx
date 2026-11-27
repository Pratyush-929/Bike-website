"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice, getLightAvailabilityBadgeProps } from "@/lib/formatters";
import { ArrowUpRight, MessageSquare, Zap } from "lucide-react";
import InquiryModal from "./InquiryModal";

export interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  type: string;
  categoryName?: string;
  categorySlug?: string;
  priceInCents: number;
  compareAtPriceInCents?: number | null;
  availabilityStatus: string;
  primaryImageUrl: string;
  shortDescription?: string | null;
  currencySymbol?: string;
}

export default function ProductCard({
  name,
  slug,
  sku,
  brand,
  type,
  categoryName,
  priceInCents,
  compareAtPriceInCents,
  availabilityStatus,
  primaryImageUrl,
  shortDescription,
  currencySymbol = "$",
}: ProductCardProps) {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const badgeProps = getLightAvailabilityBadgeProps(availabilityStatus);

  const detailHref =
    type === "BIKE"
      ? `/bikes/${slug}`
      : type === "SPARE_PART"
      ? `/parts/${slug}`
      : `/accessories/${slug}`;

  const hasDiscount =
    compareAtPriceInCents !== null &&
    compareAtPriceInCents !== undefined &&
    compareAtPriceInCents > priceInCents;

  return (
    <>
      <div className="group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-300 hover:shadow-lg transition-all duration-300">
        {/* Top media container (clean light-neutral frame) */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
          <Link href={detailHref} className="block w-full h-full">
            <Image
              src={primaryImageUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </Link>

          {/* Status & Sale Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border shadow-sm ${badgeProps.badgeClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${badgeProps.dotClass}`}></span>
              {badgeProps.label}
            </span>
            {hasDiscount && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blaze-600 text-white shadow-sm">
                <Zap className="w-3 h-3" />
                Sale
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span className="font-bold text-blaze-600 uppercase tracking-wider">
                {brand}
              </span>
              {categoryName && (
                <span className="text-slate-500 font-medium truncate max-w-[140px]">
                  {categoryName}
                </span>
              )}
            </div>

            <Link href={detailHref} className="block group-hover:text-blaze-600 transition-colors">
              <h3 className="text-base font-display font-bold text-slate-950 line-clamp-2 leading-snug">
                {name}
              </h3>
            </Link>

            {shortDescription && (
              <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                {shortDescription}
              </p>
            )}
          </div>

          {/* Price and Action Buttons */}
          <div className="pt-4 mt-4 border-t border-slate-100">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-lg font-display font-black text-slate-950">
                {formatPrice(priceInCents, "USD", currencySymbol)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through font-medium">
                  {formatPrice(compareAtPriceInCents, "USD", currencySymbol)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href={detailHref}
                className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors"
              >
                <span>View</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
              <button
                onClick={() => setInquiryOpen(true)}
                className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-zinc-950 hover:bg-blaze-600 text-white text-xs font-bold transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Inquire</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        productName={name}
        productSku={sku}
        inquiryType="BIKE_PURCHASE"
      />
    </>
  );
}
