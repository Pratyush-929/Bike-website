import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (status && status !== "ALL") {
      where.status = status;
    }
    if (type && type !== "ALL") {
      where.inquiryType = type;
    }
    if (search && search.trim()) {
      where.OR = [
        { fullName: { contains: search.trim() } },
        { email: { contains: search.trim() } },
        { subject: { contains: search.trim() } },
        { inquiryCode: { contains: search.trim() } },
      ];
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}
