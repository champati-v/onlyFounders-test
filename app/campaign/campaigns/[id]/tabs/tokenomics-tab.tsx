"use client"

import { API_URL } from '@/lib/config';
import { useState, useEffect } from "react"
import { Check } from 'lucide-react'
import { useUser } from "@auth0/nextjs-auth0/client"

interface TokenomicsTabProps {
  campaign: any // Using any for now as the full type is defined in the parent component
}

// Define the tokenomics data structure based on the API response
interface TokenomicsData {
  tokenName: string
  symbol: string
  totalSupply: number
  tokenType: string
  initialPrice: number
  useCases: string[]
  tokenDistribution: {
    publicSale: number
    teamAdvisors: number
    foundation: number
    ecosystemGrowth: number
    strategicPartners: number
    others: number
    _id: string
  }
  _id: string
}

export function TokenomicsTab({ campaign }: TokenomicsTabProps) {
  const [tokenomics, setTokenomics] = useState<TokenomicsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useUser()

  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  useEffect(() => {
    const fetchTokenomics = async () => {
      setIsLoading(true)
      try {
        // Get user ID for the API request header
        const userId = user?.sub?.substring(14) || "guest-user"

        const response = await fetch(`${API_URL}/api/startup/get-tokenomics`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // user_id: userId,
          },
          body: JSON.stringify({ campaignId: campaign._id }),
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch tokenomics: ${response.status}`)
        }

        const data = await response.json()
        setTokenomics(data.tokenomics)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tokenomics")
        console.error("Error fetching tokenomics:", err)
      } finally {
        setIsLoading(false)
      }
    }

    if (campaign._id) {
      fetchTokenomics()
    }
  }, [campaign._id])

  // Default usecases if none are provided
  const defaultUsecases = [
    "Governance voting rights for protocol decisions",
    "Staking for network security and rewards",
    "Fee discounts for platform transactions",
    "Access to premium features and services",
    "Liquidity mining incentives",
  ]

  // Map the API response to the expected format for the UI
  const tokenDistribution = tokenomics
    ? [
        { name: "Public Sale", percentage: tokenomics.tokenDistribution.publicSale },
        { name: "Team & Advisors", percentage: tokenomics.tokenDistribution.teamAdvisors },
        { name: "Foundation", percentage: tokenomics.tokenDistribution.foundation },
        { name: "Ecosystem Growth", percentage: tokenomics.tokenDistribution.ecosystemGrowth },
        { name: "Strategic Partners", percentage: tokenomics.tokenDistribution.strategicPartners },
        { name: "Others", percentage: tokenomics.tokenDistribution.others },
      ]
    : []

  // Use API useCases if available, otherwise use default
  const usecases = tokenomics?.useCases?.length ? tokenomics.useCases : defaultUsecases

  if (isLoading) {
    return (
      <div className="bg-[#0c1425] rounded-lg p-4 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#4361ff] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <p className="mt-4 text-gray-400">Loading tokenomics data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-[#0c1425] rounded-lg p-4 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Tokenomics</h2>
        <div className="bg-[#131e32] p-4 rounded-lg text-center">
          <p className="text-red-400 mb-2">Error loading tokenomics data</p>
          <p className="text-gray-400 text-sm">{error}</p>
        </div>
      </div>
    )
  }

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
              <span className="font-medium text-sm">{tokenomics?.tokenName || "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Symbol:</span>
              <span className="font-medium text-sm">{tokenomics?.symbol || "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Total Supply:</span>
              <span className="font-medium text-sm">
                {tokenomics ? formatNumber(tokenomics.totalSupply) : "Not specified"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Token Type:</span>
              <span className="font-medium text-sm">{tokenomics?.tokenType || "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Initial Price:</span>
              <span className="font-medium text-sm">
                ${tokenomics?.initialPrice ? tokenomics.initialPrice.toFixed(4) : "Not specified"}
              </span>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">Token Distribution</h3>
          <div className="space-y-3 sm:space-y-4">
            {tokenDistribution.map((item, index) => (
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
            {usecases.map((usecase, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check size={16} className="text-[#10b981] flex-shrink-0" />
                <span className="text-sm">{usecase}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 flex justify-center">
            <svg width="180" height="180" viewBox="0 0 200 200" className="transform -rotate-90">
              {/* Calculate the circumference of the circle */}
              {/* circumference = 2 * PI * radius = 2 * 3.14159 * 80 = 502.65 */}
              {/* For each segment, we calculate strokeDasharray and strokeDashoffset */}

              {/* Main blue circle (Public Sale) */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="30"
                strokeDasharray={`${(tokenomics?.tokenDistribution?.publicSale || 20) * 5.0265} 502.65`}
                strokeDashoffset="0"
              />

              {/* Team & Advisors (Purple) */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="#8b5cf6"
                strokeWidth="30"
                strokeDasharray={`${(tokenomics?.tokenDistribution?.teamAdvisors || 20) * 5.0265} 502.65`}
                strokeDashoffset={`-${(tokenomics?.tokenDistribution?.publicSale || 20) * 5.0265}`}
              />

              {/* Foundation (Orange) */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="#f59e0b"
                strokeWidth="30"
                strokeDasharray={`${(tokenomics?.tokenDistribution?.foundation || 10) * 5.0265} 502.65`}
                strokeDashoffset={`-${
                  ((tokenomics?.tokenDistribution?.publicSale || 20) +
                    (tokenomics?.tokenDistribution?.teamAdvisors || 20)) *
                  5.0265
                }`}
              />

              {/* Ecosystem Growth (Green) */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="#10b981"
                strokeWidth="30"
                strokeDasharray={`${(tokenomics?.tokenDistribution?.ecosystemGrowth || 20) * 5.0265} 502.65`}
                strokeDashoffset={`-${
                  ((tokenomics?.tokenDistribution?.publicSale || 20) +
                    (tokenomics?.tokenDistribution?.teamAdvisors || 20) +
                    (tokenomics?.tokenDistribution?.foundation || 10)) *
                  5.0265
                }`}
              />

              {/* Strategic Partners (Teal) */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="#06b6d4"
                strokeWidth="30"
                strokeDasharray={`${(tokenomics?.tokenDistribution?.strategicPartners || 20) * 5.0265} 502.65`}
                strokeDashoffset={`-${
                  ((tokenomics?.tokenDistribution?.publicSale || 20) +
                    (tokenomics?.tokenDistribution?.teamAdvisors || 20) +
                    (tokenomics?.tokenDistribution?.foundation || 10) +
                    (tokenomics?.tokenDistribution?.ecosystemGrowth || 20)) *
                  5.0265
                }`}
              />

              {/* Others (Red) */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="#ef4444"
                strokeWidth="30"
                strokeDasharray={`${(tokenomics?.tokenDistribution?.others || 10) * 5.0265} 502.65`}
                strokeDashoffset={`-${
                  ((tokenomics?.tokenDistribution?.publicSale || 20) +
                    (tokenomics?.tokenDistribution?.teamAdvisors || 20) +
                    (tokenomics?.tokenDistribution?.foundation || 10) +
                    (tokenomics?.tokenDistribution?.ecosystemGrowth || 20) +
                    (tokenomics?.tokenDistribution?.strategicPartners || 20)) *
                  5.0265
                }`}
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
