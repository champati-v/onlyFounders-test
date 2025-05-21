import { AppLayout } from "@/components/layout/app-layout";
import { ReactNode } from "react";

//seo tags
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.onlyfounders.xyz/about"),
  title: "OnlyFounders | About",
  description: "Team. Traction. Partners. Advisors.",
  openGraph: {
    title: "About",
    description: "Team. Traction. Partners. Advisors.",
    images: [
      {
        url: "https://f3ai.blob.core.windows.net/frontend-picture-storage/about-seo.jpg",
        width: 1200,
        height: 630,
        alt: "OnlyFounders About",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OnlyFounders | About",
    images: ["https://f3ai.blob.core.windows.net/frontend-picture-storage/about-seo.jpg"],
  },
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AppLayout className="">
        {children}
    </AppLayout>
  );
};

export default Layout;