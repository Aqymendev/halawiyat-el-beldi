"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { LocaleDocument } from "@/components/layout/locale-document";
import { Navbar } from "@/components/layout/navbar";
import { defaultLocale, getDirection, getLocaleFromPathname } from "@/lib/i18n";
import type { SiteSettings } from "@/types/site-settings";

export function SiteChrome({ children, settings }: { children: ReactNode; settings: SiteSettings }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const locale = isAdminRoute ? defaultLocale : getLocaleFromPathname(pathname);
  const direction = getDirection(locale);

  if (isAdminRoute) {
    return (
      <>
        <LocaleDocument locale="en" />
        {children}
      </>
    );
  }

  return (
    <>
      <LocaleDocument locale={locale} />
      <Navbar settings={settings} />
      <main dir={direction} className="relative overflow-x-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(200,163,90,0.12),transparent_62%)]" />
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );
}
