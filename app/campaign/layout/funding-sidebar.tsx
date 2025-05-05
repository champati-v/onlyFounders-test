import { Bookmark, Info, MessageSquare, Pencil, Share2, ShieldCheck, Users } from "lucide-react"

import { Button } from "@/components/ui/button"

interface FundingSidebarProps {
  campaignId?: string
}

export function FundingSidebar({ campaignId = "" }: FundingSidebarProps) {
  // Explicitly check for exact match with "onlyfounder-cyan"
  const showWalletAddress = campaignId === "onlyfounder-cyan"

  return (
    <div className="bg-[#0c1425] rounded-lg p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
      {/* Funding Progress */}
      <h3 className="text-xl font-bold mb-4">Funding Progress</h3>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>Raised</span>
          <span className="font-medium">400,000 / 500,000 USDC</span>
        </div>
        <div className="w-full bg-[#1e293b] rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#39e7f5]"
            style={{ width: "80%" }}
          ></div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-sm text-gray-400">80% funded</span>
          <span className="text-sm text-[#f59e0b] font-medium">68 days left</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 border-b border-[#1e293b] pb-4">
        <div className="text-center">
          <div className="text-3xl font-bold">20</div>
          <div className="text-xs text-gray-400">Token Price</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">Seed</div>
          <div className="text-xs text-gray-400">Startup Stage</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">68</div>
          <div className="text-xs text-gray-400">Days Left</div>
        </div>
      </div>

      <Button className="w-full bg-gradient-to-r from-[#4361ff] to-[#7e5bf8] text-white py-4 rounded-md font-medium mb-3 shadow-sm hover:shadow-md transition-shadow">
        Invest Now
      </Button>

      {showWalletAddress && (
        <Button className="w-full bg-[#10b981] hover:bg-[#10b981]/90 text-white py-4 rounded-md font-medium mb-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center gap-2">
          <Pencil size={16} />
          Edit Campaign
        </Button>
      )}

      <Button
        variant="outline"
        className="w-full border border-[#1e293b] bg-transparent text-white py-3 rounded-md font-medium mb-3 flex items-center justify-center gap-2 hover:bg-[#131e32] transition-colors"
      >
        <Bookmark size={16} />
        Add to Watchlist
      </Button>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <Button
          variant="outline"
          className="border border-[#1e293b] bg-transparent text-white py-2 px-4 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-[#131e32] transition-colors"
        >
          <Share2 size={16} />
          <span>Share</span>
        </Button>
        <Button
          variant="outline"
          className="border border-[#1e293b] bg-transparent text-white py-2 px-4 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-[#131e32] transition-colors"
        >
          <MessageSquare size={16} />
          <span>Contact</span>
        </Button>
      </div>

      {/* Project Verification */}
      <h3 className="text-xl font-bold mb-4 pt-2 border-t border-[#1e293b]">Project Verification</h3>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center p-3 rounded-md bg-[#0f1a2c]">
          <div className="flex items-center gap-2">
            <div className="text-[#10b981]">
              <ShieldCheck size={20} />
            </div>
            <span>KYC Verified</span>
          </div>
          <span className="bg-[#10b981] text-white text-xs px-4 py-1 rounded-full font-medium">Passed</span>
        </div>

        <div className="flex justify-between items-center p-3 rounded-md bg-[#0f1a2c]">
          <div className="flex items-center gap-2">
            <div className="text-[#10b981]">
              <ShieldCheck size={20} />
            </div>
            <span>Smart Contract Audit</span>
          </div>
          <span className="bg-[#f97316] text-white text-xs px-4 py-1 rounded-full font-medium">Coming Soon</span>
        </div>

        <div className="flex justify-between items-center p-3 rounded-md bg-[#0f1a2c]">
          <div className="flex items-center gap-2">
            <div className="text-[#10b981]">
              <Users size={20} />
            </div>
            <span>Team Verification</span>
          </div>
          <span className="bg-[#f97316] text-white text-xs px-4 py-1 rounded-full font-medium">Coming Soon</span>
        </div>
      </div>

      {/* AI Risk Assessment */}
      <div className="bg-[#0f1a2c] rounded-lg p-4 border border-[#1e293b] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-[#3b82f6]">
            <Info size={18} />
          </div>
          <h3 className="font-bold">AI Risk Assessment</h3>
        </div>

        <p className="text-sm text-gray-300">
          Optimus AI has analyzed this project and assigned it a low risk score based on team credentials, code quality,
          and tokenomics model.
        </p>
      </div>
    </div>
  )
}
