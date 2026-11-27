import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Bike,
  Package,
  Inbox,
  CalendarCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  Wrench,
  Sparkles,
} from "lucide-react";
import { formatPrice, formatDate, getAvailabilityBadgeProps } from "@/lib/formatters";

export const dynamic = "force-dynamic";

export default async function AdminDashboardOverview() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  // 1. Fetch live metrics from database
  const [
    totalBikes,
    totalSpareParts,
    totalAccessories,
    totalActiveProducts,
    outOfStockProducts,
    lowStockProducts,
    newInquiriesCount,
    pendingBookingsCount,
    recentProducts,
    recentInquiries,
    recentBookings,
    recentAuditLogs,
    settings,
  ] = await Promise.all([
    prisma.product.count({ where: { type: "BIKE" } }),
    prisma.product.count({ where: { type: "SPARE_PART" } }),
    prisma.product.count({ where: { type: "ACCESSORY" } }),
    prisma.product.count({ where: { isPublished: true } }),
    prisma.product.count({ where: { availabilityStatus: "OUT_OF_STOCK" } }),
    prisma.product.count({ where: { availabilityStatus: "LOW_STOCK" } }),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.serviceBooking.count({ where: { status: "PENDING" } }),
    prisma.product.findMany({
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: { category: true, inventory: true },
    }),
    prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.serviceBooking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { service: true },
    }),
    prisma.auditLog.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
    prisma.companySetting.findUnique({ where: { id: "default" } }),
  ]);

  const currencySymbol = settings?.currencySymbol || "$";

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-forest-950 via-charcoal-900 to-charcoal-900 border border-forest-800/60 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-card">
        <div>
          <span className="text-xs font-mono text-blaze-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blaze-500" />
            Operations Console • {settings?.brandName || "Terra Cycles"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-400 mt-1 max-w-xl">
            Live database telemetry for mountain bike inventory, trail inquiries, and technical workshop bay bookings.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 rounded-xl bg-blaze-600 hover:bg-blaze-500 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-glow flex items-center gap-1.5"
          >
            <span>+ Add Product</span>
          </Link>
          <Link
            href="/admin/inquiries"
            className="px-4 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-200 border border-charcoal-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <Inbox className="w-4 h-4 text-forest-400" />
            <span>Inbox ({newInquiriesCount})</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5 shadow-card hover:border-charcoal-700 transition-colors">
          <div className="flex items-center justify-between text-charcoal-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Active Catalog</span>
            <div className="p-2 rounded-xl bg-charcoal-800 text-forest-400">
              <Bike className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            {totalActiveProducts}
          </div>
          <div className="text-xs text-charcoal-400 mt-1 flex items-center gap-2">
            <span>{totalBikes} Bikes</span> • <span>{totalSpareParts} Parts</span> • <span>{totalAccessories} Acc.</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5 shadow-card hover:border-charcoal-700 transition-colors">
          <div className="flex items-center justify-between text-charcoal-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Inventory Health</span>
            <div className="p-2 rounded-xl bg-charcoal-800 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            {lowStockProducts + outOfStockProducts}
          </div>
          <div className="text-xs text-charcoal-400 mt-1 flex items-center gap-2">
            <span className="text-amber-400 font-medium">{lowStockProducts} Low Stock</span> •{" "}
            <span className="text-red-400 font-medium">{outOfStockProducts} Out of Stock</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5 shadow-card hover:border-charcoal-700 transition-colors">
          <div className="flex items-center justify-between text-charcoal-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Inquiry Inbox</span>
            <div className="p-2 rounded-xl bg-charcoal-800 text-blaze-500">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            {newInquiriesCount}
          </div>
          <div className="text-xs text-charcoal-400 mt-1">
            {newInquiriesCount > 0 ? (
              <span className="text-blaze-400 font-medium">Action required: customer inquiries waiting</span>
            ) : (
              <span className="text-forest-400 font-medium">All inquiries responded</span>
            )}
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5 shadow-card hover:border-charcoal-700 transition-colors">
          <div className="flex items-center justify-between text-charcoal-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Workshop Bay Requests</span>
            <div className="p-2 rounded-xl bg-charcoal-800 text-forest-400">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            {pendingBookingsCount}
          </div>
          <div className="text-xs text-charcoal-400 mt-1">
            <span className="text-forest-400 font-medium">Pending service reviews</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Products & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Products */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-charcoal-800">
            <div>
              <h2 className="text-base font-display font-bold text-white">
                Recently Updated Catalog
              </h2>
              <p className="text-xs text-charcoal-400">Latest bikes and components modified in database</p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-blaze-400 hover:text-blaze-300 flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-charcoal-800/60 mt-2">
            {recentProducts.map((prod) => {
              const badge = getAvailabilityBadgeProps(prod.availabilityStatus);
              return (
                <div key={prod.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={prod.primaryImageUrl}
                      alt={prod.name}
                      className="w-12 h-12 rounded-lg object-cover bg-charcoal-950 shrink-0"
                    />
                    <div className="min-w-0">
                      <Link
                        href={`/admin/products/${prod.id}`}
                        className="text-xs font-bold text-white hover:text-blaze-400 truncate block transition-colors"
                      >
                        {prod.name}
                      </Link>
                      <div className="text-[11px] text-charcoal-400 font-mono flex items-center gap-2">
                        <span>{prod.sku}</span> • <span>{prod.category?.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-display font-bold text-white">
                      {formatPrice(prod.priceInCents, "USD", currencySymbol)}
                    </div>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border mt-1 ${badge.badgeClass}`}
                    >
                      {prod.inventory?.currentStock ?? 0} in stock
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-charcoal-800">
            <div>
              <h2 className="text-base font-display font-bold text-white">
                Recent Inquiries Inbox
              </h2>
              <p className="text-xs text-charcoal-400">Direct inquiries from riders and customers</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-blaze-400 hover:text-blaze-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-charcoal-800/60 mt-2">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="py-3.5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white">{inq.fullName}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
                        inq.status === "NEW"
                          ? "bg-blaze-950 text-blaze-400 border-blaze-700/60"
                          : inq.status === "IN_PROGRESS"
                          ? "bg-amber-950 text-amber-300 border-amber-700/60"
                          : "bg-forest-950 text-forest-300 border-forest-700/60"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-300 truncate font-medium">{inq.subject}</p>
                  <p className="text-[11px] text-charcoal-500 font-mono mt-0.5">
                    {inq.inquiryCode} • {formatDate(inq.createdAt)}
                  </p>
                </div>
                <Link
                  href="/admin/inquiries"
                  className="px-2.5 py-1 rounded bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-200 text-xs shrink-0 transition-colors"
                >
                  Inspect
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workshop Appointments and Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Service Bookings */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-charcoal-800">
            <div>
              <h2 className="text-base font-display font-bold text-white">
                Upcoming Workshop Appointments
              </h2>
              <p className="text-xs text-charcoal-400">Suspension overhauls & bike builds</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs font-semibold text-blaze-400 hover:text-blaze-300 flex items-center gap-1"
            >
              <span>Manage Bookings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-charcoal-800/60 mt-2">
            {recentBookings.length === 0 ? (
              <div className="text-center py-6 text-xs text-charcoal-500">No active bookings recorded.</div>
            ) : (
              recentBookings.map((b) => (
                <div key={b.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{b.customerName}</span>
                      <span className="text-[10px] font-mono text-forest-400 bg-forest-950/60 px-2 py-0.5 rounded border border-forest-800">
                        {b.status}
                      </span>
                    </div>
                    <div className="text-xs text-charcoal-300 mt-0.5">{b.service.name}</div>
                    <div className="text-[11px] text-charcoal-500 font-mono">
                      Bike: {b.bikeModel} • Date: {formatDate(b.requestedDate)} ({b.requestedTimeSlot})
                    </div>
                  </div>
                  <Link
                    href="/admin/bookings"
                    className="px-2.5 py-1 rounded bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-200 text-xs shrink-0 transition-colors"
                  >
                    Manage
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Audit Log */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-charcoal-800">
            <div>
              <h2 className="text-base font-display font-bold text-white">
                Recent Administrative Activity
              </h2>
              <p className="text-xs text-charcoal-400">Audit trail of system changes and operations</p>
            </div>
            <Link
              href="/admin/users"
              className="text-xs font-semibold text-blaze-400 hover:text-blaze-300 flex items-center gap-1"
            >
              <span>All Logs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-charcoal-800/60 mt-2">
            {recentAuditLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                <div>
                  <span className="font-mono font-bold text-forest-400">{log.action}</span>
                  <div className="text-charcoal-400 text-[11px] mt-0.5">
                    {log.userEmail || "System"} • Entity: {log.entityType}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-charcoal-500 shrink-0">
                  {formatDate(log.createdAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
