"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { PageLayout } from "../../../layout/page-layout"

// Mock FAQ data for each campaign
const campaignFaqData = {
  "onlyfounder-cyan": [
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
  ],
  decentravault: [
    {
      question: "What is DecentraVault?",
      answer:
        "DecentraVault is a decentralized storage solution that provides enhanced security and privacy for users' data. We leverage blockchain technology to create a distributed network of storage nodes that ensures data redundancy, encryption, and immutability.",
    },
    {
      question: "How does DecentraVault ensure data security?",
      answer:
        "DecentraVault uses a combination of advanced encryption, data sharding, and distributed storage across multiple nodes. Files are encrypted client-side before being split into multiple shards and distributed across the network. Only the data owner has the encryption keys, ensuring that even storage providers cannot access the content.",
    },
    {
      question: "What advantages does DecentraVault have over centralized storage solutions?",
      answer:
        "DecentraVault offers several advantages: (1) Enhanced privacy through client-side encryption, (2) Improved reliability with no single point of failure, (3) Reduced costs by leveraging unused storage capacity, (4) Censorship resistance, (5) Data ownership remains with users, not corporations, and (6) Tokenized incentives for storage providers.",
    },
    {
      question: "How can I become a storage provider on DecentraVault?",
      answer:
        "To become a storage provider, you need to stake DVT tokens as collateral and meet minimum hardware requirements. Once approved, your node will start receiving storage requests and earning rewards based on the amount of data stored and your uptime reliability. The platform includes reputation scoring to incentivize high-quality service.",
    },
    {
      question: "What happens if a storage node goes offline?",
      answer:
        "DecentraVault's architecture is designed for resilience. Data is redundantly stored across multiple nodes, so if one node goes offline, the system automatically retrieves data from other nodes. Additionally, the protocol continuously monitors node health and redistributes data as needed to maintain the required redundancy level.",
    },
  ],
  metacanvas: [
    {
      question: "What is MetaCanvas?",
      answer:
        "MetaCanvas is a Web3 creative platform designed for digital artists and collectors. It provides tools for creating, showcasing, and trading digital art as NFTs, while building community around creative expression in the metaverse.",
    },
    {
      question: "How does MetaCanvas differ from other NFT platforms?",
      answer:
        "MetaCanvas goes beyond simple NFT minting and trading by offering a complete creative ecosystem. We provide collaborative creation tools, interactive galleries, community curation mechanisms, and cross-platform metaverse integration. Our focus is on empowering artists with new creative possibilities rather than just tokenizing existing work.",
    },
    {
      question: "What types of digital art are supported?",
      answer:
        "MetaCanvas supports a wide range of digital art formats including 2D images, 3D models, interactive experiences, generative art, and audio-visual compositions. Our platform is designed to accommodate both established digital art forms and experimental new media.",
    },
    {
      question: "How are royalties handled for artists?",
      answer:
        "Artists receive automatic royalties for secondary sales through our smart contracts. The default royalty is 10%, but artists can adjust this rate when minting. Royalties are paid in real-time when sales occur, and our system tracks provenance across multiple marketplaces to ensure artists always receive their share.",
    },
    {
      question: "What blockchain does MetaCanvas use?",
      answer:
        "MetaCanvas is built on Ethereum with Layer 2 scaling solutions to minimize gas fees and environmental impact. We've implemented cross-chain bridges to support NFT portability across multiple ecosystems, allowing collectors to move their assets between different platforms and metaverses.",
    },
  ],
  quantumledger: [
    {
      question: "What is QuantumLedger?",
      answer:
        "QuantumLedger is a next-generation blockchain platform with quantum-resistant cryptography built into its core protocol. We're developing a secure, scalable infrastructure for the post-quantum era that protects digital assets against both classical and quantum computing attacks.",
    },
    {
      question: "Why is quantum resistance important?",
      answer:
        "Current blockchain cryptography (like ECDSA used in Bitcoin and Ethereum) is vulnerable to attacks from quantum computers using Shor's algorithm. As quantum computing advances, this poses an existential threat to existing blockchains. QuantumLedger uses post-quantum cryptographic algorithms that are secure against both classical and quantum attacks.",
    },
    {
      question: "How does QuantumLedger achieve quantum resistance?",
      answer:
        "We implement lattice-based cryptography and hash-based signature schemes that are considered secure against quantum attacks. Specifically, we use a modified version of the CRYSTALS-Dilithium algorithm for digital signatures and CRYSTALS-Kyber for key encapsulation, both NIST post-quantum cryptography standards.",
    },
    {
      question: "What advantages does QuantumLedger offer beyond quantum resistance?",
      answer:
        "Beyond quantum security, QuantumLedger features high throughput (10,000+ TPS), low latency finality, energy-efficient consensus, cross-chain interoperability, and advanced smart contract capabilities. Our architecture is designed for enterprise-grade applications while maintaining decentralization.",
    },
    {
      question: "When will quantum computers become a threat to existing blockchains?",
      answer:
        "Expert estimates vary, but many predict that quantum computers capable of breaking current cryptographic systems could emerge within 5-10 years. However, the migration to quantum-resistant systems needs to happen well before that point. QuantumLedger provides a future-proof solution that eliminates this uncertainty and risk.",
    },
  ],
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
  const params = useParams()
  const campaignId = params.id as string
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Get FAQ data or use default if not found
  const faqs = campaignFaqData[campaignId as keyof typeof campaignFaqData] || [
    {
      question: "No FAQs Available",
      answer: "This campaign has not provided any frequently asked questions.",
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <PageLayout currentPage="faq" campaignId={campaignId}>
      <div className="bg-[#0c1425] rounded-lg p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <h2 className="text-2xl font-bold mb-1">Frequently Asked Questions</h2>
        <p className="text-gray-400 text-sm mb-6">
          Common questions about {campaignId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
        </p>

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
