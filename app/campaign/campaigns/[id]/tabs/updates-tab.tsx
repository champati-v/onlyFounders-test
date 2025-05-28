'use client'

import { Calendar, CalendarDays, MessageCircle, ThumbsUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { API_URL } from "@/lib/config"
import type { CampaignDetail } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { Separator } from "@radix-ui/react-separator"
import { useEffect, useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"

interface UpdatesTabProps {
  campaign: CampaignDetail
}

export function UpdatesTab({ campaign }: UpdatesTabProps) {
  const project_id = campaign?.project_id
  const { user, isLoading } = useUser()
  const { toast } = useToast()
  const [updates, setUpdates] = useState<any[]>([])


    useEffect(() => {
        const fetchUpdates = async () => {
          try {
            // if (!user || !project_id) return;
            // const userId = user?.sub?.substring(14);

            if(updates.length === 0){
            const response = await axios.post(
              `${API_URL}/api/profile/get-updates`,
              {projectId: project_id},
              {
                headers: {
                  "Content-Type": "application/json", // ✅ Correct header
                  // user_id: userId,
                },
              }
            );
            
            if (response.status === 200) {
              const data = await response.data;
              setUpdates(data.updates);
            }
          }
          } catch (error) {
            console.error("Error fetching project ID:", error);
            toast({
              title: "Login Required",
              description: "Please log in to view updates.",
            });
          }
        };
    
        fetchUpdates();
      }, [project_id]);
  

  return (
    <div className="bg-[#0c1425] rounded-lg p-4 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
      <h2 className="text-xl sm:text-2xl font-bold mb-1">Project Updates</h2>
      <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">Latest news and announcements</p>

        {updates? (
          <div className="space-y-6">
           {updates.map((update, index) => (
                      <div key={index} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="flex items-center gap-2 text-lg font-medium text-white">
                            {update.title} <Badge>{update.updateType}</Badge>
                          </h3>
                          <Badge
                            variant="outline"
                            className="bg-gray-800/50 text-gray-300 border-gray-700"
                          >
                            <Calendar className="mr-1 h-3 w-3" />
                            {new Date (update.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <p className="text-gray-300">{update.content}</p>
                          </div>
                          <div className="relative h-40 rounded-lg overflow-hidden">
                            {Array.isArray(update.attachments) && update.attachments.length > 0 ? (
                              update.attachments.map((img: any, i: number) => (
                                <img
                                  key={i}
                                  src={img.file_url}
                                  alt={`attachment-${i}`}
                                  className="object-cover rounded-lg h-full w-full"
                                />
                              ))
                            ) : null}
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
  )
}
