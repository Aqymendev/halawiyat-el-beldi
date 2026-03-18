import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";
import type { Dictionary, Locale } from "@/lib/i18n";

export function OccasionSection({ dictionary }: { dictionary: Dictionary; locale: Locale }) {
  const occasionHighlights = ["موائد رمضان", "هدايا العيد", "تقديمات الأعراس", "زيارات عائلية راقية"];

  return (
    <section className="section-spacing">
      <div className="shell">
        <div className="panel premium-border overflow-hidden arabic-surface">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
            <Reveal>
              <SectionHeader
                eyebrow={dictionary.occasions.eyebrow}
                title={dictionary.occasions.title}
                description={dictionary.occasions.description}
              />
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {occasionHighlights.map((item, index) => (
                <Reveal key={item} delay={index * 0.05}>
                  <div className="rounded-[1.75rem] border border-brand-gold/18 bg-brand-burgundy/15 p-6 text-right">
                    <p className="text-xs tracking-[0.26em] text-brand-gold/80">{dictionary.common.signatureUse}</p>
                    <h3 className="mt-4 text-3xl">{item}</h3>
                    <p className="mt-3 text-sm leading-8 text-brand-cream/68">
                      حلويات يدوية أنيقة صممت لترافق دفء المناسبة وتضيف لمسة كرم وجمال إلى التقديم.
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
