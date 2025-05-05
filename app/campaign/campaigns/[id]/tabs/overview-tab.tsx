import {
  ArrowUpRight,
  Building2,
  FileText,
  FileVideo,
  Github,
  Globe,
  MessageSquare,
  MessageSquareText,
  Send,
  Twitter,
  UserPlus,
  Users,
} from "lucide-react"

import type { CampaignDetail } from "@/lib/types"
import { formatCompactNumber } from "@/lib/utils"

interface OverviewTabProps {
  campaign: CampaignDetail
}

export function OverviewTab({ campaign }: OverviewTabProps) {
  return (
    <>
      {/* Project Overview */}
      <div className="bg-[#0c1425] rounded-lg p-4 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Project Overview</h3>
        <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">{campaign.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a 
            href={campaign.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-[#39e7f5]" />
              <span className="text-sm sm:text-base">Website</span>
            </div>
            <ArrowUpRight size={16} className="text-gray-400" />
          </a>

          <a 
            href={campaign.whitepaper} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-[#39e7f5]" />
              <span className="text-sm sm:text-base">Whitepaper</span>
            </div>
            <ArrowUpRight size={16} className="text-gray-400" />
          </a>

          <a 
            href={campaign.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Github size={18} className="text-[#39e7f5]" />
              <span className="text-sm sm:text-base">Github Repository</span>
            </div>
            <ArrowUpRight size={16} className="text-gray-400" />
          </a>

          <a 
            href={campaign.discord} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-[#39e7f5]" />
              <span className="text-sm sm:text-base">Discord</span>
            </div>
            <ArrowUpRight size={16} className="text-gray-400" />
          </a>

          <a 
            href={campaign.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Twitter size={18} className="text-[#39e7f5]" />
              <span className="text-sm sm:text-base">Twitter</span>
            </div>
            <ArrowUpRight size={16} className="text-gray-400" />
          </a>

          <a 
            href={campaign.medium} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
          >
            <div className="flex items-center gap-2">
              <MessageSquareText size={18} className="text-[#39e7f5]" />
              <span className="text-sm sm:text-base">Medium Blog</span>
            </div>
            <ArrowUpRight size={16} className="text-gray-400" />
          </a>

          <a 
            href={campaign.telegram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Send size={18} className="text-[#39e7f5]" />
              <span className="text-sm sm:text-base">Telegram</span>
            </div>
            <ArrowUpRight size={16} className="text-gray-400" />
          </a>

          <a 
            href={campaign.demoVideo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#131e32] rounded p-3 flex justify-between items-center hover:bg-[#1e293b] transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileVideo size={18} className="text-[#39e7f5]" />
              <span className="text-sm sm:text-base">Demo Video</span>
            </div>
            <ArrowUpRight size={16} className="text-gray-400" />
          </a>
        </div>
      </div>

      {/* Traction and Metrics */}
      <div className="bg-[#0c1425] rounded-lg p-4 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Traction and Metrics</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          <div className="bg-[#0f1a2c] rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="bg-[#131e32] p-2 rounded-full mb-2">
              <UserPlus size={20} className="text-[#39e7f5]" />
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-xs sm:text-sm">Waitlist Signups</div>
              <div className="text-xl sm:text-3xl font-bold mt-1">
                {formatCompactNumber(campaign.metrics.waitlistSignups)}
              </div>
            </div>
          </div>

          <div className="bg-[#0f1a2c] rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="bg-[#131e32] p-2 rounded-full mb-2">
              <Building2 size={20} className="text-[#39e7f5]" />
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-xs sm:text-sm">Strategic Partners</div>
              <div className="text-xl sm:text-3xl font-bold mt-1">
                {formatCompactNumber(campaign.metrics.strategicPartners)}
              </div>
            </div>
          </div>

          <div className="bg-[#0f1a2c] rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="bg-[#131e32] p-2 rounded-full mb-2">
              <Users size={20} className="text-[#39e7f5]" />
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-xs sm:text-sm">Community Size</div>
              <div className="text-xl sm:text-3xl font-bold mt-1">
                {formatCompactNumber(campaign.metrics.communitySize)}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div>
          <h4 className="font-bold mb-3 text-sm sm:text-base">Additional Metrics</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Monthly Active users</span>
              <span className="text-white font-bold text-sm">
                {formatCompactNumber(campaign.metrics.monthlyActiveUsers)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Daily Active Users</span>
              <span className="text-white font-bold text-sm">
                {formatCompactNumber(campaign.metrics.dailyActiveUsers)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Total Users</span>
              <span className="text-white font-bold text-sm">
                {formatCompactNumber(campaign.metrics.totalUsers)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Total Transactions</span>
              <span className="text-white font-bold text-sm">
                {formatCompactNumber(campaign.metrics.totalTransactions)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Total Volume</span>
              <span className="text-white font-bold text-sm">
                {formatCompactNumber(campaign.metrics.totalVolume)}
              </span>
            </div>
          </div>
        </div>
      </div>
</>
)}