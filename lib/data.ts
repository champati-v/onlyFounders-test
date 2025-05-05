import type { Campaign, CampaignDetail } from "./types"

// Campaign list data
export const campaignData: Campaign[] = [
  {
    id: "decentravault",
    name: "DecentraVault",
    logo: "/cyan-logo.png",
    status: "active",
    categories: [
      { name: "Seed", color: "bg-[#8b5cf6]" },
      { name: "Infrastructure", color: "bg-[#1e293b]" },
    ],
    description: "Decentralized storage solution with enhanced security and privacy",
    raised: 750000,
    goal: 1500000,
    deadline: "Apr 30, 2025",
    updated: "Mar 25, 2025",
    investors: 120,
    milestones: { completed: 2, total: 5 },
    isOwner: false,
  },
  {
    id: "metacanvas",
    name: "MetaCanvas",
    logo: "/cyan-logo.png",
    status: "active",
    categories: [
      { name: "Series A", color: "bg-[#8b5cf6]" },
      { name: "NFTs", color: "bg-[#1e293b]" },
    ],
    description: "Web3 creative platform for digital artists and collectors",
    raised: 3200000,
    goal: 5000000,
    deadline: "May 15, 2025",
    updated: "Mar 20, 2025",
    investors: 245,
    milestones: { completed: 3, total: 6 },
    isOwner: true,
  },
  {
    id: "onlyfounder-cyan",
    name: "OnlyFounder Cyan",
    logo: "/cyan-logo.png",
    status: "active",
    categories: [
      { name: "NFT", color: "bg-[#8b5cf6]" },
      { name: "Bitcoin", color: "bg-[#1e293b]" },
    ],
    description: "Bridging Knowledge and Finance through Decentralization",
    raised: 400000,
    goal: 500000,
    deadline: "Dec 31, 2025",
    updated: "Apr 10, 2025",
    investors: 80,
    milestones: { completed: 2, total: 6 },
    isOwner: true,
  },
  {
    id: "quantumledger",
    name: "QuantumLedger",
    logo: "/cyan-logo.png",
    status: "active",
    categories: [
      { name: "Seed", color: "bg-[#8b5cf6]" },
      { name: "DeFi", color: "bg-[#1e293b]" },
    ],
    description: "Next-generation blockchain with quantum-resistant cryptography",
    raised: 1200000,
    goal: 2000000,
    deadline: "Jun 15, 2025",
    updated: "Apr 5, 2025",
    investors: 175,
    milestones: { completed: 1, total: 4 },
    isOwner: false,
  },
]

// Detailed campaign data
export const campaignDetails: Record<string, CampaignDetail> = {
  decentravault: {
    ...campaignData.find((c) => c.id === "decentravault")!,
    website: "https://decentravault.io",
    whitepaper: "https://decentravault.io/whitepaper.pdf",
    github: "https://github.com/decentravault",
    discord: "https://discord.gg/decentravault",
    twitter: "https://twitter.com/decentravault",
    medium: "https://medium.com/decentravault",
    telegram: "https://t.me/decentravault",
    demoVideo: "https://www.youtube.com/watch?v=decentravault",
    metrics: {
      waitlistSignups: 2500,
      strategicPartners: 15,
      communitySize: 8500,
      monthlyActiveUsers: 1200,
      dailyActiveUsers: 350,
      transactionFrequency: 1800,
      revenue: 25000,
    },
    fundingDetails: {
      maxCap: "$1.5 Million USDC",
      minInvestment: "$5,000 USDC",
      walletAddress: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
      fullyDilutedValuation: "$15,000,000 USD",
      initialMarketCap: "$3,000,000 USD",
      vestingSummary:
        "15% of tokens unlocked at TGE. Remaining 85% vested linearly over 18 months with a 3-month cliff. Team tokens subject to 12-month lock-up period followed by 24-month linear vesting.",
      deadline: "April 30, 2025",
      daysRemaining: "35",
      dealName: "DecentraVault Seed Round",
      dealRound: "Seed Funding",
      dealStatus: "Active",
      tokenPrice: "$0.08 USD",
      tokenRatio: "12.5 tokens per USDC",
    },
    team: [
      {
        name: "Elena Rodriguez",
        role: "Founder & CEO",
        bio: "Former security engineer at Cloudflare with 10+ years of experience in distributed systems and cryptography. Elena holds a Ph.D. in Computer Science from MIT.",
        image: "/team-member-1.jpg",
        social: {
          twitter: "https://twitter.com/elenarodriguez",
          github: "https://github.com/elenarodriguez",
          linkedin: "https://linkedin.com/in/elenarodriguez",
        },
      },
      {
        name: "Marcus Chen",
        role: "CTO",
        bio: "Previously led engineering at Filecoin. Expert in distributed storage systems and blockchain technology with multiple patents in the field.",
        image: "/team-member-1.jpg",
        social: {
          twitter: "https://twitter.com/marcuschen",
          github: "https://github.com/marcuschen",
          linkedin: "https://linkedin.com/in/marcuschen",
        },
      },
      {
        name: "Sophia Williams",
        role: "Head of Product",
        bio: "Product leader with experience at Dropbox and AWS. Passionate about creating user-friendly decentralized applications.",
        image: "/team-member-1.jpg",
        social: {
          twitter: "https://twitter.com/sophiawilliams",
          github: "https://github.com/sophiawilliams",
          linkedin: "https://linkedin.com/in/sophiawilliams",
        },
      },
    ],
    tokenomics: {
      tokenName: "DecentraVault Token",
      symbol: "DVT",
      totalSupply: "100,000,000",
      tokenType: "ERC-20",
      chartImage: "/colorful-donut-chart.png",
      distribution: [
        { name: "Public Sale", percentage: 25 },
        { name: "Team & Advisors", percentage: 20 },
        { name: "Foundation", percentage: 15 },
        { name: "Ecosystem Growth", percentage: 25 },
        { name: "Strategic Partners", percentage: 10 },
        { name: "Community Rewards", percentage: 5 },
      ],
      usecases: [
        "Storage node staking and rewards",
        "Governance voting on protocol upgrades",
        "Fee discounts for storage services",
        "Access to premium features and higher storage limits",
        "Revenue sharing from network fees",
      ],
    },
    faqs: [
      {
        question: "How does DecentraVault differ from other decentralized storage solutions?",
        answer:
          "DecentraVault uses a unique combination of sharding and encryption techniques that provide superior security while maintaining high performance. Our proprietary consensus mechanism allows for faster retrieval times compared to other solutions, and our economic model ensures storage providers are fairly compensated based on reliability and performance metrics rather than just storage capacity.",
      },
      {
        question: "What types of files can be stored on DecentraVault?",
        answer:
          "DecentraVault supports all file types with no restrictions. However, we've optimized our protocol specifically for large media files, encrypted databases, and enterprise backups. Our specialized storage algorithms provide better performance for these use cases compared to general-purpose storage solutions.",
      },
      {
        question: "How does the token economics work?",
        answer:
          "The DVT token serves multiple functions in our ecosystem: (1) Storage providers stake DVT to participate in the network, with higher stakes enabling higher earning potential, (2) Users pay for storage using DVT with dynamic pricing based on network demand, (3) Token holders can participate in governance decisions, and (4) A portion of network fees is distributed to token holders who participate in governance.",
      },
      {
        question: "What security measures are in place to protect stored data?",
        answer:
          "DecentraVault employs multiple layers of security: (1) Client-side encryption ensures data is encrypted before leaving the user's device, (2) Data sharding splits files into multiple encrypted fragments stored across different nodes, (3) Zero-knowledge proofs allow for verification without revealing the data contents, (4) Regular security audits by leading firms, and (5) Bug bounty programs to incentivize responsible disclosure of vulnerabilities.",
      },
      {
        question: "What is the roadmap for DecentraVault?",
        answer:
          "Our roadmap includes: Q2 2025 - Mainnet launch with basic storage functionality; Q3 2025 - Enterprise features including access controls and compliance tools; Q4 2025 - Mobile SDK and integration with major cloud providers; Q1 2026 - Advanced features like compute-over-storage and AI-powered data analysis; Q2 2026 - Cross-chain interoperability and expanded ecosystem partnerships.",
      },
    ],
    updates: [
      {
        id: 1,
        title: "Testnet Launch Successful",
        date: "Mar 25, 2025",
        content:
          "We're excited to announce the successful launch of our testnet! Over 500 storage providers joined within the first 48 hours, contributing more than 5 PB of storage capacity. Initial performance tests show retrieval times 40% faster than our closest competitors. We've also identified and fixed several minor issues that will improve stability in our upcoming mainnet release.",
        likes: 87,
        comments: 23,
        image: "/interconnected-network.png",
      },
      {
        id: 2,
        title: "Strategic Partnership with CloudSphere",
        date: "Mar 15, 2025",
        content:
          "DecentraVault has formed a strategic partnership with CloudSphere, a leading enterprise cloud solutions provider. This collaboration will allow CloudSphere's enterprise clients to seamlessly integrate with DecentraVault for secure, decentralized backup and disaster recovery solutions. The partnership includes joint development of enterprise-grade tools and APIs specifically designed for large-scale deployments.",
        likes: 65,
        comments: 18,
      },
      {
        id: 3,
        title: "Security Audit Completed",
        date: "Mar 5, 2025",
        content:
          "We're pleased to announce that our protocol has successfully passed a comprehensive security audit conducted by BlockSecure, a leading blockchain security firm. The audit covered our smart contracts, consensus mechanism, and encryption protocols. A few minor issues were identified and have already been addressed. The full audit report is available on our GitHub repository.",
        likes: 92,
        comments: 31,
      },
    ],
    milestones: [
      {
        id: "milestone-1",
        number: 1,
        title: "Protocol Design & Whitepaper",
        description: "Comprehensive technical specification and economic model",
        dueDate: "Jan 15, 2025",
        tasks: [
          {
            id: "task-1-1",
            title: "Technical Architecture",
            description: "Design the core architecture including data sharding, encryption, and consensus mechanisms.",
            status: "completed",
          },
          {
            id: "task-1-2",
            title: "Economic Model",
            description: "Develop the token economics model with incentives for storage providers and users.",
            status: "completed",
          },
          {
            id: "task-1-3",
            title: "Whitepaper Publication",
            description: "Publish comprehensive whitepaper detailing the protocol design and economic model.",
            status: "completed",
          },
        ],
        releaseAmount: 150000,
        fundingPercentage: 10,
        progress: 100,
        status: "completed",
      },
      {
        id: "milestone-2",
        number: 2,
        title: "Testnet Development",
        description: "Implementation of core protocol and testnet deployment",
        dueDate: "Mar 1, 2025",
        tasks: [
          {
            id: "task-2-1",
            title: "Core Protocol Implementation",
            description: "Develop the core protocol based on the technical architecture.",
            status: "completed",
          },
          {
            id: "task-2-2",
            title: "Storage Provider Software",
            description: "Create software for storage providers to join and participate in the network.",
            status: "completed",
          },
          {
            id: "task-2-3",
            title: "Client SDK",
            description: "Develop SDK for users to interact with the network.",
            status: "completed",
          },
          {
            id: "task-2-4",
            title: "Testnet Deployment",
            description: "Deploy the testnet and onboard initial storage providers.",
            status: "completed",
          },
        ],
        releaseAmount: 300000,
        fundingPercentage: 20,
        progress: 100,
        status: "completed",
      },
      {
        id: "milestone-3",
        number: 3,
        title: "Security Audit & Optimizations",
        description: "Third-party security audit and performance optimizations",
        dueDate: "Apr 15, 2025",
        tasks: [
          {
            id: "task-3-1",
            title: "Security Audit",
            description: "Conduct comprehensive security audit with a reputable third-party firm.",
            status: "completed",
          },
          {
            id: "task-3-2",
            title: "Performance Optimizations",
            description: "Implement optimizations based on testnet performance data.",
            status: "review_pending",
            submissionDate: "Apr 5, 2025",
          },
          {
            id: "task-3-3",
            title: "Bug Fixes",
            description: "Address issues identified during testing and security audit.",
            status: "in-progress",
          },
        ],
        releaseAmount: 300000,
        fundingPercentage: 20,
        progress: 66,
        status: "in-progress",
      },
      {
        id: "milestone-4",
        number: 4,
        title: "Mainnet Launch",
        description: "Public launch of the production network",
        dueDate: "May 30, 2025",
        tasks: [
          {
            id: "task-4-1",
            title: "Final Protocol Implementation",
            description: "Finalize protocol implementation with all optimizations and security fixes.",
            status: "pending",
          },
          {
            id: "task-4-2",
            title: "Mainnet Deployment",
            description: "Deploy the mainnet and transition testnet providers.",
            status: "pending",
          },
          {
            id: "task-4-3",
            title: "Documentation & Guides",
            description: "Create comprehensive documentation and guides for users and providers.",
            status: "pending",
          },
        ],
        releaseAmount: 300000,
        fundingPercentage: 20,
        progress: 0,
        status: "upcoming",
      },
      {
        id: "milestone-5",
        number: 5,
        title: "Ecosystem Development",
        description: "Building the ecosystem and partnerships",
        dueDate: "Jul 30, 2025",
        tasks: [
          {
            id: "task-5-1",
            title: "Enterprise Integration Tools",
            description: "Develop tools for enterprise integration and compliance.",
            status: "pending",
          },
          {
            id: "task-5-2",
            title: "Mobile SDK",
            description: "Create SDK for mobile applications.",
            status: "pending",
          },
          {
            id: "task-5-3",
            title: "Partnership Program",
            description: "Establish formal partnership program and onboard initial partners.",
            status: "pending",
          },
          {
            id: "task-5-4",
            title: "Developer Grants",
            description: "Launch developer grants program to foster ecosystem growth.",
            status: "pending",
          },
        ],
        releaseAmount: 450000,
        fundingPercentage: 30,
        progress: 0,
        status: "upcoming",
      },
    ],
  },
  metacanvas: {
    ...campaignData.find((c) => c.id === "metacanvas")!,
    website: "https://metacanvas.art",
    whitepaper: "https://metacanvas.art/whitepaper.pdf",
    github: "https://github.com/metacanvas",
    discord: "https://discord.gg/metacanvas",
    twitter: "https://twitter.com/metacanvas",
    medium: "https://medium.com/metacanvas",
    telegram: "https://t.me/metacanvas",
    demoVideo: "https://www.youtube.com/watch?v=metacanvas",
    metrics: {
      waitlistSignups: 12000,
      strategicPartners: 25,
      communitySize: 45000,
      monthlyActiveUsers: 8500,
      dailyActiveUsers: 2200,
      transactionFrequency: 15000,
      revenue: 350000,
    },
    fundingDetails: {
      maxCap: "$5 Million USDC",
      minInvestment: "$10,000 USDC",
      walletAddress: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
      fullyDilutedValuation: "$50,000,000 USD",
      initialMarketCap: "$12,500,000 USD",
      vestingSummary:
        "20% of tokens unlocked at TGE. Remaining 80% vested linearly over 24 months with a 6-month cliff. Team tokens subject to 18-month lock-up period followed by 36-month linear vesting.",
      deadline: "May 15, 2025",
      daysRemaining: "50",
      dealName: "MetaCanvas Series A",
      dealRound: "Series A",
      dealStatus: "Active",
      tokenPrice: "$0.25 USD",
      tokenRatio: "4 tokens per USDC",
    },
    team: [
      {
        name: "Jamal Washington",
        role: "Founder & CEO",
        bio: "Former Head of Digital Art at Sotheby's with extensive experience in the NFT space. Jamal has been a pioneer in bridging traditional art with blockchain technology.",
        image: "/team-member-1.jpg",
        social: {
          twitter: "https://twitter.com/jamalwashington",
          github: "https://github.com/jamalwashington",
          linkedin: "https://linkedin.com/in/jamalwashington",
        },
      },
      {
        name: "Aiko Nakamura",
        role: "Chief Creative Officer",
        bio: "Renowned digital artist with exhibitions in major galleries worldwide. Aiko brings a unique perspective on how technology can empower artists in the digital age.",
        image: "/team-member-1.jpg",
        social: {
          twitter: "https://twitter.com/aikonakamura",
          github: "https://github.com/aikonakamura",
          linkedin: "https://linkedin.com/in/aikonakamura",
        },
      },
      {
        name: "David Patel",
        role: "CTO",
        bio: "Blockchain architect who previously built NFT platforms for major brands. David specializes in creating scalable and user-friendly blockchain applications.",
        image: "/team-member-1.jpg",
        social: {
          twitter: "https://twitter.com/davidpatel",
          github: "https://github.com/davidpatel",
          linkedin: "https://linkedin.com/in/davidpatel",
        },
      },
      {
        name: "Sarah Johnson",
        role: "Head of Business Development",
        bio: "Former executive at Christie's with deep connections in the art world. Sarah focuses on building strategic partnerships with galleries, artists, and collectors.",
        image: "/team-member-1.jpg",
        social: {
          twitter: "https://twitter.com/sarahjohnson",
          github: "https://github.com/sarahjohnson",
          linkedin: "https://linkedin.com/in/sarahjohnson",
        },
      },
    ],
    tokenomics: {
      tokenName: "MetaCanvas Token",
      symbol: "MCV",
      totalSupply: "100,000,000",
      tokenType: "ERC-20",
      chartImage: "/colorful-donut-chart.png",
      distribution: [
        { name: "Public Sale", percentage: 30 },
        { name: "Team & Advisors", percentage: 20 },
        { name: "Artist Grants", percentage: 15 },
        { name: "Platform Development", percentage: 20 },
        { name: "Strategic Partners", percentage: 10 },
        { name: "Community Rewards", percentage: 5 },
      ],
      usecases: [
        "Artist royalty payments and splits",
        "Governance voting on platform features",
        "Curation and exhibition creation",
        "Access to exclusive collections and drops",
        "Staking for premium features and lower fees",
        "Participation in artist residency programs",
      ],
    },
    faqs: [
      {
        question: "How does MetaCanvas differ from other NFT platforms?",
        answer:
          "MetaCanvas is specifically designed for serious artists and collectors, with a focus on high-quality, curated content rather than mass-market NFTs. We offer advanced tools for artists including collaborative creation, royalty splits, and exhibition curation. Our platform also provides institutional-grade provenance tracking and authentication services that meet the standards of traditional art galleries and museums.",
      },
      {
        question: "What types of digital art are supported?",
        answer:
          "MetaCanvas supports a wide range of digital art formats including static images, animations, 3D models, interactive experiences, VR/AR content, and generative art. We've developed proprietary rendering technology that ensures artworks display consistently across devices while maintaining the artist's intended experience. We also support physical art tokenization with verified authentication.",
      },
      {
        question: "How are royalties handled for artists?",
        answer:
          "Our platform enforces royalties at the protocol level, ensuring artists receive their designated percentage on all secondary sales. Artists can set custom royalty structures including splits between multiple contributors, time-based variations, and conditional royalties. We also provide tools for galleries and agents to manage artist relationships and royalty distributions in a transparent manner.",
      },
      {
        question: "What measures are in place to prevent fraud and copycats?",
        answer:
          "MetaCanvas employs a multi-layered approach to prevent fraud: (1) Identity verification for all artists on the platform, (2) AI-powered plagiarism detection that scans new uploads against existing artworks both on and off the platform, (3) Community reporting system with expert review, (4) Legal support for artists whose work has been copied, and (5) Blacklisting of wallets associated with fraudulent activity.",
      },
      {
        question: "How does the curation process work?",
        answer:
          "Our curation process combines algorithmic and human elements. New artists undergo a portfolio review by our curation board, which includes established artists and art experts. Once approved, artists can self-publish with algorithmic quality checks. The platform also features curated exhibitions by guest curators from major galleries and museums, providing additional exposure for selected artists.",
      },
    ],
    updates: [
      {
        id: 1,
        title: "Platform Beta Launch",
        date: "Mar 20, 2025",
        content:
          "We're thrilled to announce the launch of our beta platform! Over 500 selected artists have been onboarded and have already created more than 2,000 unique digital artworks. Initial feedback has been overwhelmingly positive, with artists particularly appreciating our collaborative creation tools and transparent royalty system. Collectors have praised the intuitive interface and the high quality of curated content.",
        likes: 342,
        comments: 87,
        image: "/interconnected-network.png",
      },
      {
        id: 2,
        title: "Partnership with MoMA",
        date: "Mar 10, 2025",
        content:
          "MetaCanvas has formed an exciting partnership with the Museum of Modern Art (MoMA) to create a digital extension of their physical exhibitions. This collaboration will allow MoMA to tokenize selected artworks from their collection and create immersive digital experiences that complement their physical exhibitions. The first digital exhibition is scheduled to launch in June 2025 and will feature works from emerging digital artists alongside digitized versions of classic modern art pieces.",
        likes: 521,
        comments: 124,
      },
      {
        id: 3,
        title: "Artist Residency Program",
        date: "Feb 25, 2025",
        content:
          "We're excited to announce our Artist Residency Program, which will support 10 digital artists each quarter with grants, mentorship, and technical resources. Selected artists will receive 50,000 MCV tokens, dedicated technical support for pushing creative boundaries, and promotion across our platform and partner galleries. Applications for the first cohort are now open until March 15, 2025. We encourage artists exploring innovative approaches to digital creation to apply.",
        likes: 278,
        comments: 93,
      },
      {
        id: 4,
        title: "$3.2M Raised in Private Funding Round",
        date: "Feb 10, 2025",
        content:
          "MetaCanvas has successfully raised $3.2 million in our private funding round, with participation from leading venture capital firms including Blockchain Capital, Digital Currency Group, and Animoca Brands. This funding will accelerate our platform development, expand our artist onboarding program, and strengthen our partnerships with traditional art institutions. We're grateful for the support and confidence from our investors as we build the future of digital art.",
        likes: 412,
        comments: 76,
      },
    ],
    milestones: [
      {
        id: "milestone-1",
        number: 1,
        title: "Platform Architecture & Design",
        description: "Core platform design and technical architecture",
        dueDate: "Dec 15, 2024",
        tasks: [
          {
            id: "task-1-1",
            title: "Technical Architecture",
            description: "Design the core platform architecture including smart contracts and storage solutions.",
            status: "completed",
          },
          {
            id: "task-1-2",
            title: "UX/UI Design",
            description: "Create comprehensive UX/UI design for artists, collectors, and curators.",
            status: "completed",
          },
          {
            id: "task-1-3",
            title: "Tokenomics Model",
            description: "Develop the token economics model for the platform.",
            status: "completed",
          },
        ],
        releaseAmount: 500000,
        fundingPercentage: 10,
        progress: 100,
        status: "completed",
      },
      {
        id: "milestone-2",
        number: 2,
        title: "Core Platform Development",
        description: "Implementation of core platform features",
        dueDate: "Feb 15, 2025",
        tasks: [
          {
            id: "task-2-1",
            title: "Smart Contract Development",
            description: "Develop and test smart contracts for NFT minting, royalties, and marketplace functions.",
            status: "completed",
          },
          {
            id: "task-2-2",
            title: "Frontend Implementation",
            description: "Build the user interface for artists, collectors, and curators.",
            status: "completed",
          },
          {
            id: "task-2-3",
            title: "Backend Services",
            description: "Implement backend services for metadata, search, and recommendations.",
            status: "completed",
          },
          {
            id: "task-2-4",
            title: "Integration Testing",
            description: "Conduct comprehensive integration testing of all platform components.",
            status: "completed",
          },
        ],
        releaseAmount: 1000000,
        fundingPercentage: 20,
        progress: 100,
        status: "completed",
      },
      {
        id: "milestone-3",
        number: 3,
        title: "Beta Launch & Artist Onboarding",
        description: "Limited release to selected artists and collectors",
        dueDate: "Mar 30, 2025",
        tasks: [
          {
            id: "task-3-1",
            title: "Artist Selection",
            description: "Select and onboard initial group of artists for the beta platform.",
            status: "completed",
          },
          {
            id: "task-3-2",
            title: "Beta Platform Deployment",
            description: "Deploy the beta platform and monitor performance.",
            status: "completed",
          },
          {
            id: "task-3-3",
            title: "Feedback Collection",
            description: "Collect and analyze feedback from beta users.",
            status: "completed",
          },
          {
            id: "task-3-4",
            title: "Initial Curation",
            description: "Curate the first digital exhibitions on the platform.",
            status: "review_pending",
            submissionDate: "Mar 25, 2025",
          },
        ],
        releaseAmount: 1000000,
        fundingPercentage: 20,
        progress: 75,
        status: "in-progress",
      },
      {
        id: "milestone-4",
        number: 4,
        title: "Public Launch & Marketing",
        description: "Full public launch and marketing campaign",
        dueDate: "May 15, 2025",
        tasks: [
          {
            id: "task-4-1",
            title: "Platform Optimizations",
            description: "Implement optimizations based on beta feedback.",
            status: "in-progress",
          },
          {
            id: "task-4-2",
            title: "Marketing Campaign",
            description: "Execute comprehensive marketing campaign for public launch.",
            status: "pending",
          },
          {
            id: "task-4-3",
            title: "Public Launch Event",
            description: "Host virtual and physical launch events in major art centers.",
            status: "pending",
          },
          {
            id: "task-4-4",
            title: "Press & Media Relations",
            description: "Engage with press and media to promote the platform launch.",
            status: "pending",
          },
        ],
        releaseAmount: 1000000,
        fundingPercentage: 20,
        progress: 25,
        status: "in-progress",
      },
      {
        id: "milestone-5",
        number: 5,
        title: "Institutional Partnerships",
        description: "Partnerships with galleries, museums, and art institutions",
        dueDate: "Jul 15, 2025",
        tasks: [
          {
            id: "task-5-1",
            title: "Partnership Program",
            description: "Develop formal partnership program for art institutions.",
            status: "pending",
          },
          {
            id: "task-5-2",
            title: "Integration Tools",
            description: "Create tools for institutions to integrate with the platform.",
            status: "pending",
          },
          {
            id: "task-5-3",
            title: "Institutional Onboarding",
            description: "Onboard initial group of institutional partners.",
            status: "pending",
          },
          {
            id: "task-5-4",
            title: "Joint Exhibitions",
            description: "Launch first joint exhibitions with institutional partners.",
            status: "pending",
          },
        ],
        releaseAmount: 750000,
        fundingPercentage: 15,
        progress: 0,
        status: "upcoming",
      },
      {
        id: "milestone-6",
        number: 6,
        title: "Advanced Features & Expansion",
        description: "Implementation of advanced features and international expansion",
        dueDate: "Oct 15, 2025",
        tasks: [
          {
            id: "task-6-1",
            title: "VR/AR Gallery Experience",
            description: "Develop virtual and augmented reality gallery experiences.",
            status: "pending",
          },
          {
            id: "task-6-2",
            title: "Physical-Digital Bridging",
            description: "Implement solutions for bridging physical and digital art.",
            status: "pending",
          },
          {
            id: "task-6-3",
            title: "International Expansion",
            description: "Expand platform presence to key international art markets.",
            status: "pending",
          },
          {
            id: "task-6-4",
            title: "Advanced Analytics",
            description: "Develop advanced analytics for artists and collectors.",
            status: "pending",
          },
        ],
        releaseAmount: 750000,
        fundingPercentage: 15,
        progress: 0,
        status: "upcoming",
      },
    ],
  },
  "onlyfounder-cyan": {
    ...campaignData.find((c) => c.id === "onlyfounder-cyan")!,
    website: "https://onlyfounder.io/cyan",
    whitepaper: "https://onlyfounder.io/cyan/whitepaper.pdf",
    github: "https://github.com/onlyfounder-cyan",
    discord: "https://discord.gg/onlyfounder-cyan",
    twitter: "https://twitter.com/onlyfounder_cyan",
    medium: "https://medium.com/onlyfounder-cyan",
    telegram: "https://t.me/onlyfounder_cyan",
    demoVideo: "https://www.youtube.com/watch?v=onlyfounder-cyan",
    metrics: {
      waitlistSignups: 50,
      strategicPartners: 40,
      communitySize: 1000,
      monthlyActiveUsers: 100,
      dailyActiveUsers: 20,
      transactionFrequency: 500,
      revenue: 50000,
    },
    fundingDetails: {
      maxCap: "$10 Million USDC",
      minInvestment: "$1,000 USDC",
      walletAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      fullyDilutedValuation: "$50,000,000 USD",
      initialMarketCap: "$5,000,000 USD",
      vestingSummary:
        "10% of tokens unlocked at TGE (Token Generation Event). Remaining 90% vested linearly over 24 months with a 6-month cliff. Team tokens subject to 12-month lock-up period followed by 36-month linear vesting. Advisor tokens vested over 24 months with 3-month cliff.",
      deadline: "December 31, 2025",
      daysRemaining: "68",
      dealName: "Cyan Launch",
      dealRound: "Seed Funding",
      dealStatus: "Public Beta",
      tokenPrice: "$0.05 USD",
      tokenRatio: "20 tokens per USDC",
    },
    team: [
      {
        name: "Aeshna Jain",
        role: "Founder and CTO",
        bio: "Former blockchain architect at Ethereum Foundation with expertise in smart contract development and tokenomics. Aeshna has been working in the crypto space since 2016 and has contributed to several major protocols.",
        image: "/team-member-1.jpg",
        social: {
          twitter: "https://twitter.com/aeshnajain",
          github: "https://github.com/aeshnajain",
          linkedin: "https://linkedin.com/in/aeshnajain",
        },
      },
      {
        name: "Michael Thompson",
        role: "CEO",
        bio: "Serial entrepreneur with two successful fintech exits. Michael brings extensive experience in scaling startups and navigating regulatory challenges in the financial sector.",
        image: "/team-member-1.jpg",
        social: {
          twitter: "https://twitter.com/michaelthompson",
          github: "https://github.com/michaelthompson",
          linkedin: "https://linkedin.com/in/michaelthompson",
        },
      },
      {
        name: "Sophia Chen",
        role: "Head of Product",
        bio: "Former product lead at Coinbase with deep understanding of crypto user experience. Sophia specializes in making complex blockchain applications accessible to mainstream users.",
        image: "/team-member-1.jpg",
        social: {
          twitter: "https://twitter.com/sophiachen",
          github: "https://github.com/sophiachen",
          linkedin: "https://linkedin.com/in/sophiachen",
        },
      },
      {
        name: "Daniel Kwon",
        role: "Head of Business Development",
        bio: "Previously led strategic partnerships at Binance. Daniel has extensive connections in the crypto industry and a track record of securing high-value partnerships.",
        image: "/team-member-1.jpg",
        social: {
          twitter: "https://twitter.com/danielkwon",
          github: "https://github.com/danielkwon",
          linkedin: "https://linkedin.com/in/danielkwon",
        },
      },
    ],
    tokenomics: {
      tokenName: "BGTToken",
      symbol: "BGRT",
      totalSupply: "50",
      tokenType: "ERC-20",
      chartImage: "/colorful-donut-chart.png",
      distribution: [
        { name: "Public Sale", percentage: 30 },
        { name: "Team & Advisors", percentage: 20 },
        { name: "Foundation", percentage: 20 },
        { name: "Ecosystem Growth", percentage: 30 },
        { name: "Strategic Partners", percentage: 30 },
        { name: "Others", percentage: 5 },
      ],
      usecases: [
        "Governance rights for protocol decisions",
        "Fee discounts for transactions",
        "Staking rewards and yield farming",
        "Access to premium features",
        "Revenue sharing for token holders",
      ],
    },
    faqs: [
      {
        question: "What is OnlyFounder Cyan?",
        answer:
          "OnlyFounder Cyan is a decentralized platform that bridges knowledge and finance through blockchain technology. Our project aims to democratize access to financial opportunities while providing transparent and secure transactions for all participants in the ecosystem.",
      },
      {
        question: "How can I participate in the token sale?",
        answer:
          "To participate in the token sale, you need to complete KYC verification through our platform and have a compatible wallet (supporting ERC-20 tokens). Once verified, you can contribute USDC or ETH to the fundraising wallet address. The minimum investment is $1,000 USDC, and tokens will be distributed according to the vesting schedule after the sale concludes.",
      },
      {
        question: "What utility does the BGRT token provide?",
        answer:
          "The BGRT token serves multiple functions within our ecosystem: (1) Governance rights for protocol decisions, (2) Fee discounts for transactions, (3) Staking rewards and yield farming opportunities, (4) Access to premium features and services, and (5) Revenue sharing for token holders. The token is designed to align incentives between users, developers, and investors.",
      },
      {
        question: "What is the vesting schedule for tokens?",
        answer:
          "10% of tokens are unlocked at the Token Generation Event (TGE). The remaining 90% vest linearly over 24 months with a 6-month cliff. Team tokens are subject to a 12-month lock-up period followed by 36-month linear vesting. Advisor tokens vest over 24 months with a 3-month cliff. This vesting schedule is designed to ensure long-term commitment from all stakeholders.",
      },
      {
        question: "How is the project addressing security concerns?",
        answer:
          "Security is our top priority. We've implemented multiple layers of protection: (1) Smart contract audits by leading security firms, (2) Bug bounty programs to incentivize responsible disclosure, (3) Multi-signature wallets for treasury management, (4) Regular security assessments and penetration testing, and (5) Gradual rollout of features to minimize risk. Additionally, we maintain significant insurance coverage to protect against potential exploits.",
      },
    ],
    updates: [
      {
        id: 1,
        title: "Project Launch Announcement",
        date: "Apr 10, 2025",
        content:
          "We're excited to announce the official launch of OnlyFounder Cyan! After months of development, we're ready to share our vision with the world. Our platform aims to bridge knowledge and finance through decentralization, creating new opportunities for founders and investors alike.",
        likes: 24,
        comments: 8,
        image: "/cyan-circuitry.png",
      },
      {
        id: 2,
        title: "First Milestone Completed",
        date: "Apr 15, 2025",
        content:
          "We're proud to announce that we've completed our first milestone ahead of schedule! The team has successfully validated our problem-solution fit through extensive customer interviews and market research. We've collected over 250 wallet addresses from interested users, demonstrating strong early interest in our platform.",
        likes: 42,
        comments: 15,
      },
    ],
    milestones: [
      {
        id: "milestone-1",
        number: 1,
        title: "Problem-Solution Validation",
        description: "Proving you've identified a real problem worth solving",
        dueDate: "Apr 15, 2025",
        tasks: [
          {
            id: "task-1-1",
            title: "Customer Discovery",
            description:
              "Complete and document at least 25 interviews with potential users in your target market. These interviews should validate the problem exists and is painful enough that people would pay for a solution.",
            status: "completed",
          },
          {
            id: "task-1-2",
            title: "Problem Statement Whitepaper",
            description:
              "Create a comprehensive document (at least 10 pages) that clearly defines the problem, analyzes the market size (TAM/SAM/SOM), and outlines your solution approach.",
            status: "rejected",
            rejectionReason:
              "The whitepaper lacks sufficient market analysis. Please include more detailed TAM/SAM/SOM calculations and competitive landscape analysis.",
            submissionCount: 1,
          },
          {
            id: "task-1-3",
            title: "Community Interest",
            description:
              "Demonstrate early interest by collecting at least 250 wallet addresses from potential users through your interest collection smart contract.",
            status: "review_pending",
            submissionDate: "Apr 15, 2025",
          },
        ],
        releaseAmount: 83333,
        fundingPercentage: 17,
        progress: 33,
        status: "in-progress",
      },
      {
        id: "milestone-2",
        number: 2,
        title: "MVP Development",
        description: "Building and testing the first version of your product",
        dueDate: "May 30, 2025",
        tasks: [
          {
            id: "task-2-1",
            title: "Technical Architecture",
            description:
              "Develop and document the technical architecture, including system diagrams, data models, and API specifications.",
            status: "completed",
          },
          {
            id: "task-2-2",
            title: "Core Functionality",
            description:
              "Implement the core functionality of your product, focusing on the key features that solve the identified problem.",
            status: "rejected",
            rejectionReason:
              "The implementation is missing key security features. Please address the vulnerabilities identified in the security review and resubmit with proper authentication and authorization mechanisms.",
            submissionCount: 2,
          },
          {
            id: "task-2-3",
            title: "Internal Testing",
            description: "Complete internal testing of the MVP, documenting bugs, issues, and areas for improvement.",
            status: "review_pending",
            submissionDate: "Apr 17, 2025",
          },
          {
            id: "task-2-4",
            title: "Security Audit",
            description:
              "Conduct a preliminary security audit of your codebase and infrastructure, addressing any critical vulnerabilities.",
            status: "pending",
          },
        ],
        releaseAmount: 83333,
        fundingPercentage: 17,
        progress: 25,
        status: "in-progress",
      },
      {
        id: "milestone-3",
        number: 3,
        title: "Beta Launch",
        description: "Releasing your product to a limited audience for feedback",
        dueDate: "Jul 15, 2025",
        tasks: [
          {
            id: "task-3-1",
            title: "Beta User Recruitment",
            description:
              "Recruit at least 50 beta users who match your target customer profile and are willing to provide detailed feedback.",
            status: "pending",
          },
          {
            id: "task-3-2",
            title: "User Onboarding Process",
            description:
              "Develop and implement a user onboarding process that guides new users through your product's key features.",
            status: "pending",
          },
          {
            id: "task-3-3",
            title: "Feedback Collection System",
            description:
              "Create a system for collecting, organizing, and prioritizing user feedback during the beta phase.",
            status: "pending",
          },
        ],
        releaseAmount: 83333,
        fundingPercentage: 17,
        progress: 0,
        status: "upcoming",
      },
      {
        id: "milestone-4",
        number: 4,
        title: "Market Validation",
        description: "Proving market demand through user metrics and feedback",
        dueDate: "Sep 15, 2025",
        tasks: [
          {
            id: "task-4-1",
            title: "User Engagement Metrics",
            description:
              "Demonstrate user engagement with key metrics such as daily active users, session duration, and feature usage.",
            status: "pending",
          },
          {
            id: "task-4-2",
            title: "User Feedback Analysis",
            description:
              "Analyze and document user feedback, identifying patterns, pain points, and opportunities for improvement.",
            status: "pending",
          },
          {
            id: "task-4-3",
            title: "Product Iteration",
            description:
              "Implement at least three significant product improvements based on user feedback and usage data.",
            status: "pending",
          },
        ],
        releaseAmount: 83333,
        fundingPercentage: 17,
        progress: 0,
        status: "upcoming",
      },
      {
        id: "milestone-5",
        number: 5,
        title: "Public Launch",
        description: "Officially launching your product to the public",
        dueDate: "Nov 15, 2025",
        tasks: [
          {
            id: "task-5-1",
            title: "Marketing Campaign",
            description:
              "Develop and execute a comprehensive marketing campaign to announce your public launch, including content, social media, and community engagement.",
            status: "pending",
          },
          {
            id: "task-5-2",
            title: "Product Documentation",
            description:
              "Create comprehensive product documentation, including user guides, FAQs, and technical documentation.",
            status: "pending",
          },
          {
            id: "task-5-3",
            title: "Support Infrastructure",
            description:
              "Establish customer support infrastructure, including support channels, response protocols, and knowledge base.",
            status: "pending",
          },
          {
            id: "task-5-4",
            title: "Public Launch Event",
            description:
              "Host a public launch event (virtual or physical) to showcase your product and engage with your community.",
            status: "pending",
          },
        ],
        releaseAmount: 83333,
        fundingPercentage: 17,
        progress: 0,
        status: "upcoming",
      },
      {
        id: "milestone-6",
        number: 6,
        title: "Growth & Scaling",
        description: "Expanding your user base and improving your product",
        dueDate: "Dec 31, 2025",
        tasks: [
          {
            id: "task-6-1",
            title: "User Acquisition Strategy",
            description:
              "Develop and implement a user acquisition strategy to grow your user base, with specific targets and channels.",
            status: "pending",
          },
          {
            id: "task-6-2",
            title: "Performance Optimization",
            description:
              "Optimize your product's performance, addressing any scalability issues, bottlenecks, or technical debt.",
            status: "pending",
          },
          {
            id: "task-6-3",
            title: "Growth Metrics",
            description:
              "Demonstrate growth with key metrics such as user acquisition rate, retention rate, and revenue (if applicable).",
            status: "pending",
          },
        ],
        releaseAmount: 83333,
        fundingPercentage: 17,
        progress: 0,
        status: "upcoming",
      },
    ],
  },
  quantumledger: {
    ...campaignData.find((c) => c.id === "quantumledger")!,
    website: "https://quantumledger.io",
    whitepaper: "https://quantumledger.io/whitepaper.pdf",
    github: "https://github.com/quantumledger",
    discord: "https://discord.gg/quantumledger",
    twitter: "https://twitter.com/quantumledger",
    medium: "https://medium.com/quantumledger",
    telegram: "https://t.me/quantumledger",
    demoVideo: "https://www.youtube.com/watch?v=quantumledger",
    metrics: {
      waitlistSignups: 7500,
      strategicPartners: 12,
      communitySize: 25000,
      monthlyActiveUsers: 0, // Pre-launch
      dailyActiveUsers: 0, // Pre-launch
      transactionFrequency: 0, // Pre-launch
      revenue: 0, // Pre-launch
    },
    fundingDetails: {
      maxCap: "$2 Million USDC",
      minInvestment: "$2,500 USDC",
      walletAddress: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
      fullyDilutedValuation: "$20,000,000 USD",
      initialMarketCap: "$4,000,000 USD",
      vestingSummary:
        "12% of tokens unlocked at TGE. Remaining 88% vested linearly over 24 months with a 3-month cliff. Team tokens subject to 12-month lock-up period followed by 24-month linear vesting.",
      deadline: "June 15, 2025",
      daysRemaining: "81",
      dealName: "QuantumLedger Seed Round",
      dealRound: "Seed Funding",
      dealStatus: "Active",
      tokenPrice: "$0.10 USD",
      tokenRatio: "10 tokens per USDC",
    },
    team: [
      {
        name: "Dr. Amara Okafor",
        role: "Founder & CEO",
        bio: "Quantum cryptography researcher with a Ph.D. from MIT. Dr. Okafor has published numerous papers on post-quantum cryptography and previously worked at IBM's quantum computing division.",
        image: "/team-member-1.jpg",
        social: {
          twitter: "https://twitter.com/amaraokafor",
          github: "https://github.com/amaraokafor",
          linkedin: "https://linkedin.com/in/amaraokafor",
        },
      },
      {
        name: "Dr. Hiroshi Tanaka",
        role: "Chief Cryptography Officer",
        bio: "Former cryptography lead at NTT Research with expertise in lattice-based cryptography. Dr. Tanaka has been working on quantum-resistant algorithms for over a decade.",
        image: "/team-member-1.jpg",
        social: {
          twitter: "https://twitter.com/hiroshitanaka",
          github: "https://github.com/hiroshitanaka",
          linkedin: "https://linkedin.com/in/hiroshitanaka",
        },
      },
      {
        name: "Robert Miller",
        role: "CTO",
        bio: "Blockchain architect who previously led development at Polkadot. Robert specializes in consensus mechanisms and cross-chain interoperability.",
        image: "/team-member-1.jpg",
        social: {
          twitter: "https://twitter.com/robertmiller",
          github: "https://github.com/robertmiller",
          linkedin: "https://linkedin.com/in/robertmiller",
        },
      },
      {
        name: "Lisa Chen",
        role: "Head of Business Development",
        bio: "Former VP of Strategic Partnerships at Chainlink. Lisa has extensive experience in building blockchain ecosystem partnerships and go-to-market strategies.",
        image: "/team-member-1.jpg",
        social: {
          twitter: "https://twitter.com/lisachen",
          github: "https://github.com/lisachen",
          linkedin: "https://linkedin.com/in/lisachen",
        },
      },
    ],
    tokenomics: {
      tokenName: "QuantumLedger Token",
      symbol: "QLT",
      totalSupply: "100,000,000",
      tokenType: "ERC-20",
      chartImage: "/colorful-donut-chart.png",
      distribution: [
        { name: "Public Sale", percentage: 20 },
        { name: "Team & Advisors", percentage: 20 },
        { name: "Foundation", percentage: 25 },
        { name: "Ecosystem Development", percentage: 20 },
        { name: "Strategic Partners", percentage: 10 },
        { name: "Research Grants", percentage: 5 },
      ],
      usecases: [
        "Staking for network security",
        "Governance voting on protocol upgrades",
        "Transaction fee payments",
        "Access to premium API services",
        "Participation in validator selection",
        "Rewards for security research contributions",
      ],
    },
    faqs: [
      {
        question: "What makes QuantumLedger quantum-resistant?",
        answer:
          "QuantumLedger employs multiple layers of quantum-resistant cryptography: (1) Lattice-based cryptography for digital signatures, which is resistant to Shor's algorithm, (2) Hash-based cryptography for message authentication, (3) Multivariate polynomial cryptography for key exchange, and (4) A hybrid approach that combines these methods to ensure security even if vulnerabilities are discovered in any single approach. Our cryptographic primitives are based on NIST's post-quantum cryptography standardization candidates.",
      },
      {
        question: "Why is quantum resistance important for blockchain?",
        answer:
          "Quantum computers pose a significant threat to current blockchain systems because they can potentially break the elliptic curve cryptography used by most blockchains today. Once sufficiently powerful quantum computers become available, they could compromise private keys, enabling the theft of funds and manipulation of transactions. By implementing quantum-resistant cryptography now, QuantumLedger ensures long-term security for digital assets and smart contracts, protecting them against future quantum computing advances.",
      },
      {
        question: "How does QuantumLedger's consensus mechanism work?",
        answer:
          "QuantumLedger uses a novel consensus mechanism called Quantum-Resistant Proof of Stake (QRPoS). This mechanism combines the energy efficiency of traditional Proof of Stake with quantum-resistant cryptographic primitives. Validators are selected based on their stake and reputation score, which factors in their historical performance and security contributions. The protocol includes a unique threshold signature scheme that requires multiple validators to collaborate for block production, enhancing security against quantum attacks on individual validators.",
      },
      {
        question: "What are the performance implications of quantum-resistant cryptography?",
        answer:
          "Quantum-resistant cryptographic algorithms typically require more computational resources than traditional cryptography. However, QuantumLedger has developed optimized implementations that minimize this overhead. Our benchmarks show that transaction processing is only 15-20% slower than comparable non-quantum-resistant blockchains, with an average block time of 3 seconds and throughput of 5,000 transactions per second. We've achieved this performance through innovative cryptographic engineering and parallel processing techniques.",
      },
      {
        question: "How will QuantumLedger ensure compatibility with existing blockchain ecosystems?",
        answer:
          "QuantumLedger is designed with interoperability as a core principle. We're implementing: (1) Cross-chain bridges with quantum-resistant security guarantees, (2) EVM compatibility layer for easy migration of existing smart contracts, (3) Standardized APIs that match industry conventions, and (4) Wrapper protocols that allow assets from other chains to be used securely within our ecosystem. Additionally, we're actively participating in cross-chain standardization efforts to ensure seamless integration with the broader blockchain landscape.",
      },
    ],
    updates: [
      {
        id: 1,
        title: "Testnet Alpha Launch",
        date: "Apr 5, 2025",
        content:
          "We're excited to announce the launch of our Alpha Testnet! This initial release includes our core quantum-resistant consensus mechanism and basic transaction functionality. Early testers can now create wallets, send transactions, and participate in the network as validators. We're particularly interested in feedback on the performance of our cryptographic implementations and the user experience of our validator software.",
        likes: 156,
        comments: 42,
        image: "/interconnected-network.png",
      },
      {
        id: 2,
        title: "Research Partnership with ETH Zurich",
        date: "Mar 20, 2025",
        content:
          "QuantumLedger has established a research partnership with the Cryptography and Security Research Group at ETH Zurich. This collaboration will focus on advancing the efficiency of post-quantum cryptographic primitives for blockchain applications. The partnership includes funding for two Ph.D. students and a joint research program that will publish all findings as open-source contributions to the field.",
        likes: 98,
        comments: 27,
      },
      {
        id: 3,
        title: "Quantum Resistance White Paper Published",
        date: "Mar 5, 2025",
        content:
          "We've published our comprehensive white paper on quantum-resistant blockchain architecture. The paper details our novel approach to combining multiple post-quantum cryptographic primitives, our Quantum-Resistant Proof of Stake consensus mechanism, and our performance optimization techniques. The white paper has been peer-reviewed by leading cryptographers and is now available on our website and arXiv.",
        likes: 203,
        comments: 56,
      },
    ],
    milestones: [
      {
        id: "milestone-1",
        number: 1,
        title: "Research & Protocol Design",
        description: "Foundational research and protocol specification",
        dueDate: "Feb 28, 2025",
        tasks: [
          {
            id: "task-1-1",
            title: "Cryptographic Primitives Research",
            description:
              "Research and select optimal quantum-resistant cryptographic primitives for the protocol, focusing on lattice-based and hash-based cryptography.",
            status: "completed",
          },
          {
            id: "task-1-2",
            title: "Consensus Mechanism Design",
            description: "Design the Quantum-Resistant Proof of Stake consensus mechanism.",
            status: "completed",
          },
          {
            id: "task-1-3",
            title: "Protocol Specification",
            description:
              "Create detailed protocol specifications including transaction format, block structure, and network architecture.",
            status: "completed",
          },
          {
            id: "task-1-4",
            title: "Security Analysis",
            description: "Conduct theoretical security analysis against quantum and classical attack vectors.",
            status: "completed",
          },
        ],
        releaseAmount: 200000,
        fundingPercentage: 10,
        progress: 100,
        status: "completed",
      },
      {
        id: "milestone-2",
        number: 2,
        title: "Core Implementation",
        description: "Implementation of core protocol components",
        dueDate: "Apr 30, 2025",
        tasks: [
          {
            id: "task-2-1",
            title: "Cryptographic Library",
            description: "Implement optimized versions of selected quantum-resistant cryptographic primitives.",
            status: "completed",
          },
          {
            id: "task-2-2",
            title: "Consensus Engine",
            description: "Develop the consensus engine implementing the Quantum-Resistant Proof of Stake mechanism.",
            status: "completed",
          },
          {
            id: "task-2-3",
            title: "Network Layer",
            description: "Implement the peer-to-peer network layer with quantum-resistant authentication.",
            status: "review_pending",
            submissionDate: "Apr 3, 2025",
          },
          {
            id: "task-2-4",
            title: "Transaction Processing",
            description: "Develop the transaction processing and validation components.",
            status: "in-progress",
          },
        ],
        releaseAmount: 400000,
        fundingPercentage: 20,
        progress: 75,
        status: "in-progress",
      },
      {
        id: "milestone-3",
        number: 3,
        title: "Testnet Beta",
        description: "Public beta testnet with enhanced functionality",
        dueDate: "Jun 30, 2025",
        tasks: [
          {
            id: "task-3-1",
            title: "Smart Contract Layer",
            description: "Implement the quantum-resistant smart contract execution environment.",
            status: "pending",
          },
          {
            id: "task-3-2",
            title: "Validator Software",
            description: "Develop user-friendly validator software for testnet participants.",
            status: "pending",
          },
          {
            id: "task-3-3",
            title: "Block Explorer",
            description: "Create a block explorer for monitoring testnet activity.",
            status: "pending",
          },
          {
            id: "task-3-4",
            title: "Developer Documentation",
            description: "Prepare comprehensive documentation for developers and validators.",
            status: "pending",
          },
        ],
        releaseAmount: 400000,
        fundingPercentage: 20,
        progress: 0,
        status: "upcoming",
      },
      {
        id: "milestone-4",
        number: 4,
        title: "Mainnet Launch",
        description: "Production network launch and ecosystem development",
        dueDate: "Oct 31, 2025",
        tasks: [
          {
            id: "task-4-1",
            title: "Security Audit",
            description: "Conduct comprehensive third-party security audits of all components.",
            status: "pending",
          },
          {
            id: "task-4-2",
            title: "Performance Optimization",
            description: "Optimize all components for production-level performance.",
            status: "pending",
          },
          {
            id: "task-4-3",
            title: "Mainnet Deployment",
            description: "Deploy the production network with initial validator set.",
            status: "pending",
          },
          {
            id: "task-4-4",
            title: "Ecosystem Development",
            description: "Launch developer grants program and partnership initiatives.",
            status: "pending",
          },
        ],
        releaseAmount: 1000000,
        fundingPercentage: 50,
        progress: 0,
        status: "upcoming",
      },
    ],
  },
}

// Helper function to get campaign details or return a default if not found
export function getCampaignDetails(id: string): CampaignDetail {
  return (
    campaignDetails[id] || {
      ...(campaignData.find((c) => c.id === id) || campaignData[0]),
      metrics: {
        waitlistSignups: 0,
        strategicPartners: 0,
        communitySize: 0,
        monthlyActiveUsers: 0,
        dailyActiveUsers: 0,
        transactionFrequency: 0,
        revenue: 0,
      },
      fundingDetails: {
        maxCap: "$0",
        minInvestment: "$0",
        walletAddress: "0x0000000000000000000000000000000000000000",
        fullyDilutedValuation: "$0",
        initialMarketCap: "$0",
        vestingSummary: "No vesting information available.",
        deadline: "Unknown",
        daysRemaining: "0",
        dealName: "Unknown",
        dealRound: "Unknown",
        dealStatus: "Unknown",
        tokenPrice: "$0",
        tokenRatio: "0 tokens per USDC",
      },
      team: [],
      tokenomics: {
        tokenName: "Unknown",
        symbol: "UNKNOWN",
        totalSupply: "0",
        tokenType: "ERC-20",
        distribution: [],
        usecases: [],
      },
      faqs: [],
      updates: [],
      milestones: [],
    }
  )
}

// Helper function to check if a campaign is owned by the current user
export function isOwnedCampaign(id: string): boolean {
  const campaign = campaignData.find((c) => c.id === id)
  return campaign?.isOwner || false
}
