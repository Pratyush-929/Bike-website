"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search, GitCompareArrows, Mountain } from "lucide-react";
import { useCompare } from "@/context/CompareContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { selectedSlugs } = useCompare();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/#categories" },
    { name: "All Bikes", href: "/bikes" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = quickQuery.trim();
    setSearchOpen(false);
    setMobileMenuOpen(false);
    if (q) {
      router.push(`/bikes?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/bikes");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0D0C]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: PRATYUSH WORLD Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#151917] border border-[#4CAF50]/40 flex items-center justify-center group-hover:border-[#A3E635] transition-colors">
            <Mountain className="w-5 h-5 text-[#4CAF50] group-hover:text-[#A3E635] transition-colors" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-display font-black tracking-wider text-white uppercase block leading-none">
              PRATYUSH WORLD
            </span>
            <span className="text-[10px] font-medium tracking-[0.2em] text-[#A3E635] uppercase mt-1 block">
              Mountain Bike Discovery
            </span>
          </div>
        </Link>

        {/* Right: Desktop Navigation + Search & Compare */}
        <div className="hidden lg:flex items-center gap-2">
          <nav className="flex items-center gap-1 mr-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    active
                      ? "text-[#A3E635] bg-[#151917] font-semibold"
                      : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-[#4CAF50] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Search mountain bikes"
            className="p-2.5 rounded-xl bg-[#151917] border border-white/10 text-[#A1A1AA] hover:text-[#A3E635] hover:border-[#4CAF50]/50 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Compare Link */}
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#151917] border border-white/10 hover:border-[#4CAF50]/60 text-xs font-semibold text-white transition-colors"
          >
            <GitCompareArrows className="w-4 h-4 text-[#4CAF50]" />
            <span>Compare</span>
            {selectedSlugs.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#4CAF50] text-[#0B0D0C] font-bold text-[10px] leading-none">
                {selectedSlugs.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/compare"
            aria-label="Compare bikes"
            className="relative p-2.5 rounded-xl bg-[#151917] border border-white/10 text-white"
          >
            <GitCompareArrows className="w-4 h-4 text-[#4CAF50]" />
            {selectedSlugs.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#A3E635] text-[#0B0D0C] text-[10px] font-bold flex items-center justify-center">
                {selectedSlugs.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Search bikes"
            className="p-2.5 rounded-xl bg-[#151917] border border-white/10 text-[#A1A1AA] hover:text-white"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="p-2.5 rounded-xl bg-[#151917] border border-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="border-t border-white/10 bg-[#151917] px-4 sm:px-6 lg:px-8 py-3">
          <form onSubmit={handleQuickSearch} className="max-w-3xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-3" />
              <input
                type="text"
                autoFocus
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="Search by model, manufacturer, or category (e.g. Santa Cruz, Enduro, Epic 8)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B0D0C] border border-white/15 text-sm text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#4CAF50]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-[#0B0D0C] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="p-2.5 rounded-xl bg-[#0B0D0C] border border-white/10 text-[#A1A1AA] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Hamburger Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0B0D0C] px-4 py-4 space-y-1.5">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#151917] text-[#A3E635] border-l-4 border-[#4CAF50] font-semibold"
                    : "text-[#A1A1AA] hover:bg-[#151917] hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
