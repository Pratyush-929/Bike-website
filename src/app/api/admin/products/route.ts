import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const categoryId = searchParams.get("categoryId");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (type && type !== "ALL") {
      where.type = type;
    }
    if (categoryId && categoryId !== "ALL") {
      where.categoryId = categoryId;
    }
    if (status && status !== "ALL") {
      where.availabilityStatus = status;
    }
    if (search && search.trim()) {
      where.OR = [
        { name: { contains: search.trim() } },
        { sku: { contains: search.trim() } },
        { brand: { contains: search.trim() } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        inventory: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role === "STAFF") {
    return NextResponse.json({ error: "Staff accounts do not have permission to create products" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      sku,
      name,
      slug,
      brand = "Terra Cycles",
      type = "BIKE",
      categoryId,
      description,
      shortDescription,
      priceInCents,
      compareAtPriceInCents,
      isFeatured = false,
      isPublished = true,
      availabilityStatus = "IN_STOCK",
      primaryImageUrl,
      additionalImages = [],
      specifications = {},
      stock = 0,
      reorderThreshold = 3,
      supplier,
      location,
    } = body;

    // Validation
    if (!sku || !name || !categoryId || !primaryImageUrl) {
      return NextResponse.json({ error: "SKU, Name, Category, and Primary Image are required" }, { status: 400 });
    }

    if (priceInCents === undefined || priceInCents < 0) {
      return NextResponse.json({ error: "Price must be a non-negative number" }, { status: 400 });
    }

    // Check SKU collision
    const existingSku = await prisma.product.findUnique({
      where: { sku: sku.trim().toUpperCase() },
    });
    if (existingSku) {
      return NextResponse.json({ error: `A product with SKU "${sku}" already exists` }, { status: 400 });
    }

    // Auto-generate slug if not provided
    const cleanSlug =
      slug?.trim() ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
        "-" +
        Math.floor(100 + Math.random() * 900);

    // Compute stock-consistent availability status
    let finalAvailability = availabilityStatus;
    const stockQty = Number(stock) || 0;
    if (stockQty <= 0 && availabilityStatus === "IN_STOCK") {
      finalAvailability = "OUT_OF_STOCK";
    } else if (stockQty > 0 && stockQty <= (Number(reorderThreshold) || 3) && availabilityStatus === "IN_STOCK") {
      finalAvailability = "LOW_STOCK";
    }

    const product = await prisma.$transaction(async (tx) => {
      const created = await tx.product.create({
        data: {
          sku: sku.trim().toUpperCase(),
          name: name.trim(),
          slug: cleanSlug,
          brand: brand.trim(),
          type,
          categoryId,
          description: description || name,
          shortDescription: shortDescription || null,
          priceInCents: Number(priceInCents),
          compareAtPriceInCents: compareAtPriceInCents ? Number(compareAtPriceInCents) : null,
          isFeatured: Boolean(isFeatured),
          isPublished: Boolean(isPublished),
          availabilityStatus: finalAvailability,
          primaryImageUrl,
          additionalImages: JSON.stringify(additionalImages),
          specifications: JSON.stringify(specifications),
        },
      });

      await tx.inventoryItem.create({
        data: {
          productId: created.id,
          currentStock: stockQty,
          reorderThreshold: Number(reorderThreshold) || 3,
          supplier: supplier || null,
          location: location || null,
        },
      });

      if (stockQty > 0) {
        await tx.inventoryMovement.create({
          data: {
            productId: created.id,
            quantityChange: stockQty,
            resultingStock: stockQty,
            changeType: "INITIAL",
            reason: "Initial product stock creation",
            adminUserId: user.id,
          },
        });
      }

      return created;
    });

    await logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "PRODUCT_CREATED",
      entityType: "PRODUCT",
      entityId: product.id,
      details: { sku: product.sku, name: product.name, price: product.priceInCents },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
