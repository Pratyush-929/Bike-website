"use client";

import React from "react";
import CatalogShell from "@/components/CatalogShell";

interface PartsCatalogClientProps {
  initialParts: any[];
  categories: Array<{ id: string; slug: string; name: string }>;
  currencySymbol: string;
  initialCategory?: string;
}

export default function PartsCatalogClient({
  initialParts,
  categories,
  currencySymbol,
  initialCategory = "ALL",
}: PartsCatalogClientProps) {
  return (
    <CatalogShell
      products={initialParts}
      categories={categories}
      currencySymbol={currencySymbol}
      initialCategory={initialCategory}
      allLabel="All Components"
      itemLabelPlural="components"
      searchPlaceholder="Search part name, SKU, or brand..."
      emptyTitle="No components found"
      emptySubtitle="Try resetting your search query or choosing another component category."
    />
  );
}
