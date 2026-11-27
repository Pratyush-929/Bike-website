"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  onClear,
  onSubmit,
  placeholder = "Search by bike model, manufacturer, brand, or category...",
}: SearchBarProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      className="flex flex-col sm:flex-row gap-2.5 w-full"
    >
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-[#A1A1AA] absolute left-4 top-3.5 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search mountain bikes"
          className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#0B0D0C] border border-white/15 text-sm text-white placeholder-[#A1A1AA]/70 focus:outline-none focus:border-[#4CAF50] transition-colors"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="absolute right-3 top-3 p-0.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-[#0B0D0C] font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Search
        </button>
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="px-4 py-3 rounded-xl bg-[#0B0D0C] hover:bg-white/5 text-[#A1A1AA] hover:text-white border border-white/15 font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
