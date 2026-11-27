"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Clock, Calendar, ShieldCheck } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import { formatPrice } from "@/lib/formatters";

interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string | null;
  priceInCents?: number | null;
  estimatedDuration?: string | null;
  imageUrl?: string | null;
}

interface ServicesClientProps {
  services: ServiceItem[];
  currencySymbol: string;
}

export default function ServicesClient({ services, currencySymbol }: ServicesClientProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleBook = (s: ServiceItem) => {
    setSelectedService(s);
    setBookingModalOpen(true);
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div
            key={s.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            {s.imageUrl && (
              <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                <Image
                  src={s.imageUrl}
                  alt={s.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-800 shadow-sm">
                  {s.estimatedDuration || "Factory Service"}
                </div>
              </div>
            )}

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-xl font-display font-bold text-slate-950 group-hover:text-blaze-600 transition-colors">
                    {s.name}
                  </h3>
                  {s.priceInCents ? (
                    <span className="text-xl font-display font-black text-slate-950 shrink-0">
                      {formatPrice(s.priceInCents, "USD", currencySymbol)}
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-500 uppercase">
                      Quote on inspect
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  {s.description}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <Clock className="w-3.5 h-3.5 text-blaze-600" />
                  <span>Turnaround: {s.estimatedDuration || "Same Day"}</span>
                </div>
                <button
                  onClick={() => handleBook(s)}
                  className="px-4 py-2.5 rounded-lg bg-blaze-600 hover:bg-blaze-700 text-white font-bold text-xs uppercase tracking-wide flex items-center gap-2 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Workshop Standards Banner */}
      <div className="bg-zinc-950 text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-blaze-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Factory Diagnostic &amp; Pick-Up / Drop-Off</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold">
            Need a Custom Wheel Build or Frame Wrapping?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
            We work with DT Swiss spokes, Sapim CX-Ray, Chris King hubs, and RideWrap tailor-cut protective kits.
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedService(services[0] || null);
            setBookingModalOpen(true);
          }}
          className="px-6 py-3.5 rounded-lg bg-blaze-600 hover:bg-blaze-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
        >
          Schedule Bay Time
        </button>
      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        service={selectedService}
        allServices={services}
      />
    </div>
  );
}
