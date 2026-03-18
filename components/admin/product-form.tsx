"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

import { upsertProductAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categoryOptions } from "@/lib/site";
import type { Product } from "@/types/product";

const MAX_FILE_SIZE_MB = 3;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_TOTAL_UPLOAD_MB = 15;
const MAX_TOTAL_UPLOAD_BYTES = MAX_TOTAL_UPLOAD_MB * 1024 * 1024;

export function ProductForm({
  product,
  mode,
  errorMessage
}: {
  product?: Product | null;
  mode: "create" | "edit";
  errorMessage?: string;
}) {
  const returnTo = mode === "create" ? "/admin/products/new" : `/admin/products/${product?.id}/edit`;
  const galleryText = product?.galleryImages.join("\n") || "";
  const [clientError, setClientError] = useState<string | null>(null);

  const currentError = useMemo(() => clientError || errorMessage || null, [clientError, errorMessage]);

  function validateFileSize(file: File) {
    return file.size <= MAX_FILE_SIZE_BYTES;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement | null)?.value?.trim() || "";
    const shortDescription =
      (form.elements.namedItem("shortDescription") as HTMLTextAreaElement | null)?.value?.trim() || "";
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement | null)?.value?.trim() || "";
    const imageInput = form.elements.namedItem("imageFile") as HTMLInputElement | null;
    const galleryInput = form.elements.namedItem("galleryFiles") as HTMLInputElement | null;

    if (name.length < 2) {
      event.preventDefault();
      setClientError("Product name should be at least 2 characters.");
      return;
    }

    if (shortDescription.length < 10) {
      event.preventDefault();
      setClientError("Short description should be at least 10 characters.");
      return;
    }

    if (description.length < 20) {
      event.preventDefault();
      setClientError("Long description should be at least 20 characters.");
      return;
    }

    const mainFile = imageInput?.files?.[0];

    if (mainFile && !validateFileSize(mainFile)) {
      event.preventDefault();
      setClientError(`Main image must be ${MAX_FILE_SIZE_MB} MB or smaller.`);
      return;
    }

    const galleryFiles = Array.from(galleryInput?.files || []);
    const oversizedGalleryFile = galleryFiles.find((file) => !validateFileSize(file));

    if (oversizedGalleryFile) {
      event.preventDefault();
      setClientError(`Each gallery image must be ${MAX_FILE_SIZE_MB} MB or smaller.`);
      return;
    }

    const totalUploadBytes = (mainFile?.size || 0) + galleryFiles.reduce((sum, file) => sum + file.size, 0);

    if (totalUploadBytes > MAX_TOTAL_UPLOAD_BYTES) {
      event.preventDefault();
      setClientError(`The total upload size must stay under ${MAX_TOTAL_UPLOAD_MB} MB.`);
      return;
    }

    setClientError(null);
  }

  return (
    <form action={upsertProductAction} className="space-y-8" onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={product?.id || ""} />
      <input type="hidden" name="existingImageUrl" value={product?.imageUrl || ""} />
      <input type="hidden" name="returnTo" value={returnTo} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm text-brand-cream/80">
            Product Name
          </label>
          <Input id="name" name="name" defaultValue={product?.name} required minLength={2} />
        </div>
        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm text-brand-cream/80">
            Slug
          </label>
          <Input id="slug" name="slug" defaultValue={product?.slug} placeholder="Auto-generated if left blank" />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_0.6fr]">
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm text-brand-cream/80">
            Category
          </label>
          <Input id="category" name="category" defaultValue={product?.category} list="category-options" required />
          <datalist id="category-options">
            {categoryOptions.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
        </div>
        <div className="space-y-2">
          <label htmlFor="pricePerKg" className="text-sm text-brand-cream/80">
            Price For 1 kg
          </label>
          <Input
            id="pricePerKg"
            name="pricePerKg"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.pricePerKg ?? ""}
            placeholder="90"
          />
          <p className="text-xs text-brand-cream/55">Used to auto-calculate 200 g, 500 g, 1 kg, and custom orders.</p>
        </div>
        <div className="space-y-2">
          <label htmlFor="sortOrder" className="text-sm text-brand-cream/80">
            Sort Order
          </label>
          <Input id="sortOrder" name="sortOrder" type="number" min="0" defaultValue={product?.sortOrder ?? 0} required />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="priceLabel" className="text-sm text-brand-cream/80">
          Optional Price Label
        </label>
        <Input
          id="priceLabel"
          name="priceLabel"
          defaultValue={product?.priceLabel || ""}
          placeholder="Use only for boxed or fixed-price items"
        />
        <p className="text-xs text-brand-cream/55">Leave empty for products sold by grammage.</p>
      </div>
      <div className="space-y-2">
        <label htmlFor="shortDescription" className="text-sm text-brand-cream/80">
          Short Description
        </label>
        <Textarea
          id="shortDescription"
          name="shortDescription"
          defaultValue={product?.shortDescription}
          className="min-h-[120px]"
          required
          minLength={10}
        />
        <p className="text-xs text-brand-cream/55">Minimum 10 characters.</p>
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm text-brand-cream/80">
          Long Description
        </label>
        <Textarea id="description" name="description" defaultValue={product?.description} required minLength={20} />
        <p className="text-xs text-brand-cream/55">Minimum 20 characters.</p>
      </div>
      <div className="space-y-2">
        <label htmlFor="whatsappMessage" className="text-sm text-brand-cream/80">
          WhatsApp Message
        </label>
        <Textarea
          id="whatsappMessage"
          name="whatsappMessage"
          defaultValue={product?.whatsappMessage || ""}
          className="min-h-[110px]"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-[1.75rem] border border-brand-gold/18 bg-brand-black/25 p-5">
          <div className="space-y-2">
            <label htmlFor="imageFile" className="text-sm text-brand-cream/80">
              Main Product Image
            </label>
            <Input id="imageFile" name="imageFile" type="file" accept="image/*" />
            <p className="text-xs text-brand-cream/55">
              Upload a new main image. Leave empty when editing to keep the current image. Maximum file size: 3 MB.
            </p>
          </div>
          {product?.imageUrl ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-brand-gold/15">
              <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
            </div>
          ) : null}
        </div>
        <div className="space-y-3 rounded-[1.75rem] border border-brand-gold/18 bg-brand-black/25 p-5">
          <div className="space-y-2">
            <label htmlFor="galleryFiles" className="text-sm text-brand-cream/80">
              Gallery Images
            </label>
            <Input id="galleryFiles" name="galleryFiles" type="file" accept="image/*" multiple />
            <p className="text-xs text-brand-cream/55">
              Each gallery image must be 3 MB or smaller. Total files in one submission must stay under 15 MB.
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="existingGalleryImages" className="text-sm text-brand-cream/80">
              Existing Gallery URLs
            </label>
            <Textarea
              id="existingGalleryImages"
              name="existingGalleryImages"
              defaultValue={galleryText}
              className="min-h-[180px]"
              placeholder="One image URL per line"
            />
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm text-brand-cream/80">Availability</p>
          <Select name="available" defaultValue={product?.available ? "on" : "off"}>
            <option value="on">Available</option>
            <option value="off">Unavailable</option>
          </Select>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-brand-cream/80">Featured</p>
          <Select name="featured" defaultValue={product?.featured ? "on" : "off"}>
            <option value="on">Featured</option>
            <option value="off">Not featured</option>
          </Select>
        </div>
      </div>
      {currentError ? <p className="text-sm text-red-300">{currentError}</p> : null}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit">{mode === "create" ? "Create Product" : "Save Changes"}</Button>
        <Button variant="secondary" asChild>
          <Link href="/admin">Back to Dashboard</Link>
        </Button>
      </div>
    </form>
  );
}
