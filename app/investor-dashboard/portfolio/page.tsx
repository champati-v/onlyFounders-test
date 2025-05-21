"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Calendar,
  Filter,
  Download,
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { PortfolioAnalytics } from "@/components/portfolio-analytics"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import axios from "axios"
import { API_URL } from "@/lib/config"

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { user, isLoading: userLoading } = useUser()
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [investorStats, setInvestorStats] = useState({
    totalInvested: 0,
    activeInvestmentCount: 0,
    bestPerformingCampaign: {
      campaignName: "N/A",
      completedMilestones: 0,
    },
    worstPerformingCampaign: {
      campaignName: "N/A",
      completedMilestones: 0,
    },
    totalReturns: 0,
    roi: 0,
    currentValue: 0,
  })

  const [activeInvestments, setActiveInvestments] = useState({
    message: "",
    investments: [],
  })

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

        const response = await axios.get(`${API_URL}/api/profile/get-investor-dashboard-analytics`, {
          headers: {
            user_id: userId,
          },
        })

        setInvestorStats(response.data)
      } catch (err) {
        console.error("Error fetching investor stats:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchInvestorStats()
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

  // Map API data to match UI structure
  const investments = activeInvestments.investments.map((investment, index) => ({
    id: index.toString(),
    name: investment.campaignName,
    logo:
      investment.startupLogo || `/placeholder.svg?height=40&width=40&text=${investment.campaignName.substring(0, 2)}`,
    category: investment.category,
    invested: investment.investedAmount,
    currentValue: investment.investedAmount, // No current value in API, using invested amount
    growth: 0, // No growth data in API
    progress: 0, // Random progress since not in API
    status: "active", // Default status
    nextMilestone: "Next Milestone", // Placeholder
    nextMilestoneDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  }))

  // Portfolio summary stats from API
  const portfolioStats = {
    totalInvested: investorStats.totalInvested,
    totalValue: investorStats.currentValue || investorStats.totalInvested,
    totalGrowth: investorStats.roi,
    bestPerforming: {
      name: investorStats.bestPerformingCampaign?.campaignName || "N/A",
      growth: 0, // No growth data in API
    },
    worstPerforming: {
      name: investorStats.worstPerformingCampaign?.campaignName || "N/A",
      growth: 0, // No growth data in API
    },
  }

  // Filter investments based on active tab
  const filteredInvestments =
    activeTab === "all"
      ? investments
      : activeTab === "active"
        ? investments.filter((inv) => inv.status === "active")
        : activeTab === "at_risk"
          ? investments.filter((inv) => inv.status === "at_risk")
          : investments.filter((inv) => inv.status === "completed")

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Portfolio</h1>
            <p className="text-purple-200/70">Manage and track your investments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Invested</CardDescription>
              <CardTitle className="text-2xl text-white">
                {portfolioStats.totalInvested.toLocaleString()} USDC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                15.3% increase from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Current Value</CardDescription>
              <CardTitle className="text-2xl text-white">{portfolioStats.totalValue.toLocaleString()} USDC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                {portfolioStats.totalGrowth}% total growth
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Best Performing</CardDescription>
              <CardTitle className="text-2xl text-white">{portfolioStats.bestPerforming.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                {portfolioStats.bestPerforming.growth}% growth
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Worst Performing</CardDescription>
              <CardTitle className="text-2xl text-white">{portfolioStats.worstPerforming.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-sm flex items-center ${portfolioStats.worstPerforming.growth < 0 ? "text-red-500" : "text-green-500"}`}
              >
                {portfolioStats.worstPerforming.growth < 0 ? (
                  <TrendingDown className="mr-1 h-4 w-4" />
                ) : (
                  <TrendingUp className="mr-1 h-4 w-4" />
                )}
                {portfolioStats.worstPerforming.growth}% growth
              </div>
            </CardContent>
          </Card>
        </div>

        <PortfolioAnalytics />

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-bold text-white">Your Investments</h2>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-4 w-full md:w-auto bg-[#1F2A3D] p-1 rounded-lg">
                <TabsTrigger value="all" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="active" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Active
                </TabsTrigger>
                <TabsTrigger value="at_risk" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  At Risk
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Completed
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-4">
            {filteredInvestments.map((investment) => (
              <Card
                key={investment.id}
                className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <div className="bg-[#1F2A3D] p-2 rounded-lg">
                        <Image
                          src={investment.logo || "/placeholder.svg"}
                          alt={investment.name}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{investment.name}</h3>
                        <Badge variant="outline" className="bg-[#1F2A3D] text-[#A3A8AF] border-[#313E54]">
                          {investment.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                      <div>
                        <p className="text-xs text-[#A3A8AF]">Invested</p>
                        <p className="font-medium text-white">{investment.invested.toLocaleString()} USDC</p>
                      </div>

                      <div>
                        <p className="text-xs text-[#A3A8AF]">Current Value</p>
                        <p className="font-medium text-white">{investment.currentValue.toLocaleString()} USDC</p>
                      </div>

                      <div>
                        <p className="text-xs text-[#A3A8AF]">Growth</p>
                        <p
                          className={`font-medium flex items-center ${investment.growth >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {investment.growth >= 0 ? (
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                          )}
                          {Math.abs(investment.growth)}%
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#A3A8AF]">Status</p>
                        <Badge
                          className={`
                          ${
                            investment.status === "active"
                              ? "bg-green-900/30 text-green-400 border-green-800"
                              : investment.status === "at_risk"
                                ? "bg-amber-900/30 text-amber-400 border-amber-800"
                                : investment.status === "completed"
                                  ? "bg-blue-900/30 text-blue-400 border-blue-800"
                                  : "bg-red-900/30 text-red-400 border-red-800"
                          }
                        `}
                        >
                          {investment.status === "active"
                            ? "Active"
                            : investment.status === "at_risk"
                              ? "At Risk"
                              : investment.status === "completed"
                                ? "Completed"
                                : "Delayed"}
                        </Badge>
                      </div>
                    </div>

                    <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
                      View Details
                    </Button>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A3A8AF]">Project Progress</span>
                      <span className="text-[#A3A8AF]">{investment.progress}%</span>
                    </div>
                    <Progress
                      value={investment.progress}
                      className="h-2 bg-[#1F2A3D]"
                      indicatorClassName={`
                        ${
                          investment.status === "active"
                            ? "bg-blue-500"
                            : investment.status === "at_risk"
                              ? "bg-amber-500"
                              : investment.status === "completed"
                                ? "bg-green-500"
                                : "bg-red-500"
                        }
                      `}
                    />

                    <div className="flex items-center text-xs text-[#A3A8AF]">
                      <Clock className="mr-1 h-3 w-3" />
                      Next Milestone: {investment.nextMilestone}
                      <span className="mx-2">•</span>
                      <Calendar className="mr-1 h-3 w-3" />
                      Due: {investment.nextMilestoneDate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
