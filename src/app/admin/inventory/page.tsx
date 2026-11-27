import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  History,
  ShieldCheck,
} from "lucide-react";
import { formatPrice, formatDate, formatDateTime, getAvailabilityBadgeProps } from "@/lib/formatters";

export const dynamic = "force-dynamic";

export default async function AdminInventoryPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  // Fetch inventory items with product info & recent movements
  const [products, movements, lowStockCount, outOfStockCount] = await Promise.all([
    prisma.product.findMany({
      include: {
        inventory: true,
        category: true,
      },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.inventoryMovement.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
      include: {
        product: true,
      },
    }),
    prisma.product.count({ where: { availabilityStatus: "LOW_STOCK" } }),
    prisma.product.count({ where: { availabilityStatus: "OUT_OF_STOCK" } }),
  ]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-forest-400 font-bold uppercase tracking-wider">
            Warehouse Telemetry
          </span>
          <h1 className="text-2xl font-display font-bold text-white mt-0.5">
            Inventory & Stock Movement Audit
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Real-time on-hand stock quantities, low-stock thresholds, and permanent movement logs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-200 text-xs font-semibold border border-charcoal-700 transition-colors"
          >
            Manage Product Catalog
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5 shadow-card">
          <span className="text-xs text-charcoal-400 uppercase font-semibold">Total Tracked Items</span>
          <div className="text-3xl font-display font-extrabold text-white mt-1">
            {products.length}
          </div>
          <p className="text-[11px] text-charcoal-500 mt-1">Bikes, spare parts & accessories</p>
        </div>
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5 shadow-card">
          <span className="text-xs text-amber-400 uppercase font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Low Stock Alerts
          </span>
          <div className="text-3xl font-display font-extrabold text-amber-400 mt-1">
            {lowStockCount}
          </div>
          <p className="text-[11px] text-charcoal-500 mt-1">At or below reorder threshold</p>
        </div>
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5 shadow-card">
          <span className="text-xs text-red-400 uppercase font-semibold flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5" />
            Out of Stock Items
          </span>
          <div className="text-3xl font-display font-extrabold text-red-400 mt-1">
            {outOfStockCount}
          </div>
          <p className="text-[11px] text-charcoal-500 mt-1">Requires immediate purchase order</p>
        </div>
      </div>

      {/* Stock Level Table */}
      <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl overflow-hidden shadow-card">
        <div className="p-5 border-b border-charcoal-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-display font-bold text-white">
              Current Warehouse Stock Levels
            </h2>
            <p className="text-xs text-charcoal-400">
              Live quantities synced directly with public store availability
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-charcoal-800 bg-charcoal-950/60 text-[11px] font-mono uppercase text-charcoal-400">
                <th className="py-3 px-4">Product / SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Location / Bay</th>
                <th className="py-3 px-4">Reorder Threshold</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/60 text-xs">
              {products.map((p) => {
                const stock = p.inventory?.currentStock ?? 0;
                const thresh = p.inventory?.reorderThreshold ?? 3;
                const badge = getAvailabilityBadgeProps(p.availabilityStatus);

                return (
                  <tr key={p.id} className="hover:bg-charcoal-850/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.primaryImageUrl}
                          alt={p.name}
                          className="w-9 h-9 rounded-lg object-cover bg-charcoal-950 shrink-0 border border-charcoal-800"
                        />
                        <div>
                          <span className="font-bold text-white block">{p.name}</span>
                          <span className="font-mono text-[11px] text-charcoal-400">{p.sku}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-300">
                      {p.category?.name || "General"}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-charcoal-400 text-[11px]">
                      {p.inventory?.location || "Warehouse A-1"}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-charcoal-300">
                      ≤ {thresh} units
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-sm">
                      <span
                        className={
                          stock === 0
                            ? "text-red-400"
                            : stock <= thresh
                            ? "text-amber-400"
                            : "text-forest-400"
                        }
                      >
                        {stock}
                      </span>
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
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="px-2.5 py-1 rounded bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-200 text-xs font-semibold transition-colors"
                      >
                        Adjust
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Movement History Log */}
      <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-forest-400" />
            <h2 className="text-sm font-display font-bold text-white">
              Inventory Movement Audit Log
            </h2>
          </div>
          <span className="text-[11px] font-mono text-charcoal-400">
            Immutable operation ledger
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-charcoal-800 bg-charcoal-950/60 text-[10px] font-mono uppercase text-charcoal-400">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Product SKU</th>
                <th className="py-2.5 px-3">Change Type</th>
                <th className="py-2.5 px-3">Adjustment</th>
                <th className="py-2.5 px-3">Resulting Stock</th>
                <th className="py-2.5 px-3">Documented Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/60">
              {movements.map((m) => (
                <tr key={m.id} className="hover:bg-charcoal-850/40">
                  <td className="py-2.5 px-3 font-mono text-[11px] text-charcoal-400">
                    {formatDateTime(m.createdAt)}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-white">
                    {m.product?.sku || "SKU-N/A"}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-800 text-charcoal-300 border border-charcoal-700">
                      {m.changeType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold">
                    <span className={m.quantityChange > 0 ? "text-forest-400" : "text-red-400"}>
                      {m.quantityChange > 0 ? `+${m.quantityChange}` : m.quantityChange}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-charcoal-200">
                    {m.resultingStock} units
                  </td>
                  <td className="py-2.5 px-3 text-charcoal-300 max-w-xs truncate">
                    {m.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
