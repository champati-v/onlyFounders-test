"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, Check, ChevronDown, ChevronUp, Clock, Eye, Upload, XCircle } from "lucide-react"

import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "completed" | "rejected" | "review_pending"
  rejectionReason?: string
  submissionCount?: number
  submissionDate?: string
}

interface MilestoneProps {
  id: string
  number: number
  title: string
  description: string
  tasks: Task[]
  releaseAmount: number
  fundingPercentage: number
  progress: number
  status: "completed" | "in-progress" | "upcoming"
  isOwnCampaign?: boolean
}

export function MilestoneCard({
  id,
  number,
  title,
  description,
  tasks,
  releaseAmount,
  fundingPercentage,
  progress,
  status,
  isOwnCampaign = false,
}: MilestoneProps) {
  console.log(`Rendering MilestoneCard ${id} with isOwnCampaign:`, isOwnCampaign)

  const [expanded, setExpanded] = useState(false)
  const [showProofModal, setShowProofModal] = useState(false)
  const [showViewProofModal, setShowViewProofModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const openProofModal = (task: Task) => {
    console.log("Opening proof modal for task:", task.id)
    setSelectedTask(task)
    setShowProofModal(true)
  }

  const openViewProofModal = (task: Task) => {
    console.log("Opening view proof modal for task:", task.id)
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

  // Get status color
  const getStatusColor = () => {
    switch (status) {
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
      className={`rounded-lg overflow-hidden border ${getStatusColor()} mb-8 transition-all duration-300 ${
        expanded ? "shadow-lg" : ""
      }`}
    >
      {/* Milestone Header */}
      <div className="bg-[#0c1425] p-5 border-b border-[#1e293b]">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-start gap-4">
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                status === "completed"
                  ? "bg-[#10b981] text-white"
                  : status === "in-progress"
                    ? "bg-[#3b82f6] text-white"
                    : "bg-[#1e293b] text-gray-400"
              }`}
            >
              {number}
            </div>
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-gray-400 text-sm mt-1">{description}</p>
            </div>
          </div>
          <button
            onClick={toggleExpanded}
            className="bg-[#131e32] p-2 rounded-full hover:bg-[#1e293b] transition-colors"
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 min-w-[200px]">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress
              value={progress}
              className="h-2"
              indicatorClassName={
                status === "completed" ? "bg-[#10b981]" : status === "in-progress" ? "bg-[#3b82f6]" : "bg-[#6b7280]"
              }
            />
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-400">Release Amount</div>
            <div className="font-bold">{Math.round(releaseAmount).toLocaleString()} USDC</div>
            <div className="text-xs text-[#39e7f5]">{Math.round(fundingPercentage)}% of total funding</div>
          </div>
        </div>
      </div>

      {/* Milestone Tasks */}
      {expanded && (
        <div className="p-5 bg-[#0f1a2c]">
          <h4 className="font-medium mb-4">Tasks</h4>
          <div className="space-y-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex gap-4 p-4 rounded-lg ${
                  task.status === "rejected"
                    ? "bg-[#ef4444]/10 border border-[#ef4444]/30"
                    : task.status === "review_pending"
                      ? "bg-[#f59e0b]/10 border border-[#f59e0b]/30"
                      : "bg-[#131e32]"
                }`}
              >
                {getTaskStatusIndicator(task)}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium">{task.title}</h5>

                    {/* Always show buttons for testing */}
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
                  <p className="text-gray-400 text-sm mt-1">{task.description}</p>

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

                  {task.status === "rejected" && (
                    <div className="mt-3 bg-[#ef4444]/20 p-3 rounded border border-[#ef4444]/30">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={16} className="text-[#ef4444] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[#ef4444] text-sm font-medium">Proof Rejected</p>
                          <p className="text-gray-300 text-sm mt-1">{task.rejectionReason}</p>
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
          <div className="bg-[#0c1425] rounded-lg max-w-lg w-full p-6">
            <h3 className="text-xl font-bold mb-1">
              {selectedTask.status === "rejected" ? "Resubmit Proof" : "Submit Proof"}
            </h3>
            <p className="text-gray-400 text-sm mb-4">Task: {selectedTask.title}</p>

            {selectedTask.status === "rejected" && selectedTask.rejectionReason && (
              <div className="mb-4 bg-[#ef4444]/20 p-3 rounded border border-[#ef4444]/30">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-[#ef4444] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[#ef4444] text-sm font-medium">Previous Submission Rejected</p>
                    <p className="text-gray-300 text-sm mt-1">{selectedTask.rejectionReason}</p>
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
                <div className="border-2 border-dashed border-[#1e293b] rounded-md p-6 text-center">
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
          <div className="bg-[#0c1425] rounded-lg max-w-lg w-full p-6">
            <h3 className="text-xl font-bold mb-1">Proof of Completion</h3>
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
                    <span>technical-documentation.pdf</span>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 px-3">
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
                    <span>demo-video.mp4</span>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 px-3">
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
                    <span>code-repository.zip</span>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 px-3">
                    Download
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-[#10b981]">
                <Check size={16} />
                <span className="text-sm font-medium">Verified by admin on April 15, 2025</span>
              </div>
              <Button onClick={closeViewProofModal}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
