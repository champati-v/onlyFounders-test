import type { ReactNode } from "react"

import { FundingSidebar } from "./funding-sidebar"
import { Navigation } from "./navigation"
import { PageHeader } from "./page-header"

interface PageLayoutProps {
  children: ReactNode
  currentPage: "overview" | "funding-details" | "team" | "tokenomics" | "faq" | "updates" | "milestones"
  campaignId?: string
}

export function PageLayout({ children, currentPage, campaignId }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#050914] text-white">
      <PageHeader campaignId={campaignId} />
      <Navigation currentPage={currentPage} />

      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-16 xl:px-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={currentPage === "overview" ? "lg:col-span-2 space-y-6" : "lg:col-span-2"}>{children}</div>
        <div>
          <FundingSidebar campaignId={campaignId} />
        </div>
      </div>
    </div>
  )
}
