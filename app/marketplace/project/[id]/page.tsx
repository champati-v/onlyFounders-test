"use client";
import { API_URL } from '@/lib/config';
import { useState, useEffect } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InvestmentTier } from "@/components/investment-tier";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Check,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Info,
  MessageSquare,
  Share2,
  Shield,
  Twitter,
  Users,
  Linkedin,
  Send,
  MessageCircle,
  Book,
  VideoIcon,
  PencilIcon,
  Trash,
  ArrowBigUp,
} from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {useToast} from '../../../../hooks/use-toast'
import { useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import { FaPeopleGroup } from "react-icons/fa6";
import { DropdownMenuCheckboxItemProps, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

interface RoadmapItem {
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
  completedStatus: string;
}

interface TokenDistribution {
  category: string;
  percentage: number;
}

interface Tokenomics {
  symbol: string;
  totalSupply: string;
  distribution: TokenDistribution[];
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completionDate: string | null;
  fundingAmount: number;
  percentCompleted: number;
  status: string;
  fundingReleased: boolean;
  verificationProof: string | null;
}

interface Startup {
  id: string;
  founderName: string;
  title: string;
  stage: string;
  tagline: string;
  description: string;
  image: string;
  logo: string;
  category: string;
  tags: string[];
  raised: number;
  goal: number;
  progress: number;
  investors: number;
  daysLeft: number;
  minInvestment: number;
  website: string;
  discord: string;
  medium: string;
  github: string;
  twitter: string;
  whitepaper: string;
  demoVideo: string;
  team: TeamMember[];
  roadmap: RoadmapItem[];
  tokenomics: Tokenomics;
  updates: any[]; // Define properly if updates have a structure
  faqs: any[]; // Define properly if FAQs have a structure
  reviews: any[]; // Define properly if reviews have a structure
  milestones: Milestone[];
  telegram?: string;
  verifiedStatus: string;
  waitlistSignups: string;
  strategicPartners: string;
  githubStars: string;
  nodeOperators: number;
  _id: string;
  developerInterest: string;
  growthMetrics: string;
  storageCapacity: string;
  tokenPrice: string;
  others: string;
}

// API response types
interface FileInfo {
  file_name: string;
  file_url: string | null;
  _id: string;
}

interface SocialLinks {
  website?: string;
  twitter?: string;
  github?: string;
  discord?: string;
  medium?: string;
  linkedin?: string;
  telegram?: string;
}

interface Traction {
  waitlistSignups: number;
  strategicPartners: number;
  communitySize: number;
  githubStars: number;
  nodeOperators: number;
  _id: string;
  developerInterest: string;
  growthMetrics: string;
  storageCapacity: string;
  others: string;
}

interface TokenDistributionAPI {
  publicSale: number;
  teamAdvisors: number;
  foundation: number;
  ecosystemGrowth: number;
  strategicPartners: number;
  _id: string;
  others: number;
}

interface TokenomicsAPI {
  tokenName: string;
  symbol: string;
  totalSupply: number;
  tokenType: string;
  initialPrice: number;
  useCases: string[];
  tokenDistribution: TokenDistributionAPI;
  _id: string;
}

interface TeamMemberAPI {
  fullName: string;
  title: string;
  profilePicture: FileInfo;
  shortBio: string;
  socialLinks: SocialLinks;
  _id: string;
}

interface Milestone {
  content: string;
  status: string;
  _id: string;
}

interface RoadmapItemAPI {
  quarterYear: string;
  milestones: Milestone[];
  status: string;
  _id: string;
}

interface FAQAPI {
  question: string;
  answer: string;
  _id?: string;
}

interface StartupAPI {
  _id: string;
  founderName: string;
  user_id: string;
  startupName: string;
  startupLogo: FileInfo;
  bannerImage: FileInfo;
  tagline: string;
  description: string;
  stage: string;
  category: string;
  blockchainPlatforms: string[];
  socialLinks: SocialLinks;
  whitepaper: FileInfo;
  pitchDeck: FileInfo;
  demoVideo: string;
  traction: Traction;
  verifiedStatus: string;
  featuredStatus: string;
  completedStatus: boolean;
  totalRaised: number;
  faq: FAQAPI[];
  coreTeam: TeamMemberAPI[];
  roadmap: RoadmapItemAPI[];
  investers: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  tokenomics?: TokenomicsAPI;
  pitchDeckText?: string;
  pitchDeck_Url?: string;
  pitchDemoVideo_Url?: string;
  whitepaper_Url?: string;
  tokenName?: string;
  strategicPartners: string;
  githubStars: string;
  nodeOperators: string;
  growthMetrics: string;
  storageCapacity: string;
}

interface APIResponse {
  message: string;
  startup: StartupAPI;
}

export default function ProjectDetailPage({params, }: { params: { id: string }; }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showInvestDialog, setShowInvestDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startupData, setStartupData] = useState<StartupAPI | null>(null);
  const { user, isLoading } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [daysRemaining, setDaysRemaining] = useState<number | null>();
  const [projectId, setProjectId] = useState<string | null>(null);
  const [updates, setUpdates] = useState<any[]>([]); // Define properly if updates have a structure
  const [loadDeleteMember, setLoadDeleteMember] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState();
  const [upvoteLoading, setUpvoteLoading] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const TokenomicsPieChart = dynamic(() => import("./TokenomicsPieChart"), {
    ssr: false,
  });
  const userId = user?.sub?.substring(14);

  //twitter share code
  const shortUrl = 'https://www.onlyfounders.xyz';

  const fullText = `No warm intros. No BS. Just traction. I'm live on @onlyfoundersxyz — the new home for early-stage founders. Follow me there.\n${shortUrl}`;

  const shareText = encodeURIComponent(fullText);
  
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
  

  //api to fetch updates
  // useEffect(() => {
  //   const fetchUpdates = async () => {
  //     try {
  //       if (!user || !projectId) return;
  //       const userId = user?.sub?.substring(14);
  //       const requestBody = { projectId };
  //       console.log(requestBody);
  //       const response = await axios.post(
  //         `${API_URL}/api/profile/get-updates`,
  //         requestBody,
  //         {
  //           headers: {
  //             "Content-Type": "application/json", // ✅ Correct header
  //             user_id: userId,
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         const data = await response.data;
  //         setUpdates(data.updates);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching project ID:", error);
  //       toast({
  //         title: "Error",
  //         description: "Failed to load project ID. Please refresh the page.",
  //         variant: "destructive",
  //       });
  //     }
  //   };

  //   fetchUpdates();
  // }, [projectId]);

  //api to get projectId

  //fetch project ID

  useEffect(() => {
    const fetchProjectId = async () => {
      try {
        // if (!user) return;
        const userId = user?.sub?.substring(14);
        const response = await fetch(
          `${API_URL}/api/startup/get-projectId`,
          {
            method: "GET",
            headers: {
              user_id: userId,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setProjectId(data.projectId);
        }
      } catch (error) {
        console.error("Error fetching project ID:", error);
      }
    };

    fetchProjectId();
  }, [user]);

  // Fetch startup data based on project ID
  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        setLoading(true);
        const userId = user?.sub?.substring(14);

        const response = await fetch(
          `${API_URL}/api/startup/view-startup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              user_id: userId, 
            },
            body: JSON.stringify({
              projectId: params.id, 
            }),
          }
        );

        const data: APIResponse = await response.json();
        setStartupData(data.startup);
      } catch (error) {
        console.error("Error fetching startup data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartupData();
  }, [params.id, router, toast, user, loadDeleteMember]);

  //get startup listing
  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/startup/get-startup-listing`
        );

        // if (!response.ok) {
        //   throw new Error(`API error: ${response.status}`)
        // }

        const data = await response.json();

        if (data.startups && data.startups.length > 0) {
          const deadline = new Date(data.startups[0].deadline);
          const currentDate = new Date();
          const timeDifference = deadline.getTime() - currentDate.getTime();
          const daysLeft = 0

          setDaysRemaining(daysLeft);
        }
      } catch (err) {
        console.error("Error fetching startups:", err);
      }
    };

    fetchStartups();
  }, []);

  //fetch upvote status
  useEffect(() => {
    const fetchUpvoteStatus = async () => {
      // if (!user) {
      //   return;
      // }

      try {
        const response = await fetch(
          `${API_URL}/api/startup/get-upvote-status/${projectId}`,
          {
            method: "POST",
            headers: {
              user_id: userId,
            },
          }
        );

        const data = await response.json();
        setHasUpvoted(data.status);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUpvoteStatus();
  }, [projectId, user]);

  //fetch upvote counts
  useEffect(() => {
    const fetchUpvoteCounts = async () => {
      // if (!user) {
      //   return;
      // }

      try {
        const response = await fetch(
          `${API_URL}/api/startup/get-upvote-count/${params.id}`,
          {
            method: "GET",
            headers: {
              user_id: userId,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setUpvoteCount(data.upvote);
        }

        if (!response.ok) {
          console.log("Error fetching upvote counts:", response.status);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUpvoteCounts();
  }, [projectId, user]);

  const project: Startup = startupData
    ? {
        id: startupData._id,
        founderName: startupData.founderName,
        stage: startupData.stage,
        title: startupData.startupName,
        verifiedStatus: startupData.verifiedStatus,
        tagline: startupData.tagline,
        description: startupData.description,
        image:
          startupData.bannerImage?.file_url ||
          "/placeholder.svg?height=400&width=800",
        logo:
          startupData.startupLogo?.file_url ||
          "/placeholder.svg?height=100&width=100",
        category: startupData.category,
        tags: startupData.blockchainPlatforms || [],
        raised: startupData.totalRaised || 0,
        goal: startupData.totalRaised, // This might need to come from the API in the future
        progress: 0,
        investors: startupData.investers?.length || 0,
        daysLeft: 14, // This might need to come from the API in the future
        minInvestment: 100, // This might need to come from the API in the future
        website: startupData.socialLinks?.website || "#",
        github: startupData.socialLinks?.github || "#",
        twitter: startupData.socialLinks?.twitter || "#",
        telegram: startupData.socialLinks?.telegram || "#",
        discord: startupData.socialLinks?.discord || "#",
        medium: startupData.socialLinks?.medium || "#",
        whitepaper: startupData.whitepaper_Url || "#",
        demoVideo: startupData.pitchDemoVideo_Url,

        //traction
        waitlistSignups: startupData.traction.waitlistSignups,
        strategicPartners: startupData.traction.strategicPartners,
        communitySize: startupData.traction.communitySize,
        growthMetrics: startupData.traction.growthMetrics,
        others: startupData.traction.others,

        team:
          startupData.coreTeam?.map((member) => ({
            name: member.fullName,
            role: member.title,
            bio: member.shortBio,
            avatar:
              member.profilePicture?.file_url ||
              "/placeholder.svg?height=100&width=100",
            linkedin: member.socialLinks?.linkedin,
            twitter: member.socialLinks?.twitter,
            github: member.socialLinks?.github,
            _id: member._id,
          })) || [],
        roadmap:
          startupData.roadmap?.map((item) => ({
            title: item.quarterYear,
            description: item.milestones?.map((m) => m.content),
            completedStatus: item.status,
            current: item.status === "In Progress",
          })) || [],
        tokenomics: startupData.tokenomics
          ? {
              tokenName: startupData.tokenomics.tokenName,
              symbol: startupData.tokenomics.symbol,
              totalSupply:
                startupData.tokenomics.totalSupply?.toLocaleString() || "0",
              distribution: [
                {
                  category: "Public Sale",
                  percentage:
                    startupData.tokenomics.tokenDistribution?.publicSale || 0,
                },
                {
                  category: "Team & Advisors",
                  percentage:
                    startupData.tokenomics.tokenDistribution?.teamAdvisors || 0,
                },
                {
                  category: "Foundation",
                  percentage:
                    startupData.tokenomics.tokenDistribution?.foundation || 0,
                },
                {
                  category: "Ecosystem Growth",
                  percentage:
                    startupData.tokenomics.tokenDistribution?.ecosystemGrowth ||
                    0,
                },
                {
                  category: "Strategic Partners",
                  percentage:
                    startupData.tokenomics.tokenDistribution
                      ?.strategicPartners || 0,
                },
                {
                  category: "Others",
                  percentage:
                    startupData.tokenomics.tokenDistribution?.others || 0,
                },
              ].filter((item) => item.percentage > 0),
            }
          : {
              symbol: "",
              totalSupply: "0",
              distribution: [],
            },
        tokenPrice: startupData.tokenomics?.initialPrice,
        updates: [], // This might need to come from the API in the future
        faqs: startupData.faq || [],
        milestones:
          startupData.roadmap?.flatMap(
            (roadmapItem) =>
              roadmapItem.milestones?.map((milestone, index) => ({
                id: `m${index}`,
                title: milestone.content,
                description: `Milestone for ${roadmapItem.quarterYear}`,
                dueDate: roadmapItem.quarterYear,
                completionDate:
                  milestone.status === "completed"
                    ? roadmapItem.quarterYear
                    : null,
                fundingAmount: 50000, // Placeholder value
                percentCompleted:
                  milestone.status === "completed"
                    ? 100
                    : milestone.status === "pending"
                    ? 0
                    : 50,
                status: milestone.status,
                fundingReleased: milestone.status === "completed",
                verificationProof: null,
              })) || []
          ) || [],
      }
    : {
        id: "1",
        title: "",
        tagline: "",
        description: "",
        image: "/placeholder.svg?height=400&width=800",
        logo: "/placeholder.svg?height=100&width=100",
        category: "",
        tags: [],
        raised: 0,
        goal: 500000,
        progress: 0,
        investors: 0,
        daysLeft: 14,
        minInvestment: 100,
        website: "#",
        github: "#",
        twitter: "#",
        whitepaper: "#",
        team: [],
        roadmap: [],
        tokenomics: {
          symbol: "",
          totalSupply: "0",
          distribution: [],
        },
        updates: [],
        faqs: [],
        reviews: [],
        milestones: [],
      };

  //delete a team member
  const handleDeleteMember = async (memberId) => {
    try {
      setLoadDeleteMember(true);
      if (!user || !projectId) return;
      const userId = user?.sub?.substring(14);
      const requestBody = { startupId: projectId, teamMemberId: memberId };
      console.log(JSON.stringify(requestBody));

      const response = await axios.delete(
        `${API_URL}/api/startup/delete-teamMember`,
        {
          headers: {
            "Content-Type": "application/json",
            user_id: userId,
          },
          data: requestBody,
        }
      );

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Team member deleted successfully.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast({
        title: "Error",
        description: "Failed to delete team member.",
        variant: "destructive",
      });
    } finally {
      setLoadDeleteMember(false);
    }
  };

  //upvote startups
  const handleUpvoteStatus = async () => {
    if (!user || isLoading) {
      return;
    }
    setUpvoteLoading(true);

    try {
      const userId = user.sub?.substring(14);
      const response = await fetch(
        `${API_URL}/api/startup/upvote-startup/${projectId}`,
        {
          method: "POST",
          headers: {
            user_id: userId,
          },
        }
      );

      // After upvoting, fetch the updated status
      if (response.status === 200) {
        const statusResponse = await fetch(
          `${API_URL}/api/startup/get-upvote-status/${projectId}`,
          {
            method: "POST",
            headers: {
              user_id: userId,
            },
          }
        );

        if (statusResponse.status === 200) {
          const data = await statusResponse.json();
          setHasUpvoted(data.status);
        }
      }

      if (response.status === 200) {
        const countResponse = await fetch(
          `${API_URL}/api/startup/get-upvote-count/${projectId}`,
          {
            method: "GET",
            headers: {
              user_id: userId,
            },
          }
        );

        if (countResponse.status === 200) {
          const data = await countResponse.json();
          setUpvoteCount(data.upvote);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpvoteLoading(false);
    }
  };

  const handleMilestoneComplete = async (roadmapId, index) => {
    try {
      if (!user || !projectId) return;
      const userId = user?.sub?.substring(14);
      const requestBody = { startupId: projectId, teamMemberId: memberId };
      console.log(JSON.stringify(requestBody));

      const response = await axios.delete(
        `${API_URL}/`,
        {
          headers: {
            "Content-Type": "application/json",
            user_id: userId,
          },
          data: requestBody,
        }
      );
    } catch (error) {
      console.error("Error deleting team member:", error);
    } finally {
    }
  };

  const handleInvest = (amount: number) => {
    console.log(`Investing ${amount} USDC in ${project.title}`);
    setShowInvestDialog(false);
    // Here you would typically handle the investment process
  };

  // if (loading || !user) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
  //         <p className="text-gray-400">Loading project details...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="flex items-center justify-between gap-2">
        <button className="text-sm rounded-md bg-gradient-to-br from-blue-600 to-purple-600 text-white px-3 py-2">
          <a href="/marketplace" className="flex items-center gap-2">
            <ArrowLeft />
            Back to MarketPlace
          </a>
        </button>

        <div>
          {projectId === params.id && (
            <button className="text-sm rounded-md bg-gradient-to-br from-blue-600 to-purple-600 text-white px-3 py-2">
              {" "}
              <a
                href="/startup-setup/basicInfo"
                className="flex items-center gap-2"
                rel="noreferrer"
              >
                <PencilIcon /> Edit Startup
              </a>
            </button>
          )}
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden h-[200px] md:h-[300px]">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black to-transparent"></div>
        <button
          onClick={() => {user?
            handleUpvoteStatus(): 
            toast({
              title: "Login Required",
              description: "Please login to upvote this project.",
            });
          }}
          disabled={upvoteLoading}
          className={`absolute flex z-30 items-center gap-1 top-5 right-5 cursor-pointer hover:bg-slate-700 transition-all duration-200 bg-slate-800 px-3 py-1.5 rounded-md ${
            upvoteLoading ? "opacity-70" : ""
          }`}
        >
          <ArrowBigUp
            fill={hasUpvoted ? "white" : "none"}
            stroke={hasUpvoted ? "white" : "white"}
          />{" "}
          {upvoteCount}{" "}
          {upvoteLoading ? "Loading..." : hasUpvoted ? "Upvoted" : "Upvote"}
        </button>

        <div className="absolute z-20 bottom-0 left-0 p-6 flex items-end gap-4">
          <div className="h-20 w-20 rounded-xl overflow-hidden relative bg-gray-800 border-4 border-gray-800">
            <Image
              src={project.logo || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className="bg-blue-600">{project.category}</Badge>
              {project.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-gray-800/50 text-gray-300 border-gray-700"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold text-white">{project.title}</h1>
            <p className="text-gray-300 mt-1">{project.tagline}</p>
            <p className="text-gray-300 mt-1">
              {" "}
              Founder:
              <a
                href={`/public-profile/founder/${project.id}`}
                className="text-blue-600"
              >
                {" "}
                {project.founderName}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="items-center lg:col-span-2">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >

            <div className="w-full md:hidden">
              <select
                onChange={(e) => setActiveTab(e.target.value)}
                className="bg-gray-900 border border-gray-800 w-full text-white p-2 rounded"
              >
                <option value="overview">Overview</option>
                <option value="team">Team</option>
                <option value="roadmap">Roadmap</option>
                <option value="tokenomics">Tokenomics</option>
                <option value="updates">Updates</option>
              </select>
            </div>

            <div className="hidden md:flex justify-center md:justify-start items-center md:items-start">
              <TabsList className="bg-gray-900 border border-gray-800 p-1">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="team"
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
                >
                  Team
                </TabsTrigger>
                <TabsTrigger
                  value="roadmap"
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
                >
                  Roadmap
                </TabsTrigger>
                <TabsTrigger
                  value="tokenomics"
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
                >
                  Tokenomics
                </TabsTrigger>
                <TabsTrigger
                  value="updates"
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
                >
                  Updates
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6">{project.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Column */}
                    <div className="space-y-3">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-start text-gray-300 border-gray-700"
                      >
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="mr-2 h-4 w-4 text-blue-400" />
                          Website
                          <ExternalLink className="ml-auto h-4 w-4 text-gray-500" />
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-start text-gray-300 border-gray-700"
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4 text-purple-400" />
                          GitHub Repository
                          <ExternalLink className="ml-auto h-4 w-4 text-gray-500" />
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-start text-gray-300 border-gray-700"
                      >
                        <a
                          href={project.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter className="mr-2 h-4 w-4 text-blue-400" />
                          Twitter
                          <ExternalLink className="ml-auto h-4 w-4 text-gray-500" />
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-start text-gray-300 border-gray-700"
                      >
                        <a
                          href={project.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Send className="mr-2 h-4 w-4 text-blue-400" />
                          Telegram
                          <ExternalLink className="ml-auto h-4 w-4 text-gray-500" />
                        </a>
                      </Button>
                    </div>

                    {/* Second Column */}
                    <div className="space-y-3">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-start text-gray-300 border-gray-700"
                      >
                        <a
                          href={project.whitepaper}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="mr-2 h-4 w-4 text-amber-400" />
                          Whitepaper
                          <ExternalLink className="ml-auto h-4 w-4 text-gray-500" />
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-start text-gray-300 border-gray-700"
                      >
                        <a
                          href={project.discord}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="mr-2 h-4 w-4 text-indigo-400" />
                          Discord
                          <ExternalLink className="ml-auto h-4 w-4 text-gray-500" />
                        </a>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-start text-gray-300 border-gray-700"
                      >
                        <a
                          href={project.medium}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Book className="mr-2 h-4 w-4 text-gray-400" />
                          Medium Blog
                          <ExternalLink className="ml-auto h-4 w-4 text-gray-500" />
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-start text-gray-300 border-gray-700"
                      >
                        <a
                          href={project.demoVideo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <VideoIcon className="mr-2 h-4 w-4 text-blue-500" />
                          Demo Video
                          <ExternalLink className="ml-auto h-4 w-4 text-gray-500" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">
                    Traction and Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 ">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col justify-center items-center gap-1 bg-slate-800 rounded-md border border-gray-700 p-5">
                        <Users className="text-blue-400" size={28} />
                        <p className="text-gray-400 text-lg">
                          Waitlist Signups
                        </p>
                        <span className="text-3xl font-bold">
                          {project.waitlistSignups}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-1 bg-slate-800 rounded-md border border-gray-700 p-5">
                        <Globe className="text-violet-500" size={28} />
                        <p className="text-gray-400 text-lg">
                          Strategic Partners
                        </p>
                        <span className="text-3xl font-bold">
                          {project.strategicPartners}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-1 bg-slate-800 rounded-md border border-gray-700 p-5">
                        <FaPeopleGroup className="text-green-400" size={28} />
                        <p className="text-gray-400 text-lg">Community Size</p>
                        <span className="text-3xl font-bold">
                          {project.communitySize}
                        </span>
                      </div>
                    </div>

                    <CardTitle className="text-xl">
                      Additional Metrics
                    </CardTitle>
                    <div className="flex flex-col gap-1">
                      {project.growthMetrics?.map((metric, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <p className="text-gray-400">{metric.metricName}</p>
                          <span>{metric.metricValue}</span>
                        </div>
                      ))}

                      {project.others?.map((metric, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <p className="text-gray-400">{metric.metricName}</p>
                          <span>{metric.metricValue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">
                    Team Members
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Meet the team behind {project.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.team.map((member) => (
                      <div
                        key={member.name}
                        className="flex items-start gap-4 p-4 rounded-lg border border-gray-800 bg-gray-800/50"
                      >
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            src={member.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-medium text-white">
                              {member.name}
                            </h3>
                            {projectId === params.id && (
                              <button
                                onClick={() => handleDeleteMember(member._id)}
                                className="hover:bg-gray-700 rounded-md p-2 transition-all duration-300 cursor-pointer"
                              >
                                <Trash width={18} />
                              </button>
                            )}
                          </div>
                          <div className="text-sm text-blue-400 mb-2">
                            {member.role}
                          </div>
                          <p className="text-gray-300 text-sm">{member.bio}</p>
                          <div className="flex mt-3 space-x-2">
                            <a href={member.twitter} target="_blank">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-white"
                            >
                              <Twitter className="h-4 w-4" />
                            </Button>
                            </a>
                            <a href={member.github} target="_blank">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-white"
                            >
                              <Github className="h-4 w-4" />
                            </Button>
                            </a>
                            <a href={member.linkedin} target="_blank">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-white"
                            >
                              <Linkedin className="h-4 w-4" />
                            </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roadmap" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">
                    Project Roadmap
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Development timeline and milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {project.roadmap.map((milestone, index) => (
                      <div key={milestone.title} className="relative">
                        {index < project.roadmap.length - 1 && (
                          <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-800 z-0"></div>
                        )}

                        <div
                          className={`relative z-10 flex items-start gap-4 p-4 rounded-lg border ${
                            milestone.current
                              ? "border-blue-600 bg-blue-900/10"
                              : milestone.completed
                              ? "border-green-600 bg-green-900/10"
                              : "border-gray-800 bg-gray-800/50"
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                              milestone.current
                                ? "bg-blue-900/50 text-blue-400"
                                : milestone.completed
                                ? "bg-green-900/50 text-green-400"
                                : "bg-gray-800 text-gray-400"
                            }`}
                          >
                            {milestone.completed ? (
                              <Check className="h-5 w-5" />
                            ) : (
                              <Calendar className="h-5 w-5" />
                            )}
                          </div>

                          <div className="flex-1">
                            <h3 className="flex items-center justify-between text-lg font-medium text-white">
                              <span>{milestone.title}</span>
                            </h3>
                            {milestone.description?.map((item, index) => (
                              <div className="flex items-center gap-1">
                                <Check className="mt-1 text-green-500" />
                                <p key={index} className="text-gray-300 mt-1">
                                  {item}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokenomics" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">
                    Tokenomics
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Token distribution and utility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">
                          Token Details
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Token Name:</span>
                            <span className="text-white font-medium">
                              {project.tokenomics.tokenName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Symbol:</span>
                            <span className="text-white font-medium">
                              {project.tokenomics.symbol}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Supply:</span>
                            <span className="text-white font-medium">
                              {project.tokenomics.totalSupply}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Token Type:</span>
                            <span className="text-white font-medium">
                              ERC-20
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-10">
                        <h3 className="text-lg font-medium text-white mb-4">
                          Token Distribution
                        </h3>
                        <div className="space-y-4">
                          {project.tokenomics.distribution.map((item) => (
                            <div key={item.category} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-300">
                                  {item.category}
                                </span>
                                <span className="text-white font-medium">
                                  {item.percentage}%
                                </span>
                              </div>
                              <Progress
                                value={item.percentage}
                                className="h-2 bg-gray-800"
                                indicatorClassName={` 
                                    ${
                                      item.category === "Public Sale"
                                        ? "bg-blue-600"
                                        : item.category === "Team & Advisors"
                                        ? "bg-purple-600"
                                        : item.category === "Foundation"
                                        ? "bg-amber-600"
                                        : item.category === "Ecosystem Growth"
                                        ? "bg-green-600"
                                        : item.category === "Strategic Partners"
                                        ? "bg-cyan-600"
                                        : "bg-rose-600"
                                    }
                                  `}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* token utility */}
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">
                        Token Usecases
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start text-gray-300">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>Governance rights for protocol decisions</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>Fee discounts for transactions</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>Staking rewards and yield farming</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>Access to premium features</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>Revenue sharing for token holders</span>
                        </li>
                      </ul>
                      <TokenomicsPieChart
                        data={project.tokenomics.distribution}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="updates" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">
                    Project Updates
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Latest news and announcements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {updates.map((update, index) => (
                      <div key={index} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-white">
                            {update.title} <Badge>{update.updateType}</Badge>
                          </h3>
                          <Badge
                            variant="outline"
                            className="bg-gray-800/50 text-gray-300 border-gray-700"
                          >
                            <Calendar className="mr-1 h-3 w-3" />
                            {update.createdAt}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <p className="text-gray-300">{update.content}</p>
                          </div>
                          <div className="relative h-40 rounded-lg overflow-hidden">
                            {/* {updates?.attachments?.map((attachment, index) => (
                            <Image
                            key={index}
                            src={attachment.file_url || "/placeholder.svg"}
                            alt={attachment.file_name}
                            fill
                            className="object-cover"
                          />
                          ))}   */}
                          </div>
                        </div>

                        {index < updates.length - 1 && (
                          <Separator className="bg-gray-800" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800 sticky top-20">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                Funding Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Raised</span>
                    <span className="text-white font-medium">
                      {project.raised.toLocaleString()} /{" "}
                      {project.goal.toLocaleString()} USDC
                    </span>
                  </div>
                  <Progress
                    value={project.progress}
                    className="h-2 bg-gray-700"
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-400"
                  />
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">
                      {project.progress}% funded
                    </span>
                    <span className="text-amber-400">
                      {daysRemaining} days left
                    </span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {project.tokenPrice}
                    </div>
                    <div className="text-xs text-gray-400">Token Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {project.stage}
                    </div>
                    <div className="text-xs text-gray-400">Startup Stage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {daysRemaining}
                    </div>
                    <div className="text-xs text-gray-400">Days Left</div>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-800" />

              <div className="flex flex-col gap-3">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border py-2"
                  onClick={() => {
                    if (!user) {
                      toast({
                        title: "Login Required",
                        description: "Please login to invest in this project.",
                      });
                    } else {
                      window.open("https://spring.net/discover/onlyfounders", "_blank");
                    }
                  }}
                >
                  Invest Now
                </Button>
                {/* <Dialog open={showInvestDialog} onOpenChange={setShowInvestDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border">
                      Invest Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-white">
                    <DialogHeader>
                      <DialogTitle>Invest in {project.title}</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Choose your investment amount and complete the transaction
                      </DialogDescription>
                    </DialogHeader>

                    <InvestmentTier onInvest={handleInvest} />

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowInvestDialog(false)}
                        className="border-gray-700 text-white"
                      >
                        Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog> */}

                <Button
                  variant="outline"
                  className="w-full border-gray-800 text-white"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  {isBookmarked ? (
                    <>
                      <Bookmark className="mr-2 h-4 w-4 fill-blue-400 text-blue-400" />
                      Bookmarked
                    </>
                  ) : (
                    <>
                      <Bookmark className="mr-2 h-4 w-4" />
                      Add to Watchlist
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    className="w-1/2 border-gray-800 text-white"
                    onClick={() => window.open(twitterUrl, "_blank")}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>

                  <Button
                    variant="outline"
                    className="w-1/2 border-gray-800 text-white"
                    onClick={() => {
                    if (!user) {
                      toast({
                        title: "Login Required",
                        description: "Please login to contact project founder.",
                      });
                    } else {
                      window.open(`${project.telegram}`, "_blank");
                    }
                  }}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>

              <Separator className="bg-gray-800" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">
                  Project Verification
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-800">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-300">KYC Verified</span>
                    </div>
                    {project.verifiedStatus === "Unverified" ? (
                      <Badge className="bg-red-600">Not Verified</Badge>
                    ) : (
                      <Badge className="bg-green-600">Passed</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-800">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-300">
                        Smart Contract Audit
                      </span>
                    </div>
                    <Badge className="hidden md:block bg-amber-600">coming Soon</Badge>
                    <Badge className="md:hidden bg-amber-600">Soon</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-800">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-300">Team Verification</span>
                    </div>
                    <Badge className="hidden md:block bg-amber-600">coming Soon</Badge>
                    <Badge className="md:hidden bg-amber-600">Soon</Badge>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-400 mr-2 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">
                        AI Risk Assessment
                      </h4>
                      <p className="text-gray-300 text-sm mt-1">
                        OnlyFounders has analyzed this project and assigned it a
                        low risk score based on team credentials, code quality,
                        and tokenomics model.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
