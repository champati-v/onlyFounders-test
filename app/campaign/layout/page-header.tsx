import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock campaign data for headers
const campaignHeaderData = {
  "onlyfounder-cyan": {
    name: "OnlyFounder Cyan",
    description: "Bridging Knowledge and Finance through Decentralization.",
    founder: "NewUser",
    badges: [
      { name: "NFT", color: "bg-[#5b5bf8]" },
      { name: "Bitcoin", color: "bg-[#1f2937]" },
    ],
  },
  decentravault: {
    name: "DecentraVault",
    description: "Decentralized storage solution with enhanced security and privacy",
    founder: "StorageDAO",
    badges: [
      { name: "Seed", color: "bg-[#5b5bf8]" },
      { name: "Infrastructure", color: "bg-[#1f2937]" },
    ],
  },
  metacanvas: {
    name: "MetaCanvas",
    description: "Web3 creative platform for digital artists and collectors",
    founder: "ArtistCollective",
    badges: [
      { name: "Series A", color: "bg-[#5b5bf8]" },
      { name: "NFTs", color: "bg-[#1f2937]" },
    ],
  },
  quantumledger: {
    name: "QuantumLedger",
    description: "Next-generation blockchain with quantum-resistant cryptography",
    founder: "CryptoLabs",
    badges: [
      { name: "Seed", color: "bg-[#5b5bf8]" },
      { name: "DeFi", color: "bg-[#1f2937]" },
    ],
  },
}

interface PageHeaderProps {
  campaignId?: string
}

export function PageHeader({ campaignId = "onlyfounder-cyan" }: PageHeaderProps) {
  // Get campaign data or use default if not found
  const campaignData = campaignHeaderData[campaignId as keyof typeof campaignHeaderData] || {
    name: "Unknown Campaign",
    description: "Campaign details not available",
    founder: "Unknown",
    badges: [{ name: "Unknown", color: "bg-[#1f2937]" }],
  }

  return (
    <div className="relative">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <Button
          variant="secondary"
          className="bg-[#5b5bf8] hover:bg-[#5b5bf8]/90 text-white flex items-center gap-1 rounded-md"
          asChild
        >
          <Link href="/campaigns">
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
          src="/founders-banner.jpg"
          alt="Founders Banner"
          width={1200}
          height={300}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-[#39e7f5] tracking-wider">FOUNDERS</h1>
        </div>
      </div>

      {/* Project Info */}
      <div className="px-6 py-4 flex items-start gap-4 absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-[#0c1425] p-2 rounded-lg">
          <Image src="/cyan-logo.png" alt="Project Logo" width={60} height={60} className="rounded" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            {campaignData.badges.map((badge, index) => (
              <Badge key={index} className={`${badge.color} text-white rounded-full text-xs px-3 py-0.5`}>
                {badge.name}
              </Badge>
            ))}
          </div>
          <h2 className="text-2xl font-bold">{campaignData.name}</h2>
          <p className="text-gray-300 text-sm">{campaignData.description}</p>
          <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
            <span>Founder:</span>
            <Link href="#" className="text-[#39e7f5]">
              {campaignData.founder}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
