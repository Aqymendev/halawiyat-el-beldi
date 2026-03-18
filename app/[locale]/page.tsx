import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactSection } from "@/components/sections/contact-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { HeroSection } from "@/components/sections/hero-section";
import { OccasionSection } from "@/components/sections/occasion-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { getDictionary, isLocale, localizeProducts } from "@/lib/i18n";
import { getFeaturedProducts } from "@/lib/products";
import { getPublicSiteSettings } from "@/lib/settings";

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
    title: dictionary.metadata.homeTitle,
    description: dictionary.metadata.homeDescription
  };
}

export default async function LocalizedHomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const settings = await getPublicSiteSettings();
  const featuredProducts = localizeProducts(await getFeaturedProducts(), locale);

  return (
    <>
      <HeroSection dictionary={dictionary} locale={locale} settings={settings} />
      <FeaturedProductsSection
        products={featuredProducts}
        dictionary={dictionary}
        locale={locale}
        whatsappNumber={settings.whatsappNumber}
      />
      <WhyChooseUs dictionary={dictionary} />
      <OccasionSection dictionary={dictionary} locale={locale} />
      <ReviewsSection dictionary={dictionary} locale={locale} />
      <ContactSection dictionary={dictionary} settings={settings} />
    </>
  );
}
