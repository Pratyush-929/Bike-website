"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, MessageSquare, AlertCircle, Loader2 } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productSku?: string;
  inquiryType?: string;
  whatsappNumber?: string;
}

export default function InquiryModal({
  isOpen,
  onClose,
  productName,
  productSku,
  inquiryType = "GENERAL",
  whatsappNumber = "+15415558724",
}: InquiryModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(
    productName ? `Inquiry regarding ${productName} (SKU: ${productSku})` : ""
  );
  const [message, setMessage] = useState(
    productName
      ? `Hello, I am interested in ${productName}. Could you provide details on current availability, sizing, and delivery options?`
      : ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    inquiryCode: string;
    message: string;
    whatsAppUrl?: string;
  } | null>(null);

  if (!isOpen) return null;

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
          subject: subject || (productName ? `Inquiry for ${productName}` : "General Trail Inquiry"),
          message,
          inquiryType: productName ? "BIKE_PURCHASE" : inquiryType,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry. Please try again.");
      }

      setSuccessData({
        inquiryCode: data.inquiryCode,
        message: data.message,
        whatsAppUrl: data.whatsAppUrl,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
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

        {successData ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-blaze-600 uppercase tracking-wider">
                Inquiry Logged in Database
              </span>
              <h3 className="text-xl font-display font-bold text-slate-950 mt-1">
                Thank You, {fullName}!
              </h3>
              <div className="mt-3 inline-block bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-700">
                Inquiry Reference Code:{" "}
                <strong className="text-slate-950">{successData.inquiryCode}</strong>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              Your inquiry has been assigned a reference ID and routed to our store team. You will receive a reply at{" "}
              <strong className="text-slate-950">{email}</strong>.
            </p>

            {successData.whatsAppUrl && (
              <div className="pt-2">
                <a
                  href={successData.whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp with Inquiry Details</span>
                </a>
              </div>
            )}

            <button
              onClick={handleReset}
              className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors mt-2"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-blaze-600 uppercase tracking-wider">
                Direct Store Inquiry
              </span>
              <h3 className="text-2xl font-display font-extrabold text-slate-950 mt-1">
                {productName ? `Inquire: ${productName}` : "Contact Bike Specialist"}
              </h3>
              {productSku && (
                <div className="text-xs font-mono text-slate-500 mt-0.5">
                  SKU: <span className="text-slate-800 font-semibold">{productSku}</span>
                </div>
              )}
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
                  Full Name <span className="text-blaze-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Henderson"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blaze-600 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-blaze-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rider@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blaze-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blaze-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject <span className="text-blaze-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject of your inquiry"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blaze-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Message or Sizing Questions <span className="text-blaze-600">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your height, riding style, or specific component questions..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blaze-600 transition-colors resize-none"
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
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Official Inquiry</span>
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
