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
  const [milestones, setMilestones] = useState([])
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
          const formattedMilestones = data.milestones.map((milestone) => {
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
              completedDate: milestone.milestoneStatus === "complete" ? "Completed" : null,
              progress: progress,
              status:
                milestone.milestoneStatus === "complete" ? "completed" : progress > 0 ? "in_progress" : "not_started",
              fundingAmount: Math.round(milestone.fundPercentage),
              tasks: milestone.requirements.map((req, index) => ({
                id: `${milestone.milestoneId}-${index}`,
                title: req.name,
                description: req.description,
                completed: req.status === "complete",
              })),
            }
          })

          setMilestones(formattedMilestones)
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
    if (activeTab === "in_progress") return milestone.status === "in_progress"
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

          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Milestone
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1F2A3D] border-[#313E54] text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Milestone</DialogTitle>
                  <DialogDescription className="text-purple-200/70">
                    Create a new milestone for your project.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-white">
                      Title
                    </label>
                    <Input
                      id="title"
                      placeholder="Enter milestone title"
                      className="bg-[#29305F] border-[#313E54] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-white">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Enter milestone description"
                      className="bg-[#29305F] border-[#313E54] text-white min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="fundingAmount" className="text-sm font-medium text-white">
                      Funding Amount (USDC)
                    </label>
                    <Input
                      id="fundingAmount"
                      type="number"
                      placeholder="0"
                      className="bg-[#29305F] border-[#313E54] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium text-white">
                      Status
                    </label>
                    <Select>
                      <SelectTrigger className="bg-[#29305F] border-[#313E54] text-white">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#202C41] border-[#313E54] text-white">
                        <SelectItem value="not_started">Not Started</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Create Milestone
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
              <CardTitle className="text-2xl text-white">{projectStats.totalFunding.toLocaleString()} USDC</CardTitle>
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
                {projectStats.nextMilestone || milestones.find((m) => m.status === "in_progress")?.title || "None"}
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
                  value="in_progress"
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
                                  : milestone.status === "in_progress"
                                    ? "bg-blue-900/30 text-blue-400 border-blue-800"
                                    : "bg-purple-900/30 text-purple-400 border-purple-800"
                              }
                            `}
                          >
                            {milestone.status === "completed"
                              ? "Completed"
                              : milestone.status === "in_progress"
                                ? "In Progress"
                                : "Not Started"}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl text-white">{milestone.title}</CardTitle>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#A3A8AF] hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#A3A8AF] hover:text-white">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
                              : milestone.status === "in_progress"
                                ? "bg-blue-500"
                                : "bg-purple-500"
                          }
                        `}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                      <div className="flex items-center gap-4">
                        <div className="text-purple-200/70">
                          <span className="font-medium text-white">{milestone.fundingAmount.toLocaleString()}</span>{" "}
                          USDC
                        </div>
                        {milestone.status === "completed" ? (
                          <div className="flex items-center text-green-400">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Released
                          </div>
                        ) : milestone.status === "in_progress" ? (
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
                                className="flex items-start p-2 rounded-md bg-[#1F2A3D] border border-[#313E54]"
                              >
                                <div className="flex items-start gap-2">
                                  <div className="pt-0.5">
                                    {task.completed ? (
                                      <CheckCircle className="h-4 w-4 text-green-400" />
                                    ) : (
                                      <div className="h-4 w-4 rounded-full border border-[#A3A8AF]" />
                                    )}
                                  </div>
                                  <div>
                                    <span className={`block ${task.completed ? "text-white" : "text-[#A3A8AF]"}`}>
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
                No milestones found. Add your first milestone to get started.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
