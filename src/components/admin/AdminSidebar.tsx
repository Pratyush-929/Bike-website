"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bike,
  Package,
  DollarSign,
  Layers,
  Inbox,
  CalendarCheck,
  Settings,
  Users,
  ExternalLink,
} from "lucide-react";

interface AdminSidebarProps {
  userRole?: string;
}

export default function AdminSidebar({ userRole = "SUPER_ADMIN" }: AdminSidebarProps) {
  const pathname = usePathname();

  const links = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Products", href: "/admin/products", icon: Bike },
    { name: "Inventory", href: "/admin/inventory", icon: Package },
    { name: "Pricing", href: "/admin/pricing", icon: DollarSign },
    { name: "Categories", href: "/admin/categories", icon: Layers },
    { name: "Inquiries", href: "/admin/inquiries", icon: Inbox },
    { name: "Service Bookings", href: "/admin/bookings", icon: CalendarCheck },
    { name: "Website Settings", href: "/admin/settings", icon: Settings, superAdminOnly: true },
    { name: "Team & Audit", href: "/admin/users", icon: Users },
  ];

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-charcoal-950 border-r border-charcoal-800 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Brand header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-charcoal-800/80 bg-forest-950/40">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-forest-800 border border-forest-600/50 flex items-center justify-center">
              <svg className="w-4 h-4 text-blaze-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 20L12 4L20 20H4Z" stroke="currentColor"/>
                <circle cx="12" cy="12" r="2" fill="#36886c"/>
              </svg>
            </div>
            <div>
              <span className="font-display font-black text-sm tracking-wider text-white uppercase block">
                TERRA ADMIN
              </span>
              <span className="text-[9px] font-mono text-forest-400 font-semibold uppercase tracking-widest block">
                OPERATIONS & INVENTORY
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          <div className="text-[10px] font-mono uppercase text-charcoal-500 tracking-wider font-bold px-3 py-2">
            Main Management
          </div>
          {links.map((link) => {
            if (link.superAdminOnly && userRole !== "SUPER_ADMIN") return null;
            const Icon = link.icon;
            const active = isActive(link.href, link.exact);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? "bg-forest-900/60 text-white border border-forest-700/60 font-semibold shadow-sm text-blaze-400"
                    : "text-charcoal-400 hover:text-white hover:bg-charcoal-900"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    active ? "text-blaze-500" : "text-charcoal-400"
                  }`}
                />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer link to public website */}
      <div className="p-4 border-t border-charcoal-800 bg-charcoal-900/50">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-300 hover:text-white text-xs transition-colors"
        >
          <span className="font-medium">View Live Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-charcoal-500" />
        </Link>
      </div>
    </aside>
  );
}
