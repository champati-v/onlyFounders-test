"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Users, Clock, CheckCircle, Bookmark, Plus, Star, Trash2, Bell } from "lucide-react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import axios from "axios"
import { API_URL } from "@/lib/config"

export default function WatchlistPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [watchlistData, setWatchlistData] = useState({ message: "", startups: [] })
  const [loading, setLoading] = useState(false)
  const { user, isLoading: userLoading } = useUser()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchWatchlist = async () => {
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

        const response = await axios.get(`${API_URL}/api/startup/list-watchList`, {
          headers: {
            user_id: userId,
          },
        })
        setWatchlistData(response.data)
      } catch (error) {
        console.error("Error fetching watchlist:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWatchlist()
  }, [user, userLoading, router, toast])

  // Map API data to match the UI structure
  const mappedWatchlistProjects = watchlistData?.startups?.map((startup, index) => ({
    id: index.toString(),
    name: startup.startupName || "N/A",
    logo: "/placeholder.svg?height=40&width=40&text=" + startup.startupName.substring(0, 2),
    category: startup.category,
    stage: startup.stage,
    description: startup.description,
    raisedAmount: startup.totalRaised,
    targetAmount: startup.fundingTarget || 1, // Prevent division by zero
    backers: Math.floor(Math.random() * 100), // Random backers since not in API
    daysLeft:
      startup.deadline !== "NA" ? Math.ceil((new Date(startup.deadline) - new Date()) / (1000 * 60 * 60 * 24)) : 30,
    starred: Math.random() > 0.5, // Random starred status
    notifications: Math.random() > 0.5, // Random notification status
  }))

  // Keep the mock data as fallback
  const watchlistProjects =
    mappedWatchlistProjects.length > 0
      ? mappedWatchlistProjects
      : [
          {
            id: "1",
            name: "Loading",
            logo: "/placeholder.svg?height=40&width=40&text=VR",
            category: "Loading",
            description: "Loading",
            raisedAmount: 0,
            targetAmount: 0,
            backers: 0,
            daysLeft: 0,
            starred: true,
            notifications: true,
          },
        ]

  // Filter projects based on search query
  const filteredProjects = watchlistProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Watchlist</h1>
            <p className="text-purple-200/70">Track projects you're interested in</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A3A8AF]" />
              <Input
                type="text"
                placeholder="Search watchlist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#1F2A3D] border border-[#313E54] rounded-md text-white w-full md:w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* <div className="bg-[#1F2A3D] p-2 rounded-lg">
                      <Image
                        src={project.logo || "/placeholder.svg"}
                        alt={project.name}
                        width={40}
                        height={40}
                        className="rounded-lg"
                      />
                    </div> */}
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="font-medium text-white">{project.name}</h3>

                      </div>
                        <div className="flex items-center gap-2 mt-4">
                          <Badge variant="outline" className="bg-[#1F2A3D] text-[#A3A8AF] border-[#313E54]">
                            {project.category}
                          </Badge>
                          <Badge variant="outline" className="bg-[#1F2A3D] text-[#A3A8AF] border-[#313E54]">
                            {project.stage}
                          </Badge>
                        </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-[#A3A8AF]">{project.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#A3A8AF]">Raised</span>
                    <span className="text-[#A3A8AF]">
                      {Math.round((project.raisedAmount / project.targetAmount) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(project.raisedAmount / project.targetAmount) * 100}
                    className="h-2 bg-[#1F2A3D]"
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                  />

                  <div className="flex justify-between text-xs text-[#A3A8AF]">
                    <span>{project.raisedAmount.toLocaleString()} USDC</span>
                    <span>{project.targetAmount.toLocaleString()} USDC</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Invest Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
