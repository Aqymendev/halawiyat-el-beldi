import type { MetadataRoute } from "next";

import { locales, localePath } from "@/lib/i18n";
import { getPublicProducts } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getPublicProducts();
  const staticPaths = locales.flatMap((locale) => [localePath(locale), localePath(locale, "/products"), localePath(locale, "/about")]);
  const localizedProductPaths = locales.flatMap((locale) =>
    products.map((product) => ({
      url: `${siteConfig.url}${localePath(locale, `/products/${product.slug}`)}`,
      lastModified: new Date(product.updatedAt)
    }))
  );

  return staticPaths
    .map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date()
    }))
    .concat(localizedProductPaths);
}
