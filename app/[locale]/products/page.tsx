import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductsExplorer } from "@/components/products/products-explorer";
import { SectionHeader } from "@/components/sections/section-header";
import { getDictionary, isLocale, localizeProducts } from "@/lib/i18n";
import { getPublicProducts } from "@/lib/products";
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
    title: dictionary.metadata.productsTitle,
    description: dictionary.productsPage.description
  };
}

export default async function LocalizedProductsPage({
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
  const products = localizeProducts(await getPublicProducts(), locale);
  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <section className="section-spacing">
      <div className="shell space-y-10">
        <SectionHeader
          eyebrow={dictionary.productsPage.eyebrow}
          title={dictionary.productsPage.title}
          description={dictionary.productsPage.description}
        />
        <ProductsExplorer
          products={products}
          categories={categories}
          locale={locale}
          dictionary={dictionary}
          whatsappNumber={settings.whatsappNumber}
        />
      </div>
    </section>
  );
}
