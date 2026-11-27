import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BIKES, getBikeBySlug, getBikesByCategory } from "@/data/bikes";
import BikeDetails from "@/components/BikeDetails";
import BikeCard from "@/components/BikeCard";

export function generateStaticParams() {
  return BIKES.map((bike) => ({ slug: bike.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const bike = getBikeBySlug(params.slug);
  if (!bike) {
    return { title: "Bike Not Found" };
  }
  return {
    title: `${bike.name} (${bike.manufacturer})`,
    description: bike.shortDescription,
  };
}

export default function BikeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const bike = getBikeBySlug(params.slug);

  if (!bike) {
    notFound();
  }

  const related = getBikesByCategory(bike.categorySlug)
    .filter((b) => b.slug !== bike.slug)
    .slice(0, 4);

  return (
    <div className="bg-[#0B0D0C] text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <BikeDetails bike={bike} />

        {related.length > 0 && (
          <div className="border-t border-white/10 pt-14 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#4CAF50]">
                More in {bike.categoryName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase mt-1">
                Explore Similar Bikes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <BikeCard key={item.id} bike={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
