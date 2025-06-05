"use client"

import { useParams } from "next/navigation"
import { Calendar, DollarSign, Wallet } from "lucide-react"

import { PageLayout } from "../../../layout/page-layout"

// Mock funding details data for each campaign
const campaignFundingData = {
  "onlyfounder-cyan": {
    maxCap: "$10 Million USDC",
    minInvestment: "$1,000 USDC",
    walletAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    fullyDilutedValuation: "$50,000,000 USD",
    initialMarketCap: "$5,000,000 USD",
    vestingSummary:
      "10% of tokens unlocked at TGE (Token Generation Event). Remaining 90% vested linearly over 24 months with a 6-month cliff. Team tokens subject to 12-month lock-up period followed by 36-month linear vesting. Advisor tokens vested over 24 months with 3-month cliff.",
    deadline: "December 31, 2025",
    daysRemaining: "68",
    dealName: "Cyan Launch",
    dealRound: "Seed Funding",
    dealStatus: "Public Beta",
    tokenPrice: "$0.05 USD",
    tokenRatio: "20 tokens per USDC",
  },
  decentravault: {
    maxCap: "$1.5 Million USDC",
    minInvestment: "$5,000 USDC",
    walletAddress: "0x8a20d5630B4cF539739dF2C5dAcb4c659F2488E5",
    fullyDilutedValuation: "$30,000,000 USD",
    initialMarketCap: "$4,500,000 USD",
    vestingSummary:
      "15% of tokens unlocked at TGE. Remaining 85% vested linearly over 18 months with a 3-month cliff. Team tokens subject to 18-month lock-up period followed by 24-month linear vesting.",
    deadline: "April 30, 2025",
    daysRemaining: "35",
    dealName: "DecentraVault Seed",
    dealRound: "Seed Funding",
    dealStatus: "Private",
    tokenPrice: "$0.015 USD",
    tokenRatio: "66.67 tokens per USDC",
  },
  metacanvas: {
    maxCap: "$5 Million USDC",
    minInvestment: "$10,000 USDC",
    walletAddress: "0x9c30d5630B4cF539739dF2C5dAcb4c659F2488F7",
    fullyDilutedValuation: "$100,000,000 USD",
    initialMarketCap: "$25,000,000 USD",
    vestingSummary:
      "20% of tokens unlocked at TGE. Remaining 80% vested linearly over 12 months with no cliff. Team tokens subject to 6-month lock-up period followed by 18-month linear vesting.",
    deadline: "May 15, 2025",
    daysRemaining: "50",
    dealName: "MetaCanvas Series A",
    dealRound: "Series A",
    dealStatus: "Public",
    tokenPrice: "$0.01 USD",
    tokenRatio: "100 tokens per USDC",
  },
  quantumledger: {
    maxCap: "$2 Million USDC",
    minInvestment: "$2,500 USDC",
    walletAddress: "0x7b40d5630B4cF539739dF2C5dAcb4c659F2488D9",
    fullyDilutedValuation: "$42,000,000 USD",
    initialMarketCap: "$8,400,000 USD",
    vestingSummary:
      "10% of tokens unlocked at TGE. Remaining 90% vested linearly over 24 months with a 6-month cliff. Team tokens subject to 12-month lock-up period followed by 24-month linear vesting.",
    deadline: "June 15, 2025",
    daysRemaining: "81",
    dealName: "QuantumLedger Seed",
    dealRound: "Seed Funding",
    dealStatus: "Private Beta",
    tokenPrice: "$0.095 USD",
    tokenRatio: "10.53 tokens per USDC",
  },
}

// Update the FundingDetailsPage component to strictly check for the exact campaign ID
export default function FundingDetailsPage() {
  const params = useParams()
  const campaignId = params.id as string

  // Explicitly check for exact match with "onlyfounder-cyan"
  const showWalletAddress = campaignId === "onlyfounder-cyan"

  // Get funding data or use default if not found
  const fundingData = campaignFundingData[campaignId as keyof typeof campaignFundingData] || {
    maxCap: "$0 USDC",
    minInvestment: "$0 USDC",
    walletAddress: "0x0000000000000000000000000000000000000000",
    fullyDilutedValuation: "$0 USD",
    initialMarketCap: "$0 USD",
    vestingSummary: "No vesting information available.",
    deadline: "Unknown",
    daysRemaining: "0",
    dealName: "Unknown",
    dealRound: "Unknown",
    dealStatus: "Unknown",
    tokenPrice: "$0 USD",
    tokenRatio: "0 tokens per USDC",
  }

  return (
    <PageLayout currentPage="funding-details" campaignId={campaignId}>
      {/* Funding Overview Section */}
      <div className="bg-[#0c1425] rounded-lg p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] mb-6">
        <h2 className="text-2xl font-bold mb-1">Funding Overview</h2>
        <p className="text-gray-400 text-sm mb-6">Detailed information about the fundraising process</p>

        <div className="space-y-6">
          {/* Fundraising Target */}
          <div className="bg-[#0f1a2c] rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[#131e32] p-2 rounded-full">
                <DollarSign size={20} className="text-[#39e7f5]" />
              </div>
              <h3 className="font-medium">Fundraising Target</h3>
            </div>
            <div className="pl-10">
              <p className="text-xl font-bold text-white">Maximum cap: {fundingData.maxCap}</p>
              <p className="text-gray-400 text-sm mt-1">Minimum investment: {fundingData.minInvestment}</p>
            </div>
          </div>

          {/* Fundraising Wallet - Only show for OnlyFounder Cyan */}
          {showWalletAddress && (
            <div className="bg-[#0f1a2c] rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#131e32] p-2 rounded-full">
                  <Wallet size={20} className="text-[#39e7f5]" />
                </div>
                <h3 className="font-medium">Fundraising Wallet</h3>
              </div>
              <div className="pl-10">
                <div className="bg-[#131e32] p-3 rounded-md font-mono text-sm break-all">
                  {fundingData.walletAddress}
                </div>
                <button className="text-[#39e7f5] text-sm mt-2 hover:underline">Copy Address</button>
              </div>
            </div>
          )}

          {/* Valuations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0f1a2c] rounded-lg p-5">
              <h3 className="font-medium mb-2">Fully Diluted Valuation</h3>
              <p className="text-xl font-bold text-white">{fundingData.fullyDilutedValuation}</p>
              <p className="text-gray-400 text-sm mt-1">Based on total token supply</p>
            </div>

            <div className="bg-[#0f1a2c] rounded-lg p-5">
              <h3 className="font-medium mb-2">Initial Market Cap</h3>
              <p className="text-xl font-bold text-white">{fundingData.initialMarketCap}</p>
              <p className="text-gray-400 text-sm mt-1">At Token Generation Event</p>
            </div>
          </div>

          {/* Vesting Summary */}
          <div className="bg-[#0f1a2c] rounded-lg p-5">
            <h3 className="font-medium mb-3">Vesting Summary</h3>
            <div className="bg-[#131e32] p-4 rounded-md">
              <p className="text-gray-300 text-sm leading-relaxed">{fundingData.vestingSummary}</p>
            </div>
          </div>

          {/* Funding Deadline */}
          <div className="bg-[#0f1a2c] rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[#131e32] p-2 rounded-full">
                <Calendar size={20} className="text-[#39e7f5]" />
              </div>
              <h3 className="font-medium">Funding Deadline</h3>
            </div>
            <div className="pl-10">
              <p className="text-xl font-bold text-white">{fundingData.deadline}</p>
              <p className="text-gray-400 text-sm mt-1">{fundingData.daysRemaining} days remaining</p>
            </div>
          </div>
        </div>
      </div>

      {/* Deal Details Section */}
      <div className="bg-[#0c1425] rounded-lg p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <h2 className="text-2xl font-bold mb-1">Deal Details</h2>
        <p className="text-gray-400 text-sm mb-6">Information about the current funding round</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0f1a2c] rounded-lg p-5">
            <h3 className="text-gray-400 text-sm mb-1">Deal Name</h3>
            <p className="text-xl font-bold">{fundingData.dealName}</p>
          </div>

          <div className="bg-[#0f1a2c] rounded-lg p-5">
            <h3 className="text-gray-400 text-sm mb-1">Deal Round</h3>
            <p className="text-xl font-bold">{fundingData.dealRound}</p>
            <div className="mt-2 inline-block bg-[#5b5bf8] text-white text-xs px-3 py-1 rounded-full">
              {fundingData.dealStatus}
            </div>
          </div>

          <div className="bg-[#0f1a2c] rounded-lg p-5">
            <h3 className="text-gray-400 text-sm mb-1">Token Price</h3>
            <p className="text-xl font-bold">{fundingData.tokenPrice}</p>
            <p className="text-[#39e7f5] text-sm mt-1">{fundingData.tokenRatio}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
