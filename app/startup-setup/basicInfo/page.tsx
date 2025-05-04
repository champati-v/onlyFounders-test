"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowRight, Camera, Globe, Github, Twitter } from "lucide-react"
import { TbCancel } from "react-icons/tb"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@auth0/nextjs-auth0/client"
import { Progress } from "@/components/ui/progress"
import axios from "axios"

const basicInfoSchema = z.object({
  startupName: z.string().min(2, { message: "Startup name must be at least 2 characters" }),
  tagline: z
    .string()
    .min(2, { message: "Tagline is required" })
    .max(100, { message: "Tagline must be less than 100 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
  stage: z.string().min(1, { message: "Please select your startup stage" }),
  categories: z.string().min(1, { message: "Please select a category" }),
  blockchainPlatforms: z.array(z.string()).min(1, { message: "Please select at least one blockchain platform" }),
  website: z.string().url().min(1, { message: "Please enter a valid URL" }),
  twitter: z.string().min(1, { message: "Please enter a valid Twitter handle" }),
  github: z.string().url().min(1, { message: "Please enter a valid GitHub URL" }),
  telegram: z.string().min(1, { message: "Please enter a valid Telegram handle" }),
  discord: z.string().min(1, { message: "Please enter a valid Discord handle" }),
  medium: z.string().url().min(1, { message: "Please enter a valid Medium URL" }),
  whitepaper: z.string().url().min(1, { message: "Please enter a valid Whitepaper URL" }),
  pitchDeckFile: z.string().optional().or(z.literal("")),
  pitchDeckLink: z.string().url().min(1, { message: "Please enter a valid Pitch Deck URL" }),
  pitchDeckText: z.string().min(1, { message: "Please enter a description for the Pitch Deck" }),
  demoVideo: z.string().url().min(1, { message: "Please enter a valid Demo Video URL" }),
})

type BasicInfoValues = z.infer<typeof basicInfoSchema>

interface BasicInfoFormProps {
  data: any
  updateData?: (data: any) => void
  onNext: () => void
  userId: string
}

export default function BasicInfoForm({ data, updateData, onNext, userId }: BasicInfoFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [logoSrc, setLogoSrc] = useState<string>("/placeholder.svg?height=100&width=100")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [bannerSrc, setBannerSrc] = useState<string>("/placeholder.svg?height=300&width=800")
  const [bannerFile, setBannerFile] = useState<File | null>(null)

  const [whitepaperFile, setWhitepaperFile] = useState<File | null>(null)
  const [whitepaperName, setWhitepaperName] = useState<string>("")
  const [pitchDeckFile, setPitchDeckFile] = useState<File | null>(null)
  const [pitchDeckName, setPitchDeckName] = useState<string>("")
  const [demoVideoFile, setDemoVideoFile] = useState<File | null>(null)
  const [demoVideoName, setDemoVideoName] = useState<string>("")

  const [pitchDeckLink, setPitchDeckLink] = useState<string>("")
  const [pitchDeckText, setPitchDeckText] = useState<string>("")

  const [originalData, setOriginalData] = useState<any>(null)

  const [projectId, setProjectId] = useState<string>("")
  const { user } = useUser()
  const [customCategory, setCustomCategory] = useState<string>("")
  const [customBlockchains, setCustomBlockchains] = useState<string[]>([])
  const [newCustomBlockchain, setNewCustomBlockchain] = useState<string>("")

  // Define standard blockchain options
  const blockchains = [
    { id: "SOLANA", label: "SOLANA" },
    { id: "ETHEREUM", label: "ETHEREUM" },
    { id: "SKALE", label: "SKALE" },
    { id: "ICP", label: "ICP" },
    { id: "MEGA ETH", label: "MEGA ETH" },
    { id: "SOON", label: "SOON" },
    { id: "Abstract", label: "Abstract" },
    { id: "Bitcoin", label: "Bitcoin" },
    { id: "IoTeX", label: "IoTeX" },
    { id: "Multi-chain", label: "Multi-chain" },
    { id: "others", label: "Others" },
  ]

  // Get standard blockchain IDs for later comparison
  const standardBlockchainIds = blockchains.map((b) => b.id).filter((id) => id !== "others")

  const form = useForm<BasicInfoValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      startupName: data?.startupName || "",
      tagline: data?.tagline || "",
      description: data?.description || "",
      stage: data?.stage || "",
      categories: data?.categories?.[0] || "",
      blockchainPlatforms: data?.blockchainPlatforms || [],
      website: data?.website || "",
      twitter: data?.twitter || "",
      github: data?.github || "",
      telegram: data?.telegram || "",
      discord: data?.discord || "",
      medium: data?.medium || "",
      whitepaper: data?.whitepaper || "",
      pitchDeck: data?.pitchDeck || "",
      pitchDeckLink: data?.pitchDeckLink || "",
      pitchDeckText: data?.pitchDeckText || "",
      demoVideo: data?.demoVideo || "",
    },
  })

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

        console.log("The project id is", JSON.stringify({ projectId }))

        const response = await axios.post(
          "https://ofStaging.azurewebsites.net/api/startup/view-startup",
          requestBody, // ✅ Correct JSON format
          {
            headers: {
              "Content-Type": "application/json", // ✅ Correct header
              user_id: userId,
            },
          },
        )

        const data = response.data // ✅ Axios handles JSON parsing automatically

        if (data && data.startup) {
          const startup = data.startup
          console.log(startup.wpaperurl)
          // Extract social links
          const socialLinks = startup.socialLinks || {}

          // Set logo and banner if available
          if (startup.startupLogo?.file_url) {
            setLogoSrc(startup.startupLogo.file_url)
          }

          if (startup.bannerImage?.file_url) {
            setBannerSrc(startup.bannerImage.file_url)
          }

          // Process blockchain platforms to identify custom ones
          const blockchainPlatforms = startup.blockchainPlatforms || []
          const customPlatforms = blockchainPlatforms.filter(
            (platform: string) => !standardBlockchainIds.includes(platform),
          )

          // Set custom blockchains state
          setCustomBlockchains(customPlatforms)

          // Create updated platforms without "others" in the actual data
          const updatedPlatforms = blockchainPlatforms.filter((platform: string) => platform !== "others")

          // Set form values
          form.reset({
            startupName: startup.startupName || "",
            tagline: startup.tagline || "",
            description: startup.description || "",
            stage: startup.stage?.toLowerCase() || "",
            categories: Array.isArray(startup.category)
              ? startup.category[0]?.toLowerCase() || ""
              : startup.category
                ? startup.category.toLowerCase()
                : "",
            blockchainPlatforms: updatedPlatforms,
            website: socialLinks.website || socialLinks.Website || "",
            twitter: socialLinks.twitter || socialLinks.Twitter || "",
            github: socialLinks.github || socialLinks.Github || "",
            telegram: socialLinks.telegram || socialLinks.Telegram || "",
            discord: socialLinks.discord || socialLinks.Discord || "",
            medium: socialLinks.medium || socialLinks.Medium || "",
            whitepaper: startup.whitepaper_Url || "",
            pitchDeckFile: "",
            pitchDeckLink: startup.pitchDeck_Url || "",
            pitchDeckText: startup.pitchDeckText || "",
            demoVideo: startup.pitchDemoVideo_Url || "",
          })

          // Store original data for comparison on submit
          setOriginalData(startup)
        }
      } catch (error) {
        console.error("Error fetching startup data:", error)
        toast({
          title: "Error",
          description: "Failed to load startup data. Please refresh the page.",
          variant: "destructive",
        })
      }
    }

    fetchStartupData()
  }, [form, projectId]) // ✅ Ensured correct dependencies

  const handleSubmit = async (values: BasicInfoValues) => {
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

      // Check if form data has changed
      let hasChanges = false

      // Only perform comparison if we have original data
      if (originalData) {
        // Compare basic fields
        if (
          values.startupName !== originalData.startupName ||
          values.tagline !== originalData.tagline ||
          values.description !== originalData.description ||
          values.stage !== originalData.stage?.toLowerCase() ||
          // Compare other fields as needed
          values.website !== (originalData.socialLinks?.website || originalData.socialLinks?.Website || "") ||
          values.twitter !== (originalData.socialLinks?.twitter || originalData.socialLinks?.Twitter || "") ||
          values.github !== (originalData.socialLinks?.github || originalData.socialLinks?.Github || "") ||
          values.telegram !== (originalData.socialLinks?.telegram || originalData.socialLinks?.Telegram || "") ||
          values.discord !== (originalData.socialLinks?.discord || originalData.socialLinks?.Discord || "") ||
          values.medium !== (originalData.socialLinks?.medium || originalData.socialLinks?.Medium || "") ||
          values.whitepaper !== (originalData.whitepaper_Url || "") ||
          values.pitchDeckLink !== (originalData.pitchDeck_Url || "") ||
          values.pitchDeckText !== (originalData.pitchDeckText || "") ||
          values.demoVideo !== (originalData.pitchDemoVideo_Url || "")
        ) {
          hasChanges = true
        }

        // Compare arrays (categories and blockchainPlatforms)
        const originalCategories = Array.isArray(originalData.category)
          ? originalData.category.map((c: string) => c.toLowerCase())
          : originalData.category
            ? [originalData.category.toLowerCase()]
            : []

        if (
          values.categories !== (originalCategories[0] || "") ||
          JSON.stringify(values.blockchainPlatforms.sort()) !==
            JSON.stringify((originalData.blockchainPlatforms || []).sort())
        ) {
          hasChanges = true
        }
      } else {
        // If we don't have original data, assume changes were made
        hasChanges = true
      }

      // Check for file changes
      if (logoFile || bannerFile || whitepaperFile || pitchDeckFile || demoVideoFile) {
        hasChanges = true
      }

      // Update data in the parent component if updateData is provided
      if (typeof updateData === "function") {
        updateData({
          ...values,
          logoFile,
          bannerFile,
          whitepaperFile,
          pitchDeckFile,
          demoVideoFile,
        })
      }

      // Prepare form data for API submission
      const formData = new FormData()

      // If there are changes, use the new values; otherwise, use the original data
      const dataToSubmit = hasChanges ? values : originalData

      // Add all text fields
      formData.append("startupName", dataToSubmit.startupName)
      formData.append("tagline", dataToSubmit.tagline)
      formData.append("description", dataToSubmit.description)
      formData.append("stage", dataToSubmit.stage)

      // Add array fields
      const categoryToSubmit = hasChanges
        ? values.categories === "others"
          ? customCategory
          : values.categories
        : Array.isArray(originalData.category)
          ? originalData.category[0] || ""
          : originalData.category || ""

      formData.append("category", categoryToSubmit)

      const platformsToSubmit = hasChanges
        ? values.blockchainPlatforms.filter((platform) => platform !== "others")
        : originalData.blockchainPlatforms?.filter((platform: string) => platform !== "others") || []

      platformsToSubmit.forEach((platform: string, index: number) => {
        formData.append(`blockchainPlatforms[${index}]`, platform)
      })

      // Social links
      const socialLinks = hasChanges
        ? {
            website: values.website,
            twitter: values.twitter,
            github: values.github,
            telegram: values.telegram,
            discord: values.discord,
            medium: values.medium,
          }
        : originalData.socialLinks

      formData.append("socialLinks", JSON.stringify(socialLinks))

      // Add files only if they've been changed
      // Handle logo and banner images
      if (logoFile) {
        // If a new logo file is selected, append it
        formData.append("startupLogo", logoFile)
      } else if (originalData?.startupLogo?.file_url) {
        // If no new logo is selected but we have an original logo URL, preserve it
        formData.append("startupLogoUrl", originalData.startupLogo.file_url)
      }

      if (bannerFile) {
        // If a new banner file is selected, append it
        formData.append("bannerImage", bannerFile)
      } else if (originalData?.bannerImage?.file_url) {
        // If no new banner is selected but we have an original banner URL, preserve it
        formData.append("bannerImageUrl", originalData.bannerImage.file_url)
      }

      // Add whitepaper link
      formData.append("wpaperurl", hasChanges ? values.whitepaper : originalData.whitepaper_Url || "")

      // Add pitch deck fields
      if (pitchDeckFile) formData.append("pitchDeck", pitchDeckFile)
      formData.append("pitchDeck_Url", hasChanges ? values.pitchDeckLink : originalData.pitchDeck_Url || "")
      formData.append("pitchDeckText", hasChanges ? values.pitchDeckText : originalData.pitchDeckText || "")

      // Add demo video link
      formData.append("pitchDemoVideo", hasChanges ? values.demoVideo : originalData.pitchDemoVideo_Url || "")

      // Send data to API
      const response = await fetch("https://ofStaging.azurewebsites.net/api/startup/submit-basic-startup-details", {
        method: "POST",
        headers: {
          // Ensure user_id is inside headers correctly
          user_id: userId,
        },
        body: formData, // Do not set Content-Type manually for FormData
      })

      // if (!response.ok) {
      //   throw new Error(`API error: ${response.status}`)
      // }

      // Show success toast
      toast({
        title: "Success!",
        description: "Step 1 submitted successfully.",
      })

      // Route to next page
      router.push("/startup-setup/tractionMetrics")
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

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setLogoSrc(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBannerFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setBannerSrc(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleWhitepaperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setWhitepaperFile(file)
      setWhitepaperName(file.name)
    }
  }

  const handlePitchDeckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPitchDeckFile(file)
      setPitchDeckName(file.name)
    }
  }

  const handleDemoVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setDemoVideoFile(file)
      setDemoVideoName(file.name)
    }
  }

  const categories = [
    { id: "DeFi", label: "DeFi" },
    { id: "nft", label: "NFT" },
    { id: "depin", label: "DePIN" },
    { id: "desci", label: "DeSci" },
    { id: "desol", label: "DeSol" },
    { id: "socialfi", label: "SocialFi" },
    { id: "ai", label: "AI" },
    { id: "depain", label: "DePAIN" },
    { id: "rwa", label: "RWA" },
    { id: "infra", label: "Infra" },
    { id: "gamefi", label: "GameFi" },
    { id: "gamblefi", label: "GambleFi" },
    { id: "dex", label: "DEX" },
    { id: "did", label: "DID" },
    { id: "edufi", label: "EduFi" },
    { id: "infofi", label: "InfoFi" },
    { id: "others", label: "Others" },
  ]

  const stages = [
    { id: "Ideation", label: "Ideation (Friends & Family Funding)" },
    { id: "Prototype", label: "Prototype (Angel Funding)" },
    { id: "MVP", label: "MVP (Pre-Seed Funding)" },
    { id: "Public Beta", label: "Public Beta (Seed Funding)" },
  ]

  return (
    <div className="flex flex-col items-center justify-center mx-auto px-6 md:px-0 py-12">
      <h1 className="text-4xl text-center font-semibold">Welcome to OnlyFounders</h1>
      <p className="mt-1 text-center text-gray-500">Startup Creation Form</p>
      <div className="w-full max-w-4xl">
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Startup Setup</span>
            <span className="text-white font-medium">Step 1 of 5</span>
          </div>
          <Progress
            value={20}
            className="h-2 bg-gray-700"
            // indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-400"
          />
        </div>
        <div className="bg-gray-900 p-6 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="startupName"
                render={({ field }) => (
                  <FormItem>
                    <h1 className="text-start font-bold text-3xl text-white mb-6">Basic Information</h1>
                    <FormLabel className="text-md text-white">Startup Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your startup name"
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div>
                  <h3 className="text-white mb-2">Startup Logo</h3>
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative mb-2">
                      <Avatar className="h-24 w-24 border-2 border-gray-800">
                        <AvatarImage src={logoSrc || "/placeholder.svg"} alt="Logo" />
                        <AvatarFallback className="bg-gray-800 text-gray-400">Logo</AvatarFallback>
                      </Avatar>
                      <label
                        htmlFor="logo-upload"
                        className="absolute bottom-0 right-0 p-1 rounded-full bg-gray-800 border border-gray-700 cursor-pointer"
                      >
                        <Camera className="h-4 w-4 text-gray-400" />
                        <span className="sr-only">Upload logo</span>
                      </label>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoChange}
                      />
                    </div>
                    <p className="text-sm text-gray-400">Upload your startup logo (recommended: 400x400px)</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-white mb-2">Banner Image</h3>
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative mb-2 w-full">
                      <div className="aspect-[3/1] w-full overflow-hidden rounded-lg border-2 border-gray-800 bg-gray-800">
                        <img
                          src={bannerSrc || "/placeholder.svg"}
                          alt="Banner"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <label
                        htmlFor="banner-upload"
                        className="absolute bottom-2 right-2 p-2 rounded-full bg-gray-800 border border-gray-700 cursor-pointer"
                      >
                        <Camera className="h-4 w-4 text-gray-400" />
                        <span className="sr-only">Upload banner</span>
                      </label>
                      <input
                        id="banner-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBannerChange}
                      />
                    </div>
                    <p className="text-sm text-gray-400">Upload a banner image (recommended: 1200x400px)</p>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Tagline</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="A short, catchy description of your startup"
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">{field.value.length}/100 characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Detailed Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project, its mission, and vision in detail..."
                        className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">{field.value.length}/1000 characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Stage</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select your startup stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-gray-800 text-white">
                        {stages.map((stage) => (
                          <SelectItem key={stage.id} value={stage.id}>
                            {stage.label}
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
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-white">Categories</FormLabel>
                      <FormDescription className="text-gray-500">
                        Select a category that applies to your startup
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {categories.map((category) => (
                        <FormItem
                          key={category.id}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-800 p-3"
                        >
                          <FormControl>
                            <input
                              type="radio"
                              className="h-4 w-4 text-primary border-gray-700 bg-gray-800"
                              checked={field.value === category.id}
                              onChange={() => {
                                field.onChange(category.id)
                                if (category.id !== "others") {
                                  setCustomCategory("")
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal text-white">{category.label}</FormLabel>
                        </FormItem>
                      ))}
                    </div>
                    {field.value === "others" && (
                      <div className="mt-4">
                        <FormLabel className="text-white">Specify Category</FormLabel>
                        <Input
                          placeholder="Enter your category"
                          className="bg-gray-800 border-gray-700 text-white mt-1"
                          value={customCategory}
                          onChange={(e) => setCustomCategory(e.target.value)}
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="blockchainPlatforms"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-white">Blockchain Platforms</FormLabel>
                        <FormDescription className="text-gray-500">
                          Select all blockchain platforms your project is built on
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {blockchains.map((blockchain) => (
                          <FormField
                            key={blockchain.id}
                            control={form.control}
                            name="blockchainPlatforms"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={blockchain.id}
                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-800 p-3"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={
                                        blockchain.id === "others"
                                          ? customBlockchains.length > 0 || field.value?.includes("others")
                                          : field.value?.includes(blockchain.id)
                                      }
                                      onCheckedChange={(checked) => {
                                        if (blockchain.id === "others") {
                                          if (checked) {
                                            // If checking "Others", add it to the array and show the input
                                            field.onChange([...field.value, "others"])
                                          } else {
                                            // If unchecking "Others", remove all custom blockchains
                                            setCustomBlockchains([])
                                            const filteredValues = field.value?.filter(
                                              (value) => value !== "others" && !customBlockchains.includes(value),
                                            )
                                            field.onChange(filteredValues)
                                          }
                                        } else {
                                          return checked
                                            ? field.onChange([...field.value, blockchain.id])
                                            : field.onChange(field.value?.filter((value) => value !== blockchain.id))
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal text-white">{blockchain.label}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>

                      {/* Custom blockchain input section */}
                      {form.watch("blockchainPlatforms")?.includes("others") || customBlockchains.length > 0 ? (
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            {customBlockchains.map((blockchain, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Input
                                  value={blockchain}
                                  readOnly
                                  className="bg-gray-800 border-gray-700 text-white flex-1"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="border-gray-700 text-white h-10 w-10"
                                  onClick={() => {
                                    const newCustomBlockchains = [...customBlockchains]
                                    newCustomBlockchains.splice(index, 1)
                                    setCustomBlockchains(newCustomBlockchains)

                                    // Update the form value to completely remove the deleted blockchain
                                    const currentValues = form.getValues("blockchainPlatforms")
                                    const updatedValues = currentValues.filter((v) => v !== blockchain)
                                    form.setValue("blockchainPlatforms", updatedValues)

                                    // If no custom blockchains left, remove "others" from the selection
                                    if (newCustomBlockchains.length === 0) {
                                      form.setValue(
                                        "blockchainPlatforms",
                                        updatedValues.filter((v) => v !== "others"),
                                      )
                                    }
                                  }}
                                >
                                  <TbCancel className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center gap-2">
                            <Input
                              placeholder="Enter blockchain platform"
                              className="bg-gray-800 border-gray-700 text-white flex-1"
                              value={newCustomBlockchain}
                              onChange={(e) => setNewCustomBlockchain(e.target.value)}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              className="border-gray-700 text-white"
                              onClick={() => {
                                if (newCustomBlockchain.trim()) {
                                  // Add to custom blockchains
                                  setCustomBlockchains([...customBlockchains, newCustomBlockchain])

                                  // Add to form values - don't add "others" to the actual values array
                                  const currentValues = form.getValues("blockchainPlatforms")
                                  if (!currentValues.includes("others")) {
                                    // Just set the "others" flag in the UI, but don't include it in the values
                                    form.setValue("blockchainPlatforms", [...currentValues, "others"])
                                  }
                                  // Add only the custom blockchain, not "others"
                                  form.setValue("blockchainPlatforms", [
                                    ...currentValues.filter((value) => value !== "others"),
                                    newCustomBlockchain,
                                  ])

                                  // Clear input
                                  setNewCustomBlockchain("")
                                }
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      ) : null}

                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Links & Resources</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Website</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                              placeholder="https://yourwebsite.com"
                              className="bg-gray-800 border-gray-700 text-white pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Twitter</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                              placeholder="@username"
                              className="bg-gray-800 border-gray-700 text-white pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="github"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">GitHub</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                              placeholder="github.com/organization"
                              className="bg-gray-800 border-gray-700 text-white pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telegram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Telegram</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="t.me/yourchannel"
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
                    name="discord"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Discord</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="discord.gg/yourchannel"
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
                    name="medium"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Medium</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="medium.com/@yourusername"
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
                    name="whitepaper"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Whitepaper</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://yourwebsite.com/whitepaper"
                            className="bg-gray-800 border-gray-700 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">Enter the link to your whitepaper</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pitchDeck"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Pitch Deck (PDF)</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              accept=".pdf"
                              id="pitchdeck-upload"
                              className="hidden"
                              onChange={handlePitchDeckChange}
                            />
                            <div className="flex-1 bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
                              <div className="flex items-centerrounded-md overflow-hidden">
                                <Input
                                  readOnly
                                  placeholder="Upload pitch deck (PDF)"
                                  value={pitchDeckName}
                                  className="bg-gray-800 border-0 text-white"
                                />
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              className="border-gray-700 text-white"
                              onClick={() => document.getElementById("pitchdeck-upload")?.click()}
                            >
                              Browse
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pitchDeckLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Pitch Deck Link</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://yourwebsite.com/pitchdeck"
                            className="bg-gray-800 border-gray-700 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">Enter the link to your pitch deck</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pitchDeckText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Pitch Deck Text</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter additional information about your pitch deck..."
                            className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="demoVideo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Demo Video Link</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://youtube.com/your-video or https://vimeo.com/your-video"
                            className="bg-gray-800 border-gray-700 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">Enter the link to your demo video</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <a
                  href="/marketplace"
                  className="px-3 py-1.5 rounded-md bg-black hover:bg-gray-900 transition-all duration-200 border border-gray-800 text-white flex items-center gap-1"
                >
                  Cancel <TbCancel className="h-4 w-4" />
                </a>
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