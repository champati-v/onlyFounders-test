"use client"

import { API_URL } from '@/lib/config';
import { useState, useEffect } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { ArrowUpRight, Building2, FileText, FileVideo, Github, Globe, MessageSquare, MessageSquareText, Send, Twitter, UserPlus, Users, Loader2 } from 'lucide-react'

import type { CampaignDetail } from "@/lib/types"
import { formatCompactNumber } from "@/lib/utils"

interface TractionMetrics {
  waitlistSignups: number
  strategicPartners: number
  communitySize: number
  growthMetrics: {
    metricName: string
    metricValue: number
    _id: string
  }[]
  others: any[]
  _id: string
}

interface OverviewTabProps {
  campaign: any // Using CampaignDetail from parent
}

export function OverviewTab({ campaign }: OverviewTabProps) {
  const [traction, setTraction] = useState<TractionMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, isLoading: isUserLoading } = useUser()

  useEffect(() => {
    const fetchTractionMetrics = async () => {
      setIsLoading(true)
      try {
        if (!campaign._id) {
          throw new Error("Campaign ID is required")
        }

        // Get user ID for the API request header
        const userId = user?.sub?.substring(14) || "guest-user"

        const response = await fetch(`${API_URL}/api/startup/get-traction`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // user_id: userId,
          },
          body: JSON.stringify({ campaignId: campaign._id}),
        })

        console.log("traction metrucs")
        if (!response.ok) {
          throw new Error(`Failed to fetch traction metrics: ${response.status}`)
        }

        const data = await response.json()
        setTraction(data.traction)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch traction metrics")
        console.error("Error fetching traction metrics:", err)
        // Set default values if API fails
        setTraction({
          waitlistSignups: 0,
          strategicPartners: 0,
          communitySize: 0,
          growthMetrics: [],
          others: [],
          _id: "",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (!isUserLoading) {
      fetchTractionMetrics()
    }
  }, [campaign._id, user, isUserLoading])

  // Extract social links from campaign data
  const socialLinks = campaign.socialLinks || {}

  return (
    <>
      {/* Project Overview */}
      <div className="bg-[#0c1425] rounded-lg p-4 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Project Overview</h3>
        <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">{campaign.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {socialLinks.website && (
            <a 
              href={socialLinks.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-[#39e7f5]" />
                <span className="text-sm sm:text-base">Website</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </a>
          )}

          {campaign.whitePaperUrl && (
            <a 
              href={campaign.whitePaperUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[#39e7f5]" />
                <span className="text-sm sm:text-base">Whitepaper</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </a>
          )}

          {socialLinks.github && (
            <a 
              href={socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Github size={18} className="text-[#39e7f5]" />
                <span className="text-sm sm:text-base">Github Repository</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </a>
          )}

          {socialLinks.discord && (
            <a 
              href={socialLinks.discord} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-[#39e7f5]" />
                <span className="text-sm sm:text-base">Discord</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </a>
          )}

          {socialLinks.twitter && (
            <a 
              href={socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Twitter size={18} className="text-[#39e7f5]" />
                <span className="text-sm sm:text-base">Twitter</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </a>
          )}

          {socialLinks.medium && (
            <a 
              href={socialLinks.medium} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageSquareText size={18} className="text-[#39e7f5]" />
                <span className="text-sm sm:text-base">Medium Blog</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </a>
          )}

          {socialLinks.telegram && (
            <a 
              href={socialLinks.telegram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Send size={18} className="text-[#39e7f5]" />
                <span className="text-sm sm:text-base">Telegram</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </a>
          )}

          {campaign.pitchDemoVideoUrl && (
            <a 
              href={campaign.pitchDemoVideoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileVideo size={18} className="text-[#39e7f5]" />
                <span className="text-sm sm:text-base">Demo Video</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </a>
          )}
        </div>
      </div>

      {/* Traction and Metrics */}
      <div className="bg-[#0c1425] rounded-lg p-4 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Traction and Metrics</h3>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 size={24} className="animate-spin text-[#39e7f5]" />
            <span className="ml-2 text-gray-400">Loading metrics...</span>
          </div>
        ) : error && !traction ? (
          <div className="bg-[#131e32] p-4 rounded-lg text-center">
            <p className="text-red-400 mb-2">Failed to load metrics</p>
            <p className="text-sm text-gray-400">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
              <div className="bg-[#0f1a2c] rounded-lg p-4 flex flex-col items-center justify-center">
                <div className="bg-[#131e32] p-2 rounded-full mb-2">
                  <UserPlus size={20} className="text-[#39e7f5]" />
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-xs sm:text-sm">Waitlist Signups</div>
                  <div className="text-xl sm:text-3xl font-bold mt-1">
                    {formatCompactNumber(traction?.waitlistSignups || 0)}
                  </div>
                </div>
              </div>

              <div className="bg-[#0f1a2c] rounded-lg p-4 flex flex-col items-center justify-center">
                <div className="bg-[#131e32] p-2 rounded-full mb-2">
                  <Building2 size={20} className="text-[#39e7f5]" />
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-xs sm:text-sm">Strategic Partners</div>
                  <div className="text-xl sm:text-3xl font-bold mt-1">
                    {formatCompactNumber(traction?.strategicPartners || 0)}
                  </div>
                </div>
              </div>

              <div className="bg-[#0f1a2c] rounded-lg p-4 flex flex-col items-center justify-center">
                <div className="bg-[#131e32] p-2 rounded-full mb-2">
                  <Users size={20} className="text-[#39e7f5]" />
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-xs sm:text-sm">Community Size</div>
                  <div className="text-xl sm:text-3xl font-bold mt-1">
                    {formatCompactNumber(traction?.communitySize || 0)}
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Metrics */}
            {traction?.growthMetrics && traction.growthMetrics.length > 0 && (
              <div>
                <h4 className="font-bold mb-3 text-sm sm:text-base">Additional Metrics</h4>
                <div className="space-y-2">
                  {traction.growthMetrics.map((metric) => (
                    <div key={metric._id} className="flex justify-between items-center bg-[#131e32] p-3 rounded">
                      <span className="text-gray-300 text-sm">{metric.metricName}</span>
                      <span className="font-bold">{formatCompactNumber(metric.metricValue)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other metrics if available */}
            {traction?.others && traction.others.length > 0 && (
              <div className="mt-4">
                <h4 className="font-bold mb-3 text-sm sm:text-base">Other Metrics</h4>
                <div className="space-y-2">
                  {traction.others.map((metric, index) => (
                    <div key={index} className="flex justify-between items-center bg-[#131e32] p-3 rounded">
                      <span className="text-gray-300 text-sm">{metric.metricName}</span>
                      <span className="font-bold">{metric.metricValue}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}