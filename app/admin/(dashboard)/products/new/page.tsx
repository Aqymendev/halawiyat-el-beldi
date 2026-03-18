import { ProductForm } from "@/components/admin/product-form";
import { StatusBanner } from "@/components/ui/status-banner";

export default async function NewProductPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="space-y-6">
      <div className="panel premium-border p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-gold/78">Add Product</p>
        <h1 className="mt-3 text-4xl">Create a new pastry listing</h1>
      </div>
      <StatusBanner status="error" message={error ?? null} />
      <div className="panel premium-border p-6 sm:p-8">
        <ProductForm mode="create" errorMessage={error} />
      </div>
    </div>
  );
}
