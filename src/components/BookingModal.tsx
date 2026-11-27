"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, Wrench, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ServiceOption {
  id: string;
  name: string;
  priceInCents?: number | null;
  estimatedDuration?: string | null;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: ServiceOption | null;
  allServices?: ServiceOption[];
}

export default function BookingModal({
  isOpen,
  onClose,
  service,
  allServices = [],
}: BookingModalProps) {
  const [selectedServiceId, setSelectedServiceId] = useState(
    service?.id || allServices[0]?.id || ""
  );
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bikeModel, setBikeModel] = useState("");
  const [requestedDate, setRequestedDate] = useState("");
  const [requestedTimeSlot, setRequestedTimeSlot] = useState("09:00 AM - 11:00 AM");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    bookingCode: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    if (service?.id) {
      setSelectedServiceId(service.id);
    }
  }, [service]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedServiceId || service?.id,
          customerName,
          customerEmail,
          customerPhone,
          bikeModel,
          requestedDate,
          requestedTimeSlot,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit workshop booking request");
      }

      setConfirmedBooking({
        bookingCode: data.bookingCode,
        status: data.status,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative text-slate-900 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBooking ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Booking Request Recorded (Status: PENDING)
              </span>
              <h3 className="text-xl font-display font-bold text-slate-950 mt-1">
                Workshop Appointment Requested
              </h3>
              <div className="mt-3 inline-block bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-700">
                Booking Code: <strong className="text-slate-950">{confirmedBooking.bookingCode}</strong>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs text-slate-700 space-y-1.5">
              <p>
                <strong className="text-slate-950">Customer:</strong> {customerName}
              </p>
              <p>
                <strong className="text-slate-950">Bike:</strong> {bikeModel}
              </p>
              <p>
                <strong className="text-slate-950">Requested Date:</strong> {requestedDate} (
                {requestedTimeSlot})
              </p>
              <p className="text-amber-700 pt-2 text-[11px] border-t border-slate-200">
                Notice: To prevent double-booking our workshop bays, this appointment is currently{" "}
                <strong>Pending Review</strong>. Our service manager will verify bay availability and confirm shortly.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2.5 rounded-lg bg-blaze-600 hover:bg-blaze-700 text-white text-xs font-bold transition-colors mt-2"
            >
              Done &amp; Return to Site
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-blaze-600 uppercase tracking-wider flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                Technical Workshop Bay Reservation
              </span>
              <h3 className="text-2xl font-display font-extrabold text-slate-950 mt-1">
                Book MTB Service Appointment
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Factory certified Fox, RockShox, Shimano &amp; SRAM suspension and drivetrain overhauls.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Selected Service <span className="text-blaze-600">*</span>
                </label>
                {allServices.length > 0 ? (
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blaze-600"
                  >
                    {allServices.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} {s.estimatedDuration ? `(${s.estimatedDuration})` : ""}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    disabled
                    value={service?.name || "Factory Service"}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-sm"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-blaze-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Marcus Reid"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blaze-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-blaze-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="marcus@example.com"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blaze-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-blaze-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blaze-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bike Make &amp; Model <span className="text-blaze-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={bikeModel}
                    onChange={(e) => setBikeModel(e.target.value)}
                    placeholder="e.g. Terra Ridgeback 2024"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blaze-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Requested Date <span className="text-blaze-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={requestedDate}
                    onChange={(e) => setRequestedDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blaze-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Time Window <span className="text-blaze-600">*</span>
                  </label>
                  <select
                    value={requestedTimeSlot}
                    onChange={(e) => setRequestedTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blaze-600"
                  >
                    <option value="09:00 AM - 11:00 AM">Morning: 09:00 AM - 11:00 AM</option>
                    <option value="11:30 AM - 01:30 PM">Midday: 11:30 AM - 01:30 PM</option>
                    <option value="02:00 PM - 04:00 PM">Afternoon: 02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 05:30 PM">Late Afternoon: 04:00 PM - 05:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Service Notes / Issues to Address
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe any unusual noises, air leakage, or pick-up request..."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blaze-600 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-lg bg-blaze-600 hover:bg-blaze-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Booking...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Submit Service Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
