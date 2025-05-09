"use client"

import { API_URL } from '@/lib/config';
import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Download, Users, UserPlus, ArrowUpRight, TrendingUp } from "lucide-react"

export default function InvestorsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { user, isLoading: userLoading } = useUser()
  const { toast } = useToast()
  const router = useRouter()
  const [projectStats, setProjectStats] = useState({
    totalRaised: 0,
    investerCount: 0,
    avgInvestment: 0,
    totalMilestones: 0,
    completedMilestones: 0,
    totalCampaign: 0,
    completionRate: 0,
    totalFunding: 0,
    nextMilestone: null,
    InvesterEngagement: "Low",
    institutionalInvestor: 0,
    individualInvestors: 0,
    targetAmount: 1000000,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjectStats = async () => {
      try {
        if (userLoading || !user) return

        setLoading(true)
        const userId = user.sub?.substring(14)

        if (!userId) {
          toast({
            title: "Authentication error",
            description: "Please sign in again to continue.",
            variant: "destructive",
          })
          router.push("/login")
          return
        }

        const response = await fetch(`${API_URL}/api/profile/get-founder-projectStats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            user_id: userId,
          },
          body: JSON.stringify({
            profileId: userId,
          }),
        })

        // if (!response.ok) {
        //   throw new Error("Failed to fetch project stats")
        // }

        const data = await response.json()
        setProjectStats(data)
      } catch (error) {
        console.error("Error fetching project stats:", error)
        toast({
          title: "Message",
          description: "No Startups Created",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProjectStats()
  }, [user, userLoading, toast, router])

  if (loading || userLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-white">Loading investor data...</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Investors</h1>
            <p className="text-purple-200/70">Manage and communicate with your investors</p>
          </div>

         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Investors</CardDescription>
              <CardTitle className="text-2xl text-white">{projectStats.investerCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />3 new this month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Investment</CardDescription>
              <CardTitle className="text-2xl text-white">{projectStats.totalRaised.toLocaleString()} USDC</CardTitle>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Avg. Investment</CardDescription>
              <CardTitle className="text-2xl text-white">{projectStats.avgInvestment.toLocaleString()} USDC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                {projectStats.InvesterEngagement} engagement
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Investor Types</CardDescription>
              <CardTitle className="text-2xl text-white">
                {projectStats.individualInvestors} / {projectStats.institutionalInvestor}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-purple-200/70 flex items-center">
                <Users className="mr-1 h-4 w-4" />
                Individual / Institutional
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full md:w-auto bg-[#1F2A3D] p-1 rounded-lg">
                <TabsTrigger value="all" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="individual" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Individual
                </TabsTrigger>
                <TabsTrigger
                  value="institutional"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Institutional
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Pending
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A3A8AF]" />
              <Input
                type="text"
                placeholder="Search investors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#1F2A3D] border border-[#313E54] rounded-md text-white w-full md:w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardContent className="p-6">
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-purple-200/70" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">No Investor Data Available</h3>
                <p className="text-purple-200/70 max-w-md mx-auto mb-6">
                  There are currently no investors to display.
                </p>

              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}