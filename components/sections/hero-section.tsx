import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { BrandMark } from "@/components/layout/brand-mark";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { SiteSettings } from "@/types/site-settings";

export function HeroSection({
  dictionary,
  locale,
  settings
}: {
  dictionary: Dictionary;
  locale: Locale;
  settings: SiteSettings;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow opacity-80" />
      <div className="pattern-overlay absolute inset-x-0 top-0 h-80 opacity-30" />
      <div className="shell section-spacing relative grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div className="space-y-8 text-right">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-cream/10 px-4 py-2 text-xs tracking-[0.24em] text-brand-gold/85">
              <Sparkles className="h-4 w-4" />
              {dictionary.hero.badge}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <BrandMark size="lg" href={localePath(locale)} settings={settings} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl leading-[1.15] sm:text-6xl lg:text-7xl">
                {settings.heroTitle} <span className="gold-text">{settings.heroAccent}</span>
              </h1>
              <p className="max-w-2xl text-lg leading-9 text-brand-cream/75">{settings.heroDescription}</p>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={localePath(locale, "/products")}>
                  {dictionary.nav.browse}
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href={buildWhatsAppLink({ productName: "تشكيلة حلويات", number: settings.whatsappNumber })} target="_blank">
                  {dictionary.nav.order}
                </Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="grid gap-4 rounded-[2rem] border border-brand-gold/15 bg-brand-black/35 p-5 sm:grid-cols-3">
              {dictionary.hero.highlights.map(([title, text]) => (
                <div key={title} className="rounded-[1.5rem] border border-brand-gold/10 bg-brand-cream/5 p-4">
                  <p className="font-display text-xl text-brand-sand">{title}</p>
                  <p className="mt-2 text-sm leading-7 text-brand-cream/65">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.12} className="relative">
          <div className="relative mx-auto max-w-[520px] rounded-[2.5rem] border border-brand-gold/20 bg-brand-black/45 p-5 shadow-glow">
            <div className="absolute inset-6 rounded-[2rem] border border-brand-gold/15" />
            <div className="pattern-overlay absolute inset-0 rounded-[2.5rem] opacity-40" />
            <div className="relative overflow-hidden rounded-[2rem] border border-brand-gold/20 bg-gradient-to-b from-brand-burgundy/30 via-brand-black to-brand-black p-6">
              <div className="mx-auto flex min-h-[480px] flex-col items-center justify-center rounded-[14rem_14rem_2rem_2rem] border border-brand-gold/20 bg-brand-black/70 px-6 py-10 text-center">
                <BrandMark size="lg" withText={false} settings={settings} />
                <div className="moroccan-divider my-8 max-w-xs" />
                <p className="text-xs tracking-[0.4em] text-brand-gold/70">تشكيلة بتوقيعنا</p>
                <h2 className="mt-4 text-3xl sm:text-4xl">{dictionary.hero.cardTitle}</h2>
                <p className="mt-4 max-w-sm text-sm leading-7 text-brand-cream/68">{dictionary.hero.cardDescription}</p>
                <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
                  {dictionary.hero.occasions.map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-brand-gold/15 bg-brand-cream/5 px-4 py-3 text-sm text-brand-cream/75"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
