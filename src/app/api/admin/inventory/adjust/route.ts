import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { productId, quantityChange, changeType, reason } = await req.json();

    if (!productId || quantityChange === undefined || !reason) {
      return NextResponse.json(
        { error: "Product ID, quantity change, and a documented reason are required" },
        { status: 400 }
      );
    }

    const change = Number(quantityChange);
    if (isNaN(change) || change === 0) {
      return NextResponse.json({ error: "Quantity change cannot be zero" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { inventory: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const currentStock = product.inventory?.currentStock ?? 0;
    const newStock = currentStock + change;

    if (newStock < 0) {
      return NextResponse.json(
        { error: `Cannot reduce stock below 0. Current stock is ${currentStock}, adjustment is ${change}.` },
        { status: 400 }
      );
    }

    const reorderThresh = product.inventory?.reorderThreshold ?? 3;

    // Update status based on new stock
    let newStatus = product.availabilityStatus;
    if (newStock === 0) {
      newStatus = "OUT_OF_STOCK";
    } else if (newStock <= reorderThresh) {
      newStatus = "LOW_STOCK";
    } else if (product.availabilityStatus === "OUT_OF_STOCK" || product.availabilityStatus === "LOW_STOCK") {
      newStatus = "IN_STOCK";
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Update inventory
      const updatedInv = await tx.inventoryItem.upsert({
        where: { productId },
        update: {
          currentStock: newStock,
          lastUpdated: new Date(),
        },
        create: {
          productId,
          currentStock: newStock,
          reorderThreshold: reorderThresh,
        },
      });

      // 2. Update product status
      await tx.product.update({
        where: { id: productId },
        data: { availabilityStatus: newStatus },
      });

      // 3. Log movement
      const movement = await tx.inventoryMovement.create({
        data: {
          productId,
          quantityChange: change,
          resultingStock: newStock,
          changeType: changeType || (change > 0 ? "RESTOCK" : "MANUAL_ADJUSTMENT"),
          reason: reason.trim(),
          adminUserId: user.id,
        },
      });

      return { updatedInv, movement, newStatus };
    });

    await logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "STOCK_ADJUSTMENT",
      entityType: "INVENTORY",
      entityId: productId,
      details: {
        sku: product.sku,
        previousStock: currentStock,
        change,
        resultingStock: newStock,
        reason,
      },
    });

    return NextResponse.json({
      success: true,
      productId,
      currentStock: result.updatedInv.currentStock,
      availabilityStatus: result.newStatus,
      movement: result.movement,
    });
  } catch (error) {
    console.error("Error adjusting stock:", error);
    return NextResponse.json({ error: "Failed to adjust stock" }, { status: 500 });
  }
}
