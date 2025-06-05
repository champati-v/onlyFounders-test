import { Calendar, DollarSign, Wallet } from "lucide-react"

import { PageLayout } from "../layout/page-layout"

export default function FundingDetailsPage() {
  return (
    <PageLayout currentPage="funding-details">
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
              <p className="text-xl font-bold text-white">Maximum cap: $10 Million USDC</p>
              <p className="text-gray-400 text-sm mt-1">Minimum investment: $1,000 USDC</p>
            </div>
          </div>

          {/* Fundraising Wallet */}
          <div className="bg-[#0f1a2c] rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[#131e32] p-2 rounded-full">
                <Wallet size={20} className="text-[#39e7f5]" />
              </div>
              <h3 className="font-medium">Fundraising Wallet</h3>
            </div>
            <div className="pl-10">
              <div className="bg-[#131e32] p-3 rounded-md font-mono text-sm break-all">
                0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
              </div>
              <button className="text-[#39e7f5] text-sm mt-2 hover:underline">Copy Address</button>
            </div>
          </div>

          {/* Valuations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0f1a2c] rounded-lg p-5">
              <h3 className="font-medium mb-2">Fully Diluted Valuation</h3>
              <p className="text-xl font-bold text-white">$50,000,000 USD</p>
              <p className="text-gray-400 text-sm mt-1">Based on total token supply</p>
            </div>

            <div className="bg-[#0f1a2c] rounded-lg p-5">
              <h3 className="font-medium mb-2">Initial Market Cap</h3>
              <p className="text-xl font-bold text-white">$5,000,000 USD</p>
              <p className="text-gray-400 text-sm mt-1">At Token Generation Event</p>
            </div>
          </div>

          {/* Vesting Summary */}
          <div className="bg-[#0f1a2c] rounded-lg p-5">
            <h3 className="font-medium mb-3">Vesting Summary</h3>
            <div className="bg-[#131e32] p-4 rounded-md">
              <p className="text-gray-300 text-sm leading-relaxed">
                10% of tokens unlocked at TGE (Token Generation Event). Remaining 90% vested linearly over 24 months
                with a 6-month cliff. Team tokens subject to 12-month lock-up period followed by 36-month linear
                vesting. Advisor tokens vested over 24 months with 3-month cliff.
              </p>
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
              <p className="text-xl font-bold text-white">December 31, 2025</p>
              <p className="text-gray-400 text-sm mt-1">68 days remaining</p>
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
            <p className="text-xl font-bold">Cyan Launch</p>
          </div>

          <div className="bg-[#0f1a2c] rounded-lg p-5">
            <h3 className="text-gray-400 text-sm mb-1">Deal Round</h3>
            <p className="text-xl font-bold">Seed Funding</p>
            <div className="mt-2 inline-block bg-[#5b5bf8] text-white text-xs px-3 py-1 rounded-full">Public Beta</div>
          </div>

          <div className="bg-[#0f1a2c] rounded-lg p-5">
            <h3 className="text-gray-400 text-sm mb-1">Token Price</h3>
            <p className="text-xl font-bold">$0.05 USD</p>
            <p className="text-[#39e7f5] text-sm mt-1">20 tokens per USDC</p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
