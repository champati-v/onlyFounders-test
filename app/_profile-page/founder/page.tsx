"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Globe, Pencil, Twitter, Linkedin, Github } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"

interface FounderProfile {
  id: string
  name: string
  role: string
  jobTitle: string
  location: string
  website: string
  about: string
  web3Experience: {
    level: string
    years: string
  }
  profileImage: string
  bannerImage: string
  socialLinks: {
    twitter: string
    linkedin: string
    github: string
  }
  username: string
  professionalTitle: string
  bio: string
  founderData: {
    socialLinks: {
      website: string
      twitter: string
      linkedin: string
      github: string
    }
    skills: string[]
    experienceLevel: string
  }
}

export default function FounderProfilePage() {
  const [profile, setProfile] = useState<FounderProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<FounderProfile | null>(null)
  const { toast } = useToast()
  const { user, isUserLoading } = useUser()
  const router = useRouter()



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
  
        if (!user || isUserLoading) return; // Wait until user is fully loaded
        const userId = user?.sub?.substring(14);
  
        if (!userId) {
          toast({
            title: "Authentication error",
            description: "Please sign in again to continue.",
            variant: "destructive",
          });
          router.push("/api/auth/login");
          return;
        }
        
        const response = await fetch("https://ofStaging.azurewebsites.net/api/profile/get-profile", {
          method: "GET",
          headers: {
            "user_id": String(userId), // Ensure it's a string
          },
        });
  
        if (!response.ok) {
          console.error("Response Error:", response.status, await response.text());
          // throw new Error("Failed to fetch profile data");
        }
  
        const data = await response.json();
        setProfile(data);
        setEditedProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    if (user && !isUserLoading) {
      fetchProfile();
    }
  }, [user]); // Removed isUserLoading to prevent unnecessary re-renders
  

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
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
           if (profile?.profile_pic_file) {
             formData.append("profile_pic_file", profile?.profile_pic_file)
           }
     
           // Parse skills into array
           const skillsArray = editedProfile?.founderData.skills
     
        
           const founderData = {
             experienceLevel: editedProfile?.experienceLevel,
             skills: skillsArray,
             socialLinks: {
               Twitter: profile?.founderData?.socialLinks?.twitter,
               github: profile?.founderData?.socialLinks?.github,
               LinkedIn: profile?.founderData?.socialLinks?.linkedin,
               website: profile?.founderData?.socialLinks?.website,
             },
           }
     
           // Append founderData as JSON string
           formData.append("founderData", JSON.stringify(founderData))

      const response = await fetch("https://ofstaging.azurewebsites.net/api/profile/submit-personal-details", {
        method: "POST",
        headers: {
          user_id: userId,
        },
        body: formData,
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
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editedProfile) return

    const { name, value } = e.target

    // Handle nested properties
    if (name === "username" || name === "location" || name === "bio" || name === "professionalTitle") {
      setEditedProfile({
        ...editedProfile,
        [name]: value,
      })
    } else if (name === "website") {
      setEditedProfile({
        ...editedProfile,
        founderData: {
          ...editedProfile.founderData,
          socialLinks: {
            ...editedProfile.founderData.socialLinks,
            website: value,
          },
        },
      })
    }
  }

  const handleSkillChange = (index: number, value: string) => {
    if (!editedProfile) return

    const updatedSkills = [...editedProfile.founderData.skills]
    updatedSkills[index] = value

    setEditedProfile({
      ...editedProfile,
      founderData: {
        ...editedProfile.founderData,
        skills: updatedSkills,
      },
    })
  }

  const handleExperienceChange = (field: string, value: string) => {
    if (!editedProfile) return

    setEditedProfile({
      ...editedProfile,
      founderData: {
        ...editedProfile.founderData,
        experienceLevel: value,
      },
    })
  }

  const handleSocialChange = (platform: string, value: string) => {
    if (!editedProfile) return

    setEditedProfile({
      ...editedProfile,
      founderData: {
        ...editedProfile.founderData,
        socialLinks: {
          ...editedProfile.founderData.socialLinks,
          [platform]: value,
        },
      },
    })
  }

  const handleEditTemp = () => {
    router.push('/profile/setup/founder')
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-10">
        <Skeleton className="h-48 w-full rounded-md bg-blue-600" />
        <div className="bg-[#121026] p-6 rounded-b-lg relative">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <Skeleton className="h-24 w-24 rounded-full -mt-12 border-4 border-[#121026] bg-gray-300" />
              <div className="space-y-2 mt-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <Skeleton className="h-10 w-28" />
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex gap-2">
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
            <Skeleton className="h-10 w-32 rounded-full" />

            <Skeleton className="h-6 w-48 mt-6" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-48 rounded-full" />
              <Skeleton className="h-10 w-48 rounded-full" />
              <Skeleton className="h-10 w-48 rounded-full" />
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

  return (
    <div className="w-full max-w-4xl mx-auto p-10">
      <div
        className="h-48 w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg"
      />
      <div className="bg-[#121026] p-6 rounded-b-lg relative">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="h-24 w-24 rounded-full -mt-12 border-4 border-[#121026] bg-gray-300 overflow-hidden">
              <img
                src={profile.profilePic.file_url || "/placeholder.svg?height=96&width=96"}
                alt={profile.username}
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
                <h1 className="text-white font-bold text-2xl">{profile.username}</h1>
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
                  <p className="text-gray-300">{profile.professionalTitle}</p>
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
                  value={editedProfile?.founderData?.socialLinks?.twitter || ""}
                  onChange={(e) => handleSocialChange("twitter", e.target.value)}
                  className="hidden"
                />
                <Input
                  placeholder="LinkedIn URL"
                  value={editedProfile?.founderData?.socialLinks?.linkedin || ""}
                  onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                  className="hidden"
                />
                <Input
                  placeholder="GitHub URL"
                  value={editedProfile?.founderData?.socialLinks?.github || ""}
                  onChange={(e) => handleSocialChange("github", e.target.value)}
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
              <Github className="h-5 w-5 text-white" />
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
                  name="website"
                  value={editedProfile?.founderData?.socialLinks?.website || ""}
                  onChange={handleChange}
                  className="text-gray-300 text-sm bg-[#1e1a3c] border-none"
                />
              ) : (
                <span>{profile.founderData?.socialLinks?.website}</span>
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
              <p className="text-gray-300">{profile.bio}</p>
            )}
          </div>

          <div>
            <h2 className="text-white text-lg font-semibold mb-2">Web3 Experience</h2>
            {isEditing ? (
              <div className="flex gap-2 items-center">
                <Input
                  value={editedProfile?.founderData.experienceLevel || ""}
                  onChange={(e) => handleExperienceChange("level", e.target.value)}
                  className="text-gray-300 bg-[#1e1a3c] border-none"
                />
                {/* <Input
                  value={editedProfile?.web3Experience.years || ""}
                  onChange={(e) => handleExperienceChange("years", e.target.value)}
                  className="text-gray-300 bg-[#1e1a3c] border-none"
                /> */}
              </div>
            ) : (
              <Badge variant="outline" className="bg-[#3d3654] text-white border-none px-4 py-2 rounded-full">
                {profile.founderData.experienceLevel}
              </Badge>
            )}
          </div>

          <div>
            <h2 className="text-white text-lg font-semibold mb-2">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {isEditing
                ? editedProfile?.founderData.skills.map((skill, index) => (
                    <Input
                      key={index}
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="text-gray-300 bg-[#1e1a3c] border-none w-auto"
                    />
                  ))
                : profile.founderData.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-[#3d3654] text-white border-none px-4 py-2 rounded-full"
                    >
                      {skill}
                    </Badge>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

