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
import { Separator } from "@radix-ui/react-separator"
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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // State for storing the user's current campaign
  const [currentUserCampaign, setCurrentUserCampaign] = useState<Campaign | null>(null)
  const [haveStartup, setHaveStartup] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const [onBoardingStatus, setOnboardingStatus] = useState<string | null>(null)
  const [showOnboardingBar, setShowOnboardingBar] = useState(false)
  const [showOnboardingModal, setShowOnboardingModal] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const getOnboardingStatus = async () => {
          try {
            if (!user || isLoading) return;
            const userID = user.sub?.substring(14);
      
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
              } else {
              router.push("/");
              }
          } catch (error) {
            console.error("Error checking profile status:", error);
          }
        };
      
        getOnboardingStatus();
      }, [user, isLoading, router]);


  useEffect(() => {
    const checkLoggedIn = async () => {
      if (!isUserLoading && !user) {
        setIsLoggedIn(false)
      } else {
        setIsLoggedIn(true)
      }
    }

    checkLoggedIn()
  }, [isUserLoading, user])

  useEffect(() => {
    const checkStartup = async () => {
      const userId = user?.sub?.substring(14)
      if (!userId) return

      const response = await fetch(`${API_URL}/api/startup/get-projectId`, {
        headers: {
          user_id: userId,
        },
      })
      if (response.status === 200) {
        setHaveStartup(true)
      }else {
        setHaveStartup(false)
      }
    }

    checkStartup()
  }, [isUserLoading, user])


  const handleRoleToggle = (role: string) => {
    setSelectedTypes((prev) => {
      // If role is already selected, remove it
      if (prev.includes(role)) {
        return prev.filter((r) => r !== role)
      }
      // Otherwise add it to the array
      return [...prev, role]
    })
  }

  const handleContinue = async () => {
        if (selectedTypes.length === 0) return
    
        setIsSubmitting(true)
    
        try {
          const userId = user?.sub?.substring(14)
    
          if (!userId) {
            toast({
              title: "Authentication error",
              description: "Please sign in again to continue.",
              variant: "destructive",
            })
            router.push("/api/auth/login")
            return
          }
    
          const response = await fetch(`${API_URL}/api/profile/submit-role`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              user_id: userId,
            },
            body: JSON.stringify({
              role: selectedTypes,
            }),
          })
  
          if(response.status === 200) {
            toast({
              title: "Success",
              description: "Your role has been saved successfully.",
              variant: "default",
            })
            setShowOnboardingModal(false)
          }
    
          // const getRole = await fetch(`${API_URL}/api/profile/get-onboarding-status`, {
          //   method: "GET",
          //   headers: {
          //     user_id: user?.sub?.substring(14),
          //   },
          // })
    
        } catch (error) {
          console.error("Error submitting role:", error)
          toast({
            title: "Something went wrong",
            description: "Failed to save your role. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsSubmitting(false)
        }
      }

  // Fetch campaigns from API
// Main fetchCampaigns with 404/204 fix
useEffect(() => {
  const fetchCampaigns = async () => {
    setIsLoading(true)
    setError("") // Clear previous error

    try {
      if (!user || isUserLoading) return
      const userId = user.sub?.substring(14)

      const endpoint =
        filter === "all"
          ? `${API_URL}/api/startup/list-campaigns`
          : `${API_URL}/api/startup/list-my-campaigns`

      const response = await fetch(endpoint, {
        headers: {
          user_id: userId,
        },
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

      console.log("isOwner", campaignsWithOwnership.map(c => c.isOwner))
      setCampaigns(campaignsWithOwnership)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch campaigns")
      console.error("Error fetching campaigns:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (user && !isUserLoading) {
    fetchCampaigns()
  }
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
        (campaign: Campaign) => campaign.campaignStatus === "Active"
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

  // Handle login redirect
  if (!user && !isUserLoading) {
    return (
      <>
        <div className="bg-[#050914] text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-1">Campaigns</h1>
                <p className="text-gray-400">Explore and support innovative blockchain projects</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <p className="text-lg text-gray-400">Please login to view campaigns</p>
          <Button
            onClick={() => router.push("/api/auth/login")}
            className="bg-[#4361ff] hover:bg-[#4361ff]/90 text-white py-2 px-4 rounded-md font-medium mb-4"
          >
            Login
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
    {showOnboardingBar && (
      <div className="w-full bg-slate-800 text-sm py-2 px-4 relative flex justify-center">
        <div className="flex flex-col md:flex-row items-center gap-1 text-center text-white max-w-screen-md">
          <span className="text-blue-400">Welcome to OnlyFounders!</span>
          <div className="flex items-center gap-1">
            <span>To get full access to our platform,</span>
            <span onClick={() => router.push('/profile/setup')} className="inline-flex items-center justify-center underline text-blue-400 cursor-pointer">
              complete your profile now
              <ArrowUpRightFromSquareIcon className="w-4 h-4 ml-1" />
            </span>
          </div>
        </div>
        
        {/* Close Button */}
        <button onClick={() => setShowOnboardingBar(true)} className="absolute right-3 md:right-4 top-4 md:top-1/2 -translate-y-1/2 text-white sm:right-6">
          <X className="w-4 h-4" />
        </button>
      </div>
    )}

    <AppLayout className="">
    <div className="min-h-screen bg-[#050914] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-1">Campaigns</h1>
            <p className="text-gray-400">Explore and support innovative blockchain projects</p>
          </div>
            <div className="flex gap-2 flex-col md:flex-row mt-4 sm:mt-0">
              {currentCampaignId && (
                <Link href={`/campaign/campaigns/${currentCampaignId}`}>
                  <Button className="bg-[#4361ff] hover:bg-[#4361ff]/90 text-white py-2 px-4 rounded-md font-medium w-full sm:w-auto">
                    View Current Campaign
                  </Button>
                </Link>
              )}
              {!isLoading &&
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
            <Button
              className={`${filter === "my" ? "bg-[#4361ff]" : "bg-transparent"} hover:bg-[#4361ff]/90 text-white px-6 py-2 rounded-md`}
              onClick={() => {
                setFilter("my")
                setVisibleCampaigns(6)
              }}
            >
              My Campaigns
            </Button>
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

      {showOnboardingModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/10">
        <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome to OnlyFounders</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Complete your profile to get started with our Web3 fundraising platform
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Choose Your Role(s)</CardTitle>
                <CardDescription className="text-gray-400">
                  Select how you want to use OnlyFounders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedTypes.includes("Founder")
                      ? "border-blue-600 bg-blue-950/20"
                      : "border-gray-800 bg-gray-800/50 hover:border-gray-700"
                  }`}
                  onClick={() => handleRoleToggle("Founder")}
                >
                  <div className="mr-4 p-2 rounded-full bg-blue-900/30">
                    <Building className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">I'm a Founder</h3>
                      {selectedTypes.includes("Founder")? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ): (
                        <div className="bg-gray-600 rounded-full h-5 w-5" />
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      Raise funds for your Web3 project, connect with investors, and grow your startup
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedTypes.includes("Investor")
                      ? "border-purple-600 bg-purple-950/20"
                      : "border-gray-800 bg-gray-800/50 hover:border-gray-700"
                  }`}
                  onClick={() => handleRoleToggle("Investor")}
                >
                  <div className="mr-4 p-2 rounded-full bg-purple-900/30">
                    <Wallet className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">I'm an Investor</h3>
                      {selectedTypes.includes("Investor")? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ): (
                          <div className="bg-gray-600 rounded-full h-5 w-5" />
                        )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      Discover promising Web3 projects, invest in blockchain startups, and track your portfolio
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedTypes.includes("ServiceProvider")
                      ? "border-amber-600 bg-amber-950/20"
                      : "border-gray-800 bg-gray-800/50 hover:border-gray-700"
                  }`}
                  onClick={() => handleRoleToggle("ServiceProvider")}
                >
                  <div className="mr-4 p-2 rounded-full bg-amber-900/30">
                    <User className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">I'm a Service Provider</h3>
                      {selectedTypes.includes("ServiceProvider")? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ): (
                            <div className="bg-gray-600 rounded-full h-5 w-5" />
                          )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      Connect with Startups, Mentor, Scale, Support and Build.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="mb-4 w-full flex flex-col items-center"> 
                  <Button
                    onClick={() => handleContinue()} 
                    className="w-full bg-black hover:bg-gray-800 text-white border border-gray-800">
                     {isSubmitting ? "Submitting..." : "Continue"}
                     {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      </div>
    )}
    </div>
    </AppLayout>
    </>
  )
}
