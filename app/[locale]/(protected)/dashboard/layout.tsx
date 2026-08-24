import { AuthGuard } from "@/components/auth/AuthGuard";
import SidebarInsetHeader from "@/components/header/SidebarInsetHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import React from "react";
import { DashboardSidebar } from "./DashboardSidebar";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider className="dashboard-creem">
        <DashboardSidebar />
        <SidebarInset className="dashboard-creem-inset min-w-0">
          <SidebarInsetHeader />
          <div className="flex min-w-0 flex-1 flex-col gap-4 bg-[var(--songtell-paper)] p-4 pt-0">
            <div className="min-h-screen flex-1 rounded-xl md:min-h-min min-w-0">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
