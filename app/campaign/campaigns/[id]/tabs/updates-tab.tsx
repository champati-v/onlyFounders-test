import { CalendarDays, MessageCircle, ThumbsUp } from "lucide-react"

import type { CampaignDetail } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface UpdatesTabProps {
  campaign: CampaignDetail
}

export function UpdatesTab({ campaign }: UpdatesTabProps) {
  const updates = campaign.updates

  return (
    <div className="bg-[#0c1425] rounded-lg p-4 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
      <h2 className="text-xl sm:text-2xl font-bold mb-1">Project Updates</h2>
      <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">Latest news and announcements</p>

      {updates? (
        <div className="space-y-4 sm:space-y-6">
          {updates.map((update) => (
            <div key={update.id} className="bg-[#0f1a2c] rounded-lg p-4 sm:p-5 border border-[#1e293b]">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-3">
                <h3 className="text-base sm:text-lg font-bold">{update.title}</h3>
                <div className="flex items-center text-gray-400 text-xs sm:text-sm">
                  <CalendarDays size={14} className="mr-1" />
                  {formatDate(update.date)}
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">{update.content}</p>
              <div className="flex gap-4 text-xs sm:text-sm text-gray-400">
                <button className="flex items-center gap-1 hover:text-[#39e7f5]">
                  <ThumbsUp size={14} />
                  <span>{update.likes} Likes</span>
                </button>
                <button className="flex items-center gap-1 hover:text-[#39e7f5]">
                  <MessageCircle size={14} />
                  <span>{update.comments} Comments</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0f1a2c] rounded-lg p-6 sm:p-8 text-center">
          <p className="text-gray-400 text-sm">No updates available for this campaign yet.</p>
        </div>
      )}
    </div>
  )
}
