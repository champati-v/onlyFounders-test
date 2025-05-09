"use client"

import { API_URL } from '@/lib/config';
import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, Clock, Eye, Users } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useUser } from "@auth0/nextjs-auth0/client"

// Types for our API data
interface Campaign {
  campaignName: string
  tagline: string
  category: string
  stage: string
  banner?: {
    file_name: string
    file_url: string
    _id: string
  }
  logo?: {
    file_name: string
    file_url: string
    _id: string
  }
  campaignStatus: string
  fundingTarget: number
  deadline: string
  totalRaised: number
  totalMilestones: number
  _id?: string // For compatibility with existing code
  id?: string // For compatibility with existing code
  status?: "active" | "draft" | "completed" // For compatibility with existing code
  investors?: number // For compatibility with existing code
}

interface ApiResponse {
  message: string
  campaigns: Campaign[]
}

interface DashboardStats {
  totalCampaigns: number // Total number of campaigns
  activeCampaigns: number // Number of active campaigns
  totalRaised: number // Total amount raised across all campaigns
  raisedIncrease: number // Increase in the amount raised
  totalInvestors: number // Total number of investors
  newInvestors: number // Number of new investors
  milestones: {
    completed: number // Number of completed milestones
    total: number // Total number of milestones
    completionRate: number // Completion rate of milestones
  }
}

export default function FundraisingCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(true)
  const { user, isLoading } = useUser()

  useEffect(() => {
    // Fetch campaigns
    const fetchCampaigns = async () => {
      try {
        if (!user || isLoading) return

        const userID = user?.sub?.substring(14)

        const response = await fetch(`${API_URL}/api/startup/list-campaigns`, {
          headers: {
            user_id: userID,
          },
        })
        const data: ApiResponse = await response.json()

        // Extract campaigns array from the response
        if (data && Array.isArray(data.campaigns)) {
          // Map the campaigns to ensure compatibility with existing code
          const mappedCampaigns = data.campaigns.map((campaign) => ({
            ...campaign,
            id: campaign._id || Math.random().toString(), // Use _id if available or generate a random id
            status: campaign.campaignStatus?.toLowerCase() as "active" | "draft" | "completed",
            investors: 0, // Default value since it's not in the API response
          }))
          setCampaigns(mappedCampaigns)
        } else {
          console.error("API response does not contain campaigns array:", data)
        }
      } catch (error) {
        console.error("Failed to fetch campaigns:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [user, isLoading])

  // Filter campaigns based on active tab
  const filteredCampaigns = campaigns.filter((campaign) => {
    if (activeTab === "all") return true
    return campaign.campaignStatus?.toLowerCase() === activeTab
  })

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-primary">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Fundraising Campaigns</h1>
            <p className="text-gray-400">Create and manage your fundraising campaigns</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <span className="mr-2">+</span> Create Campaign
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-[#0F0B1E] border border-gray-800 rounded-md w-full justify-start">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-[#0F0B1E] data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none flex-1"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-[#0F0B1E] data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none flex-1"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="draft"
              className="data-[state=active]:bg-[#0F0B1E] data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none flex-1"
            >
              Drafts
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-[#0F0B1E] data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none flex-1"
            >
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="bg-[#0F0B1E] border border-gray-800 overflow-hidden text-white">
              {/* Campaign Image */}
              <div className="relative h-48 bg-gradient-to-b from-gray-700 to-gray-900">
                {campaign.banner && campaign.banner.file_url ? (
                  <Image
                    src={campaign.banner.file_url || "/placeholder.svg"}
                    alt={campaign.campaignName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Image src="/placeholder.svg" alt="Placeholder" width={24} height={24} />
                  </div>
                )}
                {campaign.campaignStatus?.toLowerCase() === "active" && (
                  <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">Active</Badge>
                )}
              </div>

              {/* Campaign Info */}
              <CardHeader className="pb-2">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-800 rounded-md h-10 w-10 flex items-center justify-center">
                    {/* Campaign logo placeholder */}
                    <Image src={campaign.logo?.file_url} alt="Placeholder" width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{campaign.campaignName}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="bg-purple-900 hover:bg-purple-800 text-white">
                        {campaign.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pb-2">
                <p className="text-gray-400 text-sm mb-4">{campaign.tagline}</p>

                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Raised</span>
                    <span className="font-medium">
                      ${formatCurrency(campaign.totalRaised)} / ${formatCurrency(campaign.fundingTarget)}
                    </span>
                  </div>
                  <Progress value={(campaign.totalRaised / campaign.fundingTarget) * 100} className="h-2 bg-gray-800" />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4 pt-0">
                <div className="grid grid-cols-2 gap-4 w-full text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-gray-400">Deadline:</div>
                      <div>{formatDate(campaign.deadline)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-gray-400">Updated:</div>
                      {/* <div>{formatDate(campaign.updated)}</div> */}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div>{campaign.investors} investors</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-500">{campaign.totalMilestones} milestones</p>
                  </div>
                </div>

                <div className="flex gap-2 w-full mt-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Manage Campaign</Button>
                  <Button variant="outline" size="icon" className="border-gray-700">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

