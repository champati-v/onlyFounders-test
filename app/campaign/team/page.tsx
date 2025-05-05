import Image from "next/image"
import { Twitter, Github, Linkedin } from "lucide-react"

import { PageLayout } from "../layout/page-layout"

export default function TeamPage() {
  return (
    <PageLayout currentPage="team">
      {/* Team Members Section */}
      <div className="bg-[#0c1425] rounded-lg p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <h3 className="text-xl font-bold mb-2">Team Members</h3>
        <p className="text-gray-400 text-sm mb-6">Meet the team behind OnlyFounder Cyan</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Team Member Card 1 */}
          <div className="bg-[#0f1a2c] rounded-lg p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#5b5bf8]/20 flex items-center justify-center">
                <Image
                  src="/team-member-1.jpg"
                  alt="Aeshna Jain"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">Aeshna Jain</h4>
                <p className="text-[#39e7f5] text-sm">Founder and CTO</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">Its a short Bio</p>
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

          {/* Team Member Card 2 */}
          <div className="bg-[#0f1a2c] rounded-lg p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#5b5bf8]/20 flex items-center justify-center">
                <Image
                  src="/team-member-1.jpg"
                  alt="Aeshna Jain"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">Aeshna Jain</h4>
                <p className="text-[#39e7f5] text-sm">Founder and CTO</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">Its a short Bio</p>
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
        </div>
      </div>
    </PageLayout>
  )
}
