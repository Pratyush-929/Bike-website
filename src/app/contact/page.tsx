import React from "react";
import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact PRATYUSH WORLD with questions about mountain bike models, categories, or comparisons.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#0B0D0C] text-white min-h-screen">
      <ContactSection />
    </div>
  );
}
