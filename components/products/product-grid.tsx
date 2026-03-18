import { ProductCard } from "@/components/products/product-card";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { SiteSettings } from "@/types/site-settings";
import type { Product } from "@/types/product";

export function ProductGrid({
  products,
  locale,
  dictionary,
  whatsappNumber
}: {
  products: Product[];
  locale: Locale;
  dictionary: Dictionary;
  whatsappNumber: SiteSettings["whatsappNumber"];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          locale={locale}
          dictionary={dictionary}
          whatsappNumber={whatsappNumber}
        />
      ))}
    </div>
  );
}
