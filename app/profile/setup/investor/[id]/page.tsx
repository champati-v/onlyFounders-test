"use client"

import type React from "react"

import { API_URL } from '@/lib/config';
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Camera, Check, Linkedin, Twitter, User, Wallet } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useUser } from "@auth0/nextjs-auth0/client"

const investorProfileSchema = z
  .object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
    title: z.string().min(2, { message: "Title is required" }),
    bio: z
      .string()
      .min(10, { message: "Bio must be at least 10 characters" })
      .max(300, { message: "Bio must be less than 300 characters" }),
    investorType: z.string().min(1, { message: "Please select your investor type" }),
    experience: z.string().min(1, { message: "Please select your experience level" }),
    vcFirmName: z.string().min(1, { message: "Please enter your VC firm name" }),
    location: z.string().min(1, { message: "Please select your country" }),
    minInvestment: z.number().min(100, { message: "Minimum investment must be at least 100 USDC" }),
    maxInvestment: z.number().min(100, { message: "Maximum investment must be at least 100 USDC" }),
    interests: z.array(z.string()).min(1, { message: "Please select at least one interest" }),
    twitter: z.string().min(1, { message: "Twitter is required" }),
    linkedin: z.string().min(1, { message: "LinkedIn is required" }),
    publicProfile: z.boolean().default(true),
  })
  .refine((data) => data.maxInvestment >= data.minInvestment, {
    message: "Maximum investment must be greater than or equal to minimum investment",
    path: ["maxInvestment"], // This specifies which field the error should be shown on
  })

type InvestorProfileValues = z.infer<typeof investorProfileSchema>


export default function InvestorProfileSetupPage({params, }: { params: { id: number }; }) {
  const router = useRouter()
  const [avatarSrc, setAvatarSrc] = useState<string>("/placeholder.svg?height=100&width=100")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, isLoading } = useUser()
  const [onboardingStatus, setOnboardingStatus] = useState<boolean>()
  const [userRole, setUserRole] = useState<string[]>([])
  const [bannerSrc, setBannerSrc] = useState<string>("/placeholder.svg?height=300&width=1000")
  const [bannerFile, setBannerFile] = useState<File | null>(null)

  const interestOptions = [
    { id: "DeFi", label: "DeFi" },
    { id: "NFT", label: "NFT" },
    { id: "DAO", label: "DAO" },
    { id: "Gaming", label: "Gaming" },
    { id: "Infrastructure", label: "Infrastructure" },
    { id: "Metaverse", label: "Metaverse" },
    { id: "Privacy", label: "Privacy" },
    { id: "Social", label: "Social" },
  ]

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ]

  const form = useForm<InvestorProfileValues>({
    resolver: zodResolver(investorProfileSchema),
    defaultValues: {
      fullName: "",
      title: "",
      bio: "",
      investorType: "",
      experience: "",
      vcFirmName: "",
      location: "",
      minInvestment: 0,
      maxInvestment: 0,
      interests: [],
      twitter: "",
      linkedin: "",
      publicProfile: true,
    },
  })

  useEffect(() => {
    const getOnboardingStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/api/profile/get-onboarding-status`, {
          method: "GET",
          headers: {
            user_id: user?.sub?.substring(14),
          },
        })

        // if (!response.ok) {
        //   throw new Error("Failed to fetch onboarding status");
        // }

        const data = await response.json()
        setOnboardingStatus(data.status)
        const rolesArray = Array.isArray(data.role) ? data.role : [data.role]
        setUserRole(rolesArray)
      } catch (error) {
        console.error("Error fetching onboarding status:", error)
        toast({
          title: "Failed to fetch onboarding status",
          description: "Please try again later.",
          variant: "destructive",
        })
      }
    }

    if (user) {
      getOnboardingStatus()
    }
  }, [user])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Save file for upload
      setAvatarFile(file)

      // Preview image
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarSrc(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Add the handleBannerChange function after the handleAvatarChange function
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

  // Add a new useEffect hook to fetch investor data after the existing useEffect
  useEffect(() => {
    const fetchInvestorData = async () => {
      try {
        if (!user || isLoading) return // Wait until user is fully loaded
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

        const response = await fetch(`${API_URL}/api/profile/get-profile`, {
          method: "GET",
          headers: {
            user_id: userId,
          },
        })

        const data = await response.json()

        // Set avatar image if available
        if (data.profilePic && data.profilePic.file_url) {
          setAvatarSrc(data.profilePic.file_url)
        }

        // Set banner image if available
        if (data.bannerImage) {
          setBannerSrc(data.bannerImage.file_url)
        }

        // Update form with fetched data
        form.reset({
          fullName: data.username || "",
          title: data.professionalTitle || "",
          bio: data.bio || "",
          investorType: data.investorData?.investorType || "",
          experience: data.investorData?.investmentExperience || "",
          vcFirmName: data.investorData?.vcFirmName || "",
          location: data.location || "",
          minInvestment: data.investorData?.minInvestment || 100,
          maxInvestment: data.investorData?.maxInvestment || 100,
          interests: data.investorData?.investmentInterest || [],
          twitter: data.investorData?.socialLinks?.Twitter || "",
          linkedin: data.investorData?.socialLinks?.Linkedin || "",
          publicProfile: true,
        })
      } catch (error) {
        console.log("Error fetching investor data:", error)
      }
    }

    if (user && !isLoading) {
      fetchInvestorData()
    }
  }, [user, isLoading, form])

  async function onSubmit(data: InvestorProfileValues) {
    setIsSubmitting(true)

    try {
      if (!user) return
      // Get user_id from wherever it's stored in your application
      const userId = user?.sub?.substring(14)

      // Create FormData object
      const formData = new FormData()

      // Add profile data
      formData.append("professionalTitle", data.title)
      formData.append("location", data.location)
      formData.append("bio", data.bio)
      formData.append("username", data.fullName)

      if (bannerFile) {
        formData.append("bannerImage", bannerFile)
      }

      // Add profile picture if available
      if (avatarFile) {
        formData.append("profile_pic_file", avatarFile)
      }

      // Create investorData object
      const investorData = {
        investorType: data.investorType,
        investmentExperience: data.experience,
        vcFirmName: data.vcFirmName,
        minInvestment: data.minInvestment,
        maxInvestment: data.maxInvestment,
        investmentInterest: data.interests,
        socialLinks: {
          Linkedin: data.linkedin,
          Twitter: data.twitter,
        },
      }

      // Append investorData as JSON string
      formData.append("investorData", JSON.stringify(investorData))

      // Create socialLinks object
      const socialLinks = {
        Linkedin: data.linkedin,
        Twitter: data.twitter,
      }

      // Append socialLinks as JSON string
      formData.append("socialLinks", JSON.stringify(socialLinks))

      // Make API call
      const response = await fetch(`${API_URL}/api/profile/submit-personal-details`, {
        method: "POST",
        headers: {
          user_id: userId,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        console.log("Error response:", errorData)
        // throw new Error(errorData?.message || "Failed to submit profile")
      }

      if(response.status === 201) {
        
        console.log("role is ", userRole)
        const roleCount = Number(params.id)+1;
        console.log("Current Index is: ", roleCount)

          if(roleCount < userRole.length) {
            const nextRole = userRole[roleCount]

            if (nextRole === "Founder") {
              toast({
                title: "Profile submitted successfully",
                description: "Your investor profile has been saved.",
              })
              router.push(`/profile/setup/founder/${roleCount}`)
            }
      
            else if (nextRole === "ServiceProvider") {
              toast({
                title: "Profile submitted successfully",
                description: "Your investor profile has been saved.",
              })
              router.push(`/profile/setup/serviceProvider/${roleCount}`)
      
            } 
          }
          else {
              toast({
                title: "Profile submitted successfully",
                description: "Your Investor profile has been saved.",
              })
              router.push("/profile-page/combined")
          }
      }

    } catch (error) {
      console.error("Error submitting profile:", error)
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Failed to save your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Investor Profile</h1>
            <p className="text-gray-400">Tell us about your investment preferences and experience</p>
          </div>

          <div className="w-full">
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Profile Setup</span>
                <span className="text-white font-medium">Step 2 of 2</span>
              </div>
              <Progress
                value={100}
                className="h-2 bg-gray-700"
                indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-400"
              />
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Investor Information</CardTitle>
                <CardDescription className="text-gray-400">
                  This information will help us match you with suitable projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative mb-4">
                        <Avatar className="h-24 w-24 border-2 border-gray-800">
                          <AvatarImage src={avatarSrc || "/placeholder.svg"} alt="Profile" />
                          <AvatarFallback className="bg-gray-800 text-gray-400">
                            <User className="h-12 w-12" />
                          </AvatarFallback>
                        </Avatar>
                        <label
                          htmlFor="avatar-upload"
                          className="absolute bottom-0 right-0 p-1 rounded-full bg-gray-800 border border-gray-700 cursor-pointer"
                        >
                          <Camera className="h-4 w-4 text-gray-400" />
                          <span className="sr-only">Upload avatar</span>
                        </label>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </div>
                      <p className="text-sm text-gray-400">Upload a professional profile picture<span className="text-red-500 text-sm">*</span></p>

                      {/* banner Image */}
                      <div className="w-full mt-6">
                        <p className="text-sm text-gray-400 mb-2">Banner Image<span className="text-red-500 text-sm">*</span></p>
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
                        <p className="text-xs text-gray-500">Recommended size: 1000x300 pixels</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Full Name<span className="text-red-500 text-sm">*</span></FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
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
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Professional Title<span className="text-red-500 text-sm">*</span></FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Angel Investor / VC Partner"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Bio<span className="text-red-500 text-sm">*</span></FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your investment philosophy and background..."
                              className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-gray-500">
                            {field.value.length}/300 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="investorType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Investor Type<span className="text-red-500 text-sm">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                  <SelectValue placeholder="Select investor type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-900 border-gray-800 text-white">
                                <SelectItem value="individual">Individual Investor</SelectItem>
                                <SelectItem value="angel">Angel Investor</SelectItem>
                                <SelectItem value="vc">Venture Capital</SelectItem>
                                <SelectItem value="dao">DAO</SelectItem>
                                <SelectItem value="family office">Family Office</SelectItem>
                                <SelectItem value="corporate">Corporate Investor</SelectItem>
                                <SelectItem value="crypto">Crypto Fund</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Web3 Investment Experience<span className="text-red-500 text-sm">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                  <SelectValue placeholder="Select your experience level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-900 border-gray-800 text-white">
                                <SelectItem value="beginner">Beginner (&lt; 1 year)</SelectItem>
                                <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                                <SelectItem value="experienced">Experienced (3-5 years)</SelectItem>
                                <SelectItem value="expert">Expert (5+ years)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                          control={form.control}
                          name="vcFirmName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">VC Firm Name<span className="text-red-500 text-sm">*</span></FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    placeholder="VC Firm Name"
                                    className="bg-gray-800 border-gray-700 text-white"
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
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Location<span className="text-red-500 text-sm">*</span></FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder="Select your country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-900 border-gray-800 text-white max-h-[200px]">
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-white">Investment Preferences<span className="text-red-500 text-sm">*</span></h3>

                      <div className="space-y-8">
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <FormLabel className="text-white">Investment Range (USDC)</FormLabel>
                            <span className="text-gray-400 text-sm">
                              {form.watch("minInvestment").toLocaleString()} -{" "}
                              {form.watch("maxInvestment").toLocaleString()} USDC
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="minInvestment"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Minimum Investment<span className="text-red-500 text-sm">*</span></FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                      <Input
                                        type="number"
                                        min={100}
                                        step={100}
                                        className="bg-gray-800 border-gray-700 text-white pl-10"
                                        value={field.value}
                                        onChange={(e) => {
                                          const value = e.target.value === "" ? 0 : Number(e.target.value)
                                          field.onChange(value)

                                          // If max is less than the new min, update max to match min
                                          const maxValue = form.getValues("maxInvestment")
                                          if (maxValue < value) {
                                            form.setValue("maxInvestment", value)
                                          }
                                        }}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="maxInvestment"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Maximum Investment<span className="text-red-500 text-sm">*</span></FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                      <Input
                                        type="number"
                                        min={100}
                                        step={100}
                                        className="bg-gray-800 border-gray-700 text-white pl-10"
                                        value={field.value}
                                        onChange={(e) => {
                                          const value = e.target.value === "" ? 0 : Number(e.target.value)
                                          field.onChange(value)
                                        }}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name="interests"
                          render={() => (
                            <FormItem>
                              <FormLabel className="text-white block mb-3">Investment Interests<span className="text-red-500 text-sm">*</span></FormLabel>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {interestOptions.map((option) => (
                                  <FormField
                                    key={option.id}
                                    control={form.control}
                                    name="interests"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={option.id}
                                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-800 p-3 bg-gray-800/50"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(option.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, option.id])
                                                  : field.onChange(field.value?.filter((value) => value !== option.id))
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-white font-normal cursor-pointer">
                                            {option.label}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage className="mt-2" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Social Profiles<span className="text-red-500 text-sm">*</span></h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="twitter"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Twitter<span className="text-red-500 text-sm">*</span></FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                  <Input
                                    placeholder="https://twitter.com/username"
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
                          name="linkedin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">LinkedIn<span className="text-red-500 text-sm">*</span></FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                  <Input
                                    placeholder="https://linkedin.com/username"
                                    className="bg-gray-800 border-gray-700 text-white pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* <FormField
                      control={form.control}
                      name="publicProfile"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-800 p-4 bg-gray-800/50">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-white">Make my profile public</FormLabel>
                            <FormDescription className="text-gray-500">
                              Allow founders to see your profile and contact you about investment opportunities
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    /> */}

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        className="border-gray-700 text-white"
                        disabled={isSubmitting}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="bg-black hover:bg-gray-900 text-white border border-gray-800"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Complete Profile"}
                        {!isSubmitting && <Check className="ml-2 h-4 w-4" />}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}
