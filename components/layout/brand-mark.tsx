import Image from "next/image";
import Link from "next/link";

import { fallbackSiteSettings } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types/site-settings";

export function BrandMark({
  size = "default",
  withText = true,
  href = "/",
  settings
}: {
  size?: "sm" | "default" | "lg";
  withText?: boolean;
  href?: string;
  settings?: Pick<SiteSettings, "brandName" | "brandSubtitle" | "logoUrl">;
}) {
  const brandName = settings?.brandName || fallbackSiteSettings.brandName;
  const brandSubtitle = settings?.brandSubtitle || fallbackSiteSettings.brandSubtitle;
  const logoUrl = settings?.logoUrl || fallbackSiteSettings.logoUrl;
  const imageClass =
    size === "sm" ? "h-12 w-12" : size === "lg" ? "h-24 w-24 sm:h-28 sm:w-28" : "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]";
  const titleClass = size === "lg" ? "text-3xl sm:text-4xl" : size === "sm" ? "text-lg" : "text-2xl";
  const captionClass = size === "sm" ? "text-[10px]" : "text-xs";

  return (
    <Link href={href} className="group inline-flex items-center gap-3">
      <div className={cn("relative overflow-hidden rounded-full", imageClass)}>
        <Image
          src={logoUrl}
          alt={`${brandName} brand mark`}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          sizes={size === "lg" ? "112px" : size === "sm" ? "48px" : "72px"}
        />
      </div>
      {withText ? (
        <div>
          <p className={cn("font-display leading-none text-brand-cream", titleClass)}>{brandName}</p>
          <p className={cn("mt-1 uppercase tracking-[0.28em] text-brand-gold/80", captionClass)}>{brandSubtitle}</p>
        </div>
      ) : null}
    </Link>
  );
}
