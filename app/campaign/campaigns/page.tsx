"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"

import { campaignData } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { CampaignCard } from "../components/campaign-card"

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleCampaigns, setVisibleCampaigns] = useState(6)
  const [filter, setFilter] = useState<"all" | "my">("all")

  // Find the OnlyFounder Cyan campaign
  const onlyFounderCyan = campaignData.find((campaign) => campaign.name === "OnlyFounder Cyan")
  const cyanCampaignId = onlyFounderCyan?.id || "cyan"

  // Filter campaigns based on search query and ownership filter
  const filteredCampaigns = campaignData.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.categories.some((cat) => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilter = filter === "all" || (filter === "my" && campaign.isOwner)

    return matchesSearch && matchesFilter
  })

  // Load more campaigns
  const loadMoreCampaigns = () => {
    setVisibleCampaigns((prev) => Math.min(prev + 3, filteredCampaigns.length))
  }

  return (
    <div className="min-h-screen bg-[#050914] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-1">Campaigns</h1>
            <p className="text-gray-400">Explore and support innovative blockchain projects</p>
          </div>
          <Link href={`/campaign/campaigns/${cyanCampaignId}`}>
            <Button className="bg-[#4361ff] hover:bg-[#4361ff]/90 text-white py-2 px-4 rounded-md font-medium w-full sm:w-auto">
              View Current Campaign
            </Button>
          </Link>
        </div>

        {/* Full-width Search Bar */}
        <div className="relative w-full mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="w-full bg-[#0c1425] border border-[#1e293b] rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#39e7f5]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Centered Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-[#131e32] rounded-lg p-1">
            <Button
              className={`${filter === "all" ? "bg-[#4361ff]" : "bg-transparent"} hover:bg-[#4361ff]/90 text-white px-6 py-2 rounded-md`}
              onClick={() => setFilter("all")}
            >
              All Campaigns
            </Button>
            <Button
              className={`${filter === "my" ? "bg-[#4361ff]" : "bg-transparent"} hover:bg-[#4361ff]/90 text-white px-6 py-2 rounded-md`}
              onClick={() => setFilter("my")}
            >
              My Campaigns
            </Button>
          </div>
        </div>

        {/* Campaign Grid - Updated to max 3 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.slice(0, visibleCampaigns).map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12 sm:py-16 bg-[#0c1425] rounded-lg mt-8">
            <h3 className="text-xl font-bold mb-2">No campaigns found</h3>
            <p className="text-gray-400 mb-6 px-4">
              {filter === "my"
                ? "You don't have any campaigns yet. Create your first campaign to get started."
                : "No campaigns match your search criteria. Try adjusting your search."}
            </p>
            {filter === "my" && (
              <Link href={`/campaign/campaigns/${cyanCampaignId}`}>
                <Button className="bg-[#4361ff] hover:bg-[#4361ff]/90 text-white">View Current Campaign</Button>
              </Link>
            )}
          </div>
        )}

        {/* Load More Button */}
        {visibleCampaigns < filteredCampaigns.length && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={loadMoreCampaigns}
              className="bg-[#131e32] hover:bg-[#1e293b] text-white border border-[#1e293b]"
            >
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
