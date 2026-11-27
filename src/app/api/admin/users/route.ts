import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, hashPassword } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const auditLogs = await prisma.auditLog.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ users, auditLogs });
  } catch (error) {
    console.error("Error fetching admin users:", error);
    return NextResponse.json({ error: "Failed to fetch admin users" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Only Super Admins can add team members" }, { status: 403 });
  }

  try {
    const { name, email, password, role = "STAFF" } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        passwordHash,
        role,
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    await logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "USER_CREATED",
      entityType: "USER",
      entityId: newUser.id,
      details: { email: newUser.email, role: newUser.role },
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
