"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Filter, ArrowUpRight, TrendingUp, LineChart, Users, DollarSign, Target } from "lucide-react"
import Image from "next/image"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-purple-200/70">Track your project's performance and investor engagement</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Raised</CardDescription>
              <CardTitle className="text-2xl text-white">750,000 USDC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>75% of target reached</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Investors</CardDescription>
              <CardTitle className="text-2xl text-white">42</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>+10% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Milestones Completed</CardDescription>
              <CardTitle className="text-2xl text-white">3/8</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                <span>On track for next milestone</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Investor Engagement</CardDescription>
              <CardTitle className="text-2xl text-white">High</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>+25% comment activity</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="fundraising" className="space-y-4">
          <TabsList className="bg-[#1F2A3D] p-1 rounded-lg inline-flex">
            <TabsTrigger value="fundraising" className="data-[state=active]:bg-black data-[state=active]:text-white">
              <DollarSign className="mr-2 h-4 w-4" />
              Fundraising
            </TabsTrigger>
            <TabsTrigger value="investors" className="data-[state=active]:bg-black data-[state=active]:text-white">
              <Users className="mr-2 h-4 w-4" />
              Investors
            </TabsTrigger>
            <TabsTrigger value="milestones" className="data-[state=active]:bg-black data-[state=active]:text-white">
              <Target className="mr-2 h-4 w-4" />
              Milestones
            </TabsTrigger>
            <TabsTrigger value="engagement" className="data-[state=active]:bg-black data-[state=active]:text-white">
              <LineChart className="mr-2 h-4 w-4" />
              Engagement
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fundraising" className="space-y-4">
            <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Fundraising Progress</CardTitle>
                <CardDescription className="text-purple-200/70">
                  Track your fundraising progress over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] flex items-center justify-center bg-purple-900/30 rounded-lg border border-purple-800/20 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src="/placeholder.svg?height=350&width=800&text=Fundraising+Progress+Chart"
                      alt="Fundraising progress chart"
                      fill
                      className="object-cover opacity-70"
                    />
                  </div>
                  <div className="relative z-10">
                    <LineChart className="h-12 w-12 text-purple-200/70 mx-auto mb-4" />
                    <p className="text-purple-200/70">Fundraising progress over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investors" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
              <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Investor Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex items-center justify-center bg-purple-900/30 rounded-lg border border-purple-800/20 relative overflow-hidden">
                    <div className="absolute inset-0">
                      <Image
                        src="/placeholder.svg?height=350&width=400&text=Investor+Types+Chart"
                        alt="Investor types chart"
                        fill
                        className="object-cover opacity-70"
                      />
                    </div>
                    <div className="relative z-10">
                      <div className="text-center">
                        <p className="text-white font-medium mb-2">Distribution</p>
                        <p className="text-purple-200/70">Individual: 83%</p>
                        <p className="text-purple-200/70">Institutional: 17%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Investor Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex items-center justify-center bg-purple-900/30 rounded-lg border border-purple-800/20 relative overflow-hidden">
                    <div className="absolute inset-0">
                      <Image
                        src="/placeholder.svg?height=350&width=400&text=Investor+Locations+Chart"
                        alt="Investor locations chart"
                        fill
                        className="object-cover opacity-70"
                      />
                    </div>
                    <div className="relative z-10">
                      <div className="text-center">
                        <p className="text-white font-medium mb-2">Distribution</p>
                        <p className="text-purple-200/70">North America: 55%</p>
                        <p className="text-purple-200/70">Europe: 25%</p>
                        <p className="text-purple-200/70">Asia: 15%</p>
                        <p className="text-purple-200/70">Other: 5%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-4">
            <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Milestone Progress</CardTitle>
                <CardDescription className="text-purple-200/70">Track your milestone completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] flex items-center justify-center bg-purple-900/30 rounded-lg border border-purple-800/20 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src="/placeholder.svg?height=350&width=800&text=Milestone+Progress+Chart"
                      alt="Milestone progress chart"
                      fill
                      className="object-cover opacity-70"
                    />
                  </div>
                  <div className="relative z-10">
                    <div className="text-center">
                      <p className="text-white font-medium mb-4">Milestone Completion</p>
                      <div className="space-y-2 text-left max-w-md mx-auto">
                        <div className="flex justify-between">
                          <span className="text-purple-200/70">Project Kickoff</span>
                          <span className="text-green-400">100%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-200/70">MVP Development</span>
                          <span className="text-green-400">100%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-200/70">Alpha Release</span>
                          <span className="text-green-400">100%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-200/70">Mobile App Beta</span>
                          <span className="text-blue-400">65%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-200/70">Security Audit</span>
                          <span className="text-blue-400">30%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Investor Engagement</CardTitle>
                <CardDescription className="text-purple-200/70">
                  Track investor interactions with your updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] flex items-center justify-center bg-purple-900/30 rounded-lg border border-purple-800/20 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src="/placeholder.svg?height=350&width=800&text=Investor+Engagement+Chart"
                      alt="Investor engagement chart"
                      fill
                      className="object-cover opacity-70"
                    />
                  </div>
                  <div className="relative z-10">
                    <div className="text-center">
                      <p className="text-white font-medium mb-4">Monthly Engagement</p>
                      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        <div className="text-center">
                          <p className="text-purple-200/70">Updates</p>
                          <p className="text-xl text-white">23</p>
                        </div>
                        <div className="text-center">
                          <p className="text-purple-200/70">Comments</p>
                          <p className="text-xl text-white">68</p>
                        </div>
                        <div className="text-center">
                          <p className="text-purple-200/70">Likes</p>
                          <p className="text-xl text-white">162</p>
                        </div>
                        <div className="text-center">
                          <p className="text-purple-200/70">Shares</p>
                          <p className="text-xl text-white">34</p>
                        </div>
                      </div>
                    </div>
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

