import { NextResponse } from "next/server";
import { getClearSessionCookieConfig, getCurrentUser } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function POST() {
  try {
    const user = await getCurrentUser();
    if (user) {
      await logAudit({
        userId: user.id,
        userEmail: user.email,
        action: "ADMIN_LOGOUT",
        entityType: "USER",
        entityId: user.id,
        details: { email: user.email },
      });
    }

    const response = NextResponse.json({ success: true, message: "Logged out successfully" });
    const clearCookie = getClearSessionCookieConfig();
    response.cookies.set(clearCookie);
    return response;
  } catch (error) {
    console.error("Admin logout error:", error);
    return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
  }
}
