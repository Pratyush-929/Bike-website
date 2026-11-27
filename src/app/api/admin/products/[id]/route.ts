import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        inventory: true,
        movements: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role === "STAFF") {
    return NextResponse.json({ error: "Staff accounts cannot modify product details" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      sku,
      name,
      slug,
      brand,
      type,
      categoryId,
      description,
      shortDescription,
      priceInCents,
      compareAtPriceInCents,
      isFeatured,
      isPublished,
      availabilityStatus,
      primaryImageUrl,
      additionalImages,
      specifications,
      stock,
      reorderThreshold,
      supplier,
      location,
      stockAdjustmentReason,
    } = body;

    const existing = await prisma.product.findUnique({
      where: { id: params.id },
      include: { inventory: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Verify non-negative price
    if (priceInCents !== undefined && Number(priceInCents) < 0) {
      return NextResponse.json({ error: "Price cannot be negative" }, { status: 400 });
    }

    // Determine availability state based on stock
    const currentStock = existing.inventory?.currentStock ?? 0;
    const newStock = stock !== undefined ? Number(stock) : currentStock;
    const thresh = reorderThreshold !== undefined ? Number(reorderThreshold) : (existing.inventory?.reorderThreshold ?? 3);

    let finalAvailability = availabilityStatus || existing.availabilityStatus;
    if (newStock <= 0 && finalAvailability === "IN_STOCK") {
      finalAvailability = "OUT_OF_STOCK";
    } else if (newStock > 0 && newStock <= thresh && finalAvailability === "IN_STOCK") {
      finalAvailability = "LOW_STOCK";
    }

    const updated = await prisma.$transaction(async (tx) => {
      const prod = await tx.product.update({
        where: { id: params.id },
        data: {
          sku: sku ? sku.trim().toUpperCase() : existing.sku,
          name: name ? name.trim() : existing.name,
          slug: slug ? slug.trim() : existing.slug,
          brand: brand ? brand.trim() : existing.brand,
          type: type || existing.type,
          categoryId: categoryId || existing.categoryId,
          description: description !== undefined ? description : existing.description,
          shortDescription: shortDescription !== undefined ? shortDescription : existing.shortDescription,
          priceInCents: priceInCents !== undefined ? Number(priceInCents) : existing.priceInCents,
          compareAtPriceInCents:
            compareAtPriceInCents !== undefined
              ? compareAtPriceInCents === null || compareAtPriceInCents === ""
                ? null
                : Number(compareAtPriceInCents)
              : existing.compareAtPriceInCents,
          isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : existing.isFeatured,
          isPublished: isPublished !== undefined ? Boolean(isPublished) : existing.isPublished,
          availabilityStatus: finalAvailability,
          primaryImageUrl: primaryImageUrl || existing.primaryImageUrl,
          additionalImages:
            additionalImages !== undefined
              ? typeof additionalImages === "string"
                ? additionalImages
                : JSON.stringify(additionalImages)
              : existing.additionalImages,
          specifications:
            specifications !== undefined
              ? typeof specifications === "string"
                ? specifications
                : JSON.stringify(specifications)
              : existing.specifications,
        },
      });

      // Stock adjustment if stock changed
      if (stock !== undefined && newStock !== currentStock) {
        const diff = newStock - currentStock;
        await tx.inventoryItem.upsert({
          where: { productId: existing.id },
          update: {
            currentStock: newStock,
            reorderThreshold: thresh,
            supplier: supplier !== undefined ? supplier : existing.inventory?.supplier,
            location: location !== undefined ? location : existing.inventory?.location,
            lastUpdated: new Date(),
          },
          create: {
            productId: existing.id,
            currentStock: newStock,
            reorderThreshold: thresh,
            supplier: supplier || null,
            location: location || null,
          },
        });

        await tx.inventoryMovement.create({
          data: {
            productId: existing.id,
            quantityChange: diff,
            resultingStock: newStock,
            changeType: diff > 0 ? "RESTOCK" : "MANUAL_ADJUSTMENT",
            reason: stockAdjustmentReason || "Admin product edit stock adjustment",
            adminUserId: user.id,
          },
        });
      } else if (reorderThreshold !== undefined || supplier !== undefined || location !== undefined) {
        await tx.inventoryItem.upsert({
          where: { productId: existing.id },
          update: {
            reorderThreshold: thresh,
            supplier: supplier !== undefined ? supplier : existing.inventory?.supplier,
            location: location !== undefined ? location : existing.inventory?.location,
          },
          create: {
            productId: existing.id,
            currentStock: currentStock,
            reorderThreshold: thresh,
            supplier,
            location,
          },
        });
      }

      return prod;
    });

    await logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "PRODUCT_UPDATED",
      entityType: "PRODUCT",
      entityId: updated.id,
      details: { sku: updated.sku, name: updated.name, price: updated.priceInCents },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Only Super Admins can delete or unpublish products" }, { status: 403 });
  }

  try {
    const existing = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Soft-delete: unpublish & mark discontinued
    const archived = await prisma.product.update({
      where: { id: params.id },
      data: {
        isPublished: false,
        availabilityStatus: "DISCONTINUED",
      },
    });

    await logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "PRODUCT_ARCHIVED",
      entityType: "PRODUCT",
      entityId: existing.id,
      details: { sku: existing.sku, name: existing.name },
    });

    return NextResponse.json({
      success: true,
      message: "Product safely archived and unpublished from public catalog",
      product: archived,
    });
  } catch (error) {
    console.error("Error archiving product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
