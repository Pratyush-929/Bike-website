"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bike,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Package,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  ExternalLink,
} from "lucide-react";
import { formatPrice, getAvailabilityBadgeProps } from "@/lib/formatters";

interface ProductItem {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brand: string;
  type: string;
  priceInCents: number;
  compareAtPriceInCents?: number | null;
  isPublished: boolean;
  isFeatured: boolean;
  availabilityStatus: string;
  primaryImageUrl: string;
  category: {
    id: string;
    name: string;
  };
  inventory?: {
    currentStock: number;
    reorderThreshold: number;
  } | null;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedProductForStock, setSelectedProductForStock] = useState<ProductItem | null>(null);
  const [stockDelta, setStockDelta] = useState<number>(0);
  const [stockReason, setStockReason] = useState("Restock delivery received");
  const [adjusting, setAdjusting] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (typeFilter !== "ALL") params.append("type", typeFilter);
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (search.trim()) params.append("search", search.trim());

      const res = await fetch(`/api/admin/products?${params.toString()}`);
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [typeFilter, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleStockAdjustment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductForStock) return;
    setAdjusting(true);

    try {
      const res = await fetch("/api/admin/inventory/adjust", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProductForStock.id,
          quantityChange: stockDelta,
          changeType: stockDelta > 0 ? "RESTOCK" : "MANUAL_ADJUSTMENT",
          reason: stockReason,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to adjust stock");
      }

      setActionMessage(`Stock updated for ${selectedProductForStock.name}`);
      setSelectedProductForStock(null);
      setStockDelta(0);
      fetchProducts();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error adjusting stock");
    } finally {
      setAdjusting(false);
    }
  };

  const handleArchive = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to archive "${name}"? It will be unpublished from the store.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to archive product");
      }
      setActionMessage(`Archived "${name}" successfully.`);
      fetchProducts();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to archive");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-blaze-500 font-bold uppercase tracking-wider">
            Catalog Management
          </span>
          <h1 className="text-2xl font-display font-bold text-white mt-0.5">
            Mountain Bikes, Spare Parts & Accessories
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Manage live pricing, inventory levels, specifications, and visibility on the public store.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-4 py-2.5 rounded-xl bg-blaze-600 hover:bg-blaze-500 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-glow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {actionMessage && (
        <div className="p-3 rounded-xl bg-forest-950/80 border border-forest-600/50 text-forest-300 text-xs flex items-center justify-between">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="text-xs underline ml-4">
            Dismiss
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Type tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {[
            { id: "ALL", label: "All Items" },
            { id: "BIKE", label: "Bikes" },
            { id: "SPARE_PART", label: "Spare Parts" },
            { id: "ACCESSORY", label: "Accessories" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTypeFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                typeFilter === tab.id
                  ? "bg-forest-800 text-white"
                  : "bg-charcoal-800 text-charcoal-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Status filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-charcoal-200 text-xs focus:outline-none focus:border-forest-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="IN_STOCK">In Stock</option>
            <option value="LOW_STOCK">Low Stock</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
            <option value="COMING_SOON">Coming Soon</option>
            <option value="DISCONTINUED">Discontinued</option>
          </select>

          <form onSubmit={handleSearchSubmit} className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 text-charcoal-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search SKU or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs placeholder-charcoal-500 focus:outline-none focus:border-forest-500"
            />
          </form>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl overflow-hidden shadow-card">
        {loading ? (
          <div className="p-12 text-center text-charcoal-400 flex items-center justify-center gap-2 text-xs">
            <Loader2 className="w-4 h-4 animate-spin text-forest-400" />
            <span>Loading database records...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-charcoal-400 space-y-2">
            <Bike className="w-10 h-10 text-charcoal-600 mx-auto" />
            <h4 className="text-white text-sm font-bold">No products match your filters</h4>
            <p className="text-xs">Try clearing search keywords or changing category filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-charcoal-800 bg-charcoal-950/60 text-[11px] font-mono uppercase text-charcoal-400">
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">SKU / Brand</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800/60 text-xs">
                {products.map((prod) => {
                  const badge = getAvailabilityBadgeProps(prod.availabilityStatus);
                  const currentStock = prod.inventory?.currentStock ?? 0;

                  return (
                    <tr key={prod.id} className="hover:bg-charcoal-850/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.primaryImageUrl}
                            alt={prod.name}
                            className="w-10 h-10 rounded-lg object-cover bg-charcoal-950 shrink-0 border border-charcoal-800"
                          />
                          <div>
                            <span className="font-bold text-white block hover:text-blaze-400 transition-colors">
                              {prod.name}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              {prod.isFeatured && (
                                <span className="text-[10px] font-mono text-blaze-400 bg-blaze-950/80 px-1.5 py-0.2 rounded border border-blaze-800">
                                  Featured
                                </span>
                              )}
                              <span
                                className={`text-[10px] font-mono ${
                                  prod.isPublished ? "text-forest-400" : "text-charcoal-500"
                                }`}
                              >
                                {prod.isPublished ? "● Published" : "○ Draft"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <span className="text-white">{prod.sku}</span>
                        <span className="block text-charcoal-400">{prod.brand}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-charcoal-800 text-charcoal-300 text-[11px]">
                          {prod.category?.name || "General"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-display font-bold text-white">
                        {formatPrice(prod.priceInCents)}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => {
                            setSelectedProductForStock(prod);
                            setStockDelta(0);
                          }}
                          className="font-mono text-xs px-2.5 py-1 rounded bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-200 border border-charcoal-700 flex items-center gap-1.5"
                          title="Quick stock adjustment"
                        >
                          <Package className="w-3 h-3 text-forest-400" />
                          <span>{currentStock}</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${badge.badgeClass}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dotClass}`}></span>
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={
                              prod.type === "BIKE"
                                ? `/bikes/${prod.slug}`
                                : prod.type === "SPARE_PART"
                                ? `/parts/${prod.slug}`
                                : `/accessories/${prod.slug}`
                            }
                            target="_blank"
                            title="View on store"
                            className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-400 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/products/${prod.id}`}
                            title="Edit Product"
                            className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-300 hover:text-white transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleArchive(prod.id, prod.name)}
                            title="Archive / Unpublish"
                            className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-red-950 text-charcoal-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Stock Adjustment Modal */}
      {selectedProductForStock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-charcoal-900 border border-charcoal-750 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-charcoal-100">
            <h3 className="text-lg font-display font-bold text-white mb-1">
              Adjust Inventory Stock
            </h3>
            <p className="text-xs text-charcoal-400 mb-4">
              {selectedProductForStock.name} (SKU: {selectedProductForStock.sku})
            </p>

            <form onSubmit={handleStockAdjustment} className="space-y-4">
              <div className="bg-charcoal-850 p-3 rounded-xl border border-charcoal-750 text-xs flex justify-between">
                <span className="text-charcoal-400">Current On-Hand Stock:</span>
                <span className="font-mono font-bold text-white">
                  {selectedProductForStock.inventory?.currentStock ?? 0} units
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-300 mb-1">
                  Stock Change (+ for restock, - for audit deduction)
                </label>
                <input
                  type="number"
                  required
                  value={stockDelta}
                  onChange={(e) => setStockDelta(parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white font-mono text-sm focus:outline-none focus:border-forest-500"
                />
                <div className="text-[11px] text-charcoal-500 mt-1">
                  Resulting Stock:{" "}
                  <strong className="text-forest-400 font-mono">
                    {(selectedProductForStock.inventory?.currentStock ?? 0) + stockDelta}
                  </strong>{" "}
                  units
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-300 mb-1">
                  Adjustment Reason (Required for Audit Trail)
                </label>
                <input
                  type="text"
                  required
                  value={stockReason}
                  onChange={(e) => setStockReason(e.target.value)}
                  placeholder="e.g. Shipment delivery from distributor"
                  className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProductForStock(null)}
                  className="w-1/2 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adjusting || stockDelta === 0}
                  className="w-1/2 py-2.5 rounded-xl bg-forest-700 hover:bg-forest-600 text-white text-xs font-bold shadow-glow-forest disabled:opacity-50"
                >
                  {adjusting ? "Updating..." : "Commit Change"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
