"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, Loader2, AlertCircle } from "lucide-react";
import { parsePriceToCents } from "@/lib/formatters";

interface CategoryOption {
  id: string;
  name: string;
  type: string;
}

export default function AdminNewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [type, setType] = useState<"BIKE" | "SPARE_PART" | "ACCESSORY">("BIKE");
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState("Terra Cycles");
  const [categoryId, setCategoryId] = useState("");
  const [priceInput, setPriceInput] = useState("4500.00");
  const [comparePriceInput, setComparePriceInput] = useState("");
  const [stock, setStock] = useState("10");
  const [reorderThreshold, setReorderThreshold] = useState("3");
  const [supplier, setSupplier] = useState("Terra Assembly Hood River");
  const [location, setLocation] = useState("Warehouse A-1");
  const [availabilityStatus, setAvailabilityStatus] = useState("IN_STOCK");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [primaryImageUrl, setPrimaryImageUrl] = useState(
    "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80"
  );
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  // Specification Key-Values
  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>([
    { key: "Frame Material", value: "Carbon Fiber" },
    { key: "Suspension Type", value: "Full Suspension" },
    { key: "Front Travel", value: "160mm" },
    { key: "Rear Travel", value: "150mm" },
    { key: "Wheel Size", value: "29-inch" },
    { key: "Drivetrain", value: "SRAM GX Eagle 12-Speed" },
    { key: "Brakes", value: "4-Piston Hydraulic Disc" },
  ]);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) {
          setCategories(data.categories);
          if (data.categories.length > 0) {
            // Find category matching current type
            const match = data.categories.find((c: CategoryOption) => c.type === type);
            setCategoryId(match ? match.id : data.categories[0].id);
          }
        }
      })
      .catch((err) => console.error("Error loading categories:", err));
  }, [type]);

  const addSpecRow = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const removeSpecRow = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const updateSpecRow = (index: number, field: "key" | "value", val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Build specifications JSON map
      const specMap: Record<string, string> = {};
      specs.forEach((s) => {
        if (s.key.trim() && s.value.trim()) {
          specMap[s.key.trim()] = s.value.trim();
        }
      });

      const priceInCents = parsePriceToCents(priceInput);
      const compareAtPriceInCents = comparePriceInput ? parsePriceToCents(comparePriceInput) : null;

      const payload = {
        name,
        sku,
        brand,
        type,
        categoryId,
        priceInCents,
        compareAtPriceInCents,
        stock: parseInt(stock) || 0,
        reorderThreshold: parseInt(reorderThreshold) || 3,
        supplier,
        location,
        availabilityStatus,
        isFeatured,
        isPublished,
        primaryImageUrl,
        shortDescription,
        description: description || shortDescription,
        specifications: specMap,
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Back button & title */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      <div>
        <span className="text-xs font-mono text-blaze-500 font-bold uppercase tracking-wider">
          New Catalog Record
        </span>
        <h1 className="text-2xl font-display font-bold text-white mt-1">
          Add New Mountain Bike or Component
        </h1>
        <p className="text-xs text-charcoal-400 mt-0.5">
          Fill in the specifications, inventory settings, and pricing details.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-800/80 text-red-300 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Type Selector */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5">
          <label className="block text-xs font-medium text-charcoal-300 mb-2">
            Product Classification
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "BIKE", label: "Complete Mountain Bike" },
              { id: "SPARE_PART", label: "Spare Part / Component" },
              { id: "ACCESSORY", label: "Riding Accessory / Gear" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t.id as any)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                  type === t.id
                    ? "bg-forest-800 border-forest-600 text-white shadow-glow-forest"
                    : "bg-charcoal-800 border-charcoal-700 text-charcoal-400 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-display font-bold text-white border-b border-charcoal-800 pb-3">
            Core Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Product Name <span className="text-blaze-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Terra Ridgeback Carbon 29"
                className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Unique SKU Code <span className="text-blaze-500">*</span>
              </label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g. TERRA-RDG-CF29"
                className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs font-mono uppercase focus:outline-none focus:border-forest-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Brand Name <span className="text-blaze-500">*</span>
              </label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Category <span className="text-blaze-500">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.type})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal-300 mb-1">
              Short Summary Description
            </label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="e.g. Flagship 170mm enduro carbon race bike dialed for steep, technical descents."
              className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal-300 mb-1">
              Full Description & Trail Engineering Overview
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed engineering breakdown, kinematics, ride feel, geometry highlights..."
              className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500 resize-none"
            />
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-display font-bold text-white border-b border-charcoal-800 pb-3">
            Pricing & Inventory Controls
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Retail Price (USD) <span className="text-blaze-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                placeholder="4500.00"
                className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white font-mono text-sm focus:outline-none focus:border-forest-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Compare-At / Regular Price (Optional for Sale)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={comparePriceInput}
                onChange={(e) => setComparePriceInput(e.target.value)}
                placeholder="4999.00"
                className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white font-mono text-sm focus:outline-none focus:border-forest-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Initial Stock Units <span className="text-blaze-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white font-mono text-xs focus:outline-none focus:border-forest-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Low-Stock Threshold
              </label>
              <input
                type="number"
                min="1"
                value={reorderThreshold}
                onChange={(e) => setReorderThreshold(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white font-mono text-xs focus:outline-none focus:border-forest-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Availability Status
              </label>
              <select
                value={availabilityStatus}
                onChange={(e) => setAvailabilityStatus(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
              >
                <option value="IN_STOCK">In Stock</option>
                <option value="LOW_STOCK">Low Stock</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
                <option value="COMING_SOON">Coming Soon</option>
                <option value="DISCONTINUED">Discontinued</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Supplier / Assembly Facility
              </label>
              <input
                type="text"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Warehouse Storage Bin / Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-display font-bold text-white border-b border-charcoal-800 pb-3">
            Primary Imagery
          </h3>
          <div>
            <label className="block text-xs font-medium text-charcoal-300 mb-1">
              Primary Image URL (High Resolution Mountain Biking Photo) <span className="text-blaze-500">*</span>
            </label>
            <input
              type="url"
              required
              value={primaryImageUrl}
              onChange={(e) => setPrimaryImageUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
            />
          </div>
          {primaryImageUrl && (
            <div className="mt-3">
              <span className="text-[11px] text-charcoal-400 block mb-1">Image Preview:</span>
              <img
                src={primaryImageUrl}
                alt="Preview"
                className="w-48 h-32 object-cover rounded-xl border border-charcoal-750 bg-charcoal-950"
              />
            </div>
          )}
        </div>

        {/* Specifications Builder */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
            <div>
              <h3 className="text-sm font-display font-bold text-white">
                Technical Specifications Table
              </h3>
              <p className="text-[11px] text-charcoal-400">
                Frame material, travel, wheel size, drivetrain, etc.
              </p>
            </div>
            <button
              type="button"
              onClick={addSpecRow}
              className="px-3 py-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-200 text-xs font-semibold flex items-center gap-1 border border-charcoal-700"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Spec Row</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {specs.map((s, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Specification (e.g. Frame Material)"
                  value={s.key}
                  onChange={(e) => updateSpecRow(idx, "key", e.target.value)}
                  className="w-1/3 px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. Toray Carbon Fiber)"
                  value={s.value}
                  onChange={(e) => updateSpecRow(idx, "value", e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                />
                <button
                  type="button"
                  onClick={() => removeSpecRow(idx)}
                  className="p-2 rounded-lg bg-charcoal-800 hover:bg-red-950 text-charcoal-400 hover:text-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Visibility Toggles */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-charcoal-300">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="rounded bg-charcoal-800 border-charcoal-700 text-blaze-500 focus:ring-0"
              />
              <span className="font-semibold text-white">Publish Immediately to Live Store</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-charcoal-300">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded bg-charcoal-800 border-charcoal-700 text-blaze-500 focus:ring-0"
              />
              <span className="font-semibold text-white">Feature on Homepage</span>
            </label>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/admin/products"
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-300 text-xs font-semibold text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-blaze-600 hover:bg-blaze-500 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-glow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Create Product Record</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
