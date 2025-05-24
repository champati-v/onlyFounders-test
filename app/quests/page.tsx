"use client";

import { API_URL } from '@/lib/config';
import { useEffect, useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Star,
  Clock,
  CheckCircle,
  Lock,
  Zap,
  TrendingUp,
  Users,
  Shield,
  FileText,
} from "lucide-react";

import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { useToast } from "../../hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function QuestsPage() {
  const { user, isLoading } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [questData, setQuestData] = useState<any>(null);
  const [questDataLoading, setQuestDataLoading] = useState(true);
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "EDUChain Quests");

  useEffect(() => {
    if (tabParam && ["EDUChain Quests", "Verida Quests"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/quests?tab=${value}`);
  };

  useEffect(() => {
    const fetchQuestData = async () => {
      if (!user || isLoading) return;

      try {
        const userID = user.sub?.substring(14);
        const response = await axios.get(
          `${API_URL}/api/nft/quest-status`,
          {
            method: "GET",
            headers: {
              user_id: userID,
            },
          }
        );
        setQuestData(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch quest data.",
          variant: "destructive",
        });
      } finally {
        setQuestDataLoading(false);
      }
    };
    fetchQuestData();
  }, [user]);

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (!isLoading && !user) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    };

    checkLoggedIn();
  }, [isLoading, user]);

  // Mock data for investor quests
  const investorQuests = [
    {
      id: "1",
      title: "Due Diligence Master",
      description: "Learn how to evaluate blockchain projects effectively",
      image: "/placeholder.svg?height=200&width=400",
      category: "Education",
      difficulty: "Beginner",
      rewards: [
        { type: "XP", value: 500 },
        { type: "Badge", value: "Due Diligence Expert" },
      ],
      progress: 0,
      steps: 5,
      completedSteps: 0,
      estimatedTime: "2 hours",
      featured: true,
    },
    {
      id: "2",
      title: "Tokenomics Analyst",
      description: "Master the art of analyzing token economics models",
      image: "/placeholder.svg?height=200&width=400",
      category: "Analysis",
      difficulty: "Intermediate",
      rewards: [
        { type: "XP", value: 750 },
        { type: "Badge", value: "Tokenomics Analyst" },
      ],
      progress: 40,
      steps: 5,
      completedSteps: 2,
      estimatedTime: "3 hours",
      featured: false,
    },
    {
      id: "3",
      title: "Smart Contract Auditor",
      description:
        "Learn to identify common vulnerabilities in smart contracts",
      image: "/placeholder.svg?height=200&width=400",
      category: "Security",
      difficulty: "Advanced",
      rewards: [
        { type: "XP", value: 1000 },
        { type: "Badge", value: "Security Expert" },
      ],
      progress: 0,
      steps: 7,
      completedSteps: 0,
      estimatedTime: "5 hours",
      featured: false,
      locked: true,
    },
    {
      id: "4",
      title: "DeFi Explorer",
      description: "Understand the fundamentals of decentralized finance",
      image: "/placeholder.svg?height=200&width=400",
      category: "Education",
      difficulty: "Beginner",
      rewards: [
        { type: "XP", value: 500 },
        { type: "Badge", value: "DeFi Explorer" },
      ],
      progress: 100,
      steps: 4,
      completedSteps: 4,
      estimatedTime: "2 hours",
      featured: false,
      completed: true,
    },
    {
      id: "5",
      title: "Portfolio Strategist",
      description: "Learn to build a diversified crypto investment portfolio",
      image: "/placeholder.svg?height=200&width=400",
      category: "Strategy",
      difficulty: "Intermediate",
      rewards: [
        { type: "XP", value: 750 },
        { type: "Badge", value: "Portfolio Strategist" },
      ],
      progress: 60,
      steps: 5,
      completedSteps: 3,
      estimatedTime: "3 hours",
      featured: true,
    },
    {
      id: "6",
      title: "Community Evaluator",
      description:
        "Learn to assess the strength and engagement of project communities",
      image: "/placeholder.svg?height=200&width=400",
      category: "Analysis",
      difficulty: "Beginner",
      rewards: [
        { type: "XP", value: 500 },
        { type: "Badge", value: "Community Analyst" },
      ],
      progress: 20,
      steps: 5,
      completedSteps: 1,
      estimatedTime: "2 hours",
      featured: false,
    },
  ];

  // Mock data for founder quests
  const founderQuests = [
    {
      id: "1",
      title: "Perfect Pitch",
      description: "Create a compelling pitch deck for your blockchain project",
      image: "/placeholder.svg?height=200&width=400",
      category: "Marketing",
      difficulty: "Beginner",
      rewards: [
        { type: "XP", value: 500 },
        { type: "Badge", value: "Pitch Master" },
      ],
      progress: 80,
      steps: 5,
      completedSteps: 4,
      estimatedTime: "3 hours",
      featured: true,
    },
    {
      id: "2",
      title: "Tokenomics Designer",
      description:
        "Design a sustainable token economics model for your project",
      image: "/placeholder.svg?height=200&width=400",
      category: "Economics",
      difficulty: "Intermediate",
      rewards: [
        { type: "XP", value: 750 },
        { type: "Badge", value: "Tokenomics Expert" },
      ],
      progress: 0,
      steps: 6,
      completedSteps: 0,
      estimatedTime: "4 hours",
      featured: false,
    },
    {
      id: "3",
      title: "Community Builder",
      description:
        "Learn strategies to build and engage your project community",
      image: "/placeholder.svg?height=200&width=400",
      category: "Community",
      difficulty: "Beginner",
      rewards: [
        { type: "XP", value: 500 },
        { type: "Badge", value: "Community Leader" },
      ],
      progress: 40,
      steps: 5,
      completedSteps: 2,
      estimatedTime: "3 hours",
      featured: true,
    },
    {
      id: "4",
      title: "Security First",
      description:
        "Implement security best practices for your blockchain project",
      image: "/placeholder.svg?height=200&width=400",
      category: "Security",
      difficulty: "Advanced",
      rewards: [
        { type: "XP", value: 1000 },
        { type: "Badge", value: "Security Champion" },
      ],
      progress: 0,
      steps: 7,
      completedSteps: 0,
      estimatedTime: "5 hours",
      featured: false,
      locked: true,
    },
    {
      id: "5",
      title: "Regulatory Navigator",
      description:
        "Understand the regulatory landscape for blockchain projects",
      image: "/placeholder.svg?height=200&width=400",
      category: "Legal",
      difficulty: "Intermediate",
      rewards: [
        { type: "XP", value: 750 },
        { type: "Badge", value: "Compliance Expert" },
      ],
      progress: 0,
      steps: 6,
      completedSteps: 0,
      estimatedTime: "4 hours",
      featured: false,
    },
    {
      id: "6",
      title: "Investor Relations",
      description:
        "Learn how to effectively communicate with investors post-funding",
      image: "/placeholder.svg?height=200&width=400",
      category: "Communication",
      difficulty: "Beginner",
      rewards: [
        { type: "XP", value: 500 },
        { type: "Badge", value: "IR Specialist" },
      ],
      progress: 100,
      steps: 4,
      completedSteps: 4,
      estimatedTime: "2 hours",
      featured: false,
      completed: true,
    },
  ];

  const getQuestStatusBadge = (quest: any) => {
    if (quest.locked) {
      return (
        <Badge className="bg-gray-700 text-gray-300">
          <Lock className="mr-1 h-3 w-3" />
          Locked
        </Badge>
      );
    }

    if (quest.completed) {
      return (
        <Badge className="bg-green-600 text-white">
          <CheckCircle className="mr-1 h-3 w-3" />
          Completed
        </Badge>
      );
    }

    if (quest.progress > 0 && quest.progress < 100) {
      return (
        <Badge className="bg-blue-600 text-white">
          <Clock className="mr-1 h-3 w-3" />
          In Progress
        </Badge>
      );
    }

    return (
      <Badge className="bg-purple-600 text-white">
        <Zap className="mr-1 h-3 w-3" />
        New
      </Badge>
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-600";
      case "Intermediate":
        return "bg-blue-600";
      case "Advanced":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Education":
      case "Economics":
        return <BookOpen className="h-4 w-4" />;
      case "Analysis":
      case "Strategy":
        return <TrendingUp className="h-4 w-4" />;
      case "Security":
        return <Shield className="h-4 w-4" />;
      case "Community":
      case "Communication":
        return <Users className="h-4 w-4" />;
      case "Marketing":
        return <TrendingUp className="h-4 w-4" />;
      case "Legal":
        return <FileText className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  // const activeQuests =
  //   activeTab === "investor" ? investorQuests : founderQuests;
  // const featuredQuests = activeQuests.filter((quest) => quest.featured);

  // Quest data from the EduChain Hackathon document
  const quests = [
    // Basic Quests
    {
      id: "quest-1",
      title: "Master the Basics of Startup Pitching",
      description:
        "Creating a compelling pitch is the cornerstone of your startup's success. This quest introduces the key elements of a winning pitch.",
      image: "/quest_easy.jpg",
      difficulty: "Basic",
      nftReward: "Founder Basics NFT",
      founderPoints: 20,
      reputationPoints: 30,
      questions: 3,
    },
    {
      id: "quest-2",
      title: "Building a Strong Value Proposition",
      description:
        "A compelling value proposition sets your startup apart from competitors. Learn to articulate your unique benefits.",
      image: "/quest_easy.jpg",
      difficulty: "Basic",
      nftReward: "Founder Basics NFT",
      founderPoints: 20,
      reputationPoints: 30,
      questions: 3,
    },

    // Intermediate Quests
    {
      id: "quest-3",
      title: "Mastering Competitive Analysis",
      description:
        "Learn to identify key players in your market and find opportunities to differentiate your startup.",
      image: "/quest_medium.jpg",
      difficulty: "Intermediate",
      nftReward: "Growth Strategist NFT",
      founderPoints: 40,
      reputationPoints: 60,
      questions: 4,
    },
    {
      id: "quest-4",
      title: "Effective Fundraising Strategies",
      description:
        "Explore different fundraising approaches and learn how to build lasting relationships with potential investors.",
      image: "/quest_medium.jpg",
      difficulty: "Intermediate",
      nftReward: "Growth Strategist NFT",
      founderPoints: 40,
      reputationPoints: 60,
      questions: 4,
    },

    // Advanced Quests
    {
      id: "quest-5",
      title: "Scaling Your Startup",
      description:
        "Navigate the challenges of scaling and implement strategies for sustainable growth.",
      image: "/quest_hard.jpg",
      difficulty: "Advanced",
      nftReward: "Venture Master NFT",
      founderPoints: 50,
      reputationPoints: 80,
      questions: 6,
    },
    {
      id: "quest-6",
      title: "Crafting a Sustainable Business Model",
      description:
        "Explore different business model frameworks and create lasting value in changing markets.",
      image: "/quest_hard.jpg",
      difficulty: "Advanced",
      nftReward: "Venture Master NFT",
      founderPoints: 50,
      reputationPoints: 80,
      questions: 6,
    },
  ];

  // Group quests by difficulty
  const basicQuests = quests.filter((quest) => quest.difficulty === "Basic");
  const intermediateQuests = quests.filter(
    (quest) => quest.difficulty === "Intermediate"
  );
  const advancedQuests = quests.filter(
    (quest) => quest.difficulty === "Advanced"
  );

  // Handle start quest button click
  interface Quest {
    id: string;
    title: string;
    description: string;
    image: string;
    difficulty: string;
    nftReward: string;
    founderPoints: number;
    reputationPoints: number;
    questions: number;
  }

  const handleStartQuest = (questId: Quest["id"]): void => {
    router.push(`/quests/${questId}`);
  };

  interface QuestSectionProps {
    title: string;
    quests: Quest[];
  }

  const QuestSection: React.FC<QuestSectionProps> = ({ title, quests }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-[#00D3FF] border-b border-[#15847D]/30 pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        {quests.map((quest) => {
          // Check if questData.quests contains a match for the current quest.id
          const completion = questData?.quests?.find(
            (q: any) => q.questId === quest.id
          );

          return (
            <div key={quest.id} className="w-full">
              <Card className="overflow-hidden bg-gradient-to-br from-[#00131F] to-[#0088B2]/30 border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={quest.image || "/placeholder.svg"}
                    alt={quest.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-[#1b2f5e] text-[#00E0FF] border-0 px-3 py-1 rounded-full">
                      {quest.difficulty}
                    </Badge>

                    {/* ✅ Show attempt status & score if found, otherwise "Not Attempted" */}
                    {completion ? (
                      <Badge className="bg-green-800 uppercase text-green-200 border-0 px-3 py-1 rounded-full">
                        {completion.status} • Score: {completion.score}
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-700 uppercase text-gray-300 border-0 px-3 py-1 rounded-full">
                        Not Attempted
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#00D3FF]">
                    {quest.title}
                  </h3>
                  <p className="text-sm text-[#8C9BA8] mb-4 min-h-[3.5rem] leading-snug line-clamp-2">
                    {quest.description}
                  </p>
                  <div className="mt-3 text-xs text-[#8C9BA8] flex items-center justify-between">
                    <span>Questions: {quest.questions}</span>
                    <span>Reward: {quest.nftReward}</span>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Button
                    onClick={() => {!user ? toast({title: "Message", description: "Please login to start the Quest", variant: "destructive"}) : handleStartQuest(quest.id)}}
                    disabled={completion}
                    className="w-full bg-[#00CFFF] hover:bg-[#00E0FF] text-[#0B0E17] font-medium shadow-[0_0_10px_rgba(0,207,255,0.3)] hover:shadow-[0_0_15px_rgba(0,224,255,0.5)] transition-all duration-300"
                  >
                    Start Quest
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div>
      <Tabs
        defaultValue="EDUChain Quests"
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-8"
      >
        <div className="mt-8 flex items-center justify-center">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger
              value="EDUChain Quests"
              className="flex items-center gap-2 data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              {/* <Brain className="mr-2 h-4 w-4" /> */}
              <Image
                src='/edu-icon.svg'
                alt="Verida Icon"
                height={20}
                width={20}
              />
              Quests Powered By EDU <span className="hidden md:block">Chain</span> 
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="EDUChain Quests">
          {/* Educhain quests section  */}
          <div className="min-h-screen text-[#F5F7FA] p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2 text-[#00D3FF]">
                  EduChain Quests
                </h1>
                <p className="text-[#8C9BA8]">
                  Complete quests to earn exclusive NFT rewards and points
                </p>
              </div>

              <QuestSection title="Basic Quests" quests={basicQuests} />
              <QuestSection
                title="Intermediate Quests"
                quests={intermediateQuests}
              />
              <QuestSection title="Advanced Quests" quests={advancedQuests} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
