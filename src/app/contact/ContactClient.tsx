"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface ContactClientProps {
  settings: any;
}

export default function ContactClient({ settings }: ContactClientProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState("GENERAL");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    inquiryCode: string;
    message: string;
    whatsAppUrl?: string;
  } | null>(null);

  const cleanWhatsApp = settings.whatsappNumber
    ? settings.whatsappNumber.replace(/[^0-9]/g, "")
    : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          inquiryType,
          subject,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setSuccessData({
        inquiryCode: data.inquiryCode,
        message: data.message,
        whatsAppUrl: data.whatsAppUrl,
      });

      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error submitting inquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Left Column: Store & Workshop HQ Info */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5">
          <h3 className="text-xl font-display font-extrabold text-slate-950 uppercase tracking-tight border-b border-slate-200 pb-3">
            Showroom &amp; Workshop HQ
          </h3>

          <div className="space-y-4 text-xs text-slate-700">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blaze-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-950 block mb-0.5">Physical Address:</strong>
                <p className="text-slate-600 leading-relaxed">{settings.physicalAddress}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blaze-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-950 block mb-0.5">Phone Hotline:</strong>
                <a
                  href={`tel:${settings.contactPhone.replace(/[^0-9+]/g, "")}`}
                  className="text-slate-700 hover:text-blaze-600 transition-colors"
                >
                  {settings.contactPhone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blaze-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-950 block mb-0.5">Email:</strong>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="text-slate-700 hover:text-blaze-600 transition-colors"
                >
                  {settings.contactEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-950 block mb-0.5">Opening Hours:</strong>
                <p className="text-slate-600 leading-relaxed">{settings.businessHours}</p>
              </div>
            </div>
          </div>

          {cleanWhatsApp && (
            <div className="pt-2">
              <a
                href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                  `Hello ${settings.brandName}, I have an inquiry about mountain bikes and workshop service availability.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Store on WhatsApp</span>
              </a>
            </div>
          )}
        </div>

        {/* Map Embed */}
        <div className="bg-slate-100 border border-slate-200 rounded-2xl overflow-hidden h-64 relative">
          <iframe
            title="Store Location Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-121.56%2C45.68%2C-121.48%2C45.74&amp;layer=mapnik"
            className="w-full h-full border-0"
            loading="lazy"
          />
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-900 shadow-sm">
            {settings.brandName} Workshop Bay
          </div>
        </div>
      </div>

      {/* Right Column: Contact Form */}
      <div className="lg:col-span-7">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          {successData ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold text-blaze-600 uppercase tracking-wider">
                  Logged in System Database
                </span>
                <h3 className="text-2xl font-display font-extrabold text-slate-950 mt-1">
                  Inquiry Successfully Received
                </h3>
                <div className="mt-3 inline-block bg-slate-100 border border-slate-200 px-4 py-2 rounded-lg text-xs font-mono text-slate-700">
                  Ticket Reference Code:{" "}
                  <strong className="text-slate-950">{successData.inquiryCode}</strong>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                Your message has been assigned an inquiry ticket and sent to our team. We will reply to{" "}
                <strong className="text-slate-950">{email}</strong>.
              </p>

              {successData.whatsAppUrl && (
                <div className="pt-3 max-w-sm mx-auto">
                  <a
                    href={successData.whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Pre-filled Details via WhatsApp</span>
                  </a>
                </div>
              )}

              <button
                onClick={() => setSuccessData(null)}
                className="py-2.5 px-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold mt-3 transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold text-blaze-600 uppercase tracking-wider">
                  Direct Dispatch Form
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950 mt-1 uppercase">
                  Send an Official Inquiry
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  All submissions are automatically assigned an inquiry ticket and reviewed by our technicians.
                </p>
              </div>

              {error && (
                <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name <span className="text-blaze-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Jordan Hayes"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blaze-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address <span className="text-blaze-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rider@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blaze-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (541) 555-0192"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blaze-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Inquiry Category <span className="text-blaze-600">*</span>
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-blaze-600"
                    >
                      <option value="GENERAL">General Information</option>
                      <option value="BIKE_PURCHASE">Bike Purchase &amp; Sizing</option>
                      <option value="PARTS_ADVICE">Spare Parts &amp; Compatibility</option>
                      <option value="SERVICE_QUESTION">Workshop &amp; Suspension Service</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Subject <span className="text-blaze-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Sizing recommendation for Ridgeback Carbon 29"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blaze-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Message Details <span className="text-blaze-600">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please include details about your rider height, local trail terrain, or specific components..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blaze-600 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-lg bg-blaze-600 hover:bg-blaze-700 text-white font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Logging Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry Ticket</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
