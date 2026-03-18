import Link from "next/link";
import { LayoutDashboard, LogOut, Palette, PlusCircle, Store } from "lucide-react";

import { logoutAction } from "@/app/admin/actions";
import { BrandMark } from "@/components/layout/brand-mark";
import { Button } from "@/components/ui/button";

export function AdminSidebar() {
  return (
    <aside className="panel premium-border h-fit p-5">
      <BrandMark size="sm" />
      <div className="mt-8 space-y-2">
        <Link
          href="/admin"
          className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm text-brand-cream/75 transition hover:border-brand-gold/20 hover:bg-brand-cream/5 hover:text-brand-cream"
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm text-brand-cream/75 transition hover:border-brand-gold/20 hover:bg-brand-cream/5 hover:text-brand-cream"
        >
          <PlusCircle className="h-4 w-4" />
          Add Product
        </Link>
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm text-brand-cream/75 transition hover:border-brand-gold/20 hover:bg-brand-cream/5 hover:text-brand-cream"
        >
          <Palette className="h-4 w-4" />
          Brand Settings
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm text-brand-cream/75 transition hover:border-brand-gold/20 hover:bg-brand-cream/5 hover:text-brand-cream"
        >
          <Store className="h-4 w-4" />
          View Storefront
        </Link>
      </div>
      <form action={logoutAction} className="mt-8">
        <Button type="submit" variant="secondary" className="w-full justify-center">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </form>
    </aside>
  );
}
