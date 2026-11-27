import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role === "STAFF") {
    return NextResponse.json({ error: "Staff cannot modify categories" }, { status: 403 });
  }

  try {
    const { name, slug, description, imageUrl, displayOrder, isActive } = await req.json();

    const existing = await prisma.category.findUnique({
      where: { id: params.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const updated = await prisma.category.update({
      where: { id: params.id },
      data: {
        name: name !== undefined ? name.trim() : existing.name,
        slug: slug !== undefined ? slug.trim() : existing.slug,
        description: description !== undefined ? description?.trim() : existing.description,
        imageUrl: imageUrl !== undefined ? imageUrl?.trim() : existing.imageUrl,
        displayOrder: displayOrder !== undefined ? Number(displayOrder) : existing.displayOrder,
        isActive: isActive !== undefined ? Boolean(isActive) : existing.isActive,
      },
    });

    await logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "CATEGORY_UPDATED",
      entityType: "CATEGORY",
      entityId: updated.id,
      details: { name: updated.name },
    });

    return NextResponse.json({ success: true, category: updated });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
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
    return NextResponse.json({ error: "Only Super Admins can delete categories" }, { status: 403 });
  }

  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Protection against orphaned products
    if (category._count.products > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete category "${category.name}" because it still has ${category._count.products} assigned products. Reassign or delete those products first.`,
        },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id: params.id },
    });

    await logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "CATEGORY_DELETED",
      entityType: "CATEGORY",
      entityId: category.id,
      details: { name: category.name },
    });

    return NextResponse.json({ success: true, message: `Category "${category.name}" deleted successfully` });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
