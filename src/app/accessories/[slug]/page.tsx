import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getCompanySettings } from "@/lib/settings";
import Link from "next/link";
import BikeDetailClient from "@/app/bikes/[slug]/BikeDetailClient";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function AccessoryDetailPage({ params }: { params: { slug: string } }) {
  const [product, settings] = await Promise.all([
    prisma.product.findUnique({
      where: { slug: params.slug },
      include: {
        category: true,
        inventory: true,
      },
    }),
    getCompanySettings(),
  ]);

  if (!product || !product.isPublished) {
    notFound();
  }

  const related = await prisma.product.findMany({
    where: {
      type: "ACCESSORY",
      isPublished: true,
      id: { not: product.id },
    },
    include: { category: true, inventory: true },
    take: 3,
  });

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-blaze-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/accessories" className="hover:text-blaze-600 transition-colors">
            Accessories
          </Link>
          <span>/</span>
          <span className="text-slate-950 font-semibold truncate">{product.name}</span>
        </nav>

        <BikeDetailClient
          product={product}
          currencySymbol={settings.currencySymbol || "$"}
          whatsappNumber={settings.whatsappNumber || "+15415558724"}
          brandName={settings.brandName || "TERRA CYCLES"}
        />

        {related.length > 0 && (
          <div className="border-t border-slate-200 pt-12 space-y-6">
            <div>
              <span className="text-xs font-bold text-blaze-600 uppercase tracking-wider">
                More Riding Gear
              </span>
              <h3 className="text-2xl font-display font-black text-slate-950 mt-0.5 uppercase">
                Related Accessories
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  slug={p.slug}
                  sku={p.sku}
                  brand={p.brand}
                  type={p.type}
                  categoryName={p.category?.name}
                  priceInCents={p.priceInCents}
                  compareAtPriceInCents={p.compareAtPriceInCents}
                  availabilityStatus={p.availabilityStatus}
                  primaryImageUrl={p.primaryImageUrl}
                  shortDescription={p.shortDescription}
                  currencySymbol={settings.currencySymbol || "$"}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
