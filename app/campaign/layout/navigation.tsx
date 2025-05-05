import Link from "next/link"

interface NavigationProps {
  currentPage: "overview" | "funding-details" | "milestones" | "team" | "tokenomics" | "faq" | "updates"
}

export function Navigation({ currentPage }: NavigationProps) {
  return (
    <div className="px-6 mt-4 overflow-x-auto">
      <nav className="bg-[#0c1425] rounded-lg inline-flex p-3 space-x-5 min-w-max">
        <Link
          href="/"
          className={`${currentPage === "overview" ? "text-white" : "text-[#6b7280]"} hover:text-gray-300 whitespace-nowrap`}
        >
          Overview
        </Link>
        <Link
          href="/funding-details"
          className={`${currentPage === "funding-details" ? "text-white" : "text-[#6b7280]"} hover:text-gray-300 whitespace-nowrap`}
        >
          Funding Details
        </Link>
        <Link
          href="/milestones"
          className={`${currentPage === "milestones" ? "text-white" : "text-[#6b7280]"} hover:text-gray-300 whitespace-nowrap`}
        >
          Milestones
        </Link>
        <Link
          href="/team"
          className={`${currentPage === "team" ? "text-white" : "text-[#6b7280]"} hover:text-gray-300 whitespace-nowrap`}
        >
          Team
        </Link>
        <Link
          href="/tokenomics"
          className={`${currentPage === "tokenomics" ? "text-white" : "text-[#6b7280]"} hover:text-gray-300 whitespace-nowrap`}
        >
          Tokenomics
        </Link>
        <Link
          href="/faq"
          className={`${currentPage === "faq" ? "text-white" : "text-[#6b7280]"} hover:text-gray-300 whitespace-nowrap`}
        >
          FAQ
        </Link>
        <Link
          href="/updates"
          className={`${currentPage === "updates" ? "text-white" : "text-[#6b7280]"} hover:text-gray-300 whitespace-nowrap`}
        >
          Updates
        </Link>
      </nav>
    </div>
  )
}
