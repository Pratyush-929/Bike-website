"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mountain } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#0B0D0C] border-t border-white/10 text-[#A1A1AA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-[#151917] border border-[#4CAF50]/40 flex items-center justify-center">
              <Mountain className="w-5 h-5 text-[#4CAF50]" />
            </div>
            <span className="text-xl font-display font-black tracking-wider text-white uppercase">
              PRATYUSH WORLD
            </span>
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A3E635]">
            RIDE BEYOND LIMITS. EXPLORE WITHOUT BOUNDARIES.
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-md">
            An international mountain bike discovery platform showcasing 30 bikes across six mountain biking disciplines from leading manufacturers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-[#4CAF50] pl-2.5">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="hover:text-[#A3E635] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#categories" className="hover:text-[#A3E635] transition-colors">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/bikes" className="hover:text-[#A3E635] transition-colors">
                All Bikes
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#A3E635] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#A3E635] transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Bike Categories */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-[#A3E635] pl-2.5">
            Bike Categories
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                href="/bikes?category=all-mountain"
                className="hover:text-[#A3E635] transition-colors"
              >
                All-Mountain
              </Link>
            </li>
            <li>
              <Link
                href="/bikes?category=enduro"
                className="hover:text-[#A3E635] transition-colors"
              >
                Enduro
              </Link>
            </li>
            <li>
              <Link
                href="/bikes?category=trail"
                className="hover:text-[#A3E635] transition-colors"
              >
                Trail
              </Link>
            </li>
            <li>
              <Link
                href="/bikes?category=downhill"
                className="hover:text-[#A3E635] transition-colors"
              >
                Downhill &amp; Freeride
              </Link>
            </li>
            <li>
              <Link
                href="/bikes?category=hardtail"
                className="hover:text-[#A3E635] transition-colors"
              >
                Hardtail
              </Link>
            </li>
            <li>
              <Link
                href="/bikes?category=cross-country"
                className="hover:text-[#A3E635] transition-colors"
              >
                Cross-Country
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8 text-xs text-[#A1A1AA]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 PRATYUSH WORLD. All Rights Reserved.</p>
          <p className="text-[11px] uppercase tracking-wider text-white/50">
            PRATYUSH WORLD | Premium Mountain Bike Collection
          </p>
        </div>
      </div>
    </footer>
  );
}
