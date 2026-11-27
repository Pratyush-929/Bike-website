import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let settings = await prisma.companySetting.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.companySetting.create({
        data: { id: "default" },
      });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Only Super Admins can modify company settings" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
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
      lowStockThresholdDefault,
      emailNotificationsEnabled,
      notificationRecipientEmail,
      smtpHost,
      smtpPort,
      smtpUser,
    } = body;

    const updated = await prisma.companySetting.upsert({
      where: { id: "default" },
      update: {
        brandName: brandName?.trim(),
        tagline: tagline?.trim(),
        companyDescription: companyDescription?.trim(),
        aboutMission: aboutMission?.trim(),
        aboutVision: aboutVision?.trim(),
        aboutPhilosophy: aboutPhilosophy?.trim(),
        contactEmail: contactEmail?.trim(),
        contactPhone: contactPhone?.trim(),
        whatsappNumber: whatsappNumber?.trim(),
        physicalAddress: physicalAddress?.trim(),
        businessHours: businessHours?.trim(),
        currencyCode: currencyCode?.trim() || "USD",
        currencySymbol: currencySymbol?.trim() || "$",
        heroHeadline: heroHeadline?.trim(),
        heroSubheadline: heroSubheadline?.trim(),
        heroImageUrl: heroImageUrl?.trim(),
        lowStockThresholdDefault: Number(lowStockThresholdDefault) || 3,
        emailNotificationsEnabled: Boolean(emailNotificationsEnabled),
        notificationRecipientEmail: notificationRecipientEmail?.trim(),
        smtpHost: smtpHost?.trim() || null,
        smtpPort: smtpPort ? Number(smtpPort) : null,
        smtpUser: smtpUser?.trim() || null,
      },
      create: {
        id: "default",
        brandName: brandName?.trim() || "TERRA CYCLES",
        tagline: tagline?.trim() || "Built for the Trails. Ready for Anything.",
        companyDescription: companyDescription?.trim() || "Engineered for extreme descents, technical climbs, and rugged alpine trails.",
        currencyCode: currencyCode?.trim() || "USD",
        currencySymbol: currencySymbol?.trim() || "$",
      },
    });

    await logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "SETTINGS_UPDATED",
      entityType: "SETTINGS",
      entityId: "default",
      details: { brandName: updated.brandName, currency: updated.currencyCode },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
