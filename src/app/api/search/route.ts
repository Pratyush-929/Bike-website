import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    if (!query.trim()) {
      return NextResponse.json({ products: [], services: [] });
    }

    const cleanQuery = query.trim();

    // Query products
    const products = await prisma.product.findMany({
      where: {
        isPublished: true,
        OR: [
          { name: { contains: cleanQuery } },
          { brand: { contains: cleanQuery } },
          { sku: { contains: cleanQuery } },
          { description: { contains: cleanQuery } },
          { shortDescription: { contains: cleanQuery } },
        ],
      },
      include: {
        category: true,
      },
      take: 20,
    });

    // Query services
    const services = await prisma.serviceItem.findMany({
      where: {
        isEnabled: true,
        OR: [
          { name: { contains: cleanQuery } },
          { description: { contains: cleanQuery } },
          { shortDescription: { contains: cleanQuery } },
        ],
      },
      take: 5,
    });

    return NextResponse.json({
      products,
      services,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 });
  }
}
