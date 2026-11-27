"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, AlertCircle, Loader2, Mail, Globe, Phone, MapPin } from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Settings State
  const [brandName, setBrandName] = useState("");
  const [tagline, setTagline] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [aboutMission, setAboutMission] = useState("");
  const [aboutVision, setAboutVision] = useState("");
  const [aboutPhilosophy, setAboutPhilosophy] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [heroHeadline, setHeroHeadline] = useState("");
  const [heroSubheadline, setHeroSubheadline] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [lowStockThresholdDefault, setLowStockThresholdDefault] = useState("3");
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false);
  const [notificationRecipientEmail, setNotificationRecipientEmail] = useState("");
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtUser] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          const s = data.settings;
          setBrandName(s.brandName || "TERRA CYCLES");
          setTagline(s.tagline || "");
          setCompanyDescription(s.companyDescription || "");
          setAboutMission(s.aboutMission || "");
          setAboutVision(s.aboutVision || "");
          setAboutPhilosophy(s.aboutPhilosophy || "");
          setContactEmail(s.contactEmail || "");
          setContactPhone(s.contactPhone || "");
          setWhatsappNumber(s.whatsappNumber || "");
          setPhysicalAddress(s.physicalAddress || "");
          setBusinessHours(s.businessHours || "");
          setCurrencyCode(s.currencyCode || "USD");
          setCurrencySymbol(s.currencySymbol || "$");
          setHeroHeadline(s.heroHeadline || "");
          setHeroSubheadline(s.heroSubheadline || "");
          setHeroImageUrl(s.heroImageUrl || "");
          setLowStockThresholdDefault(String(s.lowStockThresholdDefault ?? 3));
          setEmailNotificationsEnabled(Boolean(s.emailNotificationsEnabled));
          setNotificationRecipientEmail(s.notificationRecipientEmail || "");
          setSmtpHost(s.smtpHost || "");
          setSmtpPort(String(s.smtpPort || 587));
          setSmtUser(s.smtpUser || "");
        }
      })
      .catch((err) => setError("Failed to load settings"))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const payload = {
        brandName,
        tagline,
        companyDescription,
        aboutMission,
        aboutVision,
        aboutPhilosophy,
        contactEmail,
        contactPhone,
        whatsappNumber,
        physicalAddress,
        businessHours,
        currencyCode,
        currencySymbol,
        heroHeadline,
        heroSubheadline,
        heroImageUrl,
        lowStockThresholdDefault: parseInt(lowStockThresholdDefault) || 3,
        emailNotificationsEnabled,
        notificationRecipientEmail,
        smtpHost: smtpHost || null,
        smtpPort: parseInt(smtpPort) || 587,
        smtpUser: smtpUser || null,
      };

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update settings");

      setMessage("Brand and website settings saved successfully! Public website reflects all updates.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-charcoal-400 flex items-center justify-center gap-2 text-xs">
        <Loader2 className="w-5 h-5 animate-spin text-forest-400" />
        <span>Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      <div>
        <span className="text-xs font-mono text-blaze-500 font-bold uppercase tracking-wider">
          System Configuration
        </span>
        <h1 className="text-2xl font-display font-bold text-white mt-0.5">
          Company Identity & Website Settings
        </h1>
        <p className="text-xs text-charcoal-400 mt-1">
          Control brand names, hero headlines, contact details, currency symbols, and communication endpoints.
        </p>
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

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand & Identity */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-display font-bold text-white border-b border-charcoal-800 pb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blaze-500" />
            <span>Brand Identity & Navigation</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Brand Name <span className="text-blaze-500">*</span>
              </label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal-300 mb-1">
              Short Company Description (Displayed in Footer & Meta)
            </label>
            <textarea
              rows={2}
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Currency Code (ISO)
              </label>
              <input
                type="text"
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value)}
                placeholder="USD"
                className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white font-mono text-xs focus:outline-none focus:border-forest-500 uppercase"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Currency Symbol
              </label>
              <input
                type="text"
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                placeholder="$"
                className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white font-mono text-xs focus:outline-none focus:border-forest-500"
              />
            </div>
          </div>
        </div>

        {/* Homepage Hero Section */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-display font-bold text-white border-b border-charcoal-800 pb-3">
            Homepage Hero Section Content
          </h3>

          <div>
            <label className="block text-xs font-medium text-charcoal-300 mb-1">
              Hero Headline
            </label>
            <input
              type="text"
              value={heroHeadline}
              onChange={(e) => setHeroHeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal-300 mb-1">
              Hero Subheadline
            </label>
            <textarea
              rows={2}
              value={heroSubheadline}
              onChange={(e) => setHeroSubheadline(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal-300 mb-1">
              Hero Full-Width Mountain Trail Background Image URL
            </label>
            <input
              type="url"
              value={heroImageUrl}
              onChange={(e) => setHeroImageUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
            />
          </div>
        </div>

        {/* About Page Content */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-display font-bold text-white border-b border-charcoal-800 pb-3">
            About Us Page Editorial Content
          </h3>

          <div>
            <label className="block text-xs font-medium text-charcoal-300 mb-1">
              Brand Mission
            </label>
            <textarea
              rows={2}
              value={aboutMission}
              onChange={(e) => setAboutMission(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal-300 mb-1">
              Brand Vision
            </label>
            <textarea
              rows={2}
              value={aboutVision}
              onChange={(e) => setAboutVision(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal-300 mb-1">
              MTB Engineering & Testing Philosophy
            </label>
            <textarea
              rows={2}
              value={aboutPhilosophy}
              onChange={(e) => setAboutPhilosophy(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500 resize-none"
            />
          </div>
        </div>

        {/* Contact & Workshop HQ */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-display font-bold text-white border-b border-charcoal-800 pb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-forest-400" />
            <span>Contact & Physical Workshop HQ</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                WhatsApp Business Number
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs font-mono focus:outline-none focus:border-forest-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Physical Workshop Address
              </label>
              <input
                type="text"
                value={physicalAddress}
                onChange={(e) => setPhysicalAddress(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Business & Workshop Operating Hours
              </label>
              <input
                type="text"
                value={businessHours}
                onChange={(e) => setBusinessHours(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
              />
            </div>
          </div>
        </div>

        {/* Email & Notification Integration Status */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-display font-bold text-white border-b border-charcoal-800 pb-3 flex items-center gap-2">
            <Mail className="w-4 h-4 text-forest-400" />
            <span>Email Integration & Notifications</span>
          </h3>

          <div className="p-3.5 rounded-xl bg-charcoal-850 border border-charcoal-750 text-xs text-charcoal-300 space-y-1">
            <div className="font-semibold text-white">Integration Status:</div>
            <p>
              {emailNotificationsEnabled && smtpHost
                ? "Configured. Inquiries will trigger automated transactional notification dispatch."
                : "Not configured. Inquiries and service bookings are securely persisted in the database and shown as NOT_CONFIGURED."}
            </p>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs text-charcoal-300">
            <input
              type="checkbox"
              checked={emailNotificationsEnabled}
              onChange={(e) => setEmailNotificationsEnabled(e.target.checked)}
              className="rounded bg-charcoal-800 border-charcoal-700 text-forest-500"
            />
            <span className="font-semibold text-white">Enable Automated Email Dispatch</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                Notification Recipient Email
              </label>
              <input
                type="email"
                value={notificationRecipientEmail}
                onChange={(e) => setNotificationRecipientEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                SMTP Server Host
              </label>
              <input
                type="text"
                placeholder="smtp.example.com"
                value={smtpHost}
                onChange={(e) => setSmtpHost(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs font-mono focus:outline-none focus:border-forest-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-300 mb-1">
                SMTP Port
              </label>
              <input
                type="number"
                value={smtpPort}
                onChange={(e) => setSmtpPort(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs font-mono focus:outline-none focus:border-forest-500"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-blaze-600 hover:bg-blaze-500 text-white font-bold text-xs uppercase tracking-wide flex items-center gap-2 shadow-glow disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Commit System Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
