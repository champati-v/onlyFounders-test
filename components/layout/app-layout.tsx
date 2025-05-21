"use client";

import { API_URL } from '@/lib/config';
import { type ReactNode, useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Footer } from "@/components/footer";
import {
  BookOpen,
  Building,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Shield,
  Store,
  Trophy,
  Users,
  Wallet,
  Info,
  CircleUserIcon,
} from "lucide-react";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi"
import axios from "axios";
import { useToast } from "../ui/use-toast";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import LoginButton from "../ocidLogin-button";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { TbDashboard } from 'react-icons/tb';

interface AppLayoutProps {
  children: ReactNode;
  showHero?: boolean;
  className: string;
}

export function AppLayout({
  className,
  children,
  showHero = false,
}: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const requestSent = useRef(false);
  const { user, isLoading } = useUser();
  const { address, isConnected } = useAccount();
  const [onboardingStatus, setOnboardingStatus] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  //ocid button
  const { isInitialized, authState, ocAuth } = useOCAuth();

  // Add a loading state
  if (!isInitialized) {
    return;
  }

  if (authState.error) {
    return <div>Error: {authState.error.message}</div>;
  }

  // Add the profile navigation handler
  const handleProfileNavigation = async () => {
    if (!user) return;

    try {
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
      setRole(data.role);

      // Route based on profile status
      if (data.role === "Investor") {
        router.push("/profile-page/investor");
      } else if (data.role === "Founder") {
        router.push("/profile-page/founder");
      } else if (data.role === "ServiceProvider") {
        router.push("/profile-page/service-provider");
      }
    } catch (error) {
      console.error("Error checking profile status:", error);
      // Default to profile page on error
      router.push("/profile");
    } finally {
      setIsProfileLoading(false);
    }
  };

  // Set auth ready state once loading is complete
  useEffect(() => {
    if (!isLoading) {
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setAuthReady(true);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  //sending wallet address to the backend after user connected wallet.
  useEffect(() => {
    const sendWalletAddress = async () => {
      if (user && isConnected && address) {
        try {
          const userID = user.sub?.substring(14);

          const response = await axios.post(
            `${API_URL}/api/profile/add-walletAddress`,
            { walletAddress: address },
            {
              headers: {
                "Content-Type": "application/json",
                user_id: userID,
              },
            }
          );

          console.log("Address sent successfully", response.data);
        } catch (error) {
          console.error("Error sending address:", error);
        }
      }
    };

    sendWalletAddress();
  }, [user, isConnected, address]);

  //sending user data to the backend after user registered.
  useEffect(() => {
    if (!isLoading && user && !isSent && !requestSent.current) {
      requestSent.current = true;

      const sendUserData = async () => {
        try {
          const trimmedUserId = user.sub?.substring(14);
          if (!trimmedUserId || !user.email) {
            console.error("Invalid user data, skipping API call.");
            return;
          }

          setIsSent(true);

          const response = await fetch(
            `${API_URL}/api/auth/register-user`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userInput: {
                  username: user.given_name || "Unknown User",
                  email: user.email,
                  user_id: trimmedUserId,
                  walletAddress: " ",
                },
              }),
            }
          );

          if (response.ok) {
            console.log("✅ User data sent successfully!");
          } else {
            console.error(
              "❌ Failed to send user data. Status:",
              response.status
            );
            const errorData = await response.json().catch(() => null);
            console.error(
              "Error details:",
              errorData || "No error message from server"
            );
          }
        } catch (error) {
          console.error("❌ Error sending user data:", error);
        }
      };

      sendUserData();
    }
  }, [user, isLoading, isSent]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      
            const data = await response.json();
            setRole(data.role);

          } catch (error) {
            console.error("Error checking profile status:", error);
          } finally {
            setIsProfileLoading(false);
          }
        };
      
        getOnboardingStatus();
      }, [user, isLoading, router]);

  const mainNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/marketplace", label: "Marketplace", icon: Store },
    { href: "/campaign/campaigns", label: "Campaigns", icon: HiOutlineSpeakerphone },
    { href: "/network", label: "Network", icon: Users },
    { href: "/resources", label: "Resources", icon: BookOpen },
    { href: "/quests", label: "Quests", icon: Trophy },
  ];

  const dashboardNavItems = [
    { href: "/", label: "Investor Dashboard", icon: Wallet },
    { href: "/", label: "Founder Dashboard", icon: Building },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // Render auth-related UI elements based on loading state
  const renderAuthUI = () => {
    // If auth is still loading, show skeleton placeholders
    if (!authReady) {
      return (
        <>
          <Skeleton className="hidden md:block h-9 w-36 rounded-md" />
        </>
      );
    }

    // Auth is ready, show the appropriate UI based on user state
    return (
      <>
        <div className="hidden md:flex items-center gap-2">
        {user ? (
          <ConnectButton.Custom>
          {({ account, openConnectModal, openAccountModal, mounted }) => {
            const connected = mounted && account;
            return (
              <button
                onClick={
                  connected ? openAccountModal : openConnectModal
                }
                className="flex items-center justify-center rounded-md w-full bg-gradient-to-r px-2 py-1.5 from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Wallet className="mr-2 h-4 w-4" />
                <span className="block md:hidden">
                  {connected
                    ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
                    : "Connect"}
                </span>
                <span className="hidden md:block">
                  {connected
                    ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
                    : "Connect Wallet"}
                </span>
              </button>
            );
          }}
        </ConnectButton.Custom>
        ) : null}
        
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-white rounded-full h-10 w-10"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={(user as any).picture} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800 text-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => router.push('/profile-page/combined')}
                >
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    Profile
                    {isProfileLoading && (
                      <span className="ml-2 animate-spin">⟳</span>
                    )}
                  </div>
                </DropdownMenuItem>

              {role.includes('Founder') && (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => router.push('/founder-dashboard')}
                >
                 <div className="flex items-center">
                    <TbDashboard className="mr-2 h-4 w-4" />
                    Founder Dashboard
                  </div> 
                </DropdownMenuItem>
              )}

                {role.includes('Investor') && (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => router.push('/investor-dashboard')}
                >
                 <div className="flex items-center">
                    <TbDashboard className="mr-2 h-4 w-4" />
                    Investor Dashboard
                  </div> 
                </DropdownMenuItem>
              )}

                <a href="/api/auth/logout">
                  <DropdownMenuItem className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <a href="/api/auth/login">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  variant="outline"
                >
                  Login
                </Button>
              </a>
              {/* <a href="/early-access">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                variant="outline"
              >
               Early Access
              </Button>
            </a> */}
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-gray-800 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80",
          scrolled
            ? "bg-gray-900/95"
            : pathname === "/" && !scrolled
            ? "bg-transparent border-transparent"
            : "bg-gray-900/95"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4 md:gap-4">
            <Link href="/" className="flex items-center space-x-2 pr-5">
              <Image
                src="/onlyFounder_logo.svg"
                alt="OnlyFouders Logo"
                width={160}
                height={60}
                className="rounded-md"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {/* {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-primary",
                    isActive(item.href) ? "text-white" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))} */}

              <NavigationMenu>
                <NavigationMenuList className="flex gap-2">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                      Marketplace
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                        <span className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-indigo-500/50 to-purple-500/50 p-6 no-underline outline-none focus:shadow-md"
                              href="/marketplace"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium text-white">
                                Startup Bazaar
                              </div>
                              <p className="text-sm leading-tight text-white/90">
                                Where dreams are sold and wallets are emptied
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </span>
                        <a
                          href="/marketplace"
                          title="Hot Right Now"
                          className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900"
                        >
                          Startups that investors are fighting over
                        </a>
                        <a
                          href="/marketplace"
                          title="Fresh Meat"
                          className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900"
                        >
                          Newly hatched startups seeking funding
                        </a>
                        <a
                          href="/marketplace"
                          title="Categories"
                          className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900"
                        >
                          From "Actually Useful" to "Pure Speculation"
                        </a>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink className="bg-transparent" asChild>
                      <a
                        href="/campaign/campaigns"
                        className="py-2.5 px-3 text-[15px] rounded-md hover:cursor-pointer hover:bg-gray-800"
                      >
                        Campaigns
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <a
                          href="/resources"
                          title="Survival Guides"
                          className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900"
                        >
                          How to pitch without crying
                        </a>
                        <a
                          href="/resources"
                          title="War Stories"
                          className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900"
                        >
                          Tales from the startup trenches
                        </a>
                        <a
                          href="/resources"
                          title="Networking Parties"
                          className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900"
                        >
                          Free food and awkward conversations
                        </a>
                        <a
                          href="/resources"
                          title="Dumb Questions"
                          className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900"
                        >
                          There are no dumb questions (except these)
                        </a>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                      Network
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <a
                          href="/network"
                          title="Money People"
                          className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900"
                        >
                          They have cash, you need cash
                        </a>
                        <a
                          href="/network"
                          title="Fellow Dreamers"
                          className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900"
                        >
                          Other sleep-deprived entrepreneurs
                        </a>
                        <a
                          href="/network"
                          title="Been There, Done That"
                          className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900"
                        >
                          Learn from their expensive mistakes
                        </a>
                        <a
                          href="/network"
                          title="Useful Connections"
                          className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900"
                        >
                          People who might actually help you
                        </a>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink className="bg-transparent" asChild>
                      <a
                        href="/quests"
                        className="py-2.5 px-3 text-[15px] rounded-md hover:cursor-pointer hover:bg-gray-800"
                      >
                        Quests
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* <Link href="/quests" className="flex items-center gap-3 px-3 py-2 bg-slate-950 text-sm rounded-md">
                    Quests
                </Link> */}

                  {/* {authReady && user && (
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent">
                        Dashboards
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          <NavigationMenuLink asChild>
                            <a
                              className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900"
                              href="/"
                            >
                              Investor Dashboard
                            </a>
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <a
                              className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900"
                              href="/"
                            >
                              Founder Dashboard
                            </a>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )} */}

                  {authState.isAuthenticated ? (
                    <p>
                      Connected! {JSON.stringify(ocAuth.getAuthState())}
                    </p>
                  ) : (
                    <LoginButton />
                  )}
                </NavigationMenuList>
              </NavigationMenu>

              {/* Show skeleton for dashboards dropdown when loading */}
              {!authReady && <Skeleton className="h-9 w-28 rounded-md" />}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {renderAuthUI()}

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-white hover:bg-gray-800"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="p-0 bg-gray-900 border-gray-800 w-[280px]"
              >
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-gray-800 flex items-center">
                    <Image
                      src="/favicon.svg"
                      alt="OnlyFounders Logo"
                      width={32}
                      height={32}
                      className="rounded-md mr-2"
                    />
                    <span className="font-bold text-xl text-white">
                      OnlyFounders
                    </span>
                  </div>
                  <div className="flex-1 overflow-auto py-2">
                    <div className="grid gap-1 px-2">
                      {mainNavItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-3 text-sm rounded-md"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.label}
                        </Link>
                      ))}

                      {authState.isAuthenticated ? (
                        <p>
                          Connected!{" "}
                          {JSON.stringify(ocAuth.getAuthState())}
                        </p>
                      ) : (
                        <LoginButton />
                      )}
                    </div>

                    <Separator className="my-4 bg-gray-800" />

                    {authReady && user && (
                      <>
                        <div className="px-3 mb-2">
                          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Account
                          </h4>
                        </div>
                        <div className="grid gap-1 px-2">
                          <Button
                            className="bg-gray-800 flex items-center justify-start gap-3 px-3"
                            onClick={() => router.push("/profile-page/combined")}
                          >
                            <CircleUserIcon />
                            Profile
                          </Button>
                        </div>
                      </>
                    )}

                    <div className="grid gap-1 px-2"></div>
                  </div>

                  <div className="flex flex-col gap-3 p-4 border-t border-gray-800">
                    {!authReady ? (
                      <Skeleton className="h-10 w-full rounded-md" />
                    ) : user ? (
                      <div className="w-full">
                        <ConnectButton.Custom>
                          {({ account, openConnectModal, openAccountModal, mounted }) => {
                            const connected = mounted && account;
                            return (
                              <Button
                                onClick={
                                  connected ? openAccountModal : openConnectModal
                                }
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                              >
                                <Wallet className="mr-2 h-4 w-4" />
                                {connected
                                  ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
                                  : "Connect Wallet"}
                              </Button>
                            );
                          }}
                        </ConnectButton.Custom>
                      </div>
                    ) : (
                      <div className="grid gap-1 px-2">
                        <a href="api/auth/login">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                            Login
                          </Button>
                        </a>
                      </div>
                    )}

                    {!authReady ? (
                      <Skeleton className="h-10 w-full rounded-md" />
                    ) : user ? (
                      <a href="/api/auth/logout">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                          Logout
                        </Button>
                      </a>
                    ) : null}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
