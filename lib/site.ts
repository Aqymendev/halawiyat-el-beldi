import { stripTrailingSlash } from "@/lib/utils";
import type { SiteSettings } from "@/types/site-settings";

export const siteConfig = {
  name: "Halawiyat El Beldi",
  description: "Traditional Moroccan pastries, crafted with elegance for gifting, gatherings, and meaningful celebrations.",
  url: stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/",
  location: process.env.NEXT_PUBLIC_LOCATION_LABEL || "Marrakech, Morocco",
  contactHeadline: "Handmade sweets for gifts, gatherings, and special moments.",
  keywords: [
    "Moroccan pastries",
    "Moroccan sweets",
    "Halawiyat El Beldi",
    "Kaab Lghzal",
    "Chebakia",
    "Gift boxes",
    "Ramadan sweets",
    "Eid pastries"
  ]
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" }
] as const;

export const categoryOptions = [
  "Kaab Lghzal",
  "Chebakia",
  "Ghriba",
  "Briwat",
  "Sellou",
  "Gift Boxes",
  "Special Orders"
] as const;

export const sortOptions = [
  { value: "featured" },
  { value: "newest" },
  { value: "name-asc" },
  { value: "name-desc" }
] as const;

export const occasionHighlights = [
  "Ramadan Tables",
  "Eid Gifting",
  "Wedding Favours",
  "Elegant Family Gatherings"
] as const;

export const fallbackSiteSettings: SiteSettings = {
  id: 1,
  brandName: siteConfig.name,
  brandSubtitle: "Moroccan Pastry Atelier",
  description: siteConfig.description,
  whatsappNumber: siteConfig.whatsappNumber,
  instagramUrl: siteConfig.instagramUrl,
  locationLabel: siteConfig.location,
  contactHeadline: siteConfig.contactHeadline,
  logoUrl: "/brand/brand-mark.svg",
  heroTitle: "Traditional Moroccan pastries,",
  heroAccent: "crafted with elegance.",
  heroDescription:
    "Halawiyat El Beldi presents handmade sweets for refined gifting, warm family gatherings, Ramadan tables, weddings, and special moments that deserve beauty.",
  updatedAt: "2026-03-18T12:00:00.000Z"
};
