"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check, Plus, Trash } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import axios from "axios"

const milestoneSchema = z.object({
  quarter: z.string().min(1, { message: "Quarter is required" }),
  year: z.string().min(4, { message: "Year is required" }),
  milestones: z
    .array(
      z.object({
        description: z.string().min(1, { message: "Milestone description is required" }),
        completed: z.boolean().default(false),
      }),
    )
    .min(1, { message: "At least one milestone is required" }),
})

type MilestoneValues = z.infer<typeof milestoneSchema>

interface RoadmapFormProps {
  data: any[]
  updateData?: (data: any[]) => void
  onNext: () => void
}

export default function RoadmapForm({ data, updateData, onNext }: RoadmapFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { user, error, isLoading } = useUser()
  const [roadmapItems, setRoadmapItems] = useState<any[]>(data?.length > 0 ? data : [])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [milestoneInputs, setMilestoneInputs] = useState<{ description: string; completed: boolean }[]>([
    { description: "", completed: false },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [originalRoadmapData, setOriginalRoadmapData] = useState<any[]>([])
  const [projectId, setProjectId] = useState<string | null>(null)

  const form = useForm<MilestoneValues>({
    resolver: zodResolver(milestoneSchema),
    defaultValues: {
      quarter: "",
      year: new Date().getFullYear().toString(),
      milestones: [{ description: "", completed: false }],
    },
  })

  useEffect(() => {
        const fetchProjectId = async () => {
          try{
            if(!user) return
            const userId = user?.sub?.substring(14)
            const response = await fetch("https://onlyfounders.azurewebsites.net/api/startup/get-projectId",{
              method: "GET",
              headers: {
                user_id: userId,
              },
            })
    
            if(response.status === 200){
              const data = await response.json()
              setProjectId(data.projectId)
            }
          }
          catch(error){
            console.error("Error fetching project ID:", error)
            toast({
              title: "Error",
              description: "Failed to load project ID. Please refresh the page.",
              variant: "destructive",
            })
          }
        };
        fetchProjectId();
      }, [user])

  useEffect(() => {
    // Function to fetch startup data
    const fetchStartupData = async () => {
      try {
        if(!user || !projectId) return
        const userId = user?.sub?.substring(14)
        const requestBody = { projectId };
        const response = await axios.post(
          "https://ofStaging.azurewebsites.net/api/startup/view-startup",
          requestBody, // ✅ Correct JSON format
          {
            headers: {
              "Content-Type": "application/json", // ✅ Correct header
              user_id: userId,
            },
          }
        );
  
        const data = response.data;

        if (data && data.startup && data.startup.roadmap) {
          const roadmap = data.startup.roadmap

          // Transform the roadmap data to match our component's format
          const formattedRoadmapItems = roadmap.map((item: any) => {
            // Parse quarter and year from quarterYear (e.g., "Q3 2025")
            const quarterYearParts = item.quarterYear.split(" ")
            const quarter = quarterYearParts[0] || "Q1"
            const year = quarterYearParts[1] || new Date().getFullYear().toString()

            // Format milestones
            const milestones = item.milestones.map((milestone: any) => ({
              description: milestone.content || "",
              completed: milestone.status === "Complete",
              originalId: milestone._id,
            }))

            return {
              quarter,
              year,
              milestones,
              originalId: item._id,
            }
          })

          setRoadmapItems(formattedRoadmapItems)
          setOriginalRoadmapData(roadmap) // Store original data for comparison
        }
      } catch (error) {
        console.error("Error fetching startup data:", error)
        toast({
          title: "Error",
          description: "Failed to load roadmap data. Please refresh the page.",
          variant: "destructive",
        })
      }
    }

    fetchStartupData()
  }, [projectId])

  // Update form's milestones field when milestoneInputs changes
  useEffect(() => {
    const validMilestones = milestoneInputs.filter((m) => m.description.trim() !== "")
    if (validMilestones.length > 0) {
      form.setValue("milestones", validMilestones)
    }
  }, [milestoneInputs, form])

  const handleAddMilestone = () => {
    setMilestoneInputs([...milestoneInputs, { description: "", completed: false }])
  }

  const handleRemoveMilestone = (index: number) => {
    if (milestoneInputs.length > 1) {
      const updatedMilestones = [...milestoneInputs]
      updatedMilestones.splice(index, 1)
      setMilestoneInputs(updatedMilestones)
    }
  }

  const handleMilestoneChange = (index: number, value: string) => {
    const updatedMilestones = [...milestoneInputs]
    updatedMilestones[index].description = value
    setMilestoneInputs(updatedMilestones)
  }

  const handleMilestoneStatusChange = (index: number, checked: boolean) => {
    const updatedMilestones = [...milestoneInputs]
    updatedMilestones[index].completed = checked
    setMilestoneInputs(updatedMilestones)
  }

  const handleAddRoadmapItem = (values: MilestoneValues) => {
    // Filter out empty milestones
    const validMilestones = milestoneInputs.filter((m) => m.description.trim() !== "")

    if (validMilestones.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one milestone with a description.",
        variant: "destructive",
      })
      return
    }

    const newItem = {
      quarter: values.quarter,
      year: values.year,
      milestones: validMilestones,
    }

    if (editingIndex !== null) {
      // Update existing item
      const updatedItems = [...roadmapItems]
      updatedItems[editingIndex] = newItem
      setRoadmapItems(updatedItems)
    } else {
      // Add new item
      setRoadmapItems([...roadmapItems, newItem])
    }

    // Reset form
    form.reset({
      quarter: "",
      year: new Date().getFullYear().toString(),
      milestones: [{ description: "", completed: false }],
    })
    setMilestoneInputs([{ description: "", completed: false }])
    setEditingIndex(null)

    toast({
      title: "Success",
      description: editingIndex !== null ? "Roadmap item updated" : "Roadmap item added",
    })
  }

  const handleEditRoadmapItem = (index: number) => {
    const item = roadmapItems[index]
    form.reset({
      quarter: item.quarter,
      year: item.year,
      milestones: item.milestones,
    })
    setMilestoneInputs(item.milestones)
    setEditingIndex(index)
  }

  const handleDeleteRoadmapItem = (index: number) => {
    const updatedItems = roadmapItems.filter((_, i) => i !== index)
    setRoadmapItems(updatedItems)

    toast({
      title: "Deleted",
      description: "Roadmap item removed",
    })
  }

  const handleNext = async () => {
    try {
      setIsSubmitting(true)

      // Update data in parent component if updateData is provided
      if (typeof updateData === "function") {
        updateData(roadmapItems)
      }

      // Check if user is authenticated
      const userId = user?.sub?.substring(14)

      if (!userId) {
        toast({
          title: "Authentication error",
          description: "Please sign in again to continue.",
          variant: "destructive",
        })
        router.push("/login")
        return
      }

      // Check if there are changes by comparing with original data
      const hasChanges =
        roadmapItems.length !== originalRoadmapData.length ||
        roadmapItems.some((item, index) => {
          // For new items (without originalId), consider them as changes
          if (!item.originalId) return true

          // For existing items, compare with original data
          const originalItem = originalRoadmapData.find((r: any) => r._id === item.originalId)
          if (!originalItem) return true

          // Compare quarterYear
          const itemQuarterYear = `${item.quarter} ${item.year}`
          if (itemQuarterYear !== originalItem.quarterYear) return true

          // Compare milestones
          if (item.milestones.length !== originalItem.milestones.length) return true

          // Check each milestone
          return item.milestones.some((milestone: any, mIndex: number) => {
            // For new milestones (without originalId), consider them as changes
            if (!milestone.originalId) return true

            // Find corresponding original milestone
            const originalMilestone = originalItem.milestones.find((m: any) => m._id === milestone.originalId)
            if (!originalMilestone) return true

            // Compare content and status
            return (
              milestone.description !== originalMilestone.content ||
              (milestone.completed ? "Complete" : "pending") !== originalMilestone.status
            )
          })
        })

      // If there are no changes and we have original data, we can skip submission
      if (!hasChanges && originalRoadmapData.length > 0) {
        toast({
          title: "No changes detected",
          description: "Moving to the next step.",
        })
        router.push("/startup-setup/tokenomics")
        return
      }

      // Format data for API
      const formattedRoadmap = roadmapItems.map((item) => {
        return {
          quarterYear: `${item.quarter} ${item.year}`,
          milestones: item.milestones.map((milestone: any) => ({
            content: milestone.description,
            status: milestone.completed ? "Complete" : "pending",
          })),
        }
      })

      // Prepare API payload
      const apiData = {
        roadmap: formattedRoadmap,
      }

      // Send data to API
      const response = await fetch("https://ofStaging.azurewebsites.net/api/startup/add-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          user_id: userId,
        },
        body: JSON.stringify(apiData),
      })

      // if (!response.ok) {
      //   throw new Error(`API error: ${response.status}`)
      // }

      // Show success toast
      toast({
        title: "Success!",
        description: "Your roadmap has been submitted successfully.",
      })

      // Route to next page
      router.push("/startup-setup/tokenomics")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was a problem submitting your roadmap. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const quarters = ["Q1", "Q2", "Q3", "Q4"]
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 6 }, (_, i) => (currentYear + i).toString())

  if (error) {
    return <div className="text-center text-red-500">Error loading user information. Please refresh the page.</div>
  }

  return (
    <div className="flex items-center justify-center mx-auto py-6">
      <div className="w-full max-w-4xl">
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Startup Setup</span>
            <span className="text-white font-medium">Step 4 of 5</span>
          </div>
          <Progress
            value={80}
            className="h-2 bg-gray-700"
            indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-400"
          />
        </div>
        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-gray-400">
                Define your project roadmap with key milestones and timelines. This helps investors understand your
                execution plan.
              </p>

              {roadmapItems.length > 0 && (
                <div className="space-y-4 mb-6">
                  {roadmapItems.map((item, index) => (
                    <Card key={index} className="bg-gray-800 border-gray-700">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <h3 className="text-lg font-medium text-white">
                          {item.quarter} {item.year}
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {item.milestones.map((milestone: any, mIndex: number) => (
                            <li key={mIndex} className="flex items-start gap-2">
                              <div
                                className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center ${milestone.completed ? "bg-green-500/20 text-green-500" : "bg-gray-700 text-gray-500"}`}
                              >
                                {milestone.completed && <Check className="h-3 w-3" />}
                              </div>
                              <span className="text-gray-300">{milestone.description}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <h3 className="text-lg font-medium text-white">
                    {editingIndex !== null ? "Edit Roadmap Item" : "Add Roadmap Item"}
                  </h3>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddRoadmapItem)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="quarter"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Quarter<span className="text-red-500 text-sm">*</span></FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                    <SelectValue placeholder="Select quarter" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-gray-900 border-gray-800 text-white">
                                  {quarters.map((quarter) => (
                                    <SelectItem key={quarter} value={quarter}>
                                      {quarter}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Year<span className="text-red-500 text-sm">*</span></FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                    <SelectValue placeholder="Select year" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-gray-900 border-gray-800 text-white">
                                  {years.map((year) => (
                                    <SelectItem key={year} value={year}>
                                      {year}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-white">Milestones<span className="text-red-500 text-sm">*</span></h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 border-gray-700 text-white"
                            onClick={handleAddMilestone}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Milestone
                          </Button>
                        </div>

                        <p className="text-sm text-gray-500">Add key milestones for this quarter</p>

                        <div className="space-y-3">
                          {milestoneInputs.map((milestone, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="flex-1">
                                <Input
                                  value={milestone.description}
                                  onChange={(e) => handleMilestoneChange(index, e.target.value)}
                                  placeholder="Enter milestone description"
                                  className="bg-gray-800 border-gray-700 text-white"
                                />
                              </div>
                              {milestoneInputs.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-9 w-9 border-gray-700"
                                  onClick={() => handleRemoveMilestone(index)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit" className="bg-black hover:bg-gray-900 text-white border border-gray-800">
                          {editingIndex !== null ? "Update Roadmap Item" : "Add Roadmap Item"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-800">
              <a href="/startup-setup/coreTeam" className="px-3 py-1.5 rounded-md bg-black hover:bg-gray-900 transition-all duration-200 border border-gray-800 text-white flex items-center gap-1"
              ><ArrowLeft className="h-4 w-4"/> Back </a>
              <Button
                type="button"
                onClick={handleNext}
                className="bg-black hover:bg-gray-900 text-white border border-gray-800"
                disabled={roadmapItems.length === 0 || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : roadmapItems.length === 0 ? "Add at least one roadmap item" : "Next"}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

