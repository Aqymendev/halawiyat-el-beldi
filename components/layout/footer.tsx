"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandMark } from "@/components/layout/brand-mark";
import { getDictionary, getLocaleFromPathname, localePath } from "@/lib/i18n";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { SiteSettings } from "@/types/site-settings";

export function Footer({ settings }: { settings: SiteSettings }) {
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
    <footer className="border-t border-brand-gold/10 bg-brand-black/90">
      <div className="shell grid gap-10 py-12 text-right lg:grid-cols-[1.3fr_0.7fr_0.8fr]">
        <div className="space-y-4">
          <BrandMark href={localePath(locale)} settings={settings} />
          <p className="max-w-md text-sm leading-8 text-brand-cream/70">{settings.description}</p>
        </div>
        <div>
          <h3 className="text-lg">{dictionary.footer.explore}</h3>
          <div className="mt-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-brand-cream/70 hover:text-brand-gold">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg">{dictionary.footer.contact}</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-brand-cream/70">
            <Link
              href={buildWhatsAppLink({ productName: "تشكيلة حلويات", number: settings.whatsappNumber })}
              target="_blank"
              className="hover:text-brand-gold"
            >
              {dictionary.common.whatsappOrders}
            </Link>
            <Link href={settings.instagramUrl} target="_blank" className="hover:text-brand-gold">
              {dictionary.common.instagramPlaceholder}
            </Link>
            <p>{settings.locationLabel}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
