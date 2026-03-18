"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { updateSiteSettingsAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SiteSettings } from "@/types/site-settings";

const MAX_FILE_SIZE_MB = 3;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export function SiteSettingsForm({
  settings,
  errorMessage
}: {
  settings: SiteSettings;
  errorMessage?: string;
}) {
  const [clientError, setClientError] = useState<string | null>(null);
  const currentError = useMemo(() => clientError || errorMessage || null, [clientError, errorMessage]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const logoInput = form.elements.namedItem("logoFile") as HTMLInputElement | null;
    const logoFile = logoInput?.files?.[0];

    if (logoFile && logoFile.size > MAX_FILE_SIZE_BYTES) {
      event.preventDefault();
      setClientError("Logo file must be 3 MB or smaller.");
      return;
    }

    setClientError(null);
  }

  return (
    <form action={updateSiteSettingsAction} className="space-y-8" onSubmit={handleSubmit}>
      <input type="hidden" name="existingLogoUrl" value={settings.logoUrl} />

      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-4 rounded-[1.75rem] border border-brand-gold/18 bg-brand-black/25 p-5">
          <div className="space-y-2">
            <label htmlFor="logoFile" className="text-sm text-brand-cream/80">
              Brand Logo
            </label>
            <Input id="logoFile" name="logoFile" type="file" accept="image/*" />
            <p className="text-xs text-brand-cream/55">Upload a new logo. Maximum file size: 3 MB.</p>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-brand-gold/15 bg-brand-black/40">
            <Image src={settings.logoUrl} alt={settings.brandName} fill className="object-contain p-4" sizes="320px" />
          </div>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="brandName" className="text-sm text-brand-cream/80">
                Brand Name
              </label>
              <Input id="brandName" name="brandName" defaultValue={settings.brandName} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="brandSubtitle" className="text-sm text-brand-cream/80">
                Brand Subtitle
              </label>
              <Input id="brandSubtitle" name="brandSubtitle" defaultValue={settings.brandSubtitle} required />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm text-brand-cream/80">
              Site Description
            </label>
            <Textarea id="description" name="description" defaultValue={settings.description} required minLength={20} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="whatsappNumber" className="text-sm text-brand-cream/80">
                WhatsApp Number
              </label>
              <Input id="whatsappNumber" name="whatsappNumber" defaultValue={settings.whatsappNumber} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="instagramUrl" className="text-sm text-brand-cream/80">
                Instagram URL
              </label>
              <Input id="instagramUrl" name="instagramUrl" type="url" defaultValue={settings.instagramUrl} required />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="locationLabel" className="text-sm text-brand-cream/80">
                Location
              </label>
              <Input id="locationLabel" name="locationLabel" defaultValue={settings.locationLabel} required />
              <p className="text-xs text-brand-cream/55">This text is also used to show the Google Map in the contact section. Example: Marrakech, Morocco</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="contactHeadline" className="text-sm text-brand-cream/80">
                Contact Headline
              </label>
              <Input id="contactHeadline" name="contactHeadline" defaultValue={settings.contactHeadline} required />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="heroTitle" className="text-sm text-brand-cream/80">
                Hero Title
              </label>
              <Input id="heroTitle" name="heroTitle" defaultValue={settings.heroTitle} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="heroAccent" className="text-sm text-brand-cream/80">
                Hero Accent
              </label>
              <Input id="heroAccent" name="heroAccent" defaultValue={settings.heroAccent} required />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="heroDescription" className="text-sm text-brand-cream/80">
              Hero Description
            </label>
            <Textarea
              id="heroDescription"
              name="heroDescription"
              defaultValue={settings.heroDescription}
              required
              minLength={20}
            />
          </div>
        </div>
      </div>

      {currentError ? <p className="text-sm text-red-300">{currentError}</p> : null}

      <Button type="submit">Save Brand Settings</Button>
    </form>
  );
}
