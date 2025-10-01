import React from "react";
import NavigationBar from "@/components/blocks/NavigationBlocks/NavigationBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <NavigationBar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}