"use client"

import { API_URL } from '@/lib/config';
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Building, CheckCircle, User, Wallet } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useUser } from "@auth0/nextjs-auth0/client"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import axios from "axios"

export default function ProfileSetupPage() {
  const router = useRouter()
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, isLoading } = useUser()
  const { address, isConnected } = useAccount()

  useEffect(() => {
    toast({
      title: "Welcome to OnlyFounders",
      description: "Please Complete your profile to access the platform!",
      variant: "default",
    })
  }, [])

  const handleRoleToggle = (role: string) => {
    setSelectedTypes((prev) => {
      // If role is already selected, remove it
      if (prev.includes(role)) {
        return prev.filter((r) => r !== role)
      }
      // Otherwise add it to the array
      return [...prev, role]
    })
  }

  const handleContinue = async () => {
    if (selectedTypes.length === 0) return

    setIsSubmitting(true)

    try {
      const userId = user?.sub?.substring(14)

      if (!userId) {
        toast({
          title: "Authentication error",
          description: "Please sign in again to continue.",
          variant: "destructive",
        })
        router.push("/api/auth/login")
        return
      }

      const response = await fetch(`${API_URL}/api/profile/submit-role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          user_id: userId,
        },
        body: JSON.stringify({
          role: selectedTypes,
        }),
      })

      const getRole = await fetch(`${API_URL}/api/profile/get-onboarding-status`, {
        method: "GET",
        headers: {
          user_id: user?.sub?.substring(14),
        },
      })

    
      // const sendWallet = await axios.post(
      //   `${API_URL}/api/profile/add-walletAddress`,
      //   { walletAddress: address },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       user_id: userId,
      //     },
      //   }
      // );

      // if(sendWallet.status == 200) {
      //   console.log("Wallet address sent successfully")
      // }

      const roleData = await getRole.json()
      // Navigate to the next page based on the first selected role (0th index)
      const primaryRole = roleData.role[0]

      console.log("Role is", primaryRole)
      
      const roleCount = 0;

      if (primaryRole === "Founder") {
        router.push(`/profile/setup/founder/${roleCount}`)
      } else if (primaryRole === "Investor") {
        router.push(`/profile/setup/investor/${roleCount}`)
      } else if (primaryRole === "ServiceProvider") {
        router.push(`/profile/setup/serviceProvider/${roleCount}`)
      }
    } catch (error) {
      console.error("Error submitting role:", error)
      toast({
        title: "Something went wrong",
        description: "Failed to save your role. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome to OnlyFounders</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Complete your profile to get started with our Web3 fundraising platform
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Profile Setup</span>
                <span className="text-white font-medium">Step 1 of 2</span>
              </div>
              <Progress
                value={50}
                className="h-2 bg-gray-700"
                indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-400"
              />
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Choose Your Role(s)</CardTitle>
                <CardDescription className="text-gray-400">
                  Select how you want to use OnlyFounders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedTypes.includes("Founder")
                      ? "border-blue-600 bg-blue-950/20"
                      : "border-gray-800 bg-gray-800/50 hover:border-gray-700"
                  }`}
                  onClick={() => handleRoleToggle("Founder")}
                >
                  <div className="mr-4 p-2 rounded-full bg-blue-900/30">
                    <Building className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">I'm a Founder</h3>
                      {selectedTypes.includes("Founder")? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ): (
                        <div className="bg-gray-600 rounded-full h-5 w-5" />
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      Raise funds for your Web3 project, connect with investors, and grow your startup
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedTypes.includes("Investor")
                      ? "border-purple-600 bg-purple-950/20"
                      : "border-gray-800 bg-gray-800/50 hover:border-gray-700"
                  }`}
                  onClick={() => handleRoleToggle("Investor")}
                >
                  <div className="mr-4 p-2 rounded-full bg-purple-900/30">
                    <Wallet className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">I'm an Investor</h3>
                      {selectedTypes.includes("Investor")? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ): (
                          <div className="bg-gray-600 rounded-full h-5 w-5" />
                        )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      Discover promising Web3 projects, invest in blockchain startups, and track your portfolio
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedTypes.includes("ServiceProvider")
                      ? "border-amber-600 bg-amber-950/20"
                      : "border-gray-800 bg-gray-800/50 hover:border-gray-700"
                  }`}
                  onClick={() => handleRoleToggle("ServiceProvider")}
                >
                  <div className="mr-4 p-2 rounded-full bg-amber-900/30">
                    <User className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">I'm a Service Provider</h3>
                      {selectedTypes.includes("ServiceProvider")? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ): (
                            <div className="bg-gray-600 rounded-full h-5 w-5" />
                          )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      Connect with Startups, Mentor, Scale, Support and Build.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                {/* <CardDescription className="text-lg text-gray-400 mb-2">Connect Your Wallet</CardDescription>
                <div className="mb-4 w-full flex flex-col items-center gap-4">
                  <ConnectButton.Custom>
                            {({ account, openConnectModal, openAccountModal, mounted }) => {
                              const connected = mounted && account;
                              return (
                                <button
                                  onClick={
                                    connected ? openAccountModal : openConnectModal
                                  }
                                  className="flex items-center justify-center rounded-md w-full bg-gradient-to-r px-2 py-1.5 from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                >
                                  <Wallet className="mr-2 h-4 w-4" />
                                  <span className="block md:hidden">
                                    {connected
                                      ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
                                      : "Connect"}
                                  </span>
                                  <span className="hidden md:block">
                                    {connected
                                      ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
                                      : "Connect Wallet"}
                                  </span>
                                </button>
                              );
                            }}
                  </ConnectButton.Custom> */}
                <Button
                  // onClick={() => 
                  //   {isConnected? handleContinue() : toast({
                  //     title: "Wallet not connected",
                  //     description: "Please connect your wallet to continue.",
                  //     variant: "destructive",
                  //   })}}
                  onClick={() => handleContinue()}
                  disabled={selectedTypes.length === 0 || isSubmitting}
                  className="w-full bg-black hover:bg-gray-900 text-white border border-gray-800"
                >
                  {isSubmitting ? "Submitting..." : "Continue"}
                  {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
                {/* </div> */}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
