import Link from "next/link";
import { PencilLine } from "lucide-react";

import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import type { Product } from "@/types/product";

export function ProductsTable({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <EmptyState
        title="No products yet"
        description="Add your first pastry to start populating the storefront."
        ctaHref="/admin/products/new"
        ctaLabel="Add Product"
      />
    );
  }

  return (
    <div className="panel premium-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-brand-gold/10 bg-brand-cream/5 text-brand-cream/70">
            <tr>
              <th className="px-5 py-4 font-medium">Product</th>
              <th className="px-5 py-4 font-medium">Category</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Featured</th>
              <th className="px-5 py-4 font-medium">Order</th>
              <th className="px-5 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-brand-gold/8 last:border-b-0">
                <td className="px-5 py-4">
                  <div>
                    <p className="font-medium text-brand-cream">{product.name}</p>
                    <p className="mt-1 text-xs text-brand-cream/55">{product.slug}</p>
                  </div>
                </td>
                <td className="px-5 py-4 text-brand-cream/72">{product.category}</td>
                <td className="px-5 py-4">
                  <Badge variant={product.available ? "success" : "danger"}>
                    {product.available ? "Available" : "Unavailable"}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <Badge variant={product.featured ? "featured" : "muted"}>
                    {product.featured ? "Featured" : "Standard"}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-brand-cream/72">{product.sortOrder}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="inline-flex items-center gap-2 rounded-full border border-brand-gold/20 px-4 py-2 text-xs font-medium text-brand-cream hover:border-brand-gold/45 hover:bg-brand-cream/10"
                    >
                      <PencilLine className="h-4 w-4" />
                      Edit
                    </Link>
                    <DeleteProductButton id={product.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
