import type { Metadata } from "next";
import { Cairo, Noto_Naskh_Arabic } from "next/font/google";

import "@/app/globals.css";

import { SiteChrome } from "@/components/layout/site-chrome";
import { getPublicSiteSettings } from "@/lib/settings";
import { siteConfig } from "@/lib/site";

const display = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const sans = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${settings.brandName} | حلويات مغربية فاخرة`,
      template: `%s | ${settings.brandName}`
    },
    description: settings.description,
    keywords: [...siteConfig.keywords],
    openGraph: {
      title: settings.brandName,
      description: settings.description,
      url: siteConfig.url,
      siteName: settings.brandName,
      locale: "ar_MA",
      type: "website",
      images: [
        {
          url: "/brand/og-image.svg",
          width: 1200,
          height: 630,
          alt: settings.brandName
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: settings.brandName,
      description: settings.description,
      images: ["/brand/og-image.svg"]
    }
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getPublicSiteSettings();

  return (
    <html lang="ar" dir="rtl">
      <body className={`${display.variable} ${sans.variable}`}>
        <div className="min-h-screen">
          <SiteChrome settings={settings}>{children}</SiteChrome>
        </div>
      </body>
    </html>
  );
}
