"use client";

import { useEffect } from "react";

import { defaultLocale } from "@/lib/i18n";

export function LocaleDocument({ locale = defaultLocale }: { locale?: string }) {
  useEffect(() => {
    const direction = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
    document.body.dir = direction;
  }, [locale]);

  return null;
}
