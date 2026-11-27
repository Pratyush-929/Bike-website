import React from "react";
import prisma from "@/lib/prisma";
import { getCompanySettings } from "@/lib/settings";
import ServicesClient from "./ServicesClient";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    prisma.serviceItem.findMany({
      where: { isEnabled: true },
      orderBy: { displayOrder: "asc" },
    }),
    getCompanySettings(),
  ]);

  return (
    <div className="bg-white">
      <div className="bg-slate-50 border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold text-blaze-600 uppercase tracking-wider">
            Technical Service Bay • Pick-Up &amp; Drop-Off
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-950 mt-1 uppercase tracking-tight">
            Certified MTB Workshop &amp; Suspension Tuning
          </h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Certified Fox Factory, RockShox, Shimano &amp; SRAM technical services. Ultrasonic drivetrain cleaning, vacuum brake bleeding, wiper seal rebuilds, and custom race builds.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ServicesClient
          services={services}
          currencySymbol={settings.currencySymbol || "$"}
        />
      </div>
    </div>
  );
}
