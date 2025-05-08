"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Brain,
  Lightbulb,
  Video,
  Zap,
  Award,
  ArrowUpRight,
  Clock,
  DollarSign,
  Filter,
  Search,
  Users,
  Rocket,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AIAgents } from "@/components/ai-agents";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useUser } from "@auth0/nextjs-auth0/client";
import {useToast} from '../../hooks/use-toast'


export default function ResourcesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "blogs");
  const [grantsFilter, setGrantsFilter] = useState("all");
  const [blogs, setBlogs] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user, isLoading } = useUser();
  const { toast } = useToast()


  // Filter blogs based on selected category
  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.categories.includes(selectedCategory))
    : blogs;
  const allCategories = [
    "Networking",
    "Marketing & Growth",
    "Business Development",
    "Fund Raising",
    "Go-to-Market",
    "Tokenomics",
    "Community",
    "User Engagement",
    "Legal and Regulations",
    "Industry Insights",
    "Best Practices",
    "Case Studies",
    "Product Development",
    "Mental Health",
  ];

  useEffect(() => {
    if (
      tabParam &&
      ["ai-agents", "blogs", "videos", "tools", "grants"].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://ofstaging.azurewebsites.net/api/blog/get-all-blogs"
        );

        if (response.status === 200) {
          const data = await response.json();
          setBlogs(data.blogs);
          console.log("Fetched blog ID", blogs._id);
        }
      } catch (error) {
        console.log("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/resources?tab=${value}`);
  };


  const videos = [
    {
      id: "video-1",
      title: "Tokenomics Explained",
      description:
        "A deep dive into tokenomics models and their impact on project sustainability and investor returns.",
      image: "/placeholder.svg?height=200&width=400&text=Tokenomics+Video",
      duration: "32:15",
      creator: "Optimus Academy",
    },
    {
      id: "video-2",
      title: "Web3 Investment Strategies",
      description:
        "Expert investors share their strategies for building a diversified Web3 portfolio.",
      image: "/placeholder.svg?height=200&width=400&text=Investment+Strategies",
      duration: "45:20",
      creator: "Optimus Academy",
    },
    {
      id: "video-3",
      title: "Founder's Guide to Fundraising",
      description:
        "Learn how to structure your fundraising rounds and attract the right investors for your Web3 project.",
      image: "/placeholder.svg?height=200&width=400&text=Fundraising+Guide",
      duration: "28:45",
      creator: "Optimus Academy",
    },
  ];

  const tools = [
    {
      id: "tool-1",
      title: "Cap Table Calculator",
      description:
        "Simulate different tokenomic models and their impact on project sustainability and investor returns.",
      image: "/resources-tool1.jpg",
      category: "Analysis",
      redirectlink: "https://v0-web3-cap-table-calculator.vercel.app/",
    },
    {
      id: "tool-2",
      title: "AccountaBuddy",
      description:
        "Track your Web3 investments across multiple chains and platforms in one dashboard.",
      image: "/resources-tool2.jpg",
      category: "Management",
      redirectlink: "https://v0-bet-on-yourself.vercel.app/",
    },
    {
      id: "tool-3",
      title: "Startup Evaluator",
      description:
        "Analyze smart contracts for common vulnerabilities and best practices.",
      image: "/resources-tool3.jpg",
      category: "Security",
      redirectlink: "https://v0-web3-valuation-app-jpvkyq.vercel.app/",
    },
    {
      id: "tool-3",
      title: "Founder GPT",
      description:
        "Your AI-powered assistant for all aspects of building and growing your startup.",
      image: "/resources-tool4.jpg",
      category: "Security",
      redirectlink: "https://v0-founder-gpt-chat-interface-6yakhw.vercel.app/",
    },
  ];

  const grants = [
    {
      id: "1",
      name: "Web3 Innovation Grant",
      organization: "EDU Chain Foundation",
      description:
        "Supporting innovative Web3 projects focused on education and learning",
      amount: "$50,000",
      deadline: "Apr 15, 2025",
      applicants: 156,
      category: "Education",
      image: "/placeholder.svg?height=200&width=200",
      provider: "educhain",
    },
    {
      id: "2",
      name: "EduFi Development Fund",
      organization: "EduFi DAO",
      description:
        "Funding for projects integrating education with decentralized finance",
      amount: "$75,000",
      deadline: "Mar 30, 2025",
      applicants: 234,
      category: "EduFi",
      image: "/placeholder.svg?height=200&width=200",
      provider: "edufi",
    },
    {
      id: "3",
      name: "DeFi Integration Grant",
      organization: "DeFi Alliance",
      description:
        "Supporting projects that expand the DeFi ecosystem with innovative solutions",
      amount: "$100,000",
      deadline: "May 1, 2025",
      applicants: 89,
      category: "DeFi",
      image: "/placeholder.svg?height=200&width=200",
      provider: "defi",
    },
    {
      id: "4",
      name: "Polygon Ecosystem Fund",
      organization: "Polygon Foundation",
      description:
        "Grants for teams building on Polygon to enhance scalability and user experience",
      amount: "$150,000",
      deadline: "Apr 20, 2025",
      applicants: 167,
      category: "Infrastructure",
      image: "/placeholder.svg?height=200&width=200",
      provider: "polygon",
    },
    {
      id: "5",
      name: "Internet Computer Grant",
      organization: "DFINITY Foundation",
      description:
        "Supporting developers building decentralized applications on the Internet Computer",
      amount: "$80,000",
      deadline: "Apr 10, 2025",
      applicants: 198,
      category: "Web3",
      image: "/placeholder.svg?height=200&width=200",
      provider: "icp",
    },
    {
      id: "6",
      name: "Coinweb Interoperability Grant",
      organization: "Coinweb Foundation",
      description:
        "Funding for projects focused on cross-chain interoperability and infrastructure",
      amount: "$120,000",
      deadline: "May 15, 2025",
      applicants: 145,
      category: "Interoperability",
      image: "/placeholder.svg?height=200&width=200",
      provider: "coinweb",
    },
  ];

  const filteredGrants =
    grantsFilter === "all"
      ? grants
      : grants.filter((grant) => grant.provider === grantsFilter);

  return (
      <div className="w-screen overflow-x-hidden container mx-auto py-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">
            {activeTab === "ai-agents"
              ? "OnlyFounders AI Agents"
              : activeTab === "blogs"
              ? "OnlyFounders Blogs"
              : activeTab === "videos"
              ? "OnlyFounders Video Masterclasses"
              : activeTab === "tools"
              ? "OnlyFounders Investment Tools"
              : activeTab === "grants"
              ? "OnlyFounders Grants & Funding"
              : "OnlyFounders Resources"}
          </h1>
          <p className="text-gray-400">
            Explore our comprehensive library of resources designed to help both
            investors and founders navigate the Web3 fundraising landscape.
          </p>
        </div>

        {/* Dynamic Header Banner based on active tab */}
        <Card
          className={`overflow-hidden border-0 shadow-lg transition-all duration-500 ${
            activeTab === "ai-agents"
              ? "bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-blue-800/50"
              : activeTab === "blogs"
              ? "bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-800/50"
              : activeTab === "videos"
              ? "bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-800/50"
              : activeTab === "tools"
              ? "bg-gradient-to-r from-violet-900/30 to-purple-900/30 border-violet-800/50"
              : activeTab === "grants"
              ? "bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border-amber-800/50"
              : "bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-800/50"
          }`}
        >
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="p-8 md:w-2/3">
                <Badge
                  className={`mb-4 ${
                    activeTab === "ai-agents"
                      ? "bg-blue-600"
                      : activeTab === "blogs"
                      ? "bg-emerald-600"
                      : activeTab === "videos"
                      ? "bg-red-600"
                      : activeTab === "tools"
                      ? "bg-violet-600"
                      : activeTab === "grants"
                      ? "bg-amber-600"
                      : "bg-blue-600"
                  }`}
                >
                  {activeTab === "ai-agents" && (
                    <Brain className="mr-1 h-3 w-3" />
                  )}
                  {activeTab === "blogs" && (
                    <BookOpen className="mr-1 h-3 w-3" />
                  )}
                  {activeTab === "videos" && <Video className="mr-1 h-3 w-3" />}
                  {activeTab === "tools" && <Zap className="mr-1 h-3 w-3" />}
                  {activeTab === "grants" && <Award className="mr-1 h-3 w-3" />}
                  Featured
                </Badge>

                {activeTab === "ai-agents" && (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      AI-Powered Investment Analysis
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Leverage our suite of AI agents to analyze projects,
                      assess risk, and make data-driven investment decisions
                      with confidence.
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      <Link href="">
                        Coming Soon.. <Brain className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                )}

                {activeTab === "blogs" && (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      OnlyFounders Blogs
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Access comprehensive blogs written by industry experts to
                      help you navigate the complexities of Web3.
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    >
                      <Link href="#blogs">
                        Browse Blogs <BookOpen className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                )}

                {activeTab === "videos" && (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Video Masterclasses
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Watch in-depth video tutorials and interviews with
                      successful founders and investors in the Web3.
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                    >
                      <Link href="">
                        Coming Soon.. <Video className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                )}

                {activeTab === "tools" && (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Investment Analysis Tools
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Powerful tools to help you analyze projects, track
                      investments, and optimize your Web3 portfolio performance.
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                    >
                      <Link href="#tools">
                        Try Our Tools <Zap className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                )}

                {activeTab === "grants" && (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Funding Opportunities
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Discover grants and funding programs for your Web3
                      project. Connect with foundations and organizations
                      looking to support innovative builders.
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                    >
                      <Link href="">
                        Coming Soon.. <Award className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                )}
              </div>
              <div className="relative md:w-1/3 h-48 md:h-auto">
                <Image
                  src={
                    activeTab === "ai-agents"
                      ? "/ai-agent.jpg"
                      : activeTab === "blogs"
                      ? "/blogs.jpg"
                      : activeTab === "videos"
                      ? "/videos.jpg"
                      : activeTab === "tools"
                      ? "/resources-tools-card.jpg"
                      : activeTab === "grants"
                      ? "/grant.jpg"
                      : "/placeholder.svg?height=300&width=400&text=Resources"
                  }
                  alt={`${
                    activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                  } Banner`}
                  fill
                  className="object-cover transition-opacity duration-300"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs
          defaultValue="blogs"
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-8"
        >
          <TabsList className="bg-gray-900 border border-gray-800 p-1 flex flex-nowrap justify-center">
            <TabsTrigger
              value="blogs"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <BookOpen className="mr-2 h-4 w-4 hidden lg:block" />
              Blogs
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <Zap className="mr-2 h-4 w-4 hidden lg:block" />
              Tools
            </TabsTrigger>
            <TabsTrigger
              value="ai-agents"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <Brain className="mr-2 h-4 w-4 hidden lg:block" />
              AI Agents
            </TabsTrigger>

            <TabsTrigger
              value="videos"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <Video className="mr-2 h-4 w-4 hidden lg:block" />
              Videos
            </TabsTrigger>

            <TabsTrigger
              value="grants"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <Award className="mr-2 h-4 w-4 hidden lg:block" />
              Grants
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-agents">
            <AIAgents />
          </TabsContent>

          <TabsContent id="blogs" value="blogs">
            <div className="space-y-8">
            
              {/* Category Filter */}
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    className={
                      selectedCategory === null
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:text-white"
                    }
                    onClick={() => setSelectedCategory(null)}
                  >
                    All
                  </Button>

                  {allCategories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      className={
                        selectedCategory === category
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-800 text-gray-300 hover:text-white"
                      }
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <Card
                    key={blog._id}
                    className="bg-gray-900 border-gray-800 overflow-hidden flex flex-col hover:border-blue-600 transition-colors"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={blog.headerImage.file_url || "/placeholder.svg"}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600">
                          <BookOpen className="mr-1 h-3 w-3" />
                          Blog
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl text-white">
                          {blog.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-gray-400 mb-4">
                        {blog.description}
                      </CardDescription>
                      <div className="flex items-center">
                        {blog.categories && blog.categories.length > 0 && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-gray-800 border-gray-700 text-gray-400 hover:text-white flex items-center gap-1"
                              >
                                {blog.categories[0]}
                                {blog.categories.length > 1 && (
                                  <ChevronDown className="h-4 w-4 opacity-70" />
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            {blog.categories.length > 1 && (
                              <DropdownMenuContent className="bg-gray-800 border-gray-700 px-2 py-1 rounded-md">
                                {blog.categories.slice(1).map((category) => (
                                  <DropdownMenuItem
                                    key={category}
                                    className="text-gray-300 hover:text-white focus:text-white focus:bg-gray-700 rounded-md px-2 cursor-pointer"
                                  >
                                    {category}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            )}
                          </DropdownMenu>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => {
                          router.push(`/resources/guides/${blog._id}`);
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        Read Blog
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="space-y-8">
              <div>
                <h2 className="text-center text-3xl font-bold text-white mb-4 mt-12">
                  Coming Soon ...
                </h2>
                {/* <p className="text-gray-400 max-w-3xl">
                  Watch expert-led videos on Web3 investment strategies,
                  tokenomics, and project evaluation.
                </p> */}
              </div>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card
                    key={video.id}
                    className="bg-gray-900 border-gray-800 overflow-hidden flex flex-col hover:border-blue-600 transition-colors"
                  >
                    <div className="relative h-48 w-full group">
                      <Image
                        src={video.image || "/placeholder.svg"}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-blue-600/80 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <Video className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Badge className="bg-gray-900/80 text-white">
                          {video.duration}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl text-white">
                          {video.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-gray-400 mb-4">
                        {video.description}
                      </CardDescription>
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mr-2">
                          <Lightbulb className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-xs text-gray-400">
                          {video.creator}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Watch Video
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div> */}

              {/* <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="text-white border-gray-700 bg-gray-900 hover:bg-gray-800"
                >
                  View All Videos
                </Button>
              </div> */}
            </div>
          </TabsContent>

          <TabsContent id="tools" value="tools">
            <div className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <Card
                    key={tool.id}
                    className="bg-gray-900 border-gray-800 overflow-hidden flex flex-col hover:border-blue-600 transition-colors"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={tool.image || "/placeholder.svg"}
                        alt={tool.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600">
                          <Zap className="mr-1 h-3 w-3" />
                          Tool
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl text-white">
                          {tool.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-gray-400 mb-4">
                        {tool.description}
                      </CardDescription>
                      <Badge
                        variant="outline"
                        className="bg-gray-800 border-gray-700 text-gray-400"
                      >
                        {tool.category}
                      </Badge>
                    </CardContent>
                    <CardFooter>
                      <a href={tool.redirectlink} target="_blank">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                          Launch Tool
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="text-white border-gray-700 bg-gray-900 hover:bg-gray-800"
                >
                  View All Tools
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="grants" id="grants-section">
            <div className="space-y-8">
              <div>
                <h2 className="text-center text-3xl font-bold text-white mt-12 mb-4">
                  Coming Soon ...
                </h2>
                {/* <p className="text-gray-400 max-w-3xl">
                  Explore available grants and funding opportunities for your
                  Web3 project.
                </p> */}
              </div>

              {/* <div className="flex justify-between items-center">
                <div className="bg-gray-900 border border-gray-800 p-1 rounded-md">
                  <div className="flex space-x-1">
                    <Button
                      variant={grantsFilter === "all" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setGrantsFilter("all")}
                      className="text-sm"
                    >
                      All Grants
                    </Button>
                    <Button
                      variant={
                        grantsFilter === "educhain" ? "secondary" : "ghost"
                      }
                      size="sm"
                      onClick={() => setGrantsFilter("educhain")}
                      className="text-sm"
                    >
                      EDU Chain
                    </Button>
                    <Button
                      variant={grantsFilter === "edufi" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setGrantsFilter("edufi")}
                      className="text-sm"
                    >
                      EduFi
                    </Button>
                    <Button
                      variant={grantsFilter === "defi" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setGrantsFilter("defi")}
                      className="text-sm"
                    >
                      DeFi
                    </Button>
                    <Button
                      variant={
                        grantsFilter === "polygon" ? "secondary" : "ghost"
                      }
                      size="sm"
                      onClick={() => setGrantsFilter("polygon")}
                      className="text-sm"
                    >
                      Polygon
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      placeholder="Search grants..."
                      className="pl-9 bg-gray-900 border-gray-700 text-white w-[250px]"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800 text-white">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="defi">DeFi</SelectItem>
                      <SelectItem value="infrastructure">
                        Infrastructure
                      </SelectItem>
                      <SelectItem value="ai">AI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div> */}

              {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrants.map((grant) => (
                  <Card
                    key={grant.id}
                    className="bg-gray-900 border-gray-800 overflow-hidden hover:border-amber-600 transition-colors"
                  >
                    <CardHeader className="bg-gradient-to-br from-amber-600/10 to-yellow-600/10">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden">
                          <Image
                            src={grant.image || "/placeholder.svg"}
                            alt={grant.organization}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-white">
                            {grant.name}
                          </CardTitle>
                          <CardDescription className="text-gray-400">
                            {grant.organization}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-sm text-gray-300 mb-4">
                        {grant.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-amber-400" />
                          <span className="font-medium text-amber-400">
                            {grant.amount}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-yellow-400" />
                          <span className="text-yellow-400">
                            {grant.applicants} applicants
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <Badge
                          variant="outline"
                          className="bg-amber-500/10 text-amber-400 border-amber-500/20"
                        >
                          {grant.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span>Deadline: {grant.deadline}</span>
                        </div>
                      </div>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white"
                      >
                        <Link href={`/resources/grants/${grant.id}`}>
                          Apply Now <ArrowUpRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div> */}

              {/* {filteredGrants.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl font-medium text-white mb-2">
                    No grants found
                  </p>
                  <p className="text-gray-400 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button onClick={() => setGrantsFilter("all")}>
                    View All Grants
                  </Button>
                </div>
              )} */}

              {/* <Card className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-gray-800">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">
                        Need Help With Your Grant Application?
                      </h2>
                      <p className="text-gray-300 mb-6">
                        Our team of experts can help you prepare a compelling
                        grant application to increase your chances of success.
                        We offer guidance on project proposals, budget planning,
                        and technical documentation.
                      </p>
                      <Button className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white">
                        Get Application Support
                      </Button>
                    </div>
                    <div className="relative h-48 w-full md:w-1/3 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=200&width=300&text=Grant+Application+Support"
                        alt="Grant Application Support"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Need Custom Resources?
                </h2>
                <p className="text-gray-400 mb-6">
                  Our team can create custom educational content, tools, or AI
                  agents tailored to your specific needs. Whether you're a
                  founder looking to educate your community or an investor
                  seeking specialized analysis tools, we've got you covered.
                </p>
                <a href="https://discord.gg/xyKaHgyz5w" target="_blank">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Contact Us
                </Button>
                </a>
              </div>
              <div className="relative h-48 w-full md:w-1/3 rounded-lg overflow-hidden">
                <Image
                  src="/resources-footer.jpg"
                  alt="Custom Resources"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
