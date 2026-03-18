import Link from "next/link";
import { Instagram, MapPin, MessageCircleMore } from "lucide-react";

import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { type Dictionary } from "@/lib/i18n";
import { buildGoogleMapsEmbedUrl, buildGoogleMapsPlaceUrl } from "@/lib/maps";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { SiteSettings } from "@/types/site-settings";

export function ContactSection({ dictionary, settings }: { dictionary: Dictionary; settings: SiteSettings }) {
  const mapEmbedUrl = buildGoogleMapsEmbedUrl(settings.locationLabel);
  const mapPlaceUrl = buildGoogleMapsPlaceUrl(settings.locationLabel);

  return (
    <section id="contact" className="section-spacing">
      <div className="shell">
        <div className="panel premium-border overflow-hidden">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
            <Reveal>
              <SectionHeader
                eyebrow={dictionary.contact.eyebrow}
                title={dictionary.contact.title}
                description={dictionary.contact.description}
              />
            </Reveal>
            <Reveal delay={0.06}>
              <div className="space-y-5 rounded-[2rem] border border-brand-gold/18 bg-brand-black/30 p-6">
                <div className="flex items-start gap-4 rounded-[1.5rem] border border-brand-gold/14 bg-brand-cream/5 p-4">
                  <MessageCircleMore className="mt-1 h-5 w-5 text-brand-gold" />
                  <div>
                    <p className="font-display text-2xl">{dictionary.common.whatsappOrders}</p>
                    <p className="mt-2 text-sm leading-7 text-brand-cream/68">{settings.contactHeadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-[1.5rem] border border-brand-gold/14 bg-brand-cream/5 p-4">
                  <Instagram className="h-5 w-5 text-brand-gold" />
                  <Link href={settings.instagramUrl} target="_blank" className="text-sm text-brand-cream/78 hover:text-brand-gold">
                    {dictionary.common.instagramPlaceholder}
                  </Link>
                </div>
                <div className="flex items-center gap-4 rounded-[1.5rem] border border-brand-gold/14 bg-brand-cream/5 p-4">
                  <MapPin className="h-5 w-5 text-brand-gold" />
                  <p className="text-sm text-brand-cream/78">{settings.locationLabel}</p>
                </div>
                <div className="overflow-hidden rounded-[1.75rem] border border-brand-gold/14 bg-brand-black/40">
                  <iframe
                    title={`Google Map - ${settings.locationLabel}`}
                    src={mapEmbedUrl}
                    className="h-[260px] w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="flex items-center justify-between gap-3 border-t border-brand-gold/10 px-4 py-3">
                    <p className="text-xs text-brand-cream/60">اعثر علينا على الخريطة في {settings.locationLabel}</p>
                    <Link
                      href={mapPlaceUrl}
                      target="_blank"
                      className="text-sm font-medium text-brand-gold transition hover:text-brand-sand"
                    >
                      فتح في Google Maps
                    </Link>
                  </div>
                </div>
                <Button asChild size="lg" className="w-full">
                  <Link href={buildWhatsAppLink({ productName: "تشكيلة حلويات", number: settings.whatsappNumber })} target="_blank">
                    {dictionary.common.startWhatsapp}
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
