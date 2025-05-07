"use client"

import type React from "react"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, ArrowRight, Building, Camera, Github, Globe, Linkedin, Twitter } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useUser } from "@auth0/nextjs-auth0/client"
import { AppLayout } from "@/components/layout/app-layout"

const founderProfileSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  title: z.string().min(2, { message: "Title is required" }),
  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters" })
    .max(150, { message: "Bio must be less than 150 characters" }),
  experience: z.string().min(1, { message: "Please select your experience level" }),
  skills: z.string().min(2, { message: "Skills are required" }),
  location: z.string().min(1, { message: "Please select your country" }),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  twitter: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
  github: z.string().optional().or(z.literal("")),
})

type FounderProfileValues = z.infer<typeof founderProfileSchema>

export default function FounderProfileSetupPage() {
  const router = useRouter()
  const [avatarSrc, setAvatarSrc] = useState<string>("/placeholder.svg?height=100&width=100")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, isLoading } = useUser()
  const [onboardingStatus, setOnboardingStatus] = useState<boolean>()
  // Add a new state to store the original data from the API
  const [originalData, setOriginalData] = useState<any>(null)

  const form = useForm<FounderProfileValues>({
    resolver: zodResolver(founderProfileSchema),
    defaultValues: {
      fullName: "",
      title: "",
      bio: "",
      experience: "",
      skills: "",
      location: "",
      website: "",
      twitter: "",
      linkedin: "",
      github: "",
    },
  })

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

  useEffect(() => {
    const getOnboardingStatus = async () => {
      try {
        const response = await fetch("https://ofStaging.azurewebsites.net/api/profile/get-onboarding-status", {
          method: "GET",
          headers: {
            user_id: user?.sub?.substring(14),
          },
        })

        // if (!response.ok) {
        //   throw new Error("Failed to fetch onboarding status")
        // }

        const data = await response.json()
        setOnboardingStatus(data.status)
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

  // Add a useEffect to fetch profile data when the component loads
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return

      try {
        const response = await fetch("https://ofStaging.azurewebsites.net/api/profile/get-profile", {
          method: "GET",
          headers: {
            user_id: user?.sub?.substring(14),
          },
        })

        // if (!response.ok) {
        //   throw new Error("Failed to fetch profile data")
        // }

        const data = await response.json()
        setOriginalData(data)

        // Set avatar if available
        if (data.profilePic?.file_url) {
          setAvatarSrc(data.profilePic.file_url)
        }

        // Parse skills array to comma-separated string
        const skillsString = data.founderData?.skills?.join(", ") || ""

        // Set form values
        form.reset({
          fullName: data.username || "",
          title: data.professionalTitle || "",
          bio: data.bio || "",
          experience: data.founderData?.experienceLevel || "",
          skills: skillsString,
          location: data.location || "",
          website: data.founderData?.socialLinks?.website || "",
          twitter: data.founderData?.socialLinks?.Twitter || "",
          linkedin: data.founderData?.socialLinks?.LinkedIn || "",
          github: data.founderData?.socialLinks?.github || "",
        })
      } catch (error) {
        console.error("Error fetching profile data:", error)
        toast({
          title: "Failed to fetch profile data",
          description: "Please try again later.",
          variant: "destructive",
        })
      }
    }

    if (user) {
      fetchProfileData()
    }
  }, [user, form])

  // Modify the onSubmit function to check for changes
  async function onSubmit(data: FounderProfileValues) {
    setIsSubmitting(true)

    try {
      // Get user_id from wherever it's stored in your application
      const userId = user?.sub?.substring(14)

      if (!userId) {
        toast({
          title: "Authentication error",
          description: "Please sign in again to continue.",
        })
        router.push("/api/auth/login")
        return
      }

      // Create FormData object
      const formData = new FormData()

      // Check if data has changed
      const hasChanges =
        !originalData ||
        originalData.username !== data.fullName ||
        originalData.professionalTitle !== data.title ||
        originalData.bio !== data.bio ||
        originalData.location !== data.location ||
        originalData.founderData?.experienceLevel !== data.experience ||
        originalData.founderData?.skills?.join(", ") !== data.skills ||
        originalData.founderData?.socialLinks?.website !== data.website ||
        originalData.founderData?.socialLinks?.Twitter !== data.twitter ||
        originalData.founderData?.socialLinks?.LinkedIn !== data.linkedin ||
        originalData.founderData?.socialLinks?.github !== data.github ||
        avatarFile !== null

      // Add profile data
      formData.append("professionalTitle", data.title)
      formData.append("location", data.location)
      formData.append("bio", data.bio)
      formData.append("username", data.fullName)

      // Add profile picture if available and changed
      if (avatarFile) {
        formData.append("profile_pic_file", avatarFile)
      }

      // Parse skills into array
      const skillsArray = data.skills.split(",").map((skill) => skill.trim())

      const founderData = {
        experienceLevel: data.experience,
        skills: skillsArray,
        socialLinks: {
          Twitter: data.twitter,
          github: data.github,
          LinkedIn: data.linkedin,
          website: data.website,
        },
      }

      // Append founderData as JSON string
      formData.append("founderData", JSON.stringify(founderData))

      // Add a flag to indicate if data has changed
      formData.append("hasChanges", String(hasChanges))

      // Make API call
      const response = await fetch("https://onlyfounders.azurewebsites.net/api/profile/submit-personal-details", {
        method: "POST",
        headers: {
          user_id: userId,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        // throw new Error(errorData?.message || "Failed to submit profile")
      }

      toast({
        title: hasChanges ? "Profile updated successfully" : "Profile submitted successfully",
        description: hasChanges ? "Your changes have been saved." : "Your founder profile has been saved.",
      })

      // Navigate to next step
      router.push("/profile-page/founder")
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

  return (
    <AppLayout>
      <div className="px-2 md:px-0 max-w-4xl mx-auto py-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Founder Profile</h1>
            <p className="text-gray-400">Tell us about yourself and your experience in the Web3 space</p>
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
                <CardTitle className="text-xl text-white">Founder Information</CardTitle>
                <CardDescription className="text-gray-400">
                  This information will be visible to investors and the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative mb-4">
                        <Avatar className="h-24 w-24 border-2 border-gray-800">
                          <AvatarImage src={avatarSrc} alt="Profile" />
                          <AvatarFallback className="bg-gray-800 text-gray-400">
                            <Building className="h-12 w-12" />
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
                      <p className="text-sm text-gray-400">Upload a professional profile picture</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Full Name</FormLabel>
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
                            <FormLabel className="text-white">Professional Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="CEO & Founder"
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
                          <FormLabel className="text-white">Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your background, experience, and vision..."
                              className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-gray-500">
                            {field.value.length}/150 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Web3 Experience</FormLabel>
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

                      <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Skills & Expertise</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Blockchain, Smart Contracts, DeFi, etc."
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-gray-500">Separate skills with commas</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Location</FormLabel>
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

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Social & Web Presence</h3>

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
                          name="linkedin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">LinkedIn</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                  <Input
                                    placeholder="linkedin.com/in/username"
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
                                    placeholder="github.com/username"
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

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/profile")}
                        className="border-gray-700 text-white"
                        disabled={isSubmitting || onboardingStatus === true}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="bg-black hover:bg-gray-900 text-white border border-gray-800"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                        {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

