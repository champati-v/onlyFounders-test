"use client"

import { API_URL } from '@/lib/config';
import { useEffect, useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, ArrowLeft, ArrowRight } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

// Dynamic imports for better code splitting
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"

const FounderProfilePage = dynamic(() => import("../founder/page"), {
  loading: () => <ProfileSkeleton />,
})

const InvestorProfilePage = dynamic(() => import("../investor/page"), {
  loading: () => <ProfileSkeleton />,
})

const ServiceProviderProfilePage = dynamic(() => import("../service-provider/page"), {
  loading: () => <ProfileSkeleton />,
})

const ProfileSkeleton = () => (
  <div className="space-y-4 p-4">
    <Skeleton className="h-12 w-48" />
    <Skeleton className="h-32 w-full" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
    <Skeleton className="h-64 w-full" />
  </div>
)

const CombinedProfile = () => {
  const { user, isLoading: isUserLoading } = useUser()
  const [userRoles, setUserRoles] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [onboardingStatus, setOnboardingStatus] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const getOnboardingStatus = async () => {
      if (!user?.sub) return

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_URL}/api/profile/get-onboarding-status`, {
          method: "GET",
          headers: {
            user_id: user.sub.substring(14),
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }

        const data = await response.json()
        setOnboardingStatus(data.status)
        const rolesArray = Array.isArray(data.role) ? data.role : [data.role].filter(Boolean)

        if (rolesArray.length === 0) {
          console.log("No roles found in the response")
        } else {
          setUserRoles(rolesArray)
          setActiveTab(rolesArray[0]) // Default to first role
        }
      } catch (error) {
        console.error("Error fetching onboarding status:", error)
        setError("Failed to fetch user roles. Please try again later.")
        toast({
          title: "Failed to fetch onboarding status",
          description: "Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      getOnboardingStatus()
    } else if (!isUserLoading) {
      setIsLoading(false)
      setError("Please log in to view your profile.")
    }
  }, [user, isUserLoading])

  const renderProfileContent = () => {
    if (isUserLoading || isLoading) {
      return <ProfileSkeleton />
    }

    if (error) {
      return (
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )
    }

    if (userRoles.length === 0) {
      return (
        <Alert className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No roles found</AlertTitle>
          <AlertDescription>Please complete the onboarding process to set up your profile.</AlertDescription>
        </Alert>
      )
    }

    if(!onboardingStatus) {
      return (
        <div className="w-full max-w-4xl mx-auto px-4 p-10">
                <Skeleton className="h-48 w-full rounded-md bg-blue-600" />
                <div className="bg-[#121026] p-6 rounded-b-lg relative">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <Skeleton className="h-24 w-24 rounded-full -mt-12 border-4 border-[#121026] bg-gray-300" />
                      <div className="space-y-2 mt-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                    <Skeleton className="h-10 w-28" />
                  </div>
        
                  <div className="mt-6 space-y-2">
                    <div className="flex gap-2">
                      <Skeleton className="h-10 w-10 rounded" />
                      <Skeleton className="h-10 w-10 rounded" />
                      <Skeleton className="h-10 w-10 rounded" />
                    </div>
        
                    <div className="flex items-center gap-2 mt-4">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
        
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-40" />
                    </div>
        
                    <Skeleton className="h-4 w-full mt-6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
        
                    <Skeleton className="h-6 w-48 mt-6" />
                    <Skeleton className="h-10 w-32 rounded-full" />
        
                    <Skeleton className="h-6 w-48 mt-6" />
                    <div className="flex gap-2">
                      <Skeleton className="h-10 w-48 rounded-full" />
                      <Skeleton className="h-10 w-48 rounded-full" />
                      <Skeleton className="h-10 w-48 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
      )
    }

    return (
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center w-full mb-2">
        <TabsList
            className={`grid ${
              userRoles.length === 1 ? "grid-cols-1" : userRoles.length === 2 ? "grid-cols-2" : "grid-cols-3"
            } rounded-md bg-[#1a2035] w-fit`}
          >
            {userRoles.map((role) => (
              <TabsTrigger
                key={role}
                value={role}
                className="px-4 py-1.5 text-sm md:text-base font-medium rounded-md
                data-[state=active]:bg-gray-500 data-[state=active]:text-[#ffff] 
                data-[state=inactive]:bg-[#1a2035] data-[state=inactive]:text-gray-300"
              >
                {role}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {userRoles.map((role) => (
          <TabsContent key={role} value={role} className="mt-2">
            {role === "Founder" && <FounderProfilePage />}
            {role === "Investor" && <InvestorProfilePage />}
            {role === "ServiceProvider" && <ServiceProviderProfilePage />}
          </TabsContent>
        ))}
      </Tabs>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 min-h-screen">
      <Button variant={"outline"} className="mb-4 flex items-center gap-1" onClick={() => router.push("/")}>
        <ArrowLeft/> Back to Home
      </Button>
      {renderProfileContent()}

      {!onboardingStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/10">
          <div className="w-2/5 flex flex-col items-center bg-gray-900 p-6 rounded-lg shadow-lg">
            <div className='flex items-center mb-6'>
              <h2 className="text-xl text-center font-semibold">Complete Profile Setup</h2>
            </div>
            <p className="text-center text-sm">You Are All Set Up!</p>
            <p className="mb-4 text-center text-sm">Just Complete Your Profile For Full Access</p>
            <div className='flex items-center gap-2 w-full'>
              <Button onClick={() => router.push("/")} className="bg-transparent w-full">
                skip
              </Button>
              <Button onClick={() => router.push("/profile/setup")} className="text-black hover:bg-[#00d5ffe4] bg-[#00D3FF] w-full">
                Setup Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CombinedProfile
