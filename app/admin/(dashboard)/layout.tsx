import { redirect } from "next/navigation";

import { logoutAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getCurrentUser, isCurrentUserAdmin } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function AdminDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <section className="shell section-spacing">
        <div className="panel premium-border max-w-3xl p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/80">Setup Required</p>
          <h1 className="mt-4 text-4xl">Configure Supabase to unlock the admin dashboard</h1>
          <p className="mt-4 text-sm leading-7 text-brand-cream/70">
            Add the environment variables, run the SQL schema, and create an admin user. The storefront can still use
            sample data until that setup is complete.
          </p>
        </div>
      </section>
    );
  }

  const user = await getCurrentUser();
  const isAdmin = await isCurrentUserAdmin();

  if (!user) {
    redirect("/admin/login");
  }

  if (!isAdmin) {
    return (
      <section className="shell section-spacing">
        <div className="panel premium-border max-w-3xl p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/80">Access Restricted</p>
          <h1 className="mt-4 text-4xl">You are signed in, but this account is not recognized as an admin</h1>
          <p className="mt-4 text-sm leading-7 text-brand-cream/70">
            Signed in as <strong>{user.email}</strong>. Make sure this exact user ID exists in
            <code className="mx-1">public.admin_users</code>, then sign out and try again.
          </p>
          <form action={logoutAction} className="mt-6">
            <Button type="submit" variant="secondary">
              Sign Out
            </Button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="shell section-spacing">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <div>{children}</div>
      </div>
    </section>
  );
}
