"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { CategoryFilter } from "@/components/products/category-filter";
import { ProductGrid } from "@/components/products/product-grid";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { sortOptions } from "@/lib/site";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { SiteSettings } from "@/types/site-settings";
import type { Product } from "@/types/product";

export function ProductsExplorer({
  products,
  categories,
  locale,
  dictionary,
  whatsappNumber
}: {
  products: Product[];
  categories: string[];
  locale: Locale;
  dictionary: Dictionary;
  whatsappNumber: SiteSettings["whatsappNumber"];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const filteredProducts = products
    .filter((product) => {
      const matchesQuery =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || product.category === category;
      return matchesQuery && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sort === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sort === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      if (a.featured !== b.featured) {
        return Number(b.featured) - Number(a.featured);
      }
      return a.sortOrder - b.sortOrder;
    });

  return (
    <div className="space-y-8">
      <div className="panel premium-border grid gap-4 p-5 lg:grid-cols-[1fr_220px_220px]">
        <label className="relative block">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-cream/45" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dictionary.common.searchPlaceholder}
            className="pr-10 text-right"
          />
        </label>
        <CategoryFilter
          categories={categories}
          value={category}
          onChange={setCategory}
          locale={locale}
          allLabel={dictionary.common.allCategories}
        />
        <Select value={sort} onChange={(event) => setSort(event.target.value)}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.value === "featured"
                ? dictionary.common.sortFeatured
                : option.value === "newest"
                  ? dictionary.common.sortNewest
                  : option.value === "name-asc"
                    ? dictionary.common.sortNameAsc
                    : dictionary.common.sortNameDesc}
            </option>
          ))}
        </Select>
      </div>
      <ProductGrid products={filteredProducts} locale={locale} dictionary={dictionary} whatsappNumber={whatsappNumber} />
      {!filteredProducts.length ? (
        <div className="panel premium-border p-10 text-center">
          <h3 className="text-2xl">{dictionary.common.noProducts}</h3>
          <p className="mt-3 text-sm text-brand-cream/70">{dictionary.common.searchPlaceholder}</p>
        </div>
      ) : null}
    </div>
  );
}
