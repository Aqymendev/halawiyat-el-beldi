import type { Product } from "@/types/product";

export const locales = ["ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export function isLocale(value: string): value is Locale {
  return value === "ar";
}

export function getDirection(locale: Locale | string) {
  void locale;
  return "rtl" as const;
}

export function localePath(locale: Locale, path = "") {
  if (!path || path === "/") {
    return `/${locale}`;
  }

  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getLocaleFromPathname(pathname: string): Locale {
  void pathname;
  return defaultLocale;
}

export function replaceLocaleInPathname(pathname: string, locale: Locale) {
  void locale;
  return pathname.startsWith("/ar") ? pathname : localePath(defaultLocale, pathname);
}

const categoryTranslations: Record<string, string> = {
  "Kaab Lghzal": "كعب الغزال",
  Chebakia: "الشباكية",
  Ghriba: "الغريبة",
  Briwat: "البريوات",
  Sellou: "السفوف",
  "Gift Boxes": "علب الهدايا",
  "Special Orders": "طلبات خاصة"
};

export function translateCategory(category: string, locale: Locale) {
  void locale;
  return categoryTranslations[category] ?? category;
}

const dictionary = {
  languageName: "العربية",
  nav: {
    home: "الرئيسية",
    products: "المنتجات",
    about: "عن العلامة",
    contact: "تواصل معنا",
    order: "اطلب عبر واتساب",
    browse: "تصفح التشكيلة"
  },
  footer: {
    description: "حلويات مغربية تقليدية محضرة بذوق رفيع لترافق الهدايا والضيافة والمناسبات المميزة.",
    explore: "روابط سريعة",
    contact: "معلومات التواصل"
  },
  common: {
    featured: "مختار",
    available: "متوفر",
    unavailable: "غير متوفر",
    viewDetails: "عرض التفاصيل",
    orderOnWhatsapp: "اطلب عبر واتساب",
    backToProducts: "العودة إلى المنتجات",
    relatedProducts: "منتجات مشابهة",
    noProducts: "لم نجد منتجات مطابقة",
    searchPlaceholder: "ابحث عن نوع الحلوى أو المناسبة أو الهدية...",
    allCategories: "كل الفئات",
    sortFeatured: "المميزة أولاً",
    sortNewest: "الأحدث",
    sortNameAsc: "الاسم من أ إلى ي",
    sortNameDesc: "الاسم من ي إلى أ",
    signatureUse: "مناسبات خاصة",
    whatsappOrders: "طلبات واتساب",
    instagramPlaceholder: "إنستغرام",
    startWhatsapp: "ابدأ الطلب الآن",
    viewAll: "عرض كل المنتجات",
    notFound: "الصفحة غير موجودة",
    browseProducts: "تصفح المنتجات"
  },
  gallery: {
    thumbnails: "صور المنتج",
    enlarge: "تكبير الصورة",
    previous: "الصورة السابقة",
    next: "الصورة التالية",
    close: "إغلاق",
    hoverToZoom: "حرّك المؤشر للتكبير"
  },
  pricing: {
    soldByWeight: "يباع بالوزن",
    pricePerKg: "السعر لكل 1 كلغ",
    chooseWeight: "اختر الوزن",
    customWeight: "وزن مخصص",
    customWeightHint: "أدخل الوزن بالغرام ليتم احتساب السعر تلقائياً.",
    estimatedPrice: "السعر التقديري",
    orderThisWeight: "اطلب بهذا الوزن",
    customOption: "مخصص",
    weight200: "200غ",
    weight500: "500غ",
    weight1kg: "1كلغ",
    gramsPlaceholder: "مثال: 750",
    enterCustomWeight: "أدخل الوزن المخصص أولاً"
  },
  hero: {
    badge: "حلويات مغربية يدوية بلمسة فاخرة",
    title: "حلويات مغربية أصيلة",
    accent: "بتقديم أنيق",
    description:
      "حلويات البلدِي تقدم تشكيلات يدوية راقية للهدايا الفاخرة والزيارات العائلية وأمسيات رمضان والأعراس والمناسبات التي تستحق طعماً جميلاً وتفاصيل مدروسة.",
    cardTitle: "تشكيلات مصممة للضيافة والهدايا الراقية",
    cardDescription: "اختاري ما يناسب مناسبتك ثم أرسلي الطلب مباشرة عبر واتساب برسالة جاهزة وسهلة.",
    highlights: [
      ["تحضير يومي", "دفعات صغيرة للحفاظ على الطزاجة والشكل الأنيق."],
      ["مكونات ممتازة", "لوز وسمسم وعسل وزبدة ونكهات مغربية دافئة."],
      ["مناسبة للهدايا", "تقديم راقٍ يليق بالمناسبات والزيارات الخاصة."]
    ],
    occasions: ["رمضان", "العيد", "هدايا", "أعراس"]
  },
  featured: {
    eyebrow: "منتجات مختارة",
    title: "تشكيلة راقية للضيافة والهدايا المغربية",
    description: "منتجات مختارة بعناية لتمنح الطاولة دفئاً وتترك انطباعاً أنيقاً من أول نظرة."
  },
  whyChoose: {
    eyebrow: "لماذا نحن",
    title: "حرفية واضحة وتقديم يليق بالمناسبات الراقية",
    description: "نركز على الطعم الأصيل مع لمسة بصرية أنيقة وتجربة طلب بسيطة ومباشرة.",
    items: [
      {
        title: "صناعة يدوية",
        description: "كل قطعة تحضر بعناية بعيداً عن الإنتاج السريع لتبقى اللمسة الحرفية واضحة."
      },
      {
        title: "مكونات منتقاة",
        description: "نعتمد على اللوز والسمسم والعسل والزبدة وماء الزهر بنكهات متوازنة وغنية."
      },
      {
        title: "مثالية للهدايا",
        description: "تصميم التشكيلات يراعي أناقة التقديم سواء للزيارات أو الهدايا أو المناسبات."
      },
      {
        title: "روح مغربية فاخرة",
        description: "مستوحاة من تراث الحلويات المغربية مع تقديم بصري دافئ ومعاصر."
      }
    ]
  },
  occasions: {
    eyebrow: "مناسباتنا",
    title: "تشكيلات مناسبة لرمضان والعيد والأعراس والهدايا واللقاءات العائلية",
    description: "سواء كنت تبحث عن هدية أنيقة أو ضيافة غنية للمائدة، يمكن تنسيق الطلب بما يليق بالمناسبة."
  },
  reviews: {
    eyebrow: "انطباعات العملاء",
    title: "جودة واضحة وخدمة تبقى شخصية من البداية للنهاية",
    description: "هذه آراء تجريبية حالياً ويمكن استبدالها لاحقاً بآراء حقيقية من العملاء."
  },
  contact: {
    eyebrow: "تواصل مباشر",
    title: "اختاري التشكيلة المناسبة واطلبيها بسهولة عبر واتساب",
    description: "الموقع مصمم للعرض والاستكشاف، ثم يتم تأكيد الطلب معك مباشرة بشكل شخصي وسريع."
  },
  productsPage: {
    eyebrow: "التشكيلة",
    title: "اكتشفي الحلويات اليدوية وعلب الهدايا الراقية",
    description: "استخدمي البحث والفلاتر للوصول بسرعة إلى المنتج المناسب ثم أرسلي الطلب مباشرة عبر واتساب."
  },
  productDetail: {
    relatedEyebrow: "من نفس الروح",
    relatedTitle: "قد يعجبك أيضاً",
    relatedDescription: "منتجات أخرى تحمل نفس الطابع الراقي والتقديم الأنيق.",
    occasionNote: "مناسب للهدايا الراقية والزيارات العائلية وموائد رمضان وضيافة العيد والأعراس والطلبات الخاصة."
  },
  aboutPage: {
    eyebrow: "عن العلامة",
    title: "تراث مغربي دافئ بتفاصيل أنيقة وجودة منزلية",
    description: "حلويات البلدِي مستوحاة من متعة مشاركة الحلوى المغربية الأصيلة مع العائلة والضيوف في أجمل اللحظات.",
    items: [
      {
        title: "أصالة مغربية",
        text: "وصفات مستوحاة من تقاليد مغربية عريقة تقدم في الأعياد والجلسات العائلية والضيافات الجميلة."
      },
      {
        title: "جودة منزلية",
        text: "التحضير يتم على دفعات صغيرة للحفاظ على الطزاجة والقوام واللمسة اليدوية الواضحة."
      },
      {
        title: "مكونات فاخرة",
        text: "نوازن بين اللوز والسمسم والعسل وماء الزهر والزبدة لنحصل على نكهات غنية ومريحة."
      },
      {
        title: "للمناسبات الخاصة",
        text: "من رمضان والعيد إلى الأعراس والهدايا والطلبات الخاصة، كل تشكيلة تعد بعناية لتليق بالمناسبة."
      }
    ]
  },
  metadata: {
    homeTitle: "حلويات البلدي | حلويات مغربية فاخرة",
    homeDescription: "حلويات مغربية تقليدية راقية للهدايا والمناسبات والضيافة الأنيقة.",
    productsTitle: "المنتجات",
    aboutTitle: "عن العلامة"
  }
} as const;

export type Dictionary = typeof dictionary;

export function getDictionary(locale: Locale): Dictionary {
  void locale;
  return dictionary;
}

const localizedProducts: Record<
  string,
  Pick<Product, "name" | "shortDescription" | "description" | "priceLabel" | "category" | "whatsappMessage">
> = {
  "kaab-lghzal": {
    name: "كعب الغزال",
    shortDescription: "هلالات رقيقة محشوة بعجينة اللوز المعطرة وماء الزهر.",
    description: "من أشهر الحلويات المغربية، تحضر يدوياً بعجينة ناعمة وحشوة لوز غنية وتناسب الضيافة الراقية والهدايا.",
    priceLabel: "ابتداءً من 18 EUR / علبة",
    category: "Kaab Lghzal",
    whatsappMessage: "السلام عليكم، أود طلب كعب الغزال."
  },
  chebakia: {
    name: "الشباكية",
    shortDescription: "حلوى مغربية مقرمشة بالعسل ومزينة بالسمسم.",
    description: "تشكيلة احتفالية غنية ومحبوبة خصوصاً في رمضان، تقدم بطابع دافئ ولمسة مغربية أصيلة.",
    priceLabel: "ابتداءً من 14 EUR / صينية",
    category: "Chebakia",
    whatsappMessage: "السلام عليكم، أود طلب الشباكية."
  },
  ghriba: {
    name: "الغريبة",
    shortDescription: "بسكويت مغربي هش بقوام ناعم ونكهة زبدية مريحة.",
    description: "حلوى منزلية بطابع أنيق، مناسبة مع القهوة والزيارات العائلية وعلب التشكيلات الراقية.",
    priceLabel: "ابتداءً من 10 EUR / علبة",
    category: "Ghriba",
    whatsappMessage: "السلام عليكم، أود طلب الغريبة."
  },
  "almond-briwat": {
    name: "بريوات باللوز",
    shortDescription: "مثلثات مقرمشة بحشوة لوز غنية ولمسة خفيفة من العسل.",
    description: "تحضر بعجينة رقيقة وحشوة متوازنة، وتناسب الأعراس والتشكيلات المخصصة والهدايا الفاخرة.",
    priceLabel: "ابتداءً من 16 EUR / علبة",
    category: "Briwat",
    whatsappMessage: "السلام عليكم، أود طلب بريوات باللوز."
  },
  sellou: {
    name: "السفوف",
    shortDescription: "خليط مغربي عطري من الدقيق المحمص واللوز والسمسم والتوابل.",
    description: "تحضير تقليدي غني ومغذٍ يقدم كثيراً في رمضان والمناسبات العائلية مع تقديم أنيق ومميز.",
    priceLabel: "ابتداءً من 12 EUR / مرطبان",
    category: "Sellou",
    whatsappMessage: "السلام عليكم، أود طلب السفوف."
  },
  "assorted-gift-box": {
    name: "علبة هدايا متنوعة",
    shortDescription: "تشكيلة فاخرة من حلويات مختارة بعناية للهدايا والمناسبات.",
    description: "مجموعة راقية تضم أجود الحلويات اليدوية بتنسيق أنيق مناسب للضيافة والهدايا والطلبات الخاصة.",
    priceLabel: "ابتداءً من 28 EUR / علبة",
    category: "Gift Boxes",
    whatsappMessage: "السلام عليكم، أود طلب علبة هدايا متنوعة."
  }
};

export function localizeProduct(product: Product, locale: Locale): Product {
  void locale;
  const translation = localizedProducts[product.slug];

  return {
    ...product,
    ...translation,
    category: translateCategory(translation?.category ?? product.category, defaultLocale)
  };
}

export function localizeProducts(products: Product[], locale: Locale) {
  return products.map((product) => localizeProduct(product, locale));
}
