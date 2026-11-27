"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  Filter,
  Download,
  MessageSquare,
  Mail,
  Calendar,
  Save,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/formatters";

interface InquiryItem {
  id: string;
  inquiryCode: string;
  fullName: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  inquiryType: string;
  status: "NEW" | "READ" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED";
  emailNotificationSent: boolean;
  emailNotificationStatus: string;
  internalNotes?: string | null;
  followUpDate?: string | null;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

  // Inspector modal state
  const [editStatus, setEditStatus] = useState<string>("NEW");
  const [internalNotes, setInternalNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (search.trim()) params.append("search", search.trim());

      const res = await fetch(`/api/admin/inquiries?${params.toString()}`);
      const data = await res.json();
      if (data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const openInspector = (inq: InquiryItem) => {
    setSelectedInquiry(inq);
    setEditStatus(inq.status);
    setInternalNotes(inq.internalNotes || "");
    setFollowUpDate(inq.followUpDate ? inq.followUpDate.split("T")[0] : "");
    setMessage(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry) return;
    setUpdating(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/inquiries/${selectedInquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          internalNotes,
          followUpDate: followUpDate || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update inquiry");

      setMessage("Inquiry status and internal workshop notes saved.");
      setSelectedInquiry(data.inquiry);
      fetchInquiries();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error saving");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blaze-950 text-blaze-400 border-blaze-700/60";
      case "IN_PROGRESS":
        return "bg-amber-950 text-amber-300 border-amber-700/60";
      case "RESOLVED":
        return "bg-forest-950 text-forest-300 border-forest-700/60";
      case "ARCHIVED":
        return "bg-charcoal-800 text-charcoal-400 border-charcoal-700";
      default:
        return "bg-sky-950 text-sky-300 border-sky-700/60";
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-blaze-500 font-bold uppercase tracking-wider">
            Customer Relations
          </span>
          <h1 className="text-2xl font-display font-bold text-white mt-0.5">
            Trail Inquiries & Technical Questions Inbox
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Track inquiries, update operational status, add mechanic notes, and export to CSV.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/api/admin/inquiries/export"
            download
            className="px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-200 border border-charcoal-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export to CSV</span>
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {[
            { id: "ALL", label: "All Messages" },
            { id: "NEW", label: "New Unread" },
            { id: "IN_PROGRESS", label: "In Progress" },
            { id: "RESOLVED", label: "Resolved" },
            { id: "ARCHIVED", label: "Archived" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === tab.id
                  ? "bg-forest-800 text-white"
                  : "bg-charcoal-800 text-charcoal-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchInquiries();
          }}
          className="relative w-full md:w-72"
        >
          <Search className="w-3.5 h-3.5 text-charcoal-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search name, email, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs placeholder-charcoal-500 focus:outline-none focus:border-forest-500"
          />
        </form>
      </div>

      {/* Inquiries Table */}
      <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl overflow-hidden shadow-card">
        {loading ? (
          <div className="p-12 text-center text-charcoal-400 flex items-center justify-center gap-2 text-xs">
            <Loader2 className="w-4 h-4 animate-spin text-forest-400" />
            <span>Loading inquiries...</span>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="p-12 text-center text-charcoal-400 space-y-2">
            <Inbox className="w-10 h-10 text-charcoal-600 mx-auto" />
            <h4 className="text-white text-sm font-bold">No inquiries found</h4>
            <p className="text-xs">All messages addressed or no matches for your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-charcoal-800 bg-charcoal-950/60 text-[11px] font-mono uppercase text-charcoal-400">
                  <th className="py-3 px-4">Code / Date</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Email Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800/60">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-charcoal-850/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-bold text-white block">{inq.inquiryCode}</span>
                      <span className="text-charcoal-500 text-[11px]">{formatDate(inq.createdAt)}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-white block">{inq.fullName}</span>
                      <span className="text-charcoal-400 text-[11px]">{inq.email}</span>
                      {inq.phone && (
                        <span className="font-mono text-[10px] text-charcoal-500 block">
                          {inq.phone}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[10px] uppercase text-charcoal-300">
                      {inq.inquiryType}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-charcoal-200 font-medium">
                      {inq.subject}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${getStatusBadge(
                          inq.status
                        )}`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          inq.emailNotificationStatus === "SENT"
                            ? "bg-forest-950 text-forest-300 border-forest-800"
                            : inq.emailNotificationStatus === "PENDING"
                            ? "bg-amber-950 text-amber-300 border-amber-800"
                            : inq.emailNotificationStatus === "NOT_CONFIGURED"
                            ? "bg-charcoal-800 text-charcoal-400 border-charcoal-700"
                            : "bg-red-950 text-red-300 border-red-800"
                        }`}
                      >
                        {inq.emailNotificationStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openInspector(inq)}
                        className="px-3 py-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-200 text-xs font-semibold transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Inspector Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-charcoal-900 border border-charcoal-750 rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative text-charcoal-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-charcoal-800 pb-4 mb-4">
              <div>
                <span className="text-xs font-mono text-blaze-500 font-bold uppercase tracking-wider">
                  Inquiry Ticket • {selectedInquiry.inquiryCode}
                </span>
                <h3 className="text-xl font-display font-bold text-white mt-0.5">
                  {selectedInquiry.subject}
                </h3>
                <p className="text-[11px] text-charcoal-400 font-mono mt-0.5">
                  Submitted: {formatDateTime(selectedInquiry.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-lg bg-charcoal-800 text-charcoal-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {message && (
              <div className="mb-4 p-3 rounded-lg bg-forest-950/80 border border-forest-600/50 text-forest-300 text-xs">
                {message}
              </div>
            )}

            {/* Customer Contact Details */}
            <div className="bg-charcoal-850 p-4 rounded-xl border border-charcoal-750 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-4">
              <div>
                <span className="text-charcoal-400 text-[11px] block">Customer:</span>
                <strong className="text-white">{selectedInquiry.fullName}</strong>
              </div>
              <div>
                <span className="text-charcoal-400 text-[11px] block">Email:</span>
                <a
                  href={`mailto:${selectedInquiry.email}?subject=RE: ${selectedInquiry.subject}`}
                  className="text-blaze-400 hover:underline flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  <span>{selectedInquiry.email}</span>
                </a>
              </div>
              <div>
                <span className="text-charcoal-400 text-[11px] block">Phone / WhatsApp:</span>
                {selectedInquiry.phone ? (
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Hi ${selectedInquiry.fullName}, this is Terra Cycles regarding your inquiry [${selectedInquiry.inquiryCode}].`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>{selectedInquiry.phone}</span>
                  </a>
                ) : (
                  <span className="text-charcoal-500 font-mono">Not provided</span>
                )}
              </div>
            </div>

            {/* Full Message */}
            <div className="mb-6">
              <label className="block text-xs font-mono uppercase text-charcoal-400 mb-1.5 font-bold">
                Customer Message
              </label>
              <div className="p-4 rounded-xl bg-charcoal-800 border border-charcoal-700 text-sm text-charcoal-200 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Management Form */}
            <form onSubmit={handleUpdate} className="space-y-4 border-t border-charcoal-800 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal-300 mb-1">
                    Ticket Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                  >
                    <option value="NEW">New (Unread)</option>
                    <option value="READ">Read</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal-300 mb-1">
                    Follow-Up Due Date
                  </label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-300 mb-1">
                  Internal Workshop & Sizing Notes
                </label>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Mechanic recommendations, quoted custom parts prices, sizing recommendations..."
                  className="w-full px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-charcoal-400">
                  Notification Delivery:{" "}
                  <strong className="text-forest-400">{selectedInquiry.emailNotificationStatus}</strong>
                </div>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-5 py-2.5 rounded-xl bg-forest-700 hover:bg-forest-600 text-white font-bold text-xs uppercase tracking-wide flex items-center gap-1.5 shadow-glow-forest disabled:opacity-50"
                >
                  {updating ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Save Ticket Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
