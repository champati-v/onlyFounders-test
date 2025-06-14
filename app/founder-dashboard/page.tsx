"use client"
import { API_URL } from '@/lib/config';
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, LineChart, Plus, Clock, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"

export default function FounderDashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, isLoading: userLoading } = useUser()
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
    activeCampaignfundingTarget: 0,
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  interface FormattedMilestone {
    id: string
    title: string
    description: string
    progress: number
    status: "completed" | "in_progress" | "not_started"
    fundPercentage: number
  }
  
  const [upcomingMilestones, setUpcomingMilestones] = useState<FormattedMilestone[]>([])


  useEffect(() => {
    const fetchFounderStats = async () => {
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
        const response = await fetch(`${API_URL}/api/profile/get-founder-projectStats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            user_id: userId, // Using Auth0 user ID
          },
          body: JSON.stringify({
            profileId: userId,
          }),
        })

        const data = await response.json()
        setProjectStats({
          ...data 
        })
      } catch (err) {
        console.error("Error fetching founder stats:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFounderStats()
  }, [user, userLoading])

  useEffect(() => {
    const fetchUpcomingMilestones = async () => {
      if (userLoading || !user) return

      try {
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

        const response = await fetch(`${API_URL}/api/profile/get-upcoming-milestones`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            user_id: userId,
          },
          body: JSON.stringify({
            profileId: userId,
          }),
        })

        const data = await response.json()

        // Map the API response to the component's expected structure
        if (data && data.upcomingMilestones && Array.isArray(data.upcomingMilestones)) {
          interface Requirement {
            status: string
            [key: string]: any
          }

          interface MilestoneApiResponse {
            milestoneId: string
            name: string
            description: string
            requirements: Requirement[]
            milestoneStatus: string
            fundPercentage: number
            [key: string]: any
          }

          interface FormattedMilestone {
            id: string
            title: string
            description: string
            progress: number
            status: "completed" | "in_progress" | "not_started"
            fundPercentage: number
          }

          const formattedMilestones: FormattedMilestone[] = (data.upcomingMilestones as MilestoneApiResponse[]).slice(0, 3).map((milestone) => {
            // Calculate progress based on requirements completion
            const totalRequirements = milestone.requirements.length || 0
            const completedRequirements = milestone.requirements.filter((req) => req.status === "complete").length || 0
            const progress = totalRequirements > 0 ? Math.round((completedRequirements / totalRequirements) * 100) : 0 || 0

            return {
              id: milestone.milestoneId,
              title: milestone.name || "Nil",
              description: milestone.description || "No description provided",
              progress: progress || 0,
              status:
                milestone.milestoneStatus === "complete" ? "completed" : progress > 0 ? "in_progress" : "not_started",
              fundPercentage: milestone.fundPercentage || 0,
            }
          })

          setUpcomingMilestones(formattedMilestones)
        } else {
          setUpcomingMilestones([])
        }
      } catch (err) {
        console.error("Error fetching upcoming milestones:", err)
        toast({
          title: "Message",
          description: "Milestones will be created in the campaign",
        })
      }
    }

    fetchUpcomingMilestones()
  }, [user, userLoading, toast, router])

  if (loading || userLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-white">Loading dashboard data...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-white">Error loading dashboard: {error}</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Founder Dashboard</h1>
            <p className="text-purple-200/70">Manage your project and track fundraising progress</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Raised</CardDescription>
              <CardTitle className="text-2xl text-white">{projectStats.totalRaised} USDC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                {Math.round((projectStats.totalRaised / projectStats.activeCampaignfundingTarget) * 100)}% of target reached
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Investors</CardDescription>
              <CardTitle className="text-2xl text-white">{projectStats.investerCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                {projectStats.individualInvestors} individual, {projectStats.institutionalInvestor} institutional
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Avg. Investment</CardDescription>
              <CardTitle className="text-2xl text-white">{projectStats.avgInvestment} USDC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                Engagement: {projectStats.InvesterEngagement}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Milestones</CardDescription>
              <CardTitle className="text-2xl text-white">
                {projectStats.completedMilestones}/{projectStats.totalMilestones}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-blue-400 flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                Next: {projectStats.nextMilestone || "None"}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl text-white">Fundraising Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200/70">Raised</span>
                  <span className="text-white">
                    {projectStats.totalRaised} / {projectStats.activeCampaignfundingTarget} USDC
                  </span>
                </div>
                <Progress
                  value={(projectStats.totalRaised / projectStats.activeCampaignfundingTarget) * 100}
                  className="h-2 bg-purple-900/30"
                  indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                />

                <div className="h-[300px] flex items-center justify-center bg-purple-900/30 rounded-lg border border-purple-800/20 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src="/placeholder.svg?height=300&width=600&text=Fundraising+Progress+Chart"
                      alt="Fundraising progress chart"
                      fill
                      className="object-cover opacity-70"
                    />
                  </div>
                  <div className="relative z-10">
                    <LineChart className="h-12 w-12 text-purple-200/70 mx-auto mb-4" />
                    <p className="text-purple-200/70">Fundraising progress over time</p>
                  </div>

                   <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
                    <span className="text-white text-4xl font-semibold">Coming Soon...</span>
                  </div>
                </div>

                <div className="mt-6"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white">Upcoming Milestones</CardTitle>
                <Link href="/founder-dashboard/milestones">
                  <Button variant="link" className="text-blue-400">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingMilestones.length > 0 ? (
                  upcomingMilestones.map((milestone) => (
                    <div key={milestone.id} className="p-3 rounded-lg bg-purple-900/30 border border-purple-800/20">
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="font-medium text-white">{milestone.title}</h4>
                        <Badge
                          className={`whitespace-nowrap ${
                            milestone.status === "completed"
                              ? "bg-green-900/30 text-green-400 border-green-800"
                              : milestone.status === "in_progress"
                                ? "bg-blue-900/30 text-blue-400 border-blue-800"
                                : "bg-purple-900/30 text-purple-400 border-purple-800"
                          }`}
                        >
                          {milestone.status === "completed"
                            ? "Completed"
                            : milestone.status === "in_progress"
                              ? "In Progress"
                              : "Not Started"}
                        </Badge>
                      </div>

                      <p className="text-sm text-purple-200/70 mb-2 line-clamp-2">{milestone.description}</p>
                    </div>
                  ))
                ) : loading ? (
                  <div className="text-center py-4 text-purple-200/70">Loading milestones...</div>
                ) : (
                  <div className="text-center py-4 text-purple-200/70">No upcoming milestones found.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}