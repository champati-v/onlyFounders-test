"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import type { CampaignDetail } from "@/lib/types"

interface FaqTabProps {
  campaign: CampaignDetail
}

interface FaqItemProps {
  question: string
  answer: string
  isOpen: boolean
  toggleOpen: () => void
}

function FaqItem({ question, answer, isOpen, toggleOpen }: FaqItemProps) {
  return (
    <div className="bg-[#0f1a2c] rounded-lg overflow-hidden border border-transparent hover:border-[#1e293b] transition-colors duration-300">
      <button
        className="w-full p-4 sm:p-5 text-left flex justify-between items-center"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <h3 className="font-medium text-base sm:text-lg pr-2">{question}</h3>
        {/* <ChevronDown
          size={18}
          sm:size={20}
          className={`text-[#39e7f5] transition-transform duration-300 ease-in-out flex-shrink-0 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        /> */}
      </button>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          overflow: "hidden",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={`p-4 sm:p-5 pt-0 text-gray-300 text-sm transition-all duration-500 ease-in-out ${
            isOpen ? "transform translate-y-0 pb-4 sm:pb-5" : "transform -translate-y-4 pb-0"
          }`}
        >
          {answer}
        </div>
      </div>
    </div>
  )
}

export function FaqTab({ campaign }: FaqTabProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const faqs = campaign.faqs

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-[#0c1425] rounded-lg p-4 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
      <h2 className="text-xl sm:text-2xl font-bold mb-1">Frequently Asked Questions</h2>
      <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">Common questions about {campaign.name}</p>

      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            toggleOpen={() => toggleFaq(index)}
          />
        ))}
      </div>
    </div>
  )
}
