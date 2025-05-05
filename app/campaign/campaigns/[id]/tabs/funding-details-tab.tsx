import { Calendar, DollarSign, Wallet } from "lucide-react"

import type { CampaignDetail } from "@/lib/types"

interface FundingDetailsTabProps {
  campaign: CampaignDetail
}

export function FundingDetailsTab({ campaign }: FundingDetailsTabProps) {
  const isOwner = campaign.isOwner
  const fundingDetails = campaign.fundingDetails

  return (
    <>
      {/* Funding Overview Section */}
      <div className="bg-[#0c1425] rounded-lg p-4 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] mb-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-1">Funding Overview</h2>
        <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
          Detailed information about the fundraising process
        </p>

        <div className="space-y-4 sm:space-y-6">
          {/* Fundraising Target */}
          <div className="bg-[#0f1a2c] rounded-lg p-4 sm:p-5">
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <div className="bg-[#131e32] p-2 rounded-full">
                {/* <DollarSign size={18} sm:size={20} className="text-[#39e7f5]" /> */}
              </div>
              <h3 className="font-medium text-sm sm:text-base">Fundraising Target</h3>
            </div>
            <div className="pl-8 sm:pl-10">
              <p className="text-lg sm:text-xl font-bold text-white">Maximum cap: {fundingDetails.maxCap}</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                Minimum investment: {fundingDetails.minInvestment}
              </p>
            </div>
          </div>

          {/* Fundraising Wallet - Only show for owners */}
          {isOwner && (
            <div className="bg-[#0f1a2c] rounded-lg p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <div className="bg-[#131e32] p-2 rounded-full">
                  {/* <Wallet size={18} sm:size={20} className="text-[#39e7f5]" /> */}
                </div>
                <h3 className="font-medium text-sm sm:text-base">Fundraising Wallet</h3>
              </div>
              <div className="pl-8 sm:pl-10">
                <div className="bg-[#131e32] p-3 rounded-md font-mono text-xs sm:text-sm break-all">
                  {fundingDetails.walletAddress}
                </div>
                <button className="text-[#39e7f5] text-xs sm:text-sm mt-2 hover:underline">Copy Address</button>
              </div>
            </div>
          )}

          {/* Valuations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0f1a2c] rounded-lg p-4 sm:p-5">
              <h3 className="font-medium mb-2 text-sm sm:text-base">Fully Diluted Valuation</h3>
              <p className="text-lg sm:text-xl font-bold text-white">{fundingDetails.fullyDilutedValuation}</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">Based on total token supply</p>
            </div>

            <div className="bg-[#0f1a2c] rounded-lg p-4 sm:p-5">
              <h3 className="font-medium mb-2 text-sm sm:text-base">Initial Market Cap</h3>
              <p className="text-lg sm:text-xl font-bold text-white">{fundingDetails.initialMarketCap}</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">At token generation event</p>
            </div>
          </div>

          {/* Vesting Summary */}
          <div className="bg-[#0f1a2c] rounded-lg p-4 sm:p-5">
            <h3 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">Vesting Summary</h3>
            <div className="bg-[#131e32] p-3 sm:p-4 rounded-md">
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{fundingDetails.vestingSummary}</p>
            </div>
          </div>

          {/* Funding Deadline */}
          <div className="bg-[#0f1a2c] rounded-lg p-4 sm:p-5">
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <div className="bg-[#131e32] p-2 rounded-full">
                {/* <Calendar size={18} sm:size={20} className="text-[#39e7f5]" /> */}
              </div>
              <h3 className="font-medium text-sm sm:text-base">Funding Deadline</h3>
            </div>
            <div className="pl-8 sm:pl-10">
              <p className="text-lg sm:text-xl font-bold text-white">{fundingDetails.deadline}</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">{fundingDetails.daysRemaining} days remaining</p>
            </div>
          </div>
        </div>
      </div>

      {/* Deal Details Section */}
      <div className="bg-[#0c1425] rounded-lg p-4 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <h2 className="text-xl sm:text-2xl font-bold mb-1">Deal Details</h2>
        <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">Information about the current funding round</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-[#0f1a2c] rounded-lg p-4 sm:p-5">
            <h3 className="text-gray-400 text-xs sm:text-sm mb-1">Deal Name</h3>
            <p className="text-lg sm:text-xl font-bold">{fundingDetails.dealName}</p>
          </div>

          <div className="bg-[#0f1a2c] rounded-lg p-4 sm:p-5">
            <h3 className="text-gray-400 text-xs sm:text-sm mb-1">Deal Round</h3>
            <p className="text-lg sm:text-xl font-bold">{fundingDetails.dealRound}</p>
            <div className="mt-2 inline-block bg-[#5b5bf8] text-white text-xs px-3 py-1 rounded-full">
              {fundingDetails.dealStatus}
            </div>
          </div>

          <div className="bg-[#0f1a2c] rounded-lg p-4 sm:p-5">
            <h3 className="text-gray-400 text-xs sm:text-sm mb-1">Token Price</h3>
            <p className="text-lg sm:text-xl font-bold">{fundingDetails.tokenPrice}</p>
            <p className="text-[#39e7f5] text-xs sm:text-sm mt-1">{fundingDetails.tokenRatio}</p>
          </div>
        </div>
      </div>
    </>
  )
}
