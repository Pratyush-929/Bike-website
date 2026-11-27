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
    const { status, internalNotes, followUpDate } = await req.json();

    const existing = await prisma.inquiry.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    const updated = await prisma.inquiry.update({
      where: { id: params.id },
      data: {
        status: status !== undefined ? status : existing.status,
        internalNotes: internalNotes !== undefined ? internalNotes : existing.internalNotes,
        followUpDate: followUpDate !== undefined ? (followUpDate ? new Date(followUpDate) : null) : existing.followUpDate,
      },
    });

    await logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "INQUIRY_UPDATED",
      entityType: "INQUIRY",
      entityId: updated.id,
      details: {
        inquiryCode: updated.inquiryCode,
        status: updated.status,
      },
    });

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}
