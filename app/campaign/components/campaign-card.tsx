import Image from "next/image"
import Link from "next/link"
import { Calendar, Users } from "lucide-react"

import type { Campaign } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

interface CampaignCardProps {
  campaign: Campaign
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progressPercentage = (campaign.raised / campaign.goal) * 100

  return (
    <div className="bg-[#0c1425] rounded-lg overflow-hidden border border-[#1e293b] transition-all duration-300 hover:shadow-lg hover:shadow-[#39e7f5]/10 hover:border-[#39e7f5]/30">
      {/* Campaign Banner */}
      <div className="relative h-48 bg-gradient-to-b from-gray-600 to-[#0c1425]">
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-[#10b981] text-white text-xs px-3 py-1 rounded-full font-medium">
            {campaign.status === "active" ? "Active" : campaign.status === "completed" ? "Completed" : "Upcoming"}
          </span>
        </div>
      </div>

      {/* Campaign Info */}
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          {/* Logo */}
          <div className="bg-[#131e32] p-2 rounded-lg shrink-0">
            <Image src={campaign.logo || "/placeholder.svg"} alt="Logo" width={32} height={32} className="rounded" />
          </div>

          {/* Title and Categories */}
          <div>
            <h3 className="text-xl font-bold">{campaign.name}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {campaign.categories.map((category, index) => (
                <span key={index} className={`${category.color} text-white text-xs px-3 py-1 rounded-full`}>
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4">{campaign.description}</p>

        {/* Funding Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Raised</span>
            <span>
              {formatCurrency(campaign.raised)} / {formatCurrency(campaign.goal)}
            </span>
          </div>
          <Progress
            value={progressPercentage}
            className="h-2"
            indicatorClassName="bg-gradient-to-r from-[#3b82f6] to-[#39e7f5]"
          />
        </div>

        {/* Campaign Details - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[#39e7f5]" />
            <div>
              <div className="text-gray-400">Deadline</div>
              <div>{campaign.deadline}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-[#39e7f5]" />
            <div>
              <div className="text-gray-400">Investors</div>
              <div>{campaign.investors}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 col-span-1">
            <div className="text-[#39e7f5]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="m8 14 2 2 4-4" />
              </svg>
            </div>
            <div>
              <div className="text-gray-400">Milestones</div>
              <div>
                {campaign.milestones.completed}/{campaign.milestones.total}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button - Full width */}
        <Link
          href={`/campaign/campaigns/${campaign.id}`}
          className="block w-full bg-[#4361ff] hover:bg-[#4361ff]/90 text-white py-2 rounded-md font-medium text-center"
        >
          {campaign.isOwner ? "Manage Campaign" : "View Campaign"}
        </Link>
      </div>
    </div>
  )
}
