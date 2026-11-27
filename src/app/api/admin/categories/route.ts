import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: [{ type: "asc" }, { displayOrder: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role === "STAFF") {
    return NextResponse.json({ error: "Staff cannot create categories" }, { status: 403 });
  }

  try {
    const { name, slug, type, description, imageUrl, displayOrder = 0, isActive = true } = await req.json();

    if (!name || !type) {
      return NextResponse.json({ error: "Category name and type are required" }, { status: 400 });
    }

    const cleanSlug =
      slug?.trim() ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const existing = await prisma.category.findUnique({
      where: { slug: cleanSlug },
    });
    if (existing) {
      return NextResponse.json({ error: `Category with slug "${cleanSlug}" already exists` }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        slug: cleanSlug,
        type,
        description: description?.trim() || null,
        imageUrl: imageUrl?.trim() || null,
        displayOrder: Number(displayOrder) || 0,
        isActive: Boolean(isActive),
      },
    });

    await logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "CATEGORY_CREATED",
      entityType: "CATEGORY",
      entityId: category.id,
      details: { name: category.name, type: category.type },
    });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
