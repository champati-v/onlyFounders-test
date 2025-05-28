"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  LineChart,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  Line,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import axios from "axios"
import { API_URL } from "@/lib/config"

export function PortfolioAnalytics() {
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

  // Sample data for charts - keeping these for the charts
  const performanceData = [
    { month: "Jan", roi: 5.2, amount: 45000 },
    { month: "Feb", roi: 7.8, amount: 48500 },
    { month: "Mar", roi: 6.5, amount: 52000 },
    { month: "Apr", roi: 9.2, amount: 56800 },
    { month: "May", roi: 8.1, amount: 61500 },
    { month: "Jun", roi: 12.4, amount: 69000 },
    { month: "Jul", roi: 10.8, amount: 76500 },
  ]

  const allocationData = [
    { name: "DeFi", value: 45, color: "hsl(var(--chart-1))" },
    { name: "NFT", value: 20, color: "hsl(var(--chart-2))" },
    { name: "Infrastructure", value: 15, color: "hsl(var(--chart-3))" },
    { name: "Gaming", value: 10, color: "hsl(var(--chart-4))" },
    { name: "DAO", value: 10, color: "hsl(var(--chart-5))" },
  ]

  const investmentActivityData = [
    { month: "Jan", investments: 2, volume: 15000 },
    { month: "Feb", investments: 1, volume: 10000 },
    { month: "Mar", investments: 3, volume: 25000 },
    { month: "Apr", investments: 0, volume: 0 },
    { month: "May", investments: 2, volume: 20000 },
    { month: "Jun", investments: 4, volume: 35000 },
    { month: "Jul", investments: 2, volume: 25000 },
  ]

  return (
    <Card className="bg-[#202C41] border-[#313E54] mx-auto w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-xl text-white">Portfolio Analytics</CardTitle>
            <CardDescription className="text-[#A3A8AF]">
              Track your investment performance and allocation
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList className="bg-[#1F2A3D] p-1 rounded-lg inline-flex">
            <TabsTrigger value="performance" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Performance
            </TabsTrigger>
            <TabsTrigger value="allocation" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Allocation
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
              <div className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
                <p className="text-[#A3A8AF] text-sm mb-1">Total Value</p>
                <p className="text-2xl font-bold text-white">{investorStats.totalInvested.toLocaleString()} USDC</p>
                <div className="flex items-center text-xs text-green-500 mt-1">
                  <span>+{investorStats.roi}% since initial investment</span>
                </div>
              </div>

              <div className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
                <p className="text-[#A3A8AF] text-sm mb-1">Average ROI</p>
                <p className="text-2xl font-bold text-white">{investorStats.roi}%</p>
                <div className="flex items-center text-xs text-green-500 mt-1">
                  <span>+{(investorStats.roi * 0.1).toFixed(1)}% from last month</span>
                </div>
              </div>

              <div className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
                <p className="text-[#A3A8AF] text-sm mb-1">Best Performing</p>
                <p className="text-2xl font-bold text-white">{investorStats?.bestPerformingCampaign?.campaignName || 'N/A'}</p>
                <div className="flex items-center text-xs text-green-500 mt-1">
                  <span>+{investorStats.bestPerformingCampaign.completedMilestones} milestones completed</span>
                </div>
              </div>
            </div>

            <div className="bg-[#19212f] rounded-lg border border-[#313E54] p-4 h-[350px]">
              <h3 className="text-white font-medium mb-4">Portfolio Performance</h3>
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-3xl font-semibold text-white mb-2">Coming Soon...</span>
                <span className="text-[#A3A8AF] text-sm">Portfolio performance charts are on the way!</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
              <div className="bg-[#1F2A3D] rounded-lg border border-[#313E54] p-4 h-[350px]">
                <h3 className="text-white font-medium mb-4">Portfolio Allocation by Sector</h3>
                {/* <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} labelFormatter={(name) => name} />
                  </PieChart>
                </ResponsiveContainer> */}
                 <div className="flex flex-col items-center justify-center h-full">
                <span className="text-3xl font-semibold text-white mb-2">Coming Soon...</span>
                <span className="text-[#A3A8AF] text-sm">Portfolio Allocation charts are on the way!</span>
              </div>
              </div>

              <div className="bg-[#1F2A3D] rounded-lg border border-[#313E54] p-4">
                <h3 className="text-white font-medium mb-4">Allocation Breakdown</h3>
                <div className="space-y-4">
                  {/* {allocationData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-white">{item.name}</span>
                        </div>
                        <span className="text-white font-medium">{item.value}%</span>
                      </div>
                      <div className="w-full bg-[#29305F] rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${item.value}%`,
                            backgroundColor: item.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))} */}
                  <div className="flex flex-col items-center justify-center h-full">
                <span className="text-3xl font-semibold text-white mb-2">Coming Soon...</span>
                <span className="text-[#A3A8AF] text-sm">Allocation Breakdown on the way!</span>
              </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#313E54]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#A3A8AF]">Diversification Score</span>
                    <span className="text-white font-medium"></span> { /* Placeholder for diversification score */}
                  </div>
                  <p className="text-xs text-[#A3A8AF] mt-1">
                    Diversification Score will be out soon!
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="bg-[#1F2A3D] rounded-lg border border-[#313E54] p-4 h-[350px]">
              <h3 className="text-white font-medium mb-4">Investment Activity</h3>
              {/* <ChartContainer
                config={{
                  investments: {
                    label: "Number of Investments",
                    color: "hsl(var(--chart-1))",
                  },
                  volume: {
                    label: "Investment Volume",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={investmentActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                    <XAxis dataKey="month" stroke="#A3A8AF" />
                    <YAxis yAxisId="left" stroke="#A3A8AF" />
                    <YAxis yAxisId="right" orientation="right" stroke="#A3A8AF" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar yAxisId="left" dataKey="investments" fill="var(--color-investments)" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="volume" fill="var(--color-volume)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer> */}
               <div className="flex flex-col items-center justify-center h-full">
                <span className="text-3xl font-semibold text-white mb-2">Coming Soon...</span>
                <span className="text-[#A3A8AF] text-sm">Investment Activity on the way!</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
              <div className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
                <p className="text-[#A3A8AF] text-sm mb-1">Total Investments</p>
                <p className="text-2xl font-bold text-white">{investorStats.activeInvestmentCount}</p>
                <div className="flex items-center text-xs text-[#A3A8AF] mt-1">
                  <span>Active investments</span>
                </div>
              </div>

              <div className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
                <p className="text-[#A3A8AF] text-sm mb-1">Avg. Investment</p>
                <p className="text-2xl font-bold text-white">
                  {investorStats.activeInvestmentCount > 0
                    ? Math.floor(investorStats.totalInvested / investorStats.activeInvestmentCount).toLocaleString()
                    : 0}{" "}
                  USDC
                </p>
                <div className="flex items-center text-xs text-[#A3A8AF] mt-1">
                  <span>Per investment</span>
                </div>
              </div>

              <div className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
                <p className="text-[#A3A8AF] text-sm mb-1">Most Active Month</p>
                <p className="text-2xl font-bold text-white">June</p>
                <div className="flex items-center text-xs text-[#A3A8AF] mt-1">
                  <span>
                    {investorStats.activeInvestmentCount} investments, {investorStats.totalInvested.toLocaleString()}{" "}
                    USDC
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
