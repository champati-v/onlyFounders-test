"use client"

import { API_URL } from '@/lib/config';
import { Separator } from "@/components/ui/separator"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Clock, Filter, Plus, Edit, Trash2, ChevronDown, ChevronUp, PlayCircle } from "lucide-react"

export default function MilestonesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()
  const { toast } = useToast()
  const { user, isLoading: userLoading } = useUser()
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null)
  const [projectStats, setProjectStats] = useState({
    totalRaised: 0,
    investerCount: 0,
    avgInvestment: 0,
    totalMilestones: 0,
    completedMilestones: 0,
    totalCampaign: 0,
    completionRate: 0,
    totalFunding: 0,
    nextMilestone: "",
    InvesterEngagement: "Low",
    institutionalInvestor: 0,
    individualInvestors: 0,
  })
  interface Task {
    id: string
    title: string
    description: string
    completed: boolean
    req_status: string
  }

  interface Milestone {
    id: string
    title: string
    description: string
    startDate: string
    dueDate: string
    completedDate: string | null
    progress: number
    status: "completed" | "incomplete" | "not_started"
    fundingAmount: number
    tasks: Task[]
  }

  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjectStats = async () => {
      try {
        if (userLoading || !user) return

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
      }
    }

    fetchProjectStats()
  }, [user, userLoading])

  useEffect(() => {
    const fetchAllMilestones = async () => {
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

        const response = await fetch(`${API_URL}/api/profile/get-all-milestones`, {
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
        //   throw new Error("Failed to fetch milestones")
        // }

        const data = await response.json()

        // Map API response to component structure
        if (data && data.milestones && Array.isArray(data.milestones)) {
          interface ApiRequirement {
            name: string
            description: string
            status: string
          }

          interface ApiMilestone {
            milestoneId: string
            name: string
            description: string
            milestoneStatus: string
            fundPercentage: number
            requirements: ApiRequirement[]
          }

          interface Task {
            id: string
            title: string
            description: string
            completed: boolean
            req_status: string
          }

          interface Milestone {
            id: string
            title: string
            description: string
            startDate: string
            dueDate: string
            completedDate: string | null
            progress: number
            status: "completed" | "incomplete" | "not_started"
            fundingAmount: number
            tasks: Task[]
           
          }

          const formattedMilestones: Milestone[] = (data.milestones as ApiMilestone[]).map((milestone) => {
            // Calculate progress based on requirements completion
            const totalRequirements = milestone.requirements.length
            const completedRequirements = milestone.requirements.filter((req) => req.status === "complete").length
            const progress = totalRequirements > 0 ? Math.round((completedRequirements / totalRequirements) * 100) : 0

            return {
              id: milestone.milestoneId,
              title: milestone.name,
              description: milestone.description,
              // No start/due/completed dates in API response
              startDate: "TBD",
              dueDate: "TBD",
              completedDate: milestone.milestoneStatus === "completed" ? "Completed" : null,
              progress: progress,
              totalRequirements: totalRequirements,
              completedRequirements: completedRequirements,
              status:
                milestone.milestoneStatus === "completed" ? "completed" : progress > 0 ? "incomplete" : "not_started",
              fundingAmount: Math.round(milestone.fundPercentage),
              tasks: milestone.requirements.map((req, index): Task => ({
                id: `${milestone.milestoneId}-${index}`,
                title: req.name,
                description: req.description,
                req_status: req.status,
                completed: req.status === "complete",
              })),
            }
          })

          setMilestones(formattedMilestones)
          console.log("Formatted Milestones:", formattedMilestones)
        }
      } catch (error) {
        console.error("Error fetching milestones:", error)
        toast({
          title: "Message",
          description: "No Campaigns created yet",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAllMilestones()
  }, [user, userLoading])

  // Filter milestones based on active tab
  const filteredMilestones = milestones.filter((milestone) => {
    if (activeTab === "all") return true
    if (activeTab === "completed") return milestone.status === "completed"
    if (activeTab === "incomplete") return milestone.status === "incomplete"
    if (activeTab === "not_started") return milestone.status === "not_started"
    return true
  })

  // Calculate milestone stats
  // Use API data for stats, fallback to calculated values if needed
  const totalMilestones = projectStats.totalMilestones
  const completedMilestones = projectStats.completedMilestones
  const inProgressMilestones = projectStats.totalMilestones - projectStats.completedMilestones
  const totalFunding = projectStats.totalFunding

  // Toggle milestone expansion
  const toggleMilestoneExpansion = (id: string) => {
    if (expandedMilestone === id) {
      setExpandedMilestone(null)
    } else {
      setExpandedMilestone(id)
    }
  }

  if (loading || userLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-white">Loading milestones data...</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Milestones</h1>
            <p className="text-purple-200/70">Track and manage your project milestones</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Milestones</CardDescription>
              <CardTitle className="text-2xl text-white">{totalMilestones}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-purple-200/70 flex items-center">
                <CheckCircle className="mr-1 h-4 w-4 text-green-400" />
                {projectStats.completedMilestones} completed, {inProgressMilestones} in progress
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Completion Rate</CardDescription>
              <CardTitle className="text-2xl text-white">{projectStats.completionRate}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress
                value={projectStats.completionRate}
                className="h-2 bg-purple-900/30"
                indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Funding</CardDescription>
              <CardTitle className="text-2xl text-white">{projectStats.totalFunding} USDC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-purple-200/70 flex items-center">
                <CheckCircle className="mr-1 h-4 w-4 text-green-400" />
                {projectStats.totalRaised} USDC released
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Next Milestone</CardDescription>
              <CardTitle className="text-2xl text-white">
                {projectStats.nextMilestone || milestones.find((m) => m.status === "incomplete")?.title || "None"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-purple-200/70 flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                In Progress
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
                <TabsTrigger value="completed" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Completed
                </TabsTrigger>
                <TabsTrigger
                  value="incomplete"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  In Progress
                </TabsTrigger>
                <TabsTrigger
                  value="not_started"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Not Started
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A3A8AF]" />
              <Input
                type="text"
                placeholder="Filter milestones..."
                className="pl-10 pr-4 py-2 bg-[#1F2A3D] border border-[#313E54] rounded-md text-white w-full md:w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredMilestones.length > 0 ? (
              filteredMilestones.map((milestone) => (
                <Card
                  key={milestone.id}
                  className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            className={`
                              ${
                                milestone.status === "completed"
                                  ? "bg-green-900/30 text-green-400 border-green-800"
                                  : milestone.status === "incomplete"
                                    ? "bg-blue-900/30 text-blue-400 border-blue-800"
                                    : "bg-purple-900/30 text-purple-400 border-purple-800"
                              }
                            `}
                          >
                            {milestone.status === "completed"
                              ? "Completed"
                              : milestone.status === "incomplete"
                                ? "In Progress"
                                : "Not Started"}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl text-white">{milestone.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-200/70">Progress</span>
                        <span className="text-purple-200/70">{milestone.progress}%</span>
                      </div>
                      <Progress
                        value={milestone.progress}
                        className="h-2 bg-purple-900/30"
                        indicatorClassName={`
                          ${
                            milestone.status === "completed"
                              ? "bg-green-500"
                              : milestone.status === "incomplete"
                                ? "bg-blue-500"
                                : "bg-purple-500"
                          }
                        `}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                      <div className="flex items-center gap-4">
                        <div className="text-purple-200/70">
                          <span className="font-medium text-white">{milestone.fundingAmount}</span>{" "}
                          USDC
                        </div>
                        {milestone.status === "completed" ? (
                          <div className="flex items-center text-green-400">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Released
                          </div>
                        ) : milestone.status === "incomplete" ? (
                          <div className="flex items-center text-blue-400">
                            <PlayCircle className="mr-1 h-4 w-4" />
                            Pending
                          </div>
                        ) : (
                          <div className="flex items-center text-purple-200/70">
                            <Clock className="mr-1 h-4 w-4" />
                            Locked
                          </div>
                        )}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center text-[#A3A8AF] hover:text-white"
                        onClick={() => toggleMilestoneExpansion(milestone.id)}
                      >
                        {expandedMilestone === milestone.id ? (
                          <>
                            <ChevronUp className="mr-1 h-4 w-4" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="mr-1 h-4 w-4" />
                            Show More
                          </>
                        )}
                      </Button>
                    </div>

                    {expandedMilestone === milestone.id && (
                      <div className="pt-2 space-y-4">
                        <Separator className="bg-purple-800/20" />
                        <div>
                          <h4 className="font-medium text-white mb-2">Description</h4>
                          <p className="text-[#A3A8AF] text-sm">{milestone.description}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-white mb-2">Requirements</h4>
                            <div className="space-y-2">
                              {milestone.tasks.map((task) => (
                                <div
                                  key={task.id}
                                  className="flex items-start p-2 rounded-md border border-[#313E54]"
                                >
                                  <div className="flex items-start gap-2">
                                    <div className="pt-0.5">
                                      {task.req_status === "complete" ? (
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                      ) : (
                                        <div className="h-4 w-4 rounded-full border border-[#A3A8AF]" />
                                      )}
                                    </div>
                                    <div>
                                      <span className={`block ${task.req_status === 'complete' ? "text-white" : "text-[#A3A8AF]"}`}>
                                        {task.title}
                                      </span>
                                      {task.description && (
                                        <span className="text-xs text-[#A3A8AF] mt-1 block">{task.description}</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-purple-200/70">
                No milestones found...
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
