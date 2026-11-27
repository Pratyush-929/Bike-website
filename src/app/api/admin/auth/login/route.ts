import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, createSessionToken, getSessionCookieConfig } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Account has been suspended or deactivated. Contact a Super Admin." },
        { status: 403 }
      );
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session token
    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role as "SUPER_ADMIN" | "MANAGER" | "STAFF",
    });

    await logAudit({
      userId: user.id,
      userEmail: user.email,
      action: "ADMIN_LOGIN",
      entityType: "USER",
      entityId: user.id,
      details: { email: user.email, role: user.role },
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    const cookieConfig = getSessionCookieConfig(token);
    response.cookies.set(cookieConfig);

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login" },
      { status: 500 }
    );
  }
}
