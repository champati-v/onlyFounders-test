import { MilestoneCard } from "../../../milestones/milestone-card"

interface MilestonesTabProps {
  campaign: any
  isOwner: boolean
  campaignId: string
}

export function MilestonesTab({ campaign, isOwner, campaignId }: MilestonesTabProps) {
  // Calculate total completed tasks
  const totalTasks = campaign.milestones.reduce((acc: number, milestone: any) => acc + milestone.tasks.length, 0)
  const completedTasks = campaign.milestones.reduce(
    (acc: number, milestone: any) => acc + milestone.tasks.filter((task: any) => task.status === "completed").length,
    0,
  )

  // Calculate overall progress percentage
  const overallProgress = Math.round((completedTasks / totalTasks) * 100)

  return (
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
          <span className="text-sm text-[#39e7f5]">
            {Math.round(campaign.milestones[0]?.releaseAmount || 0).toLocaleString()} USDC per milestone
          </span>
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
        {campaign.milestones.map((milestone: any) => (
          <MilestoneCard key={milestone.id} {...milestone} campaignId={campaignId} isOwner={isOwner} />
        ))}
      </div>
    </div>
  )
}
