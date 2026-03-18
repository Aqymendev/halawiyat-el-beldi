import Link from "next/link";

import { ProductsTable } from "@/components/admin/products-table";
import { Button } from "@/components/ui/button";
import { StatusBanner } from "@/components/ui/status-banner";
import { getAdminProducts } from "@/lib/products";

function getStatusMessage(status?: string) {
  if (status === "created") {
    return { status: "success" as const, message: "Product created successfully." };
  }
  if (status === "updated") {
    return { status: "success" as const, message: "Product updated successfully." };
  }
  if (status === "deleted") {
    return { status: "success" as const, message: "Product deleted successfully." };
  }
  if (status === "delete-error") {
    return { status: "error" as const, message: "There was a problem deleting that product." };
  }
  return { status: "info" as const, message: null };
}

export default async function AdminDashboardPage({
  searchParams
}: {
  searchParams: Promise<{ status?: string; message?: string }>;
}) {
  const { status, message } = await searchParams;
  const products = await getAdminProducts();
  const banner = getStatusMessage(status);
  const resolvedMessage = status === "delete-error" && message ? message : banner.message;

  return (
    <div className="space-y-6">
      <StatusBanner status={banner.status} message={resolvedMessage} />
      <div className="panel premium-border flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold/78">Admin Dashboard</p>
          <h1 className="mt-3 text-4xl">Manage products and storefront visibility</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-cream/70">
            Control categories, featured flags, availability, display order, copy, and product imagery from one place.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductsTable products={products} />
    </div>
  );
}
