"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatPrice, getLightAvailabilityBadgeProps } from "@/lib/formatters";
import { MessageSquare, ShieldCheck, Zap } from "lucide-react";
import InquiryModal from "@/components/InquiryModal";

interface BikeDetailClientProps {
  product: any;
  currencySymbol: string;
  whatsappNumber: string;
  brandName: string;
}

export default function BikeDetailClient({
  product,
  currencySymbol,
  whatsappNumber,
  brandName,
}: BikeDetailClientProps) {
  let allImages: string[] = [product.primaryImageUrl];
  try {
    const additional = JSON.parse(product.additionalImages || "[]");
    if (Array.isArray(additional) && additional.length > 0) {
      allImages = [product.primaryImageUrl, ...additional];
    }
  } catch {
    // fallback
  }

  const [activeImage, setActiveImage] = useState(allImages[0]);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  let specMap: Record<string, string> = {};
  try {
    specMap = JSON.parse(product.specifications || "{}");
  } catch {
    // fallback
  }

  const badge = getLightAvailabilityBadgeProps(product.availabilityStatus);
  const currentStock = product.inventory?.currentStock ?? 0;
  const cleanWhatsApp = whatsappNumber.replace(/[^0-9]/g, "");

  const whatsAppUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
    `Hello ${brandName}, I am inquiring about the ${product.name} (SKU: ${product.sku}). Is this currently available?`
  )}`;

  const hasDiscount =
    product.compareAtPriceInCents && product.compareAtPriceInCents > product.priceInCents;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Media Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-all duration-300"
            />
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm ${badge.badgeClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${badge.dotClass}`}></span>
                {badge.label}
              </span>
              {hasDiscount && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blaze-600 text-white shadow-sm">
                  <Zap className="w-3.5 h-3.5" />
                  Special Offer
                </span>
              )}
            </div>
          </div>

          {allImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    activeImage === img
                      ? "border-blaze-600 shadow-sm"
                      : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Pricing, Overview & Action Buttons */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-blaze-600 font-bold uppercase tracking-wider">
                {product.category?.name || "Mountain Bike"}
              </span>
              <span className="text-slate-500">SKU: {product.sku}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-950 uppercase tracking-tight">
              {product.name}
            </h1>
            <div className="text-xs text-slate-600 mt-1.5">
              Brand: <strong className="text-slate-900">{product.brand}</strong> • Authorized Dealer Stock
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-display font-black text-slate-950">
                {formatPrice(product.priceInCents, "USD", currencySymbol)}
              </span>
              {hasDiscount && (
                <span className="text-base text-slate-400 line-through font-display font-semibold">
                  {formatPrice(product.compareAtPriceInCents, "USD", currencySymbol)}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600 border-t border-slate-200 pt-3">
              <span>Warehouse Availability:</span>
              <span className="font-mono font-bold text-slate-900">
                {currentStock > 0
                  ? `${currentStock} units in stock`
                  : "Out of stock (Backorder inquiry)"}
              </span>
            </div>
          </div>

          {product.shortDescription && (
            <p className="text-sm text-slate-700 leading-relaxed">{product.shortDescription}</p>
          )}

          {/* Direct CTA Buttons */}
          <div className="space-y-3 pt-1">
            <button
              onClick={() => setInquiryModalOpen(true)}
              className="w-full py-3.5 px-6 rounded-lg bg-blaze-600 hover:bg-blaze-700 text-white font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire / Request Quote</span>
            </button>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat with Trail Tech on WhatsApp</span>
            </a>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-950 font-bold">
              <ShieldCheck className="w-4 h-4 text-blaze-600" />
              <span>Official Warranty &amp; Pre-Delivery Setup</span>
            </div>
            <p className="leading-relaxed">
              Includes pre-ride inspection and suspension psi calibration tailored to your weight and trail terrain.
            </p>
          </div>
        </div>
      </div>

      {/* Description & Technical Specifications Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-slate-200 pt-12">
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-bold text-blaze-600 uppercase tracking-wider">
            Overview
          </span>
          <h2 className="text-2xl font-display font-black text-slate-950 uppercase">
            Product Details &amp; Engineering
          </h2>
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {product.description}
          </div>
        </div>

        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-bold text-blaze-600 uppercase tracking-wider">
            Build Sheet
          </span>
          <h2 className="text-2xl font-display font-black text-slate-950 uppercase">
            Technical Specifications
          </h2>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <tbody className="divide-y divide-slate-200">
                {Object.entries(specMap).map(([key, value], idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="py-3 px-4 font-semibold text-slate-600 w-2/5">{key}</td>
                    <td className="py-3 px-4 text-slate-950 font-semibold">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        productName={product.name}
        productSku={product.sku}
        inquiryType="BIKE_PURCHASE"
        whatsappNumber={whatsappNumber}
      />
    </>
  );
}
