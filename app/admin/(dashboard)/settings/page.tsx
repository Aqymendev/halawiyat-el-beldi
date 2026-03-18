import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { StatusBanner } from "@/components/ui/status-banner";
import { getAdminSiteSettings } from "@/lib/settings";

export default async function AdminSettingsPage({
  searchParams
}: {
  searchParams: Promise<{ status?: string; message?: string }>;
}) {
  const { status, message } = await searchParams;
  const settings = await getAdminSiteSettings();

  const bannerStatus = status === "saved" ? "success" : status === "error" ? "error" : "info";
  const bannerMessage =
    status === "saved"
      ? "Brand settings updated successfully."
      : status === "error"
        ? message || "There was a problem saving brand settings."
        : null;

  return (
    <div className="space-y-6">
      <StatusBanner status={bannerStatus} message={bannerMessage} />
      <div className="panel premium-border p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-gold/78">Brand Settings</p>
        <h1 className="mt-3 text-4xl">Change the logo and basic storefront details</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-cream/70">
          Update the logo, brand name, contact info, and core homepage text from one place.
        </p>
      </div>
      <div className="panel premium-border p-6 sm:p-8">
        <SiteSettingsForm settings={settings} errorMessage={status === "error" ? message : undefined} />
      </div>
    </div>
  );
}
