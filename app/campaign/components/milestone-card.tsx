"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, Check, ChevronDown, ChevronUp, Clock, Eye, Upload, XCircle } from "lucide-react"

import type { Milestone, Task } from "@/lib/types"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface MilestoneCardProps {
  milestone: Milestone
  isOwner: boolean
  campaignId?: string
}

export function MilestoneCard({ milestone, isOwner, campaignId }: MilestoneCardProps) {
  const [expanded, setExpanded] = useState(milestone.number <= 2) // Auto-expand first two milestones
  const [showProofModal, setShowProofModal] = useState(false)
  const [showViewProofModal, setShowViewProofModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const openProofModal = (task: Task) => {
    setSelectedTask(task)
    setShowProofModal(true)
  }

  const openViewProofModal = (task: Task) => {
    setSelectedTask(task)
    setShowViewProofModal(true)
  }

  const closeProofModal = () => {
    setShowProofModal(false)
    setSelectedTask(null)
  }

  const closeViewProofModal = () => {
    setShowViewProofModal(false)
    setSelectedTask(null)
  }

  const submitProof = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the proof submission
    closeProofModal()
    alert("Proof submitted successfully! It will be reviewed by the admin.")
  }

  // Check if this is the OnlyFounder Cyan campaign
  const isOnlyFounderCyan = campaignId === "onlyfounder-cyan"

  // Get status color
  const getStatusColor = () => {
    switch (milestone.status) {
      case "completed":
        return "bg-[#10b981]/10 border-[#10b981]/30"
      case "in-progress":
        return "bg-[#3b82f6]/10 border-[#3b82f6]/30"
      case "upcoming":
        return "bg-[#1e293b] border-[#1e293b]"
      default:
        return "bg-[#1e293b] border-[#1e293b]"
    }
  }

  // Get task status indicator
  const getTaskStatusIndicator = (task: Task) => {
    switch (task.status) {
      case "completed":
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 bg-[#10b981]">
            <Check size={14} className="text-white" />
          </div>
        )
      case "rejected":
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 bg-[#ef4444]">
            <XCircle size={14} className="text-white" />
          </div>
        )
      case "review_pending":
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 bg-[#f59e0b]">
            <Clock size={14} className="text-white" />
          </div>
        )
      default:
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 bg-[#1e293b]"></div>
        )
    }
  }

  return (
    <div
      className={`rounded-lg overflow-hidden border ${getStatusColor()} mb-6 transition-all duration-300 ${
        expanded ? "shadow-lg" : ""
      }`}
    >
      {/* Milestone Header */}
      <div className="bg-[#0c1425] p-4 sm:p-5 border-b border-[#1e293b]">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-start gap-3 sm:gap-4">
            <div
              className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-base sm:text-lg ${
                milestone.status === "completed"
                  ? "bg-[#10b981] text-white"
                  : milestone.status === "in-progress"
                    ? "bg-[#3b82f6] text-white"
                    : "bg-[#1e293b] text-gray-400"
              }`}
            >
              {milestone.number}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold truncate">{milestone.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 line-clamp-2">{milestone.description}</p>
              {milestone.dueDate && <p className="text-[#39e7f5] text-xs mt-1">Due: {milestone.dueDate}</p>}
            </div>
          </div>
          <button
            onClick={toggleExpanded}
            className="bg-[#131e32] p-2 rounded-full hover:bg-[#1e293b] transition-colors flex-shrink-0 ml-2"
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-start sm:items-center justify-between">
          <div className="w-full sm:flex-1 sm:min-w-[200px]">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm font-medium">{formatPercentage(milestone.progress)}</span>
            </div>
            <Progress
              value={milestone.progress}
              className="h-2"
              indicatorClassName={
                milestone.status === "completed"
                  ? "bg-[#10b981]"
                  : milestone.status === "in-progress"
                    ? "bg-[#3b82f6]"
                    : "bg-[#6b7280]"
              }
            />
          </div>

          <div className="text-left sm:text-right">
            <div className="text-sm text-gray-400">Release Amount</div>
            <div className="font-bold">{formatCurrency(milestone.releaseAmount)}</div>
            <div className="text-xs text-[#39e7f5]">{milestone.fundingPercentage}% of total funding</div>
          </div>
        </div>
      </div>

      {/* Milestone Tasks */}
      {expanded && (
        <div className="p-4 sm:p-5 bg-[#0f1a2c]">
          <h4 className="font-medium mb-4">Tasks</h4>
          <div className="space-y-4 sm:space-y-6">
            {milestone.tasks.map((task) => (
              <div
                key={task.id}
                className={`flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg ${
                  task.status === "rejected"
                    ? "bg-[#ef4444]/10 border border-[#ef4444]/30"
                    : task.status === "review_pending"
                      ? "bg-[#f59e0b]/10 border border-[#f59e0b]/30"
                      : "bg-[#131e32]"
                }`}
              >
                {getTaskStatusIndicator(task)}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <h5 className="font-medium text-sm sm:text-base truncate">{task.title}</h5>

                    {/* Action buttons - only show for owners */}
                    {isOwner && isOnlyFounderCyan && (
                      <div className="flex-shrink-0">
                        {task.status === "completed" && (
                          <Button
                            onClick={() => openViewProofModal(task)}
                            size="sm"
                            className="bg-[#131e32] hover:bg-[#1e293b] text-white text-xs flex items-center gap-1 h-7 px-3"
                          >
                            <Eye size={12} />
                            View Proof
                          </Button>
                        )}
                        {task.status === "review_pending" && (
                          <div className="text-xs text-[#f59e0b] flex items-center gap-1 h-7 px-3">
                            <Clock size={12} />
                            Under Review
                          </div>
                        )}
                        {task.status === "rejected" && (
                          <Button
                            onClick={() => openProofModal(task)}
                            size="sm"
                            className="bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs flex items-center gap-1 h-7 px-3"
                          >
                            <Upload size={12} />
                            Resubmit Proof
                          </Button>
                        )}
                        {task.status === "pending" && (
                          <Button
                            onClick={() => openProofModal(task)}
                            size="sm"
                            className="bg-[#5b5bf8] hover:bg-[#4a4af0] text-white text-xs flex items-center gap-1 h-7 px-3"
                          >
                            <Upload size={12} />
                            Submit Proof
                          </Button>
                        )}
                      </div>
                    )}

                    {/* For non-owners, only show view proof for completed tasks */}
                    {!isOwner && task.status === "completed" && (
                      <Button
                        onClick={() => openViewProofModal(task)}
                        size="sm"
                        className="bg-[#131e32] hover:bg-[#1e293b] text-white text-xs flex items-center gap-1 h-7 px-3 flex-shrink-0"
                      >
                        <Eye size={12} />
                        View Proof
                      </Button>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1 line-clamp-3">{task.description}</p>

                  {task.status === "completed" && (
                    <div className="mt-2 text-xs text-[#10b981] flex items-center gap-1">
                      <Check size={12} />
                      <span>Completed</span>
                    </div>
                  )}

                  {task.status === "review_pending" && (
                    <div className="mt-2 text-xs text-[#f59e0b] flex items-center gap-1">
                      <Clock size={12} />
                      <span>Review Pending</span>
                      {task.submissionDate && (
                        <span className="ml-1 text-gray-400">Submitted on {task.submissionDate}</span>
                      )}
                    </div>
                  )}

                  {task.status === "rejected" && isOwner && (
                    <div className="mt-3 bg-[#ef4444]/20 p-3 rounded border border-[#ef4444]/30">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={16} className="text-[#ef4444] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[#ef4444] text-sm font-medium">Proof Rejected</p>
                          <p className="text-gray-300 text-xs sm:text-sm mt-1">{task.rejectionReason}</p>
                          {task.submissionCount && (
                            <p className="text-gray-400 text-xs mt-2">Previous submissions: {task.submissionCount}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Proof Submission Modal */}
      {showProofModal && selectedTask && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0c1425] rounded-lg max-w-lg w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-1">
              {selectedTask.status === "rejected" ? "Resubmit Proof" : "Submit Proof"}
            </h3>
            <p className="text-gray-400 text-sm mb-4">Task: {selectedTask.title}</p>

            {selectedTask.status === "rejected" && selectedTask.rejectionReason && (
              <div className="mb-4 bg-[#ef4444]/20 p-3 rounded border border-[#ef4444]/30">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-[#ef4444] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[#ef4444] text-sm font-medium">Previous Submission Rejected</p>
                    <p className="text-gray-300 text-xs sm:text-sm mt-1">{selectedTask.rejectionReason}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={submitProof}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full bg-[#131e32] border border-[#1e293b] rounded-md p-3 text-white"
                  rows={4}
                  placeholder={
                    selectedTask.status === "rejected"
                      ? "Address the rejection reason and describe your updated submission..."
                      : "Describe what you've accomplished and how it meets the task requirements..."
                  }
                  required
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Upload Evidence</label>
                <div className="border-2 border-dashed border-[#1e293b] rounded-md p-4 sm:p-6 text-center">
                  <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-400 mb-2">Drag and drop files here, or click to browse</p>
                  <input type="file" className="hidden" id="file-upload" multiple />
                  <Button
                    type="button"
                    className="bg-[#131e32] hover:bg-[#1e293b] text-white"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    Browse Files
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={closeProofModal}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={
                    selectedTask.status === "rejected"
                      ? "bg-[#ef4444] hover:bg-[#dc2626] text-white"
                      : "bg-[#5b5bf8] hover:bg-[#4a4af0] text-white"
                  }
                >
                  {selectedTask.status === "rejected" ? "Resubmit Proof" : "Submit Proof"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Proof Modal */}
      {showViewProofModal && selectedTask && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0c1425] rounded-lg max-w-lg w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-1">Proof of Completion</h3>
            <p className="text-gray-400 text-sm mb-4">Task: {selectedTask.title}</p>

            <div className="mb-6">
              <h4 className="font-medium text-sm mb-2">Description</h4>
              <div className="bg-[#131e32] border border-[#1e293b] rounded-md p-4 text-gray-300 text-sm">
                <p>
                  This task was completed on April 12, 2025. The team successfully implemented all required
                  functionality and passed the verification process.
                </p>
                <p className="mt-3">
                  The implementation includes comprehensive documentation, test coverage, and meets all the requirements
                  specified in the milestone description.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-sm mb-2">Evidence</h4>
              <div className="space-y-3">
                <div className="bg-[#131e32] border border-[#1e293b] rounded-md p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#1e293b] p-2 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#39e7f5]"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <span className="text-sm truncate">technical-documentation.pdf</span>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 px-3 flex-shrink-0">
                    View
                  </Button>
                </div>

                <div className="bg-[#131e32] border border-[#1e293b] rounded-md p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#1e293b] p-2 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#39e7f5]"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                        <line x1="7" y1="2" x2="7" y2="22" />
                        <line x1="17" y1="2" x2="17" y2="22" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <line x1="2" y1="7" x2="7" y2="7" />
                        <line x1="2" y1="17" x2="7" y2="17" />
                        <line x1="17" y1="17" x2="22" y2="17" />
                        <line x1="17" y1="7" x2="22" y2="7" />
                      </svg>
                    </div>
                    <span className="text-sm truncate">demo-video.mp4</span>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 px-3 flex-shrink-0">
                    View
                  </Button>
                </div>

                <div className="bg-[#131e32] border border-[#1e293b] rounded-md p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#1e293b] p-2 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#39e7f5]"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.29 7 12 12 20.71 7" />
                        <line x1="12" y1="22" x2="12" y2="12" />
                      </svg>
                    </div>
                    <span className="text-sm truncate">code-repository.zip</span>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 px-3 flex-shrink-0">
                    Download
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-[#10b981]">
                <Check size={16} />
                <span className="text-sm font-medium">Verified by admin on April 15, 2025</span>
              </div>
              <Button onClick={closeViewProofModal} className="w-full sm:w-auto">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
