import Image from "next/image"
import { Twitter, Github, Linkedin } from "lucide-react"

import type { CampaignDetail } from "@/lib/types"

interface TeamTabProps {
  campaign: CampaignDetail
}

export function TeamTab({ campaign }: TeamTabProps) {
  const teamMembers = campaign.team

  return (
    <div className="bg-[#0c1425] rounded-lg p-4 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
      <h3 className="text-lg sm:text-xl font-bold mb-2">Team Members</h3>
      <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">Meet the team behind {campaign.name}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-[#0f1a2c] rounded-lg p-4 sm:p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-[#5b5bf8]/20 flex items-center justify-center">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base">{member.name}</h4>
                <p className="text-[#39e7f5] text-xs sm:text-sm">{member.role}</p>
              </div>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm mb-4">{member.bio}</p>
            <div className="flex gap-3">
              <button className="text-gray-400 hover:text-white">
                {/* <Twitter size={16} sm:size={18} /> */}
              </button>
              <button className="text-gray-400 hover:text-white">
                {/* <Github size={16} sm:size={18} /> */}
              </button>
              <button className="text-gray-400 hover:text-white">
                {/* <Linkedin size={16} sm:size={18} /> */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
