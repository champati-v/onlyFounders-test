"use client";

import { API_URL } from '@/lib/config';
import { useEffect, useState } from "react";
import Link from "next/link";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  Calendar,
  Clock,
  Filter,
  Globe,
  MapPin,
  MessageSquare,
  Search,
  Star,
  Users,
  Bell,
  Rocket,
  DollarSign,
  Building2,
} from "lucide-react";

import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import {useToast} from '../../hooks/use-toast'
import { useRouter } from "next/navigation";

interface FounderData {
  _id: string;
  user_id: string;
  role: string[];
  status: string;
  bannerImage: {
    file_name: string;
    file_url: string;
    _id: string;
  };
  bio: string;
  founderData?: {
    skills: string[];
    companyName: string;
  };
  location: string;
  professionalTitle: string;
  profilePic: {
    file_name: string;
    file_url: string;
    _id: string;
  };
  username: string;
  email: string;
  startup_id: string | null;
}

interface InvestorData {
  _id: string;
  user_id: string;
  role: string | string[];
  status: string;
  bannerImage?: {
    file_name: string;
    file_url: string;
    _id: string;
  };
  bio: string;
  location: string;
  professionalTitle: string;
  profilePic?: {
    file_name: string;
    file_url: string;
    _id: string;
  };
  username: string;
  investorData?: {
    investmentInterest: string[];
  };
  email: string;
  startup_id: string | null;
}

interface ServiceProviderData {
  _id: string;
  user_id: string;
  role: string | string[];
  status: string;
  bannerImage?: {
    file_name: string;
    file_url: string;
    _id: string;
  };
  bio: string;
  location: string;
  professionalTitle: string;
  profilePic?: {
    file_name: string;
    file_url: string;
    _id: string;
  };
  serviceProviderData?: {
    category: string[];
  };
  username: string;
  email: string;
  startup_id: string | null;
}

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState("founders");
  const [founderData, setFounderData] = useState<FounderData[]>([]);
  const [investorData, setInvestorData] = useState<InvestorData[]>([]);
  const [ServiceProviderData, setServiceProviderData] = useState<ServiceProviderData[]>([]);
  const [selectedFounderCategory, setSelectedFounderCategory] = useState<string>("");
  const [selectedInvestorCategory, setSelectedInvestorCategory] = useState<string>("");
  const [selectedServiceProviderCategory, setSelectedServiceProviderCategory] = useState<string>("");
  const [searchItem, setSearchItem] = useState<string>("");
  const { user, isLoading } = useUser();
  const {toast} = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  // Mock data for members
  const members = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Founder & CEO",
      company: "DecentraVault",
      avatar: "/profile-f1.jpg",
      bio: "Blockchain entrepreneur with 10+ years in fintech",
      skills: ["DeFi", "Smart Contracts", "Tokenomics"],
      location: "San Francisco, CA",
      connections: 245,
      projects: 3,
      verified: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "CTO",
      company: "MetaCanvas",
      avatar: "/profile-m1.jpg",
      bio: "Smart contract developer and security expert",
      skills: ["Solidity", "Security Audits", "NFTs"],
      location: "New York, NY",
      connections: 187,
      projects: 2,
      verified: true,
    },
    {
      id: "3",
      name: "Alex Rodriguez",
      role: "Product Lead",
      company: "ChainGovernance",
      avatar: "/profile-m2.jpg",
      bio: "Product strategist specializing in Web3 applications",
      skills: ["Product Strategy", "UX Design", "DAOs"],
      location: "Austin, TX",
      connections: 156,
      projects: 1,
      verified: true,
    },
    {
      id: "4",
      name: "Emily Watson",
      role: "Blockchain Developer",
      company: "Freelance",
      avatar: "/profile-f2.jpg",
      bio: "Full-stack developer with focus on blockchain integration",
      skills: ["React", "Node.js", "Ethereum"],
      location: "London, UK",
      connections: 132,
      projects: 4,
      verified: false,
    },
    {
      id: "5",
      name: "David Kim",
      role: "Investor",
      company: "Crypto Ventures",
      avatar: "/profile-m3.jpg",
      bio: "Angel investor focusing on early-stage blockchain startups",
      skills: ["Investment", "Tokenomics", "Business Development"],
      location: "Singapore",
      connections: 310,
      projects: 0,
      verified: true,
    },
    {
      id: "6",
      name: "Sophia Martinez",
      role: "Marketing Director",
      company: "BlockTech Media",
      avatar: "/profile-f3.jpg",
      bio: "Marketing specialist with expertise in crypto and blockchain",
      skills: ["Growth Marketing", "Community Building", "Content Strategy"],
      location: "Miami, FL",
      connections: 178,
      projects: 2,
      verified: false,
    },
  ];

  // Mock data for events
  const events = [
    {
      id: "1",
      title: "Optimus AI DeFi Summit",
      description:
        "Join us for a day of discussions on the future of decentralized finance",
      date: "Apr 15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "San Francisco, CA",
      image: "/placeholder.svg?height=200&width=400",
      attendees: 350,
      type: "Conference",
      virtual: false,
    },
    {
      id: "2",
      title: "Smart Contract Security Workshop",
      description:
        "Learn best practices for securing your smart contracts from industry experts",
      date: "Apr 10, 2025",
      time: "1:00 PM - 4:00 PM",
      location: "Virtual",
      image: "/placeholder.svg?height=200&width=400",
      attendees: 120,
      type: "Workshop",
      virtual: true,
    },
    {
      id: "3",
      title: "Web3 Founders Meetup",
      description: "Networking event for founders building in the Web3 space",
      date: "Apr 18, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "New York, NY",
      image: "/placeholder.svg?height=200&width=400",
      attendees: 75,
      type: "Networking",
      virtual: false,
    },
    {
      id: "4",
      title: "Tokenomics Masterclass",
      description:
        "Deep dive into designing effective token economics for your project",
      date: "May 5, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Virtual",
      image: "/placeholder.svg?height=200&width=400",
      attendees: 200,
      type: "Webinar",
      virtual: true,
    },
  ];

  // Mock data for jobs
  const jobs = [
    {
      id: "1",
      title: "Senior Blockchain Developer",
      company: "DecentraVault",
      logo: "/placeholder.svg?height=48&width=48",
      location: "San Francisco, CA (Remote OK)",
      type: "Full-time",
      salary: "$120K - $160K",
      posted: "2 days ago",
      skills: ["Solidity", "Ethereum", "Smart Contracts", "React"],
    },
    {
      id: "2",
      title: "Product Manager - DeFi",
      company: "MetaCanvas",
      logo: "/placeholder.svg?height=48&width=48",
      location: "Remote",
      type: "Full-time",
      salary: "$100K - $130K",
      posted: "1 week ago",
      skills: ["Product Management", "DeFi", "Agile", "Web3"],
    },
    {
      id: "3",
      title: "Smart Contract Auditor",
      company: "ChainGovernance",
      logo: "/placeholder.svg?height=48&width=48",
      location: "New York, NY",
      type: "Contract",
      salary: "$10K - $15K per audit",
      posted: "3 days ago",
      skills: ["Security", "Solidity", "Auditing", "DeFi"],
    },
    {
      id: "4",
      title: "Community Manager",
      company: "Optimus AI",
      logo: "/placeholder.svg?height=48&width=48",
      location: "Remote",
      type: "Full-time",
      salary: "$70K - $90K",
      posted: "Just now",
      skills: [
        "Community Building",
        "Social Media",
        "Discord",
        "Content Creation",
      ],
    },
  ];

  // Mock data for partners
  const partners = [
    {
      id: "1",
      name: "BlockSecure",
      logo: "/placeholder.svg?height=80&width=80",
      description:
        "Leading blockchain security firm providing smart contract audits and security services",
      category: "Security",
      website: "https://blocksecure.io",
    },
    {
      id: "2",
      name: "CryptoLegal",
      logo: "/placeholder.svg?height=80&width=80",
      description:
        "Specialized legal services for blockchain projects and crypto startups",
      category: "Legal",
      website: "https://cryptolegal.com",
    },
    {
      id: "3",
      name: "TokenLaunch",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Token launch platform with marketing and advisory services",
      category: "Marketing",
      website: "https://tokenlaunch.io",
    },
    {
      id: "4",
      name: "ChainVentures",
      logo: "/placeholder.svg?height=80&width=80",
      description:
        "Venture capital firm focused on early-stage blockchain startups",
      category: "Investment",
      website: "https://chainventures.capital",
    },
    {
      id: "5",
      name: "MetaExchange",
      logo: "/placeholder.svg?height=80&width=80",
      description:
        "Decentralized exchange with deep liquidity and multi-chain support",
      category: "Exchange",
      website: "https://metaexchange.io",
    },
    {
      id: "6",
      name: "NodeProviders",
      logo: "/placeholder.svg?height=80&width=80",
      description:
        "Infrastructure provider offering node services and API endpoints",
      category: "Infrastructure",
      website: "https://nodeproviders.net",
    },
  ];

  const userId = user?.sub?.substring(14);

  //founder data API
  useEffect(() => {
    const fetchFounderData = async () => {
      try {
        setLoading(true);
        if (!user || isLoading) return;
        if(founderData.length === 0) { // Prevent multiple calls if data already exists
        const response = await axios.get(
          `${API_URL}/api/network/list-profile-by-role/Founder`,
          {
            headers: {
              user_id: userId,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.data;
          console.log("Founder data:", data.profiles);
          setFounderData(data.profiles);
        }
      }
      } catch (error) {
        console.error("Error fetching founder data:", error);
      }
      setLoading(false);
    };
    fetchFounderData();
  }, [user]);

  //investor data API
  useEffect(() => {
    const fetchInvestorData = async () => {
      try {
        setLoading(true);
        if (!user || isLoading) return;
        if(investorData.length === 0){
        const response = await axios.get(
          `${API_URL}/api/network/list-profile-by-role/Investor`,
          {
            headers: {
              user_id: userId,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.data;
          console.log("Investor data:", data.profiles);
          setInvestorData(data.profiles);
        }
      }
      } catch (error) {
        console.error("Error fetching investor data:", error);
      }
      setLoading(false);
    };

    if (activeTab === "investors") {
      fetchInvestorData();
    }
  }, [activeTab]);

  //service provider data API
  useEffect(() => {
    const fetchServiceProviderData = async () => {
      try {
        setLoading(true);
        if (!user || isLoading) return;
        if(ServiceProviderData.length === 0) {
        const response = await axios.get(
          `${API_URL}/api/network/list-profile-by-role/ServiceProvider`,
          {
            headers: {
              user_id: userId,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.data;
          setServiceProviderData(data.profiles);
        }
        }
      } catch (error) {
        console.error("Error fetching ServiceProvider data:", error);
      }
      setLoading(false);
    };

    if (activeTab === "serviceProviders") {
      fetchServiceProviderData();
    }
  }, [activeTab]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  }

  //filter founders based on selected category
  const filteredFounders = 
  selectedFounderCategory.toLowerCase() === "all" || selectedFounderCategory.trim() === ""
    ? founderData
    : founderData.filter(card => 
        card.founderData?.skills.some(skill => 
          skill.toLowerCase() === selectedFounderCategory.toLowerCase()
        )
  );

  //filter investors based on selected category
  const filteredInvestors = 
  selectedInvestorCategory.toLowerCase() === "all" || selectedInvestorCategory.trim() === ""
    ? investorData 
    : investorData.filter(card => 
        card.investorData?.investmentInterest.some(interest => 
            interest.toLowerCase() === selectedInvestorCategory.toLowerCase()
    )
  );

  //filter service providers based on selected category
  const filteredServiceProviders = 
  selectedServiceProviderCategory.toLowerCase() === "all" || selectedServiceProviderCategory.trim() === ""
    ? ServiceProviderData 
    : ServiceProviderData.filter(card => 
        card.serviceProviderData?.category.some(category => 
            category.toLowerCase() === selectedServiceProviderCategory.toLowerCase()
    )
  );

  return (
    <div>
      {/* Coming Soon Overlay */}
      {/* <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-md overflow-x-auto">
        <Card className="w-full max-w-md mx-4 border-purple-800/30 shadow-xl rounded-2xl relative overflow-hidden">
        
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url('/coming-soon-card.gif')" }}
          />

          <CardHeader className="pb-2 text-center relative z-10">
            <div className="mx-auto flex items-center justify-center mb-4">
              <Image
                src="/favicon.svg"
                alt="OnlyFounders"
                width={75}
                height={75}
              />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-white">
              Coming Soon!
            </CardTitle>
            <CardDescription className="text-white text-lg">
              We're building something amazing
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 text-center relative z-10">
            <p className="text-gray-300">
            A Web3 space for founders, investors, and professionals to connect, collaborate, and grow stronger together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="border-purple-800/30 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div> */}

      <div className="w-screen overflow-x-hidden container mx-auto py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Network</h1>
            <p className="text-gray-400">
              Connect with founders, investors, and professionals in the
              blockchain space
            </p>
          </div>
        </div>

        <Tabs
          defaultValue="founders"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <div className="px-1 flex items-center justify-center">
            <TabsList className="bg-gray-900 border border-gray-800 p-1">
              <TabsTrigger
                value="founders"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                <Users className="mr-2 h-4 w-4" />
                Founders
              </TabsTrigger>
              <TabsTrigger
                value="investors"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Investors
              </TabsTrigger>
              <TabsTrigger
                value="serviceProviders"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Service Providers
              </TabsTrigger>
            </TabsList>
          </div>


          <TabsContent value="founders" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search Founders by name, skills, or location..."
                  className="pl-9 bg-gray-900 border-gray-700 text-white"
                  value={searchItem}
                  onChange={(e) => handleSearch(e)}
                />
              </div>
              <Select value={selectedFounderCategory} onValueChange={(value) => setSelectedFounderCategory(value)}>
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter By..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-white">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="DePIN">DePIN</SelectItem>
                  <SelectItem value="DeFi">DeFi</SelectItem>
                  <SelectItem value="RWA">RWA</SelectItem>
                  <SelectItem value="Metaverse">Metaverse</SelectItem>
                </SelectContent>
              </Select>
            </div>

              {!user ? (
                  <div className="items-center justify-center flex flex-col space-y-4">
                    <p className="text-center text-lg text-gray-400">Please login to view profiles.</p>
                    <Button 
                      onClick={() => router.push('/api/auth/login')}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Login
                    </Button>
                  </div>
              ): 
              loading? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading Data ...</p>
                </div>
              ):
              (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFounders.filter((member) => 
                  member.username.toLowerCase().includes(searchItem.toLowerCase()) ||
                  member.location?.toLowerCase().includes(searchItem.toLowerCase()) ||
                  member.founderData?.companyName?.toLowerCase().includes(searchItem.toLowerCase()) ||
                  member.founderData?.skills.some((skill) => 
                    skill.toLowerCase().includes(searchItem.toLowerCase())
                  )
                )
                    .sort((a,b) => (a.status === 'verified' ? -1 : 1))
                    .map((member) => (
                <Card
                key={member._id}
                className="bg-gray-900 border-gray-800 hover:border-blue-600 transition-colors flex flex-col justify-between"
              >
                <div className="flex-1 flex flex-col">
                  <CardHeader className="pb-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-gray-800">
                          <AvatarImage src={member?.profilePic?.file_url} />
                          <AvatarFallback>
                            {member.username
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <CardTitle className="text-lg text-white">
                              {member.username}
                            </CardTitle>
                             {member.status === "verified" ? (
                               <Badge className="ml-2 bg-green-900/30 text-green-400 border-green-800">
                                 Verified
                              </Badge>
                             ): (
                              <>
                              </>
                             )}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="bg-gray-800/50 text-gray-300 border-gray-700"
                            >
                              Founder
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
 
                  <CardContent className="flex-1 flex flex-col justify-between pt-4 space-y-4">
                    <div className="flex-1 space-y-4">
                      <p className="text-sm text-gray-300 line-clamp-4 min-h-[5rem]">
                        {member.bio || "No bio available."}
                      </p>
              
                      <div className="flex flex-wrap gap-2">
                        {member.founderData?.skills?.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-gray-800/50 text-gray-300 border-gray-700"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
              
                    {/* Bottom Button */}
                    <div className="pt-4 flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-sm text-gray-400">
                          <Building2 className="h-4 w-4 mr-1" />
                          {member.founderData?.companyName || "N/A"}
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <MapPin className="h-4 w-4 mr-1" />
                          {member.location || "Unknown"}
                        </div>
                      </div>
                      <Button 
                      onClick={() => 
                        {user ? router.push(`/network-profile/founder/${member.user_id}`) 
                          : toast({title: "Login Required", 
                            description: "Please login to view profiles.", 
                            variant: "destructive"})}}
                       className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
              ))}
               </div>
               )}
          </TabsContent>

          <TabsContent value="investors" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search investors..."
                  className="pl-9 bg-gray-900 border-gray-700 text-white"
                  value={searchItem}
                  onChange={(e) => handleSearch(e)}
                />
              </div>
              <Select value={selectedInvestorCategory} onValueChange={(value) => setSelectedInvestorCategory(value)}> 
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter By..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-white">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="DeFi">DeFi</SelectItem>
                  <SelectItem value="NFT">NFT</SelectItem>
                  <SelectItem value="DAO">DAO</SelectItem>
                  <SelectItem value="Metaverse">Metaverse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading Data ...</p>
              </div>
            ):(
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvestors.
            filter((member) => 
              member.username.toLowerCase().includes(searchItem.toLowerCase()) ||
              member.location?.toLowerCase().includes(searchItem.toLowerCase()) ||
              member.investorData?.investmentInterest?.some((investmentInterest) => 
                investmentInterest.toLowerCase().includes(searchItem.toLowerCase())
              )
            )
            .sort((a,b) => (a.status === 'verified' ? -1 : 1)).map((member) => (
               <Card
               key={member._id}
               className="bg-gray-900 border-gray-800 hover:border-blue-600 transition-colors flex flex-col justify-between"
             >
               <div className="flex-1 flex flex-col">
                 <CardHeader className="pb-0">
                   <div className="flex items-start justify-between">
                     <div className="flex items-center gap-4">
                       <Avatar className="h-16 w-16 border-2 border-gray-800">
                         <AvatarImage src={member?.profilePic?.file_url} />
                         <AvatarFallback>
                           {member.username
                             .split(" ")
                             .map((n) => n[0])
                             .join("")}
                         </AvatarFallback>
                       </Avatar>
                       <div>
                         <div className="flex items-center">
                           <CardTitle className="text-lg text-white">
                             {member.username}
                           </CardTitle>
                            {member.status === "verified" ? (
                              <Badge className="ml-2 bg-green-900/30 text-green-400 border-green-800">
                                Verified
                             </Badge>
                            ): (
                              <>
                              </>
                            )}
                         </div>
                         <div className="flex flex-wrap gap-2 mt-1">
                           <Badge
                             variant="outline"
                             className="bg-gray-800/50 text-gray-300 border-gray-700"
                           >
                             Investor
                           </Badge>
                         </div>
                       </div>
                     </div>
                   </div>
                 </CardHeader>

                 <CardContent className="flex-1 flex flex-col justify-between pt-4 space-y-4">
                   <div className="flex-1 space-y-4">
                     <p className="text-sm text-gray-300 line-clamp-4 min-h-[5rem]">
                       {member.bio || "No bio available."}
                     </p>
             
                     <div className="flex flex-wrap gap-2">
                       {member.investorData?.investmentInterest?.map((interest, index) => (
                         <Badge
                           key={index}
                           variant="outline"
                           className="bg-gray-800/50 text-gray-300 border-gray-700"
                         >
                           {interest}
                         </Badge>
                       ))}
                     </div>
             
                     <div className="flex items-center text-sm text-gray-400">
                       <MapPin className="h-4 w-4 mr-1" />
                       {member.location || "Unknown"}
                     </div>
                   </div>
             
                   {/* Bottom Button */}
                   <div className="pt-4">
                     <Button 
                    onClick={() => 
                      {user ? router.push(`/network-profile/investor/${member.user_id}`) 
                        : toast({title: "Login Required", 
                          description: "Please login to view profiles.", 
                          variant: "destructive"})}}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                       View Profile
                     </Button>
                   </div>
                 </CardContent>
               </div>
             </Card>
             
              ))}
            </div>
            )}
          </TabsContent>  

          <TabsContent value="serviceProviders" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search service providers..."
                  className="pl-9 bg-gray-900 border-gray-700 text-white"
                  value={searchItem}
                  onChange={(e) => handleSearch(e)}
                />
              </div>
              <Select value={selectedServiceProviderCategory}>
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-white">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading Data ...</p>
              </div>
            ):(
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServiceProviders.
            filter((member) => 
              member.username.toLowerCase().includes(searchItem.toLowerCase()) ||
              member.location?.toLowerCase().includes(searchItem.toLowerCase())
            )
            .sort((a,b) => (a.status === 'verified' ? -1 : 1)).map((member) => (
               <Card
               key={member._id}
               className="bg-gray-900 border-gray-800 hover:border-blue-600 transition-colors flex flex-col justify-between"
             >
               <div className="flex-1 flex flex-col">
                 <CardHeader className="pb-0">
                   <div className="flex items-start justify-between">
                     <div className="flex items-center gap-4">
                       <Avatar className="h-16 w-16 border-2 border-gray-800">
                         <AvatarImage src={member?.profilePic?.file_url} />
                         <AvatarFallback>
                           {member.username
                             .split(" ")
                             .map((n) => n[0])
                             .join("")}
                         </AvatarFallback>
                       </Avatar>
                       <div>
                         <div className="flex items-center">
                           <CardTitle className="text-lg text-white">
                             {member.username}
                           </CardTitle>
                            {member.status === "verified" ? (
                              <Badge className="ml-2 bg-green-900/30 text-green-400 border-green-800">
                                Verified
                             </Badge>
                            ): (
                              <>
                              </>
                            )}
                         </div>
                         <div className="flex flex-wrap gap-2 mt-1">
                           <Badge
                             variant="outline"
                             className="bg-gray-800/50 text-gray-300 border-gray-700"
                           >
                             Service Provider
                           </Badge>
                         </div>
                       </div>
                     </div>
                   </div>
                 </CardHeader>

                 <CardContent className="flex-1 flex flex-col justify-between pt-4 space-y-4">
                   <div className="flex-1 space-y-4">
                     <p className="text-sm text-gray-300 line-clamp-4 min-h-[5rem]">
                       {member.bio || "No bio available."}
                     </p>
             
                     <div className="flex flex-wrap gap-2">
                        {Array.isArray(member.serviceProviderData?.category) ? (
                          member.serviceProviderData?.category.map((category, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-gray-800/50 text-gray-300 border-gray-700"
                            >
                              {category}
                            </Badge>
                          ))
                        ) : member.serviceProviderData?.category ? (
                          <Badge
                            variant="outline"
                            className="bg-gray-800/50 text-gray-300 border-gray-700"
                          >
                            {member.serviceProviderData.category}
                          </Badge>
                        ) : null}
                    </div>

             
                     <div className="flex items-center text-sm text-gray-400">
                       <MapPin className="h-4 w-4 mr-1" />
                       {member.location || "Unknown"}
                     </div>
                   </div>
             
                   {/* Bottom Button */}
                   <div className="pt-4">
                     <Button 
                     onClick={() => 
                        {user ? router.push(`/network-profile/serviceProvider/${member.user_id}`) 
                          : toast({title: "Login Required", 
                            description: "Please login to view profiles.", 
                            variant: "destructive"})}}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                       View Profile
                     </Button>
                   </div>
                 </CardContent>
               </div>
             </Card>
              ))}
            </div>
            )}
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search events..."
                  className="pl-9 bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-white">
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="conference">Conferences</SelectItem>
                  <SelectItem value="workshop">Workshops</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                  <SelectItem value="virtual">Virtual Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="bg-gray-900 border-gray-800 overflow-hidden hover:border-blue-600 transition-colors"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <Badge
                      className={`absolute top-2 right-2 ${
                        event.type === "Conference"
                          ? "bg-blue-600"
                          : event.type === "Workshop"
                          ? "bg-purple-600"
                          : event.type === "Networking"
                          ? "bg-teal-600"
                          : "bg-amber-600"
                      }`}
                    >
                      {event.type}
                    </Badge>
                    {event.virtual && (
                      <Badge className="absolute top-2 left-2 bg-gray-800">
                        Virtual
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-white">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center text-sm text-gray-300">
                        <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Clock className="h-4 w-4 mr-2 text-blue-400" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Users className="h-4 w-4 mr-2 text-blue-400" />
                        {event.attendees} attendees
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Register
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-gray-300 border-gray-700"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search jobs by title, company, or skills..."
                  className="pl-9 bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-white">
                  <SelectItem value="all">All Jobs</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="remote">Remote Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <Card
                  key={job.id}
                  className="bg-gray-900 border-gray-800 hover:border-blue-600 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                          <Image
                            src={job.logo || "/placeholder.svg"}
                            alt={job.company}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {job.title}
                          </h3>
                          <p className="text-gray-400">{job.company}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                            <div className="flex items-center text-gray-300">
                              <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                              {job.location}
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-gray-800/50 text-gray-300 border-gray-700"
                            >
                              {job.type}
                            </Badge>
                            <div className="text-green-400">{job.salary}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="text-xs text-gray-500">
                          Posted {job.posted}
                        </div>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                          Apply Now
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-blue-900/20 text-blue-400 border-blue-800"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search partners..."
                  className="pl-9 bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-white">
                  <SelectItem value="all">All Partners</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <Card
                  key={partner.id}
                  className="bg-gray-900 border-gray-800 hover:border-blue-600 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                        <Image
                          src={partner.logo || "/placeholder.svg"}
                          alt={partner.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          {partner.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className="bg-gray-800/50 text-gray-300 border-gray-700"
                        >
                          {partner.category}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4">
                      {partner.description}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 text-gray-300 border-gray-700"
                      >
                        <Link
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="mr-2 h-4 w-4" />
                          Visit Website
                        </Link>
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
