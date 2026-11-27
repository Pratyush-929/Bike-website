import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { status, internalNotes, requestedDate, requestedTimeSlot } = await req.json();

    const existing = await prisma.serviceBooking.findUnique({
      where: { id: params.id },
      include: { service: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const updated = await prisma.serviceBooking.update({
      where: { id: params.id },
      data: {
        status: status !== undefined ? status : existing.status,
        internalNotes: internalNotes !== undefined ? internalNotes : existing.internalNotes,
        requestedDate: requestedDate ? new Date(requestedDate) : existing.requestedDate,
        requestedTimeSlot: requestedTimeSlot || existing.requestedTimeSlot,
      },
    });

    await logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "SERVICE_BOOKING_STATUS_CHANGE",
      entityType: "SERVICE_BOOKING",
      entityId: updated.id,
      details: {
        bookingCode: updated.bookingCode,
        status: updated.status,
        customer: updated.customerName,
      },
    });

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
