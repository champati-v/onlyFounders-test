"use client"

import { useParams } from "next/navigation"
import { Badge, Calendar, CalendarDays, MessageCircle, ThumbsUp } from "lucide-react"
import { API_URL } from "@/lib/config"
import { PageLayout } from "../../../layout/page-layout"
import { useEffect, useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@radix-ui/react-separator"
import axios from "axios"

// Mock updates data for each campaign
const campaignUpdatesData = {
  "onlyfounder-cyan": [
    {
      id: 1,
      title: "Project Launch Announcement",
      date: "Apr 10, 2025",
      content:
        "We're excited to announce the official launch of OnlyFounder Cyan! After months of development, we're ready to share our vision with the world. Our platform aims to bridge knowledge and finance through decentralization, creating new opportunities for founders and investors alike.",
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      title: "First Milestone Completed",
      date: "Apr 15, 2025",
      content:
        "We're proud to announce that we've completed our first milestone ahead of schedule! The team has successfully validated our problem-solution fit through extensive customer interviews and market research. We've collected over 250 wallet addresses from interested users, demonstrating strong early interest in our platform.",
      likes: 42,
      comments: 15,
    },
  ],
  decentravault: [
    {
      id: 1,
      title: "DecentraVault Beta Launch",
      date: "Mar 15, 2025",
      content:
        "Today marks the official beta launch of DecentraVault! Our decentralized storage solution is now available for early adopters. During this beta phase, we're offering 50GB of free storage to all users who sign up and provide feedback on their experience.",
      likes: 56,
      comments: 23,
    },
    {
      id: 2,
      title: "Security Audit Completed",
      date: "Mar 25, 2025",
      content:
        "We're pleased to announce that our first comprehensive security audit has been completed by CertiK. The audit found no critical vulnerabilities and only minor issues that have already been addressed. The full audit report is available on our GitHub repository.",
      likes: 78,
      comments: 12,
    },
    {
      id: 3,
      title: "Storage Node Operator Program",
      date: "Apr 5, 2025",
      content:
        "We're launching our Storage Node Operator Program! Node operators can now stake DVT tokens and provide storage capacity to the network. Early participants will receive bonus rewards during the first three months. Check our documentation for hardware requirements and setup instructions.",
      likes: 45,
      comments: 19,
    },
  ],
  metacanvas: [
    {
      id: 1,
      title: "Artist Onboarding Program",
      date: "Mar 10, 2025",
      content:
        "We're thrilled to announce our Artist Onboarding Program! We're inviting digital artists to join our platform early and help shape the future of creative expression in Web3. Selected artists will receive special benefits including zero platform fees for the first year.",
      likes: 89,
      comments: 34,
    },
    {
      id: 2,
      title: "Collaboration with Major Gallery",
      date: "Mar 20, 2025",
      content:
        "MetaCanvas has partnered with the renowned Digital Art Gallery to create the first cross-platform virtual exhibition. This collaboration will showcase works from both established and emerging digital artists, bridging the traditional art world with Web3 innovations.",
      likes: 112,
      comments: 41,
    },
    {
      id: 3,
      title: "New Creative Tools Released",
      date: "Apr 2, 2025",
      content:
        "We've just released our new suite of creative tools! These include collaborative canvas features, generative art algorithms, and 3D modeling integration. These tools are designed to expand the creative possibilities for artists on our platform.",
      likes: 76,
      comments: 28,
    },
    {
      id: 4,
      title: "Community Curation System",
      date: "Apr 18, 2025",
      content:
        "Today we're launching our Community Curation System, allowing CNVS token holders to participate in the curation of featured artworks and exhibitions. This decentralized approach ensures that our platform showcases diverse artistic voices selected by the community.",
      likes: 65,
      comments: 22,
    },
  ],
  quantumledger: [
    {
      id: 1,
      title: "Testnet Launch",
      date: "Apr 1, 2025",
      content:
        "We're excited to announce the launch of our testnet! Developers can now experiment with our quantum-resistant blockchain and provide feedback. The testnet includes our core features including post-quantum cryptography, smart contracts, and cross-chain bridges.",
      likes: 67,
      comments: 29,
    },
    {
      id: 2,
      title: "Research Paper Published",
      date: "Apr 10, 2025",
      content:
        "Our research team has published a peer-reviewed paper on our novel approach to quantum-resistant consensus mechanisms. The paper has been accepted at the International Cryptography Conference and demonstrates the theoretical security of our protocol against quantum attacks.",
      likes: 43,
      comments: 15,
    },
  ],
}

  interface Update {
    campaign: any
    id: number
    title: string
    date?: string
    content: string
    likes?: number
    comments?: number
    updateType?: string
    createdAt?: string
    // Add other fields as needed
  }

export default function UpdatesPage({campaign} : Update) {
  const {user, isLoading} = useUser()
  const params = useParams()
  const campaignId = params.id as string
  const project_id = campaign?.project_id
  const [updates, setUpdates] = useState<Update[]>([])
  const { toast } = useToast()

      useEffect(() => {
      const fetchUpdates = async () => {
        try {
          if (!user || !project_id) return;
          const userId = user?.sub?.substring(14);
          const requestBody = { project_id };
          console.log(requestBody);
          const response = await axios.post(
            `${API_URL}/api/profile/get-updates`,
            requestBody,
            {
              headers: {
                "Content-Type": "application/json", // ✅ Correct header
                user_id: userId,
              },
            }
          );
  
          if (response.status === 200) {
            const data = await response.data;
            setUpdates(data.updates);
          }
        } catch (error) {
          console.error("Error fetching project ID:", error);
          toast({
            title: "Error",
            description: "Failed to load project ID. Please refresh the page.",
            variant: "destructive",
          });
        }
      };
  
      fetchUpdates();
    }, [campaign?.project_id]);


  return (
    <PageLayout currentPage="updates" campaignId={campaignId}>
      {/* Project Updates Section */}
      <div className="bg-[#0c1425] rounded-lg p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <h2 className="text-xl font-bold mb-1">Project Updates</h2>
        <p className="text-gray-400 text-sm mb-6">Latest news and announcements</p>

        {updates.length > 0 ? (
          <div className="space-y-6">
           {updates.map((update, index) => (
                      <div key={index} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-white">
                            {update.title} <Badge>{update.updateType}</Badge>
                          </h3>
                          <Badge
                            variant="outline"
                            className="bg-gray-800/50 text-gray-300 border-gray-700"
                          >
                            <Calendar className="mr-1 h-3 w-3" />
                            {update.createdAt}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <p className="text-gray-300">{update.content}</p>
                          </div>
                          <div className="relative h-40 rounded-lg overflow-hidden">
                            {/* {updates?.attachments?.map((attachment, index) => (
                            <Image
                            key={index}
                            src={attachment.file_url || "/placeholder.svg"}
                            alt={attachment.file_name}
                            fill
                            className="object-cover"
                          />
                          ))}   */}
                          </div>
                        </div>

                        {index < updates.length - 1 && (
                          <Separator className="bg-gray-800" />
                        )}
                      </div>
                    ))}
          </div>
        ) : (
          <div className="bg-[#0f1a2c] rounded-lg p-8 text-center">
            <p className="text-gray-400">No updates available for this campaign yet.</p>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
