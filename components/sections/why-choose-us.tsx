import { HeartHandshake, Leaf, Ribbon, Star } from "lucide-react";

import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";
import type { Dictionary } from "@/lib/i18n";
const icons = [HeartHandshake, Leaf, Ribbon, Star];

export function WhyChooseUs({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="section-spacing">
      <div className="shell space-y-10">
        <Reveal>
          <SectionHeader
            eyebrow={dictionary.whyChoose.eyebrow}
            title={dictionary.whyChoose.title}
            description={dictionary.whyChoose.description}
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {dictionary.whyChoose.items.map((item, index) => {
            const Icon = icons[index];

            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="panel premium-border h-full p-6 text-right">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-gold/10 text-brand-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-8 text-brand-cream/68">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
