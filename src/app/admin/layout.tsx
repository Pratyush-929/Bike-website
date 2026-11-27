import React from "react";
import { getCurrentUser } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";

  // Note: /admin/login handles its own unauthenticated state
  const user = await getCurrentUser();

  // If user is not authenticated and not on login route, we redirect in server component
  // (In Next.js, child page like /admin/login is also in /admin directory, so we check if this is the login route)
  // To handle clean Next.js layout behavior, if !user, we can pass null user to header/sidebar or redirect if not on login page
  if (!user) {
    return <div className="min-h-screen bg-charcoal-950 text-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col md:flex-row text-charcoal-100">
      <AdminSidebar userRole={user.role} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          userName={user.name}
          userRole={user.role}
          userEmail={user.email}
        />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
