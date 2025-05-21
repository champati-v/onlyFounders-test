"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Menu,
  X,
  Check,
  ExternalLink,
  ArrowRight,
  LucideUserCheck,
  BrainCircuit,
  ChartBarStacked,
  GraduationCap,
  Network,
  Linkedin,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";


export default function AboutPage() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tokenDistribution = [
    {
      label: "Community & Ecosystem",
      percentage: 40,
      color: "#710CBE",
      gradientStart: "#710CBE",
      gradientEnd: "#710CBE",
    },
    {
      label: "Team & Advisors",
      percentage: 20,
      color: "#009638",
      gradientStart: "#009638",
      gradientEnd: "#009638",
    },
    {
      label: "Treasury",
      percentage: 20,
      color: "#D864BB",
      gradientStart: "#D864BB",
      gradientEnd: "#D864BB",
    },
    {
      label: "Education Fund",
      percentage: 10,
      color: "#0071CE",
      gradientStart: "#0071CE",
      gradientEnd: "#0071CE",
    },
    {
      label: "Seed Investors",
      percentage: 10,
      color: "#FFC843",
      gradientStart: "#FFC843",
      gradientEnd: "#FFC843",
    },
  ];

  return (
    <div className="min-h-screen bg-of-gradient text-white">
      {/* Hero Section */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#4361EE]/10 to-[#7B61FF]/10 blur-3xl opacity-70"></div>
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#4361EE]/10 to-[#7B61FF]/10 blur-3xl opacity-70"></div>
          <div className="absolute top-1/4 right-56 w-[500px] h-[500px] bg-purple-600/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-12 right-[650px] w-[500px] h-[500px] bg-blue-600/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center mb-16 reveal-animation">
            <div className="inline-block bg-gradient-to-r from-[#4361EE] to-[#7B61FF] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              The Future of Web3 Fundraising
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
              Where{" "}
              <span className="bg-gradient-to-r from-[#4361EE] to-[#7B61FF] bg-clip-text text-transparent">
                Founders
              </span>
              <br />
              Meet{" "}
              <span className="bg-gradient-to-r from-[#4361EE] to-[#7B61FF] bg-clip-text text-transparent">
                Money
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              The only permissionless web3 fundraising platform that doesn't
              suck. Connect with investors, raise funds, and build your startup.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal-animation">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                About{" "}
                <span style={{ fontFamily: "masked-hero" }} className="ml-2 text-2xl md:text-3xl text-white">Only</span>
                <span style={{ fontFamily: "masked-hero" }} className=" text-2xl md:text-3xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> Founders</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                OnlyFounders is a decentralized platform that transforms how
                founders and investors connect. We combine AI technology with
                innovative funding mechanisms to create a more fair and
                efficient fundraising process.
              </p>
              <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                Our platform puts founders back in control while giving
                investors better opportunities with reduced risk. By making both
                capital and knowledge more accessible, we're building an
                ecosystem where great ideas can thrive regardless of who you
                know or where you're from.
              </p>
            </div>

            <div className="relative reveal-animation">
              <div className="relative rounded-2xl shadow-xl overflow-hidden">
                <Image
                  src="/about.png"
                  alt="OnlyFounders Platform"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 md:py-28 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0f24] to-[#151b3b] z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 z-0">
          <div className="absolute top-20 left-[10%] w-[300px] h-[300px] rounded-full bg-[#4361EE]/10 blur-[100px]"></div>
          <div className="absolute bottom-40 right-[15%] w-[250px] h-[250px] rounded-full bg-[#7B61FF]/10 blur-[80px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#4361EE]/5 blur-[120px]"></div>
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#7B61FF 1px, transparent 1px), linear-gradient(to right, #7B61FF 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center mb-16 reveal-animation">
            <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 bg-gradient-to-r from-[#4361EE] to-[#7B61FF] backdrop-blur-sm">
              Our North Star
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Vision
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transforming the future of fundraising through innovation and
              decentralization.
            </p>
          </div>

          <div className="reveal-animation max-w-7xl mx-auto">
            {/* Main vision statement */}
            <div className="bg-gradient-to-br from-[#1a1e42]/80 to-[#141736]/80 backdrop-blur-sm p-6 md:p-6 rounded-3xl shadow-xl border border-[#4361EE]/10 mb-12 transform hover:scale-[1.01] transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <Image
                  src="/vision_logo.jpg"
                  width={250}
                  height={250}
                  alt="OnlyFounders"
                  className="rounded-lg"
                />
                <div className="w-full md:w-2/3">
                  <p className="text-gray-200 leading-relaxed text-lg md:text-xl">
                    <span className="font-masked-hero text-[#7B61FF]">
                      OnlyFounders
                    </span>{" "}
                    aims to transform the $300B+ annual venture capital market
                    by creating an infrastructure layer where founders maintain
                    control of their vision while accessing flexible capital
                    structured on their terms. We envision a funding ecosystem
                    that works for everyone.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision pillars */}
            <div className="justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  title: <>Milestone Based Funding</>,
                  description:
                    "Innovative ideas receive funding based on\nobjective metrics and achievements rather\nthan subjective pattern-matching or\npersonal connections in traditional VC.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 6V18M12 6L7 11M12 6L17 11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  color: "from-[#4361EE] to-[#7B61FF]",
                },
                {
                  title: <>Founder Control</>,
                  description:
                    "Founders maintain decision-making authority\nthroughout their company's entire lifecycle,\npreserving their vision and direction without\nundue influence from external investors.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  color: "from-[#7B2CBF] to-[#9D4EDD]",
                },
                {
                  title: <>Aligned Capital</>,
                  description:
                    "Capital deployment aligns with actual business\nneeds and growth milestones rather than\narbitrary fundraising cycles dictated by\ntraditional venture capital timelines.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 6H21M3 12H21M3 18H21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  color: "from-[#2A9D8F] to-[#1B4332]",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#1a1e42]/60 backdrop-blur-sm rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-[#252A47]/50 hover:border-[#4361EE]/30"
                >
                  <div className="p-6">
                    <div
                      className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${item.color} bg-opacity-10 text-white`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 justify-items-center ">
              {[
                {
                  title: <>Inclusive Access</>,
                  description:
                    "Investment opportunities become accessible\nto a broader pool of investors, democratizing\naccess to early-stage ventures regardless\nof network connections or capital base.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  color: "from-[#00B4D8] to-[#0096C7]",
                },
                {
                  title: <>Knowledge Sharing</>,
                  description:
                    "Education and knowledge-sharing enhance\noutcomes for all participants, creating a\ncommunity where resources and expertise\nare accessible to founders at every stage.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  color: "from-[#7F8F52] to-[#4F5D2F]",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#1a1e42]/60 backdrop-blur-sm rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-[#252A47]/50 hover:border-[#4361EE]/30"
                >
                  <div className="p-6">
                    <div
                      className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${item.color} bg-opacity-10 text-white`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16 reveal-animation">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <span className="font-masked-hero">OnlyFounders</span> is built on
              five foundational principles.
            </p>
          </div>

          {/* Olympic Rings Inspired Layout */}
          <div className="relative mx-auto max-w-6xl py-5 md:py-10">
            <div className="flex flex-col items-center">
              {/* Top Row - 3 circles with negative margin for overlap */}
              <div className="flex flex-col md:flex-row justify-center mb-0 md:mb-[-32px]">
                <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full flex flex-col items-center justify-center p-6 md:p-8     text-center mr-0 md:mr-[-32px] z-10 bg-gradient-to-b from-[#242B69]/80 to-[#242B69]/30 border border-[#4361EE]/40">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mt-[-20px] md:mt-0 mb-4 bg-gradient-to-r from-[#4361EE] to-[#7B61FF]">
                    <span className="text-white font-bold">
                      <LucideUserCheck />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Founder Autonomy</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Creators maintain control over their vision, terms, and
                    equity throughout their journey.
                  </p>
                </div>

                <div className="mt-[-30px] md:mt-0 w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full flex flex-col items-center justify-center p-6 md:p-8 text-center z-20 bg-gradient-to-b from-[#242B69]/80 to-[#242B69]/30 border border-[#4361EE]/40">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mt-[-20px] md:mt-0 mb-4 bg-gradient-to-r from-[#4361EE] to-[#7B61FF]">
                    <span className="text-white font-bold">
                      <BrainCircuit />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Intelligent Capital
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    AI-driven evaluation replaces subjective pattern matching
                    with objective assessment of potential.
                  </p>
                </div>

                <div className="mt-[-30px] md:mt-0 w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full flex flex-col items-center justify-center p-6 md:p-8 text-center ml-0 md:ml-[-32px] z-10 bg-gradient-to-b from-[#242B69]/80 to-[#242B69]/30 border border-[#4361EE]/40">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r from-[#4361EE] to-[#7B61FF]">
                    <span className="text-white font-bold">
                      <ChartBarStacked />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Dynamic Allocation</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Capital deployed incrementally based on actual needs and
                    milestone achievements for optimal growth.
                  </p>
                </div>
              </div>

              {/* Bottom Row - 2 circles with negative margin for overlap */}
              <div className="flex flex-col md:flex-row justify-center mt-0 md:mt-[-32px]">
                <div className="mt-[-20px] md:mt-0 w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full flex flex-col items-center justify-center p-6 md:p-8 text-center mr-[-2px] z-10 bg-gradient-to-b from-[#242B69]/80 to-[#242B69]/30 border border-[#4361EE]/40">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r from-[#4361EE] to-[#7B61FF]">
                    <span className="text-white font-bold">
                      <GraduationCap />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Educational Empowerment
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Knowledge-sharing and learning resources level the playing
                    field for all founders regardless of background.
                  </p>
                </div>

                <div className="mt-[-20px] md:mt-0 w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full flex flex-col items-center justify-center p-6 md:p-8 text-center ml-0 md:ml-[-32px] z-10 bg-gradient-to-b from-[#242B69]/80 to-[#242B69]/30 border border-[#4361EE]/40">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r from-[#4361EE] to-[#7B61FF]">
                    <span className="text-white font-bold">
                      <Network />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Decentralized Finance
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    DeFi principles create transparency and accessibility for
                    all participants in the ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 md:py-24 bg-[#0c0f24]">
        <div className="max-w-7xl mx-auto flex flex-col items-center px-6 md:px-8">
          <div className="text-center mb-16 reveal-animation">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're a team of Web3 natives, builders, and fundraising experts on
              a mission to transform how startups raise capital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-20 reveal-animation">
            {[
              {
                name: "Moe",
                role: "CEO/Founder",
                image: "/team/moe.png",
                bio: "Ex-TradFi, 2x Exits, Advisor & Mentor, 20+ yrs in Sports, Finance, Health, Tech, and Investments, Health & Wellness, Art Gallery.",
                id: "01",
                linkedin: "https://www.linkedin.com/in/moeiman/",
                x: "https://x.com/moeiman",
              },
              {
                name: "Rasesh",
                role: "CTO",
                image: "/team/rasesh.png",
                bio: "Co-Founded 20,000+ Dev EduFi Startup, Blockchain Protocol Engineer, AI Research Lead.",
                id: "03",
                linkedin:
                  "https://www.linkedin.com/in/rasesh-gautam-9810aa304/",
                x: "https://x.com/raseshGautam",
              },
              {
                name: "Raj",
                role: "CPO",
                image: "/team/raj.png",
                bio: "Co-Founder - DcodeBlock, UX Designer, Growth Strategist.",
                id: "02",
                linkedin: "https://www.linkedin.com/in/raj-gupta-67265a21a/",
                x: "https://x.com/Raj_Dcoder",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group relative w-full max-w-[280px] h-[550px] max-h-[700px] flex flex-col"
              >

                {/* Member Image */}
                <div className="h-[300px] w-full overflow-hidden flex items-center justify-center">
                  <div className="relative h-full w-full">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="ml-[1px] rounded-md object-cover object-top group-hover:scale-105 hover:rounded-md transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center flex-grow flex flex-col justify-between">
                  <div>
                      <p className="text-sm mb-2">{member.role}</p>
                      <h3 className="text-2xl text-purple-400 font-bold mb-2">{member.name}</h3>
                    <p className="text-sm text-white/80">{member.bio}</p>
                  </div>

                  <div className="flex items-center justify-center mt-6 space-x-4">
                    <a
                      className="h-8 w-8 flex items-center hover:bg-gray-500 rounded-full hover:text-gray-400 transition-all duration-300"
                      target="_blank"
                      href={member.linkedin}
                    >
                      <Image
                        src="/linkedin.svg"
                        width={30}
                        height={30}
                        alt="linkedIn"
                        className="ml-[1px]"
                      />
                    </a>
                    <a
                      className="h-7 w-7 flex items-center hover:bg-gray-500 rounded-full hover:text-gray-400 transition-all duration-300"
                      target="_blank"
                      href={member.x}
                    >
                      <Image 
                        src="/x.svg" 
                        width={30} 
                        height={30} 
                        alt="x.com" 
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center reveal-animation">
            <h3 className="text-3xl font-bold mb-10">Backers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-20">
              {[
                {
                  name: "Brian D Evans",
                  role: "BDE Ventures",
                  image: "/team/brian.png",
                  id: "A1",
                  linkedin: "https://www.linkedin.com/in/briandevansla/",
                  x: "https://x.com/BrianDEvans",
                },
                {
                  name: "Tamar Vanderhass",
                  role: "Harlem Holding",
                  image: "/team/tamar.png",
                  id: "A2",
                  linkedin: "https://www.linkedin.com/in/tamar-vanderhaas-b9257b2a2/",
                  x: "https://x.com/TamarVanderhaas",
                },
              ].map((advisor, index) => (
                <div
                  key={index}
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group relative w-full max-w-[280px] h-[450px] flex flex-col"
                >

                  {/* Advisor Image */}
                  <div className="h-[250px] w-full overflow-hidden flex items-center justify-center">
                    <div className="relative h-full w-full">
                      <Image
                        src={advisor.image || "/placeholder.svg"}
                        alt={advisor.name}
                        fill
                        className="rounded-md object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 text-center flex-grow flex flex-col justify-center">
                    <p className="text-purple-400 text-sm">{advisor.role}</p>
                    <h3 className="text-2xl font-bold mb-1">{advisor.name}</h3>

                    <div className="flex items-center justify-center mt-6 space-x-4">
                      <a
                        className="h-8 w-8 flex items-center hover:bg-gray-500 rounded-full hover:text-gray-400 transition-all duration-300"
                        target="_blank"
                        href={advisor.linkedin}
                      >
                         <Image
                        src="/linkedin.svg"
                        width={30}
                        height={30}
                        alt="linkedIn"
                        className="ml-[1px]"
                      />
                      </a>
                      <a
                        className="h-7 w-7 flex items-center hover:bg-gray-500 rounded-full hover:text-gray-400 transition-all duration-300"
                        target="_blank"
                        href={advisor.x}
                      >
                        <Image src="/x.svg" width={30} height={30} alt="x.com" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center reveal-animation">
            <h3 className="text-3xl font-bold mb-10">Advisors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-20">
              {[
                {
                  name: "Ravi Agarwal",
                  role: "Polygon X Privado ID",
                  image: "/team/ravi.png",
                  id: "A1",
                  linkedin: "https://www.linkedin.com/in/ravikantagrawal/",
                  x: "https://x.com/ravikantagrawal",
                },
                {
                  name: "Vijay Parwin",
                  role: "bitsCrunch",
                  image: "/team/vijay.png",
                  id: "A2",
                  linkedin: "https://www.linkedin.com/in/vijaypravin/",
                  x: "https://x.com/VijayPravinM",
                },
              ].map((advisor, index) => (
                <div
                  key={index}
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group relative w-full max-w-[280px] h-[450px] flex flex-col"
                >

                  {/* Advisor Image */}
                  <div className="h-[250px] w-full overflow-hidden flex items-center justify-center">
                    <div className="relative h-full w-full">
                      <Image
                        src={advisor.image || "/placeholder.svg"}
                        alt={advisor.name}
                        fill
                        className="ml-[1px] rounded-md object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 text-center flex-grow flex flex-col justify-center">
                    <p className="text-purple-400 text-sm">{advisor.role}</p>
                    <h3 className="text-2xl font-bold mb-1">{advisor.name}</h3>

                    <div className="flex items-center justify-center mt-6 space-x-4">
                      <a
                        className="h-8 w-8 flex items-center hover:bg-gray-500 rounded-full hover:text-gray-400 transition-all duration-300"
                        target="_blank"
                        href={advisor.linkedin}
                      >
                         <Image
                        src="/linkedin.svg"
                        width={30}
                        height={30}
                        alt="linkedIn"
                        className="ml-[1px]"
                      />
                      </a>
                      <a
                        className="h-7 w-7 flex items-center hover:bg-gray-500 rounded-full hover:text-gray-400 transition-all duration-300"
                        target="_blank"
                        href={advisor.x}
                      >
                        <Image src="/x.svg" width={30} height={30} alt="x.com" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16 reveal-animation">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Partners & Backers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We collaborate with industry leaders to provide the best
              fundraising experience for Web3 founders and investors.
            </p>

            <a href="/network">
            <Button className="text-[16px] mt-6 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2 rounded-md">Network</Button>
            </a>
          </div>

          <div className="reveal-animation flex items-center overflow-hidden relative w-full">
            <div className="flex animate-scroll whitespace-nowrap">
              {[
                { name: "#", img: "/partner_logo/1.svg" },
                { name: "#", img: "/partner_logo/2.svg" },
                { name: "#", img: "/partner_logo/3.svg" },
                { name: "#", img: "/partner_logo/4.svg" },
                { name: "#", img: "/partner_logo/5.svg" },
                { name: "#", img: "/partner_logo/6.svg" },
                { name: "#", img: "/partner_logo/7.svg" },
                { name: "#", img: "/partner_logo/8.svg" },
                { name: "#", img: "/partner_logo/9.svg" },
                { name: "#", img: "/partner_logo/10.svg" },
                { name: "#", img: "/partner_logo/11.svg" },
                { name: "#", img: "/partner_logo/12.svg" },
                { name: "#", img: "/partner_logo/13.svg" },
                { name: "#", img: "/partner_logo/14.svg" },
                { name: "#", img: "/partner_logo/15.svg" },
                { name: "#", img: "/partner_logo/16.svg" },
                { name: "#", img: "/partner_logo/17.svg" },
                { name: "#", img: "/partner_logo/18.svg" },
                { name: "#", img: "/partner_logo/19.svg" },
                { name: "#", img: "/partner_logo/20.svg" },
                { name: "#", img: "/partner_logo/21.svg" },
                { name: "#", img: "/partner_logo/22.svg" },
                { name: "#", img: "/partner_logo/23.svg" },
                { name: "#", img: "/partner_logo/24.svg" },
                { name: "#", img: "/partner_logo/25.svg" },
                { name: "#", img: "/partner_logo/26.svg" },
                { name: "#", img: "/partner_logo/27.svg" },
                { name: "#", img: "/partner_logo/28.svg" },
                { name: "#", img: "/partner_logo/29.svg" },
                { name: "#", img: "/partner_logo/30.svg" },
                { name: "#", img: "/partner_logo/31.svg" },
                { name: "#", img: "/partner_logo/32.svg" },
                { name: "#", img: "/partner_logo/33.svg" },
                { name: "#", img: "/partner_logo/34.svg" },
                { name: "#", img: "/partner_logo/35.svg" },
                { name: "#", img: "/partner_logo/36.svg" },
                { name: "#", img: "/partner_logo/37.svg" },
                { name: "#", img: "/partner_logo/38.svg" },
                { name: "#", img: "/partner_logo/39.svg" },
                { name: "#", img: "/partner_logo/40.svg" },
                { name: "#", img: "/partner_logo/41.svg" },
                { name: "#", img: "/partner_logo/42.svg" },
                { name: "#", img: "/partner_logo/43.svg" },
                { name: "#", img: "/partner_logo/44.svg" },
                { name: "#", img: "/partner_logo/45.svg" },
                { name: "#", img: "/partner_logo/46.svg" },
                { name: "#", img: "/partner_logo/47.svg" },
                { name: "#", img: "/partner_logo/48.svg" },
                { name: "#", img: "/partner_logo/49.svg" },
                { name: "#", img: "/partner_logo/50.svg" },
                { name: "#", img: "/partner_logo/51.svg" },
                { name: "#", img: "/partner_logo/52.svg" },
                { name: "#", img: "/partner_logo/53.svg" },
              ].flatMap((partner, i) => [
                <div
                  key={`partner-${i}`}
                  className="mx-4 flex-shrink-0 w-[180px] h-20 px-4 bg-[#1a1e42] rounded-xl flex items-center justify-center hover:bg-[#252A47] transition-colors"
                >
                  <div className="relative h-8 w-full">
                    <Image
                      src={partner.img}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>,
              ])}
            </div>

            {/* Duplicate for seamless infinite scroll */}
            <div
              className="flex animate-scroll whitespace-nowrap"
              aria-hidden="true"
            >
              {[
                { name: "#", img: "/partner_logo/1.svg" },
                { name: "#", img: "/partner_logo/2.svg" },
                { name: "#", img: "/partner_logo/3.svg" },
                { name: "#", img: "/partner_logo/4.svg" },
                { name: "#", img: "/partner_logo/5.svg" },
                { name: "#", img: "/partner_logo/6.svg" },
                { name: "#", img: "/partner_logo/7.svg" },
                { name: "#", img: "/partner_logo/8.svg" },
                { name: "#", img: "/partner_logo/9.svg" },
                { name: "#", img: "/partner_logo/10.svg" },
                { name: "#", img: "/partner_logo/11.svg" },
                { name: "#", img: "/partner_logo/12.svg" },
                { name: "#", img: "/partner_logo/13.svg" },
                { name: "#", img: "/partner_logo/14.svg" },
                { name: "#", img: "/partner_logo/15.svg" },
                { name: "#", img: "/partner_logo/16.svg" },
                { name: "#", img: "/partner_logo/17.svg" },
                { name: "#", img: "/partner_logo/18.svg" },
                { name: "#", img: "/partner_logo/19.svg" },
                { name: "#", img: "/partner_logo/20.svg" },
                { name: "#", img: "/partner_logo/21.svg" },
                { name: "#", img: "/partner_logo/22.svg" },
                { name: "#", img: "/partner_logo/23.svg" },
                { name: "#", img: "/partner_logo/24.svg" },
                { name: "#", img: "/partner_logo/25.svg" },
                { name: "#", img: "/partner_logo/26.svg" },
                { name: "#", img: "/partner_logo/27.svg" },
                { name: "#", img: "/partner_logo/28.svg" },
                { name: "#", img: "/partner_logo/29.svg" },
                { name: "#", img: "/partner_logo/30.svg" },
                { name: "#", img: "/partner_logo/31.svg" },
                { name: "#", img: "/partner_logo/32.svg" },
                { name: "#", img: "/partner_logo/33.svg" },
                { name: "#", img: "/partner_logo/34.svg" },
                { name: "#", img: "/partner_logo/35.svg" },
                { name: "#", img: "/partner_logo/36.svg" },
                { name: "#", img: "/partner_logo/37.svg" },
                { name: "#", img: "/partner_logo/38.svg" },
                { name: "#", img: "/partner_logo/39.svg" },
                { name: "#", img: "/partner_logo/40.svg" },
                { name: "#", img: "/partner_logo/41.svg" },
                { name: "#", img: "/partner_logo/42.svg" },
                { name: "#", img: "/partner_logo/43.svg" },
                { name: "#", img: "/partner_logo/44.svg" },
                { name: "#", img: "/partner_logo/45.svg" },
                { name: "#", img: "/partner_logo/46.svg" },
                { name: "#", img: "/partner_logo/47.svg" },
                { name: "#", img: "/partner_logo/48.svg" },
                { name: "#", img: "/partner_logo/49.svg" },
                { name: "#", img: "/partner_logo/50.svg" },
                { name: "#", img: "/partner_logo/51.svg" },
                { name: "#", img: "/partner_logo/52.svg" },
                { name: "#", img: "/partner_logo/53.svg" },
              ].map((partner, i) => (
                <div
                  key={`partner-duplicate-${i}`}
                  className="mx-4 flex-shrink-0 w-[180px] h-20 px-4 bg-[#1a1e42] rounded-xl flex items-center justify-center hover:bg-[#252A47] transition-colors"
                >
                  <div className="relative h-8 w-full">
                    <Image
                      src={partner.img}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        .animate-scroll {
          animation: scroll 50s linear infinite;
        }
      `}</style>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 md:py-24 bg-[#0c0f24]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16 reveal-animation">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Roadmap</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our strategic plan to revolutionize Web3 fundraising and build the
              future of startup financing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 reveal-animation">
            {[
              {
                phase: "Alpha",
                date: "Q2 2025",
                items: [
                  "Limited access testing.",
                  "Core platform & UI development.",
                  "Basic AI evaluation system.",
                ],
              },
              {
                phase: "Beta",
                date: "Q3 2025",
                items: [
                  "Enhanced AI capabilities.",
                  "Expanded educational resources.",
                  "Early adopter onboarding.",
                ],
              },
              {
                phase: "Launch",
                date: "Q4 2025",
                items: [
                  "Investor dashboard.",
                  "Milestone-based funding system.",
                  "Smart contract audit system.",
                ],
              },
              {
                phase: "Expansion",
                date: "Q1-Q2 2026",
                items: [
                  "Secondary market beta.",
                  "Tokenized equity framework.",
                  "Advanced mentorship network.",
                ],
              },
              {
                phase: "Maturity",
                date: "Q3 2026+",
                items: [
                  "Multi-chain integration.",
                  "Institutional partnerships.",
                  "Global regulatory compliance.",
                ],
              },
            ].map((stage, index) => (
              <div
                key={index}
                className="bg-[#141736] p-6 rounded-lg border border-[#252A47]/30 flex flex-col h-full hover:border-[#4361EE]/30 transition-colors"
              >
                <div className="mb-4">
                  <p className="text-gray-400 text-sm">{stage.date}</p>
                  <h3 className="text-[#7B61FF] text-2xl font-bold">
                    {stage.phase}
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-300 flex-grow">
                  {stage.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7B61FF] mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16 reveal-animation">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Token Economy
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The token ($FUND) serves as the utility token powering the{" "}
              <span className="font-masked-hero">OnlyFounders</span> ecosystem.
            </p>
          </div>

          {/* Token Overview */}
          <div className="grid md:grid-cols-2 gap-6 mb-16 reveal-animation">
            <div className="bg-[#1a1e42] p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between">
              <h3 className="text-xl font-bold mb-2">Token Standard</h3>
              <p className="text-3xl text-[#7B61FF]">TBD</p>
            </div>
            <div className="bg-[#1a1e42] p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between">
              <h3 className="text-xl font-bold mb-2">Total Supply</h3>
              <p className="text-3xl text-[#7B61FF]">1,000,000,000</p>
            </div>
          </div>

          {/* Token Allocation - Modernized Chart */}
          {/* Token Allocation - Donut Chart */}

          <div className="mb-20 reveal-animation">
            <h3 className="text-2xl font-bold mb-10 text-center">
              Token Distribution
            </h3>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <Image 
                  src="/chart.png"
                  width={450}
                  height={450}
                  alt="pie-chart"
                />
              </div>
              
              {/* Legend */}
              <div className="space-y-4">
                {tokenDistribution.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-[#1a1e42] p-4 rounded-xl shadow-md transition-all duration-300 ${
                      activeSegment === index
                        ? "transform scale-105 border border-[#4361EE]/30"
                        : ""
                    }`}
                    onMouseEnter={() => setActiveSegment(index)}
                    onMouseLeave={() => setActiveSegment(null)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div
                          className="w-6 h-6 rounded-lg mr-3 shadow-inner"
                          style={{
                            background: `linear-gradient(135deg, ${item.gradientStart}, ${item.gradientEnd})`,
                          }}
                        ></div>
                        <h4 className="font-medium">{item.label}</h4>
                      </div>
                      <span className="font-bold text-lg">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-[#252A47] rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-2.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${item.percentage}%`,
                          background: `linear-gradient(to right, ${item.gradientStart}, ${item.gradientEnd})`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Token Utility */}
          <div className="reveal-animation">
            <h3 className="text-2xl font-bold mb-10 text-center">
              Token Utility
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  title: (
                    <>
                      Educational
                      <br />
                      Access
                    </>
                  ),
                  description:
                    "Token holders gain access to exclusive educational content and resources on the platform.",
                },
                {
                  title: (
                    <>
                      Governance
                      <br />
                      Rights
                    </>
                  ),
                  description:
                    "Participate in platform governance decisions and vote on key protocol changes.",
                },
                {
                  title: (
                    <>
                      Platform
                      <br />
                      Benefits
                    </>
                  ),
                  description:
                    "Enjoy reduced fees, priority access to new features, and enhanced platform functionality.",
                },
                {
                  title: (
                    <>
                      Ecosystem
                      <br />
                      Participation
                    </>
                  ),
                  description:
                    "Engage with the broader OnlyFounders ecosystem through staking, rewards, and community initiatives.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#1a1e42] p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
                >
                  <div className="w-12 h-12 bg-[#4361EE] rounded-lg flex items-center justify-center mb-6">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-[#0f1129]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="bg-[#231B4D] rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="max-w-4xl">
              <h2 className="text-xl md:text-3xl font-bold mb-6 leading-tight">
                Join the{" "}
                <span style={{ fontFamily: "masked-hero" }} className="ml-2 text-3xl text-white">Only</span>
                <span style={{ fontFamily: "masked-hero" }} className="text-3xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> Founders</span>
                {" "}
                Community
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Whether you're a founder looking to raise funds or an investor
                seeking the next big thing, OnlyFounders has you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3A53D9] transition-colors"
                >
                  Explore Startups <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center bg-[#0f1129] text-white px-6 py-3 rounded-lg font-medium border border-[#252A47] hover:bg-[#1a1e42] transition-colors"
                >
                  Start Fundraising
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
