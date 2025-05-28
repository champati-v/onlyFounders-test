import Link from "next/link"
import Image from "next/image"
import { Calendar, CheckCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Define the campaign type based on what the component expects
interface Category {
  name: string
}

interface CampaignProps {
  campaign: {
    id: string
    name: string
    description: string
    image: string
    logo: string
    categories: Category[]
    fundingGoal: number
    fundingRaised: number
    deadline: Date | null
    status: string
    isOwner: boolean
    totalMilestones: number
    milestonesCompleted: number
    numberOfInvestors: number
  }
}

export function CampaignCard({ campaign }: CampaignProps) {
  // Calculate funding progress percentage
  const progressPercentage = (campaign.fundingRaised / campaign.fundingGoal) * 100

  // Format date to display in a readable format
  const formatDate = (date: Date | null) => {
    if (!date) return "N/A"
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="overflow-hidden border-0 bg-[#0c1425] hover:bg-[#131e32] transition-colors duration-300 h-full">
      <div className="relative h-48 w-full">
        <Image
          src={campaign.image || "/placeholder.svg?height=192&width=384&query=blockchain project"}
          alt={campaign.name}
          fill
          className="object-cover"
        />
        {campaign.status === "Active" && (
          <Badge className="absolute top-3 right-3 bg-green-500 text-white border-0">Active</Badge>
        )}
        {campaign.status === "Completed" && (
          <Badge className="absolute top-3 right-3 bg-blue-500 text-white border-0">Completed</Badge>
        )}
        {campaign.status === "Pending" && (
          <Badge className="absolute top-3 right-3 bg-yellow-500 text-white border-0">Pending</Badge>
        )}
        {campaign.isOwner && (
          <Badge className="absolute top-3 left-3 bg-[#4361ff] text-white border-0">My Campaign</Badge>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-[#1e293b]">
            <Image
              src={campaign.logo || "/placeholder.svg?height=40&width=40&query=logo"}
              alt={`${campaign.name} logo`}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-bold text-lg line-clamp-1">{campaign.name}</h3>
        </div>

        <p className="text-gray-400 mb-4 line-clamp-2 h-12">{campaign.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {campaign.categories.map((category, index) => (
            <Badge key={index} className="bg-[#1e293b] text-gray-300 hover:bg-[#1e293b] border-0">
              {category.name}
            </Badge>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Raised</span>
              <span className="font-medium">
                {campaign.fundingRaised} USDC / {campaign.fundingGoal} USDC
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-[#1e293b]" indicatorClassName="bg-[#39e7f5]" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(campaign.deadline)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{campaign.numberOfInvestors} Investors</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle size={14} />
              <span>
                {campaign.milestonesCompleted}/{campaign.totalMilestones} Milestones
              </span>
            </div>
          </div>

          {/* View Campaign Button */}
          <div className="pt-4">
            <Link href={`/campaign/campaigns/${campaign.id}`} className="w-full block">
              <Button className="w-full bg-[#4361ff] hover:bg-[#4361ff]/90 text-white">View Campaign</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
