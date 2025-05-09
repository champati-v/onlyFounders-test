"use client"

import { API_URL } from '@/lib/config';
import { useState, useEffect } from "react"
import Image from "next/image"
import { Twitter, Github, Linkedin } from 'lucide-react'
import { useUser } from "@auth0/nextjs-auth0/client"

interface TeamMember {
  _id: string
  fullName: string
  title: string
  profilePicture: {
    file_name: string
    file_url: string
    _id: string
  }
  shortBio: string
  socialLinks: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

interface TeamTabProps {
  campaign: any // Using any for now as the full type is defined in the parent component
}

export function TeamTab({ campaign }: TeamTabProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useUser()

  useEffect(() => {
    const fetchTeamDetails = async () => {
      setIsLoading(true)
      try {
        // Get user ID for the API request header
        const userId = user?.sub?.substring(14) || "guest-user"

        const response = await fetch(`${API_URL}/api/startup/get-team-details`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            user_id: userId,
          },
          body: JSON.stringify({ campaignId: campaign._id }),
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch team details: ${response.status}`)
        }

        const data = await response.json()
        setTeamMembers(data.team || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch team details")
        console.error("Error fetching team details:", err)
        // Use placeholder data if API fails
        setTeamMembers([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeamDetails()
  }, [campaign._id, user])

  // Placeholder team members if API returns empty or fails
  // const placeholderTeam = [
  //   {
  //     _id: "1",
  //     fullName: "Alex Johnson",
  //     title: "Founder & CEO",
  //     shortBio: "Experienced blockchain professional with a passion for decentralized technologies.",
  //     profilePicture: {
  //       file_url: "/diverse-person.png",
  //       file_name: "person1.png",
  //       _id: "1",
  //     },
  //     socialLinks: {
  //       twitter: "#",
  //       linkedin: "#",
  //       github: "#",
  //     },
  //   },
  //   {
  //     _id: "2",
  //     fullName: "Sarah Chen",
  //     title: "CTO",
  //     shortBio: "Blockchain architect with 8+ years of experience in smart contract development.",
  //     profilePicture: {
  //       file_url: "/diverse-group-two.png",
  //       file_name: "person2.png",
  //       _id: "2",
  //     },
  //     socialLinks: {
  //       twitter: "#",
  //       linkedin: "#",
  //       github: "#",
  //     },
  //   },
  // ]

  // Use API data if available, otherwise use placeholder
  const displayTeam = teamMembers.length > 0 ? teamMembers : []

  return (
    <div className="bg-[#0c1425] rounded-lg p-4 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
      <h3 className="text-lg sm:text-xl font-bold mb-2">Team Members</h3>
      <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">Meet the team behind {campaign.campaignName}</p>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-[#4361ff] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <p className="ml-2 text-gray-400">Loading team details...</p>
        </div>
      ) : error && displayTeam.length === 0 ? (
        <div className="text-center py-8 bg-[#0f1a2c] rounded-lg">
          <p className="text-red-400 mb-2">{error}</p>
          <p className="text-gray-400 text-sm">Unable to load team information.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayTeam.map((member, index) => (
            <div
              key={member._id || index}
              className="bg-[#0f1a2c] rounded-lg p-4 sm:p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-[#5b5bf8]/20 flex items-center justify-center">
                  <Image
                    src={member.profilePicture?.file_url || "/placeholder.svg?height=48&width=48&query=person"}
                    alt={member.fullName}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base">{member.fullName}</h4>
                  <p className="text-[#39e7f5] text-xs sm:text-sm">{member.title}</p>
                </div>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm mb-4">{member.shortBio}</p>
              <div className="flex gap-3">
                {member.socialLinks?.twitter && (
                  <a
                    href={member.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Twitter size={16} />
                  </a>
                )}
                {member.socialLinks?.github && (
                  <a
                    href={member.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github size={16} />
                  </a>
                )}
                {member.socialLinks?.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && displayTeam.length === 0 && !error && (
        <div className="text-center py-8 bg-[#0f1a2c] rounded-lg">
          <p className="text-gray-400">No team members have been added to this campaign yet.</p>
        </div>
      )}
    </div>
  )
}
