"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
    <div className="flex min-h-screen">
      <aside className="w-54 bg-gray-800 p-6 space-y-4">
        <Link href={'/dashboard'}><h2 className="py-4 mt-4">Admin panel</h2></Link>
        <nav className="flex flex-col gap-2">
          <Link href={"/dashboard/rooms"}>Manage Rooms</Link>
          <Link href={"/dashboard/users"}>Manage Users</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
    </ProtectedRoute>
  );
}
