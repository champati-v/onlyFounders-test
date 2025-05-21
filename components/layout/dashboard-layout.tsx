"use client"

import { API_URL } from "@/lib/config"
import { useEffect, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AppLayout } from "@/components/layout/app-layout"
import { Separator } from "@/components/ui/separator"
import {
  Building,
  ChevronRight,
  Home,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Settings,
  Users,
  Wallet,
  Star,
  CheckCircle,
  FileText,
} from "lucide-react"
import { useUser } from "@auth0/nextjs-auth0/client"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  const isInvestorDashboard = pathname?.startsWith("/investor-dashboard")
  const isFounderDashboard = pathname?.startsWith("/founder-dashboard")
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const { user, isLoading} = useUser()
  const name = user?.name
  const [role, setRole] = useState<string>("");

  // Define navigation items for both dashboards
  const investorNavItems = [
    { href: "/investor-dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/investor-dashboard/portfolio", label: "Portfolio", icon: Wallet },
    { href: "/investor-dashboard/watchlist", label: "Watchlist", icon: Star },
    { href: "/investor-dashboard/analytics", label: "Analytics", icon: LineChart },
  ]

  const founderNavItems = [
    { href: "/founder-dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/founder-dashboard/milestones", label: "Milestones", icon: CheckCircle },
    { href: "/founder-dashboard/investors", label: "Investors", icon: Users },
    { href: "/founder-dashboard/updates", label: "Updates", icon: FileText },
    { href: "/founder-dashboard/analytics", label: "Analytics", icon: LineChart },
  ]

  // Select the appropriate navigation items based on the current dashboard
  const sidebarNavItems = isInvestorDashboard ? investorNavItems : founderNavItems

  // Function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/investor-dashboard" && pathname === "/investor-dashboard") {
      return true
    }
    if (path === "/founder-dashboard" && pathname === "/founder-dashboard") {
      return true
    }
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  useEffect(() => {
          const getOnboardingStatus = async () => {
            try {
              if (!user || isLoading) return;
        
              setIsProfileLoading(true);
              const userID = user.sub?.substring(14);
        
              const response = await fetch(
                `${API_URL}/api/profile/get-onboarding-status`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    user_id: userID || "",
                  },
                }
              );
        
              const data = await response.json();
              setRole(data.role);
  
            } catch (error) {
              console.error("Error checking profile status:", error);
            } finally {
              setIsProfileLoading(false);
            }
          };
        
          getOnboardingStatus();
        }, [user, isLoading]);

  return (
    <AppLayout className="">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-white">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href={isInvestorDashboard ? "/investor-dashboard" : "/founder-dashboard"} className="hover:text-white">
            {isInvestorDashboard ? "Investor Dashboard" : "Founder Dashboard"}
          </Link>
          {pathname !== "/investor-dashboard" && pathname !== "/founder-dashboard" && pathname && (
            <>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-white">
                {pathname
                  .split("/")
                  .pop()
                  ?.replace(/-/g, " ")
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </span>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          <aside className="hidden md:block">
            <div className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border border-purple-800/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full overflow-hidden relative">
                  <Image src={user?.picture} alt="User Avatar" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{name}</h3>
                  <p className="text-xs text-purple-200/70">{isInvestorDashboard ? "Investor" : "Founder"}</p>
                </div>
              </div>

              <Separator className="bg-purple-800/20 my-4" />

              <nav className="space-y-1">
                {sidebarNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                      isActive(item.href)
                        ? "bg-purple-900/50 text-white"
                        : "text-purple-200/70 hover:bg-purple-900/30 hover:text-white",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              <Separator className="bg-purple-800/20 my-4" />

              <div className="space-y-1">
                {role.includes("Founder") && isInvestorDashboard && (
                  <Link
                    href='/founder-dashboard'
                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-colors"
                  >
                    <Building className="h-4 w-4" />
                    <span>Switch To Founder</span>
                  </Link>
                )}
                {role.includes("Investor") && isFounderDashboard && (
                  <Link
                    href='/investor-dashboard'
                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-colors"
                  >
                    <Building className="h-4 w-4" />
                    <span>Switch To Investor</span>
                  </Link>
                )}
              </div>
            </div>
          </aside>

          <main>{children}</main>
        </div>
      </div>
    </AppLayout>
  )
}

