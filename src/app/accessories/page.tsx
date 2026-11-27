import React from "react";
import prisma from "@/lib/prisma";
import { getCompanySettings } from "@/lib/settings";
import AccessoriesCatalogClient from "./AccessoriesCatalogClient";

export const dynamic = "force-dynamic";

export default async function AccessoriesPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const [accessories, categories, settings] = await Promise.all([
    prisma.product.findMany({
      where: {
        type: "ACCESSORY",
        isPublished: true,
      },
      include: {
        category: true,
        inventory: true,
      },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    }),
    prisma.category.findMany({
      where: {
        type: "ACCESSORY",
        isActive: true,
      },
      orderBy: { displayOrder: "asc" },
    }),
    getCompanySettings(),
  ]);

  return (
    <div className="bg-white">
      <div className="bg-slate-50 border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-blaze-600 uppercase tracking-wider">
            Protection &amp; Rider Gear
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-950 mt-1 uppercase tracking-tight">
            Helmets, Apparel &amp; Trail Gear
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            MIPS certified helmets, D3O impact gloves, hydration packs, and precision trailside maintenance tools.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AccessoriesCatalogClient
          initialAccessories={accessories}
          categories={categories}
          currencySymbol={settings.currencySymbol || "$"}
          initialCategory={searchParams?.category || "ALL"}
        />
      </div>
    </div>
  );
}
