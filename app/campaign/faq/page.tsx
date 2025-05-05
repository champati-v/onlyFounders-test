"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { PageLayout } from "../layout/page-layout"

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
        className="w-full p-5 text-left flex justify-between items-center"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <h3 className="font-medium text-lg">{question}</h3>
        <ChevronDown
          size={20}
          className={`text-[#39e7f5] transition-transform duration-300 ease-in-out ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
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
          className={`p-5 pt-0 text-gray-300 transition-all duration-500 ease-in-out ${
            isOpen ? "transform translate-y-0 pb-5" : "transform -translate-y-4 pb-0"
          }`}
        >
          {answer}
        </div>
      </div>
    </div>
  )
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "What is OnlyFounder Cyan?",
      answer:
        "OnlyFounder Cyan is a decentralized platform that bridges knowledge and finance through blockchain technology. Our project aims to democratize access to financial opportunities while providing transparent and secure transactions for all participants in the ecosystem.",
    },
    {
      question: "How can I participate in the token sale?",
      answer:
        "To participate in the token sale, you need to complete KYC verification through our platform and have a compatible wallet (supporting ERC-20 tokens). Once verified, you can contribute USDC or ETH to the fundraising wallet address. The minimum investment is $1,000 USDC, and tokens will be distributed according to the vesting schedule after the sale concludes.",
    },
    {
      question: "What utility does the BGRT token provide?",
      answer:
        "The BGRT token serves multiple functions within our ecosystem: (1) Governance rights for protocol decisions, (2) Fee discounts for transactions, (3) Staking rewards and yield farming opportunities, (4) Access to premium features and services, and (5) Revenue sharing for token holders. The token is designed to align incentives between users, developers, and investors.",
    },
    {
      question: "What is the vesting schedule for tokens?",
      answer:
        "10% of tokens are unlocked at the Token Generation Event (TGE). The remaining 90% vest linearly over 24 months with a 6-month cliff. Team tokens are subject to a 12-month lock-up period followed by 36-month linear vesting. Advisor tokens vest over 24 months with a 3-month cliff. This vesting schedule is designed to ensure long-term commitment from all stakeholders.",
    },
    {
      question: "How is the project addressing security concerns?",
      answer:
        "Security is our top priority. We've implemented multiple layers of protection: (1) Smart contract audits by leading security firms, (2) Bug bounty programs to incentivize responsible disclosure, (3) Multi-signature wallets for treasury management, (4) Regular security assessments and penetration testing, and (5) Gradual rollout of features to minimize risk. Additionally, we maintain significant insurance coverage to protect against potential exploits.",
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <PageLayout currentPage="faq">
      <div className="bg-[#0c1425] rounded-lg p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <h2 className="text-2xl font-bold mb-1">Frequently Asked Questions</h2>
        <p className="text-gray-400 text-sm mb-6">Common questions about OnlyFounder Cyan</p>

        <div className="space-y-4">
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
    </PageLayout>
  )
}
