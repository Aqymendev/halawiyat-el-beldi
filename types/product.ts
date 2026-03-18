export type Product = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  priceLabel?: string | null;
  pricePerKg?: number | null;
  category: string;
  featured: boolean;
  available: boolean;
  imageUrl: string;
  galleryImages: string[];
  sortOrder: number;
  whatsappMessage?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProductFormValues = Omit<Product, "createdAt" | "updatedAt">;

export type ProductRecord = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  price_label: string | null;
  price_per_kg: number | null;
  category: string;
  featured: boolean;
  available: boolean;
  image_url: string;
  gallery_images: string[] | null;
  sort_order: number;
  whatsapp_message: string | null;
  created_at: string;
  updated_at: string;
};
