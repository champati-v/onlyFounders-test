"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Globe, Pencil, Twitter, Linkedin, Instagram, Facebook, Building2, Mail, Briefcase } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"

interface ServiceProviderProfile {
  id: string
  name: string
  role: string
  jobTitle: string
  location: string
  website: string
  websiteUrl: string
  about: string
  businessInfo: {
    companyName: string
    email: string
    serviceType: string
    companyWebsite: string
  }
  serviceDetails: {
    categories: string[]
    description: string
  }
  companySocialLinks: {
    twitter: string
    linkedin: string
    instagram: string
    facebook: string
  }
  profileImage: string
  bannerImage: string
  socialLinks: {
    twitter: string
    linkedin: string
    instagram: string
    facebook: string
    github: string
  }
  // Additional fields that might be in the API response
  username?: string
  professionalTitle?: string
  bio?: string
  profilePic?: {
    file_url: string
  }
  serviceProviderData?: {
    businessName?: string
    email?: string
    nameOfServiceProvider?: string
    category?: string
    businessInfo?: {
      companyName: string
      email: string
      serviceType: string
      companyWebsite: string
    }
    serviceDetails?: {
      categories: string[]
      description: string
    }
    companySocialLinks?: {
      twitter: string
      linkedin: string
      instagram: string
      facebook: string
    }
  }
}

export default function ServiceProviderProfilePage() {
  const [profile, setProfile] = useState<ServiceProviderProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<ServiceProviderProfile | null>(null)
  const { toast } = useToast()
  const { user, isUserLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true)

        
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
        if (!user || isUserLoading) return // Wait until user is fully loaded

        const response = await fetch("https://ofStaging.azurewebsites.net/api/profile/get-profile", {
          method: "GET",
          headers: {
            user_id: String(userId), // Ensure it's a string
          },
        })
        // if (!response.ok) {
        //   throw new Error("Failed to fetch profile data")
        // }
        const data = await response.json()
        console.log("Fetched profile data:", data) // Log the data structure

        setProfile(data)
        setEditedProfile(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        console.error("Error fetching profile:", error)
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (user && !isUserLoading) {
      fetchProfile()
    }
  }, [toast, user, isUserLoading, router])

  const handleEdit = () => {
    // Create a deep copy of the profile to avoid reference issues
    setEditedProfile(JSON.parse(JSON.stringify(profile)))
    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
      console.log("Saving profile:", editedProfile) // Log what's being sent

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

      const formData = new FormData()
                 // Add profile data
                       formData.append("professionalTitle", editedProfile?.professionalTitle)
                       formData.append("location", editedProfile?.location)
                       formData.append("bio", editedProfile?.bio)
                       formData.append("username", editedProfile?.username)
                 
                       // Add profile picture if available
                       if (profile?.profilePic) {
                         formData.append("profilePic", profile?.profilePic)
                       }
                 
                       const serviceProviderData = {
                         businessName: editedProfile?.serviceProviderData?.businessName,
                         nameOfServiceProvider: editedProfile?.serviceProviderData?.nameOfServiceProvider,
                         email: editedProfile?.serviceProviderData?.email,
                         category:editedProfile?.serviceProviderData?.category,
                         serviceDescription: profile?.serviceProviderData?.serviceDescription, 
                         websiteUrl: editedProfile?.serviceProviderData?.websiteUrl,
                         companySocialLinks: {
                           Twitter: profile?.serviceProviderData?.companySocialLinks?.twitter,
                           facbook: profile?.serviceProviderData?.companySocialLinks?.facebook,
                           linkedin: profile?.serviceProviderData?.companySocialLinks?.linkedin,
                           instagram: profile?.serviceProviderData?.companySocialLinks?.instagram,
                         },
                         personalSocialLinks:{
                          Twitter: profile?.serviceProviderData?.companySocialLinks?.twitter,
                          facbook: profile?.serviceProviderData?.companySocialLinks?.facebook,
                          linkedin: profile?.serviceProviderData?.companySocialLinks?.linkedin,
                          instagram: profile?.serviceProviderData?.companySocialLinks?.instagram,
                         }
                       }
                 
                       // Append founderData as JSON string
                      formData.append("founderData", JSON.stringify(serviceProviderData))

      const response = await fetch("https://onlyfounders.azurewebsites.net/api/profile/submit-personal-details", {
        method: "POST",
        headers: {
          user_id: String(userId),
        },
        body: formData
      })

      // if (!response.ok) {
      //   throw new Error("Failed to update profile")
      // }

      setProfile(editedProfile)
      setIsEditing(false)
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setEditedProfile(JSON.parse(JSON.stringify(profile)))
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editedProfile) return

    const { name, value } = e.target

    console.log(`Changing ${name} to ${value}`) // Debug log

    // Handle nested properties
    if (name === "username" || name === "location" || name === "bio" || name === "professionalTitle") {
      setEditedProfile({
        ...editedProfile,
        [name]: value,
      })
    } else if (name === "websiteUrl") {
      setEditedProfile({
        ...editedProfile,
        websiteUrl: value,
      })
    }
  }

  const handleBusinessInfoChange = (field: string, value: string) => {
    if (!editedProfile) return

    // Update the correct field based on the data structure
    if (field === "companyName") {
      setEditedProfile({
        ...editedProfile,
        serviceProviderData: {
          ...editedProfile.serviceProviderData,
          businessName: value,
        },
      })
    } else if (field === "email") {
      setEditedProfile({
        ...editedProfile,
        serviceProviderData: {
          ...editedProfile.serviceProviderData,
          email: value,
        },
      })
    } else if (field === "serviceType") {
      setEditedProfile({
        ...editedProfile,
        serviceProviderData: {
          ...editedProfile.serviceProviderData,
          nameOfServiceProvider: value,
        },
      })
    } else if (field === "companyWebsite") {
      setEditedProfile({
        ...editedProfile,
        serviceProviderData: {
          ...editedProfile.serviceProviderData,
          category: value,
        },
      })
    }
  }

  const handleSocialChange = (platform: string, value: string) => {
    if (!editedProfile) return

    console.log(`Changing social link ${platform} to ${value}`) // Debug log

    // Make sure we're updating the correct structure
    setEditedProfile({
      ...editedProfile,
      serviceProviderData: {
        ...editedProfile.serviceProviderData,
        companySocialLinks: {
          ...editedProfile.serviceProviderData?.companySocialLinks,
          [platform]: value,
        },
      },
    })
  }

  const handleCompanySocialChange = (platform: string, value: string) => {
    if (!editedProfile) return

    console.log(`Changing company social link ${platform} to ${value}`) // Debug log

    // Make sure we're updating the correct structure
    setEditedProfile({
      ...editedProfile,
      serviceProviderData: {
        ...editedProfile.serviceProviderData,
        companySocialLinks: {
          ...editedProfile.serviceProviderData?.companySocialLinks,
          [platform]: value,
        },
      },
    })
  }

  const handleEditTemp = () => {
    router.push('/profile/setup/serviceProvider')
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Skeleton className="h-48 w-full rounded-md bg-blue-600" />
        <div className="bg-[#121026] p-6 rounded-b-lg relative">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <Skeleton className="h-24 w-24 rounded-full -mt-12 border-4 border-[#121026] bg-gray-300" />
              <div className="space-y-2 mt-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
            <Skeleton className="h-10 w-28" />
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10 rounded" />
              <Skeleton className="h-10 w-10 rounded" />
              <Skeleton className="h-10 w-10 rounded" />
              <Skeleton className="h-10 w-10 rounded" />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>

            <Skeleton className="h-4 w-full mt-6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />

            <Skeleton className="h-6 w-48 mt-6" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>

            <Skeleton className="h-6 w-48 mt-6" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />

            <Skeleton className="h-6 w-48 mt-6" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10 rounded" />
              <Skeleton className="h-10 w-10 rounded" />
              <Skeleton className="h-10 w-10 rounded" />
              <Skeleton className="h-10 w-10 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 bg-[#121026] rounded-lg">
        <p className="text-white text-center">Failed to load profile data. Please try again later.</p>
      </div>
    )
  }

  // Determine which data structure to use for display
  const displayName = profile.username
  const displayJobTitle = profile.professionalTitle
  const displayAbout = profile.bio
  const displayImage = profile.profilePic?.file_url

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg" />
      <div className="bg-[#121026] p-6 rounded-b-lg relative">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="h-24 w-24 rounded-full -mt-12 border-4 border-[#121026] bg-gray-300 overflow-hidden">
              <img
                src={displayImage || "/placeholder.svg?height=96&width=96"}
                alt={displayName || "Profile"}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-1 mt-2">
              {isEditing ? (
                <Input
                  name="username"
                  value={editedProfile?.username || ""}
                  onChange={handleChange}
                  className="text-white font-bold text-2xl bg-[#1e1a3c] border-none"
                />
              ) : (
                <h1 className="text-white font-bold text-2xl">{displayName}</h1>
              )}
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <Input
                    name="professionalTitle"
                    value={editedProfile?.professionalTitle || ""}
                    onChange={handleChange}
                    className="text-gray-300 text-sm bg-[#1e1a3c] border-none"
                  />
                ) : (
                  <p className="text-gray-300">{displayJobTitle}</p>
                )}
                <span className="text-gray-300">•</span>
                <span className="text-gray-300 bg-[#1e1a3c] px-2 py-0.5 rounded text-sm">{profile.role}</span>
              </div>
            </div>
          </div>

          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={handleEditTemp}>
              <Pencil className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
          )}
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Input
                  placeholder="Twitter URL"
                  value={editedProfile?.serviceProviderData?.companySocialLinks?.twitter || ""}
                  onChange={(e) => handleSocialChange("twitter", e.target.value)}
                  className="hidden"
                />
                <Input
                  placeholder="LinkedIn URL"
                  value={editedProfile?.serviceProviderData?.companySocialLinks?.linkedin || ""}
                  onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                  className="hidden"
                />
                <Input
                  placeholder="GitHub URL"
                  value={editedProfile?.serviceProviderData?.companySocialLinks?.github || ""}
                  onChange={(e) => handleSocialChange("github", e.target.value)}
                  className="hidden"
                />
                <Input
                  placeholder="Instagram URL"
                  value={editedProfile?.serviceProviderData?.companySocialLinks?.instagram || ""}
                  onChange={(e) => handleSocialChange("instagram", e.target.value)}
                  className="hidden"
                />
                <Input
                  placeholder="Facebook URL"
                  value={editedProfile?.serviceProviderData?.companySocialLinks?.facebook || ""}
                  onChange={(e) => handleSocialChange("facebook", e.target.value)}
                  className="hidden"
                />
              </>
            ) : null}
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-md bg-[#1e1a3c] border-none">
              <Twitter className="h-5 w-5 text-white" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-md bg-[#1e1a3c] border-none">
              <Linkedin className="h-5 w-5 text-white" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-md bg-[#1e1a3c] border-none">
              <Instagram className="h-5 w-5 text-white" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-md bg-[#1e1a3c] border-none">
              <Facebook className="h-5 w-5 text-white" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="h-4 w-4" />
              {isEditing ? (
                <Input
                  name="location"
                  value={editedProfile?.location || ""}
                  onChange={handleChange}
                  className="text-gray-300 text-sm bg-[#1e1a3c] border-none"
                />
              ) : (
                <span>{profile.location}</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <Globe className="h-4 w-4" />
              {isEditing ? (
                <Input
                  name="websiteUrl"
                  value={editedProfile?.websiteUrl || ""}
                  onChange={handleChange}
                  className="text-gray-300 text-sm bg-[#1e1a3c] border-none"
                />
              ) : (
                <span>{profile.websiteUrl}</span>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-white text-lg font-semibold mb-2">About</h2>
            {isEditing ? (
              <Textarea
                name="bio"
                value={editedProfile?.bio || ""}
                onChange={handleChange}
                className="text-gray-300 bg-[#1e1a3c] border-none min-h-[100px]"
              />
            ) : (
              <p className="text-gray-300">{displayAbout}</p>
            )}
          </div>

          <div>
            <h2 className="text-white text-lg font-semibold mb-2">Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <Building2 className="h-4 w-4 flex-shrink-0" />
                {isEditing ? (
                  <Input
                    value={editedProfile?.serviceProviderData?.businessName || ""}
                    onChange={(e) => handleBusinessInfoChange("companyName", e.target.value)}
                    className="text-gray-300 bg-[#1e1a3c] border-none"
                  />
                ) : (
                  <span>{profile.serviceProviderData?.businessName}</span>
                )}
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="h-4 w-4 flex-shrink-0" />
                {isEditing ? (
                  <Input
                    value={editedProfile?.serviceProviderData?.email || ""}
                    onChange={(e) => handleBusinessInfoChange("email", e.target.value)}
                    className="text-gray-300 bg-[#1e1a3c] border-none"
                  />
                ) : (
                  <span>{profile.serviceProviderData?.email}</span>
                )}
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <Briefcase className="h-4 w-4 flex-shrink-0" />
                {isEditing ? (
                  <Input
                    value={editedProfile?.serviceProviderData?.nameOfServiceProvider || ""}
                    onChange={(e) => handleBusinessInfoChange("serviceType", e.target.value)}
                    className="text-gray-300 bg-[#1e1a3c] border-none"
                  />
                ) : (
                  <span>{profile.serviceProviderData?.nameOfServiceProvider}</span>
                )}
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <Globe className="h-4 w-4 flex-shrink-0" />
                {isEditing ? (
                  <Input
                    value={editedProfile?.serviceProviderData?.category || ""}
                    onChange={(e) => handleBusinessInfoChange("companyWebsite", e.target.value)}
                    className="text-gray-300 bg-[#1e1a3c] border-none"
                  />
                ) : (
                  <span>{profile.serviceProviderData?.category}</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-white text-lg font-semibold mb-2">Company Social Media</h2>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Input
                    placeholder="Company Twitter URL"
                    value={editedProfile?.serviceProviderData?.companySocialLinks?.twitter || ""}
                    onChange={(e) => handleCompanySocialChange("twitter", e.target.value)}
                    className="hidden"
                  />
                  <Input
                    placeholder="Company LinkedIn URL"
                    value={editedProfile?.serviceProviderData?.companySocialLinks?.linkedin || ""}
                    onChange={(e) => handleCompanySocialChange("linkedin", e.target.value)}
                    className="hidden"
                  />
                  <Input
                    placeholder="Company Instagram URL"
                    value={editedProfile?.serviceProviderData?.companySocialLinks?.instagram || ""}
                    onChange={(e) => handleCompanySocialChange("instagram", e.target.value)}
                    className="hidden"
                  />
                  <Input
                    placeholder="Company Facebook URL"
                    value={editedProfile?.serviceProviderData?.companySocialLinks?.facebook || ""}
                    onChange={(e) => handleCompanySocialChange("facebook", e.target.value)}
                    className="hidden"
                  />
                </>
              ) : null}
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-md bg-[#1e1a3c] border-none">
                <Twitter className="h-5 w-5 text-white" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-md bg-[#1e1a3c] border-none">
                <Linkedin className="h-5 w-5 text-white" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-md bg-[#1e1a3c] border-none">
                <Instagram className="h-5 w-5 text-white" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-md bg-[#1e1a3c] border-none">
                <Facebook className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

