"use client";

import { API_URL } from '@/lib/config';
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Globe, Twitter, Linkedin, Github, Building2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface FounderProfile {
    _id: string;
    user_id: string;
    role: string[]; // Array of roles
    bio: string;
    location: string;
    professionalTitle: string;
    username: string;
    profilePic: {
      file_name: string;
      file_url: string;
      _id: string;
    };
    status: string;
    bannerImage: {
      file_name: string;
      file_url: string;
      _id: string;
    };
    completedStatus: boolean;
    founderData: {
      skills: string[];
      experienceLevel: string; 
      socialLinks: Record<string, string>; 
      completedStatus: string; 
      watchList: any[]; 
      _id: string;
      recentActivity: any[]; 
      createdAt: string; 
      updatedAt: string; 
      companyName: string;
    };
    startup_id: string | null;
}

export default function FounderProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const [profile, setProfile] = useState<FounderProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user, isLoading } = useUser();
  const userId = user?.sub?.substring(14);
  const founderId = params.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsProfileLoading(true);

        if (!user) {
          return;
        }

        const response = await fetch(
          `${API_URL}/api/network/get-profile-data/${founderId}/Founder`,
          {
            method: "GET",
            headers: {
              user_id: userId,
            },
          }
        );

        if (!response.ok) {
          console.error(
            "Response Error:",
            response.status,
            await response.text()
          );
          // throw new Error("Failed to fetch founder data")
        }

        const data = await response.json();
        setProfile(data.profile);

      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load founder data",
          variant: "destructive",
        });
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (isProfileLoading || isLoading) {
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
    );
  }

  if (!profile) {
    return;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-10">
      <Button
        variant={"outline"}
        className="mb-4 flex items-center gap-1"
        onClick={() => router.push("/network")}
      >
        <ArrowLeft /> Back to Network
      </Button>

      <img
        src={profile.bannerImage.file_url}
        alt="Profile banner"
        className="h-48 w-full object-cover rounded-t-lg"
      />
      <div className="bg-[#121026] p-6 rounded-b-lg relative">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="h-20 w-20 md:h-24 md:w-24 rounded-full -mt-12 border-4 border-[#121026] bg-gray-300 overflow-hidden">
              <img
                src={
                  profile.profilePic.file_url ||
                  "/placeholder.svg?height=96&width=96" ||
                  "/placeholder.svg"
                }
                alt={profile.username}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-1 mt-2">
              <h1 className="text-white font-bold text-lg md:text-2xl">
                {profile.username}
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-gray-300 text-sm md:text-lg">
                  {profile.professionalTitle}
                </p>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300 bg-[#1e1a3c] px-2 py-0.5 rounded text-sm">
                  {profile.role}
                </span>
              </div>
              <div className="mt-1">
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
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex gap-2">
            {profile.founderData?.socialLinks?.Twitter && (
              <a
                href={profile.founderData.socialLinks.Twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:bg-gray-700 h-10 w-10 border border-gray-700 rounded-md bg-[#1e1a3c] border-none"
              >
                <Twitter className="h-5 w-5 text-white" />
              </a>
            )}
            {profile.founderData?.socialLinks?.LinkedIn && (
              <a
                href={profile.founderData.socialLinks.LinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:bg-gray-700 h-10 w-10 border border-gray-700 rounded-md bg-[#1e1a3c] border-none"
              >
                <Linkedin className="h-5 w-5 text-white" />
              </a>
            )}
            {profile.founderData?.socialLinks?.github && (
              <a
                href={profile.founderData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:bg-gray-700 h-10 w-10 border border-gray-700 rounded-md bg-[#1e1a3c] border-none"
              >
                <Github className="h-5 w-5 text-white" />
              </a>
            )}
            {profile.founderData?.socialLinks?.website && (
              <a
                href={profile.founderData.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:bg-gray-700 h-10 w-10 border border-gray-700 rounded-md bg-[#1e1a3c] border-none"
              >
                <Globe className="h-5 w-5 text-white" />
              </a>
            )}
          </div>

          <div className="space-y-2">
            {profile.location && (
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
            )}

            {profile.founderData?.socialLinks?.website && (
              <div className="flex items-center gap-2 text-gray-300">
                <Globe className="h-4 w-4" />
                <a className="hover:underline" href={profile.founderData.socialLinks.website} target="_blank">{profile.founderData.socialLinks.website}</a>
              </div>
            )}

            {profile.founderData?.companyName && (
              <div className="flex items-center gap-2 text-gray-300">
                <Building2 className="h-4 w-4" />
                <span>{profile.founderData.companyName}</span>
              </div>
            )}
          </div>

          {profile.bio && (
            <div>
              <h2 className="text-white text-lg font-semibold mb-2">About</h2>
              <p className="text-gray-300">{profile.bio}</p>
            </div>
          )}

          {profile.founderData?.experienceLevel && (
            <div>
              <h2 className="text-white text-lg font-semibold mb-2">
                Web3 Experience
              </h2>
              <Badge
                variant="outline"
                className="bg-[#3d3654] text-white border-none px-4 py-2 rounded-full"
              >
                {profile.founderData.experienceLevel}
              </Badge>
            </div>
          )}

          {profile.founderData?.skills &&
            profile.founderData.skills.length > 0 && (
              <div>
                <h2 className="text-white text-lg font-semibold mb-2">
                  Skills & Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.founderData.skills.map((skill, index) => (
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
            )}
        </div>
      </div>
    </div>
  );
}
