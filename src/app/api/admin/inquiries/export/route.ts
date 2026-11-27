import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Generate CSV
    const headers = [
      "Inquiry ID",
      "Date",
      "Full Name",
      "Email",
      "Phone",
      "Type",
      "Subject",
      "Message",
      "Status",
      "Email Status",
      "Internal Notes",
    ];

    const escapeCsv = (str: string | null | undefined) => {
      if (!str) return '""';
      const clean = String(str).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = inquiries.map((inq) => [
      escapeCsv(inq.inquiryCode),
      escapeCsv(inq.createdAt.toISOString()),
      escapeCsv(inq.fullName),
      escapeCsv(inq.email),
      escapeCsv(inq.phone),
      escapeCsv(inq.inquiryType),
      escapeCsv(inq.subject),
      escapeCsv(inq.message),
      escapeCsv(inq.status),
      escapeCsv(inq.emailNotificationStatus),
      escapeCsv(inq.internalNotes),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="terra_inquiries_export_${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error("CSV export error:", error);
    return NextResponse.json({ error: "Failed to export CSV" }, { status: 500 });
  }
}
