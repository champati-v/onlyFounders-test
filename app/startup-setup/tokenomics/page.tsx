"use client"

import { API_URL } from '@/lib/config';
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Plus, Trash } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import axios from "axios"

const tokenomicsSchema = z.object({
  tokenName: z.string().min(1, { message: "Token name is required" }),
  symbol: z.string().min(1, { message: "Token symbol is required" }),
  totalSupply: z.string().min(1, { message: "Total supply is required" }),
  tokenType: z.string().min(1, { message: "Token type is required" }),
  initialPrice: z.string().optional(),
  publicSale: z.string().min(1, { message: "Public sale percentage is required" }),
  teamAdvisors: z.string().min(1, { message: "Team & advisors percentage is required" }),
  foundation: z.string().min(1, { message: "Foundation percentage is required" }),
  ecosystemGrowth: z.string().min(1, { message: "Ecosystem growth percentage is required" }),
  strategicPartners: z.string().min(1, { message: "Strategic partners percentage is required" }),
  others: z.string().optional(),
})

type TokenomicsValues = z.infer<typeof tokenomicsSchema>

interface TokenomicsFormProps {
  data: any
  updateData?: (data: any) => void
  onSubmit?: () => void
}

export default function TokenomicsForm({ data, updateData, onSubmit }: TokenomicsFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { user, error, isLoading } = useUser()
  const [useCases, setUseCases] = useState<string[]>(data?.useCases || [""])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [originalTokenomicsData, setOriginalTokenomicsData] = useState<any>(null)
  const [projectId, setProjectId] = useState<string | null>(null)

  const form = useForm<TokenomicsValues>({
    resolver: zodResolver(tokenomicsSchema),
    defaultValues: {
      tokenName: data?.tokenName || "",
      symbol: data?.symbol || "",
      totalSupply: data?.totalSupply || "",
      tokenType: data?.tokenType || "",
      initialPrice: data?.initialPrice || "",
      publicSale: data?.publicSale || "",
      teamAdvisors: data?.teamAdvisors || "",
      foundation: data?.foundation || "",
      ecosystemGrowth: data?.ecosystemGrowth || "",
      strategicPartners: data?.strategicPartners || "",
      others: data?.others || "",
    },
  })

  useEffect(() => {
      const fetchProjectId = async () => {
        try{
          if(!user) return
          const userId = user?.sub?.substring(14)
          const response = await fetch(`${API_URL}/api/startup/get-projectId`,{
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
        if (!user || !projectId) return;
  
        const userId = user?.sub?.substring(14);
        const requestBody = { projectId };
  
        console.log("The project id is", JSON.stringify({ projectId }));
  
        const response = await axios.post(
          `${API_URL}/api/startup/view-startup`,
          requestBody, // ✅ Correct JSON format
          {
            headers: {
              "Content-Type": "application/json", // ✅ Correct header
              user_id: userId,
            },
          }
        );
  
        const data = response.data; // ✅ Axios handles JSON parsing automatically

        if (data && data.startup && data.startup.tokenomics) {
          const tokenomics = data.startup.tokenomics

          // Set use cases
          if (tokenomics.useCases && Array.isArray(tokenomics.useCases)) {
            setUseCases(tokenomics.useCases.length > 0 ? tokenomics.useCases : [""])
          }

          // Set form values
          form.reset({
            tokenName: tokenomics.tokenName || "",
            symbol: tokenomics.symbol || "",
            totalSupply: tokenomics.totalSupply?.toString() || "",
            tokenType: tokenomics.tokenType || "",
            initialPrice: tokenomics.initialPrice?.toString() || "",
            publicSale: tokenomics.tokenDistribution?.publicSale?.toString() || "",
            teamAdvisors: tokenomics.tokenDistribution?.teamAdvisors?.toString() || "",
            foundation: tokenomics.tokenDistribution?.foundation?.toString() || "",
            ecosystemGrowth: tokenomics.tokenDistribution?.ecosystemGrowth?.toString() || "",
            strategicPartners: tokenomics.tokenDistribution?.strategicPartners?.toString() || "",
            others: tokenomics.tokenDistribution?.others?.toString() || "",
          })

          // Store original data for comparison
          setOriginalTokenomicsData(tokenomics)
        }
      } catch (error) {
        console.error("Error fetching startup data:", error)
        toast({
          title: "Error",
          description: "Failed to load tokenomics data. Please refresh the page.",
          variant: "destructive",
        })
      }
    }

    fetchStartupData()
  }, [projectId])

  const handleAddUseCase = () => {
    setUseCases([...useCases, ""])
  }

  const handleRemoveUseCase = (index: number) => {
    if (useCases.length > 1) {
      const updatedUseCases = [...useCases]
      updatedUseCases.splice(index, 1)
      setUseCases(updatedUseCases)
    }
  }

  const handleUseCaseChange = (index: number, value: string) => {
    const updatedUseCases = [...useCases]
    updatedUseCases[index] = value
    setUseCases(updatedUseCases)
  }

  const handleSubmit = async (values: TokenomicsValues) => {
    try {
      setIsSubmitting(true)

      // Filter out empty use cases
      const filteredUseCases = useCases.filter((useCase) => useCase.trim() !== "")

      // Update data in parent component if updateData is provided
      if (typeof updateData === "function") {
        updateData({
          ...values,
          useCases: filteredUseCases,
        })
      }

      // Call onSubmit if provided
      if (typeof onSubmit === "function") {
        onSubmit()
      }

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

      // Check if there are changes by comparing with original data
      let hasChanges = false

      if (originalTokenomicsData) {
        // Compare basic fields
        if (
          values.tokenName !== originalTokenomicsData.tokenName ||
          values.symbol !== originalTokenomicsData.symbol ||
          values.totalSupply !== originalTokenomicsData.totalSupply?.toString() ||
          values.tokenType !== originalTokenomicsData.tokenType ||
          values.initialPrice !== originalTokenomicsData.initialPrice?.toString()
        ) {
          hasChanges = true
        }

        // Compare token distribution
        if (
          values.publicSale !== originalTokenomicsData.tokenDistribution?.publicSale?.toString() ||
          values.teamAdvisors !== originalTokenomicsData.tokenDistribution?.teamAdvisors?.toString() ||
          values.foundation !== originalTokenomicsData.tokenDistribution?.foundation?.toString() ||
          values.ecosystemGrowth !== originalTokenomicsData.tokenDistribution?.ecosystemGrowth?.toString() ||
          values.strategicPartners !== originalTokenomicsData.tokenDistribution?.strategicPartners?.toString() ||
          values.others !== originalTokenomicsData.tokenDistribution?.others?.toString()
        ) {
          hasChanges = true
        }

        // Compare use cases
        if (
          !originalTokenomicsData.useCases ||
          filteredUseCases.length !== originalTokenomicsData.useCases.length ||
          !filteredUseCases.every(
            (useCase: string, index: number) => useCase === originalTokenomicsData.useCases[index],
          )
        ) {
          hasChanges = true
        }
      } else {
        // If we don't have original data, assume changes were made
        hasChanges = true
      }

      // If there are no changes and we have original data, we can skip submission
      if (!hasChanges && originalTokenomicsData) {
        toast({
          title: "No changes detected",
          description: "Moving to the marketplace.",
        })
        router.push("/marketplace")
        return
      }

      // Format data for API
      const apiData = {
        tokenName: values.tokenName,
        symbol: values.symbol,
        totalSupply: Number.parseFloat(values.totalSupply),
        tokenType: values.tokenType,
        initialPrice: Number.parseFloat(values.initialPrice || "0"),
        useCases: filteredUseCases,
        tokenDistribution: {
          publicSale: Number.parseFloat(values.publicSale),
          teamAdvisors: Number.parseFloat(values.teamAdvisors),
          foundation: Number.parseFloat(values.foundation),
          ecosystemGrowth: Number.parseFloat(values.ecosystemGrowth),
          strategicPartners: Number.parseFloat(values.strategicPartners),
          others: Number.parseFloat(values.others || "0"),
        },
      }

      // Send data to API
      const response = await fetch(`${API_URL}/api/startup/submit-tokenomics-details`, {
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
        description: "Your tokenomics details have been submitted successfully.",
      })

      // Route to marketplace page
      router.push("/marketplace")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was a problem submitting your tokenomics details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const tokenTypes = ["ERC-20", "BEP-20", "TRC-20", "SPL", "ERC-721", "ERC-1155", "Other"]

  // Calculate total percentage
  const calculateTotal = () => {
    const values = form.getValues()
    const percentages = [
      Number.parseFloat(values.publicSale || "0"),
      Number.parseFloat(values.teamAdvisors || "0"),
      Number.parseFloat(values.foundation || "0"),
      Number.parseFloat(values.ecosystemGrowth || "0"),
      Number.parseFloat(values.strategicPartners || "0"),
      Number.parseFloat(values.others || "0"),
    ]

    return percentages.reduce((sum, value) => sum + (isNaN(value) ? 0 : value), 0)
  }

  const totalPercentage = calculateTotal()
  const isValidTotal = totalPercentage === 100

  if (error) {
    return <div className="text-center text-red-500">Error loading user information. Please refresh the page.</div>
  }

  return (
    <div className="flex items-center justify-center mx-auto mt-4 py-4">
      <div className="w-full max-w-4xl">
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Startup Setup</span>
            <span className="text-white font-medium">Step 5 of 5</span>
          </div>
          <Progress
            value={100}
            className="h-2 bg-gray-700"
            indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-400"
          />
        </div>
        <div className="bg-gray-900 p-6 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="space-y-4">
                <p className="text-gray-400">
                  Provide details about your token economics. This information is crucial for investors to understand
                  the value and distribution of your token.
                </p>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white">Token Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="tokenName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Token Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Ethereum"
                              className="bg-gray-800 border-gray-700 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="symbol"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Symbol</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., ETH"
                              className="bg-gray-800 border-gray-700 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="totalSupply"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Total Supply</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., 1,000,000,000"
                              className="bg-gray-800 border-gray-700 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tokenType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Token Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder="Select token type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-900 border-gray-800 text-white">
                              {tokenTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
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
                      name="initialPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Initial Price (USD)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., $0.01"
                              className="bg-gray-800 border-gray-700 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-white">Use Cases</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 border-gray-700 text-white"
                        onClick={handleAddUseCase}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Use Case
                      </Button>
                    </div>

                    <p className="text-sm text-gray-500">
                      List specific ways your token is utilized (e.g., payments, staking, governance)
                    </p>

                    <div className="space-y-3">
                      {useCases.map((useCase, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex-1">
                            <Input
                              value={useCase}
                              onChange={(e) => handleUseCaseChange(index, e.target.value)}
                              placeholder="e.g., Staking for network security"
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-6 mt-6 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Token Distribution</h3>
                    <div className={`text-sm font-medium ${isValidTotal ? "text-green-500" : "text-red-500"}`}>
                      Total: {totalPercentage}%
                    </div>
                  </div>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="publicSale"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Public Sale (%)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., 30"
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e)
                                    form.trigger([
                                      "publicSale",
                                      "teamAdvisors",
                                      "foundation",
                                      "ecosystemGrowth",
                                      "strategicPartners",
                                      "others",
                                    ])
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="teamAdvisors"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Team & Advisors (%)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., 15"
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e)
                                    form.trigger([
                                      "publicSale",
                                      "teamAdvisors",
                                      "foundation",
                                      "ecosystemGrowth",
                                      "strategicPartners",
                                      "others",
                                    ])
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="foundation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Foundation (%)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., 10"
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e)
                                    form.trigger([
                                      "publicSale",
                                      "teamAdvisors",
                                      "foundation",
                                      "ecosystemGrowth",
                                      "strategicPartners",
                                      "others",
                                    ])
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="ecosystemGrowth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Ecosystem Growth (%)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., 25"
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e)
                                    form.trigger([
                                      "publicSale",
                                      "teamAdvisors",
                                      "foundation",
                                      "ecosystemGrowth",
                                      "strategicPartners",
                                      "others",
                                    ])
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="strategicPartners"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Strategic Partners (%)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., 15"
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e)
                                    form.trigger([
                                      "publicSale",
                                      "teamAdvisors",
                                      "foundation",
                                      "ecosystemGrowth",
                                      "strategicPartners",
                                      "others",
                                    ])
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="others"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Others (%)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., 5"
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e)
                                    form.trigger([
                                      "publicSale",
                                      "teamAdvisors",
                                      "foundation",
                                      "ecosystemGrowth",
                                      "strategicPartners",
                                      "others",
                                    ])
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {!isValidTotal && <p className="mt-4 text-sm text-red-500">Total distribution must equal 100%</p>}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-between pt-6 mt-6 border-t border-gray-800">
                <a href="/startup-setup/roadMap" className="px-3 py-1.5 rounded-md bg-black hover:bg-gray-900 transition-all duration-200 border border-gray-800 text-white flex items-center gap-1"
                ><ArrowLeft className="h-4 w-4"/> Back </a>
                <Button
                  type="submit"
                  className="bg-black hover:bg-gray-900 text-white border border-gray-800"
                  disabled={isSubmitting || !isValidTotal}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                  {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

