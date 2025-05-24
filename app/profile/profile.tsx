"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Settings, FileText, Users, ArrowRight, Home, ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useEffect } from "react"
import Loading from "../loading"
import { AppLayout } from "@/components/layout/app-layout"

export default function ProfilePage() {
  const router = useRouter()

  const {user, isLoading} = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/api/auth/login"); // Redirect to login if not authenticated
    }
  }, [user, isLoading, router]);

  if (isLoading) return <Loading></Loading>;
  if(!user) return null;

  return (
    <>
      {/* <Header /> */}
      <div className="container mx-auto py-8">
        {/* Breadcrumb navigation */}
        <div className="flex items-center text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-white flex items-center">
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-white">Profile</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">{(user as any).given_name} Profile</h1>
            <p className="text-gray-400">Manage your profile, settings, and account information</p>
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-600">
              <img src={(user as any).picture} alt={(user as any).given_name} className="object-cover w-full h-full" />
            </div>
          </div>

          {/* Dashboard navigation buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-400 hover:bg-blue-900/20"
              onClick={() => router.push("/investor-dashboard")}
            >
              Investor Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-purple-600 text-purple-400 hover:bg-purple-900/20"
              onClick={() => router.push("/founder-dashboard")}
            >
              Founder Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-green-600 text-green-400 hover:bg-green-900/20"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card
              className="bg-gray-900 border-gray-800 hover:border-blue-600 transition-colors cursor-pointer"
              onClick={() => router.push("/profile/setup")}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <User className="mr-2 h-5 w-5 text-blue-500" />
                  Profile Setup
                </CardTitle>
                <CardDescription className="text-gray-400">Complete or update your personal profile</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Update your personal information, skills, and experience to help us match you with the right
                  opportunities.
                </p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push("/profile/setup")
                  }}
                  className="w-full bg-black hover:bg-gray-900 text-white border border-gray-800"
                >
                  Go to Profile Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card
              className="bg-gray-900 border-gray-800 hover:border-purple-600 transition-colors cursor-pointer"
              onClick={() => router.push("/settings")}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Settings className="mr-2 h-5 w-5 text-purple-500" />
                  Account Settings
                </CardTitle>
                <CardDescription className="text-gray-400">Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Update your notification preferences, security settings, and connected wallets.
                </p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push("/settings")
                  }}
                  className="w-full bg-black hover:bg-gray-900 text-white border border-gray-800"
                >
                  Manage Settings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-green-600 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <FileText className="mr-2 h-5 w-5 text-green-500" />
                  Your Dashboards
                </CardTitle>
                <CardDescription className="text-gray-400">Access your personalized dashboards</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  View your investor or founder dashboard to track your investments or startup progress.
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={() => router.push("/investor-dashboard")}
                    className="w-full bg-black hover:bg-gray-900 text-white border border-gray-800"
                  >
                    Investor Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => router.push("/founder-dashboard")}
                    className="w-full bg-black hover:bg-gray-900 text-white border border-gray-800"
                  >
                    Founder Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-300">
                    <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">Joined DecentraVault investor pool</p>
                      <p className="text-sm text-gray-400">March 15, 2025</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <div className="h-8 w-8 rounded-full bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">Updated MetaCanvas milestone</p>
                      <p className="text-sm text-gray-400">March 10, 2025</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <div className="h-8 w-8 rounded-full bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <Settings className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">Completed profile setup</p>
                      <p className="text-sm text-gray-400">March 5, 2025</p>
                    </div>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4" onClick={() => router.push("/activity")}>
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start" onClick={() => router.push("/marketplace")}>
                    <FileText className="mr-2 h-4 w-4" />
                    Marketplace
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => router.push("/resources/grants")}>
                    <FileText className="mr-2 h-4 w-4" />
                    Grants
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => router.push("/network")}>
                    <Users className="mr-2 h-4 w-4" />
                    Network
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => router.push("/quests")}>
                    <FileText className="mr-2 h-4 w-4" />
                    Quests
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => router.push("/resources")}>
                    <FileText className="mr-2 h-4 w-4" />
                    Resources
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => router.push("/blog")}>
                    <FileText className="mr-2 h-4 w-4" />
                    Blog
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

