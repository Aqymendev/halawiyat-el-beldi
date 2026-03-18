import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return {
    title: dictionary.metadata.aboutTitle,
    description: dictionary.aboutPage.description
  };
}

export default async function LocalizedAboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <section className="section-spacing">
      <div className="shell space-y-10">
        <SectionHeader
          eyebrow={dictionary.aboutPage.eyebrow}
          title={dictionary.aboutPage.title}
          description={dictionary.aboutPage.description}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {dictionary.aboutPage.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="panel premium-border h-full p-7">
                <h2 className="text-3xl">{item.title}</h2>
                <p className="mt-4 text-sm leading-8 text-brand-cream/70">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
