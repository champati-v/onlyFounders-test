"use client"

import { API_URL } from '@/lib/config';
import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ThumbsUp } from "lucide-react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface CampaignHeaderProps {
  campaign: any // Using any for now as the full type is defined in the parent component
   // User ID for the API header
}

export function CampaignHeader({ campaign }: CampaignHeaderProps) {
  const { toast } = useToast()
  const { user } = useUser()
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  
  // Ensure campaignId is available
  const campaignId = campaign?._id 
  const userId = user?.sub?.substring(14)
  console.log("Component rendered with:", { campaignId })

  // Fetch initial upvote count and status
  useEffect(() => {
    console.log("Initializing with:", { campaignId })

    

    if (!campaignId) {
      console.error("Campaign ID is missing")
      setIsInitializing(false)
      return
    }

    let isMounted = true

    const fetchUpvoteData = async () => {
      try {
        console.log("Fetching initial upvote data")

        // Fetch upvote count
        console.log(
          "Fetching upvote count from:",
          `${API_URL}/api/startup/get-campaign-upvote-count/${campaignId}`,
        )

        const countResponse = await fetch(
          `${API_URL}/api/startup/get-campaign-upvote-count/${campaignId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              user_id: userId,
            },
          },
        )

        console.log("Count response status:", countResponse.status)

        if (countResponse.ok && isMounted) {
          const countData = await countResponse.json()
          console.log("Count data received:", countData)
          setUpvoteCount(countData.upvote || 0)
        } else {
          console.error("Failed to fetch upvote count:", await countResponse.text())
        }

        // Fetch upvote status
        console.log(
          "Fetching upvote status from:",
          `${API_URL}/api/startup/get-campaign-upvote-status/${campaignId}`,
        )

        const statusResponse = await fetch(
          `${API_URL}/api/startup/get-campaign-upvote-status/${campaignId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              user_id: userId,
            },
          },
        )

        console.log("Status response status:", statusResponse.status)

        if (statusResponse.ok && isMounted) {
          const statusData = await statusResponse.json()
          console.log("Status data received:", statusData)
          setIsUpvoted(statusData.status || false)
        } else {
          console.error("Failed to fetch upvote status:", await statusResponse.text())
        }
      } catch (error) {
        console.error("Error fetching upvote data:", error)
      } finally {
        if (isMounted) {
          setIsInitializing(false)
          console.log("Initialization complete")
        }
      }
    }

    fetchUpvoteData()

    return () => {
      isMounted = false
    }
  }, [campaignId, userId])

  // Use useCallback to ensure the function reference is stable
  const handleUpvoteToggle = useCallback(async () => {
    console.log("Upvote button clicked")

    if (!userId) {
      console.error("User ID is missing")
      toast({
        title: "Authentication required",
        description: "Please sign in to upvote campaigns",
        variant: "destructive",
      })
      return
    }

    if (!campaignId) {
      console.error("Campaign ID is missing")
      toast({
        title: "Error",
        description: "Campaign information is missing",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      console.log("Toggling upvote with:", { campaignId, userId })

      // Log the full URL and headers
      const url = `${API_URL}/api/startup/upvote-campaign/${campaignId}`
      const headers = {
        "Content-Type": "application/json",
        user_id: userId,
      }

      console.log("Making API call to:", url)
      console.log("With headers:", headers)

      const response = await fetch(url, {
        method: "POST",
        headers,
        // Adding a cache control header to prevent caching
        cache: "no-cache",
      })

      console.log("API response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API error response:", errorText)
        throw new Error(`Failed to toggle upvote: ${errorText}`)
      }

      const data = await response.json()
      console.log("API response data:", data)

      // Update state based on API response
      setIsUpvoted(data.upvoted)
      setUpvoteCount(data.upvote || (data.upvoted ? upvoteCount + 1 : Math.max(0, upvoteCount - 1)))

      toast({
        title: data.upvoted ? "Campaign upvoted" : "Upvote removed",
        description: data.upvoted
          ? "Thanks for supporting this campaign!"
          : "You've removed your upvote from this campaign",
        variant: "default",
      })
    } catch (error) {
      console.error("Error in upvote toggle:", error)
      toast({
        title: "Error",
        description: "Failed to process your upvote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      console.log("Upvote toggle complete")
    }
  }, [campaignId, userId, upvoteCount, toast])

  // Function to handle button click with event
  const handleButtonClick = (e: React.MouseEvent) => {
    console.log("Button clicked", e)
    e.preventDefault()
    e.stopPropagation()
    handleUpvoteToggle()
  }

  return (
    <div className="relative">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center">
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
            className={`border-gray-700 ${
              isUpvoted ? "bg-[#5b5bf8]" : "bg-[#0c1425]"
            } text-white flex items-center gap-1 rounded-md transition-colors`}
            onClick={handleButtonClick}
            disabled={isLoading}
            type="button"
          >
            <ThumbsUp size={16} className={isUpvoted ? "fill-white" : ""} />
            <span>{isInitializing ? "..." : `${upvoteCount} ${upvoteCount === 1 ? "Upvote" : "Upvotes"}`}</span>
            {isLoading && (
              <span className="ml-1 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
          </Button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={campaign?.banner?.file_url || "/placeholder.svg?height=300&width=1200&query=blockchain banner"}
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
            src={campaign?.logo?.file_url || "/placeholder.svg?height=60&width=60&query=logo"}
            alt="Project Logo"
            width={60}
            height={60}
            className="rounded"
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-[#5b5bf8] text-white rounded-full text-xs px-3 py-0.5">
              {campaign?.category || "DeFi"}
            </Badge>
            <Badge className="bg-[#10b981] text-white rounded-full text-xs px-3 py-0.5">
              {campaign?.stage || "Prototype"}
            </Badge>
            {campaign?.campaignStatus && (
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
          <h2 className="text-2xl font-bold">{campaign?.campaignName}</h2>
          <p className="text-gray-300 text-sm">{campaign?.tagline}</p>
          <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
            <span>Founder:</span>
            <Link href={`/public-profile/founder/${campaign?.project_id}`} className="text-[#39e7f5]">
              {campaign?.isOwner ? "You" : "NewUser"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
