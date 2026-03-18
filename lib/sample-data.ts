import type { Product } from "@/types/product";

const now = "2026-03-18T12:00:00.000Z";

export const sampleProducts: Product[] = [
  {
    id: "f4e7ae2e-9c5b-4a23-a21f-a8f0f05f0101",
    name: "Kaab Lghzal",
    slug: "kaab-lghzal",
    shortDescription: "Delicate crescent pastries filled with roasted almond paste and orange blossom.",
    description:
      "A signature Moroccan favourite shaped by hand and finished with a gentle dusting of sugar. Our Kaab Lghzal balances buttery pastry with fragrant almond filling for refined gifting and elegant tea tables.",
    priceLabel: null,
    pricePerKg: 90,
    category: "Kaab Lghzal",
    featured: true,
    available: true,
    imageUrl: "/images/products/kaab-lghzal.svg",
    galleryImages: ["/images/products/kaab-lghzal.svg", "/images/products/kaab-lghzal-detail.svg"],
    sortOrder: 1,
    whatsappMessage: "Hello, I would like to order Kaab Lghzal.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "f4e7ae2e-9c5b-4a23-a21f-a8f0f05f0102",
    name: "Chebakia",
    slug: "chebakia",
    shortDescription: "Honey-glazed sesame pastries with a festive golden finish.",
    description:
      "Braided and folded with care, our Chebakia is glazed in honey and showered with toasted sesame for a rich texture and deeply comforting Ramadan tradition.",
    priceLabel: null,
    pricePerKg: 55,
    category: "Chebakia",
    featured: true,
    available: true,
    imageUrl: "/images/products/chebakia.svg",
    galleryImages: ["/images/products/chebakia.svg"],
    sortOrder: 2,
    whatsappMessage: "Hello, I would like to order Chebakia.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "f4e7ae2e-9c5b-4a23-a21f-a8f0f05f0103",
    name: "Ghriba",
    slug: "ghriba",
    shortDescription: "Tender Moroccan cookies with a crackled finish and buttery melt.",
    description:
      "Our Ghriba is baked for a soft interior and a lightly crisp edge, making it ideal for coffee service, family visits, and elegant assorted boxes.",
    priceLabel: null,
    pricePerKg: 48,
    category: "Ghriba",
    featured: false,
    available: true,
    imageUrl: "/images/products/ghriba.svg",
    galleryImages: ["/images/products/ghriba.svg"],
    sortOrder: 3,
    whatsappMessage: "Hello, I would like to order Ghriba.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "f4e7ae2e-9c5b-4a23-a21f-a8f0f05f0104",
    name: "Almond Briwat",
    slug: "almond-briwat",
    shortDescription: "Crisp triangle pastries layered with almond filling and honey shine.",
    description:
      "Thin pastry is folded by hand around spiced almond paste, then baked to a crisp finish and brushed with warm honey. A refined choice for weddings and premium mixed assortments.",
    priceLabel: null,
    pricePerKg: 72,
    category: "Briwat",
    featured: true,
    available: true,
    imageUrl: "/images/products/almond-briwat.svg",
    galleryImages: ["/images/products/almond-briwat.svg"],
    sortOrder: 4,
    whatsappMessage: "Hello, I would like to order Almond Briwat.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "f4e7ae2e-9c5b-4a23-a21f-a8f0f05f0105",
    name: "Sellou",
    slug: "sellou",
    shortDescription: "Aromatic toasted flour blend with almonds, sesame, and warming spice.",
    description:
      "Traditionally prepared for Ramadan and celebrations, our Sellou is rich, nourishing, and deeply aromatic. It is presented in a premium serving jar or gift-ready container.",
    priceLabel: null,
    pricePerKg: 36,
    category: "Sellou",
    featured: false,
    available: true,
    imageUrl: "/images/products/sellou.svg",
    galleryImages: ["/images/products/sellou.svg"],
    sortOrder: 5,
    whatsappMessage: "Hello, I would like to order Sellou.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "f4e7ae2e-9c5b-4a23-a21f-a8f0f05f0106",
    name: "Assorted Gift Box",
    slug: "assorted-gift-box",
    shortDescription: "A curated premium selection presented for gifting and celebrations.",
    description:
      "An elegant assortment of our finest handmade pastries, styled for hosting, gifting, corporate gestures, and special occasions. Each box is arranged with balance, colour, and generosity in mind.",
    priceLabel: "From 28 EUR / box",
    pricePerKg: null,
    category: "Gift Boxes",
    featured: true,
    available: true,
    imageUrl: "/images/products/assorted-gift-box.svg",
    galleryImages: ["/images/products/assorted-gift-box.svg", "/images/products/assorted-gift-box-detail.svg"],
    sortOrder: 6,
    whatsappMessage: "Hello, I would like to order the Assorted Gift Box.",
    createdAt: now,
    updatedAt: now
  }
];

export const sampleTestimonials = [
  {
    name: "Nadia T.",
    quote: "Every box feels thoughtful and celebratory. The presentation is as beautiful as the pastries themselves."
  },
  {
    name: "Samir K.",
    quote: "We ordered for Eid gifting and the quality felt truly premium. Guests asked where they came from immediately."
  },
  {
    name: "Imane R.",
    quote: "Elegant flavours, handcrafted detail, and smooth WhatsApp ordering. It felt personal from start to finish."
  }
];
