import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateCode } from "@/lib/formatters";
import { logAudit } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      serviceId,
      customerName,
      customerEmail,
      customerPhone,
      bikeModel,
      requestedDate,
      requestedTimeSlot,
      notes,
    } = body;

    if (!serviceId) {
      return NextResponse.json({ error: "Please select a workshop service" }, { status: 400 });
    }
    if (!customerName || customerName.trim().length < 2) {
      return NextResponse.json({ error: "Please enter your full name" }, { status: 400 });
    }
    if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }
    if (!customerPhone || customerPhone.trim().length < 7) {
      return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 });
    }
    if (!bikeModel || bikeModel.trim().length < 2) {
      return NextResponse.json({ error: "Please provide your bike model" }, { status: 400 });
    }
    if (!requestedDate) {
      return NextResponse.json({ error: "Please pick a requested appointment date" }, { status: 400 });
    }

    // Verify service exists and is enabled
    const service = await prisma.serviceItem.findUnique({
      where: { id: serviceId },
    });
    if (!service || !service.isEnabled) {
      return NextResponse.json({ error: "The selected service is currently unavailable" }, { status: 400 });
    }

    const bookingCode = generateCode("SRV");
    const parsedDate = new Date(requestedDate);

    // Save as PENDING (not confirmed until workshop reviews bay availability)
    const booking = await prisma.serviceBooking.create({
      data: {
        bookingCode,
        serviceId,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim().toLowerCase(),
        customerPhone: customerPhone.trim(),
        bikeModel: bikeModel.trim(),
        requestedDate: parsedDate,
        requestedTimeSlot: requestedTimeSlot || "09:00 AM - 11:00 AM",
        notes: notes ? notes.trim() : null,
        status: "PENDING",
      },
      include: {
        service: true,
      },
    });

    await logAudit({
      action: "SERVICE_BOOKING_CREATED",
      entityType: "SERVICE_BOOKING",
      entityId: booking.id,
      details: {
        bookingCode,
        service: booking.service.name,
        date: requestedDate,
        customer: customerName,
      },
    });

    return NextResponse.json({
      success: true,
      bookingCode: booking.bookingCode,
      status: booking.status,
      message: "Your service appointment request has been recorded. Our service manager will review and confirm your slot.",
    });
  } catch (error) {
    console.error("Error creating service booking:", error);
    return NextResponse.json(
      { error: "Failed to record your service booking request. Please try again." },
      { status: 500 }
    );
  }
}
