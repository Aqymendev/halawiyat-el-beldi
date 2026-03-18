import { cache } from "react";

import { sampleProducts } from "@/lib/sample-data";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Product, ProductRecord } from "@/types/product";

const productColumns =
  "id, name, slug, short_description, description, price_label, price_per_kg, category, featured, available, image_url, gallery_images, sort_order, whatsapp_message, created_at, updated_at";

function mapProduct(record: ProductRecord): Product {
  return {
    id: record.id,
    name: record.name,
    slug: record.slug,
    shortDescription: record.short_description,
    description: record.description,
    priceLabel: record.price_label,
    pricePerKg: record.price_per_kg,
    category: record.category,
    featured: record.featured,
    available: record.available,
    imageUrl: record.image_url,
    galleryImages: record.gallery_images ?? [],
    sortOrder: record.sort_order,
    whatsappMessage: record.whatsapp_message,
    createdAt: record.created_at,
    updatedAt: record.updated_at
  };
}

function sortProducts(products: Product[]) {
  return [...products].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) {
      return a.sortOrder - b.sortOrder;
    }

    if (a.featured !== b.featured) {
      return Number(b.featured) - Number(a.featured);
    }

    return a.name.localeCompare(b.name);
  });
}

export const getPublicProducts = cache(async () => {
  if (!isSupabaseConfigured()) {
    return sortProducts(sampleProducts.filter((product) => product.available));
  }

  const supabase = createSupabasePublicClient();

  if (!supabase) {
    return sortProducts(sampleProducts.filter((product) => product.available));
  }

  const { data, error } = await supabase
    .from("products")
    .select(productColumns)
    .eq("available", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return sortProducts(sampleProducts.filter((product) => product.available));
  }

  return sortProducts((data as ProductRecord[]).map(mapProduct));
});

export const getFeaturedProducts = cache(async () => {
  const products = await getPublicProducts();
  return products.filter((product) => product.featured).slice(0, 4);
});

export const getPublicProductBySlug = cache(async (slug: string) => {
  const products = await getPublicProducts();
  return products.find((product) => product.slug === slug) ?? null;
});

export const getRelatedProducts = cache(async (current: Product) => {
  const products = await getPublicProducts();

  return products
    .filter((product) => product.id !== current.id && product.category === current.category)
    .slice(0, 3);
});

export async function getAdminProducts() {
  if (!isSupabaseConfigured()) {
    return sortProducts(sampleProducts);
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(productColumns)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return sortProducts(sampleProducts);
  }

  return sortProducts((data as ProductRecord[]).map(mapProduct));
}

export async function getAdminProductById(id: string) {
  const products = await getAdminProducts();
  return products.find((product) => product.id === id) ?? null;
}
