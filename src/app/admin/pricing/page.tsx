"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DollarSign, Save, Loader2, Zap, CheckCircle2, AlertCircle } from "lucide-react";
import { formatPrice, parsePriceToCents } from "@/lib/formatters";

interface PriceItem {
  id: string;
  sku: string;
  name: string;
  priceInCents: number;
  compareAtPriceInCents?: number | null;
  updatedAt: string;
  type: string;
}

export default function AdminPricingPage() {
  const [items, setItems] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [editPrices, setEditPrices] = useState<Record<string, { price: string; compare: string }>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.products) {
        setItems(data.products);
        const map: Record<string, { price: string; compare: string }> = {};
        data.products.forEach((p: PriceItem) => {
          map[p.id] = {
            price: (p.priceInCents / 100).toFixed(2),
            compare: p.compareAtPriceInCents ? (p.compareAtPriceInCents / 100).toFixed(2) : "",
          };
        });
        setEditPrices(map);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handlePriceUpdate = async (id: string) => {
    const edit = editPrices[id];
    if (!edit) return;

    setSavingId(id);
    setMessage(null);
    setError(null);

    const priceCents = parsePriceToCents(edit.price);
    const compareCents = edit.compare ? parsePriceToCents(edit.compare) : null;

    if (priceCents < 0) {
      setError("Price must be a non-negative value.");
      setSavingId(null);
      return;
    }

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceInCents: priceCents,
          compareAtPriceInCents: compareCents,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update price");
      }

      setMessage("Price saved successfully! Live store reflects the updated price immediately.");
      fetchItems();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving price");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-blaze-500 font-bold uppercase tracking-wider">
            Commercial Strategy
          </span>
          <h1 className="text-2xl font-display font-bold text-white mt-0.5">
            Pricing, Sales & Discount Controls
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Edit retail MSRP, activate promotional sale discounts, and verify integer precision arithmetic.
          </p>
        </div>
        <Link
          href="/admin/settings"
          className="px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-200 text-xs font-semibold border border-charcoal-700"
        >
          Change Default Currency Code
        </Link>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-forest-950/80 border border-forest-600/60 text-forest-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-forest-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800/80 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl overflow-hidden shadow-card">
        {loading ? (
          <div className="p-12 text-center text-charcoal-400 flex items-center justify-center gap-2 text-xs">
            <Loader2 className="w-4 h-4 animate-spin text-forest-400" />
            <span>Loading pricing records...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-charcoal-800 bg-charcoal-950/60 text-[11px] font-mono uppercase text-charcoal-400">
                  <th className="py-3 px-4">Item / SKU</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Active Retail Price ($)</th>
                  <th className="py-3 px-4">Compare-at / Sale MSRP ($)</th>
                  <th className="py-3 px-4">Effective Discount</th>
                  <th className="py-3 px-4 text-right">Commit Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800/60 text-xs">
                {items.map((item) => {
                  const state = editPrices[item.id] || { price: "0.00", compare: "" };
                  const priceCents = parsePriceToCents(state.price);
                  const compareCents = state.compare ? parsePriceToCents(state.compare) : null;
                  const hasDiscount = compareCents && compareCents > priceCents;
                  const discountPct = hasDiscount
                    ? Math.round(((compareCents - priceCents) / compareCents) * 100)
                    : 0;

                  return (
                    <tr key={item.id} className="hover:bg-charcoal-850/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white block">{item.name}</span>
                        <span className="font-mono text-[11px] text-charcoal-400">{item.sku}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-charcoal-400">
                        {item.type}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="relative w-36">
                          <span className="absolute left-2.5 top-2 text-charcoal-500 font-mono text-xs">$</span>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={state.price}
                            onChange={(e) =>
                              setEditPrices({
                                ...editPrices,
                                [item.id]: { ...state, price: e.target.value },
                              })
                            }
                            className="w-full pl-6 pr-2.5 py-1.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white font-mono text-xs focus:outline-none focus:border-blaze-500"
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="relative w-36">
                          <span className="absolute left-2.5 top-2 text-charcoal-500 font-mono text-xs">$</span>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Optional"
                            value={state.compare}
                            onChange={(e) =>
                              setEditPrices({
                                ...editPrices,
                                [item.id]: { ...state, compare: e.target.value },
                              })
                            }
                            className="w-full pl-6 pr-2.5 py-1.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white font-mono text-xs focus:outline-none focus:border-blaze-500"
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {hasDiscount ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blaze-950 text-blaze-400 border border-blaze-800">
                            <Zap className="w-3 h-3" />
                            {discountPct}% OFF
                          </span>
                        ) : (
                          <span className="text-charcoal-500 font-mono text-[11px]">Regular Price</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handlePriceUpdate(item.id)}
                          disabled={savingId === item.id}
                          className="px-3.5 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 ml-auto disabled:opacity-50"
                        >
                          {savingId === item.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Save className="w-3 h-3" />
                          )}
                          <span>Save</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
