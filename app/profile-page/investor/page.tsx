"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Pencil, Twitter, Linkedin, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

interface InvestorProfile {
  id: string;
  username: string;
  bio: string;
  name: string;
  website: string;
  role: string;
  jobTitle: string;
  companyType: string;
  location: string;
  professionalTitle: string;
  about: string;
  status: string;
  investorData: {
    investorType: string;
    investmentExperience: string;
    investmentInterest: string[];
    socialLinks: {
      Twitter: string;
      linkedin: string;
      website: string;
    };
  };
  profilePic: {
    file_url: string;
  };
  web3Experience: {
    level: string;
    years: string;
  };
  investmentPreferences: string[];
  investmentInterests: string[];
  investmentInterest: string;
  profileImage: string;
  bannerImage: {
    file_url: string;
  };
}

export default function InvestorProfilePage() {
  const [profile, setProfile] = useState<InvestorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<InvestorProfile | null>(
    null
  );
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

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

        const response = await fetch(
          "https://onlyfounders.azurewebsites.net/api/profile/get-profile",
          {
            method: "GET",
            headers: {
              user_id: String(userId), // Ensure it's a string
            },
          }
        );

        if (!response.ok) {
          console.error(
            "Response Error:",
            response.status,
            await response.text()
          );
          // throw new Error("Failed to fetch profile data")
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

    fetchProfile();
  }, [user, isUserLoading, toast, router]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const userId = user?.sub?.substring(14);

      if (!userId) {
        toast({
          title: "Authentication error",
          description: "Please sign in again to continue.",
          variant: "destructive",
        });
        router.push("/login");
        return;
      }

      const formData = new FormData();
      // Add profile data
      formData.append("professionalTitle", editedProfile?.professionalTitle);
      formData.append("location", editedProfile?.location);
      formData.append("bio", editedProfile?.bio);
      formData.append("username", editedProfile?.username);

      // Add profile picture if available
      if (profile?.profilePic) {
        formData.append("profilePic", profile?.profilePic);
      }

      const investorData = {
        investmentExperience: editedProfile?.investorData.investmentExperience,
        investmentInterests: editedProfile?.investorData.investmentInterest,
        socialLinks: {
          Twitter: profile?.investorData?.socialLinks?.twitter,
          github: profile?.investorData?.socialLinks?.github,
          LinkedIn: profile?.investorData?.socialLinks?.linkedin,
          website: profile?.investorData?.socialLinks?.website,
        },
      };

      // Append founderData as JSON string
      formData.append("founderData", JSON.stringify(investorData));

      const response = await fetch(
        "https://onlyfounders.azurewebsites.net/api/profile/submit-personal-details",
        {
          method: "POST",
          headers: {
            user_id: userId,
          },
          body: formData,
        }
      );

      // if (!response.ok) {
      //   throw new Error("Failed to update profile")
      // }

      console.log(JSON.stringify(formData));
      setProfile(editedProfile);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editedProfile) return;

    const { name, value } = e.target;

    // Handle different field types
    if (
      name === "username" ||
      name === "location" ||
      name === "bio" ||
      name === "professionalTitle"
    ) {
      setEditedProfile({
        ...editedProfile,
        [name]: value,
      });
    } else if (name === "website") {
      setEditedProfile({
        ...editedProfile,
        socialLinks: {
          ...editedProfile.socialLinks,
          website: value,
        },
      });
    } else if (name === "investorType") {
      setEditedProfile({
        ...editedProfile,
        investorData: {
          ...editedProfile.investorData,
          investorType: value,
        },
      });
    }
  };

  const handlePreferenceChange = (index: number, value: string) => {
    if (!editedProfile?.investorData?.investmentInterest) return;

    const updatedInterests = [...editedProfile.investorData.investmentInterest];
    updatedInterests[index] = value;

    setEditedProfile({
      ...editedProfile,
      investorData: {
        ...editedProfile.investorData,
        investmentInterest: updatedInterests,
      },
    });
  };

  const handleExperienceChange = (field: string, value: string) => {
    if (!editedProfile) return;

    setEditedProfile({
      ...editedProfile,
      investorData: {
        ...editedProfile.investorData,
        investmentExperience: value,
      },
    });
  };

  const handleSocialChange = (platform: string, value: string) => {
    if (!editedProfile) return;

    setEditedProfile({
      ...editedProfile,
      socialLinks: {
        ...editedProfile.socialLinks,
        [platform]: value,
      },
    });
  };

  const handleEditTemp = () => {
    router.push("/profile/setup/");
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 my-12">
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
            <Skeleton className="h-10 w-32 rounded-full" />

            <Skeleton className="h-6 w-48 mt-6" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 bg-[#121026] rounded-lg">
        <p className="text-white text-center">
          Failed to load profile data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-4">
      <img
        src={
          profile.bannerImage?.file_url ||
          "/placeholder.svg?height=192&width=896&query=profile banner"
        }
        alt="Profile banner"
        className="h-48 w-full object-cover rounded-t-lg"
      />
      <div className="bg-[#121026] p-6 rounded-b-lg relative">
        <div className="flex justify-between items-start">
          <div className="flex items-center md:items-start gap-4">
            <div className="absolute md:relative -top-[60px] md:top-0 rounded-full -ml-0 border-4 border-[#121026] bg-gray-300 overflow-hidden">
              <img
                src={
                  profile.profilePic?.file_url ||
                  "/placeholder.svg?height=96&width=96"
                }
                alt={profile.username || "Investor"}
                className="h-20 w-20 object-cover aspect-square"
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
                <h1 className="text-white font-bold text-lg">
                  {profile.username}
                </h1>
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
              
                {isEditing ? (
                  <Input
                    name="investorType"
                    value={editedProfile?.investorData?.investorType || ""}
                    onChange={handleChange}
                    className="text-gray-300 text-sm bg-[#1e1a3c] border-none"
                  />
                ) : (
                  <span className="text-gray-300">
                    {profile.investorData?.investorType}
                  </span>
                )}
                <Badge
                  variant="outline"
                  className={`text-white border-none px-2 py-0.5 rounded ${
                    profile.status === "Verified"
                      ? "bg-green-700"
                      : "bg-yellow-700"
                  }`}
                >
                  {profile.status}
                </Badge>
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
              <Pencil className="h-4 w-4 mr-0 md:mr-2 " />{" "}
              <span className="hidden md:block">Edit Profile</span>
            </Button>
          )}
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Input
                  placeholder="Twitter URL"
                  value={editedProfile?.socialLinks?.twitter || ""}
                  onChange={(e) =>
                    handleSocialChange("twitter", e.target.value)
                  }
                  className="hidden"
                />
                <Input
                  placeholder="LinkedIn URL"
                  value={editedProfile?.socialLinks?.linkedin || ""}
                  onChange={(e) =>
                    handleSocialChange("linkedin", e.target.value)
                  }
                  className="hidden"
                />
                <Input
                  placeholder="GitHub URL"
                  value={editedProfile?.socialLinks?.github || ""}
                  onChange={(e) => handleSocialChange("github", e.target.value)}
                  className="hidden"
                />
              </>
            ) : null}
            <a
              href={profile.investorData.socialLinks.Twitter}
              target="_blank"
              className="flex items-center justify-center h-10 w-10 rounded-md bg-[#1e1a3c] border-none"
            >
              <Twitter className="h-5 w-5 text-white" />
            </a>
            <a
              href={profile.investorData.socialLinks.Linkedin}
              target="_blank"
              className="flex items-center justify-center h-10 w-10 rounded-md bg-[#1e1a3c] border-none"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
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
            <h2 className="text-white text-lg font-semibold mb-2">
              Web3 Experience
            </h2>
            {isEditing ? (
              <div className="flex gap-2 items-center">
                <Input
                  value={
                    editedProfile?.investorData?.investmentExperience || ""
                  }
                  onChange={(e) =>
                    handleExperienceChange("level", e.target.value)
                  }
                  className="text-gray-300 bg-[#1e1a3c] border-none"
                />
              </div>
            ) : (
              <Badge
                variant="outline"
                className="bg-[#3d3654] text-white border-none px-4 py-2 rounded-full"
              >
                {profile.investorData?.investmentExperience}
              </Badge>
            )}
          </div>

          <div>
            <h2 className="text-white text-lg font-semibold mb-2">
              Investment Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {isEditing && editedProfile?.investorData?.investmentInterest
                ? editedProfile.investorData.investmentInterest.map(
                    (interest, index) => (
                      <Input
                        key={index}
                        value={interest}
                        onChange={(e) =>
                          handlePreferenceChange(index, e.target.value)
                        }
                        className="text-gray-300 bg-[#1e1a3c] border-none w-auto"
                      />
                    )
                  )
                : profile.investorData?.investmentInterest?.map(
                    (interest, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-[#3d3654] text-white border-none px-4 py-2 rounded-full"
                      >
                        {interest}
                      </Badge>
                    )
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
