"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ArrowUpRightFromSquareIcon, Building, CheckCircle, Router, Search, User, Wallet, X } from "lucide-react"
import Link from "next/link"
import { useUser } from "@auth0/nextjs-auth0/client"
import { API_URL } from '@/lib/config'
import { Button } from "@/components/ui/button"
import { CampaignCard } from "../components/campaign-card"
import { useRouter } from "next/navigation"
import {useToast} from '../../../hooks/use-toast'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AppLayout } from "@/components/layout/app-layout"

// Define the campaign type based on the API response
interface Campaign {
  campaignName: string
  user_id: string
  campaignId: string
  tagline: string
  category: string
  stage: string
  banner: {
    file_name: string
    file_url: string
    _id: string
  }
  logo: {
    file_name: string
    file_url: string
    _id: string
  }
  campaignStatus: string
  fundingTarget: number
  deadline: string | null
  totalRaised: number
  numberOfInvestors: number
  totalMilestones: number
  milestonesCompleted: number
  isOwner?: boolean // Added for compatibility with existing filter
}

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleCampaigns, setVisibleCampaigns] = useState(6)
  const [filter, setFilter] = useState<"all" | "my">("all")
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, isLoading: isUserLoading } = useUser()
  const [currentUserCampaign, setCurrentUserCampaign] = useState<Campaign | null>(null)
  const [haveStartup, setHaveStartup] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const [onBoardingStatus, setOnboardingStatus] = useState<string | null>(null)
  const [showOnboardingBar, setShowOnboardingBar] = useState(false)
  const [showOnboardingModal, setShowOnboardingModal] = useState(false)

    useEffect(() => {
        const getOnboardingStatus = async () => {
          try {
            if (!user || isLoading) return;
            const userID = user?.sub?.substring(14);
      
            const response = await fetch(
              `${API_URL}/api/profile/get-onboarding-status`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  user_id: userID || "",
                },
              }
            );
      
            // if (!response.ok) {
            //   throw new Error(`API error: ${response.status}`);
            // }
      
            const data = await response.json();
            setOnboardingStatus(data.status);
            if (data.status === false) {
              setShowOnboardingBar(true);
            }
  
            // Navigate based on the fetched status
              if (!data.role || (Array.isArray(data.role) && data.role.length === 0)) {
              setShowOnboardingModal(true);
              }
          } catch (error) {
            console.error("Error checking profile status:", error);
          }
        };
      
        getOnboardingStatus();
      }, [user, isLoading, router]);


  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     if (!isUserLoading && !user) {
  //       setIsLoggedIn(false)
  //     } else {
  //       setIsLoggedIn(true)
  //     }
  //   }

  //   checkLoggedIn()
  // }, [isUserLoading, user])

 useEffect(() => {
  const checkStartup = async () => {
    if (!user || isUserLoading) return;

    const userId = user?.sub?.substring(14);

    try {
      const response = await fetch(`${API_URL}/api/startup/get-projectId`, {
        headers: {
          user_id: userId,
        },
      });

      const data = await response.json();

      if (response.ok && data?.projectId) {
        setHaveStartup(true);
      } else {
        setHaveStartup(false);
      }
    } catch (error) {
      console.error("Failed to check startup:", error);
      setHaveStartup(false);
    }
  };

  checkStartup();
}, [isUserLoading, user]);

  // Fetch campaigns from API
// Main fetchCampaigns with 404/204 fix
useEffect(() => {
  const fetchCampaigns = async () => {
    setIsLoading(true)
    setError("") // Clear previous error

    try {
      const userId = user?.sub?.substring(14)

      const endpoint =
        filter === "all"
          ? `${API_URL}/api/startup/list-campaigns`
          : `${API_URL}/api/startup/list-my-campaigns`

      const response = await fetch(endpoint, {
        headers: filter === "my"
          ? { user_id: userId }
          : {},
      })

      if (response.status === 204 || response.status === 404) {
        setCampaigns([]) // No campaigns found
        return
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch campaigns: ${response.status}`)
      }

      const data = await response.json()
      const campaignsArray = Array.isArray(data.campaigns) ? data.campaigns : []

      const campaignsWithOwnership = campaignsArray.map((campaign: Campaign) => ({
        ...campaign,
        isOwner: userId ? campaign.user_id === userId : false,
      }))

      setCampaigns(campaignsWithOwnership)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch campaigns")
      console.error("Error fetching campaigns:", err)
    } finally {
      setIsLoading(false)
    }
  }

  fetchCampaigns()
}, [user, isUserLoading, filter])

// User campaign fetch with 404/204 handling
useEffect(() => {
  const fetchUserCampaign = async () => {
    try {
      if (!user || isUserLoading) return
      const userId = user.sub?.substring(14)

      const response = await fetch(`${API_URL}/api/startup/list-my-campaigns`, {
        headers: {
          user_id: userId,
        },
      })

      if (response.status === 204 || response.status === 404) {
        setCurrentUserCampaign(null)
        return
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch user campaigns: ${response.status}`)
      }

      const data = await response.json()
      const activeCampaign = data.campaigns.find(
        (campaign: Campaign) => campaign.campaignStatus === "Active"|| campaign.campaignStatus === "Pending"
      )

      setCurrentUserCampaign(activeCampaign || null)
    } catch (err) {
      console.error("Error fetching user campaigns:", err)
    }
  }

  fetchUserCampaign()
}, [user, isUserLoading])


  // Get the current campaign ID for the "View Current Campaign" button
  const currentCampaignId = currentUserCampaign?.campaignId || ""

  // Filter campaigns based on search query and ownership filter
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = true

    return matchesSearch && matchesFilter
  })

  // Load more campaigns
  const loadMoreCampaigns = () => {
    setVisibleCampaigns((prev) => Math.min(prev + 3, filteredCampaigns.length))
  }

console.log("haveStartup:", haveStartup);
  return (
    <>
    <AppLayout className="">
    <div className="min-h-screen bg-[#050914] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-1">Campaigns</h1>
            <p className="text-gray-400">Explore and support innovative blockchain projects</p>
          </div>
            <div className="flex gap-2 flex-col md:flex-row mt-4 sm:mt-0">
              {currentCampaignId && user && (
                <Link href={`/campaign/campaigns/${currentCampaignId}`}>
                  <Button className="bg-[#4361ff] hover:bg-[#4361ff]/90 text-white py-2 px-4 rounded-md font-medium w-full sm:w-auto">
                    View Current Campaign
                  </Button>
                </Link>
              )}
              {!isLoading && user &&
                <Button 
                disabled={currentUserCampaign}
                onClick={!haveStartup ? () => 
                  toast({
                  title: "Message",
                  description: "Please Create a Startup to have a campaign",
                  variant: "destructive",
                  }) 
                  : () => router.push("/campaign/create-campaign")}
                className="bg-[#4361ff] hover:bg-[#4361ff]/90 text-white py-2 px-4 rounded-md font-medium w-full sm:w-auto">Create Campaign</Button>
              }
            </div>
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
              onClick={() => {
                setFilter("all")
                setVisibleCampaigns(6)
              }}
            >
              All Campaigns
            </Button>
           {user && 
           <Button
              className={`${filter === "my" ? "bg-[#4361ff]" : "bg-transparent"} hover:bg-[#4361ff]/90 text-white px-6 py-2 rounded-md`}
              onClick={() => {
                setFilter("my")
                setVisibleCampaigns(6)
              }}
            >
              My Campaigns
            </Button>
            }
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#4361ff] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p className="mt-4 text-gray-400">Loading campaigns...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12 bg-[#0c1425] rounded-lg">
            <h3 className="text-xl font-bold mb-2 text-red-500">Error loading campaigns</h3>
            <p className="text-gray-400 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-[#4361ff] hover:bg-[#4361ff]/90 text-white">
              Try Again
            </Button>
          </div>
        )}

        {/* Campaign Grid - Updated to max 3 per row */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.slice(0, visibleCampaigns).map((campaign) => (
              <CampaignCard
                key={campaign.campaignId}
                campaign={{
                  id: campaign.campaignId,
                  name: campaign.campaignName,
                  description: campaign.tagline,
                  image: campaign.banner.file_url,
                  logo: campaign.logo.file_url,
                  categories: [{ name: campaign.category }, { name: campaign.stage }],
                  fundingGoal: campaign.fundingTarget,
                  fundingRaised: campaign.totalRaised,
                  deadline: campaign.deadline ? new Date(campaign.deadline) : null,
                  status: campaign.campaignStatus,
                  isOwner: campaign.isOwner || false,
                  totalMilestones: campaign.totalMilestones,
                  milestonesCompleted: campaign.milestonesCompleted,
                  numberOfInvestors: campaign.numberOfInvestors,
                }}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredCampaigns.length === 0 && (
          <div className="text-center py-12 sm:py-16 bg-[#0c1425] rounded-lg mt-8">
            <h3 className="text-xl font-bold mb-2">No campaigns found</h3>
            <p className="text-gray-400 mb-6 px-4">
              {filter === "my"
                ? "You don't have any campaigns yet. Create your first campaign to get started."
                : "No campaigns match your search criteria. Try adjusting your search."}
            </p>
            {filter === "my" && currentCampaignId && (
              <Link href={`/campaign/campaigns/${currentCampaignId}`}>
                <Button className="bg-[#4361ff] hover:bg-[#4361ff]/90 text-white">View Current Campaign</Button>
              </Link>
            )}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && !error && visibleCampaigns < filteredCampaigns.length && (
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
    </AppLayout>
    </>
  )
}
