import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/products/product-gallery";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductWeightSelector } from "@/components/products/product-weight-selector";
import { WhatsAppButton } from "@/components/products/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/sections/section-header";
import { getDictionary, isLocale, localePath, localizeProduct, localizeProducts, translateCategory } from "@/lib/i18n";
import { formatComputedPrice, hasWeightPricing } from "@/lib/pricing";
import { getPublicProductBySlug, getPublicProducts, getRelatedProducts } from "@/lib/products";
import { getPublicSiteSettings } from "@/lib/settings";

export async function generateStaticParams() {
  const products = await getPublicProducts();

  return products.map((product) => ({ locale: "ar", slug: product.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const product = await getPublicProductBySlug(slug);

  if (!product) {
    return {};
  }

  const localized = localizeProduct(product, locale);

  return {
    title: localized.name,
    description: localized.shortDescription,
    openGraph: {
      title: localized.name,
      description: localized.shortDescription,
      images: [{ url: localized.imageUrl, alt: localized.name }]
    }
  };
}

export default async function LocalizedProductDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const settings = await getPublicSiteSettings();
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const localizedProduct = localizeProduct(product, locale);
  const relatedProducts = localizeProducts(await getRelatedProducts(product), locale);
  const gallery = localizedProduct.galleryImages.length ? localizedProduct.galleryImages : [localizedProduct.imageUrl];

  return (
    <section className="section-spacing">
      <div className="shell space-y-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery images={gallery} productName={localizedProduct.name} labels={dictionary.gallery} />
          <article className="panel premium-border h-fit p-6 sm:p-8">
            <div className="flex flex-wrap gap-3">
              {localizedProduct.featured ? <Badge variant="featured">{dictionary.common.featured}</Badge> : null}
              <Badge variant={localizedProduct.available ? "success" : "danger"}>
                {localizedProduct.available ? dictionary.common.available : dictionary.common.unavailable}
              </Badge>
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.28em] text-brand-gold/75">
              {translateCategory(localizedProduct.category, locale)}
            </p>
            <h1 className="mt-4 text-5xl sm:text-6xl">{localizedProduct.name}</h1>
            <p className="mt-5 text-lg leading-8 text-brand-cream/75">{localizedProduct.shortDescription}</p>
            {hasWeightPricing(localizedProduct) ? (
              <p className="mt-6 text-xl text-brand-sand">
                {dictionary.pricing.pricePerKg}: {formatComputedPrice(localizedProduct.pricePerKg ?? 0)}
              </p>
            ) : localizedProduct.priceLabel ? (
              <p className="mt-6 text-xl text-brand-sand">{localizedProduct.priceLabel}</p>
            ) : null}
            <div className="moroccan-divider my-8" />
            <div className="space-y-4 text-sm leading-8 text-brand-cream/72">
              <p>{localizedProduct.description}</p>
              <p>{dictionary.productDetail.occasionNote}</p>
            </div>
            <div className="mt-8 space-y-4">
              {hasWeightPricing(localizedProduct) ? (
                <ProductWeightSelector
                  productName={localizedProduct.name}
                  pricePerKg={localizedProduct.pricePerKg ?? 0}
                  whatsappNumber={settings.whatsappNumber}
                  dictionary={dictionary}
                />
              ) : (
                <WhatsAppButton
                  productName={localizedProduct.name}
                  whatsappMessage={localizedProduct.whatsappMessage}
                  className="w-full sm:w-auto"
                  label={dictionary.common.orderOnWhatsapp}
                  number={settings.whatsappNumber}
                />
              )}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={localePath(locale, "/products")}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-brand-gold/20 px-5 text-sm font-medium text-brand-cream transition hover:border-brand-gold/50 hover:bg-brand-cream/10"
                >
                  {dictionary.common.backToProducts}
                </Link>
              </div>
            </div>
          </article>
        </div>
        {relatedProducts.length ? (
          <div className="space-y-8">
            <SectionHeader
              eyebrow={dictionary.productDetail.relatedEyebrow}
              title={dictionary.productDetail.relatedTitle}
              description={dictionary.productDetail.relatedDescription}
            />
            <ProductGrid
              products={relatedProducts}
              locale={locale}
              dictionary={dictionary}
              whatsappNumber={settings.whatsappNumber}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
