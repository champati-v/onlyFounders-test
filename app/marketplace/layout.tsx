import { ReactNode } from "react";

//seo tags
import { Metadata } from "next";
import { AppLayout } from "@/components/layout/app-layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.onlyfounders.xyz/marketplace"),
  title: "OnlyFounders | Marketplace",
  description: "Explore deals. Invest. Contribute. Grow.",
  openGraph: {
    title: "Marketplace",
    description: "Explore deals. Invest. Contribute. Grow.",
    images: [
      {
        url: "https://f3ai.blob.core.windows.net/frontend-picture-storage/marketplace-seo.jpg",
        width: 1200,
        height: 630,
        alt: "OnlyFounders Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OnlyFounders | Marketplace",
    images: ["https://f3ai.blob.core.windows.net/frontend-picture-storage/marketplace-seo.jpg"],
  },
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
        {children}
    </>
  );
};

export default Layout;