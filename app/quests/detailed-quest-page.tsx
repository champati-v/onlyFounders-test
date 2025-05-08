"use client"

import { useState, useEffect, useRef } from "react"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Award,
  BookOpen,
  Lock,
  FileText,
  Users,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useUser } from "@auth0/nextjs-auth0/client"
import NFTSuccessModal from "./nft-success-modal"
import {AppLayout} from '../../components/layout/app-layout'
import { useToast } from "@/hooks/use-toast";
import { useAccount } from "wagmi"

// Comprehensive quest data based on the EduChain Hackathon document and JSON data
const questsData = {
  // BASIC QUESTS
  "quest-1": {
    id: "quest-1",
    title: "Master the Basics of Startup Pitching",
    description:
      "Creating a compelling pitch is the cornerstone of your startup's success. This quest introduces the key elements of a winning pitch, helping you effectively communicate your idea and value proposition to investors, partners, and customers.",
    difficulty: "Basic",
    nftReward: "Founder Basics NFT",
    rewardPoints: {
      founder: 20,
      reputation: 30,
    },
    guideContent: `
      <h2>How to Craft a Winning Startup Pitch</h2>
      <p>A great pitch tells a story that captivates your audience. Start by addressing the pain point your target audience faces and presenting your product or service as the unique solution.</p>
      <p>Highlight the size and potential of your target market, and explain how your startup makes money through a clear business model. A concise, visually appealing pitch is essential to communicate your message effectively.</p>
      <p>Finally, share any progress your startup has achieved, such as users, revenue, or partnerships. Introduce your key team members and their expertise to establish credibility. Remember, practice and refinement are key to delivering a confident and impactful pitch.</p>
      <h3>Key Elements of a Winning Pitch</h3>
      <ul>
        <li><strong>The Problem:</strong> Clearly define the problem you're solving</li>
        <li><strong>The Solution:</strong> Present your product/service as the answer</li>
        <li><strong>Market Opportunity:</strong> Show the size and potential of your target market</li>
        <li><strong>Business Model:</strong> Explain how your startup makes money</li>
        <li><strong>Traction:</strong> Share progress, metrics, and milestones</li>
        <li><strong>Team:</strong> Highlight key team members and their expertise</li>
      </ul>
      <p>Remember, a great pitch is concise, compelling, and tailored to your audience. Practice your delivery to ensure confidence and clarity.</p>
    `,
    questions: [
      {
        id: "q1",
        question: "What is the first key element of a winning pitch?",
        options: ["The Team", "The Problem", "The Solution", "Traction"],
        correctAnswer: 1,
        explanation: "The Problem is the first key element as it establishes the need your startup addresses.",
      },
      {
        id: "q2",
        question: "Why is the 'Market Opportunity' an important part of your pitch?",
        options: [
          "To showcase your team's expertise",
          "To highlight your revenue potential",
          "To explain how your product solves a problem",
          "To emphasize the competition",
        ],
        correctAnswer: 1,
        explanation:
          "Market Opportunity is important because it highlights the revenue potential and growth possibilities for your startup.",
      },
      {
        id: "q3",
        question: "Which of the following is NOT a core element of a pitch?",
        options: ["The Problem", "The Business Model", "The Traction", "A Detailed Product Manual"],
        correctAnswer: 3,
        explanation:
          "A Detailed Product Manual is not a core element of a pitch. Pitches should be concise and focused on key information.",
      },
    ],
  },
  "quest-2": {
    id: "quest-2",
    title: "Building a Strong Value Proposition",
    description:
      "A compelling value proposition sets your startup apart from competitors. This quest teaches you how to articulate the unique benefits of your product or service in a way that resonates with your target audience and drives customer acquisition.",
    difficulty: "Basic",
    nftReward: "Founder Basics NFT",
    rewardPoints: {
      founder: 20,
      reputation: 30,
    },
    guideContent: `
      <h2>How to Build a Strong Value Proposition</h2>
      <p>A value proposition is a clear and concise statement that explains the benefits your product offers, how it solves a problem, and why it's better than competitors. It should be simple, specific, and targeted to your ideal customer.</p>
      <p>A well-crafted value proposition helps you attract customers, differentiate your startup, and drive business growth.</p>
      <h3>Key Elements of a Strong Value Proposition</h3>
      <ul>
        <li><strong>Relevance:</strong> How your product solves customer problems or improves their situation</li>
        <li><strong>Quantified Value:</strong> Specific benefits your customers can expect</li>
        <li><strong>Differentiation:</strong> Why customers should buy from you instead of competitors</li>
      </ul>
      <p>To create a compelling value proposition, start by understanding your customer's needs and challenges. Define the unique features and benefits of your product that directly address these needs. Finally, articulate this in a single, impactful sentence that clearly communicates the value your product delivers.</p>
    `,
    questions: [
      {
        id: "q1",
        question: "What is the primary purpose of a value proposition?",
        options: [
          "To describe your business model",
          "To communicate the unique value your product offers",
          "To outline your startup's growth strategy",
          "To showcase your team's expertise",
        ],
        correctAnswer: 1,
        explanation:
          "A value proposition's primary purpose is to communicate the unique value your product offers to customers.",
      },
      {
        id: "q2",
        question: "Which of the following is a characteristic of a strong value proposition?",
        options: [
          "It is long and detailed",
          "It focuses on your competitors",
          "It is simple and specific",
          "It highlights only the product features",
        ],
        correctAnswer: 2,
        explanation:
          "A strong value proposition is simple and specific, making it easy for customers to understand the value you offer.",
      },
      {
        id: "q3",
        question: "What is the first step in creating a value proposition?",
        options: [
          "Develop your marketing strategy",
          "Focus on your competitors' weaknesses",
          "Understand your customer's needs and challenges",
          "Write a single, impactful sentence",
        ],
        correctAnswer: 2,
        explanation:
          "The first step in creating a value proposition is understanding your customer's needs and challenges so you can address them effectively.",
      },
    ],
  },

  // INTERMEDIATE QUESTS
  "quest-3": {
    id: "quest-3",
    title: "Mastering Competitive Analysis",
    description:
      "Understanding your competition is crucial for startup success. This quest teaches you how to conduct thorough competitive analysis, identify key players in your market, and find opportunities to differentiate your startup.",
    difficulty: "Intermediate",
    nftReward: "Growth Strategist NFT",
    rewardPoints: {
      founder: 40,
      reputation: 60,
    },
    guideContent: `
      <h2>How to Conduct Effective Competitive Analysis</h2>
      <p>Competitive analysis is the process of identifying and evaluating your competitors to understand their strengths and weaknesses relative to your own startup. This analysis helps you identify market opportunities, develop effective strategies, and create a unique position in the market.</p>
      <h3>Key Steps in Competitive Analysis</h3>
      <ul>
        <li><strong>Identify Your Competitors:</strong> List both direct competitors (offering similar products/services) and indirect competitors (offering alternative solutions)</li>
        <li><strong>Analyze Their Products/Services:</strong> Evaluate features, pricing, quality, and user experience</li>
        <li><strong>Assess Their Marketing Strategy:</strong> Examine their positioning, messaging, and channels</li>
        <li><strong>Evaluate Their Strengths and Weaknesses:</strong> Identify what they do well and where they fall short</li>
        <li><strong>Find Your Competitive Advantage:</strong> Determine how you can differentiate your startup</li>
      </ul>
      <p>Use tools like SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) to organize your findings. Remember, the goal is not to copy competitors but to learn from them and identify gaps in the market that your startup can fill.</p>
    `,
    questions: [
      {
        id: "q1",
        question: "What is the primary purpose of a competitive analysis?",
        options: [
          "To replicate your competitors' strategies",
          "To focus solely on your product development",
          "To identify strengths, weaknesses, and opportunities to differentiate your startup",
          "To increase your marketing budget",
        ],
        correctAnswer: 2,
        explanation:
          "Competitive analysis helps startups identify market opportunities and develop strategies to differentiate themselves from competitors.",
      },
      {
        id: "q2",
        question: "Which of the following is a key step in a competitive analysis?",
        options: [
          "Hiring more employees",
          "Researching competitors' offerings and customer feedback",
          "Focusing only on product pricing",
          "Ignoring competitors entirely",
        ],
        correctAnswer: 1,
        explanation:
          "Researching competitors' offerings and customer feedback is a crucial step in competitive analysis to understand the market landscape.",
      },
      {
        id: "q3",
        question: "Why is identifying gaps in competitors' offerings important?",
        options: [
          "To lower your product's price",
          "To copy their strategies",
          "To address unmet needs and stand out",
          "To reduce your operational costs",
        ],
        correctAnswer: 2,
        explanation:
          "Identifying gaps in competitors' offerings allows you to address unmet customer needs and differentiate your startup in the market.",
      },
      {
        id: "q4",
        question: "How does competitive analysis benefit your startup?",
        options: [
          "It guarantees immediate market dominance",
          "It helps refine your strategy and build investor confidence",
          "It eliminates the need for customer research",
          "It ensures higher marketing spend",
        ],
        correctAnswer: 1,
        explanation:
          "Competitive analysis helps refine your strategy and builds investor confidence by demonstrating your understanding of the market landscape.",
      },
    ],
  },
  "quest-4": {
    id: "quest-4",
    title: "Effective Fundraising Strategies",
    description:
      "Securing funding is a critical milestone for most startups. This quest explores different fundraising approaches, teaches you how to prepare for investor meetings, and helps you build lasting relationships with potential investors.",
    difficulty: "Intermediate",
    nftReward: "Growth Strategist NFT",
    rewardPoints: {
      founder: 40,
      reputation: 60,
    },
    guideContent: `
      <h2>Mastering the Art of Startup Fundraising</h2>
      <p>Fundraising is often essential for startups to scale and achieve their vision. This guide will help you navigate the fundraising process, from preparation to closing the deal.</p>
      <h3>Key Fundraising Strategies</h3>
      <ul>
        <li><strong>Bootstrapping:</strong> Self-funding your startup using personal savings or revenue</li>
        <li><strong>Friends and Family:</strong> Raising capital from your personal network</li>
        <li><strong>Angel Investors:</strong> Individual investors who provide early-stage funding</li>
        <li><strong>Venture Capital:</strong> Professional firms that invest in high-growth startups</li>
        <li><strong>Crowdfunding:</strong> Raising small amounts from many people, typically online</li>
        <li><strong>Grants and Competitions:</strong> Non-dilutive funding from organizations or contests</li>
      </ul>
      <h3>Preparing for Investor Meetings</h3>
      <p>Before approaching investors, ensure you have:</p>
      <ul>
        <li>A compelling pitch deck that clearly communicates your value proposition</li>
        <li>A solid business plan with financial projections</li>
        <li>A clear understanding of how much funding you need and how you'll use it</li>
        <li>A demonstration of traction or proof of concept</li>
      </ul>
      <p>Remember, fundraising is not just about securing capital—it's about building relationships with investors who can provide guidance, connections, and support beyond money.</p>
    `,
    questions: [
      {
        id: "q1",
        question: "What is the first step in effective fundraising?",
        options: [
          "Developing your product further",
          "Researching investors who align with your industry and growth stage",
          "Setting unrealistic financial goals",
          "Hiring more team members",
        ],
        correctAnswer: 1,
        explanation:
          "Researching investors who align with your industry and growth stage is the first step in effective fundraising to ensure you target the right potential partners.",
      },
      {
        id: "q2",
        question: "Why is tailoring your pitch important for fundraising?",
        options: [
          "To copy other successful pitches",
          "To highlight your traction and market opportunity effectively",
          "To avoid tough investor questions",
          "To focus solely on your competitors",
        ],
        correctAnswer: 1,
        explanation:
          "Tailoring your pitch is important to effectively highlight your traction and market opportunity in a way that resonates with specific investors.",
      },
      {
        id: "q3",
        question: "What is a critical element to include in your fundraising pitch?",
        options: [
          "Competitor weaknesses",
          "A transparent and realistic financial plan",
          "Personal anecdotes unrelated to the business",
          "A focus on speculative market trends",
        ],
        correctAnswer: 1,
        explanation:
          "A transparent and realistic financial plan is critical in a fundraising pitch as it builds credibility and helps investors understand your business model.",
      },
      {
        id: "q4",
        question: "How can you build trust with investors during fundraising?",
        options: [
          "By avoiding questions about your business model",
          "By focusing only on your product features",
          "By sharing a realistic plan and demonstrating growth potential",
          "By keeping the financial details vague",
        ],
        correctAnswer: 2,
        explanation:
          "Building trust with investors requires sharing a realistic plan and demonstrating growth potential with concrete evidence and transparent communication.",
      },
    ],
  },

  // ADVANCED QUESTS
  "quest-5": {
    id: "quest-5",
    title: "Scaling Your Startup",
    description:
      "Successfully scaling a startup requires strategic planning and execution. This quest covers the challenges of scaling, strategies for sustainable growth, and how to build systems that support expansion.",
    difficulty: "Advanced",
    nftReward: "Venture Master NFT",
    rewardPoints: {
      founder: 50,
      reputation: 80,
    },
    guideContent: `
      <h2>Strategies for Successfully Scaling Your Startup</h2>
      <p>Scaling is the process of growing your startup in a sustainable way that increases revenue while managing costs. It's a critical phase that requires careful planning and execution.</p>
      <h3>Key Scaling Challenges and Solutions</h3>
      <ul>
        <li><strong>Team Scaling:</strong> Hire ahead of growth, develop clear roles and responsibilities, and create a strong company culture</li>
        <li><strong>Process Scaling:</strong> Document and standardize processes, implement systems that can grow with you, and automate where possible</li>
        <li><strong>Customer Scaling:</strong> Develop a repeatable sales process, focus on customer retention, and leverage existing customers for referrals</li>
        <li><strong>Product Scaling:</strong> Build a scalable architecture, prioritize features that serve the most customers, and maintain quality while adding functionality</li>
        <li><strong>Financial Scaling:</strong> Monitor cash flow carefully, understand unit economics, and secure appropriate funding for growth</li>
      </ul>
      <h3>Signs You're Ready to Scale</h3>
      <p>Before attempting to scale, ensure you have:</p>
      <ul>
        <li>A proven product-market fit with consistent customer demand</li>
        <li>A repeatable and profitable business model</li>
        <li>Core systems and processes that can handle increased volume</li>
        <li>Access to sufficient capital to fund growth</li>
        <li>A leadership team capable of managing a larger organization</li>
      </ul>
      <p>Remember, scaling too early can be as dangerous as scaling too late. Timing is crucial for successful growth.</p>
    `,
    questions: [
      {
        id: "q1",
        question: "What is the first step before scaling a startup?",
        options: [
          "Hiring a larger team",
          "Expanding into new markets immediately",
          "Ensuring a solid product-market fit",
          "Raising as much capital as possible",
        ],
        correctAnswer: 2,
        explanation:
          "Ensuring a solid product-market fit is the first step before scaling, as it confirms there is genuine demand for your product or service.",
      },
      {
        id: "q2",
        question: "Why is it important to refine your core offering before scaling?",
        options: [
          "To avoid hiring more employees",
          "To ensure clear demand for your product and prevent resource waste",
          "To delay customer acquisition",
          "To focus solely on automation",
        ],
        correctAnswer: 1,
        explanation:
          "Refining your core offering before scaling ensures clear demand for your product and prevents wasting resources on scaling something that isn't working well.",
      },
      {
        id: "q3",
        question: "What is a major challenge when scaling rapidly?",
        options: [
          "Reducing your customer base",
          "Maintaining the quality of your product or service",
          "Hiring fewer people",
          "Avoiding automation",
        ],
        correctAnswer: 1,
        explanation:
          "Maintaining the quality of your product or service is a major challenge when scaling rapidly, as growth can strain resources and processes.",
      },
      {
        id: "q4",
        question: "Which of the following helps improve operational efficiency during scaling?",
        options: [
          "Delaying customer support improvements",
          "Automating repetitive tasks",
          "Focusing only on revenue growth",
          "Ignoring process improvements",
        ],
        correctAnswer: 1,
        explanation:
          "Automating repetitive tasks helps improve operational efficiency during scaling by reducing manual work and allowing the team to focus on higher-value activities.",
      },
      {
        id: "q5",
        question: "Why is financial planning crucial for scaling?",
        options: [
          "To reduce marketing costs",
          "To monitor cash flow and explore funding options for growth",
          "To decrease product features",
          "To focus solely on internal team operations",
        ],
        correctAnswer: 1,
        explanation:
          "Financial planning is crucial for scaling to monitor cash flow and explore funding options that will support sustainable growth without running out of capital.",
      },
      {
        id: "q6",
        question: "What is a key trait for founders during the scaling phase?",
        options: [
          "Resistance to change",
          "Resilience and adaptability",
          "Focus on small-scale operations",
          "Ignoring investor relationships",
        ],
        correctAnswer: 1,
        explanation:
          "Resilience and adaptability are key traits for founders during the scaling phase, as they'll need to navigate numerous challenges and adjust strategies quickly.",
      },
    ],
  },
  "quest-6": {
    id: "quest-6",
    title: "Crafting a Sustainable Business Model",
    description:
      "A sustainable business model is the foundation of long-term success. This advanced quest explores different business model frameworks, revenue strategies, and approaches to creating lasting value in changing markets.",
    difficulty: "Advanced",
    nftReward: "Venture Master NFT",
    rewardPoints: {
      founder: 50,
      reputation: 80,
    },
    guideContent: `
      <h2>Designing a Sustainable Business Model</h2>
      <p>A business model describes how your company creates, delivers, and captures value. A sustainable business model generates ongoing value for customers while producing reliable revenue and profits for your company.</p>
      <h3>Key Business Model Components</h3>
      <ul>
        <li><strong>Value Proposition:</strong> The unique value you offer to customers</li>
        <li><strong>Customer Segments:</strong> The specific groups of customers you target</li>
        <li><strong>Revenue Streams:</strong> How you generate income from your value proposition</li>
        <li><strong>Cost Structure:</strong> The expenses required to operate your business</li>
        <li><strong>Key Resources:</strong> The assets needed to deliver your value proposition</li>
        <li><strong>Key Activities:</strong> The most important things you must do to make your business model work</li>
        <li><strong>Key Partnerships:</strong> The network of suppliers and partners that make your business model work</li>
        <li><strong>Customer Relationships:</strong> How you interact with customers and meet their needs</li>
        <li><strong>Channels:</strong> How you reach and deliver value to your customers</li>
      </ul>
      <h3>Common Business Model Patterns</h3>
      <ul>
        <li><strong>Subscription:</strong> Customers pay a recurring fee for access to a product or service</li>
        <li><strong>Marketplace:</strong> Platform connecting buyers and sellers, taking a commission on transactions</li>
        <li><strong>Freemium:</strong> Basic services are free, while premium features require payment</li>
        <li><strong>On-demand:</strong> Services delivered immediately upon customer request</li>
        <li><strong>Product-as-a-Service:</strong> Products offered as a service rather than a one-time purchase</li>
      </ul>
      <p>The most sustainable business models create a virtuous cycle where serving customers well leads to growth, which enables you to serve customers even better.</p>
    `,
    questions: [
      {
        id: "q1",
        question: "What is the primary focus of a sustainable business model?",
        options: [
          "Rapid expansion into new markets",
          "Generating consistent value for customers and ensuring profitability",
          "Developing products without considering costs",
          "Offering discounts to beat competitors",
        ],
        correctAnswer: 1,
        explanation:
          "A sustainable business model focuses on generating consistent value for customers while ensuring profitability for long-term viability.",
      },
      {
        id: "q2",
        question: "Why is it important to align your value proposition with revenue streams?",
        options: [
          "To reduce operational costs",
          "To ensure your product's value translates directly to profitability",
          "To avoid scaling your business",
          "To focus on partnerships instead of customers",
        ],
        correctAnswer: 1,
        explanation:
          "Aligning your value proposition with revenue streams ensures that the value you create for customers translates directly into profitability for your business.",
      },
      {
        id: "q3",
        question: "What is a key factor to consider in your cost structure?",
        options: [
          "Reducing all costs regardless of impact",
          "Optimizing efficiency while maintaining quality",
          "Ignoring marketing expenses",
          "Avoiding the use of technology",
        ],
        correctAnswer: 1,
        explanation:
          "In your cost structure, optimizing efficiency while maintaining quality is key to balancing cost control with delivering value to customers.",
      },
      {
        id: "q4",
        question: "How can partnerships contribute to a sustainable business model?",
        options: [
          "By reducing customer involvement",
          "By limiting revenue streams",
          "By reducing overhead and scaling efficiently",
          "By focusing only on product development",
        ],
        correctAnswer: 2,
        explanation:
          "Partnerships can contribute to a sustainable business model by reducing overhead costs and helping your business scale more efficiently.",
      },
      {
        id: "q5",
        question: "Why is adaptability important in a business model?",
        options: [
          "To maintain a static strategy",
          "To stay relevant in changing market conditions",
          "To avoid analyzing data",
          "To minimize customer engagement",
        ],
        correctAnswer: 1,
        explanation:
          "Adaptability is important in a business model to stay relevant in changing market conditions and respond to evolving customer needs.",
      },
      {
        id: "q6",
        question: "What is the ultimate balance in a sustainable business model?",
        options: [
          "Creating value while ignoring costs",
          "Controlling costs without delivering value",
          "Creating value, controlling costs, and adapting to change",
          "Focusing only on short-term revenue",
        ],
        correctAnswer: 2,
        explanation:
          "The ultimate balance in a sustainable business model is creating value for customers, controlling costs for profitability, and adapting to change for long-term viability.",
      },
    ],
  },
}

interface mintData {
  image: string
  message: string
  transactionHash: string
  recepient: string
  tokenId: string
  status: string
}

export default function DetailedQuestPage({ questId }) {
  const router = useRouter()
  const user = useUser()

  // Get quest data based on questId
  const quest = questsData[questId] || questsData["quest-1"] // Fallback to first quest if ID not found

  // State management
  const [stage, setStage] = useState<"rules" | "guide" | "questions" | "results">("rules")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [hasReadGuide, setHasReadGuide] = useState(false)
  const [progress, setProgress] = useState(0)
  const guideRef = useRef<HTMLDivElement>(null)
  const [isSubmittingScore, setIsSubmittingScore] = useState(false)
  const [scoreSubmitted, setScoreSubmitted] = useState(false)
  const [isMintingNFT, setIsMintingNFT] = useState(false)
  const [mintingSuccess, setMintingSuccess] = useState(false)
  const [apiError, setApiError] = useState("")
  const [mintModal, setMintModal] = useState(false)
  const [mintData, setMintData] = useState<mintData[]>([])
  const {toast} = useToast();
  const {isConnected} = useAccount()


  // Calculate progress percentage based on current stage and question
  useEffect(() => {
    if (stage === "rules") setProgress(0)
    else if (stage === "guide") setProgress(20)
    else if (stage === "questions") {
      const questionProgress = ((currentQuestionIndex + (showFeedback ? 0.5 : 0)) / quest.questions.length) * 60
      setProgress(20 + questionProgress)
    } else if (stage === "results") setProgress(100)
  }, [stage, currentQuestionIndex, showFeedback, quest.questions.length])

  // Check if user has scrolled to bottom of guide
  useEffect(() => {
    const checkScroll = () => {
      if (guideRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = guideRef.current
        if (scrollTop + clientHeight >= scrollHeight - 50) {
          setHasReadGuide(true)
        }
      }
    }

    const guideElement = guideRef.current
    if (guideElement && stage === "guide") {
      guideElement.addEventListener("scroll", checkScroll)
      return () => guideElement.removeEventListener("scroll", checkScroll)
    }
  }, [stage])

  // Handle answer submission
  const handleSubmitAnswer = () => {
    const currentQuestion = quest.questions[currentQuestionIndex]
    const selectedAnswer = selectedAnswers[currentQuestionIndex]

    if (selectedAnswer === undefined) return // Don't proceed if no answer selected

    const correct = selectedAnswer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    // Update score
    if (correct) {
      setScore((prev) => prev + 4)
    } else {
      setScore((prev) => Math.max(0, prev - 1)) // Prevent negative scores
    }
  }

  // Handle continuing to next question or results
  const handleContinue = async () => {
    setShowFeedback(false)
    if (currentQuestionIndex < quest.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // Submit score to backend when quiz is completed
      setIsSubmittingScore(true)
      try {

        if(!user){
          return
        }

        const userId = user?.user?.sub?.substring(14)

        const response = await fetch("https://ofstaging.azurewebsites.net/api/nft/submit-quest-score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            user_id: userId,
          },
          body: JSON.stringify({
            quest_id: questId,
            score: score,
            totalScore: quest.questions.length * 4,
          }),
        })

        if (response.ok) {
          setScoreSubmitted(true)
        } else {
          console.error("Failed to submit score")
        }
      } catch (error) {
        console.error("Error submitting score:", error)
      } finally {
        setIsSubmittingScore(false)
        setStage("results")
      }
    }
  }

  // Handle NFT minting
  const handleMintNFT = async () => {
    if (!isPassing) return

    setIsMintingNFT(true)
    setApiError("")

    try {
      if(!user){
        return
      }

      const userId = user?.user?.sub?.substring(14)

      // const walletConnect = await fetch("https://ofstaging.azurewebsites.net/api/profile/get-walletconnect-status", {
      //   method:"GET",
      //   headers:{
      //     user_id: userId,
      //   },
      // })


        if(!isConnected){
          toast({
            title: "Message",
            description: "Please connect your wallet to mint the NFT.",
            variant: "destructive",
          })
          return
        }

        else{
          const response = await fetch("https://ofstaging.azurewebsites.net/api/nft/mint-nft", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              user_id: userId,
            },
            body: JSON.stringify({
              questId: questId,
              questType: quest.difficulty,
            }),
          })
    
          if (response.ok) {
            const data = await response.json()
            setMintData(data)
            setMintingSuccess(true)
            setMintModal(true)
          } else {
            setApiError("Failed to mint NFT. Please try again.")
          }
      }

      

    } catch (error) {
      console.error("Error minting NFT:", error)
      setApiError("Error connecting to server. Please try again.")
    } finally {
      setIsMintingNFT(false)
    }
  }

  // Calculate final score percentage
  const scorePercentage = Math.round((score / (quest.questions.length * 4)) * 100)
  const isPassing = scorePercentage >= 50

  // Define all steps for the progress panel
  const steps = [
    { id: "rules", label: "Quest Rules" },
    { id: "guide", label: "Learning Guide" },
    ...quest.questions.map((q, index) => ({
      id: `question-${index}`,
      label: `Question ${index + 1}`,
    })),
    { id: "results", label: "Results" },
  ]

  // Determine current step index for progress panel
  const getCurrentStepIndex = () => {
    if (stage === "rules") return 0
    if (stage === "guide") return 1
    if (stage === "questions") return 2 + currentQuestionIndex
    if (stage === "results") return steps.length - 1
    return 0
  }

  return (
    <div className="min-h-screen bg-[#0B0E17] text-[#F5F7FA] p-6 font-['Poppins',sans-serif]">
      {/* Custom font styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Poppins', sans-serif;
          line-height: 1.6;
          background: linear-gradient(180deg, #0B0E17 0%, #101628 100%);
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Poppins', sans-serif;
          line-height: 1.3;
        }
        
        .prose h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #00D3FF;
        }
        
        .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
          color: #F5F7FA;
        }
        
        .prose p {
          margin-bottom: 1.25rem;
          line-height: 1.7;
        }
        
        .prose ul {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }
        
        .prose strong {
          color: #00E0FF;
          font-weight: 600;
        }

        /* Custom scrollbar without arrows */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(19, 26, 46, 0.3);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 207, 255, 0.3);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 207, 255, 0.5);
        }
        
        /* Hide scrollbar arrows in Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 207, 255, 0.3) rgba(19, 26, 46, 0.3);
        }
        
        /* Hide scrollbar arrows in IE and Edge */
        *::-ms-scrollbar-button {
          display: none;
        }

        /* Animations */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(0, 207, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 207, 255, 0.6);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .progress-animation {
          transition: width 0.5s ease-out;
        }
        
        /* Focus styles for accessibility */
        .focus-visible:focus-visible {
          outline: 2px solid #00E0FF;
          outline-offset: 2px;
        }
      `}</style>

      {/* Header with back button */}
      <div className="max-w-7xl mx-auto mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="text-[#00CFFF] hover:text-[#00E0FF] transition-colors duration-200 group flex items-center gap-2"
          onClick={() => router.push("/quests")}
        >
          <ArrowLeft className="h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
          <span className="font-medium">Back to Quests</span>
        </Button>
      </div>

      {/* Main content area with two-column layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column - Progress panel (30%) */}
        <div className="lg:col-span-4">
          <div className="sticky top-6 space-y-6">
            {/* Quest Title Card */}
            <Card className="bg-[#101628]/80 backdrop-blur-sm border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="pb-5 pt-5">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="outline"
                    className="bg-[#131A2E]/80 text-[#00E0FF] border border-[#15847D]/50 px-3 py-1 rounded-full font-medium"
                  >
                    {quest.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-[#F5F7FA] leading-tight font-semibold tracking-tight">
                  {quest.title}
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Progress indicator */}
            <Card className="bg-[#101628]/80 backdrop-blur-sm border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="pb-5 pt-5">
                <CardTitle className="text-lg text-[#00D3FF] font-semibold tracking-tight flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-[#00E0FF]" />
                  Quest Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8C9BA8] font-medium">Completion:</span>
                    <span className="text-sm text-[#F5F7FA] font-semibold">{Math.round(progress)}%</span>
                  </div>
                  <div className="relative h-2.5 bg-[#131A2E]/80 rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00CFFF] to-[#00E0FF] rounded-full progress-animation"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Quest Info */}
                <div className="space-y-4 py-4 border-y border-[#15847D]/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8C9BA8] font-medium">Questions:</span>
                    <span className="text-sm text-[#F5F7FA]">{quest.questions.length}</span>
                  </div>
                  {stage !== "rules" && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#8C9BA8] font-medium">Current Score:</span>
                      <div className="flex items-center">
                        <span className="text-sm text-[#F5F7FA] font-semibold">{score}</span>
                        <span className="text-sm text-[#8C9BA8]">/{quest.questions.length * 4}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8C9BA8] font-medium">Passing Score:</span>
                    <span className="text-sm text-[#F5F7FA]">50%</span>
                  </div>
                </div>

                {/* Steps List */}
                <div>
                  <h4 className="text-sm font-semibold text-[#F5F7FA] mb-4 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-[#00E0FF]" />
                    Finish all steps
                  </h4>
                  <div className="space-y-3">
                    {steps.map((step, index) => {
                      const currentStepIndex = getCurrentStepIndex()
                      const isActive = index === currentStepIndex
                      const isCompleted = index < currentStepIndex
                      const isLocked = index > currentStepIndex

                      return (
                        <div
                          key={step.id}
                          className={cn(
                            "flex items-center p-3 rounded-lg transition-all duration-300",
                            isActive
                              ? "bg-gradient-to-r from-[#00CFFF]/10 to-transparent border border-[#00CFFF]/20 shadow-[0_0_10px_rgba(0,207,255,0.1)]"
                              : isCompleted
                                ? "text-[#8C9BA8] bg-[#131A2E]/30 border border-[#15847D]/10"
                                : "text-[#8C9BA8]/50 bg-[#131A2E]/20 border border-transparent",
                          )}
                        >
                          <div
                            className={cn(
                              "flex items-center justify-center w-6 h-6 rounded-full mr-3 transition-all duration-300",
                              isActive
                                ? "bg-gradient-to-r from-[#00CFFF] to-[#00E0FF] text-[#0B0E17]"
                                : isCompleted
                                  ? "bg-[#15847D]/20 text-[#00E0FF]"
                                  : "bg-[#131A2E] text-[#8C9BA8]/50",
                            )}
                          >
                            {isCompleted ? (
                              <CheckCircle className="h-3.5 w-3.5" />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full">{index + 1}</div>
                            )}
                          </div>
                          <div className="flex items-center">
                            <span className={cn("text-sm font-medium", isActive ? "text-[#00E0FF]" : "")}>
                              {step.label}
                            </span>
                          </div>
                          {isLocked && <Lock className="h-3.5 w-3.5 ml-auto text-[#8C9BA8]/50" />}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Rewards Section */}
                <div className="mt-4 pt-4 border-t border-[#15847D]/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-[#00E0FF]" />
                      <span className="text-sm font-semibold text-[#F5F7FA]">Rewards</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#131A2E]/50 rounded-lg p-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00CFFF] to-[#00E0FF] flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-[#0B0E17]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-[#8C9BA8]">Complete Quest</div>
                      <div className="text-sm font-medium text-[#F5F7FA]">{quest.nftReward}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right column - Main content (70%) */}
        <div className="lg:col-span-8">
          {/* Rules Section */}
          {stage === "rules" && (
            <Card className="bg-[#101628]/80 backdrop-blur-sm border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="pb-5 pt-5">
                <div className="flex items-center mb-2">
                  <Badge
                    variant="outline"
                    className="mb-3 self-start bg-[#131A2E] text-[#00E0FF] border border-[#15847D]/30 px-3 py-1 rounded-full"
                  >
                    Step 1
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-[#00D3FF] font-semibold tracking-tight">Quest Rules</CardTitle>
                <p className="text-[#8C9BA8] mt-3 leading-relaxed">{quest.description}</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-5 bg-[#131A2E]/40 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#00CFFF]/10 p-2 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-[#00E0FF]" />
                    </div>
                    <div>
                      <h4 className="text-[#F5F7FA] font-semibold mb-1.5 text-lg">Quest Structure</h4>
                      <p className="text-[#8C9BA8] leading-relaxed">
                        This quest has {quest.questions.length} questions. You must read the guide before taking the
                        quiz.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/10 p-2 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-[#F5F7FA] font-semibold mb-1.5 text-lg">Scoring System</h4>
                      <p className="text-[#8C9BA8] leading-relaxed">
                        Correct answer = +4 points. Wrong answer = -1 point.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-500/10 p-2 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-[#F5F7FA] font-semibold mb-1.5 text-lg">Important Notes</h4>
                      <p className="text-[#8C9BA8] leading-relaxed">
                        No retries are allowed once an answer is submitted. You need at least 50% to earn the NFT
                        reward.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#131A2E]/40 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-[#00CFFF]/10 to-transparent p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="h-5 w-5 text-[#00E0FF]" />
                      <h3 className="text-xl font-semibold text-[#F5F7FA]">Guide Preview</h3>
                    </div>
                    <p className="text-[#8C9BA8] mb-4 line-clamp-3 leading-relaxed">
                      {quest.guideContent.split("</p>")[0].replace(/<[^>]*>/g, "")}...
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-2 pb-6 px-6">
                <Button
                  onClick={() => setStage("guide")}
                  className="bg-gradient-to-r from-[#00CFFF] to-[#00E0FF] hover:from-[#00E0FF] hover:to-[#00CFFF] text-[#0B0E17] font-medium px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(0,207,255,0.2)] hover:shadow-[0_0_20px_rgba(0,224,255,0.3)] transition-all duration-300"
                >
                  Continue to Guide
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Guide Reading Section */}
          {stage === "guide" && (
            <Card className="bg-[#101628]/80 backdrop-blur-sm border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="pb-5 pt-5">
                <div className="flex items-center mb-2">
                  <Badge
                    variant="outline"
                    className="mb-3 self-start bg-[#131A2E] text-[#00E0FF] border border-[#15847D]/30 px-3 py-1 rounded-full"
                  >
                    Step 2
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-[#00D3FF] font-semibold tracking-tight">Learning Guide</CardTitle>
                <p className="text-[#8C9BA8] mt-3 leading-relaxed">
                  Read through the guide carefully to prepare for the quiz.
                </p>
              </CardHeader>
              <CardContent>
                <div
                  ref={guideRef}
                  className="prose prose-invert max-w-none h-[500px] overflow-y-auto pr-4 mb-4 text-[#F5F7FA] bg-[#131A2E]/40 p-6 rounded-xl"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#15847D #131A2E",
                  }}
                  dangerouslySetInnerHTML={{ __html: quest.guideContent }}
                />
                {!hasReadGuide && (
                  <div className="text-center text-sm text-[#8C9BA8] italic mt-4 animate-pulse">
                    Scroll to the bottom to continue
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-2 pb-6 px-6">
                <Button
                  variant="outline"
                  onClick={() => setStage("rules")}
                  className="border-[#15847D]/30 text-[#8C9BA8] hover:text-[#F5F7FA] hover:border-[#00E0FF]/50 hover:bg-[#00E0FF]/5 transition-all duration-200 rounded-xl px-5"
                >
                  Back to Rules
                </Button>
                <Button
                  onClick={() => setStage("questions")}
                  disabled={!hasReadGuide}
                  className="bg-gradient-to-r from-[#00CFFF] to-[#00E0FF] hover:from-[#00E0FF] hover:to-[#00CFFF] text-[#0B0E17] font-medium px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(0,207,255,0.2)] hover:shadow-[0_0_20px_rgba(0,224,255,0.3)] transition-all duration-300 disabled:opacity-50 disabled:shadow-none disabled:hover:from-[#00CFFF] disabled:hover:to-[#00E0FF]"
                >
                  {hasReadGuide ? "Start Quiz" : "Finish Reading"}
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Question Flow Section */}
          {stage === "questions" && !showFeedback && (
            <Card className="bg-[#101628]/80 backdrop-blur-sm border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="pb-5 pt-5">
                <div className="flex items-center mb-2">
                  <Badge
                    variant="outline"
                    className="mb-3 self-start bg-[#131A2E] text-[#00E0FF] border border-[#15847D]/30 px-3 py-1 rounded-full"
                  >
                    Step {3 + currentQuestionIndex}
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-[#00D3FF] font-semibold tracking-tight">
                  Question {currentQuestionIndex + 1}
                </CardTitle>
                <p className="text-[#F5F7FA] mt-4 text-lg font-medium leading-relaxed">
                  {quest.questions[currentQuestionIndex].question}
                </p>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAnswers[currentQuestionIndex]?.toString()}
                  onValueChange={(value) => {
                    const newAnswers = [...selectedAnswers]
                    newAnswers[currentQuestionIndex] = Number.parseInt(value)
                    setSelectedAnswers(newAnswers)
                  }}
                  className="space-y-4"
                  aria-label={`Question ${currentQuestionIndex + 1}: ${quest.questions[currentQuestionIndex].question}`}
                >
                  {quest.questions[currentQuestionIndex].options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 rounded-xl border border-[#15847D]/20 p-5 hover:border-[#00E0FF]/30 hover:bg-[#00E0FF]/5 transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-[#00E0FF]/50"
                      onClick={() => {
                        const newAnswers = [...selectedAnswers]
                        newAnswers[currentQuestionIndex] = index
                        setSelectedAnswers(newAnswers)
                      }}
                    >
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                        className="text-[#00E0FF] focus:ring-[#00E0FF] focus-visible:ring-[#00E0FF] border-2 h-5 w-5"
                        aria-labelledby={`label-option-${index}`}
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        id={`label-option-${index}`}
                        className="flex-1 cursor-pointer font-medium text-[#F5F7FA]"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-end pt-2 pb-6 px-6">
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswers[currentQuestionIndex] === undefined}
                  className="bg-gradient-to-r from-[#00CFFF] to-[#00E0FF] hover:from-[#070a0a] hover:to-[#00CFFF] text-[#0B0E17] font-medium px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(0,207,255,0.2)] hover:shadow-[0_0_20px_rgba(0,224,255,0.3)] transition-all duration-300 disabled:opacity-50 disabled:shadow-none disabled:hover:from-[#00CFFF] disabled:hover:to-[#00E0FF]"
                >
                  Submit Answer
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Feedback Popup */}
          {stage === "questions" && showFeedback && (
            <Card
              className={`border-0 shadow-lg rounded-xl overflow-hidden ${
                isCorrect
                  ? "bg-gradient-to-br from-[#0B2A1F] to-[#101628] border-l-4 border-green-500"
                  : "bg-gradient-to-br from-[#2A0B0B] to-[#101628] border-l-4 border-red-500"
              }`}
            >
              <CardHeader className="pb-5 pt-5">
                <div className="flex items-center gap-3">
                  {isCorrect ? (
                    <div className="bg-green-500/30 p-2.5 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    </div>
                  ) : (
                    <div className="bg-red-500/30 p-2.5 rounded-lg">
                      <XCircle className="h-6 w-6 text-red-400" />
                    </div>
                  )}
                  <CardTitle className={`text-2xl font-semibold ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {isCorrect ? "Correct!" : "Wrong!"}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`bg-[#131A2E]/60 p-5 rounded-xl mb-5 ${isCorrect ? "border-l-4 border-green-500/50" : "border-l-4 border-red-500/50"}`}
                >
                  <p className="text-[#F5F7FA] leading-relaxed">
                    {isCorrect
                      ? quest.questions[currentQuestionIndex].explanation
                      : `The correct answer is: ${quest.questions[currentQuestionIndex].options[quest.questions[currentQuestionIndex].correctAnswer]}`}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-3 ${isCorrect ? "bg-green-500/10" : "bg-red-500/10"} p-4 rounded-lg`}
                >
                  {isCorrect ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="font-medium text-green-200">+4 points added to your score</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-400" />
                      <span className="font-medium text-red-200">-1 point from your score</span>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-2 pb-6 px-6">
                <Button
                  onClick={handleContinue}
                  disabled={isSubmittingScore}
                  className={`${
                    isCorrect
                      ? "bg-gradient-to-r from-[#00CFFF] to-[#00E0FF]"
                      : "bg-gradient-to-r from-[#FF4D4F] to-[#FF6B6B]"
                  } hover:opacity-90 text-[#0B0E17] font-medium px-6 py-2.5 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-70`}
                >
                  {isSubmittingScore ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0B0E17]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Results Section */}
          {stage === "results" && (
            <Card className="bg-[#101628]/80 backdrop-blur-sm border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="pb-2 pt-5">
                <div className="flex items-center mb-2">
                  <Badge
                    variant="outline"
                    className="mb-3 self-start bg-[#131A2E] text-[#00E0FF] border border-[#15847D]/30 px-3 py-1 rounded-full"
                  >
                    Final Step
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-[#00D3FF] font-semibold tracking-tight">Quest Complete!</CardTitle>
                <p className="text-[#8C9BA8] mt-3 leading-relaxed">You've completed the "{quest.title}" quest.</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-5">
                  <div className="relative w-36 h-36 mb-8 animate-float">
                    <div className="absolute inset-0 rounded-full border-4 border-[#131A2E]"></div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={isPassing ? "#00CFFF" : "#FF4D4F"} />
                          <stop offset="100%" stopColor={isPassing ? "#00E0FF" : "#FF6B6B"} />
                        </linearGradient>
                      </defs>
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#131A2E" strokeWidth="12" />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="url(#scoreGradient)"
                        strokeWidth="12"
                        strokeDasharray={`${(2 * Math.PI * 38 * scorePercentage) / 100} ${2 * Math.PI * 38 * (1 - scorePercentage / 100)}`}
                        strokeDashoffset={2 * Math.PI * 38 * 0.25}
                        transform="rotate(-90 50 50)"
                      />
                      <text
                        x="50"
                        y="50"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="#F5F7FA"
                        fontSize="22"
                        fontWeight="bold"
                      >
                        {scorePercentage}%
                      </text>
                    </svg>
                  </div>

                  <h3 className="text-xl mb-2 font-bold text-[#F5F7FA]">
                    Your Score: {score}/{quest.questions.length * 4}
                  </h3>

                  <div
                    className={`flex items-center gap-3 mb-5 ${isPassing ? "text-green-400" : "text-red-400"} bg-[#222c48]/40 px-5 py-3 rounded-lg`}
                  >
                    {isPassing ? (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">You are eligible to mint your NFT.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5" />
                        <span className="font-medium">You are not eligible to mint the NFT.</span>
                      </>
                    )}
                  </div>

                  <div className="bg-[#131A2E]/40 rounded-xl overflow-hidden w-full mb-6">
                    <div className="bg-gradient-to-r from-[#00CFFF]/10 to-transparent p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Award className="h-6 w-6 text-[#00E0FF]" />
                        <h3 className="text-xl font-semibold text-[#F5F7FA]">Reward</h3>
                      </div>
                      <p className="text-[#8C9BA8] mb-5 leading-relaxed">
                        {isPassing
                          ? `Congratulations! You've earned the ${quest.nftReward}.`
                          : "Unfortunately, you didn't qualify for the NFT reward."}
                      </p>
                      {isPassing && (
                        <Button 
                          onClick={handleMintNFT}
                          disabled={isMintingNFT || mintingSuccess}
                          className="bg-gradient-to-r from-[#00CFFF] to-[#00E0FF] hover:from-[#00E0FF] hover:to-[#00CFFF] text-[#0B0E17] font-medium w-full py-2.5 rounded-xl shadow-[0_0_15px_rgba(0,207,255,0.2)] hover:shadow-[0_0_20px_rgba(0,224,255,0.3)] transition-all duration-300 animate-glow disabled:opacity-70"
                        >
                          {isMintingNFT ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0B0E17]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Minting...
                            </span>
                          ) : mintingSuccess ? (
                            <span className="flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              NFT Minted!
                            </span>
                          ) : (
                            "Mint Your NFT"
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pt-2 pb-6 px-6">
                <Button
                  variant="outline"
                  className="border-[#15847D]/30 text-[#8C9BA8] hover:text-[#F5F7FA] hover:border-[#00E0FF]/50 hover:bg-[#00E0FF]/5 transition-all duration-200 rounded-xl px-6"
                  onClick={() => router.push("/quests")}
                >
                  Back to Quests
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
      {
      (() => {
          return (
            mintModal && (
              <NFTSuccessModal
                isOpen={mintModal}
                onClose={() => setMintModal(false)}
                onExplore={() => {
                  setMintModal(false)
                  window.open(`https://educhain.blockscout.com/tx/${mintData.transactionHash}`, '_blank'); 
                }}
                nftData={mintData}
              />
            )
          )
        })()
      }
  </div>
  )
}


