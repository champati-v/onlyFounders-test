"use client"

import { API_URL } from "@/lib/config"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, Filter, ArrowUpRight, TrendingUp, BarChart3, PieChartIcon, LineChartIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function AnalyticsPage() {
  // Sample data for charts
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
    { name: "DeFi", value: 45, color: "#4F46E5" },
    { name: "NFT", value: 20, color: "#8B5CF6" },
    { name: "Infrastructure", value: 15, color: "#EC4899" },
    { name: "Gaming", value: 10, color: "#10B981" },
    { name: "DAO", value: 10, color: "#F59E0B" },
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
  const {user, isLoading: userLoading} = useUser()
  const [loading, setLoading] = useState(false)
  const {toast} = useToast()
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
    

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-purple-200/70">Track your investment performance and metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Value</CardDescription>
              <CardTitle className="text-2xl text-white">{investorStats?.totalInvested || '0'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                {/* <span>+70% since initial investment</span> */}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Average ROI</CardDescription>
              <CardTitle className="text-2xl text-white">{investorStats?.roi || '0'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                {/* <span>+0% from last month</span> */}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Best Performing</CardDescription>
              <CardTitle className="text-2xl text-white">{investorStats?.bestPerformingCampaign?.campaignName || 'N/A'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                <span>{investorStats?.bestPerformingCampaign?.completedMilestones || 'N/A'} milestones completed</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList className="bg-[#1F2A3D] p-1 rounded-lg inline-flex">
            <TabsTrigger value="performance" className="data-[state=active]:bg-black data-[state=active]:text-white">
              <LineChartIcon className="mr-2 h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="allocation" className="data-[state=active]:bg-black data-[state=active]:text-white">
              <PieChartIcon className="mr-2 h-4 w-4" />
              Allocation
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-black data-[state=active]:text-white">
              <BarChart3 className="mr-2 h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Portfolio Performance</CardTitle>
                <CardDescription className="text-purple-200/70">
                  Track your ROI and portfolio value over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  {/* <ChartContainer
                    config={{
                      roi: {
                        label: "ROI (%)",
                        color: "#4F46E5",
                      },
                      amount: {
                        label: "Portfolio Value",
                        color: "#8B5CF6",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                        <XAxis dataKey="month" stroke="#A3A8AF" />
                        <YAxis yAxisId="left" stroke="#A3A8AF" />
                        <YAxis yAxisId="right" orientation="right" stroke="#A3A8AF" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="roi"
                          stroke="var(--color-roi)"
                          strokeWidth={2}
                          dot={{ r: 4, strokeWidth: 2 }}
                          activeDot={{ r: 6, strokeWidth: 2 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="amount"
                          stroke="var(--color-amount)"
                          strokeWidth={2}
                          dot={{ r: 4, strokeWidth: 2 }}
                          activeDot={{ r: 6, strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer> */}
                   <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-3xl font-semibold text-white mb-2">Coming Soon...</span>
                    <span className="text-[#A3A8AF] text-sm">Portfolio Performance on the way!</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
              <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Portfolio Allocation by Sector</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
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
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer> */}
                     <div className="flex flex-col items-center justify-center h-full">
                <span className="text-3xl font-semibold text-white mb-2">Coming Soon...</span>
                <span className="text-[#A3A8AF] text-sm">Portfolio Allocation by Sector on the way!</span>
              </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Allocation Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
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
                      <span className="text-white font-medium"></span>
                    </div>
                    <p className="text-xs text-[#A3A8AF] mt-1">
                      Diversification score will be out soon!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Investment Activity</CardTitle>
                <CardDescription className="text-purple-200/70">
                  Track your investment frequency and volume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  {/* <ChartContainer
                    config={{
                      investments: {
                        label: "Number of Investments",
                        color: "#4F46E5",
                      },
                      volume: {
                        label: "Investment Volume",
                        color: "#8B5CF6",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={investmentActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                        <XAxis dataKey="month" stroke="#A3A8AF" />
                        <YAxis yAxisId="left" stroke="#A3A8AF" />
                        <YAxis yAxisId="right" orientation="right" stroke="#A3A8AF" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar
                          yAxisId="left"
                          dataKey="investments"
                          fill="var(--color-investments)"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar yAxisId="right" dataKey="volume" fill="var(--color-volume)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer> */}

                   <div className="flex flex-col items-center justify-center h-full">
                <span className="text-3xl font-semibold text-white mb-2">Coming Soon...</span>
                <span className="text-[#A3A8AF] text-sm">Investment Activity on the way!</span>
              </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

