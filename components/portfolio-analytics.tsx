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

export function PortfolioAnalytics() {
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
          <div className="flex flex-col sm:flex-row gap-2">
            <Select defaultValue="6m">
              <SelectTrigger className="bg-[#1F2A3D] border-[#313E54] text-white w-full sm:w-[120px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent className="bg-[#202C41] border-[#313E54] text-white">
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="text-white border-[#3D4E6B] bg-black hover:bg-[#1A2537]">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
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
                <p className="text-2xl font-bold text-white">76,500 USDC</p>
                <div className="flex items-center text-xs text-green-500 mt-1">
                  <span>+70% since initial investment</span>
                </div>
              </div>

              <div className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
                <p className="text-[#A3A8AF] text-sm mb-1">Average ROI</p>
                <p className="text-2xl font-bold text-white">8.6%</p>
                <div className="flex items-center text-xs text-green-500 mt-1">
                  <span>+2.3% from last month</span>
                </div>
              </div>

              <div className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
                <p className="text-[#A3A8AF] text-sm mb-1">Best Performing</p>
                <p className="text-2xl font-bold text-white">MetaCanvas</p>
                <div className="flex items-center text-xs text-green-500 mt-1">
                  <span>+50% ROI</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1F2A3D] rounded-lg border border-[#313E54] p-4 h-[350px]">
              <h3 className="text-white font-medium mb-4">Portfolio Performance</h3>
              <ChartContainer
                config={{
                  roi: {
                    label: "ROI (%)",
                    color: "hsl(var(--chart-1))",
                  },
                  amount: {
                    label: "Portfolio Value",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                    <XAxis dataKey="month" stroke="#A3A8AF" />
                    <YAxis yAxisId="left" stroke="#A3A8AF" />
                    <YAxis yAxisId="right" orientation="right" stroke="#A3A8AF" />
                    <ChartTooltip content={<ChartTooltipContent />} />
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
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
              <div className="bg-[#1F2A3D] rounded-lg border border-[#313E54] p-4 h-[350px]">
                <h3 className="text-white font-medium mb-4">Portfolio Allocation by Sector</h3>
                <ResponsiveContainer width="100%" height="100%">
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
                </ResponsiveContainer>
              </div>

              <div className="bg-[#1F2A3D] rounded-lg border border-[#313E54] p-4">
                <h3 className="text-white font-medium mb-4">Allocation Breakdown</h3>
                <div className="space-y-4">
                  {allocationData.map((item, index) => (
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
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#313E54]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#A3A8AF]">Diversification Score</span>
                    <span className="text-white font-medium">7.5/10</span>
                  </div>
                  <p className="text-xs text-[#A3A8AF] mt-1">
                    Your portfolio has good diversification across sectors, but could benefit from more exposure to
                    Infrastructure projects.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="bg-[#1F2A3D] rounded-lg border border-[#313E54] p-4 h-[350px]">
              <h3 className="text-white font-medium mb-4">Investment Activity</h3>
              <ChartContainer
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
              </ChartContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
              <div className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
                <p className="text-[#A3A8AF] text-sm mb-1">Total Investments</p>
                <p className="text-2xl font-bold text-white">14</p>
                <div className="flex items-center text-xs text-[#A3A8AF] mt-1">
                  <span>Across 8 projects</span>
                </div>
              </div>

              <div className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
                <p className="text-[#A3A8AF] text-sm mb-1">Avg. Investment</p>
                <p className="text-2xl font-bold text-white">9,285 USDC</p>
                <div className="flex items-center text-xs text-[#A3A8AF] mt-1">
                  <span>Per transaction</span>
                </div>
              </div>

              <div className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
                <p className="text-[#A3A8AF] text-sm mb-1">Most Active Month</p>
                <p className="text-2xl font-bold text-white">June</p>
                <div className="flex items-center text-xs text-[#A3A8AF] mt-1">
                  <span>4 investments, 35,000 USDC</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

