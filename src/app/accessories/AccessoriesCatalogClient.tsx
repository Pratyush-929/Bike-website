"use client";

import React from "react";
import CatalogShell from "@/components/CatalogShell";

interface AccessoriesCatalogClientProps {
  initialAccessories: any[];
  categories: Array<{ id: string; slug: string; name: string }>;
  currencySymbol: string;
  initialCategory?: string;
}

export default function AccessoriesCatalogClient({
  initialAccessories,
  categories,
  currencySymbol,
  initialCategory = "ALL",
}: AccessoriesCatalogClientProps) {
  return (
    <CatalogShell
      products={initialAccessories}
      categories={categories}
      currencySymbol={currencySymbol}
      initialCategory={initialCategory}
      allLabel="All Accessories"
      itemLabelPlural="accessories"
      searchPlaceholder="Search helmets, gloves, packs..."
      emptyTitle="No accessories found"
      emptySubtitle="Try adjusting your search keywords or resetting your filter."
    />
  );
}
