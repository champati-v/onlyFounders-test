"use client"

import { API_URL } from '@/lib/config';
import { useState, useEffect } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Bookmark, Search, TrendingUp, Users, Calendar, ArrowUpRight, CheckCircle, Loader2Icon, ArrowUpRightFromSquareIcon, X, Building, Wallet, User, ArrowRight } from "lucide-react"
import { useUser } from "@auth0/nextjs-auth0/client"
import {useToast} from '../../hooks/use-toast'
import { useRouter } from "next/navigation"
import axios from "axios";
import { AppLayout } from '@/components/layout/app-layout';


// Define the startup interface based on the updated API response
interface Startup {
  startupName: string
  startup_id: string
  startupLogo?: string
  bannerImage?: string
  founderName: string
  tagline: string
  category: string
  startupStage: string
  blockchainPlatform: string
  totalRaised: number
  featuredStatus: "Featured" | "Trending" | string
  verifiedStatus: "Verified" | "Unverified"
  goal: number | null
  deadline: string | null
}

// Define the user role type
type UserRole = "Founder" | "Investor" | "serviceProvider" | null

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("all")
  const [startups, setStartups] = useState<Startup[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string[]>()
  const [isRoleLoading, setIsRoleLoading] = useState(false)
  const { user, isLoading: isUserLoading } = useUser()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasStartup, setHasStartup] = useState(false);
  const [startupLoading, setStartupLoading] = useState(false)
  const [searchItem, setSearchItem] = useState<string>("")
  const [onBoardingStatus, setOnboardingStatus] = useState<string | null>(null)
  const [showOnboardingBar, setShowOnboardingBar] = useState(false)
  const [showOnboardingModal, setShowOnboardingModal] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()


  
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

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (!isLoading && !user) {
        setIsLoggedIn(false);
      }
      else{
        setIsLoggedIn(true);
      }
    }
  
   checkLoggedIn();
  }, [isLoading, user])

  useEffect(() => {
    const checkStartup = async () => {
      try{
        console.log("Checking startup status now...")
        setStartupLoading(true)

        if(!user || isUserLoading) return
        const userID = user.sub?.substring(14)
        const response = await fetch(`${API_URL}/api/startup/check-startup`, {
          method: "GET",
          headers: {
            user_id: userID,
          },
        })

        if (response.status === 200) {
          const data = await response.json()
          if (data.status) {
            console.log("User has startup:", data)
            setHasStartup(true)
          }
        }
      }

      catch(err){
        console.error("Error checking startup:", err)
      }
      finally{
        setStartupLoading(false)
      }
    }
  
   checkStartup();
  }, [isLoading, user])

  // Fetch user role from API
  useEffect(() => {
    const fetchUserRole = async () => {
      // Only fetch role if user is logged in
      if (!user || isUserLoading) return

      try {
        setIsRoleLoading(true)
        const userID = user.sub?.substring(14)

        const response = await fetch(`${API_URL}/api/profile/get-onboarding-status`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            user_id: userID || "",
          },
        })

        // if (!response.ok) {
        //   throw new Error(`API error: ${response.status}`)
        // }

        const data = await response.json()
        console.log("data received from API: ", data)
        // Set user role from API response
        if (data.role) {
          const rolesArray = Array.isArray(data.role) ? data.role : [data.role]
          setUserRole(rolesArray)
        }
      } catch (err) {
        console.error("Error fetching user role:", err)
        // Fallback: show bookmark button if role can't be determined
        setUserRole([""])
      } finally {
        setIsRoleLoading(false)
      }
    }

    fetchUserRole()
  }, [user, isUserLoading])

  // Fetch startups from API
  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_URL}/api/startup/get-startup-listing`)

        // if (!response.ok) {
        //   throw new Error(`API error: ${response.status}`)
        // }

        const data = await response.json()
        setStartups(data.startups)
      } catch (err) {
        console.error("Error fetching startups:", err)
        setError("Failed to load startups. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStartups()
  }, [])

  const handleCreateStartup = () => {
    if(!user){
      toast({
        title: "Message",
        description: "Please login to create a startup",
        variant: "destructive",
      })
      router.push('api/auth/login')
    }

    else{
      router.push('startup-setup/basicInfo')
    }
  }

  // Filter startups based on active tab
  const filteredStartups = startups?.filter((startup) => {
    if (activeTab === "all") return true
    if (activeTab === "trending") return startup.featuredStatus === "Trending"
    if (activeTab === "featured") return startup.featuredStatus === "Featured"
    if (activeTab === "defi") return startup.category === "DEFI" || startup.category === "defi" || startup.category === "DeFi" 
    if (activeTab === "nfts") return startup.category === "NFT" || startup.category === "nft" || startup.category === "Nft"
    // Filter by category
    return startup.category.toLowerCase() === activeTab.toLowerCase()
  })

  // Get featured startups directly from the API response
  const featuredStartups = startups?.filter((startup) => startup.featuredStatus === "Featured")

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

    <AppLayout className=''>
    <div>
      <div className="container mx-auto py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Startup Marketplace</h1>
            <p className="text-gray-400">Discover and invest in promising Startups</p>
          </div>

          <div className="gap-4">
            <Button 
              onClick={() => handleCreateStartup()} 
              className={` ${userRole?.includes('Founder') ? 'block' : 'hidden'} bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white`} >
              {hasStartup? "Edit your Startup" : "Create a Startup"}
            </Button>
          </div>  
        </div>

        {isLoading ? (
          <>
            {/* Featured Startups Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, index) => (
                <Card key={`featured-skeleton-${index}`} className="bg-gray-900 border-gray-800 overflow-hidden">
                  <div className="relative h-48 w-full bg-gray-800/50 animate-pulse"></div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-md bg-gray-800/70 animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-40 bg-gray-800/70 rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-800/70 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="h-4 w-16 bg-gray-800/70 rounded animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-800/70 rounded animate-pulse"></div>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-800/70 rounded animate-pulse" style={{ width: "40%" }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-2">
                        <div className="h-4 w-16 mx-auto bg-gray-800/70 rounded animate-pulse"></div>
                        <div className="h-4 w-20 mx-auto bg-gray-800/70 rounded animate-pulse"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-16 mx-auto bg-gray-800/70 rounded animate-pulse"></div>
                        <div className="h-4 w-20 mx-auto bg-gray-800/70 rounded animate-pulse"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-16 mx-auto bg-gray-800/70 rounded animate-pulse"></div>
                        <div className="h-4 w-20 mx-auto bg-gray-800/70 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <div className="flex-1 h-10 bg-gray-800/70 rounded animate-pulse"></div>
                    <div className="w-10 h-10 bg-gray-800/70 rounded animate-pulse"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Search and Filter Skeleton */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 h-10 bg-gray-800/70 rounded animate-pulse"></div>
              <div className="w-[180px] h-10 bg-gray-800/70 rounded animate-pulse"></div>
            </div>

            {/* Tabs Skeleton */}
            <div className="space-y-6">
              <div className="h-10 bg-gray-800/70 rounded animate-pulse"></div>

              {/* Regular Cards Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={`card-skeleton-${index}`} className="bg-gray-900 border-gray-800 overflow-hidden">
                    <div className="relative h-40 w-full bg-gray-800/50 animate-pulse"></div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-gray-800/70 animate-pulse"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-5 w-32 bg-gray-800/70 rounded animate-pulse"></div>
                          <div className="flex gap-2">
                            <div className="h-4 w-16 bg-gray-800/70 rounded animate-pulse"></div>
                            <div className="h-4 w-20 bg-gray-800/70 rounded animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="h-4 w-full bg-gray-800/70 rounded animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-gray-800/70 rounded animate-pulse"></div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <div className="h-3 w-12 bg-gray-800/70 rounded animate-pulse"></div>
                          <div className="h-3 w-20 bg-gray-800/70 rounded animate-pulse"></div>
                        </div>
                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-800/70 rounded animate-pulse" style={{ width: "60%" }}></div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div className="h-3 w-24 bg-gray-800/70 rounded animate-pulse"></div>
                        <div className="h-3 w-24 bg-gray-800/70 rounded animate-pulse"></div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <div className="flex-1 h-9 bg-gray-800/70 rounded animate-pulse"></div>
                      <div className="w-10 h-9 bg-gray-800/70 rounded animate-pulse"></div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">{error}</div>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : (
          <>
            {/* Featured Startups */}
            {featuredStartups?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredStartups.slice(0, 2).map((startup, index) => (
                  <Card
                    key={index}
                    className="bg-gray-900 border-gray-800 overflow-hidden hover:border-blue-600 transition-colors"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={startup.bannerImage || "/placeholder.svg?height=192&width=384"}
                        alt={startup.startupName}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-blue-600">Featured</Badge>
                      </div>
                      <div className="absolute bottom-2 left-2 flex items-center gap-2">
                        <Badge className="bg-purple-600">{startup.startupStage}</Badge>
                        <Badge variant="outline" className="bg-gray-900/50 backdrop-blur-sm text-white border-gray-700">
                          {startup.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden bg-gray-800">
                          <Image
                            src={startup.startupLogo || "/placeholder.svg?height=48&width=48"}
                            alt={startup.startupName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center gap-2">
                            <div className="flex items-center gap-2">
                            <CardTitle className="text-xl text-white">{startup.startupName}</CardTitle>
                            {startup.verifiedStatus === "Verified" && (
                              <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                            )}</div>
                            {/* <Heart fill={hasUpvoted? "red" : "none"} stroke={hasUpvoted? "red" : "white"} className="h-8 w-8 bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-all duration-200 cursor-pointer flex-shrink-0" /> */}
                          </div>
                          <CardDescription className="text-gray-400">{startup.tagline}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">
                              {startup.goal
                                ? `${Math.min(100, ((startup.totalRaised / startup.goal) * 100)).toFixed(0)}%`
                                : "0%"}
                          </span>
                          <span className="text-white font-medium">
                            {startup.totalRaised.toLocaleString()} USDC / {startup.goal?.toLocaleString() || 0} USDC
                          </span>
                        </div>
                        <Progress
                          value={startup.goal ? (startup.totalRaised / startup.goal) * 100 : 0}
                          // value={50}
                          className="h-2 bg-slate-800"
                          indicatorClassName="bg-purple-500"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-400">Founder</div>
                          <div className="text-white font-medium">{startup.founderName}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-400">Blockchain</div>
                          <div className="text-white font-medium">{startup.blockchainPlatform}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-400">Deadline</div>
                          <div className="text-white font-medium">
                            {startup.deadline ? new Date(startup.deadline).toLocaleDateString() : "No deadline"}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      > 
                        <Button onClick={() => {
                          // if (isLoggedIn) {
                          //   router.push(`/marketplace/project/${startup.startup_id}`)
                          // } else {
                          //   toast({
                          //     title: "Message",
                          //     description: "Please login to view startup details",
                          //     variant: "destructive",
                          //   })
                          //   router.push('api/auth/login')
                          // }
                          router.push(`/marketplace/project/${startup.startup_id}`)
                        }} disabled={isLoading}>
                          View Details
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input placeholder="Search projects..." className="pl-9 bg-gray-900 border-gray-700 text-white" value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
              </div>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6 ">
              <div className="flex items-center justify-center">
              <TabsList className="bg-gray-900 border border-gray-800 p-1">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
                >
                  All <span className="hidden md:block">Projects</span> 
                </TabsTrigger>
                <TabsTrigger
                  value="trending"
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
                >
                  <TrendingUp className="mr-2 h-4 w-4 hidden md:block" />
                  Trending
                </TabsTrigger>
                <TabsTrigger
                  value="featured"
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
                >
                  Featured
                </TabsTrigger>
                <TabsTrigger
                  value="defi"
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
                >
                  DeFi
                </TabsTrigger>
                <TabsTrigger
                  value="nfts"
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
                >
                  NFTs
                </TabsTrigger>
              </TabsList>
              </div>

              <TabsContent value={activeTab} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredStartups?.filter((startup) => 
                    startup.startupName.toLowerCase().includes(searchItem.toLowerCase()) ||
                    startup.category?.toLowerCase().includes(searchItem.toLowerCase())
                    ).map((startup, index) => (
                    <Card
                      key={index}
                      className="bg-gray-900 border-gray-800 overflow-hidden hover:border-blue-600 transition-colors"
                    >
                      <div className="relative h-40 w-full">
                        <Image
                          src={startup.bannerImage || "/placeholder.svg?height=160&width=320"}
                          alt={startup.startupName}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                        {startup.featuredStatus === "Trending" && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-amber-600">
                              <TrendingUp className="mr-1 h-3 w-3" />
                              Trending
                            </Badge>
                          </div>
                        )}
                        {startup.featuredStatus === "Featured" && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-blue-600">Featured</Badge>
                          </div>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-800">
                            <Image
                              src={startup.startupLogo || "/placeholder.svg?height=40&width=40"}
                              alt={startup.startupName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-purple-600 text-xs">{startup.startupStage}</Badge>
                              <Badge variant="outline" className="bg-gray-800/50 text-xs text-gray-300 border-gray-700">
                                {startup.category}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                              <div className="flex items-center gap-2">
                              <CardTitle className="text-lg text-white">{startup.startupName}</CardTitle>
                              {startup.verifiedStatus === "Verified" && (
                                <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                              )}</div>
                              {/* <Heart className="h-8 w-8 bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-all duration-200 cursor-pointer flex-shrink-0" /> */}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-gray-400 leading-snug min-h-[3.5rem] line-clamp-2">{startup.tagline}</p>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">
                                {startup.goal
                                ? `${Math.min(100, ((startup.totalRaised / startup.goal) * 100)).toFixed(0)}%`
                                : "0%"}
                          </span>
                            <span className="text-white">
                              {startup.totalRaised.toLocaleString()} USDC / {startup.goal?.toLocaleString() || 0} USDC
                            </span>
                          </div>
                          <Progress
                            value={startup.goal ? (startup.totalRaised / startup.goal) * 100: 0}
                            // value={50}
                            className="h-1.5 bg-gray-800"
                            indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                          />
                        </div>

                        <div className="flex justify-between text-xs text-gray-400">
                          <div className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            {startup.founderName}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {startup.deadline ? new Date(startup.deadline).toLocaleDateString() : "No deadline"}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          <Button onClick={() => {
                            // if (isLoggedIn) {
                            //   router.push(`/marketplace/project/${startup.startup_id}`)
                            // } else {
                            //   toast({
                            //     title: "Message",
                            //     description: "Please login to view startup details",
                            //     variant: "destructive",
                            //   })
                            // }
                            router.push(`/marketplace/project/${startup.startup_id}`)
                          }} disabled={isLoading}>
                            View Details
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {filteredStartups?.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No projects found</h3>
                    <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                    <Button onClick={() => setActiveTab("all")}>View All Projects</Button>
                  </div>
                )}

                {filteredStartups?.length > 0 && (
                  <div className="flex justify-center">
                    <Button variant="outline" className="text-gray-300 border-gray-700">
                      Load More Projects
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>

            {/* {showOnboardingModal && (
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
          )} */}
    </div>
    </AppLayout>
    </>
  )
}