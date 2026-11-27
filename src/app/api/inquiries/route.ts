import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateCode } from "@/lib/formatters";
import { logAudit } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, subject, message, inquiryType = "GENERAL" } = body;

    // Strict validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json({ error: "Please enter a valid full name (minimum 2 characters)" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }
    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      return NextResponse.json({ error: "Please enter a subject (minimum 3 characters)" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json({ error: "Please enter a message (minimum 5 characters)" }, { status: 400 });
    }

    // Generate unique inquiry code
    const inquiryCode = generateCode("INQ");

    // Fetch company settings to check email/WhatsApp configuration
    const settings = await prisma.companySetting.findUnique({
      where: { id: "default" },
    });

    // Check if email integration is configured
    // Requirements: "If email or WhatsApp configuration is missing, save the inquiry successfully and display an appropriate status in the admin panel."
    const emailConfigured = Boolean(
      settings?.emailNotificationsEnabled &&
      settings?.smtpHost &&
      process.env.SMTP_HOST
    );

    const inquiry = await prisma.inquiry.create({
      data: {
        inquiryCode,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? String(phone).trim() : null,
        subject: subject.trim(),
        message: message.trim(),
        inquiryType,
        status: "NEW",
        emailNotificationSent: false,
        emailNotificationStatus: emailConfigured ? "PENDING" : "NOT_CONFIGURED",
      },
    });

    // Audit log
    await logAudit({
      action: "INQUIRY_CREATED",
      entityType: "INQUIRY",
      entityId: inquiry.id,
      details: {
        inquiryCode,
        email: inquiry.email,
        type: inquiry.inquiryType,
      },
    });

    // Prepare WhatsApp click-to-chat URL targeting PRATYUSH WORLD WhatsApp (+977 9864004444)
    const targetBrand = "PRATYUSH WORLD";
    const rawWa = settings?.whatsappNumber || "+9779864004444";
    const digitsOnly = rawWa.replace(/[^0-9]/g, "");
    const cleanPhone = digitsOnly.length === 10 && digitsOnly.startsWith("98")
      ? `977${digitsOnly}`
      : digitsOnly || "9779864004444";

    const prefilledText = [
      `Hello ${targetBrand}, I have a new contact message (${inquiryCode}):`,
      `Name: ${fullName.trim()}`,
      `Email: ${email.trim()}`,
      `Subject: ${subject.trim()}`,
      `Message: ${message.trim()}`,
    ].join("\n");
    const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(prefilledText)}`;

    return NextResponse.json({
      success: true,
      inquiryId: inquiry.id,
      inquiryCode: inquiry.inquiryCode,
      message: "Your inquiry has been successfully received and logged in our system.",
      emailStatus: inquiry.emailNotificationStatus,
      whatsAppUrl,
    });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while saving your inquiry. Please try again." },
      { status: 500 }
    );
  }
}
