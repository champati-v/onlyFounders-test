"use client"

import { useParams } from "next/navigation"
import { Check } from "lucide-react"

import { PageLayout } from "../../../layout/page-layout"

// Mock tokenomics data for each campaign
const campaignTokenomicsData = {
  "onlyfounder-cyan": {
    tokenName: "BGTToken",
    symbol: "BGRT",
    totalSupply: "50",
    tokenType: "ERC-20",
    distribution: [
      { name: "Public Sale", percentage: 2300 },
      { name: "Team & Advisors", percentage: 20 },
      { name: "Foundation", percentage: 20 },
      { name: "Ecosystem Growth", percentage: 30 },
      { name: "Strategic Partners", percentage: 30 },
      { name: "Others", percentage: 5 },
    ],
    usecases: [
      "Governance rights for protocol decisions",
      "Fee discounts for transactions",
      "Staking rewards and yield farming",
      "Access to premium features",
      "Revenue sharing for token holders",
    ],
  },
  decentravault: {
    tokenName: "DecentraVault Token",
    symbol: "DVT",
    totalSupply: "100,000,000",
    tokenType: "ERC-20",
    distribution: [
      { name: "Public Sale", percentage: 30 },
      { name: "Team & Advisors", percentage: 15 },
      { name: "Foundation", percentage: 20 },
      { name: "Ecosystem Growth", percentage: 25 },
      { name: "Strategic Partners", percentage: 5 },
      { name: "Others", percentage: 5 },
    ],
    usecases: [
      "Storage node staking and rewards",
      "Governance voting on protocol upgrades",
      "Fee payments for storage services",
      "Data validation incentives",
      "Premium storage tier access",
    ],
  },
  metacanvas: {
    tokenName: "Canvas Token",
    symbol: "CNVS",
    totalSupply: "500,000,000",
    tokenType: "ERC-20",
    distribution: [
      { name: "Public Sale", percentage: 25 },
      { name: "Team & Advisors", percentage: 18 },
      { name: "Foundation", percentage: 15 },
      { name: "Ecosystem Growth", percentage: 30 },
      { name: "Strategic Partners", percentage: 7 },
      { name: "Others", percentage: 5 },
    ],
    usecases: [
      "Artist royalty distributions",
      "Marketplace transaction fees",
      "Curation and exhibition voting",
      "Exclusive art drops access",
      "Community-owned gallery spaces",
    ],
  },
  quantumledger: {
    tokenName: "Quantum Token",
    symbol: "QNTM",
    totalSupply: "21,000,000",
    tokenType: "ERC-20",
    distribution: [
      { name: "Public Sale", percentage: 35 },
      { name: "Team & Advisors", percentage: 20 },
      { name: "Foundation", percentage: 15 },
      { name: "Ecosystem Growth", percentage: 20 },
      { name: "Strategic Partners", percentage: 5 },
      { name: "Others", percentage: 5 },
    ],
    usecases: [
      "Transaction validation rewards",
      "Quantum-secure transaction fees",
      "Protocol governance voting",
      "Validator node staking",
      "Enterprise solution licensing",
    ],
  },
}

export default function TokenomicsPage() {
  const params = useParams()
  const campaignId = params.id as string

  // Get tokenomics data or use default if not found
  const tokenomics = campaignTokenomicsData[campaignId as keyof typeof campaignTokenomicsData] || {
    tokenName: "Unknown Token",
    symbol: "UNKNOWN",
    totalSupply: "0",
    tokenType: "ERC-20",
    distribution: [
      { name: "Public Sale", percentage: 0 },
      { name: "Team & Advisors", percentage: 0 },
      { name: "Foundation", percentage: 0 },
      { name: "Ecosystem Growth", percentage: 0 },
      { name: "Strategic Partners", percentage: 0 },
      { name: "Others", percentage: 0 },
    ],
    usecases: ["No use cases defined"],
  }

  return (
    <PageLayout currentPage="tokenomics" campaignId={campaignId}>
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
                <span className="font-medium">{tokenomics.tokenName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Symbol:</span>
                <span className="font-medium">{tokenomics.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Supply:</span>
                <span className="font-medium">{tokenomics.totalSupply}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Token Type:</span>
                <span className="font-medium">{tokenomics.tokenType}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold mt-8 mb-4">Token Distribution</h3>
            <div className="space-y-4">
              {tokenomics.distribution.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400">{item.name}</span>
                    <span className="font-medium">{item.percentage}%</span>
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
            <h3 className="text-lg font-bold mb-4">Token Usecases</h3>
            <div className="space-y-3">
              {tokenomics.usecases.map((usecase, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check size={18} className="text-[#10b981]" />
                  <span>{usecase}</span>
                </div>
              ))}
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
