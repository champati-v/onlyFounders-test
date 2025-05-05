"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { Twitter, Github, Linkedin } from "lucide-react"

import { PageLayout } from "../../../layout/page-layout"

// Mock team data for each campaign
const campaignTeamData = {
  "onlyfounder-cyan": [
    {
      name: "Aeshna Jain",
      role: "Founder and CTO",
      bio: "Its a short Bio",
      image: "/team-member-1.jpg",
    },
    {
      name: "Aeshna Jain",
      role: "Founder and CTO",
      bio: "Its a short Bio",
      image: "/team-member-1.jpg",
    },
  ],
  decentravault: [
    {
      name: "Alex Chen",
      role: "CEO & Co-Founder",
      bio: "Former security engineer at AWS with 10+ years in cloud infrastructure",
      image: "/team-member-1.jpg",
    },
    {
      name: "Sophia Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Blockchain architect with experience at Filecoin and IPFS",
      image: "/team-member-1.jpg",
    },
    {
      name: "Marcus Johnson",
      role: "Head of Product",
      bio: "Product leader with background in distributed systems and storage solutions",
      image: "/team-member-1.jpg",
    },
  ],
  metacanvas: [
    {
      name: "Emma Wilson",
      role: "Founder & Creative Director",
      bio: "Digital artist and former gallery curator with passion for NFTs",
      image: "/team-member-1.jpg",
    },
    {
      name: "David Park",
      role: "Technical Lead",
      bio: "Full-stack developer specializing in web3 technologies and interactive experiences",
      image: "/team-member-1.jpg",
    },
    {
      name: "Olivia Chen",
      role: "Head of Community",
      bio: "Community builder with experience in NFT projects and digital art collectives",
      image: "/team-member-1.jpg",
    },
  ],
  quantumledger: [
    {
      name: "Dr. James Wilson",
      role: "Founder & Chief Scientist",
      bio: "Quantum computing researcher with PhD from MIT and 15+ publications",
      image: "/team-member-1.jpg",
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      bio: "Cryptography expert with background in post-quantum cryptographic algorithms",
      image: "/team-member-1.jpg",
    },
    {
      name: "Michael Thompson",
      role: "Head of Business Development",
      bio: "Former fintech executive with expertise in blockchain partnerships",
      image: "/team-member-1.jpg",
    },
  ],
}

export default function TeamPage() {
  const params = useParams()
  const campaignId = params.id as string

  // Get team data or use default if not found
  const teamMembers = campaignTeamData[campaignId as keyof typeof campaignTeamData] || []

  return (
    <PageLayout currentPage="team" campaignId={campaignId}>
      {/* Team Members Section */}
      <div className="bg-[#0c1425] rounded-lg p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <h3 className="text-xl font-bold mb-2">Team Members</h3>
        <p className="text-gray-400 text-sm mb-6">
          Meet the team behind {campaignId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-[#0f1a2c] rounded-lg p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#5b5bf8]/20 flex items-center justify-center">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{member.name}</h4>
                  <p className="text-[#39e7f5] text-sm">{member.role}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
              <div className="flex gap-3">
                <button className="text-gray-400 hover:text-white">
                  <Twitter size={18} />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <Github size={18} />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <Linkedin size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
