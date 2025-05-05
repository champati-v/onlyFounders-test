import { Check } from "lucide-react"

import { PageLayout } from "../layout/page-layout"

export default function TokenomicsPage() {
  return (
    <PageLayout currentPage="tokenomics">
      {/* Tokenomics Section */}
      <div className="bg-[#0c1425] rounded-lg p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <h2 className="text-2xl font-bold mb-1">Tokenomics</h2>
        <p className="text-gray-400 text-sm mb-6">Token distribution and utility</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Token Details */}
          <div>
            <h3 className="text-lg font-bold mb-4">Token Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Token Name:</span>
                <span className="font-medium">BGTToken</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Symbol:</span>
                <span className="font-medium">BGRT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Supply:</span>
                <span className="font-medium">50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Token Type:</span>
                <span className="font-medium">ERC-20</span>
              </div>
            </div>

            <h3 className="text-lg font-bold mt-8 mb-4">Token Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Public Sale</span>
                  <span className="font-medium">2300%</span>
                </div>
                <div className="w-full bg-[#131e32] h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3b82f6] rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Team & Advisors</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="w-full bg-[#131e32] h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8b5cf6] rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Foundation</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="w-full bg-[#131e32] h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Ecosystem Growth</span>
                  <span className="font-medium">30%</span>
                </div>
                <div className="w-full bg-[#131e32] h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-[#10b981] rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Strategic Partners</span>
                  <span className="font-medium">30%</span>
                </div>
                <div className="w-full bg-[#131e32] h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-[#06b6d4] rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Others</span>
                  <span className="font-medium">5%</span>
                </div>
                <div className="w-full bg-[#131e32] h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-[#ef4444] rounded-full" style={{ width: "5%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Token Usecases */}
          <div>
            <h3 className="text-lg font-bold mb-4">Token Usecases</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check size={18} className="text-[#10b981]" />
                <span>Governance rights for protocol decisions</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={18} className="text-[#10b981]" />
                <span>Fee discounts for transactions</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={18} className="text-[#10b981]" />
                <span>Staking rewards and yield farming</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={18} className="text-[#10b981]" />
                <span>Access to premium features</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={18} className="text-[#10b981]" />
                <span>Revenue sharing for token holders</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
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

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                <span className="text-xs text-gray-400">Public Sale</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div>
                <span className="text-xs text-gray-400">Team & Advisors</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                <span className="text-xs text-gray-400">Foundation</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
                <span className="text-xs text-gray-400">Ecosystem Growth</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#06b6d4]"></div>
                <span className="text-xs text-gray-400">Strategic Partners</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                <span className="text-xs text-gray-400">Others</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
