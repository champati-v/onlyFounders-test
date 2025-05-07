"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MapPin, Globe, Twitter, Linkedin, Github, Pencil, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@auth0/nextjs-auth0/client"

interface ProfilePic {
  file_name: string
  file_url: string
  _id: string
}

interface SocialLinks {
  Linkedin?: string
  Twitter?: string
  [key: string]: string | undefined
}

interface InvestorData {
  investorType: string
  investmentExperience: string
  minInvestment: number
  maxInvestment: number
  investmentInterest: string[]
  socialLinks: SocialLinks
  completedStatus: string
  watchList: any[]
  _id: string
  recentActivity: any[]
  createdAt: string
  updatedAt: string
}

interface ProfileData {
  _id: string
  user_id: string
  role: string
  status: string
  completedStatus: boolean
  createdAt: string
  updatedAt: string
  __v: number
  bio: string
  location: string
  professionalTitle: string
  profilePic: ProfilePic
  username: string
  investorData: InvestorData
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Partial<ProfileData>>({})
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { user, isLoading: authLoading } = useUser()
  
  const userId = user?.sub?.substring(14);
  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true); // Set loading state before making the API call
      try {
        if (!user || authLoading) {
          return;
        }
  
        const response = await fetch("https://ofStaging.azurewebsites.net/api/profile/get-profile", {
          headers: {
            user_id: userId,
          },
        });

        // if (!response.ok) {
        //   throw new Error("Failed to fetch profile data");
        // }

        const data = await response.json();
        setProfileData(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false); // Set loading state to false after the data is fetched
      }
    };
  
    fetchProfileData();
  }, [user, authLoading]);

  const handleEditClick = () => {
    setFormData(profileData || {});
    setPreviewUrl(profileData?.profilePic?.file_url || null);
    setIsEditDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSelectChange = (value: string, name: string) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      investorData: {
        ...(prev as any).investorData,
        socialLinks: {
          ...(prev as any).investorData?.socialLinks,
          [name]: value,
        },
      },
    }))
  }

  const handleInvestmentInterestChange = (interest: string) => {
    const currentInterests = formData?.investorData?.investmentInterest || []
    let newInterests

    if (currentInterests.includes(interest)) {
      newInterests = currentInterests.filter((i) => i !== interest)
    } else {
      newInterests = [...currentInterests, interest]
    }

    setFormData((prev) => ({
      ...prev,
      investorData: {
        ...(prev as any).investorData,
        investmentInterest: newInterests,
      },
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Create FormData object
      const formDataToSend = new FormData();
  
      // Add all profile data fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "profilePic" && key !== "investorData") {
          formDataToSend.append(key, String(value));
        }
      });
  
      // Add investor data fields
      if (formData.investorData) {
        Object.entries(formData.investorData).forEach(([key, value]) => {
          if (key === "socialLinks") {
            // Handle social links object
            Object.entries(value as SocialLinks).forEach(([socialKey, socialValue]) => {
              formDataToSend.append(`investorData.socialLinks.${socialKey}`, socialValue || "");
            });
          } else if (key === "investmentInterest") {
            // Handle investment interests array
            (value as string[]).forEach((interest, index) => {
              formDataToSend.append(`investorData.investmentInterest[${index}]`, interest);
            });
          } else {
            formDataToSend.append(`investorData.${key}`, String(value));
          }
        });
      }
  
      // Add profile image if changed
      if (profileImage) {
        formDataToSend.append("profilePic", profileImage);
      } else if (profileData?.profilePic) {
        // Include existing profile picture if not changed
        formDataToSend.append("profilePic", JSON.stringify(profileData.profilePic));
      }
  
      if (!user || authLoading) {
        return;
      }
  
      const response = await fetch("https://onlyfounders.azurewebsites.net/api/profile/submit-personal-details", {
        headers: {
          user_id: userId,
        },
        method: "POST",
        body: formDataToSend,
      });
  
      // if (!response.ok) {
      //   throw new Error("Failed to update profile");
      // }
  
      const updatedData = await response.json();
      setProfileData(updatedData);
      setIsEditDialogOpen(false);
  
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading profile...</span>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load profile data</p>
      </div>
    )
  }

  const formatInvestmentRange = (min: number, max: number) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`
  }

  const getExperienceLabel = (experience: string) => {
    switch (experience) {
      case "beginner":
        return "Beginner (< 1 year)"
      case "intermediate":
        return "Experienced (3-5 years)"
      case "advanced":
        return "Advanced (5+ years)"
      default:
        return experience
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="absolute bottom-0 left-6 transform translate-y-1/2">
          <div className="h-24 w-24 rounded-full bg-gray-200 border-4 border-background overflow-hidden">
            {profileData.profilePic?.file_url ? (
              <img
                src={profileData.profilePic.file_url || "/placeholder.svg"}
                alt={profileData.username}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-300">
                <span className="text-2xl font-bold text-gray-600">{profileData.username?.charAt(0) || "U"}</span>
              </div>
            )}
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="sm"
            className="bg-background hover:bg-background/90"
            onClick={handleEditClick}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h1 className="text-2xl font-bold">{profileData.username}</h1>
              <p className="text-muted-foreground">{profileData.professionalTitle}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">{profileData.role}</Badge>
                {profileData.investorData?.investorType && (
                  <Badge variant="outline" className="capitalize">
                    {profileData.investorData.investorType} Investor
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {profileData.investorData?.socialLinks?.Twitter && (
                <a
                  href={
                    profileData.investorData.socialLinks.Twitter.startsWith("http")
                      ? profileData.investorData.socialLinks.Twitter
                      : `https://${profileData.investorData.socialLinks.Twitter}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-md bg-black flex items-center justify-center text-white hover:opacity-90"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {profileData.investorData?.socialLinks?.Linkedin && (
                <a
                  href={
                    profileData.investorData.socialLinks.Linkedin.startsWith("http")
                      ? profileData.investorData.socialLinks.Linkedin
                      : `https://${profileData.investorData.socialLinks.Linkedin}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-md bg-blue-600 flex items-center justify-center text-white hover:opacity-90"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              <a
                href="#"
                className="h-10 w-10 rounded-md bg-gray-800 flex items-center justify-center text-white hover:opacity-90"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>

            <div className="space-y-2">
              {profileData.location && (
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{profileData.location}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">About</h2>
              <p className="text-muted-foreground">{profileData.bio}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Web3 Experience</h2>
              <div>
                <Badge variant="outline" className="px-4 py-2 rounded-full text-sm bg-muted">
                  {getExperienceLabel(profileData.investorData?.investmentExperience || "")}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Investment Preferences</h2>
              <div>
                <Badge variant="outline" className="px-4 py-2 rounded-full text-sm bg-muted">
                  {formatInvestmentRange(
                    profileData.investorData?.minInvestment || 0,
                    profileData.investorData?.maxInvestment || 0,
                  )}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Investment Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profileData.investorData?.investmentInterest?.map((interest, index) => (
                  <Badge key={index} className="px-4 py-2 rounded-full text-sm bg-blue-600 text-white capitalize">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">{/* Additional content can be added here */}</div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="profilePic">Profile Picture</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full overflow-hidden bg-muted">
                    {previewUrl ? (
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-300">
                        <span className="text-2xl font-bold text-gray-600">
                          {profileData.username?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                  </div>
                  <Input id="profilePic" type="file" accept="image/*" onChange={handleImageChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Name</Label>
                <Input id="username" name="username" value={formData.username || ""} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="professionalTitle">Professional Title</Label>
                <Input
                  id="professionalTitle"
                  name="professionalTitle"
                  value={formData.professionalTitle || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={formData.location || ""} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" rows={4} value={formData.bio || ""} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="investorType">Investor Type</Label>
                <Select
                  value={formData.investorData?.investorType || ""}
                  onValueChange={(value) => handleSelectChange(value, "investorData.investorType")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select investor type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="institutional">Institutional</SelectItem>
                    <SelectItem value="angel">Angel</SelectItem>
                    <SelectItem value="vc">Venture Capital</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="investmentExperience">Investment Experience</Label>
                <Select
                  value={formData.investorData?.investmentExperience || ""}
                  onValueChange={(value) => handleSelectChange(value, "investorData.investmentExperience")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner ({"<"} 1 year)</SelectItem>
                    <SelectItem value="Intermediate">Experienced (3-5 years)</SelectItem>
                    <SelectItem value="Advanced">Advanced (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minInvestment">Min Investment ($)</Label>
                  <Input
                    id="minInvestment"
                    name="investorData.minInvestment"
                    type="number"
                    value={formData.investorData?.minInvestment || 0}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxInvestment">Max Investment ($)</Label>
                  <Input
                    id="maxInvestment"
                    name="investorData.maxInvestment"
                    type="number"
                    value={formData.investorData?.maxInvestment || 0}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Investment Interests</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["defi", "infrastructure", "privacy", "nft", "gaming", "dao"].map((interest) => (
                    <Badge
                      key={interest}
                      variant={formData.investorData?.investmentInterest?.includes(interest) ? "default" : "outline"}
                      className="px-3 py-1 cursor-pointer capitalize"
                      onClick={() => handleInvestmentInterestChange(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="Linkedin"
                  value={formData.investorData?.socialLinks?.Linkedin || ""}
                  onChange={handleSocialLinkChange}
                  placeholder="linkedin.com/in/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  name="Twitter"
                  value={formData.investorData?.socialLinks?.Twitter || ""}
                  onChange={handleSocialLinkChange}
                  placeholder="twitter.com/username"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

