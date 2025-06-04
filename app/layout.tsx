import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "../web3/Providers";
import "@rainbow-me/rainbowkit/styles.css";
import AuthTracking from "./MIXPanel/AuthTracking";
import {UserProvider as Auth0Provider} from "@auth0/nextjs-auth0/client";
import { UserProvider } from "../components/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import OCConnectWrapper from "../components/OCConnectWrapper";

const opts = {
  clientId: "90083ac5-8ae6-4912-8884-641a62c4880c",
  redirectUri: "https://app.onlyfounders.xyz", // Adjust this URL
  referralCode: "ONLYFOUNDERS", // Assign partner code
};

const inter = Inter({ subsets: ["latin"] });

//social Preview settings
export const metadata: Metadata = {
  metadataBase: new URL("https://www.onlyfounders.xyz"),
  title: "OnlyFounders - Web3 Fundraising Platform",
  icons: {
    icon: "https://f3ai.blob.core.windows.net/frontend-picture-storage/favicon.svg", // or relative: '/favicon.ico'
  },
  description:
    "AI-powered Web3 fundraising platform connecting innovative blockchain projects with global investors",
  openGraph: {
    title:
      "Startup capital reimagined: transparent, trustless, and for the 99%.",
    description: "Founders-first.",
    images: [
      {
        url: "/home-seo.jpg",
        width: 1200,
        height: 630,
        alt: "OnlyFounders Homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Welcome to Our OnlyFounders",
    images: ["/home-seo.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="icon"
          href="https://f3ai.blob.core.windows.net/frontend-picture-storage/favicon.svg"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-R97GNL407V"
        ></Script>
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-R97GNL407V');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Auth0Provider>
          <UserProvider>
          <AuthTracking /> {/* Tracking user login */}
          <Providers>
            <OCConnectWrapper opts={opts} sandboxMode={false}>
              {children}
            </OCConnectWrapper>
            <Analytics />
            <SpeedInsights />
            <Toaster />
          </Providers>
          </UserProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
