"use client"

import { API_URL } from "@/lib/config"
import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, CheckCircle, LineChart, Plus, TrendingUp, Wallet } from "lucide-react"
import { AIInvestmentAssistant } from "@/components/ai-investment-assistant"
import { MilestoneTracker } from "@/components/milestone-tracker"
import { PortfolioAnalytics } from "@/components/portfolio-analytics"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function InvestorDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const {toast} = useToast()
  const [loading, setLoading] = useState(false)
  const {user, isLoading: userLoading} = useUser()
  const router = useRouter()
  const [investorStats, setInvestorStats] = useState({
    totalInvested: 0,
    activeInvestmentCount: 0,
    bestPerformingCampaign: {
      campaignName: "N/A",
      completedMilestones: 0
    },
    worstPerformingCampaign: {
      campaignName: "N/A",
      completedMilestones: 0
    },
    totalReturns: 0,
    roi: 0,
    currentValue: 0
  })

 const [activeInvestments, setActiveInvestments] = useState({
    message: "",
    investments: [],
  })

  const [watchlistData, setWatchlistData] = useState({
    message: "",
    startups: [],
  })
  const [fetchingWatchlist, setFetchingWatchlist] = useState(false)

  useEffect(() => {
    const fetchActiveInvestments = async () => {
      if (userLoading || !user) return

      try {
        const userId = user.sub?.substring(14)

        if (!userId) {
          toast({
            title: "Authentication error",
            description: "Please sign in again to continue.",
            variant: "destructive",
          })
          router.push("/api/auth/login")
          return
        }

        const response = await axios.get(`${API_URL}/api/profile/get-active-investments-for-investor`, {
          headers: {
            user_id: userId,
          },
        })
        setActiveInvestments(response.data)
      } catch (error) {
        console.error("Error fetching active investments:", error)
      }
    }
    fetchActiveInvestments()
  }, [user, userLoading, router, toast])

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (userLoading || !user) return

      try {
        setFetchingWatchlist(true)
        const userId = user.sub?.substring(14)

        if (!userId) {
          toast({
            title: "Authentication error",
            description: "Please sign in again to continue.",
            variant: "destructive",
          })
          router.push("/api/auth/login")
          return
        }

        const response = await axios.get(`${API_URL}/api/startup/list-watchList`, {
          headers: {
            user_id: userId,
          },
        })
        setWatchlistData(response.data)
      } catch (error) {
        console.error("Error fetching watchlist:", error)
      } finally {
        setFetchingWatchlist(false)
      }
    }
    fetchWatchlist()
  }, [user, userLoading, router, toast])


    useEffect(() => {
    const fetchActiveInvestments = async () => {
      if (userLoading || !user) return

      try {
        const userId = user.sub?.substring(14)

          if (!userId) {
            toast({
              title: "Authentication error",
              description: "Please sign in again to continue.",
              variant: "destructive",
            })
            router.push("/api/auth/login")
            return
          }

        const response = await fetch(`${API_URL}/api/profile/get-investor-active-investments`, {
          method: "GET",
          headers: {
            user_id: userId,
          },
        });
        const data = await response.json();
        setActiveInvestments(data);
      } catch (error) {
        console.error("Error fetching active investments:", error);
      }
    };
    fetchActiveInvestments();
    }, [user, userLoading]);



   useEffect(() => {
      const fetchInvestorStats = async () => {
        if (userLoading || !user) return
  
        try {
          setLoading(true)
          const userId = user.sub?.substring(14)
  
          if (!userId) {
            toast({
              title: "Authentication error",
              description: "Please sign in again to continue.",
              variant: "destructive",
            })
            router.push("/api/auth/login")
            return
          }
          const response = await fetch(`${API_URL}/api/profile/get-investor-dashboard-analytics`, {
            method: "GET",
            headers: {
              user_id: userId,
            }
          })
  
          const data = await response.json()
          setInvestorStats({
            ...data 
          })
        } catch (err) {
          console.error("Error fetching founder stats:", err)
        } finally {
          setLoading(false)
        }
      }
  
      fetchInvestorStats()
    }, [user, userLoading])

  // Mock data for the dashboard
  const portfolioStats = {
    totalInvested: 45000,
    activeInvestments: 8,
    pendingCommitments: 15000,
    totalReturns: 12500,
    roi: 27.8,
  }

  // const activeInvestments = [
  //   {
  //     id: "1",
  //     name: "DecentraVault",
  //     logo: "/placeholder.svg?height=48&width=48",
  //     category: "DeFi",
  //     invested: 10000,
  //     currentValue: 12500,
  //     roi: 25,
  //     date: "Oct 15, 2023",
  //     verified: true,
  //   },
  //   {
  //     id: "2",
  //     name: "MetaCanvas",
  //     logo: "/placeholder.svg?height=48&width=48",
  //     category: "NFT",
  //     invested: 5000,
  //     currentValue: 7500,
  //     roi: 50,
  //     date: "Sep 20, 2023",
  //     verified: true,
  //   },
  //   {
  //     id: "3",
  //     name: "ChainGovernance",
  //     logo: "/placeholder.svg?height=48&width=48",
  //     category: "DAO",
  //     invested: 15000,
  //     currentValue: 16000,
  //     roi: 6.7,
  //     date: "Nov 5, 2023",
  //     verified: true,
  //   },
  //   {
  //     id: "4",
  //     name: "DeFi Aggregator",
  //     logo: "/placeholder.svg?height=48&width=48",
  //     category: "DeFi",
  //     invested: 7500,
  //     currentValue: 6500,
  //     roi: -13.3,
  //     date: "Aug 10, 2023",
  //     verified: false,
  //   },
  // ]

  const watchlist = [
    {
      id: "5",
      name: "GameFi World",
      logo: "/placeholder.svg?height=48&width=48",
      category: "Gaming",
      raised: 750000,
      goal: 1000000,
      progress: 75,
      daysLeft: 5,
      verified: true,
    },
    {
      id: "6",
      name: "Cross-Chain Bridge",
      logo: "/placeholder.svg?height=48&width=48",
      category: "Infrastructure",
      raised: 560000,
      goal: 800000,
      progress: 70,
      daysLeft: 3,
      verified: true,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Investor Dashboard</h1>
            <p className="text-purple-200/70">Manage your investments and discover new opportunities</p>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="hidden md:grid grid-cols-1 sm:grid-cols-5 gap-2 bg-[#1F2A3D] p-1 rounded-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="quests" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Quests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
                <CardHeader className="pb-2">
                  <CardDescription className="text-purple-200/70">Total Invested</CardDescription>
                  <CardTitle className="text-2xl text-white">
                    {investorStats.totalInvested} USDC
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-green-500 flex items-center">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    {/* 15.3% increase from last month */}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
                <CardHeader className="pb-2">
                  <CardDescription className="text-purple-200/70">Active Investments</CardDescription>
                  <CardTitle className="text-2xl text-white">{investorStats.activeInvestmentCount}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-green-500 flex items-center">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    {/* 2 new investments this month */}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
                <CardHeader className="pb-2">
                  <CardDescription className="text-purple-200/70">Total Returns</CardDescription>
                  <CardTitle className="text-2xl text-white">
                    {investorStats.totalReturns} USDC
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-green-500 flex items-center">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    {/* 8.7% increase from last month */}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
                <CardHeader className="pb-2">
                  <CardDescription className="text-purple-200/70">ROI</CardDescription>
                  <CardTitle className="text-2xl text-white">{investorStats.roi}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-green-500 flex items-center">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    {/* 3.2% increase from last month */}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[50px] flex items-center justify-center bg-purple-900/30 rounded-lg border border-purple-800/20 relative overflow-hidden">
                    <div className="absolute inset-0">
                      {/* <Image
                        src="/placeholder.svg?height=300&width=600&text=Portfolio+Performance+Chart"
                        alt="Portfolio performance chart"
                        fill
                        className="object-cover opacity-70"
                      /> */}
                      <h1 className="text-center mt-2">Coming soon...</h1>
                    </div>
                    {/* <div className="relative z-10">
                      <LineChart className="h-12 w-12 text-purple-200/70 mx-auto mb-4" />
                      <p className="text-purple-200/70">Portfolio performance over time</p>
                    </div> */}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white mb-4">Active Investments</h3>
                    <div className="space-y-3">
                      {activeInvestments?.investments.map((investment, key) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-3 rounded-lg bg-purple-900/30 border border-purple-800/20"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden relative">
                              <Image
                                src={investment.startupLogo || "/placeholder.svg"}
                                alt={investment.campaignName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <h4 className="font-medium text-white">{investment.campaignName}</h4>
                                {/* {investment.verified && <CheckCircle className="h-3 w-3 text-blue-400" />} */}
                              </div>
                              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                                {investment.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-white">{investment.investedAmount} USDC</div>
                            {/* <div className="flex items-center justify-end text-xs">
                              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                              <span className="text-green-500">{investment.roi}% ROI</span>
                            </div> */}
                          </div>
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        className="w-full text-white border-purple-800/20 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:bg-purple-900/50"
                        onClick={() => router.push("/investor-dashboard/portfolio")}
                      >
                        View All Investments
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-white">Watchlist</CardTitle>
                    <Button variant="link" className="text-blue-400" onClick={() => router.push('/investor-dashboard/watchlist')}>
                      View All
                    </Button>
                  </div>
                </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                    {fetchingWatchlist ? (
                      <div className="text-center">
                        Loading watchlist...
                      </div>
                    ) : (
                      <>
                           {watchlistData.startups.slice(0, 2).map((project, index) => (
                      <div key={index} className="p-3 rounded-lg bg-purple-900/30 border border-purple-800/20">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden relative">
                              <Image
                                src="/placeholder.svg?height=48&width=48"
                                alt={project.startupName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <h4 className="font-medium text-white">{project.startupName}</h4>
                              </div>
                              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                                {project.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-white">
                              {project.deadline !== "NA"
                                ? `${new Date(project.deadline).toLocaleDateString()}`
                                : "No deadline"}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-purple-200/70">Raised</span>
                            <span className="text-white">
                              {project.totalRaised.toLocaleString()} / {project.fundingTarget.toLocaleString()} USDC
                            </span>
                          </div>
                          <Progress
                            value={project.fundingTarget > 0 ? (project.totalRaised / project.fundingTarget) * 100 : 0}
                            className="h-2 bg-purple-900/30"
                            indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                          />
                        </div>

                        <div className="flex justify-between mt-3">
                          <Button onClick={() => router.push('/campaign/campaigns')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                            Invest Now
                          </Button>
                        </div>
                      </div>
                    ))}
                      </>
                    )}
                 
                  </div>
                </CardContent>
              </Card>
            </div>

            <AIInvestmentAssistant />
            <MilestoneTracker />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioAnalytics />
          </TabsContent>
          <TabsContent value="quests">
            <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Quests</CardTitle>
                <CardDescription className="text-purple-200/70">
                  Quests are coming soon! Stay tuned for exciting challenges and rewards.
                </CardDescription>
              </CardHeader>
             </Card> 
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

