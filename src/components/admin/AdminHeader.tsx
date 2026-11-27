"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Shield, User, Loader2 } from "lucide-react";

interface AdminHeaderProps {
  userName?: string;
  userRole?: string;
  userEmail?: string;
}

export default function AdminHeader({
  userName = "Admin",
  userRole = "SUPER_ADMIN",
  userEmail = "admin@terracycles.com",
}: AdminHeaderProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-blaze-950 text-blaze-400 border-blaze-700/60";
      case "MANAGER":
        return "bg-forest-950 text-forest-300 border-forest-700/60";
      default:
        return "bg-charcoal-800 text-charcoal-300 border-charcoal-700";
    }
  };

  return (
    <header className="h-16 bg-charcoal-900 border-b border-charcoal-800 px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-charcoal-400 uppercase tracking-wider font-semibold">
          Workshop Ops
        </span>
        <span className="text-charcoal-600">/</span>
        <span className="text-xs font-medium text-white">Live Central Console</span>
      </div>

      <div className="flex items-center gap-4">
        {/* User Card */}
        <div className="flex items-center gap-3 pr-2">
          <div className="w-8 h-8 rounded-full bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-forest-400">
            <User className="w-4 h-4" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-white leading-tight">{userName}</div>
            <div className="text-[10px] text-charcoal-400 font-mono leading-tight">{userEmail}</div>
          </div>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${getRoleBadge(
              userRole
            )}`}
          >
            {userRole.replace("_", " ")}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          title="Sign Out"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-300 hover:text-white border border-charcoal-700 text-xs transition-colors"
        >
          {loggingOut ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <LogOut className="w-3.5 h-3.5 text-red-400" />
          )}
          <span className="hidden md:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
