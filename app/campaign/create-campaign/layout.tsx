import { AppLayout } from "@/components/layout/app-layout";
import { ReactNode } from "react";

//seo tags
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.onlyfounders.xyz/resources"),
  title: "OnlyFounders | Campaigns",
  description: "Educate. Elevate. Empower.",
  openGraph: {
    title: "Campaigns",
    description: "Educate. Elevate. Empower.",
    images: [
      {
        url: "https://f3ai.blob.core.windows.net/frontend-picture-storage/resources-seo.jpg",
        width: 1200,
        height: 630,
        alt: "OnlyFounders campaigns",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OnlyFounders | Campaigns",
    images: ["https://f3ai.blob.core.windows.net/frontend-picture-storage/resources-seo.jpg"],
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