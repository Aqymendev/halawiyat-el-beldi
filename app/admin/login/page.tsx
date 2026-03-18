import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/admin/login-form";
import { BrandMark } from "@/components/layout/brand-mark";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Admin Login"
};

export default function AdminLoginPage() {
  const configured = isSupabaseConfigured();

  return (
    <section className="shell section-spacing">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="panel premium-border space-y-6 p-8 sm:p-10">
          <BrandMark />
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-brand-gold/80">Admin Access</p>
            <h1 className="mt-3 text-4xl">Sign in to manage products</h1>
            <p className="mt-3 text-sm leading-7 text-brand-cream/70">
              Add, update, feature, reorder, and remove products without editing code.
            </p>
          </div>
          {configured ? (
            <LoginForm />
          ) : (
            <div className="rounded-[1.5rem] border border-brand-gold/18 bg-brand-cream/5 p-5 text-sm leading-7 text-brand-cream/70">
              Supabase is not configured yet. Add the environment variables from <code>.env.example</code>, run the SQL
              schema in Supabase, and then create your first admin user.
            </div>
          )}
          <Button asChild variant="secondary" className="w-full">
            <Link href="/">Back to Storefront</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
