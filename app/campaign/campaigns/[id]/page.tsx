"use client"

import { useParams } from "next/navigation"

import { getCampaignDetails, isOwnedCampaign } from "@/lib/data"
import { CampaignHeader } from "../../components/campaign-header"
import { FundingSidebar } from "../../components/funding-sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from "./tabs/overview-tab"
import { FundingDetailsTab } from "./tabs/funding-details-tab"
import { MilestonesTab } from "./tabs/milestones-tab"
import { TeamTab } from "./tabs/team-tab"
import { TokenomicsTab } from "./tabs/tokenomics-tab"
import { FaqTab } from "./tabs/faq-tab"
import { UpdatesTab } from "./tabs/updates-tab"

export default function CampaignDetailPage() {
  const params = useParams()
  const campaignId = params.id as string

  // Get campaign details
  const campaignDetails = getCampaignDetails(campaignId)
  const isOwner = isOwnedCampaign(campaignId)

  return (
    <div className="min-h-screen bg-[#050914] text-white">
      <CampaignHeader campaign={{ ...campaignDetails, milestones: { completed: campaignDetails.milestones.length, total: campaignDetails.milestones.length } }} />

      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-16 xl:px-16 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <div className="overflow-x-auto pb-2">
                <TabsList className="w-full flex whitespace-nowrap mb-4 sm:mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="funding-details">Funding Details</TabsTrigger>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview">
                <OverviewTab campaign={campaignDetails} />
              </TabsContent>

              <TabsContent value="funding-details">
                <FundingDetailsTab campaign={campaignDetails} />
              </TabsContent>

              <TabsContent value="milestones">
                <MilestonesTab campaign={campaignDetails} isOwner={isOwner} campaignId={campaignId} />
              </TabsContent>

              <TabsContent value="team">
                <TeamTab campaign={campaignDetails} />
              </TabsContent>

              <TabsContent value="tokenomics">
                <TokenomicsTab campaign={campaignDetails} />
              </TabsContent>

              <TabsContent value="faq">
                <FaqTab campaign={campaignDetails} />
              </TabsContent>

              <TabsContent value="updates">
                <UpdatesTab campaign={campaignDetails} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1 order-first lg:order-last">
            <FundingSidebar campaign={{ ...campaignDetails, milestones: { completed: campaignDetails.milestones.length, total: campaignDetails.milestones.length } }} />
          </div>
        </div>
      </div>
    </div>
  )
}
