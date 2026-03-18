import { notFound } from "next/navigation";

import { ProductForm } from "@/components/admin/product-form";
import { StatusBanner } from "@/components/ui/status-banner";
import { getAdminProductById } from "@/lib/products";

export default async function EditProductPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const product = await getAdminProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="panel premium-border p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-gold/78">Edit Product</p>
        <h1 className="mt-3 text-4xl">{product.name}</h1>
      </div>
      <StatusBanner status="error" message={error ?? null} />
      <div className="panel premium-border p-6 sm:p-8">
        <ProductForm product={product} mode="edit" errorMessage={error} />
      </div>
    </div>
  );
}
