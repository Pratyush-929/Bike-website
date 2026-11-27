"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Wrench } from "lucide-react";

interface HeroSliderProps {
  heroHeadline: string;
  heroSubheadline: string;
  heroImageUrl: string;
  brandName: string;
}

export default function HeroSlider({
  heroHeadline,
  heroSubheadline,
  heroImageUrl,
  brandName,
}: HeroSliderProps) {
  const slides = [
    {
      badge: "New 2026 MTB Lineup",
      title: heroHeadline,
      subtitle: heroSubheadline,
      image: heroImageUrl,
      primaryCta: { label: "Shop Mountain Bikes", href: "/bikes" },
      secondaryCta: { label: "View Enduro Range", href: "/bikes?category=enduro-bikes" },
    },
    {
      badge: "Factory Components & Suspension",
      title: "Dialed Forks, Tires & Drivetrain Upgrades",
      subtitle:
        "Genuine Fox Racing Shox, SRAM Eagle Transmission, DT Swiss wheelsets, and Maxxis 3C MaxxGrip rubber ready to ship.",
      image:
        "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=2000&q=80",
      primaryCta: { label: "Browse Components", href: "/parts" },
      secondaryCta: { label: "Rider Gear & Helmets", href: "/accessories" },
    },
    {
      badge: "Pick-Up & Drop-Off Service",
      title: "Certified Suspension & Race Workshop",
      subtitle:
        "200-hour damper rebuilds, vacuum brake bleeds, and custom frame builds backed by factory-trained mechanics.",
      image:
        "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=2000&q=80",
      primaryCta: { label: "Book Service Bay", href: "/services" },
      secondaryCta: { label: "Contact Mechanics", href: "/contact" },
    },
  ];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  const slide = slides[current];

  return (
    <section
      className="relative bg-zinc-950 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[480px] sm:h-[540px] lg:h-[580px] w-full">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === current ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center brightness-[0.5]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/55 to-transparent" />
          </div>
        ))}

        {/* Slide Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blaze-600 text-white text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{slide.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight leading-[1.06]">
              {slide.title}
            </h1>

            <p className="text-sm sm:text-lg text-zinc-200 max-w-xl leading-relaxed">
              {slide.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={slide.primaryCta.href}
                className="px-6 py-3.5 rounded-lg bg-blaze-600 hover:bg-blaze-500 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
              >
                <span>{slide.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={slide.secondaryCta.href}
                className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/25 backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <Wrench className="w-4 h-4 text-blaze-400" />
                <span>{slide.secondaryCta.label}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Left / Right Controls */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/45 hover:bg-blaze-600 text-white items-center justify-center backdrop-blur-sm transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/45 hover:bg-blaze-600 text-white items-center justify-center backdrop-blur-sm transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Dots & Brand Tag */}
        <div className="absolute bottom-5 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === current ? "w-8 bg-blaze-500" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
          <span className="hidden sm:inline text-[11px] font-mono text-zinc-300 uppercase tracking-widest">
            {brandName} • Official Storefront
          </span>
        </div>
      </div>
    </section>
  );
}
