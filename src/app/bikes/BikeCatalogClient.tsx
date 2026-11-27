"use client";

import React from "react";
import CatalogShell from "@/components/CatalogShell";

interface CategoryOption {
  id: string;
  slug: string;
  name: string;
}

interface BikeCatalogClientProps {
  initialBikes: any[];
  categories: CategoryOption[];
  currencySymbol: string;
  initialCategory?: string;
}

export default function BikeCatalogClient({
  initialBikes,
  categories,
  currencySymbol,
  initialCategory = "ALL",
}: BikeCatalogClientProps) {
  return (
    <CatalogShell
      products={initialBikes}
      categories={categories}
      currencySymbol={currencySymbol}
      initialCategory={initialCategory}
      allLabel="All Mountain Bikes"
      itemLabelPlural="mountain bikes"
      searchPlaceholder="Search model, frame, or SKU..."
      emptyTitle="No mountain bikes matched your filters"
      emptySubtitle="Try adjusting your search terms, price ceiling, or resetting the category filter."
    />
  );
}
