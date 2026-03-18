"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { BrandMark } from "@/components/layout/brand-mark";
import { Button } from "@/components/ui/button";
import { getDictionary, getLocaleFromPathname, localePath } from "@/lib/i18n";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { SiteSettings } from "@/types/site-settings";

export function Navbar({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const dictionary = getDictionary(locale);
  const navLinks = [
    { href: localePath(locale), label: dictionary.nav.home },
    { href: localePath(locale, "/products"), label: dictionary.nav.products },
    { href: localePath(locale, "/about"), label: dictionary.nav.about },
    { href: `${localePath(locale)}#contact`, label: dictionary.nav.contact }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-brand-gold/10 bg-brand-black/78 backdrop-blur-2xl">
      <div className="shell flex min-h-24 items-center justify-between gap-4">
        <BrandMark size="sm" href={localePath(locale)} settings={settings} />
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-brand-cream/78 hover:text-brand-gold">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href={buildWhatsAppLink({ productName: "تشكيلة حلويات", number: settings.whatsappNumber })} target="_blank">
              {dictionary.nav.order}
            </Link>
          </Button>
          <details className="relative md:hidden">
            <summary className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-brand-gold/20 bg-brand-cream/10 text-brand-cream marker:hidden">
              <Menu className="h-5 w-5" />
            </summary>
            <div className="absolute left-0 mt-3 w-64 rounded-[1.5rem] border border-brand-gold/20 bg-brand-black/95 p-4 text-right shadow-card">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-sm text-brand-cream/78 hover:text-brand-gold">
                    {link.label}
                  </Link>
                ))}
                <Button asChild size="sm">
                  <Link href={buildWhatsAppLink({ productName: "تشكيلة حلويات", number: settings.whatsappNumber })} target="_blank">
                    {dictionary.nav.order}
                  </Link>
                </Button>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
