import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/bikes";
import SafeBikeImage from "./SafeBikeImage";
import { ArrowRight } from "lucide-react";

export default function CategorySection() {
  return (
    <section id="categories" className="py-20 bg-[#0B0D0C] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A3E635]">
              Six Disciplines
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight mt-1">
              Mountain Bike Categories
            </h2>
            <p className="text-sm text-[#A1A1AA] mt-2 max-w-2xl">
              Explore six dedicated mountain biking categories, each featuring five iconic bikes engineered for its terrain.
            </p>
          </div>
          <Link
            href="/bikes"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4CAF50] hover:text-[#A3E635] transition-colors shrink-0"
          >
            <span>View All 30 Bikes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="group bg-[#151917] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#4CAF50]/60 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0D0C]">
                <SafeBikeImage
                  src={category.image}
                  alt={category.name}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151917] via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0B0D0C]/85 border border-[#4CAF50]/40 text-[#A3E635] text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                  {category.bikeCount} Bikes
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="text-xl font-display font-extrabold text-white group-hover:text-[#A3E635] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <Link
                  href={`/bikes?category=${category.slug}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#0B0D0C] hover:bg-[#4CAF50] text-white hover:text-[#0B0D0C] border border-white/10 hover:border-[#4CAF50] font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Explore Category</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
