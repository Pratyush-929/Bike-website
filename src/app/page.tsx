import React from "react";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeaturedBikes from "@/components/FeaturedBikes";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div className="bg-[#0B0D0C] text-white">
      <HeroSection />
      <CategorySection />
      <FeaturedBikes />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
