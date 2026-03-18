import Link from "next/link";

import { ProductCard } from "@/components/products/product-card";
import { SectionHeader } from "@/components/sections/section-header";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";
import type { SiteSettings } from "@/types/site-settings";
import type { Product } from "@/types/product";

export function FeaturedProductsSection({
  products,
  dictionary,
  locale,
  whatsappNumber
}: {
  products: Product[];
  dictionary: Dictionary;
  locale: Locale;
  whatsappNumber: SiteSettings["whatsappNumber"];
}) {
  return (
    <section className="section-spacing">
      <div className="shell space-y-10">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow={dictionary.featured.eyebrow}
              title={dictionary.featured.title}
              description={dictionary.featured.description}
            />
            <Button asChild variant="secondary">
              <Link href={localePath(locale, "/products")}>{dictionary.common.viewAll}</Link>
            </Button>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.05}>
              <ProductCard product={product} locale={locale} dictionary={dictionary} whatsappNumber={whatsappNumber} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
