"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@terracycles.com");
  const [password, setPassword] = useState("AdminPassword2026!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col justify-center items-center p-4 bg-topo">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-12 h-12 rounded-xl bg-forest-900 border border-forest-600/50 flex items-center justify-center shadow-lg group-hover:border-blaze-500 transition-colors">
              <svg className="w-7 h-7 text-blaze-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M4 20L12 4L20 20H4Z" stroke="currentColor"/>
                <circle cx="12" cy="12" r="2" fill="#36886c"/>
              </svg>
            </div>
            <div className="text-left">
              <span className="text-2xl font-display font-black tracking-wider text-white uppercase block">
                TERRA CYCLES
              </span>
              <span className="text-[10px] font-mono text-forest-400 font-semibold tracking-widest uppercase block">
                ADMINISTRATION & WORKSHOP OPS
              </span>
            </div>
          </Link>
          <h2 className="text-xl font-display font-bold text-white">
            Secure Admin Access
          </h2>
          <p className="text-xs text-charcoal-400 mt-1">
            Sign in to manage catalog, inventory, pricing, workshop appointments, and inquiries.
          </p>
        </div>

        {/* Card */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-950/70 border border-red-800/80 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1.5">
                Staff / Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white text-sm placeholder-charcoal-500 focus:outline-none focus:border-blaze-500 transition-colors"
                  placeholder="admin@terracycles.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700 text-white text-sm placeholder-charcoal-500 focus:outline-none focus:border-blaze-500 transition-colors"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-blaze-600 hover:bg-blaze-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-glow disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate & Enter Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Seed credentials hint */}
          <div className="mt-6 pt-5 border-t border-charcoal-800/80 text-[11px] text-charcoal-400 space-y-1.5 bg-charcoal-950/40 p-3 rounded-lg border border-charcoal-800">
            <div className="font-mono text-forest-300 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Seeded Administrative Credentials:</span>
            </div>
            <div className="font-mono text-charcoal-300">
              Super Admin: <code className="text-white">admin@terracycles.com</code> / <code className="text-white">AdminPassword2026!</code>
            </div>
            <div className="font-mono text-charcoal-400">
              Manager: <code className="text-white">manager@terracycles.com</code> / <code className="text-white">ManagerPassword2026!</code>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-charcoal-400 hover:text-white transition-colors"
          >
            ← Return to Public Mountain Bike Store
          </Link>
        </div>
      </div>
    </div>
  );
}
