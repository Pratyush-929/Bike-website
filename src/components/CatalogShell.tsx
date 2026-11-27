"use client";

import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Search, SlidersHorizontal, X, Package } from "lucide-react";

interface CatalogCategory {
  id: string;
  slug: string;
  name: string;
}

interface CatalogProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brand: string;
  type: string;
  priceInCents: number;
  compareAtPriceInCents?: number | null;
  availabilityStatus: string;
  primaryImageUrl: string;
  shortDescription?: string | null;
  description?: string | null;
  category?: {
    id: string;
    slug: string;
    name: string;
  } | null;
}

interface CatalogShellProps {
  products: CatalogProduct[];
  categories: CatalogCategory[];
  currencySymbol: string;
  initialCategory?: string;
  allLabel: string;
  itemLabelPlural: string;
  searchPlaceholder: string;
  emptyTitle: string;
  emptySubtitle: string;
}

export default function CatalogShell({
  products,
  categories,
  currencySymbol,
  initialCategory = "ALL",
  allLabel,
  itemLabelPlural,
  searchPlaceholder,
  emptyTitle,
  emptySubtitle,
}: CatalogShellProps) {
  const maxCatalogPrice = useMemo(() => {
    const highest = products.reduce(
      (max, p) => Math.max(max, Math.ceil((p.priceInCents || 0) / 100)),
      0
    );
    return Math.max(highest, 100);
  }, [products]);

  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "ALL");
  const [selectedBrand, setSelectedBrand] = useState<string>("ALL");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("FEATURED");
  const [maxPrice, setMaxPrice] = useState<number>(maxCatalogPrice);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(initialCategory || "ALL");
  }, [initialCategory]);

  useEffect(() => {
    setMaxPrice(maxCatalogPrice);
  }, [maxCatalogPrice]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (
          selectedCategory !== "ALL" &&
          p.category?.slug !== selectedCategory &&
          p.category?.id !== selectedCategory
        ) {
          return false;
        }
        if (selectedBrand !== "ALL" && p.brand !== selectedBrand) {
          return false;
        }
        if (selectedAvailability !== "ALL" && p.availabilityStatus !== selectedAvailability) {
          return false;
        }
        if (p.priceInCents / 100 > maxPrice) {
          return false;
        }
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSku = p.sku.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchDesc = p.description?.toLowerCase().includes(q) || false;
          if (!matchName && !matchSku && !matchBrand && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "PRICE_ASC") return a.priceInCents - b.priceInCents;
        if (sortBy === "PRICE_DESC") return b.priceInCents - a.priceInCents;
        if (sortBy === "NAME_ASC") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [
    products,
    selectedCategory,
    selectedBrand,
    selectedAvailability,
    maxPrice,
    search,
    sortBy,
  ]);

  const hasActiveFilters =
    selectedCategory !== "ALL" ||
    selectedBrand !== "ALL" ||
    selectedAvailability !== "ALL" ||
    search.trim() !== "" ||
    maxPrice < maxCatalogPrice;

  const clearFilters = () => {
    setSelectedCategory("ALL");
    setSelectedBrand("ALL");
    setSelectedAvailability("ALL");
    setSearch("");
    setMaxPrice(maxCatalogPrice);
    setSortBy("FEATURED");
  };

  const sidebarContent = (
    <div className="space-y-6">
      {/* Search Filter */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
          Keyword Search
        </h3>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blaze-600 transition-colors"
          />
        </div>
      </div>

      {/* Categories Sidebar List */}
      <div className="border-t border-slate-200 pt-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
          Categories
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              selectedCategory === "ALL"
                ? "bg-blaze-600 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {allLabel}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat.slug
                  ? "bg-blaze-600 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      {brands.length > 1 && (
        <div className="border-t border-slate-200 pt-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
            Brand
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedBrand("ALL")}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedBrand === "ALL"
                  ? "bg-slate-900 text-white font-semibold"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              All Brands
            </button>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedBrand === brand
                    ? "bg-slate-900 text-white font-semibold"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="border-t border-slate-200 pt-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Max Price
          </h3>
          <span className="text-xs font-bold text-blaze-600">
            {currencySymbol}
            {maxPrice.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={10}
          max={maxCatalogPrice}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-blaze-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>{currencySymbol}0</span>
          <span>
            {currencySymbol}
            {maxCatalogPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Availability */}
      <div className="border-t border-slate-200 pt-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
          Availability
        </h3>
        <select
          value={selectedAvailability}
          onChange={(e) => setSelectedAvailability(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-blaze-600"
        >
          <option value="ALL">All Availabilities</option>
          <option value="IN_STOCK">In Stock</option>
          <option value="LOW_STOCK">Low Stock</option>
          <option value="COMING_SOON">Coming Soon</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          <span>Clear All Filters</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Left Sidebar (Desktop) */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white border border-slate-200 rounded-xl p-5 sticky top-36">
        {sidebarContent}
      </aside>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="lg:hidden w-full bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
            <span className="text-sm font-display font-bold text-slate-950 uppercase">
              Filters
            </span>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="p-1 text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {sidebarContent}
        </div>
      )}

      {/* Right Product Grid Column */}
      <div className="flex-1 w-full space-y-6">
        {/* Top Sort & Results Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs font-bold"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blaze-600" />
              <span>Filters</span>
            </button>
            <span className="text-xs text-slate-600">
              Showing <strong className="text-slate-950">{filteredProducts.length}</strong>{" "}
              {itemLabelPlural}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 font-medium hidden sm:inline">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blaze-600"
            >
              <option value="FEATURED">Featured</option>
              <option value="PRICE_ASC">Price: Low to High</option>
              <option value="PRICE_DESC">Price: High to Low</option>
              <option value="NAME_ASC">Name: A-Z</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-14 text-center space-y-3">
            <Package className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-display font-bold text-slate-950">{emptyTitle}</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">{emptySubtitle}</p>
            <button
              onClick={clearFilters}
              className="px-5 py-2 rounded-lg bg-blaze-600 hover:bg-blaze-700 text-white text-xs font-bold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                slug={item.slug}
                sku={item.sku}
                brand={item.brand}
                type={item.type}
                categoryName={item.category?.name}
                priceInCents={item.priceInCents}
                compareAtPriceInCents={item.compareAtPriceInCents}
                availabilityStatus={item.availabilityStatus}
                primaryImageUrl={item.primaryImageUrl}
                shortDescription={item.shortDescription}
                currencySymbol={currencySymbol}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
