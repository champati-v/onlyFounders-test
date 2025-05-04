"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@auth0/nextjs-auth0/client"
import { Progress } from "@/components/ui/progress"
import axios from "axios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const growthMetricOptions = [
  "Monthly Active Users (MAU)",
  "Daily Active Users",
  "User Acquisition Cost",
  "Average Revenue per user",
  "Lifetime Value",
  "Conversion Rate",
  "Churn Rate",
  "Network Effects",
  "Partnership secured",
  "Spaces spoken on",
  "Spaces hosted",
  "Events organized",
  "Events attended",
]

const otherMetricOptions = [
  "Total Value locked (TVL)",
  "Number of active wallets",
  "Average order size",
  "Activation Rate",
  "Net promoter Score (NPS)",
  "Revenue",
  "Cost per Customer Acquisition",
  "Retention Rate",
]

// Updated schema to handle numbers properly but store as strings
const tractionMetricsSchema = z.object({
  waitlistSignups: z.string().optional(),
  strategicPartners: z.string(),
  communitySize: z.string(),
  growthMetrics: z
    .array(
      z.object({
        metricName: z.string(),
        metricValue: z.string(), // Keep as string for form handling
      }),
    )
    .default([]),
  others: z
    .array(
      z.object({
        metricName: z.string(),
        metricValue: z.string().optional(), // Keep as string for form handling
      }),
    )
    .default([]),
})

type TractionMetricsValues = z.infer<typeof tractionMetricsSchema>

interface TractionMetricsFormProps {
  data: any
  updateData?: (data: any) => void
  onNext: () => void
  userId: string
}

export default function TractionMetricsForm({ data, updateData, onNext, userId }: TractionMetricsFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useUser()
  const [originalTractionData, setOriginalTractionData] = useState<any>(null)
  const [projectId, setProjectId] = useState<string | null>(null)
  const [selectedGrowthMetric, setSelectedGrowthMetric] = useState<string>("")
  const [selectedOtherMetric, setSelectedOtherMetric] = useState<string>("")

  // Initialize form with empty arrays for growthMetrics and others
  const form = useForm<TractionMetricsValues>({
    resolver: zodResolver(tractionMetricsSchema),
    defaultValues: {
      waitlistSignups: data?.waitlistSignups || "",
      strategicPartners: data?.strategicPartners || "",
      communitySize: data?.communitySize || "",
      growthMetrics: [],
      others: [],
    },
  })

  const {
    fields: growthMetricFields,
    append: appendGrowthMetric,
    remove: removeGrowthMetric,
    replace: replaceGrowthMetrics,
  } = useFieldArray({
    control: form.control,
    name: "growthMetrics",
  })

  const {
    fields: otherMetricFields,
    append: appendOtherMetric,
    remove: removeOtherMetric,
    replace: replaceOtherMetrics,
  } = useFieldArray({
    control: form.control,
    name: "others",
  })

  // Ensure fields are initialized as empty arrays
  useEffect(() => {
    replaceGrowthMetrics([])
    replaceOtherMetrics([])
  }, [])

  useEffect(() => {
    const fetchProjectId = async () => {
      try {
        if (!user) return
        const userId = user?.sub?.substring(14)
        const response = await fetch("https://onlyfounders.azurewebsites.net/api/startup/get-projectId", {
          method: "GET",
          headers: {
            user_id: userId,
          },
        })

        if (response.status === 200) {
          const data = await response.json()
          setProjectId(data.projectId)
        }
      } catch (error) {
        console.error("Error fetching project ID:", error)
        toast({
          title: "Error",
          description: "Failed to load project ID. Please refresh the page.",
          variant: "destructive",
        })
      }
    }
    fetchProjectId()
  }, [user])

  useEffect(() => {
    // Function to fetch startup data
    const fetchStartupData = async () => {
      try {
        if (!user || !projectId) return
        const userId = user?.sub?.substring(14)
        const requestBody = { projectId }
        if (!userId) {
          toast({
            title: "Authentication error",
            description: "Please sign in again to continue.",
            variant: "destructive",
          })
          router.push("/api/auth/login")
          return
        }
        const response = await axios.post(
          "https://ofStaging.azurewebsites.net/api/startup/view-startup",
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
              user_id: userId,
            },
          },
        )

        const data = response.data

        if (data && data.startup && data.startup.traction) {
          const traction = data.startup.traction

          // Ensure we're setting arrays properly and converting numbers to strings
          const growthMetrics = Array.isArray(traction.growthMetrics)
            ? traction.growthMetrics.map((metric) => ({
                metricName: metric.metricName,
                metricValue: metric.metricValue?.toString() || "",
              }))
            : []

          const others = Array.isArray(traction.others)
            ? traction.others.map((metric) => ({
                metricName: metric.metricName,
                metricValue: metric.metricValue?.toString() || "",
              }))
            : []

          // Set form values
          form.reset({
            waitlistSignups: traction.waitlistSignups?.toString() || "",
            strategicPartners: traction.strategicPartners?.toString() || "",
            communitySize: traction.communitySize?.toString() || "",
            growthMetrics: growthMetrics,
            others: others,
          })

          // Also explicitly set the field arrays
          replaceGrowthMetrics(growthMetrics)
          replaceOtherMetrics(others)

          // Store original data for comparison
          setOriginalTractionData(traction)
        }
      } catch (error) {
        console.error("Error fetching startup data:", error)
        toast({
          title: "Error",
          description: "Failed to load traction metrics data. Please refresh the page.",
          variant: "destructive",
        })
      }
    }

    fetchStartupData()
  }, [projectId])

  const handleSubmit = async (values: TractionMetricsValues) => {
    try {
      setIsSubmitting(true)

      const userId = user?.sub?.substring(14)

      if (!userId) {
        toast({
          title: "Authentication error",
          description: "Please sign in again to continue.",
          variant: "destructive",
        })
        router.push("/api/auth/login")
        return
      }

      // Update data in parent component if updateData is provided
      if (typeof updateData === "function") {
        updateData(values)
      }

      // Check if there are changes by comparing with original data
      let hasChanges = false

      if (originalTractionData) {
        // Compare fields
        if (
          values.waitlistSignups !== originalTractionData.waitlistSignups?.toString() ||
          values.strategicPartners !== originalTractionData.strategicPartners?.toString() ||
          values.communitySize !== originalTractionData.communitySize?.toString() ||
          JSON.stringify(values.growthMetrics) !== JSON.stringify(originalTractionData.growthMetrics) ||
          JSON.stringify(values.others) !== JSON.stringify(originalTractionData.others)
        ) {
          hasChanges = true
        }
      } else {
        // If we don't have original data, assume changes were made
        hasChanges = true
      }

      // If there are no changes and we have original data, we can skip submission
      if (!hasChanges && originalTractionData) {
        toast({
          title: "No changes detected",
          description: "Moving to the next step.",
        })
        router.push("/startup-setup/coreTeam")
        return
      }

      // Prepare data for API submission - convert string values to numbers
      const apiData = {
        waitlistSignups: values.waitlistSignups || "",
        strategicPartners: values.strategicPartners || "",
        communitySize: values.communitySize || "",
        growthMetrics: values.growthMetrics.map((metric) => ({
          metricName: metric.metricName,
          metricValue: metric.metricValue ? Number.parseInt(metric.metricValue) : 0,
        })),
        others: values.others.map((metric) => ({
          metricName: metric.metricName,
          metricValue: metric.metricValue ? Number.parseInt(metric.metricValue) : 0,
        })),
      }

      // Send data to API
      const response = await fetch("https://ofStaging.azurewebsites.net/api/startup/submit-traction-details", {
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
        description: "Your traction metrics have been submitted successfully.",
      })

      // Route to next page
      router.push("/startup-setup/coreTeam")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddGrowthMetric = () => {
    if (selectedGrowthMetric) {
      // Check if this metric already exists
      const exists = growthMetricFields.some((field) => field.metricName === selectedGrowthMetric)

      if (!exists) {
        appendGrowthMetric({
          metricName: selectedGrowthMetric,
          metricValue: "", // Initialize with empty string
        })
        setSelectedGrowthMetric("")
      } else {
        toast({
          title: "Metric already added",
          description: "This growth metric has already been added to the form.",
          variant: "destructive",
        })
      }
    }
  }

  const handleAddOtherMetric = () => {
    if (selectedOtherMetric) {
      // Check if this metric already exists
      const exists = otherMetricFields.some((field) => field.metricName === selectedOtherMetric)

      if (!exists) {
        appendOtherMetric({
          metricName: selectedOtherMetric,
          metricValue: "", // Initialize with empty string
        })
        setSelectedOtherMetric("")
      } else {
        toast({
          title: "Metric already added",
          description: "This metric has already been added to the form.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="flex items-center justify-center mx-auto px-6 mt-4 py-4">
      <div className="w-full max-w-4xl">
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Startup Setup</span>
            <span className="text-white font-medium">Step 2 of 5</span>
          </div>
          <Progress
            value={40}
            className="h-2 bg-gray-700"
            indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-400"
          />
        </div>
        <div className="bg-gray-900 p-6 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="space-y-4">
                <p className="text-gray-400">
                  Share key metrics and traction indicators to demonstrate your project's progress and potential.
                </p>

                <FormField
                  control={form.control}
                  rules={{ required: "This field is required" }}
                  name="waitlistSignups"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Waitlist Signups</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 5000" className="bg-gray-800 border-gray-700 text-white" {...field} />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Number of users who have signed up for early access or updates
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="strategicPartners"
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Strategic Partners<span className="text-red-500 text-sm">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 12" className="bg-gray-800 border-gray-700 text-white" {...field} />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Count of strategic partnerships established
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="communitySize"
                  required
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Community Size<span className="text-red-500 text-sm">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 12" className="bg-gray-800 border-gray-700 text-white" {...field} />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Number of Community members
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Growth Metrics Dropdown */}
                <div className="space-y-2">
                  <FormLabel className="text-white">Growth Metrics<span className="text-red-500 text-sm">*</span></FormLabel>
                  <div className="flex gap-2">
                    <Select value={selectedGrowthMetric} onValueChange={setSelectedGrowthMetric}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select a metric" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {growthMetricOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      onClick={handleAddGrowthMetric}
                      className="bg-black hover:bg-gray-900 text-white border border-gray-800"
                      disabled={!selectedGrowthMetric}
                    >
                      Add
                    </Button>
                  </div>
                  <FormDescription className="text-gray-500">
                    Select growth metrics relevant to your startup
                  </FormDescription>
                </div>

                {/* Growth Metrics Fields - Only render if there are fields */}
                {growthMetricFields.length > 0 &&
                  growthMetricFields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-2">
                      <FormField
                        control={form.control}
                        name={`growthMetrics.${index}.metricValue`}
                        render={({ field: valueField }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-white">{field.metricName}</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                className="bg-gray-800 border-gray-700 text-white"
                                placeholder="Enter value"
                                {...valueField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeGrowthMetric(index)}
                        className="mb-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <input
                        type="hidden"
                        {...form.register(`growthMetrics.${index}.metricName`)}
                        value={field.metricName}
                      />
                    </div>
                  ))}

                {/* Other Metrics Dropdown */}
                <div className="space-y-2">
                  <FormLabel className="text-white">Other Metrics</FormLabel>
                  <div className="flex gap-2">
                    <Select value={selectedOtherMetric} onValueChange={setSelectedOtherMetric}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select a metric" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {otherMetricOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      onClick={handleAddOtherMetric}
                      className="bg-black hover:bg-gray-900 text-white border border-gray-800"
                      disabled={!selectedOtherMetric}
                    >
                      Add
                    </Button>
                  </div>
                  <FormDescription className="text-gray-500">
                    Select other metrics relevant to your startup
                  </FormDescription>
                </div>

                {/* Other Metrics Fields - Only render if there are fields */}
                {otherMetricFields.length > 0 &&
                  otherMetricFields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-2">
                      <FormField
                        control={form.control}
                        name={`others.${index}.metricValue`}
                        render={({ field: valueField }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-white">{field.metricName}</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                className="bg-gray-800 border-gray-700 text-white"
                                placeholder="Enter value"
                                {...valueField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOtherMetric(index)}
                        className="mb-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <input type="hidden" {...form.register(`others.${index}.metricName`)} value={field.metricName} />
                    </div>
                  ))}
              </div>

              <div className="flex justify-between items-center">
                <a href="/startup-setup/basicInfo" className="px-3 py-1.5 rounded-md bg-black hover:bg-gray-900 transition-all duration-200 border border-gray-800 text-white flex items-center gap-1"
                ><ArrowLeft className="h-4 w-4"/> Back </a>
                <Button
                  type="submit"
                  className="bg-black hover:bg-gray-900 text-white border border-gray-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
