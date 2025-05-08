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
import { ArrowLeft, ArrowRight, Building, Camera, Facebook, Globe, Instagram, Linkedin, Twitter } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useUser } from "@auth0/nextjs-auth0/client"

const serviceProviderProfileSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  title: z.string().min(2, { message: "Title is required" }),
  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters" })
    .max(500, { message: "Bio must be less than 500 characters" }),
  experience: z.string().min(1, { message: "Please select your experience level" }),
  skills: z.string().min(2, { message: "Skills are required" }),
  location: z.string().min(1, { message: "Please select your country" }),
  businessName: z.string().min(2, { message: "Business name is required" }),
  nameOfServiceProvider: z.string().min(2, { message: "Service provider name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  category: z.string().min(1, { message: "Please select a category" }),
  serviceDescription: z.string().min(10, { message: "Service description must be at least 10 characters" }),
  pricingModel: z.string().min(1, { message: "Please select a pricing model" }),
  websiteUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  companyTwitter: z.string().optional().or(z.literal("")),
  companyLinkedin: z.string().optional().or(z.literal("")),
  companyInstagram: z.string().optional().or(z.literal("")),
  companyFacebook: z.string().optional().or(z.literal("")),
  personalTwitter: z.string().optional().or(z.literal("")),
  personalLinkedin: z.string().optional().or(z.literal("")),
  personalInstagram: z.string().optional().or(z.literal("")),
  personalFacebook: z.string().optional().or(z.literal("")),
})

type ServiceProviderProfileValues = z.infer<typeof serviceProviderProfileSchema>

export default function ServiceProviderProfileSetupPage() {
  const router = useRouter()
  const [avatarSrc, setAvatarSrc] = useState<string>("/placeholder.svg?height=100&width=100")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, isLoading } = useUser()
  const [onboardingStatus, setOnboardingStatus] = useState<boolean>()

  const form = useForm<ServiceProviderProfileValues>({
    resolver: zodResolver(serviceProviderProfileSchema),
    defaultValues: {
      fullName: "",
      title: "",
      bio: "",
      experience: "",
      skills: "",
      location: "",
      businessName: "",
      nameOfServiceProvider: "",
      email: "",
      category: "",
      serviceDescription: "",
      pricingModel: "",
      websiteUrl: "",
      companyTwitter: "",
      companyLinkedin: "",
      companyInstagram: "",
      companyFacebook: "",
      personalTwitter: "",
      personalLinkedin: "",
      personalInstagram: "",
      personalFacebook: "",
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

  const categories = [
    "Development",
    "Design",
    "Marketing",
    "Legal",
    "Finance",
    "Consulting",
    "Security",
    "Community Management",
    "Content Creation",
    "Smart Contract Audit",
    "Tokenomics",
    "Other",
  ]

  const pricingModels = [
    "Hourly",
    "Fixed Price",
    "Project-based",
    "Retainer",
    "Subscription",
    "Success Fee",
    "Hybrid",
    "Custom",
  ]


    useEffect(() => {
        const getOnboardingStatus = async () => {
          try {
            const response = await fetch("https://ofStaging.azurewebsites.net/api/profile/get-onboarding-status", {
              method: "GET",
              headers: {
                user_id: user?.sub?.substring(14),
              },
            });
      
            // if (!response.ok) {
            //   throw new Error("Failed to fetch onboarding status");
            // }
      
            const data = await response.json();
            setOnboardingStatus(data.status);
          } catch (error) {
            console.error("Error fetching onboarding status:", error);
            toast({
              title: "Failed to fetch onboarding status",
              description: "Please try again later.",
              variant: "destructive",
            });
          }
        };
      
        if (user) {
          getOnboardingStatus();
        }
      }, [user]);


  async function onSubmit(data: ServiceProviderProfileValues) {
    setIsSubmitting(true)

    try {
      // Get user_id from wherever it's stored in your application
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

      // Create FormData object
      const formData = new FormData()

      // Add profile data
      formData.append("professionalTitle", data.title)
      formData.append("location", data.location)
      formData.append("bio", data.bio)
      formData.append("username", data.fullName)
      formData.append("email", data.email)

      // Add profile picture if available
      if (avatarFile) {
        formData.append("profile_pic_file", avatarFile)
      }

      // Parse skills into array
      const skillsArray = data.skills.split(",").map((skill) => skill.trim())

      // Create company social links object
      const companySocialLinks = {
        Twitter: data.companyTwitter,
        LinkedIn: data.companyLinkedin,
        Instagram: data.companyInstagram,
        Facebook: data.companyFacebook,
      }

      // Create personal social links object
      const personalSocialLinks = {
        Twitter: data.personalTwitter,
        LinkedIn: data.personalLinkedin,
        Instagram: data.personalInstagram,
        Facebook: data.personalFacebook,
      }

      // Create service provider data object
      const serviceProviderData = {
        businessName: data.businessName,
        email: data.email,
        nameOfServiceProvider: data.nameOfServiceProvider,
        category: data.category,
        serviceDescription: data.serviceDescription,
        pricingModel: data.pricingModel,
        Website: data.websiteUrl,
        companySocialLinks: companySocialLinks,
        personalSocialLinks: personalSocialLinks,
      }

      // Append serviceProviderData as JSON string
      formData.append("serviceProviderData", JSON.stringify(serviceProviderData))

      // Make API call
      const response = await fetch("https://ofstaging.azurewebsites.net/api/profile/submit-personal-details", {
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
        title: "Profile submitted successfully",
        description: "Your service provider profile has been saved.",
      })

      // Navigate to next step
      router.push("/profile")
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
    <div className="max-w-4xl mx-auto py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Service Provider Profile</h1>
          <p className="text-gray-400">Tell us about your services and expertise in the Web3 space</p>
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
              <CardTitle className="text-xl text-white">Service Provider Information</CardTitle>
              <CardDescription className="text-gray-400">
                This information will be visible to potential clients in the community
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

                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-white">Personal Information</h3>

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
                            {field.value.length}/500 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Experience</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                  <SelectValue placeholder="Select your experience level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-900 border-gray-800 text-white">
                                <SelectItem value="1-2">1-2 years</SelectItem>
                                <SelectItem value="3-5">3-5 years</SelectItem>
                                <SelectItem value="5-10">5-10 years</SelectItem>
                                <SelectItem value="10+">10+ years</SelectItem>
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
                            <FormLabel className="text-white">Skills</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Smart Contracts, UI/UX, Marketing"
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
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-white">Business Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Business Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your Company LLC"
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
                        name="nameOfServiceProvider"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Service Provider Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Name of your service"
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
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Business Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="contact@yourcompany.com"
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
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Service Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                  <SelectValue placeholder="Select service category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-900 border-gray-800 text-white">
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category.toLowerCase()}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="serviceDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Service Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the services you offer in detail..."
                              className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="pricingModel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Pricing Model</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                  <SelectValue placeholder="Select pricing model" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-900 border-gray-800 text-white">
                                {pricingModels.map((model) => (
                                  <SelectItem key={model} value={model.toLowerCase()}>
                                    {model}
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
                        name="websiteUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Website URL</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                  placeholder="https://yourcompany.com"
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

                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-white">Company Social Media</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="companyTwitter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Company Twitter</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                  placeholder="@companyname"
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
                        name="companyLinkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Company LinkedIn</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                  placeholder="linkedin.com/company/name"
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
                        name="companyInstagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Company Instagram</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                  placeholder="instagram.com/companyname"
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
                        name="companyFacebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Company Facebook</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                  placeholder="facebook.com/companyname"
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

                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-white">Personal Social Media</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="personalTwitter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Personal Twitter</FormLabel>
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
                        name="personalLinkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Personal LinkedIn</FormLabel>
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
                        name="personalInstagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Personal Instagram</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                  placeholder="instagram.com/username"
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
                        name="personalFacebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Personal Facebook</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                  placeholder="facebook.com/username"
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
                      disabled={isSubmitting || !form.formState.isValid}
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
  )
}

