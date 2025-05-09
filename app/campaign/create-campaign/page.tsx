"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import {
  CalendarIcon,
  Trash2,
  Upload,
  Plus,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  Edit,
  Link,
  Camera,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useUser } from "@auth0/nextjs-auth0/client"
import { toast } from "@/components/ui/use-toast"
import { useAccount } from "wagmi"

// Define types for startup data
interface StartupData {
  _id: string
  user_id: string
  startupName: string
  startupLogo: {
    file_name: string
    file_url: string
    _id: string
  }
  bannerImage: {
    file_name: string
    file_url: string
    _id: string
  }
  tagline: string
  description: string
  stage: string
  blockchainPlatforms: string[]
  socialLinks: {
    website: string
    twitter: string
    github: string
    telegram: string
    discord?: string
    medium?: string
  }
  whitepaper?: {
    file_name: string
    file_url: string
    _id: string
  }
  pitchDeck?: {
    file_name: string
    file_url: string
    _id: string
  }
  pitchDemoVideo?: {
    file_name: string
    file_url: string
    _id: string
  }
  category: string
  tokenomics?: {
    tokenName: string
    symbol: string
    totalSupply: number
    tokenType: string
    initialPrice: number
    useCases: string[]
    tokenDistribution: {
      publicSale: number
      teamAdvisors: number
      foundation: number
      ecosystemGrowth: number
      strategicPartners: number
      others: number
      _id: string
    }
    _id: string
  }
}

// Define FAQ type
interface FAQ {
  id: string
  question: string
  answer: string
}

// Define Requirement type
interface Requirement {
  _id?: string
  id?: string
  name: string
  description: string
  status: "incomplete" | "complete"
}

// Define Milestone type
interface Milestone {
  _id?: string
  milestoneId: string
  name: string
  fundPercentage: number
  description: string
  requirements: Requirement[]
  verificationProof: string
  milestoneStatus: "incomplete" | "complete"
  isExpanded?: boolean
  isPredefined?: boolean
}

// Define form schemas for each step
const step1Schema = z.object({
  startupName: z.string().min(1, "Startup name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  category: z.string().min(1, "Category is required"),
  startupStage: z.string().min(1, "Startup stage is required"),
  logo: z.string().min(1, "Logo is required"),
  banner: z.string().min(1, "Banner is required"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  github: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  discord: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  medium: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  telegram: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  whitepaper: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  pitchDeck: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  pitchDemoVideo: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
})

const step2Schema = z.object({
  fundraisingTarget: z.string().min(1, "Fundraising target is required"),
  fundraisingWallet: z.string().min(1, "Fundraising wallet is required"),
  acceptedCurrencyType: z.string().min(1, "Currency type is required"),
  fullyDilutedValuation: z.string().min(1, "Fully diluted valuation is required"),
  initialMarketCap: z.string().min(1, "Initial market cap is required"),
  vestingSummary: z.string().min(1, "Vesting summary is required"),
  fundingDeadline: z.date({
    required_error: "Funding deadline is required",
  }),
  headerImage: z.string().min(1, "Header image is required"),
  dealName: z.string().min(1, "Deal name is required"),
  dealRound: z.string().min(1, "Deal round is required"),
  tokenPrice: z.string().min(1, "Token price is required"),
})

const step3Schema = z.object({
  faqs: z
    .array(
      z.object({
        id: z.string(),
        question: z.string().min(1, "Question is required"),
        answer: z.string().min(1, "Answer is required"),
      }),
    )
    .min(1, "At least one FAQ is required")
    .max(5, "Maximum 5 FAQs allowed"),
})

const requirementSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  name: z.string().min(1, "Requirement name is required"),
  description: z.string().min(1, "Requirement description is required"),
  status: z.enum(["incomplete", "complete"]),
})

const milestoneSchema = z.object({
  _id: z.string().optional(),
  milestoneId: z.string(),
  name: z.string().min(1, "Milestone name is required"),
  // fundPercentage: z.number().min(0, "Fund percentage must be at least 0").max(100, "Fund percentage cannot exceed 100"),
  description: z.string().min(1, "Description is required"),
  requirements: z.array(requirementSchema).min(1, "At least one requirement is needed"),
  // verificationProof: z.string().url("Please enter a valid URL").or(z.literal("")),
  milestoneStatus: z.enum(["incomplete", "complete"]),
  isExpanded: z.boolean().optional(),
  isPredefined: z.boolean().optional(),
})

const step4Schema = z.object({
  milestones: z.array(milestoneSchema),
  userMilestones: z.array(milestoneSchema),
})

// Combine all schemas
const formSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
})

export default function CreateCampaignPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [startupData, setStartupData] = useState<StartupData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [faqs, setFaqs] = useState<FAQ[]>([{ id: "1", question: "", answer: "" }])
  const [faqErrors, setFaqErrors] = useState<{
    [key: string]: { question?: string; answer?: string }
  } | null>(null)

  // Milestone states
  const [predefinedMilestones, setPredefinedMilestones] = useState<Milestone[]>([])
  const [userMilestones, setUserMilestones] = useState<Milestone[]>([])
  const [isFetchingMilestones, setIsFetchingMilestones] = useState(false)
  const [milestoneErrors, setMilestoneErrors] = useState<{
    [key: string]: { [field: string]: string }
  } | null>(null)
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null)
  const [editingMilestone, setEditingMilestone] = useState<string | null>(null)

  // API integration states
  const [projectId, setProjectId] = useState<string | null>(null)
  const [campaignId, setCampaignId] = useState<string | null>(null)
  const { user } = useUser()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [bannerSrc, setBannerSrc] = useState<string>("/placeholder.svg?height=300&width=1000")
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [defaultBannerFile, setDefaultBannerFile] = useState<File | null>(null)
  const [headerSrc, setHeaderSrc] = useState<string>("/placeholder.svg?height=300&width=1000")
  const [headerFile, setHeaderFile] = useState<File | null>(null)
  const [hasCreatedCampaign, setHasCreatedCampaign] = useState(false)
  const {address} = useAccount()

  // Initialize form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(
      currentStep === 1 ? step1Schema : currentStep === 2 ? step2Schema : currentStep === 3 ? step3Schema : step4Schema,
    ),
    defaultValues: {
      startupName: "",
      tagline: "",
      category: "",
      startupStage: "",
      logo: "",
      banner: "",
      website: "",
      twitter: "",
      github: "",
      discord: "",
      medium: "",
      telegram: "",
      whitepaper: "",
      pitchDeck: "",
      pitchDemoVideo: "",
      fundraisingTarget: "",
      fundraisingWallet: "",
      acceptedCurrencyType: "",
      fullyDilutedValuation: "",
      initialMarketCap: "",
      vestingSummary: "",
      headerImage: "",
      dealName: "",
      dealRound: "",
      tokenPrice: "",
      faqs: [{ id: "1", question: "", answer: "" }],
      milestones: [],
      userMilestones: [],
    },
  })

  // Fetch project ID
  useEffect(() => {
    const fetchProjectId = async () => {
      try {
        if (!user) return // Wait until user is fully loaded
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

        const response = await fetch("https://ofStaging.azurewebsites.net/api/startup/get-projectId", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            user_id: userId || "",
          },
        })

        if (response.ok) {
          const data = await response.json()
          setProjectId(data.projectId)
        } else {
          console.error("Failed to fetch project ID")
        }
      } catch (error) {
        console.error("Error fetching project ID:", error)
      }
    }

    if (user) {
      fetchProjectId()
    }
  }, [user])

  // 2. Add a function to fetch the image file from a URL
  const fetchImageAsFile = async (url: string, fileName: string): Promise<File | null> => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        console.error("Failed to fetch image:", response.statusText)
        return null
      }

      const blob = await response.blob()
      // Create a File object from the blob
      return new File([blob], fileName, { type: blob.type })
    } catch (error) {
      console.error("Error fetching image as file:", error)
      return null
    }
  }

  // Fetch startup data from API
  useEffect(() => {
    const fetchStartupData = async () => {
      setIsLoading(true)
      try {
        if (!projectId) return
        if (!user) return // Wait until user is fully loaded
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

        const response = await fetch("https://ofStaging.azurewebsites.net/api/startup/view-startup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            user_id: userId || "",
          },
          body: JSON.stringify({ projectId }),
        })

        if (response.ok) {
          const data = await response.json()
          const startup = data.startup as StartupData
          setStartupData(startup)

          // Pre-fill form with startup data
          form.setValue("startupName", startup.startupName)
          form.setValue("tagline", startup.tagline)
          form.setValue("category", startup.category)
          form.setValue("startupStage", startup.stage)
          form.setValue("logo", startup.startupLogo.file_url)
          form.setValue("banner", startup.bannerImage.file_url)
          form.setValue("website", startup.socialLinks.website || "")
          form.setValue("twitter", startup.socialLinks.twitter || "")
          form.setValue("github", startup.socialLinks.github || "")
          form.setValue("discord", startup.socialLinks.discord || "")
          form.setValue("medium", startup.socialLinks.medium || "")
          form.setValue("telegram", startup.socialLinks.telegram || "")
          form.setValue("whitepaper", startup.whitepaper_Url || "")
          form.setValue("pitchDeck", startup.pitchDeck_Url || "")
          form.setValue("pitchDemoVideo", startup.pitchDemoVideo_Url || "")
          form.setValue("tokenPrice", startup.tokenomics?.initialPrice.toString() || "")
          form.setValue("headerImage", startup.bannerImage.file_url)

          // Set default fundraising wallet (this would typically come from the user's wallet)
          form.setValue("fundraisingWallet", address || "0x123hsokf3o45odinfv")

          if (startup.bannerImage.file_url) {
            setBannerSrc(startup.bannerImage.file_url)
            setHeaderSrc(startup.bannerImage.file_url)

            // Fetch the banner image as a file
            const fileName = startup.bannerImage.file_name || "banner.jpg"
            const bannerFile = await fetchImageAsFile(startup.bannerImage.file_url, fileName)
            if (bannerFile) {
              setDefaultBannerFile(bannerFile)
            }
          }

        } else {
          console.error("Failed to fetch startup data")
        }
      } catch (error) {
        console.error("Error fetching startup data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (projectId) {
      fetchStartupData()
    }
  }, [form, projectId])

  // Fetch predefined milestones when reaching step 4
  useEffect(() => {
    if (currentStep === 4 && campaignId && predefinedMilestones.length === 0) {
      fetchPredefinedMilestones()
    }
  }, [currentStep, campaignId, predefinedMilestones.length])

  // Fetch predefined milestones from API
  const fetchPredefinedMilestones = async () => {
    if (!campaignId) return

    setIsFetchingMilestones(true)
    try {
      const response = await fetch("https://ofStaging.azurewebsites.net/api/startup/fetch-predefined-milestones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          user_id: user?.sub?.substring(14) || "",
        },
        body: JSON.stringify({
          campaign_id: campaignId,
        }),
      })

      if (response.ok) {
        const data = await response.json()

        if (data.predefinedMilestones) {
          // Add isExpanded and isPredefined properties
          const milestones = data.predefinedMilestones.map((milestone: Milestone) => ({
            ...milestone,
            isExpanded: false,
            isPredefined: true,
          }))

          setPredefinedMilestones(milestones)
          form.setValue("milestones", milestones)
        }
      } else {
        console.error("Failed to fetch predefined milestones")
        toast({
          title: "Error",
          description: "Failed to fetch predefined milestones.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching predefined milestones:", error)
      toast({
        title: "Error",
        description: "An error occurred while fetching predefined milestones.",
        variant: "destructive",
      })
    } finally {
      setIsFetchingMilestones(false)
    }
  }

  // Add a handler for banner image change
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Save file for upload
      setBannerFile(file)

      // Preview image
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setBannerSrc(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFundingHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Save file for upload
      setHeaderFile(file)

      // Preview image
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setHeaderSrc(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Validate FAQs
  const validateFaqs = () => {
    const errors: { [key: string]: { question?: string; answer?: string } } = {}
    let hasErrors = false

    faqs.forEach((faq) => {
      const faqError: { question?: string; answer?: string } = {}

      if (!faq.question.trim()) {
        faqError.question = "Question is required"
        hasErrors = true
      }

      if (!faq.answer.trim()) {
        faqError.answer = "Answer is required"
        hasErrors = true
      }

      if (Object.keys(faqError).length > 0) {
        errors[faq.id] = faqError
      }
    })

    setFaqErrors(hasErrors ? errors : null)
    return !hasErrors
  }

  // Validate milestones
  const validateMilestones = () => {
    const errors: { [key: string]: { [field: string]: string } } = {}
    let hasErrors = false

    // Only validate user milestones since predefined ones are already validated
    userMilestones.forEach((milestone) => {
      const milestoneError: { [field: string]: string } = {}

      if (!milestone.name.trim()) {
        milestoneError.name = "Milestone name is required"
        hasErrors = true
      }

      if (milestone.fundPercentage < 0 || milestone.fundPercentage > 100) {
        milestoneError.fundPercentage = "Fund percentage must be between 0 and 100"
        hasErrors = true
      }

      if (!milestone.description.trim()) {
        milestoneError.description = "Description is required"
        hasErrors = true
      }

      if (milestone.requirements.length === 0) {
        milestoneError.requirements = "At least one requirement is needed"
        hasErrors = true
      } else {
        milestone.requirements.forEach((req, index) => {
          if (!req.name.trim()) {
            milestoneError[`requirement_${index}_name`] = "Requirement name is required"
            hasErrors = true
          }

          if (!req.description.trim()) {
            milestoneError[`requirement_${index}_description`] = "Requirement description is required"
            hasErrors = true
          }
        })
      }

      if (Object.keys(milestoneError).length > 0) {
        errors[milestone.milestoneId] = milestoneError
      }
    })

    setMilestoneErrors(hasErrors ? errors : null)
    return !hasErrors
  }

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!user) {
        toast({
          title: "Authentication error",
          description: "Please sign in to continue.",
          variant: "destructive",
        })
        router.push("/api/auth/login")
        return
      }

      const userId = user.sub?.substring(14)

      // 1. First, modify the onSubmit function to properly handle the banner file upload
      // Find the section in onSubmit for Step 1 and update it to include the uploaded banner file

      // In the onSubmit function, replace the existing Step 1 submission code with this:
      if (currentStep === 1) {
        // Step 1: Submit basic campaign details
        try {
          if (!user) return
          const userId = user?.sub?.substring(14)

          setSubmitLoading(true)

          if (!userId) {
            toast({
              title: "Authentication error",
              description: "Please sign in again to continue.",
              variant: "destructive",
            })
            router.push("/api/auth/login")
            return
          }

          // If we already have a campaignId, don't create a new one
          // if (hasCreatedCampaign && campaignId) {
          //   setCurrentStep(currentStep + 1)
          //   return
          // }

          // Create FormData to properly handle file uploads
          const formData = new FormData()
          formData.append("campaignOverview", "Campaign")
          formData.append("stage", form.getValues("startupStage") || startupData?.stage || "")

          if (campaignId) {
            formData.append("campaign_id", campaignId)
          }

          // Add the banner file if it exists
          if (bannerFile) {
            formData.append("bannerImage", bannerFile)
          }

          const response = await fetch(
            "https://ofStaging.azurewebsites.net/api/startup/submit-basic-campaign-details",
            {
              method: "POST",
              headers: {
                user_id: userId || "",
              },
              body: formData,
            },
          )

          if (response.ok) {
            const data = await response.json()
            // if (!campaignId && data.campaign_id) {
            //   setCampaignId(data.campaign_id)
            // }

            if(hasCreatedCampaign){
              setCampaignId(campaignId)
            }else{
              setCampaignId(data.campaign_id)
            }

            setHasCreatedCampaign(true) // Mark that we've created a campaign
            setCurrentStep(currentStep + 1)
          } else {
            toast({
              title: "Error",
              description: "Failed to submit basic campaign details. Please try again.",
              variant: "destructive",
            })
          }
        } catch (error) {
          console.error("Error submitting form:", error)
          toast({
            title: "Error",
            description: "An unexpected error occurred. Please try again.",
            variant: "destructive",
          })
        }
        setSubmitLoading(false)
        return
      }

      if (currentStep === 2) {
        // Step 2: Submit campaign financial details
        if (!campaignId) {
          toast({
            title: "Error",
            description: "Campaign ID is missing. Please go back to step 1.",
            variant: "destructive",
          })
          return
        }

        setSubmitLoading(true)

        const formData = new FormData()
        formData.append("campaign_id", campaignId)
        formData.append("fundingTarget", values.fundraisingTarget)
        formData.append("fundraisingWallet", values.fundraisingWallet)
        formData.append("acceptedCurrencyType", values.acceptedCurrencyType)
        formData.append("fullyDilutedValuation", values.fullyDilutedValuation)
        formData.append("initialMarketCap", values.initialMarketCap)
        formData.append("vestingSummary", values.vestingSummary)
        formData.append("deadline", values.fundingDeadline.toISOString())
        formData.append("dealName", values.dealName)
        formData.append("dealRound", values.dealRound)

        if(headerFile) {
          formData.append("fundingHeaderImage", headerFile)
        }

        const response = await fetch(
          "https://ofStaging.azurewebsites.net/api/startup/submit-campaign-financial-details",
          {
            method: "POST",
            headers: {
              user_id: userId || "",
            },
            body: formData,
          },
        )

        if (response.ok) {
          setCurrentStep(currentStep + 1)
        } else {
          toast({
            title: "Error",
            description: "Failed to submit financial details. Please try again.",
            variant: "destructive",
          })
        }
        setSubmitLoading(false)
        return
      }

      if (currentStep === 3) {
        // Validate FAQs before submission
        if (!validateFaqs()) {
          return
        }

        setSubmitLoading(true)

        // Update the form values with the current FAQs
        form.setValue("faqs", faqs)

        if (!campaignId) {
          toast({
            title: "Error",
            description: "Campaign ID is missing. Please go back to step 1.",
            variant: "destructive",
          })
          return
        }

        // Step 3: Submit FAQs
        const formattedFaqs = faqs.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))

        const response = await fetch("https://ofStaging.azurewebsites.net/api/startup/add-faqs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            user_id: userId || "",
          },
          body: JSON.stringify({
            campaign_id: campaignId,
            faqs: formattedFaqs,
          }),
        })

        if (response.ok) {
          setCurrentStep(currentStep + 1)
        } else {
          toast({
            title: "Error",
            description: "Failed to submit FAQs. Please try again.",
            variant: "destructive",
          })
        }
        setSubmitLoading(false)
        return
      }

      if (currentStep === 4) {
        // Validate user milestones before final submission
        if (!validateMilestones()) {
          return
        }

        setSubmitLoading(true)
        // Update the form values with the current milestones
        form.setValue("userMilestones", userMilestones)

        if (!campaignId) {
          toast({
            title: "Error",
            description: "Campaign ID is missing. Please go back to step 1.",
            variant: "destructive",
          })
          return
        }

        // Step 4: Submit milestones
        const response = await fetch("https://ofStaging.azurewebsites.net/api/startup/submit-milestones", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            user_id: userId || "",
          },
          body: JSON.stringify({
            campaign_id: campaignId,
            userMilestones: userMilestones,
          }),
        })

        if (response.status === 200) {
          toast({
            title: "Success",
            description: "Campaign created successfully!",
          })
          router.push('/campaign/campaigns')
        } else {
          toast({
            title: "Error",
            description: "Failed to submit milestones. Please try again.",
            variant: "destructive",
          })
        }
        setSubmitLoading(false)
        return
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle adding a new FAQ
  const addFaq = () => {
    if (faqs.length < 5) {
      const newFaqs = [...faqs, { id: `${Date.now()}`, question: "", answer: "" }]
      setFaqs(newFaqs)
      form.setValue("faqs", newFaqs)
    }
  }

  // Handle removing an FAQ
  const removeFaq = (id: string) => {
    if (faqs.length > 1) {
      const newFaqs = faqs.filter((faq) => faq.id !== id)
      setFaqs(newFaqs)
      form.setValue("faqs", newFaqs)

      // Remove errors for the deleted FAQ
      if (faqErrors && faqErrors[id]) {
        const newErrors = { ...faqErrors }
        delete newErrors[id]
        setFaqErrors(Object.keys(newErrors).length > 0 ? newErrors : null)
      }
    }
  }

  // Update form values when FAQs change
  const updateFaq = (id: string, field: "question" | "answer", value: string) => {
    const updatedFaqs = faqs.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq))
    setFaqs(updatedFaqs)
    form.setValue("faqs", updatedFaqs)

    // Clear error for this field if it exists
    if (faqErrors && faqErrors[id] && faqErrors[id][field]) {
      const newErrors = { ...faqErrors }
      delete newErrors[id][field]

      if (Object.keys(newErrors[id]).length === 0) {
        delete newErrors[id]
      }

      setFaqErrors(Object.keys(newErrors).length > 0 ? newErrors : null)
    }
  }

  // Handle adding a new milestone
  const addMilestone = () => {
    const newMilestone: Milestone = {
      milestoneId: `user_${Date.now()}`,
      name: "",
      fundPercentage: 0,
      description: "",
      requirements: [
        {
          id: `req_${Date.now()}`,
          name: "",
          description: "",
          status: "incomplete",
        },
      ],
      verificationProof: "",
      milestoneStatus: "incomplete",
      isExpanded: true,
      isPredefined: false,
    }

    setUserMilestones([...userMilestones, newMilestone])
    form.setValue("userMilestones", [...userMilestones, newMilestone])
    setEditingMilestone(newMilestone.milestoneId)
  }

  // Handle removing a milestone
  const removeMilestone = (milestoneId: string) => {
    const newMilestones = userMilestones.filter((m) => m.milestoneId !== milestoneId)
    setUserMilestones(newMilestones)
    form.setValue("userMilestones", newMilestones)

    // Remove errors for the deleted milestone
    if (milestoneErrors && milestoneErrors[milestoneId]) {
      const newErrors = { ...milestoneErrors }
      delete newErrors[milestoneId]
      setMilestoneErrors(Object.keys(newErrors).length > 0 ? newErrors : null)
    }

    if (editingMilestone === milestoneId) {
      setEditingMilestone(null)
    }
  }

  // Handle adding a requirement to a milestone
  const addRequirement = (milestoneId: string) => {
    const updatedMilestones = userMilestones.map((milestone) => {
      if (milestone.milestoneId === milestoneId) {
        return {
          ...milestone,
          requirements: [
            ...milestone.requirements,
            {
              id: `req_${Date.now()}`,
              name: "",
              description: "",
              status: "incomplete",
            },
          ],
        }
      }
      return milestone
    })

    setUserMilestones(updatedMilestones)
    form.setValue("userMilestones", updatedMilestones)
  }

  // Handle removing a requirement from a milestone
  const removeRequirement = (milestoneId: string, reqId: string) => {
    const milestone = userMilestones.find((m) => m.milestoneId === milestoneId)

    if (milestone && milestone.requirements.length > 1) {
      const updatedMilestones = userMilestones.map((m) => {
        if (m.milestoneId === milestoneId) {
          return {
            ...m,
            requirements: m.requirements.filter((r) => (r.id || r._id) !== reqId),
          }
        }
        return m
      })

      setUserMilestones(updatedMilestones)
      form.setValue("userMilestones", updatedMilestones)
    }
  }

  // Update milestone field
  const updateMilestoneField = (milestoneId: string, field: string, value: any) => {
    const updatedMilestones = userMilestones.map((milestone) => {
      if (milestone.milestoneId === milestoneId) {
        return {
          ...milestone,
          [field]: value,
        }
      }
      return milestone
    })

    setUserMilestones(updatedMilestones)
    form.setValue("userMilestones", updatedMilestones)

    // Clear error for this field if it exists
    const fieldKey = `${field}`
    if (milestoneErrors && milestoneErrors[milestoneId] && milestoneErrors[milestoneId][fieldKey]) {
      const newErrors = { ...milestoneErrors }
      delete newErrors[milestoneId][fieldKey]

      if (Object.keys(newErrors[milestoneId]).length === 0) {
        delete newErrors[milestoneId]
      }

      setMilestoneErrors(Object.keys(newErrors).length > 0 ? newErrors : null)
    }
  }

  // Update requirement field
  const updateRequirementField = (milestoneId: string, reqId: string, field: string, value: any) => {
    const updatedMilestones = userMilestones.map((milestone) => {
      if (milestone.milestoneId === milestoneId) {
        const updatedRequirements = milestone.requirements.map((req) => {
          if ((req.id || req._id) === reqId) {
            return {
              ...req,
              [field]: value,
            }
          }
          return req
        })

        return {
          ...milestone,
          requirements: updatedRequirements,
        }
      }
      return milestone
    })

    setUserMilestones(updatedMilestones)
    form.setValue("userMilestones", updatedMilestones)

    // Clear error for this field if it exists
    const fieldKey = `requirement_${reqId}_${field}`
    if (milestoneErrors && milestoneErrors[milestoneId] && milestoneErrors[milestoneId][fieldKey]) {
      const newErrors = { ...milestoneErrors }
      delete newErrors[milestoneId][fieldKey]

      if (Object.keys(newErrors[milestoneId]).length === 0) {
        delete newErrors[milestoneId]
      }

      setMilestoneErrors(Object.keys(newErrors).length > 0 ? newErrors : null)
    }
  }

  // Toggle milestone expansion
  const toggleMilestoneExpansion = (milestoneId: string) => {
    if (expandedMilestone === milestoneId) {
      setExpandedMilestone(null)
    } else {
      setExpandedMilestone(milestoneId)
    }
  }

  // Toggle milestone editing
  const toggleMilestoneEditing = (milestoneId: string) => {
    if (editingMilestone === milestoneId) {
      setEditingMilestone(null)
    } else {
      setEditingMilestone(milestoneId)
    }
  }

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <p className="text-lg">Loading...</p>
  //     </div>
  //   )
  // }
  if(!user) {
    router.push("/api/auth/login")
  }

  return (
    <div className="min-h-screen bg-[#0a0b14] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-left font-bold mb-1">Create New Campaign</h1>
          <Button onClick={() => router.push("/campaign/campaigns")} className="bg-[#4361ff] hover:bg-[#4361ff]/90 text-white py-2 px-4 rounded-md font-medium" >Back</Button>
        </div>
        <p className="text-gray-400 md:text-left mb-6">
          {currentStep === 1
            ? "Enter basic information about your campaign"
            : currentStep === 2
              ? "Add media and external links"
              : currentStep === 3
                ? "Set funding goals and timeline"
                : "Define milestones for your campaign"}
        </p>

        {/* Step indicators */}
        <div className="flex items-center justify-center md:justify-start mb-8">
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center ${
              currentStep >= 1 ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            1
          </div>
          <div className={`h-1 w-12 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-700"}`}></div>
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center ${
              currentStep >= 2 ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            2
          </div>
          <div className={`h-1 w-12 ${currentStep >= 3 ? "bg-blue-600" : "bg-gray-700"}`}></div>
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center ${
              currentStep >= 3 ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            3
          </div>
          <div className={`h-1 w-12 ${currentStep >= 4 ? "bg-blue-600" : "bg-gray-700"}`}></div>
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center ${
              currentStep >= 4 ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            4
          </div>
          <div className="hidden md:block ml-auto">Step {currentStep} of 4</div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <>
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Campaign Overview</h2>

                  <FormField
                    control={form.control}
                    name="startupName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startup Name (Fetched from Startup page)</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-[#1a1b2e] border-[#2e2f45] text-white" disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tagline (Fetched from Startup page)</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-[#1a1b2e] border-[#2e2f45] text-white" disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category (Fetched from Startup page)</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-[#1a1b2e] border-[#2e2f45] text-white" disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startupStage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startup Stage (Fetched from Startup page - can be edited)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                              <SelectValue placeholder="Select startup stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                            <SelectItem value="Ideation">Ideation</SelectItem>
                            <SelectItem value="Prototype">Prototype</SelectItem>
                            <SelectItem value="MVP">MVP</SelectItem>
                            <SelectItem value="Public Beta">Public Beta</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <h2 className="text-xl font-semibold pt-4">Media & Branding</h2>

                  {/* 2. Modify the FormField for logo to add upload functionality */}
                  {/* Replace the existing logo FormField with this updated version */}
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startup Logo (Fetched from Startup page)</FormLabel>
                        <FormControl>
                          <div className="border border-dashed border-[#2e2f45] rounded-md p-6 flex flex-col items-center justify-center bg-[#1a1b2e]">
                            <div className="relative w-full">
                              <img
                                src={logoPreview || field.value || "/placeholder.svg" || "/placeholder.svg"}
                                alt="Logo"
                                className="mx-auto h-20 w-20 object-contain"
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 3. Modify the FormField for banner to add upload functionality */}
                  {/* Replace the existing banner FormField with this updated version */}
                  <FormField
                    control={form.control}
                    name="banner"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Startup Banner (Fetched from Startup page)</FormLabel>
                        <FormControl>
                          <div className="border border-dashed border-[#2e2f45] rounded-md p-6 flex flex-col items-center justify-center bg-[#1a1b2e]">
                            {value || bannerSrc ? (
                              <div className="relative w-full h-32 bg-gray-800 rounded-lg overflow-hidden mb-2">
                                <img
                                  src={bannerSrc || "/placeholder.svg"}
                                  alt="Banner"
                                  className="w-full h-full object-cover"
                                />
                                <label
                                  htmlFor="banner-upload"
                                  className="absolute bottom-2 right-2 p-1 rounded-full bg-gray-800 border border-gray-700 cursor-pointer"
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
                            ) : (
                              <div className="flex flex-col items-center justify-center text-gray-400">
                                <p>Banner image will be loaded from your startup profile</p>
                                <p className="text-xs mt-1">Click upload to change your banner</p>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <h2 className="text-xl font-semibold pt-4">URLs</h2>

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://yourproject.com"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
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
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://twitter.com/yourproject"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
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
                        <FormLabel>GitHub</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://github.com/yourproject"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
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
                        <FormLabel>Discord</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://discord.gg/yourproject"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
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
                        <FormLabel>Medium</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://medium.com/yourproject"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
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
                        <FormLabel>Telegram</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://t.me/yourproject"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
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
                        <FormLabel>Whitepaper</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://yourproject.com/whitepaper.pdf"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pitchDeck"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pitch Deck</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://yourproject.com/pitch-deck.pdf"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pitchDemoVideo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pitch Demo Video</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://youtube.com/watch?v=yourproject"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {/* Step 2: Funding Details */}
            {currentStep === 2 && (
              <>
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Funding Details</h2>

                  <FormField
                    control={form.control}
                    name="fundraisingTarget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fundraising Target</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="100000"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fundraisingWallet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fundraising Wallet (immutable)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="0x..."
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="acceptedCurrencyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accepted Currency Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                            <SelectItem value="usdc">USDC</SelectItem>
                            <SelectItem value="usdt">USDT</SelectItem>
                            <SelectItem value="eth">ETH</SelectItem>
                            <SelectItem value="bnb">BNB</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullyDilutedValuation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fully Diluted Valuation ($)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="1000000"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="initialMarketCap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Initial Market Cap ($)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="500000"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vestingSummary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vesting Summary</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Describe the vesting schedule for tokens"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fundingDeadline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Funding Deadline (max 1 month)</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal bg-[#1a1b2e] border-[#2e2f45] text-white",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>MM/DD/YYYY</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-[#1a1b2e] border-[#2e2f45]" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                // Disable dates more than 1 month in the future
                                const maxDate = new Date()
                                maxDate.setMonth(maxDate.getMonth() + 1)
                                return date < new Date() || date > maxDate
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <h2 className="text-xl font-semibold pt-4">Deal Details</h2>

                  <FormField
                    control={form.control}
                    name="headerImage"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Header Image</FormLabel>
                        <FormControl>
                          <div className="border border-dashed border-[#2e2f45] rounded-md p-6 flex flex-col items-center justify-center bg-[#1a1b2e]">
                            {value || headerSrc ? (
                              <div className="relative w-full h-32 bg-gray-800 rounded-lg overflow-hidden mb-2">
                              <img
                                src={headerSrc || "/placeholder.svg"}
                                alt="Banner"
                                className="w-full h-full object-cover"
                              />
                              <label
                                htmlFor="banner-upload"
                                className="absolute bottom-2 right-2 p-1 rounded-full bg-gray-800 border border-gray-700 cursor-pointer"
                              >
                                <Camera className="h-4 w-4 text-gray-400" />
                                <span className="sr-only">Upload Header Image</span>
                              </label>
                              <input
                                id="banner-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFundingHeaderChange}
                              />
                            </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center text-gray-400">
                              <p className="text-xs mt-1">Click upload to change your Header Image</p>
                            </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dealName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deal Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter deal name"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dealRound"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deal Round</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                              <SelectValue placeholder="Select deal round" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                            <SelectItem value="seed">Seed</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="ido">IDO</SelectItem>
                            <SelectItem value="ico">ICO</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tokenPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Token Price (fetched from startup)</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-[#1a1b2e] border-[#2e2f45] text-white" disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {/* Step 3: FAQs */}
            {currentStep === 3 && (
              <>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold">FAQ</h2>
                      <Badge variant="outline" className="bg-[#1a1b2e] border-[#2e2f45]">
                        {faqs.length}/5 Questions
                      </Badge>
                    </div>
                    {faqs.length < 5 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addFaq}
                        className="bg-[#1a1b2e] border-[#2e2f45] hover:bg-[#2e2f45]"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add FAQ
                      </Button>
                    )}
                  </div>

                  <Card className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                    <CardHeader>
                      <CardTitle>Frequently Asked Questions</CardTitle>
                      <CardDescription className="text-gray-400">
                        Add between 1 and 5 FAQs for your campaign
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {faqs.map((faq, index) => (
                        <div key={faq.id} className="space-y-4 p-4 border border-[#2e2f45] rounded-md relative">
                          <div className="absolute top-2 right-2">
                            {faqs.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFaq(faq.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-transparent"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="space-y-2">
                            <FormLabel htmlFor={`question-${faq.id}`}>
                              Question {index + 1}
                              <span className="text-red-500 ml-1">*</span>
                            </FormLabel>
                            <Input
                              id={`question-${faq.id}`}
                              value={faq.question}
                              onChange={(e) => updateFaq(faq.id, "question", e.target.value)}
                              placeholder="Enter question"
                              className={cn(
                                "bg-[#0a0b14] border-[#2e2f45] text-white",
                                faqErrors && faqErrors[faq.id]?.question && "border-red-500",
                              )}
                            />
                            {faqErrors && faqErrors[faq.id]?.question && (
                              <p className="text-sm font-medium text-red-500">{faqErrors[faq.id].question}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <FormLabel htmlFor={`answer-${faq.id}`}>
                              Answer
                              <span className="text-red-500 ml-1">*</span>
                            </FormLabel>
                            <Textarea
                              id={`answer-${faq.id}`}
                              value={faq.answer}
                              onChange={(e) => updateFaq(faq.id, "answer", e.target.value)}
                              placeholder="Enter answer"
                              className={cn(
                                "bg-[#0a0b14] border-[#2e2f45] text-white min-h-[100px]",
                                faqErrors && faqErrors[faq.id]?.answer && "border-red-500",
                              )}
                            />
                            {faqErrors && faqErrors[faq.id]?.answer && (
                              <p className="text-sm font-medium text-red-500">{faqErrors[faq.id].answer}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-4">
                      {faqs.length < 5 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addFaq}
                          className="bg-[#1a1b2e] border-[#2e2f45] hover:bg-[#2e2f45]"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Another FAQ ({faqs.length}/5)
                        </Button>
                      )}

                      <Alert variant="default" className="bg-blue-900/20 border-blue-800 text-white">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>FAQ Requirements</AlertTitle>
                        <AlertDescription>
                          You must add at least 1 FAQ and can add up to 5 FAQs. Each FAQ must have both a question and
                          an answer.
                        </AlertDescription>
                      </Alert>
                    </CardFooter>
                  </Card>

                  <Card className="bg-blue-900/30 border-blue-800 text-white">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium mb-2">Funding Information</h3>
                      <p className="text-sm text-gray-300">
                        Your campaign will be reviewed by our team before it goes live. Once approved, investors will be
                        able to contribute to your project until the funding deadline.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {/* Step 4: Milestones */}
            {currentStep === 4 && (
              <>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Milestones</h2>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addMilestone}
                      className="bg-[#1a1b2e] border-[#2e2f45] hover:bg-[#2e2f45]"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Custom Milestone
                    </Button>
                  </div>

                  {isFetchingMilestones ? (
                    <div className="flex justify-center py-8">
                      <p>Loading milestones...</p>
                    </div>
                  ) : (
                    <>
                      {/* Predefined Milestones */}
                      {predefinedMilestones.length > 0 && (
                        <Card className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                          <CardHeader>
                            <CardTitle>Predefined Milestones</CardTitle>
                            <CardDescription className="text-gray-400">
                              These milestones are recommended for your campaign type
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <Accordion type="single" collapsible className="w-full">
                              {predefinedMilestones.map((milestone, index) => (
                                <AccordionItem
                                  key={milestone.milestoneId}
                                  value={milestone.milestoneId}
                                  className="border-[#2e2f45]"
                                >
                                  <AccordionTrigger className="hover:no-underline">
                                    <div className="flex items-center gap-3 text-left">
                                      <Badge variant="outline" className="bg-blue-900/30 border-blue-800 text-white">
                                        {index + 1}
                                      </Badge>
                                      <div>
                                        <h3 className="font-medium">{milestone.name}</h3>
                                        <p className="text-sm text-gray-400">{milestone.description}</p>
                                      </div>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="pl-10 pt-2 space-y-4">
                                      {/* <div className="space-y-2">
                                        <h4 className="text-sm font-medium">Fund Percentage</h4>
                                        <Input
                                          type="number"
                                          value={milestone.fundPercentage}
                                          onChange={(e) => {
                                            const updatedMilestones = predefinedMilestones.map((m) => {
                                              if (m.milestoneId === milestone.milestoneId) {
                                                return {
                                                  ...m,
                                                  fundPercentage: Number(e.target.value),
                                                }
                                              }
                                              return m
                                            })
                                            setPredefinedMilestones(updatedMilestones)
                                            form.setValue("milestones", updatedMilestones)
                                          }}
                                          min="0"
                                          max="100"
                                          className="bg-[#0a0b14] border-[#2e2f45] text-white w-24"
                                        />
                                      </div> */}

                                      <div className="space-y-2">
                                        <h4 className="text-sm font-medium">Requirements</h4>
                                        <div className="space-y-3">
                                          {milestone.requirements.map((req) => (
                                            <div key={req._id} className="p-3 border border-[#2e2f45] rounded-md">
                                              <h5 className="font-medium">{req.name}</h5>
                                              <p className="text-sm text-gray-400">{req.description}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* <div className="space-y-2">
                                        <h4 className="text-sm font-medium">Verification Proof</h4>
                                        <Input
                                          value={milestone.verificationProof}
                                          onChange={(e) => {
                                            const updatedMilestones = predefinedMilestones.map((m) => {
                                              if (m.milestoneId === milestone.milestoneId) {
                                                return {
                                                  ...m,
                                                  verificationProof: e.target.value,
                                                }
                                              }
                                              return m
                                            })
                                            setPredefinedMilestones(updatedMilestones)
                                            form.setValue("milestones", updatedMilestones)
                                          }}
                                          placeholder="https://proof.com/verification"
                                          className="bg-[#0a0b14] border-[#2e2f45] text-white"
                                        />
                                      </div> */}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </CardContent>
                        </Card>
                      )}

                      {/* User-Added Milestones */}
                      {userMilestones.length > 0 && (
                        <Card className="bg-[#1a1b2e] border-[#2e2f45] text-white mt-6">
                          <CardHeader>
                            <CardTitle>Custom Milestones</CardTitle>
                            <CardDescription className="text-gray-400">
                              Add your own milestones to track project progress
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {userMilestones.map((milestone, index) => (
                              <div
                                key={milestone.milestoneId}
                                className="border border-[#2e2f45] rounded-md overflow-hidden"
                              >
                                <div className="flex items-center justify-between p-4 bg-[#1e1f33]">
                                  <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="bg-purple-900/30 border-purple-800 text-white">
                                      {index + 1}
                                    </Badge>
                                    <div>
                                      {editingMilestone === milestone.milestoneId ? (
                                        <Input
                                          value={milestone.name}
                                          onChange={(e) =>
                                            updateMilestoneField(milestone.milestoneId, "name", e.target.value)
                                          }
                                          placeholder="Milestone name"
                                          className="bg-[#0a0b14] border-[#2e2f45] text-white"
                                        />
                                      ) : (
                                        <h3 className="font-medium">{milestone.name || "Untitled Milestone"}</h3>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleMilestoneEditing(milestone.milestoneId)}
                                      className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-[#2e2f45]"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleMilestoneExpansion(milestone.milestoneId)}
                                      className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-[#2e2f45]"
                                    >
                                      {expandedMilestone === milestone.milestoneId ? (
                                        <ChevronUp className="h-4 w-4" />
                                      ) : (
                                        <ChevronDown className="h-4 w-4" />
                                      )}
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeMilestone(milestone.milestoneId)}
                                      className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-transparent"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>

                                {(expandedMilestone === milestone.milestoneId ||
                                  editingMilestone === milestone.milestoneId) && (
                                  <div className="p-4 space-y-4">
                                    {/* <div className="space-y-2">
                                      <FormLabel>
                                        Fund Percentage
                                        <span className="text-red-500 ml-1">*</span>
                                      </FormLabel>
                                      <Input
                                        type="number"
                                        value={milestone.fundPercentage}
                                        onChange={(e) =>
                                          updateMilestoneField(
                                            milestone.milestoneId,
                                            "fundPercentage",
                                            Number(e.target.value),
                                          )
                                        }
                                        min="0"
                                        max="100"
                                        className={cn(
                                          "bg-[#0a0b14] border-[#2e2f45] text-white w-24",
                                          milestoneErrors &&
                                            milestoneErrors[milestone.milestoneId]?.fundPercentage &&
                                            "border-red-500",
                                        )}
                                      />
                                      {milestoneErrors && milestoneErrors[milestone.milestoneId]?.fundPercentage && (
                                        <p className="text-sm font-medium text-red-500">
                                          {milestoneErrors[milestone.milestoneId].fundPercentage}
                                        </p>
                                      )}
                                    </div> */}

                                    <div className="space-y-2">
                                      <FormLabel>
                                        Description
                                        <span className="text-red-500 ml-1">*</span>
                                      </FormLabel>
                                      <Textarea
                                        value={milestone.description}
                                        onChange={(e) =>
                                          updateMilestoneField(milestone.milestoneId, "description", e.target.value)
                                        }
                                        placeholder="Describe this milestone"
                                        className={cn(
                                          "bg-[#0a0b14] border-[#2e2f45] text-white min-h-[80px]",
                                          milestoneErrors &&
                                            milestoneErrors[milestone.milestoneId]?.description &&
                                            "border-red-500",
                                        )}
                                      />
                                      {milestoneErrors && milestoneErrors[milestone.milestoneId]?.description && (
                                        <p className="text-sm font-medium text-red-500">
                                          {milestoneErrors[milestone.milestoneId].description}
                                        </p>
                                      )}
                                    </div>

                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <FormLabel>
                                          Requirements
                                          <span className="text-red-500 ml-1">*</span>
                                        </FormLabel>
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="sm"
                                          onClick={() => addRequirement(milestone.milestoneId)}
                                          className="bg-[#1a1b2e] border-[#2e2f45] hover:bg-[#2e2f45] h-8"
                                        >
                                          <Plus className="h-3 w-3 mr-1" />
                                          Add Requirement
                                        </Button>
                                      </div>

                                      {milestoneErrors && milestoneErrors[milestone.milestoneId]?.requirements && (
                                        <p className="text-sm font-medium text-red-500">
                                          {milestoneErrors[milestone.milestoneId].requirements}
                                        </p>
                                      )}

                                      <div className="space-y-3">
                                        {milestone.requirements.map((req, reqIndex) => (
                                          <div
                                            key={req.id || req._id}
                                            className="p-3 border border-[#2e2f45] rounded-md relative"
                                          >
                                            {milestone.requirements.length > 1 && (
                                              <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                  removeRequirement(milestone.milestoneId, req.id || req._id || "")
                                                }
                                                className="absolute top-2 right-2 h-6 w-6 p-0 text-red-500 hover:text-red-400 hover:bg-transparent"
                                              >
                                                <X className="h-3 w-3" />
                                              </Button>
                                            )}

                                            <div className="space-y-2 mb-3">
                                              <FormLabel className="text-xs">
                                                Requirement Name
                                                <span className="text-red-500 ml-1">*</span>
                                              </FormLabel>
                                              <Input
                                                value={req.name}
                                                onChange={(e) =>
                                                  updateRequirementField(
                                                    milestone.milestoneId,
                                                    req.id || req._id || "",
                                                    "name",
                                                    e.target.value,
                                                  )
                                                }
                                                placeholder="Requirement name"
                                                className={cn(
                                                  "bg-[#0a0b14] border-[#2e2f45] text-white",
                                                  milestoneErrors &&
                                                    milestoneErrors[milestone.milestoneId]?.[
                                                      `requirement_${reqIndex}_name`
                                                    ] &&
                                                    "border-red-500",
                                                )}
                                              />
                                              {milestoneErrors &&
                                                milestoneErrors[milestone.milestoneId]?.[
                                                  `requirement_${reqIndex}_name`
                                                ] && (
                                                  <p className="text-sm font-medium text-red-500">
                                                    {
                                                      milestoneErrors[milestone.milestoneId][
                                                        `requirement_${reqIndex}_name`
                                                      ]
                                                    }
                                                  </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                              <FormLabel className="text-xs">
                                                Requirement Description
                                                <span className="text-red-500 ml-1">*</span>
                                              </FormLabel>
                                              <Textarea
                                                value={req.description}
                                                onChange={(e) =>
                                                  updateRequirementField(
                                                    milestone.milestoneId,
                                                    req.id || req._id || "",
                                                    "description",
                                                    e.target.value,
                                                  )
                                                }
                                                placeholder="Describe this requirement"
                                                className={cn(
                                                  "bg-[#0a0b14] border-[#2e2f45] text-white min-h-[60px]",
                                                  milestoneErrors &&
                                                    milestoneErrors[milestone.milestoneId]?.[
                                                      `requirement_${reqIndex}_description`
                                                    ] &&
                                                    "border-red-500",
                                                )}
                                              />
                                              {milestoneErrors &&
                                                milestoneErrors[milestone.milestoneId]?.[
                                                  `requirement_${reqIndex}_description`
                                                ] && (
                                                  <p className="text-sm font-medium text-red-500">
                                                    {
                                                      milestoneErrors[milestone.milestoneId][
                                                        `requirement_${reqIndex}_description`
                                                      ]
                                                    }
                                                  </p>
                                                )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* <div className="space-y-2">
                                      <FormLabel>Verification Proof URL</FormLabel>
                                      <div className="flex">
                                        <div className="relative flex-1">
                                          <Link
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                            size={16}
                                          />
                                          <Input
                                            value={milestone.verificationProof}
                                            onChange={(e) =>
                                              updateMilestoneField(
                                                milestone.milestoneId,
                                                "verificationProof",
                                                e.target.value,
                                              )
                                            }
                                            placeholder="https://proof.com/verification"
                                            className="bg-[#0a0b14] border-[#2e2f45] text-white pl-10"
                                          />
                                        </div>
                                      </div>
                                    </div> */}
                                  </div>
                                )}
                              </div>
                            ))}
                          </CardContent>
                          <CardFooter>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={addMilestone}
                              className="bg-[#1a1b2e] border-[#2e2f45] hover:bg-[#2e2f45]"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Another Milestone
                            </Button>
                          </CardFooter>
                        </Card>
                      )}

                      {predefinedMilestones.length === 0 && userMilestones.length === 0 && (
                        <Card className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                          <CardContent className="p-8 flex flex-col items-center justify-center">
                            <div className="text-center space-y-3">
                              <h3 className="text-lg font-medium">No Milestones Added Yet</h3>
                              <p className="text-gray-400">
                                Add milestones to track your project's progress and release funds
                              </p>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={addMilestone}
                                className="mt-4 bg-[#1a1b2e] border-[#2e2f45] hover:bg-[#2e2f45]"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Your First Milestone
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <Alert variant="default" className="bg-blue-900/20 border-blue-800 text-white mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Milestone Information</AlertTitle>
                        <AlertDescription>
                          Milestones help track your project's progress and release funds at different stages. You can
                          use predefined milestones or create your own custom ones.
                        </AlertDescription>
                      </Alert>
                    </>
                  )}
                </div>
              </>
            )}

            <div className="flex justify-between pt-4">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="bg-[#1a1b2e] border-[#2e2f45] hover:bg-[#2e2f45]"
                >
                  Previous
                </Button>
              ) : (
                <div></div>
              )}

              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" >
                {currentStep === 4 ? "Create Campaign" : "Next"} {submitLoading && <Loader2 className="animate-spin h-4 w-4 ml-2" />}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
