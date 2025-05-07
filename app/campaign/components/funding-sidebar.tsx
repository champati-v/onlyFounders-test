"use client"

import { useState } from "react"
import { Bookmark, Info, MessageSquare, Pencil, Share2, ShieldCheck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface FundingSidebarProps {
  campaign: any // Using any for now as the full type is defined in the parent component
}

export function FundingSidebar({ campaign }: FundingSidebarProps) {
  const [copied, setCopied] = useState(false)

  // Check if user is the owner of the campaign
  const isOwner = campaign.isOwner || false

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate days remaining until deadline
  const calculateDaysRemaining = () => {
    const deadline = new Date(campaign.deadline)
    const today = new Date()
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  // Calculate funding progress percentage
  const progressPercentage = (campaign.totalRaisedOnPlatform / campaign.fundingTarget) * 100
  const daysRemaining = calculateDaysRemaining()

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: campaign.campaignName,
          text: campaign.tagline,
          url: window.location.href,
        })
        .catch((err) => console.error("Error sharing:", err))
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-[#0c1425] rounded-lg p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
      {/* Funding Progress */}
      <h3 className="text-xl font-bold mb-4">Funding Progress</h3>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>Raised</span>
          <span className="font-medium">
            {formatCurrency(campaign.totalRaisedOnPlatform)} / {formatCurrency(campaign.fundingTarget)}{" "}
            {campaign.acceptedCurrencyType?.toUpperCase() || "USDC"}
          </span>
        </div>
        <div className="w-full bg-[#1e293b] rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#39e7f5]"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-sm text-gray-400">{Math.round(progressPercentage)}% funded</span>
          <span className="text-sm text-[#f59e0b] font-medium">{daysRemaining} days left</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 border-b border-[#1e293b] pb-4">
        <div className="text-center">
          <div className="text-3xl font-bold">{campaign.tokenPrice || 0}</div>
          <div className="text-xs text-gray-400">Token Price</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold capitalize">{campaign.stage || "Seed"}</div>
          <div className="text-xs text-gray-400">Startup Stage</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{daysRemaining}</div>
          <div className="text-xs text-gray-400">Days Left</div>
        </div>
      </div>

      <Link href="https://spring.net/discover/onlyfounders">
        <Button className="w-full bg-gradient-to-r from-[#4361ff] to-[#7e5bf8] text-white py-4 rounded-md font-medium mb-3 shadow-sm hover:shadow-md transition-shadow">
          Invest Now
        </Button>
      </Link>

      {isOwner && (
        <Button className="w-full bg-[#10b981] hover:bg-[#10b981]/90 text-white py-4 rounded-md font-medium mb-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center gap-2">
          <Pencil size={16} />
          Edit Campaign
        </Button>
      )}

      <Button
        variant="outline"
        className="w-full border border-[#1e293b] bg-transparent text-white py-3 rounded-md font-medium mb-3 flex items-center justify-center gap-2 hover:bg-[#131e32] transition-colors"
      >
        <Bookmark size={16} />
        Add to Watchlist
      </Button>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <Button
          variant="outline"
          className="border border-[#1e293b] bg-transparent text-white py-2 px-4 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-[#131e32] transition-colors"
          onClick={handleShare}
        >
          <Share2 size={16} />
          <span>{copied ? "Copied!" : "Share"}</span>
        </Button>
       

          <Button
            asChild
            variant="outline"
            className="border border-[#1e293b] bg-transparent text-white py-2 px-4 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-[#131e32] transition-colors">
            <a href={campaign.socialLinks.telegram} target="_blank" rel="noopener noreferrer">
              <MessageSquare size={16} />
              <span>Contact</span>
            </a>
          </Button>
      </div>

      {/* Project Verification */}
      <h3 className="text-xl font-bold mb-4 pt-2 border-t border-[#1e293b]">Project Verification</h3>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center p-3 rounded-md bg-[#0f1a2c]">
          <div className="flex items-center gap-2">
            <div className={campaign.verifiedStatus ? "text-[#10b981]" : "text-gray-400"}>
              <ShieldCheck size={20} />
            </div>
            <span>KYC Verified</span>
          </div>
          <span
            className={`${campaign.verifiedStatus ? "bg-[#10b981]" : "bg-[#f97316]"} text-white text-xs px-4 py-1 rounded-full font-medium`}
          >
            {campaign.verifiedStatus ? "Passed" : "Coming Soon"}
          </span>
        </div>

        <div className="flex justify-between items-center p-3 rounded-md bg-[#0f1a2c]">
          <div className="flex items-center gap-2">
            <div className="text-gray-400">
              <ShieldCheck size={20} />
            </div>
            <span>Smart Contract Audit</span>
          </div>
          <span className="bg-[#f97316] text-white text-xs px-4 py-1 rounded-full font-medium">Coming Soon</span>
        </div>

        <div className="flex justify-between items-center p-3 rounded-md bg-[#0f1a2c]">
          <div className="flex items-center gap-2">
            <div className="text-gray-400">
              <Users size={20} />
            </div>
            <span>Team Verification</span>
          </div>
          <span className="bg-[#f97316] text-white text-xs px-4 py-1 rounded-full font-medium">Coming Soon</span>
        </div>
      </div>

      {/* AI Risk Assessment */}
      <div className="bg-[#0f1a2c] rounded-lg p-4 border border-[#1e293b] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-[#3b82f6]">
            <Info size={18} />
          </div>
          <h3 className="font-bold">AI Risk Assessment</h3>
        </div>

        <p className="text-sm text-gray-300">
          OnlyFounders has analyzed this project and assigned it a {campaign.verifiedStatus ? "low" : "moderate"} risk
          score based on team credentials, code quality, and tokenomics model.
        </p>
      </div>
    </div>
  )
}
