"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, Loader2, AlertCircle, ExternalLink } from "lucide-react";
import { parsePriceToCents } from "@/lib/formatters";

interface CategoryOption {
  id: string;
  name: string;
  type: string;
}

export default function AdminEditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form State
  const [slug, setSlug] = useState("");
  const [type, setType] = useState<"BIKE" | "SPARE_PART" | "ACCESSORY">("BIKE");
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState("Terra Cycles");
  const [categoryId, setCategoryId] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [comparePriceInput, setComparePriceInput] = useState("");
  const [stock, setStock] = useState("0");
  const [reorderThreshold, setReorderThreshold] = useState("3");
  const [supplier, setSupplier] = useState("");
  const [location, setLocation] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("IN_STOCK");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [primaryImageUrl, setPrimaryImageUrl] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [stockAdjustmentReason, setStockAdjustmentReason] = useState("Admin inventory update");

  // Specifications Map
  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>([]);

  useEffect(() => {
    // Load categories
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
      });

    // Load product
    fetch(`/api/admin/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.product) {
          const p = data.product;
          setSlug(p.slug);
          setName(p.name);
          setSku(p.sku);
          setBrand(p.brand);
          setType(p.type);
          setCategoryId(p.categoryId);
          setPriceInput((p.priceInCents / 100).toFixed(2));
          setComparePriceInput(
            p.compareAtPriceInCents ? (p.compareAtPriceInCents / 100).toFixed(2) : ""
          );
          setStock(String(p.inventory?.currentStock ?? 0));
          setReorderThreshold(String(p.inventory?.reorderThreshold ?? 3));
          setSupplier(p.inventory?.supplier || "");
          setLocation(p.inventory?.location || "");
          setAvailabilityStatus(p.availabilityStatus);
          setIsFeatured(p.isFeatured);
          setIsPublished(p.isPublished);
          setPrimaryImageUrl(p.primaryImageUrl);
          setShortDescription(p.shortDescription || "");
          setDescription(p.description || "");

          try {
            const parsedSpecs = JSON.parse(p.specifications || "{}");
            const arr = Object.entries(parsedSpecs).map(([key, value]) => ({
              key,
              value: String(value),
            }));
            setSpecs(arr);
          } catch {
            setSpecs([]);
          }
        } else {
          setError("Product not found");
        }
      })
      .catch((err) => setError("Failed to fetch product details"))
      .finally(() => setLoading(false));
  }, [params.id]);

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
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
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
        description,
        specifications: specMap,
        stockAdjustmentReason,
      };

      const res = await fetch(`/api/admin/products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update product");
      }

      setSuccess("Product updated successfully! Public website reflects these changes.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-charcoal-400 flex items-center justify-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-forest-400" />
        <span>Loading product details...</span>
      </div>
    );
  }

  const liveStoreUrl =
    type === "BIKE"
      ? `/bikes/${slug}`
      : type === "SPARE_PART"
      ? `/parts/${slug}`
      : `/accessories/${slug}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Back button & top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
        <Link
          href={liveStoreUrl}
          target="_blank"
          className="inline-flex items-center gap-1 text-xs text-blaze-400 hover:text-blaze-300 font-semibold"
        >
          <span>View on Live Store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div>
        <span className="text-xs font-mono text-blaze-500 font-bold uppercase tracking-wider">
          Edit Product • {sku}
        </span>
        <h1 className="text-2xl font-display font-bold text-white mt-1">
          {name}
        </h1>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-800/80 text-red-300 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3.5 rounded-xl bg-forest-950/70 border border-forest-600/80 text-forest-300 text-xs">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Details */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-display font-bold text-white border-b border-charcoal-800 pb-3">
            Core Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Product Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                SKU
              </label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs font-mono uppercase focus:outline-none focus:border-forest-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Brand
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
                Category
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
              Short Description
            </label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal-300 mb-1">
              Full Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500 resize-none"
            />
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-display font-bold text-white border-b border-charcoal-800 pb-3">
            Pricing, Stock & Availability
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Price (USD)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white font-mono text-sm focus:outline-none focus:border-forest-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Compare-At Sale Price (Optional)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={comparePriceInput}
                onChange={(e) => setComparePriceInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white font-mono text-sm focus:outline-none focus:border-forest-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Current Stock On Hand
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
                Low Stock Threshold
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

          <div>
            <label className="block text-xs font-medium text-charcoal-300 mb-1">
              Stock Adjustment Reason (If stock count modified)
            </label>
            <input
              type="text"
              value={stockAdjustmentReason}
              onChange={(e) => setStockAdjustmentReason(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
            />
          </div>
        </div>

        {/* Media */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-display font-bold text-white border-b border-charcoal-800 pb-3">
            Product Media
          </h3>
          <div>
            <label className="block text-xs font-medium text-charcoal-300 mb-1">
              Primary Image URL
            </label>
            <input
              type="url"
              required
              value={primaryImageUrl}
              onChange={(e) => setPrimaryImageUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
            />
          </div>
          {primaryImageUrl && (
            <div className="mt-2">
              <img
                src={primaryImageUrl}
                alt="Product"
                className="w-48 h-32 object-cover rounded-xl border border-charcoal-750 bg-charcoal-950"
              />
            </div>
          )}
        </div>

        {/* Specifications */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
            <div>
              <h3 className="text-sm font-display font-bold text-white">
                Specifications
              </h3>
              <p className="text-[11px] text-charcoal-400">
                Update technical specifications displayed on the product page.
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
                  value={s.key}
                  onChange={(e) => updateSpecRow(idx, "key", e.target.value)}
                  className="w-1/3 px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                />
                <input
                  type="text"
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

        {/* Visibility */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-charcoal-300">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="rounded bg-charcoal-800 border-charcoal-700 text-blaze-500 focus:ring-0"
              />
              <span className="font-semibold text-white">Published on Live Store</span>
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
              disabled={saving}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-forest-700 hover:bg-forest-600 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-glow-forest flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
