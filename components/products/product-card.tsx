"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/products/whatsapp-button";
import { localePath, translateCategory, type Dictionary, type Locale } from "@/lib/i18n";
import { formatComputedPrice, hasWeightPricing } from "@/lib/pricing";
import type { SiteSettings } from "@/types/site-settings";
import type { Product } from "@/types/product";

export function ProductCard({
  product,
  locale,
  dictionary,
  whatsappNumber
}: {
  product: Product;
  locale: Locale;
  dictionary: Dictionary;
  whatsappNumber: SiteSettings["whatsappNumber"];
}) {
  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group panel premium-border overflow-hidden"
    >
      <div className="relative aspect-[4/4.6] overflow-hidden bg-brand-black/40">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/5 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.featured ? <Badge variant="featured">{dictionary.common.featured}</Badge> : null}
          <Badge variant={product.available ? "success" : "danger"}>
            {product.available ? dictionary.common.available : dictionary.common.unavailable}
          </Badge>
        </div>
        <Link
          href={localePath(locale, `/products/${product.slug}`)}
          aria-label={`عرض ${product.name}`}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/25 bg-brand-black/50 text-brand-cream transition hover:bg-brand-gold hover:text-brand-black"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-brand-gold/75">{translateCategory(product.category, locale)}</p>
            <Link href={localePath(locale, `/products/${product.slug}`)} className="mt-2 block text-2xl hover:text-brand-gold">
              {product.name}
            </Link>
          </div>
          {hasWeightPricing(product) ? (
            <p className="text-sm font-medium text-brand-sand">{formatComputedPrice(product.pricePerKg ?? 0)} / كلغ</p>
          ) : product.priceLabel ? (
            <p className="text-sm font-medium text-brand-sand">{product.priceLabel}</p>
          ) : null}
        </div>
        <p className="text-sm leading-7 text-brand-cream/70">{product.shortDescription}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton
            productName={product.name}
            whatsappMessage={product.whatsappMessage}
            className="flex-1"
            label={dictionary.common.orderOnWhatsapp}
            number={whatsappNumber}
          />
          <Link
            href={localePath(locale, `/products/${product.slug}`)}
            className="inline-flex h-11 items-center justify-center rounded-full border border-brand-gold/20 px-5 text-sm font-medium text-brand-cream transition hover:border-brand-gold/50 hover:bg-brand-cream/10"
          >
            {dictionary.common.viewDetails}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
