"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useUser } from "@auth0/nextjs-auth0/client"
import { API_URL } from '@/lib/config';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CampaignHeader } from "../../components/campaign-header"
import { FundingSidebar } from "../../components/funding-sidebar"
import { OverviewTab } from "./tabs/overview-tab"
import { FundingDetailsTab } from "./tabs/funding-details-tab"
import { MilestonesTab } from "./tabs/milestones-tab"
import { TeamTab } from "./tabs/team-tab"
import { TokenomicsTab } from "./tabs/tokenomics-tab"
import { FaqTab } from "./tabs/faq-tab"
import { UpdatesTab } from "./tabs/updates-tab"
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

// Define the campaign interface based on the API response
interface Milestone {
  milestoneId: string
  name: string
  fundPercentage: number
  description: string
  requirements: {
    name: string
    description: string
    status: string
    _id: string
  }[]
  verificationProof: string
  milestoneStatus: string
  adminApprovalStatus: string
  rejectionReason: null | string
  _id: string
}

interface FAQ {
  question: string
  answer: string
  _id: string
}

interface FileInfo {
  file_name: string
  file_url: string
  _id: string
}

interface SocialLinks {
  website: string
  twitter: string
  github: string
  telegram: string
  discord: string
  medium: string
}

interface Campaign {
  _id: string
  user_id: string
  project_id: string
  campaignOverview: string
  campaignName: string
  tagline: string
  description: string
  category: string
  stage: string
  logo: FileInfo
  banner: FileInfo
  socialLinks: SocialLinks
  whitePaperUrl: string
  pitchDeckUrl: string
  pitchDemoVideoUrl: string
  totalRaisedOnPlatform: number
  fullyDilutedValuation: number
  initialMarketCap: number
  verifiedStatus: boolean
  campaignCompletionStatus: boolean
  visibility: string
  campaignStatus: string
  faqs: FAQ[]
  milestones: Milestone[]
  acceptedCurrencyType: string
  deadline: string
  dealName: string
  dealRound: string
  fundingHeaderImage: FileInfo
  fundingTarget: number
  fundraisingWallet: string
  vestingSummary: string
  tokenPrice: number
}

export default function CampaignDetailPage() {
  const params = useParams()
  const campaignId = params.id as string
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, isLoading: isUserLoading } = useUser()
  const [isOwner, setIsOwner] = useState(false)
  const {toast} = useToast()
  const [updates, setUpdates] = useState<any[]>([]); // Adjust type as needed

  // Fetch campaign details from API
  useEffect(() => {
    const fetchCampaignDetails = async () => {
      setIsLoading(true)
      try {
        if (!campaignId) {
          throw new Error("Campaign ID is required")
        }

        // Get user ID for the API request header
        const userId = user?.sub?.substring(14)

        const response = await fetch(`${API_URL}/api/startup/get-campaign`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // user_id: userId,
          },
          body: JSON.stringify({ campaignId }),
        })


        const data = await response.json()
        setCampaign(data.campaign)
        console.log("Campaign Data:", data.campaign)

        // Check if the current user is the owner of the campaign
        if(user){
          setIsOwner(data.campaign.user_id === userId)
        }
 

      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch campaign details")
        console.error("Error fetching campaign details:", err)
      } finally {
        setIsLoading(false)
      }
    }

      fetchCampaignDetails()

  }, [campaignId, user, isUserLoading])


  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050914] text-white flex items-center justify-center">
        <div className="text-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#4361ff] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <p className="mt-4 text-gray-400">Loading campaign details...</p>
        </div>
      </div>
    )
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-[#050914] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12 bg-[#0c1425] rounded-lg">
            <h3 className="text-xl font-bold mb-2 text-red-500">Error loading campaign</h3>
            <p className="text-gray-400 mb-6">{error || "Campaign not found"}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#4361ff] hover:bg-[#4361ff]/90 text-white py-2 px-4 rounded-md"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }


  // Format campaign data for the components
  const formattedCampaign = {
    ...campaign,
    milestones: {
      completed: campaign.milestones.filter((m) => m.milestoneStatus === "complete").length,
      total: campaign.milestones.length,
    },
  }

  return (
    <div className="min-h-screen bg-[#050914] text-white">
      <div className="px-12 pt-4">
        <CampaignHeader campaign={formattedCampaign} />
      </div>
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-16 xl:px-16 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <div className="overflow-x-auto pb-2">
                <TabsList className="w-full flex whitespace-nowrap mb-4 sm:mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="funding-details">Funding Details</TabsTrigger>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview">
                <OverviewTab campaign={campaign} />
              </TabsContent>

              <TabsContent value="funding-details">
                <FundingDetailsTab campaign={campaign} />
              </TabsContent>

              <TabsContent value="milestones">
                <MilestonesTab campaign={campaign} isOwner={isOwner} campaignId={campaignId} />
              </TabsContent>

              <TabsContent value="team">
                <TeamTab campaign={campaign} />
              </TabsContent>

              <TabsContent value="tokenomics">
                <TokenomicsTab campaign={campaign} />
              </TabsContent>

              <TabsContent value="faq">
                <FaqTab campaign={campaign} />
              </TabsContent>

              <TabsContent value="updates">
                <UpdatesTab campaign={campaign} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1 order-first lg:order-last">
            <FundingSidebar campaign={formattedCampaign} />
          </div>
        </div>
      </div>
    </div>
  )
}
