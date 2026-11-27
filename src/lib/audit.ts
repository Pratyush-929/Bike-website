import prisma from "./prisma";

export async function logAudit({
  userId,
  userEmail,
  action,
  entityType,
  entityId,
  details,
  ipAddress,
}: {
  userId?: string | null;
  userEmail?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  details: Record<string, unknown> | string;
  ipAddress?: string;
}) {
  try {
    const detailsString =
      typeof details === "string" ? details : JSON.stringify(details);

    await prisma.auditLog.create({
      data: {
        userId: userId || undefined,
        userEmail: userEmail || undefined,
        action,
        entityType,
        entityId: entityId || undefined,
        details: detailsString,
        ipAddress,
      },
    });
  } catch (err) {
    console.error("Failed to write audit log:", err);
  }
}
