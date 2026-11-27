"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock,
  Wrench,
  Search,
  Filter,
  Save,
  Loader2,
  Calendar,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/formatters";

interface BookingItem {
  id: string;
  bookingCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bikeModel: string;
  requestedDate: string;
  requestedTimeSlot: string;
  notes?: string | null;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "REJECTED";
  internalNotes?: string | null;
  createdAt: string;
  service: {
    id: string;
    name: string;
    estimatedDuration?: string | null;
  };
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);

  // Inspector State
  const [editStatus, setEditStatus] = useState<string>("PENDING");
  const [editNotes, setEditNotes] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editSlot, setEditSlot] = useState("");
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.append("status", statusFilter);

      const res = await fetch(`/api/admin/bookings?${params.toString()}`);
      const data = await res.json();
      if (data.bookings) setBookings(data.bookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const openInspector = (b: BookingItem) => {
    setSelectedBooking(b);
    setEditStatus(b.status);
    setEditNotes(b.internalNotes || "");
    setEditDate(b.requestedDate.split("T")[0]);
    setEditSlot(b.requestedTimeSlot);
    setMessage(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setUpdating(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/bookings/${selectedBooking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          internalNotes: editNotes,
          requestedDate: editDate,
          requestedTimeSlot: editSlot,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update booking");

      setMessage("Workshop appointment updated successfully.");
      setSelectedBooking(data.booking);
      fetchBookings();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error saving");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-forest-950 text-forest-300 border-forest-800";
      case "PENDING":
        return "bg-amber-950 text-amber-300 border-amber-800";
      case "COMPLETED":
        return "bg-sky-950 text-sky-300 border-sky-800";
      case "CANCELLED":
      case "REJECTED":
        return "bg-red-950 text-red-300 border-red-800";
      default:
        return "bg-charcoal-800 text-charcoal-400 border-charcoal-700";
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div>
        <span className="text-xs font-mono text-forest-400 font-bold uppercase tracking-wider">
          Workshop Operations
        </span>
        <h1 className="text-2xl font-display font-bold text-white mt-0.5">
          Service Bookings & Bay Scheduling
        </h1>
        <p className="text-xs text-charcoal-400 mt-1">
          Review appointment requests, confirm bay times, and record mechanic completion notes.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-4 flex items-center gap-1.5 overflow-x-auto">
        {[
          { id: "ALL", label: "All Bookings" },
          { id: "PENDING", label: "Pending Review" },
          { id: "CONFIRMED", label: "Confirmed" },
          { id: "COMPLETED", label: "Completed" },
          { id: "CANCELLED", label: "Cancelled / Rejected" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === tab.id
                ? "bg-forest-800 text-white"
                : "bg-charcoal-800 text-charcoal-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl overflow-hidden shadow-card">
        {loading ? (
          <div className="p-12 text-center text-charcoal-400 flex items-center justify-center gap-2 text-xs">
            <Loader2 className="w-4 h-4 animate-spin text-forest-400" />
            <span>Loading workshop appointments...</span>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center text-charcoal-400 space-y-2">
            <Wrench className="w-10 h-10 text-charcoal-600 mx-auto" />
            <h4 className="text-white text-sm font-bold">No bookings in this view</h4>
            <p className="text-xs">Select another status filter or wait for customer reservations.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-charcoal-800 bg-charcoal-950/60 text-[11px] font-mono uppercase text-charcoal-400">
                  <th className="py-3 px-4">Booking Code</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Requested Service</th>
                  <th className="py-3 px-4">Bike Model</th>
                  <th className="py-3 px-4">Target Date & Slot</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800/60">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-charcoal-850/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      {b.bookingCode}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-white block">{b.customerName}</span>
                      <span className="text-charcoal-400 text-[11px]">{b.customerPhone}</span>
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-200 font-medium">
                      {b.service?.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-charcoal-300">
                      {b.bikeModel}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-charcoal-300">
                      <span className="text-white block font-semibold">{formatDate(b.requestedDate)}</span>
                      <span className="text-charcoal-500">{b.requestedTimeSlot}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded border uppercase font-bold ${getStatusBadge(
                          b.status
                        )}`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openInspector(b)}
                        className="px-3 py-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-200 text-xs font-semibold transition-colors"
                      >
                        Manage Bay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booking Inspector Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-charcoal-900 border border-charcoal-750 rounded-2xl w-full max-w-xl p-6 sm:p-8 shadow-2xl relative text-charcoal-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-charcoal-800 pb-3 mb-4">
              <div>
                <span className="text-xs font-mono text-forest-400 font-bold uppercase tracking-wider">
                  Workshop Appointment • {selectedBooking.bookingCode}
                </span>
                <h3 className="text-xl font-display font-bold text-white mt-0.5">
                  {selectedBooking.service?.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
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

            <div className="bg-charcoal-850 p-4 rounded-xl border border-charcoal-750 text-xs space-y-1.5 mb-4">
              <p>
                <strong className="text-white">Customer:</strong> {selectedBooking.customerName} (
                <a href={`mailto:${selectedBooking.customerEmail}`} className="text-blaze-400 underline">
                  {selectedBooking.customerEmail}
                </a>{" "}
                • {selectedBooking.customerPhone})
              </p>
              <p>
                <strong className="text-white">Bike Make & Model:</strong> {selectedBooking.bikeModel}
              </p>
              {selectedBooking.notes && (
                <p className="text-charcoal-300 pt-1 border-t border-charcoal-750">
                  <strong className="text-white">Customer Notes:</strong> {selectedBooking.notes}
                </p>
              )}
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal-300 mb-1">
                    Booking Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                  >
                    <option value="PENDING">Pending (Bay under review)</option>
                    <option value="CONFIRMED">Confirmed (Bay reserved)</option>
                    <option value="COMPLETED">Completed (Service finished)</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal-300 mb-1">
                    Scheduled Bay Date
                  </label>
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-300 mb-1">
                  Time Slot
                </label>
                <select
                  value={editSlot}
                  onChange={(e) => setEditSlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                >
                  <option value="09:00 AM - 11:00 AM">Morning: 09:00 AM - 11:00 AM</option>
                  <option value="11:30 AM - 01:30 PM">Midday: 11:30 AM - 01:30 PM</option>
                  <option value="02:00 PM - 04:00 PM">Afternoon: 02:00 PM - 04:00 PM</option>
                  <option value="04:00 PM - 05:30 PM">Late Afternoon: 04:00 PM - 05:30 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal-300 mb-1">
                  Lead Mechanic & Workshop Internal Notes
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Mechanic assigned, replacement seals used, torque checks completed..."
                  className="w-full px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 rounded-xl bg-charcoal-800 text-charcoal-300 text-xs font-semibold"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-5 py-2 rounded-xl bg-forest-700 hover:bg-forest-600 text-white font-bold text-xs uppercase tracking-wide flex items-center gap-1.5 shadow-glow-forest disabled:opacity-50"
                >
                  {updating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Bay Schedule</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
