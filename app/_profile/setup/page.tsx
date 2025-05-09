"use client"

import { useState } from "react"
import Link from "next/link"
import { API_URL } from '@/lib/config';
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Building, User, Wallet } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useUser } from "@auth0/nextjs-auth0/client";

export default function ProfileSetupPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { user, isLoading } = useUser();

  const handleContinue = async () => {
    if (!selectedType) return

    setIsSubmitting(true)

    try {
      const userId = user.sub?.substring(14);

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
          role: selectedType,
        }),
      })

      // if (!response.ok) {
      //   throw new Error("Failed to submit role")
      // }

      // Navigate to the next page based on the selected role
      if (selectedType === "Founder") {
        router.push("/profile/setup/founder")
      } else if (selectedType === "Investor") {
        router.push("/profile/setup/investor")
      } else if (selectedType === "ServiceProvider") {
        router.push("/profile/setup/serviceProvider")
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
    <div className="max-w-4xl mx-auto py-12">
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
                <CardTitle className="text-xl text-white">Choose Your Role</CardTitle>
                <CardDescription className="text-gray-400">Select how you want to use Optimus AI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedType === "Founder"
                      ? "border-blue-600 bg-blue-950/20"
                      : "border-gray-800 bg-gray-800/50 hover:border-gray-700"
                  }`}
                  onClick={() => setSelectedType("Founder")}
                >
                  <div className="mr-4 p-2 rounded-full bg-blue-900/30">
                    <Building className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">I'm a Founder</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Raise funds for your Web3 project, connect with investors, and grow your startup
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedType === "Investor"
                      ? "border-purple-600 bg-purple-950/20"
                      : "border-gray-800 bg-gray-800/50 hover:border-gray-700"
                  }`}
                  onClick={() => setSelectedType("Investor")}
                >
                  <div className="mr-4 p-2 rounded-full bg-purple-900/30">
                    <Wallet className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">I'm an Investor</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Discover promising Web3 projects, invest in blockchain startups, and track your portfolio
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedType === "ServiceProvider"
                      ? "border-amber-600 bg-amber-950/20"
                      : "border-gray-800 bg-gray-800/50 hover:border-gray-700"
                  }`}
                  onClick={() => setSelectedType("ServiceProvider")}
                >
                  <div className="mr-4 p-2 rounded-full bg-amber-900/30">
                    <User className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Service Provider</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Access both founder and investor features to raise funds and invest in projects
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleContinue}
                  disabled={!selectedType || isSubmitting}
                  className="w-full bg-black hover:bg-gray-900 text-white border border-gray-800"
                >
                  {isSubmitting ? "Submitting..." : "Continue"}
                  {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

