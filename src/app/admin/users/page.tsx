"use client";

import React, { useState, useEffect } from "react";
import { Users, Shield, Plus, Lock, CheckCircle2, AlertCircle, Loader2, History, UserPlus } from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/formatters";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

interface AuditItem {
  id: string;
  action: string;
  entityType: string;
  userEmail?: string | null;
  details: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  // New User Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STAFF");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUsersAndLogs = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.users) setUsers(data.users);
      if (data.auditLogs) setAuditLogs(data.auditLogs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAndLogs();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create user");

      setMessage(`Account created for ${name} (${role}).`);
      setName("");
      setEmail("");
      setPassword("");
      setCreating(false);
      fetchUsersAndLogs();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error creating user");
    } finally {
      setSaving(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-blaze-950 text-blaze-400 border-blaze-800";
      case "MANAGER":
        return "bg-forest-950 text-forest-300 border-forest-800";
      default:
        return "bg-charcoal-800 text-charcoal-300 border-charcoal-700";
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-blaze-500 font-bold uppercase tracking-wider">
            Access Governance
          </span>
          <h1 className="text-2xl font-display font-bold text-white mt-0.5">
            Team Members & Audit Logs
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Role-based permissions (Super Admin, Manager, Staff) and immutable system activity logs.
          </p>
        </div>
        <button
          onClick={() => setCreating(!creating)}
          className="px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all shadow-glow-forest"
        >
          <UserPlus className="w-4 h-4" />
          <span>{creating ? "Cancel" : "Add Team Member"}</span>
        </button>
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

      {/* New User Form Drawer */}
      {creating && (
        <div className="bg-charcoal-900 border border-charcoal-750 rounded-2xl p-6 shadow-card space-y-4 animate-fadeIn">
          <h3 className="text-sm font-display font-bold text-white border-b border-charcoal-800 pb-2">
            Create Authorized Team Account
          </h3>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-charcoal-300 mb-1">
                  Full Name <span className="text-blaze-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sierra Brooks"
                  className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-300 mb-1">
                  Email Address <span className="text-blaze-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sierra@terracycles.com"
                  className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-charcoal-300 mb-1">
                  Password (Min 8 Characters) <span className="text-blaze-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-300 mb-1">
                  Role Assignment <span className="text-blaze-500">*</span>
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                >
                  <option value="STAFF">Staff (Operational tasks & inquiries)</option>
                  <option value="MANAGER">Manager (Products, stock, pricing & bookings)</option>
                  <option value="SUPER_ADMIN">Super Admin (Full system control & settings)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCreating(false)}
                className="px-4 py-2 rounded-xl bg-charcoal-800 text-charcoal-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-blaze-600 hover:bg-blaze-500 text-white font-bold text-xs uppercase tracking-wide shadow-glow disabled:opacity-50"
              >
                {saving ? "Saving..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl overflow-hidden shadow-card">
        <div className="p-5 border-b border-charcoal-800">
          <h2 className="text-sm font-display font-bold text-white">
            Authorized System Accounts
          </h2>
          <p className="text-xs text-charcoal-400">
            Current staff, managers, and administrators
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-charcoal-800 bg-charcoal-950/60 text-[11px] font-mono uppercase text-charcoal-400">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/60">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-charcoal-850/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    {u.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-charcoal-300">
                    {u.email}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${getRoleBadge(
                        u.role
                      )}`}
                    >
                      {u.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-mono text-forest-400 bg-forest-950/80 px-2 py-0.5 rounded border border-forest-800">
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-charcoal-400 text-[11px]">
                    {formatDate(u.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-forest-400" />
            <h2 className="text-sm font-display font-bold text-white">
              Permanent Audit Trail (Latest 50 Operations)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-charcoal-500">
            System & User Actions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-charcoal-800 bg-charcoal-950/60 text-[10px] font-mono uppercase text-charcoal-400">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Actor</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Entity Type</th>
                <th className="py-2.5 px-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/60">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-charcoal-850/40">
                  <td className="py-2.5 px-3 font-mono text-[11px] text-charcoal-400 whitespace-nowrap">
                    {formatDateTime(log.createdAt)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-white text-[11px]">
                    {log.userEmail || "System"}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-forest-400">
                    {log.action}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-charcoal-300">
                    {log.entityType}
                  </td>
                  <td className="py-2.5 px-3 text-charcoal-400 max-w-sm truncate font-mono text-[11px]">
                    {log.details}
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
