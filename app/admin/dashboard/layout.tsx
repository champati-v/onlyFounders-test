import type React from "react"
import { Navbar } from "@/components/early-access/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}

