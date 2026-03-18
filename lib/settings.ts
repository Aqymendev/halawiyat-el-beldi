import { cache } from "react";

import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { fallbackSiteSettings } from "@/lib/site";
import type { SiteSettings, SiteSettingsRecord } from "@/types/site-settings";

function mapSiteSettings(record: SiteSettingsRecord): SiteSettings {
  return {
    id: record.id,
    brandName: record.brand_name,
    brandSubtitle: record.brand_subtitle,
    description: record.description,
    whatsappNumber: record.whatsapp_number,
    instagramUrl: record.instagram_url,
    locationLabel: record.location_label,
    contactHeadline: record.contact_headline,
    logoUrl: record.logo_url,
    heroTitle: record.hero_title,
    heroAccent: record.hero_accent,
    heroDescription: record.hero_description,
    updatedAt: record.updated_at
  };
}

export const getPublicSiteSettings = cache(async () => {
  if (!isSupabaseConfigured()) {
    return fallbackSiteSettings;
  }

  const supabase = createSupabasePublicClient();

  if (!supabase) {
    return fallbackSiteSettings;
  }

  const { data, error } = await supabase
    .from("site_settings")
    .select(
      "id, brand_name, brand_subtitle, description, whatsapp_number, instagram_url, location_label, contact_headline, logo_url, hero_title, hero_accent, hero_description, updated_at"
    )
    .eq("id", 1)
    .maybeSingle();

  if (error || !data) {
    return fallbackSiteSettings;
  }

  return mapSiteSettings(data as SiteSettingsRecord);
});

export async function getAdminSiteSettings() {
  if (!isSupabaseConfigured()) {
    return fallbackSiteSettings;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select(
      "id, brand_name, brand_subtitle, description, whatsapp_number, instagram_url, location_label, contact_headline, logo_url, hero_title, hero_accent, hero_description, updated_at"
    )
    .eq("id", 1)
    .maybeSingle();

  if (error || !data) {
    return fallbackSiteSettings;
  }

  return mapSiteSettings(data as SiteSettingsRecord);
}

export function getFallbackSiteSettings() {
  return fallbackSiteSettings;
}
