'use client'

import { AppLayout } from "@/components/layout/app-layout";
import { API_URL } from '@/lib/config'; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import './globals.css'
import {
  ArrowRight,
  ArrowUpRightFromSquareIcon,
  Building,
  CheckCircle,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { featureCards } from "@/data/featureCards";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";


export default function HomePage() {
  const [projects, setProjects] = useState<
    Array<{
      startupName: string;
      startupStage: string;
      bannerImage?: string;
      startupLogo?: string;
      founderName: string;
      category: string;
      blockchainPlatform?: string[];
      tagline: string;
      totalRaised: number;
      goal?: number;
      deadline?: string;
      startup_id: string;
    }>
  >([]);
  const [isloading, setIsLoading] = useState(true);

  const {user, isLoading} = useUser();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [onboardingStatus, setOnboardingStatus] = useState(false);
  const [showOnboardingBar, setShowOnboardingBar] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();
  const {toast} = useToast();

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
    
          // if (!response.ok) {
          //   throw new Error(`API error: ${response.status}`);
          // }
    
          const data = await response.json();
          setOnboardingStatus(data.status);
          setShowOnboardingBar(data.status);

          // Navigate based on the fetched status
            if (!data.role || (Array.isArray(data.role) && data.role.length === 0)) {
            setShowOnboardingModal(true);
            } else {
            router.push("/");
            }
        } catch (error) {
          console.error("Error checking profile status:", error);
        } finally {
          setIsProfileLoading(false);
        }
      };
    
      getOnboardingStatus();
    }, [user, isLoading, router]);
    

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/api/startup/get-featured-projects`
        );

        // if (!response.ok) {
        //   throw new Error("Failed to fetch projects");
        // }

        const data = await response.json();

        if (Array.isArray(data.startups)) {
          setProjects(data.startups);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  
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

        if(response.status === 200) {
          toast({
            title: "Success",
            description: "Your role has been saved successfully.",
            variant: "default",
          })
          setShowOnboardingModal(false)
        }
  
        // const getRole = await fetch(`${API_URL}/api/profile/get-onboarding-status`, {
        //   method: "GET",
        //   headers: {
        //     user_id: user?.sub?.substring(14),
        //   },
        // })
  
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

  const showBar = !showOnboardingBar && user;
    
  return (
    <>
    {showBar && (
      <div className="w-full bg-slate-950 text-sm py-2 px-4 relative flex justify-center">
        <div className="flex flex-col md:flex-row items-center gap-1 text-center text-white max-w-screen-md">
          <span className="text-blue-400">Welcome to OnlyFounders!</span>
          <div className="flex items-center gap-1">
            <span>To get full access to our platform,</span>
            <span onClick={() => router.push('/profile/setup')} className="inline-flex items-center justify-center underline text-blue-400 cursor-pointer">
              complete your profile now
              <ArrowUpRightFromSquareIcon className="w-4 h-4 ml-1" />
            </span>
          </div>
        </div>
        
        {/* Close Button */}
        <button onClick={() => setShowOnboardingBar(true)} className="absolute right-3 md:right-4 top-4 md:top-1/2 -translate-y-1/2 text-white sm:right-6">
          <X className="w-4 h-4" />
        </button>
      </div>
    )}

    <AppLayout className="" showHero={true}>
      <section className="relative py-12 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900 z-0"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left side - Text content */}
            <div className="flex flex-col items-center md:items-start text-left space-y-6">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-sm font-medium text-white border-blue-500/20">
                The Future of Web3 Fundraising
              </Badge>

              <h1 className="text-4xl text-center md:text-start md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                Where{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Founders
                </span>
                <br /> Meet {" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Money
                </span>  
              </h1>

              <p className="text-lg text-center md:text-start text-purple-200/70 max-w-xl">
              The only permissionless web3 fundraising platform that doesn't suck. Connect with investors, raise funds, and build your startup without the BS.
              </p>

              {/* Desktop buttons */}
              <div className="hidden md:flex flex-col md:flex-row items-center gap-4 pt-4">
                <Link href="/marketplace" className="w-72 md:w-auto">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg">
                    Explore Startups <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link
                  href="api/auth/login"
                  className="w-72 md:w-auto"
                >
                  <Button
                    variant="outline"
                    className="w-full border-purple-900 text-white hover:bg-purple-900/30 px-8 py-6 text-lg"
                  >
                    Start Fundraising
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <div className="relative z-0 rounded-xl overflow-hidden">
                <Image
                  src="/hero.gif"
                  alt="OnlyFounders Platform"
                  width={512}
                  height={512}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* mobile buttons  */}
            <div className="flex flex-col md:hidden items-center gap-4 pt-4">
                <Link href="/marketplace" className="w-72 md:w-auto">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg">
                    Explore Startups <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link
                  href="/"
                  className="w-72 md:w-auto"
                >
                  <Button
                    variant="outline"
                    className="w-full border-purple-800 text-white hover:bg-purple-900/30 px-8 py-6 text-lg"
                  >
                    Start Fundraising
                  </Button>
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-sm font-medium text-white border-blue-500/20 mb-4">
              Key Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need, Nothing You Don't
            </h2>
            <p className="text-purple-200/70 max-w-2xl mx-auto">
            We've stripped away the VC nonsense and built a platform that actually helps founders raise money.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((item,index) => (
            <Card key={index} className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20 hover:border-blue-600 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-purple-200/70">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-indigo-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-sm font-medium text-white border-blue-500/20 mb-4">
              How it Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Fundraising That Doesn't Make You Want to Quit
            </h2>
            <p className="text-purple-200/70 max-w-2xl mx-auto">
            We've simplified the fundraising process so you can focus on building your startup, not chasing investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                    Create Your Profile
                    </h3>
                    <p className="text-purple-200/70">
                    Set up your founder or startup profile with all the details investors actually care about.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Startup Submission
                    </h3>
                    <p className="text-purple-200/70">
                    Founders submit their Startups with detailed information
                    about their team, technology, and funding goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                    Launch Your Campaign
                    </h3>
                    <p className="text-purple-200/70">
                    Create your fundraising campaign with your funding goals, equity offering, and project details.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                    Get Funded
                    </h3>
                    <p className="text-purple-200/70">
                    Connect with investors, receive funds directly to your wallet, and manage your cap table on-chain.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative rounded-xl overflow-hidden">
                <Image
                  src="/workflow.png"
                  alt="How OnlyFounders Works"
                  width={350}
                  height={275}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-indigo-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-sm font-medium text-white border-blue-500/20 mb-4">
                Opportunities
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Featured Startups
              </h2>
              <p className="text-purple-200/70 max-w-2xl">
                Discover innovative blockchain startups seeking funding on our
                platform.
              </p>
            </div>
            <Link href="/marketplace" className="mt-4 md:mt-0">
              <Button
                variant="outline"
                className="border-purple-800/20 text-white hover:bg-purple-900/30"
              >
                View All Startups <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isloading
              ? // Skeleton cards to show while loading
                Array.from({ length: 3 }).map((_, index) => (
                  <Card
                    key={`skeleton-${index}`}
                    className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20 overflow-hidden"
                  >
                    <div className="relative h-48 w-full bg-gray-800/50 animate-pulse"></div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-gray-800/70 animate-pulse"></div>
                        <div className="space-y-2">
                          <div className="h-5 w-32 bg-gray-800/70 rounded animate-pulse"></div>
                          <div className="h-3 w-24 bg-gray-800/70 rounded animate-pulse"></div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="h-5 w-16 bg-gray-800/70 rounded animate-pulse"></div>
                        <div className="h-5 w-20 bg-gray-800/70 rounded animate-pulse"></div>
                      </div>

                      <div className="h-4 w-full bg-gray-800/70 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-3/4 bg-gray-800/70 rounded animate-pulse mb-4"></div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <div className="h-4 w-24 bg-gray-800/70 rounded animate-pulse"></div>
                          <div className="h-4 w-12 bg-gray-800/70 rounded animate-pulse"></div>
                        </div>
                        <div className="w-full h-2 bg-purple-900/30 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gray-800/70 rounded animate-pulse"
                            style={{ width: "30%" }}
                          ></div>
                        </div>
                        <div className="flex justify-between">
                          <div className="h-3 w-20 bg-gray-800/70 rounded animate-pulse"></div>
                          <div className="h-3 w-24 bg-gray-800/70 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </CardContent>
                    <div className="px-6 pb-6">
                      <div className="h-10 w-full bg-gray-800/70 rounded animate-pulse"></div>
                    </div>
                  </Card>
                ))
              : // Actual project cards
                projects.map((item, index) => (
                  <Card
                    key={index}
                    className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20 hover:border-blue-600 transition-colors overflow-hidden"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={
                          item.bannerImage ||
                          "/placeholder.svg?height=200&width=400&text=Startup"
                        }
                        alt={item.startupName}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-gray-800 border-gray-700 text-white">Featured</Badge>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-gray-800 border-gray-700 text-white">{item.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden relative bg-gray-800 border-2 border-gray-700">
                          <Image
                            src={
                              item.startupLogo ||
                              "/placeholder.svg?height=40&width=40&text=S"
                            }
                            alt="Startup Logo"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {item.startupName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Users size={14} className="text-gray-500" />
                            <span className="text-xs text-gray-400">
                              Founded by {item.founderName}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge
                          variant="outline"
                          className="bg-gray-800 text-gray-300 border-gray-700"
                        >
                          {item.blockchainPlatform}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-gray-800 text-gray-300 border-gray-700"
                        >
                          {item.startupStage}
                        </Badge>
                      </div>

                      <p className="text-purple-200/70 text-sm mb-4">
                        {item.tagline}
                      </p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-cyan-400">
                            Yet to raise
                          </span>
                          <span className="text-white">
                            {item.goal
                              ? ((item.totalRaised / item.goal) * 100).toFixed(
                                  0
                                )
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="w-full h-2 bg-purple-900/30 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{
                              width: `${
                                item.goal
                                  ? (item.totalRaised / item.goal) * 100
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div
                          suppressHydrationWarning
                          className="flex justify-between text-xs text-purple-200/70"
                        >
                          <span>
                            Goal: {item.goal ? `${item.goal} USDC` : "N/A"}
                          </span>
                          <span>
                            {item.deadline && !isNaN(Date.parse(item.deadline))
                              ? `${Math.ceil(
                                  (Date.parse(item.deadline) - Date.now()) /
                                    (1000 * 60 * 60 * 24)
                                )} days left`
                              : "No deadline"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <div className="px-6 pb-6">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        <Button
                          onClick={() => {
                            if (user) {
                              router.push(`/marketplace/project/${item.startup_id}`)
                            } else {
                              toast({
                                title: "Message",
                                description: "Please login to view startup details",
                                variant: "destructive",
                              })
                            }
                          }} disabled={isLoading}
                        >
                          View Startup Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Button>
                    </div>
                  </Card>
                ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gradient-to-br from-indigo-950/80 to-purple-900/80 rounded-2xl p-8 md:p-12 border border-purple-800/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join the OnlyFounders Community
                </h2>
                <p className="text-purple-200/70 mb-6">
                Whether you're a founder looking to raise funds or an investor seeking the next big thing, OnlyFounders has you covered.
                </p>
                <div className="flex gap-4">
                  <Link href="/marketplace" className="w-64 md:w-auto">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Explore Startups <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/" className="w-64 md:w-auto">
                    <Button
                      variant="outline"
                      className="border-purple-800/20 text-white hover:bg-purple-900/30"
                    >
                      Start Fundraising
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       {showOnboardingModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/10">
        <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome to OnlyFounders</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Complete your profile to get started with our Web3 fundraising platform
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
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
              <CardFooter>
                <div className="mb-4 w-full flex flex-col items-center"> 
                  <Button
                    onClick={() => handleContinue()} 
                    className="w-full bg-black hover:bg-gray-800 text-white border border-gray-800">
                     {isSubmitting ? "Submitting..." : "Continue"}
                     {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      </div>
    )}
    </AppLayout>
    </>
  );
}
