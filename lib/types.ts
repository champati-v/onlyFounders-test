// Campaign Types
export type CampaignStatus = "active" | "completed" | "upcoming"
export type TaskStatus = "pending" | "completed" | "rejected" | "review_pending"
export type MilestoneStatus = "upcoming" | "in-progress" | "completed"

export interface Category {
  name: string
  color: string
}

export interface Campaign {
  id: string
  name: string
  logo: string
  status: CampaignStatus
  categories: Category[]
  description: string
  raised: number
  goal: number
  deadline: string
  updated: string
  investors: number
  milestones: {
    completed: number
    total: number
  }
  isOwner: boolean
}

export interface Metrics {
  waitlistSignups: number
  strategicPartners: number
  communitySize: number
  monthlyActiveUsers: number
  dailyActiveUsers: number
  transactionFrequency: number
  revenue: number
}

export interface FundingDetails {
  maxCap: string
  minInvestment: string
  walletAddress: string
  fullyDilutedValuation: string
  initialMarketCap: string
  vestingSummary: string
  deadline: string
  daysRemaining: string
  dealName: string
  dealRound: string
  dealStatus: string
  tokenPrice: string
  tokenRatio: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}

export interface TokenDistribution {
  name: string
  percentage: number
}

export interface Tokenomics {
  tokenName: string
  symbol: string
  totalSupply: string
  tokenType: string
  distribution: TokenDistribution[]
  usecases: string[]
  chartImage?: string
}

export interface Faq {
  question: string
  answer: string
}

export interface Update {
  id: number
  title: string
  date: string
  content: string
  likes: number
  comments: number
  image?: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  rejectionReason?: string
  submissionCount?: number
  submissionDate?: string
}

export interface Milestone {
  id: string
  number: number
  title: string
  description: string
  tasks: Task[]
  releaseAmount: number
  fundingPercentage: number
  progress: number
  status: MilestoneStatus
  dueDate?: string
}

export interface CampaignDetail extends Campaign {
  metrics: Metrics
  fundingDetails: FundingDetails
  team: TeamMember[]
  tokenomics: Tokenomics
  faqs: Faq[]
  updates: Update[]
  milestones: Milestone[]
  website?: string
  whitepaper?: string
  github?: string
  discord?: string
  twitter?: string
  medium?: string
  telegram?: string
  demoVideo?: string
  project_id?: string
}
