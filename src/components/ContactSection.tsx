"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, MessageSquare } from "lucide-react";

const WHATSAPP_FALLBACK_NUMBER = "9779864004444";

export default function ContactSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    inquiryCode: string;
    whatsAppUrl: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = fullName.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    if (cleanName.length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (cleanSubject.length < 3) {
      setError("Please enter a subject (at least 3 characters).");
      return;
    }
    if (cleanMessage.length < 5) {
      setError("Please enter a message (at least 5 characters).");
      return;
    }

    setLoading(true);
    // Open tab synchronously within user click gesture so popup blockers allow WhatsApp launch
    const waWindow = window.open("about:blank", "_blank");
    if (waWindow) {
      waWindow.opener = null;
    }

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: cleanName,
          email: cleanEmail,
          subject: cleanSubject,
          message: cleanMessage,
          inquiryType: "GENERAL",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (waWindow) waWindow.close();
        throw new Error(data.error || "Unable to save your message.");
      }

      const fallbackText = [
        `Hello PRATYUSH WORLD, I have a new contact message (${data.inquiryCode}):`,
        `Name: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `Subject: ${cleanSubject}`,
        `Message: ${cleanMessage}`,
      ].join("\n");

      const whatsAppUrl =
        data.whatsAppUrl ||
        `https://wa.me/${WHATSAPP_FALLBACK_NUMBER}?text=${encodeURIComponent(fallbackText)}`;

      setSuccessInfo({
        inquiryCode: data.inquiryCode,
        whatsAppUrl,
      });

      if (waWindow) {
        waWindow.location.href = whatsAppUrl;
      } else {
        window.open(whatsAppUrl, "_blank", "noopener,noreferrer");
      }

      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      if (waWindow && !waWindow.closed) waWindow.close();
      setError(err instanceof Error ? err.message : "An error occurred while submitting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#151917]/40 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A3E635]">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight mt-1">
            Contact PRATYUSH WORLD
          </h2>
          <p className="text-sm text-[#A1A1AA] mt-2 max-w-xl mx-auto">
            Have a question about a mountain bike model, category, or comparison? Send your message directly to our WhatsApp (+977 9864004444) below.
          </p>
        </div>

        <div className="bg-[#151917] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {successInfo ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-14 h-14 rounded-full bg-[#4CAF50]/15 border border-[#4CAF50]/50 text-[#A3E635] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-extrabold text-white">
                  Ready to Send on WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
                  Your message has been logged under reference{" "}
                  <strong className="text-white font-mono">{successInfo.inquiryCode}</strong> and WhatsApp was launched for{" "}
                  <strong className="text-white">+977 9864004444</strong>. If WhatsApp did not open automatically, click the button below.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <a
                  href={successInfo.whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0B0D0C] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp (9864004444)</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSuccessInfo(null)}
                  className="px-6 py-3.5 rounded-xl bg-[#0B0D0C] hover:bg-white/5 text-white border border-white/15 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-700/60 text-red-200 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Name <span className="text-[#A3E635]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0D0C] border border-white/15 text-white text-sm placeholder-[#A1A1AA]/60 focus:outline-none focus:border-[#4CAF50] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Email <span className="text-[#A3E635]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0D0C] border border-white/15 text-white text-sm placeholder-[#A1A1AA]/60 focus:outline-none focus:border-[#4CAF50] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  Subject <span className="text-[#A3E635]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Question about Enduro bikes"
                  className="w-full px-4 py-3 rounded-xl bg-[#0B0D0C] border border-white/15 text-white text-sm placeholder-[#A1A1AA]/60 focus:outline-none focus:border-[#4CAF50] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  Message <span className="text-[#A3E635]">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl bg-[#0B0D0C] border border-white/15 text-white text-sm placeholder-[#A1A1AA]/60 focus:outline-none focus:border-[#4CAF50] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#4CAF50] hover:bg-[#43a047] text-[#0B0D0C] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing WhatsApp Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to WhatsApp</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-[#A1A1AA] text-center flex items-center justify-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#4CAF50]" />
                <span>Opens WhatsApp (+977 9864004444) with your pre-filled message and saves a record locally.</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
