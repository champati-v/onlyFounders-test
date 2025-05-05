"use client"

import { useParams } from "next/navigation"

import { PageLayout } from "../../../layout/page-layout"
import { MilestoneCard } from "../../../milestones/milestone-card"
import { isOwnedCampaign } from "@/lib/data"

// Total funding amount
const TOTAL_FUNDING = 500000 // 500,000 USDC
const MILESTONE_COUNT = 6

// Calculate release amount per milestone
const RELEASE_PER_MILESTONE = Math.round(TOTAL_FUNDING / MILESTONE_COUNT)
const FUNDING_PERCENTAGE_PER_MILESTONE = Math.round(100 / MILESTONE_COUNT)

export default function MilestonesPage() {
  const params = useParams()
  const campaignId = params.id as string
  const isOwner = isOwnedCampaign(campaignId)

  console.log("Current campaign ID:", campaignId, "Is owner:", isOwner)

  const milestones = [
    {
      id: "milestone-1",
      number: 1,
      title: "Problem-Solution Validation",
      description: "Proving you've identified a real problem worth solving",
      tasks: [
        {
          id: "task-1-1",
          title: "Customer Discovery",
          description:
            "Complete and document at least 25 interviews with potential users in your target market. These interviews should validate the problem exists and is painful enough that people would pay for a solution.",
          status: "completed",
        },
        {
          id: "task-1-2",
          title: "Problem Statement Whitepaper",
          description:
            "Create a comprehensive document (at least 10 pages) that clearly defines the problem, analyzes the market size (TAM/SAM/SOM), and outlines your solution approach.",
          status: "rejected",
          rejectionReason:
            "The whitepaper lacks sufficient market analysis. Please include more detailed TAM/SAM/SOM calculations and competitive landscape analysis.",
          submissionCount: 1,
        },
        {
          id: "task-1-3",
          title: "Community Interest",
          description:
            "Demonstrate early interest by collecting at least 250 wallet addresses from potential users through your interest collection smart contract.",
          status: "review_pending",
          submissionDate: "Apr 15, 2025",
        },
      ],
      releaseAmount: RELEASE_PER_MILESTONE,
      fundingPercentage: FUNDING_PERCENTAGE_PER_MILESTONE,
      progress: 33, // 1 out of 3 tasks completed
      status: "in-progress",
    },
    {
      id: "milestone-2",
      number: 2,
      title: "MVP Development",
      description: "Building and testing the first version of your product",
      tasks: [
        {
          id: "task-2-1",
          title: "Technical Architecture",
          description:
            "Develop and document the technical architecture, including system diagrams, data models, and API specifications.",
          status: "completed",
        },
        {
          id: "task-2-2",
          title: "Core Functionality",
          description:
            "Implement the core functionality of your product, focusing on the key features that solve the identified problem.",
          status: "rejected",
          rejectionReason:
            "The implementation is missing key security features. Please address the vulnerabilities identified in the security review and resubmit with proper authentication and authorization mechanisms.",
          submissionCount: 2,
        },
        {
          id: "task-2-3",
          title: "Internal Testing",
          description: "Complete internal testing of the MVP, documenting bugs, issues, and areas for improvement.",
          status: "review_pending",
          submissionDate: "Apr 17, 2025",
        },
        {
          id: "task-2-4",
          title: "Security Audit",
          description:
            "Conduct a preliminary security audit of your codebase and infrastructure, addressing any critical vulnerabilities.",
          status: "pending",
        },
      ],
      releaseAmount: RELEASE_PER_MILESTONE,
      fundingPercentage: FUNDING_PERCENTAGE_PER_MILESTONE,
      progress: 25, // 1 out of 4 tasks completed
      status: "in-progress",
    },
    {
      id: "milestone-3",
      number: 3,
      title: "Beta Launch",
      description: "Releasing your product to a limited audience for feedback",
      tasks: [
        {
          id: "task-3-1",
          title: "Beta User Recruitment",
          description:
            "Recruit at least 50 beta users who match your target customer profile and are willing to provide detailed feedback.",
          status: "pending",
        },
        {
          id: "task-3-2",
          title: "User Onboarding Process",
          description:
            "Develop and implement a user onboarding process that guides new users through your product's key features.",
          status: "pending",
        },
        {
          id: "task-3-3",
          title: "Feedback Collection System",
          description:
            "Create a system for collecting, organizing, and prioritizing user feedback during the beta phase.",
          status: "pending",
        },
      ],
      releaseAmount: RELEASE_PER_MILESTONE,
      fundingPercentage: FUNDING_PERCENTAGE_PER_MILESTONE,
      progress: 0, // 0 out of 3 tasks completed
      status: "upcoming",
    },
    {
      id: "milestone-4",
      number: 4,
      title: "Market Validation",
      description: "Proving market demand through user metrics and feedback",
      tasks: [
        {
          id: "task-4-1",
          title: "User Engagement Metrics",
          description:
            "Demonstrate user engagement with key metrics such as daily active users, session duration, and feature usage.",
          status: "pending",
        },
        {
          id: "task-4-2",
          title: "User Feedback Analysis",
          description:
            "Analyze and document user feedback, identifying patterns, pain points, and opportunities for improvement.",
          status: "pending",
        },
        {
          id: "task-4-3",
          title: "Product Iteration",
          description:
            "Implement at least three significant product improvements based on user feedback and usage data.",
          status: "pending",
        },
      ],
      releaseAmount: RELEASE_PER_MILESTONE,
      fundingPercentage: FUNDING_PERCENTAGE_PER_MILESTONE,
      progress: 0, // 0 out of 3 tasks completed
      status: "upcoming",
    },
    {
      id: "milestone-5",
      number: 5,
      title: "Public Launch",
      description: "Officially launching your product to the public",
      tasks: [
        {
          id: "task-5-1",
          title: "Marketing Campaign",
          description:
            "Develop and execute a comprehensive marketing campaign to announce your public launch, including content, social media, and community engagement.",
          status: "pending",
        },
        {
          id: "task-5-2",
          title: "Product Documentation",
          description:
            "Create comprehensive product documentation, including user guides, FAQs, and technical documentation.",
          status: "pending",
        },
        {
          id: "task-5-3",
          title: "Support Infrastructure",
          description:
            "Establish customer support infrastructure, including support channels, response protocols, and knowledge base.",
          status: "pending",
        },
        {
          id: "task-5-4",
          title: "Public Launch Event",
          description:
            "Host a public launch event (virtual or physical) to showcase your product and engage with your community.",
          status: "pending",
        },
      ],
      releaseAmount: RELEASE_PER_MILESTONE,
      fundingPercentage: FUNDING_PERCENTAGE_PER_MILESTONE,
      progress: 0, // 0 out of 4 tasks completed
      status: "upcoming",
    },
    {
      id: "milestone-6",
      number: 6,
      title: "Growth & Scaling",
      description: "Expanding your user base and improving your product",
      tasks: [
        {
          id: "task-6-1",
          title: "User Acquisition Strategy",
          description:
            "Develop and implement a user acquisition strategy to grow your user base, with specific targets and channels.",
          status: "pending",
        },
        {
          id: "task-6-2",
          title: "Performance Optimization",
          description:
            "Optimize your product's performance, addressing any scalability issues, bottlenecks, or technical debt.",
          status: "pending",
        },
        {
          id: "task-6-3",
          title: "Growth Metrics",
          description:
            "Demonstrate growth with key metrics such as user acquisition rate, retention rate, and revenue (if applicable).",
          status: "pending",
        },
      ],
      releaseAmount: RELEASE_PER_MILESTONE,
      fundingPercentage: FUNDING_PERCENTAGE_PER_MILESTONE,
      progress: 0, // 0 out of 3 tasks completed
      status: "upcoming",
    },
  ]

  // Calculate total completed tasks
  const totalTasks = milestones.reduce((acc, milestone) => acc + milestone.tasks.length, 0)
  const completedTasks = milestones.reduce(
    (acc, milestone) => acc + milestone.tasks.filter((task) => task.status === "completed").length,
    0,
  )

  // Calculate overall progress percentage
  const overallProgress = Math.round((completedTasks / totalTasks) * 100)

  return (
    <PageLayout currentPage="milestones" campaignId={campaignId}>
      <div className="bg-[#0c1425] rounded-lg p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] mb-6">
        <h2 className="text-2xl font-bold mb-1">Project Milestones</h2>
        <p className="text-gray-400 text-sm mb-6">Track progress and funding releases based on completed milestones</p>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Overall Project Progress</span>
            <span className="font-medium">{overallProgress}%</span>
          </div>
          <div className="w-full bg-[#131e32] h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#3b82f6] to-[#39e7f5]"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-400">
              {completedTasks} of {totalTasks} tasks completed
            </span>
            <span className="text-sm text-[#39e7f5]">{RELEASE_PER_MILESTONE.toLocaleString()} USDC per milestone</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
            <span className="text-sm">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
            <span className="text-sm">Rejected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
            <span className="text-sm">Review Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
            <span className="text-sm">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6b7280]"></div>
            <span className="text-sm">Upcoming</span>
          </div>
        </div>

        <div>
          {milestones.map((milestone) => (
            <MilestoneCard key={milestone.id} {...milestone} campaignId={campaignId} isOwner={isOwner} />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
