import { Check } from "lucide-react"

import type { CampaignDetail } from "@/lib/types"

interface TokenomicsTabProps {
  campaign: CampaignDetail
}

export function TokenomicsTab({ campaign }: TokenomicsTabProps) {
  const tokenomics = campaign.tokenomics

  return (
    <div className="bg-[#0c1425] rounded-lg p-4 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
      <h2 className="text-xl sm:text-2xl font-bold mb-1">Tokenomics</h2>
      <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">Token distribution and utility</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Token Details */}
        <div>
          <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Token Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Token Name:</span>
              <span className="font-medium text-sm">{tokenomics.tokenName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Symbol:</span>
              <span className="font-medium text-sm">{tokenomics.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Total Supply:</span>
              <span className="font-medium text-sm">{tokenomics.totalSupply}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Token Type:</span>
              <span className="font-medium text-sm">{tokenomics.tokenType}</span>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">Token Distribution</h3>
          <div className="space-y-3 sm:space-y-4">
            {tokenomics.distribution.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-sm">{item.name}</span>
                  <span className="font-medium text-sm">{item.percentage}%</span>
                </div>
                <div className="w-full bg-[#131e32] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      index === 0
                        ? "bg-[#3b82f6]"
                        : index === 1
                          ? "bg-[#8b5cf6]"
                          : index === 2
                            ? "bg-[#f59e0b]"
                            : index === 3
                              ? "bg-[#10b981]"
                              : index === 4
                                ? "bg-[#06b6d4]"
                                : "bg-[#ef4444]"
                    }`}
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token Usecases */}
        <div>
          <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Token Usecases</h3>
          <div className="space-y-3">
            {tokenomics.usecases.map((usecase, index) => (
              <div key={index} className="flex items-center gap-2">
                {/* <Check size={16} sm:size={18} className="text-[#10b981] flex-shrink-0" /> */}
                <span className="text-sm">{usecase}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 flex justify-center">
            <svg width="180" height="180" viewBox="0 0 200 200" className="transform -rotate-90">
              {/* Main blue circle (Public Sale) */}
              <circle cx="100" cy="100" r="80" fill="transparent" stroke="#3b82f6" strokeWidth="30" />

              {/* Team & Advisors (Purple) */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="#8b5cf6"
                strokeWidth="30"
                strokeDasharray="100.53 502.65"
                strokeDashoffset="0"
              />

              {/* Foundation (Orange) */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="#f59e0b"
                strokeWidth="30"
                strokeDasharray="100.53 502.65"
                strokeDashoffset="-100.53"
              />

              {/* Ecosystem Growth (Green) */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="#10b981"
                strokeWidth="30"
                strokeDasharray="150.8 502.65"
                strokeDashoffset="-201.06"
              />

              {/* Strategic Partners (Teal) */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="#06b6d4"
                strokeWidth="30"
                strokeDasharray="150.8 502.65"
                strokeDashoffset="-351.86"
              />

              {/* Others (Red) */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="#ef4444"
                strokeWidth="30"
                strokeDasharray="25.13 502.65"
                strokeDashoffset="-502.65"
              />

              {/* Inner circle (empty space) */}
              <circle cx="100" cy="100" r="65" fill="#0c1425" />
            </svg>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#3b82f6]"></div>
              <span className="text-xs text-gray-400">Public Sale</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#8b5cf6]"></div>
              <span className="text-xs text-gray-400">Team & Advisors</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#f59e0b]"></div>
              <span className="text-xs text-gray-400">Foundation</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#10b981]"></div>
              <span className="text-xs text-gray-400">Ecosystem Growth</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#06b6d4]"></div>
              <span className="text-xs text-gray-400">Strategic Partners</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#ef4444]"></div>
              <span className="text-xs text-gray-400">Others</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
