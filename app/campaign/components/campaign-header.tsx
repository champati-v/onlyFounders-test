import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CampaignHeaderProps {
  campaign: any // Using any for now as the full type is defined in the parent component
}

export function CampaignHeader({ campaign }: CampaignHeaderProps) {
  return (
    <div className="relative">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <Button
          variant="secondary"
          className="bg-[#5b5bf8] hover:bg-[#5b5bf8]/90 text-white flex items-center gap-1 rounded-md"
          asChild
        >
          <Link href="/campaign/campaigns">
            <ChevronLeft size={16} />
            <span>Back to Campaigns</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-gray-700 bg-[#0c1425] text-white flex items-center gap-1 rounded-md"
          >
            <ThumbsUp size={16} />
            <span>0 Upvote</span>
          </Button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={campaign.banner?.file_url || "/placeholder.svg?height=300&width=1200&query=blockchain banner"}
          alt="Campaign Banner"
          width={1200}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Project Info */}
      <div className="px-6 py-4 flex items-start gap-4 absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-[#0c1425] p-2 rounded-lg">
          <Image
            src={campaign.logo?.file_url || "/placeholder.svg?height=60&width=60&query=logo"}
            alt="Project Logo"
            width={60}
            height={60}
            className="rounded"
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-[#5b5bf8] text-white rounded-full text-xs px-3 py-0.5">
              {campaign.category || "DeFi"}
            </Badge>
            <Badge className="bg-[#10b981] text-white rounded-full text-xs px-3 py-0.5">
              {campaign.stage || "Prototype"}
            </Badge>
            {campaign.campaignStatus && (
              <Badge
                className={`${
                  campaign.campaignStatus === "Active"
                    ? "bg-green-500"
                    : campaign.campaignStatus === "Completed"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                } text-white rounded-full text-xs px-3 py-0.5`}
              >
                {campaign.campaignStatus}
              </Badge>
            )}
          </div>
          <h2 className="text-2xl font-bold">{campaign.campaignName}</h2>
          <p className="text-gray-300 text-sm">{campaign.tagline}</p>
          <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
            <span>Founder:</span>
            <Link href={`/public-profile/founder/${campaign.project_id}`} className="text-[#39e7f5]">
              {campaign.isOwner ? "You" : "NewUser"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
