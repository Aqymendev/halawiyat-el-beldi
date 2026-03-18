import { getSupabasePublishableKey, getSupabaseUrl } from "@/lib/supabase/env";

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabasePublishableKey());
}
