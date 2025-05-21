"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function MilestoneTracker() {
  //const [openProject, setOpenProject] = useState<string | null>("project1")

  //const projects = [
  //  {
  //    id: "project1",
  //    name: "DecentraVault",
  //    logo: "/placeholder.svg?height=48&width=48",
  //    invested: 10000,
  //    totalMilestones: 5,
  //    completedMilestones: 2,
  //    nextMilestone: {
  //      title: "Testnet Launch",
  //      dueDate: "May 20, 2025",
  //      description: "Deploy protocol on testnet and complete initial user testing",
  //      percentCompleted: 65,
  //      fundingAmount: 100000,
  //    },
  //    milestones: [
  //      {
  //        id: "m1",
  //        title: "Smart Contract Development",
  //        description: "Complete core smart contract development and internal testing",
  //        dueDate: "March 30, 2025",
  //        completionDate: "March 28, 2025",
  //        fundingAmount: 75000,
  //        percentCompleted: 100,
  //        status: "completed",
  //        fundingReleased: true,
  //        verificationProof: "https://github.com/decentravault/contracts",
  //      },
  //      {
  //        id: "m2",
  //        title: "Security Audit",
  //        description: "Complete comprehensive security audit by CertiK",
  //        dueDate: "April 15, 2025",
  //        completionDate: "April 10, 2025",
  //        fundingAmount: 50000,
  //        percentCompleted: 100,
  //        status: "completed",
  //        fundingReleased: true,
  //        verificationProof: "https://certik.com/projects/decentravault",
  //      },
  //      {
  //        id: "m3",
  //        title: "Testnet Launch",
  //        description: "Deploy protocol on testnet and complete initial user testing",
  //        dueDate: "May 20, 2025",
  //        completionDate: null,
  //        fundingAmount: 100000,
  //        percentCompleted: 65,
  //        status: "in_progress",
  //        fundingReleased: false,
  //        verificationProof: null,
  //      },
  //      {
  //        id: "m4",
  //        title: "Cross-Chain Integration",
  //        description: "Complete integration with Ethereum, BSC, and Polygon networks",
  //        dueDate: "June 30, 2025",
  //        completionDate: null,
  //        fundingAmount: 125000,
  //        percentCompleted: 30,
  //        status: "in_progress",
  //        fundingReleased: false,
  //        verificationProof: null,
  //      },
  //      {
  //        id: "m5",
  //        title: "Mainnet Launch",
  //        description: "Full production deployment on mainnet with all core features",
  //        dueDate: "August 15, 2025",
  //        completionDate: null,
  //        fundingAmount: 150000,
  //        percentCompleted: 0,
  //        status: "not_started",
  //        fundingReleased: false,
  //        verificationProof: null,
  //      },
  //    ],
  //  },
  //  {
  //    id: "project2",
  //    name: "MetaCanvas",
  //    logo: "/placeholder.svg?height=48&width=48",
  //    invested: 5000,
  //    totalMilestones: 4,
  //    completedMilestones: 1,
  //    nextMilestone: {
  //      title: "Beta Platform Launch",
  //      dueDate: "April 30, 2025",
  //      description: "Launch beta version of the NFT creation platform",
  //      percentCompleted: 80,
  //      fundingAmount: 75000,
  //    },
  //    milestones: [
  //      {
  //        id: "m1",
  //        title: "UI/UX Design",
  //        description: "Complete user interface design and user experience flows",
  //        dueDate: "March 15, 2025",
  //        completionDate: "March 20, 2025",
  //        fundingAmount: 50000,
  //        percentCompleted: 100,
  //        status: "completed",
  //        fundingReleased: true,
  //        verificationProof: "https://metacanvas.io/design",
  //      },
  //      {
  //        id: "m2",
  //        title: "Beta Platform Launch",
  //        description: "Launch beta version of the NFT creation platform",
  //        dueDate: "April 30, 2025",
  //        completionDate: null,
  //        fundingAmount: 75000,
  //        percentCompleted: 80,
  //        status: "in_progress",
  //        fundingReleased: false,
  //        verificationProof: null,
  //      },
  //      {
  //        id: "m3",
  //        title: "AI Integration",
  //        description: "Integrate AI-powered design tools for NFT creation",
  //        dueDate: "June 15, 2025",
  //        completionDate: null,
  //        fundingAmount: 100000,
  //        percentCompleted: 25,
  //        status: "in_progress",
  //        fundingReleased: false,
  //        verificationProof: null,
  //      },
  //      {
  //        id: "m4",
  //        title: "Marketplace Launch",
  //        description: "Launch NFT marketplace with trading functionality",
  //        dueDate: "July 30, 2025",
  //        completionDate: null,
  //        fundingAmount: 125000,
  //        percentCompleted: 0,
  //        status: "not_started",
  //        fundingReleased: false,
  //        verificationProof: null,
  //      },
  //    ],
  //  },
  //]

  return (
     <div className="relative">
    {/* Coming Soon Overlay */}
    <div className="absolute inset-0 bg-black/60 z-30 flex items-center justify-center rounded-lg">
      <span className="text-white text-4xl font-semibold">Coming Soon...</span>
    </div>
    <Card className="bg-[#202C41] border-[#313E54] mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-xl text-white">Project Milestones</CardTitle>
        <CardDescription className="text-[#A3A8AF]">
          Track progress against committed milestones and funding releases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mx-auto">
          {/* Milestone content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
            {/* Q1 2025 Milestone */}
            <div className="bg-[#1F2A3D] rounded-lg border border-[#313E54] p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-[#635BFF]">Q1 2025</Badge>
                <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                  Completed
                </Badge>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">MVP Launch</h3>
              <p className="text-sm text-[#A3A8AF] mb-4">
                Launch of core platform features including AI investment evaluation and DCA-enabled crowdfunding
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#A3A8AF]">Progress</span>
                  <span className="text-white">100%</span>
                </div>
                <Progress value={100} className="h-2 bg-[#1F2A3D]" indicatorClassName="bg-green-500" />
              </div>
              <div className="mt-4 pt-4 border-t border-[#313E54]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#A3A8AF]">Funds Released</span>
                  <span className="text-white">75,000 USDC</span>
                </div>
              </div>
            </div>

            {/* Q2 2025 Milestone */}
            <div className="bg-[#1F2A3D] rounded-lg border border-[#313E54] p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-[#635BFF]">Q2 2025</Badge>
                <Badge variant="outline" className="bg-amber-900/20 text-amber-400 border-amber-800">
                  In Progress
                </Badge>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Multi-Chain Integration</h3>
              <p className="text-sm text-[#A3A8AF] mb-4">
                Expand platform to support Ethereum, Solana, and Polygon networks with cross-chain functionality
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#A3A8AF]">Progress</span>
                  <span className="text-white">65%</span>
                </div>
                <Progress value={65} className="h-2 bg-[#1F2A3D]" indicatorClassName="bg-amber-500" />
              </div>
              <div className="mt-4 pt-4 border-t border-[#313E54]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#A3A8AF]">Funds Released</span>
                  <span className="text-white">50,000 USDC</span>
                </div>
              </div>
            </div>

            {/* Q3 2025 Milestone */}
            <div className="bg-[#1F2A3D] rounded-lg border border-[#313E54] p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-[#635BFF]">Q3 2025</Badge>
                <Badge variant="outline" className="bg-gray-800 text-gray-400 border-gray-700">
                  Upcoming
                </Badge>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Tokenized Equity</h3>
              <p className="text-sm text-[#A3A8AF] mb-4">
                Launch tokenized equity feature allowing startups to offer fractional ownership to investors
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#A3A8AF]">Progress</span>
                  <span className="text-white">0%</span>
                </div>
                <Progress value={0} className="h-2 bg-[#1F2A3D]" />
              </div>
              <div className="mt-4 pt-4 border-t border-[#313E54]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#A3A8AF]">Funds Released</span>
                  <span className="text-white">0 USDC</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <div>
              <h4 className="text-white font-medium">Total Funding</h4>
              <p className="text-[#A3A8AF] text-sm">Based on milestone completion</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-white">125,000 / 250,000 USDC</p>
              <p className="text-[#A3A8AF] text-sm">50% of total funding released</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

