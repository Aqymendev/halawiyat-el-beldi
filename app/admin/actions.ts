"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { normalizeLines, slugify } from "@/lib/utils";
import { getSupabaseUrl } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

type LoginState = {
  status: "idle" | "error";
  message?: string;
};

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters.")
});

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Product name is required."),
  slug: z.string().optional(),
  shortDescription: z.string().min(10, "Short description should be at least 10 characters."),
  description: z.string().min(20, "Description should be at least 20 characters."),
  priceLabel: z.string().optional(),
  pricePerKg: z.union([z.coerce.number().positive("Price per 1 kg must be greater than 0."), z.literal("")]).optional(),
  category: z.string().min(2, "Category is required."),
  sortOrder: z.coerce.number().min(0, "Sort order must be 0 or higher."),
  whatsappMessage: z.string().optional(),
  featured: z.boolean(),
  available: z.boolean(),
  existingImageUrl: z.string().optional(),
  returnTo: z.string().min(1)
});

const siteSettingsSchema = z.object({
  brandName: z.string().min(2, "Brand name is required."),
  brandSubtitle: z.string().min(2, "Brand subtitle is required."),
  description: z.string().min(20, "Site description should be at least 20 characters."),
  whatsappNumber: z.string().min(8, "WhatsApp number is required."),
  instagramUrl: z.string().url("Enter a valid Instagram URL."),
  locationLabel: z.string().min(2, "Location is required."),
  contactHeadline: z.string().min(10, "Contact headline should be at least 10 characters."),
  heroTitle: z.string().min(5, "Hero title is required."),
  heroAccent: z.string().min(3, "Hero accent is required."),
  heroDescription: z.string().min(20, "Hero description should be at least 20 characters."),
  existingLogoUrl: z.string().optional()
});

function bucketName() {
  return process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "product-images";
}

function getStoragePublicPrefix() {
  const supabaseUrl = getSupabaseUrl();

  if (!supabaseUrl) {
    return null;
  }

  return `${supabaseUrl}/storage/v1/object/public/${bucketName()}/`;
}

function getStoragePathFromUrl(url: string) {
  const publicPrefix = getStoragePublicPrefix();

  if (!publicPrefix || !url.startsWith(publicPrefix)) {
    return null;
  }

  return decodeURIComponent(url.slice(publicPrefix.length));
}

async function deleteProductImages(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  imageUrls: string[]
) {
  const storagePaths = imageUrls
    .map((url) => getStoragePathFromUrl(url))
    .filter((path): path is string => Boolean(path));

  if (!storagePaths.length) {
    return;
  }

  const { error } = await supabase.storage.from(bucketName()).remove(storagePaths);

  if (error) {
    throw new Error(`Product was not deleted because storage cleanup failed: ${error.message}`);
  }
}

type ProductImagesRecord = Pick<Database["public"]["Tables"]["products"]["Row"], "image_url" | "gallery_images">;

async function requireAdminSupabase() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured yet. Add your environment variables first.");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You need to log in before using the admin dashboard.");
  }

  return supabase;
}

async function uploadFile(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>, file: File, folder: string) {
  const fileExtension = file.name.split(".").pop() || "jpg";
  const filePath = `${folder}/${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
  const arrayBuffer = await file.arrayBuffer();

  const { error } = await supabase.storage.from(bucketName()).upload(filePath, arrayBuffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false
  });

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl }
  } = supabase.storage.from(bucketName()).getPublicUrl(filePath);

  return publicUrl;
}

async function deleteStorageFileIfManaged(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  url?: string | null
) {
  if (!url) {
    return;
  }

  const storagePath = getStoragePathFromUrl(url);

  if (!storagePath) {
    return;
  }

  const { error } = await supabase.storage.from(bucketName()).remove([storagePath]);

  if (error) {
    throw new Error(`Storage cleanup failed: ${error.message}`);
  }
}

function buildProductRedirect(returnTo: string, params: Record<string, string>) {
  const search = new URLSearchParams(params);
  return `${returnTo}?${search.toString()}`;
}

function isRedirectLikeError(error: unknown): error is { digest: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  if (!isSupabaseConfigured()) {
    return {
      status: "error",
      message: "Supabase is not configured yet. Add your project keys first."
    };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return {
      status: "error",
      message: error.message
    };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      status: "error",
      message: "Login succeeded but no user session was created."
    };
  }

  redirect("/admin");
}

export async function logoutAction() {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function upsertProductAction(formData: FormData) {
  const returnTo = String(formData.get("returnTo") || "/admin");

  try {
    const parsed = productSchema.safeParse({
      id: formData.get("id") || undefined,
      name: formData.get("name"),
      slug: formData.get("slug") || undefined,
      shortDescription: formData.get("shortDescription"),
      description: formData.get("description"),
      priceLabel: formData.get("priceLabel") || undefined,
      pricePerKg: String(formData.get("pricePerKg") || ""),
      category: formData.get("category"),
      sortOrder: formData.get("sortOrder"),
      whatsappMessage: formData.get("whatsappMessage") || undefined,
      featured: formData.get("featured") === "on",
      available: formData.get("available") === "on",
      existingImageUrl: formData.get("existingImageUrl") || undefined,
      returnTo
    });

    if (!parsed.success) {
      redirect(
        buildProductRedirect(returnTo, {
          error: parsed.error.issues[0]?.message || "Unable to save the product."
        })
      );
    }

    const supabase = await requireAdminSupabase();
    const imageFile = formData.get("imageFile");
    const galleryFiles = formData.getAll("galleryFiles");
    const existingGalleryImages = normalizeLines(String(formData.get("existingGalleryImages") || ""));

    let imageUrl = parsed.data.existingImageUrl || "";

    if (imageFile instanceof File && imageFile.size > 0) {
      imageUrl = await uploadFile(
        supabase,
        imageFile,
        `${parsed.data.slug || slugify(parsed.data.name) || "product"}/main`
      );
    }

    if (!imageUrl) {
      redirect(buildProductRedirect(returnTo, { error: "A main product image is required." }));
    }

    const uploadedGalleryImages: string[] = [];

    for (const file of galleryFiles) {
      if (file instanceof File && file.size > 0) {
        const url = await uploadFile(
          supabase,
          file,
          `${parsed.data.slug || slugify(parsed.data.name) || "product"}/gallery`
        );
        uploadedGalleryImages.push(url);
      }
    }

    const payload: Database["public"]["Tables"]["products"]["Insert"] = {
      name: parsed.data.name,
      slug: parsed.data.slug?.trim() || slugify(parsed.data.name),
      short_description: parsed.data.shortDescription,
      description: parsed.data.description,
      price_label: parsed.data.priceLabel?.trim() || null,
      price_per_kg: typeof parsed.data.pricePerKg === "number" ? parsed.data.pricePerKg : null,
      category: parsed.data.category,
      featured: parsed.data.featured,
      available: parsed.data.available,
      image_url: imageUrl,
      gallery_images: [...existingGalleryImages, ...uploadedGalleryImages],
      sort_order: parsed.data.sortOrder,
      whatsapp_message:
        parsed.data.whatsappMessage?.trim() || `السلام عليكم، أود طلب ${parsed.data.name}.`
    };

    if (parsed.data.id) {
      const { error } = await supabase.from("products").update(payload as never).eq("id", parsed.data.id);

      if (error) {
        redirect(buildProductRedirect(returnTo, { error: error.message }));
      }

      revalidatePath("/");
      revalidatePath("/ar");
      revalidatePath("/products");
      revalidatePath("/ar/products");
      revalidatePath(`/products/${payload.slug}`);
      revalidatePath(`/ar/products/${payload.slug}`);
      revalidatePath("/admin");
      redirect("/admin?status=updated");
    }

    const { error } = await supabase.from("products").insert(payload as never);

    if (error) {
      redirect(buildProductRedirect(returnTo, { error: error.message }));
    }

    revalidatePath("/");
    revalidatePath("/ar");
    revalidatePath("/products");
    revalidatePath("/ar/products");
    revalidatePath(`/ar/products/${payload.slug}`);
    revalidatePath("/admin");
    redirect("/admin?status=created");
  } catch (error) {
    if (isRedirectLikeError(error)) {
      throw error;
    }

    const message = error instanceof Error ? error.message : "Unexpected error.";
    redirect(buildProductRedirect(returnTo, { error: message }));
  }
}

export async function deleteProductAction(formData: FormData) {
  const id = String(formData.get("id") || "");

  if (!id) {
    redirect("/admin?status=delete-error&message=Missing product id.");
  }

  try {
    const supabase = await requireAdminSupabase();
    const { data, error: fetchError } = await supabase
      .from("products")
      .select("image_url, gallery_images")
      .eq("id", id)
      .maybeSingle();

    const product = data as ProductImagesRecord | null;

    if (fetchError) {
      redirect(`/admin?status=delete-error&message=${encodeURIComponent(fetchError.message)}`);
    }

    if (!product) {
      redirect("/admin?status=delete-error&message=Product not found.");
    }

    const imageUrls = [product.image_url, ...(product.gallery_images || [])];
    await deleteProductImages(supabase, imageUrls);

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      redirect(`/admin?status=delete-error&message=${encodeURIComponent(error.message)}`);
    }

    revalidatePath("/");
    revalidatePath("/ar");
    revalidatePath("/fr");
    revalidatePath("/en");
    revalidatePath("/products");
    revalidatePath("/admin");
    redirect("/admin?status=deleted");
  } catch (error) {
    if (isRedirectLikeError(error)) {
      throw error;
    }

    const message = error instanceof Error ? error.message : "Unexpected delete error.";
    redirect(`/admin?status=delete-error&message=${encodeURIComponent(message)}`);
  }
}

export async function updateSiteSettingsAction(formData: FormData) {
  try {
    const parsed = siteSettingsSchema.safeParse({
      brandName: formData.get("brandName"),
      brandSubtitle: formData.get("brandSubtitle"),
      description: formData.get("description"),
      whatsappNumber: formData.get("whatsappNumber"),
      instagramUrl: formData.get("instagramUrl"),
      locationLabel: formData.get("locationLabel"),
      contactHeadline: formData.get("contactHeadline"),
      heroTitle: formData.get("heroTitle"),
      heroAccent: formData.get("heroAccent"),
      heroDescription: formData.get("heroDescription"),
      existingLogoUrl: formData.get("existingLogoUrl") || undefined
    });

    if (!parsed.success) {
      redirect(`/admin/settings?status=error&message=${encodeURIComponent(parsed.error.issues[0]?.message || "Unable to save settings.")}`);
    }

    const supabase = await requireAdminSupabase();
    const logoFile = formData.get("logoFile");
    let logoUrl = parsed.data.existingLogoUrl || "";

    if (logoFile instanceof File && logoFile.size > 0) {
      logoUrl = await uploadFile(supabase, logoFile, "branding/logo");

      if (parsed.data.existingLogoUrl && parsed.data.existingLogoUrl !== logoUrl) {
        await deleteStorageFileIfManaged(supabase, parsed.data.existingLogoUrl);
      }
    }

    const payload: Database["public"]["Tables"]["site_settings"]["Insert"] = {
      id: 1,
      brand_name: parsed.data.brandName,
      brand_subtitle: parsed.data.brandSubtitle,
      description: parsed.data.description,
      whatsapp_number: parsed.data.whatsappNumber,
      instagram_url: parsed.data.instagramUrl,
      location_label: parsed.data.locationLabel,
      contact_headline: parsed.data.contactHeadline,
      logo_url: logoUrl || "/brand/brand-mark.svg",
      hero_title: parsed.data.heroTitle,
      hero_accent: parsed.data.heroAccent,
      hero_description: parsed.data.heroDescription
    };

    const { error } = await supabase.from("site_settings").upsert(payload as never);

    if (error) {
      redirect(`/admin/settings?status=error&message=${encodeURIComponent(error.message)}`);
    }

    revalidatePath("/");
    revalidatePath("/ar");
    revalidatePath("/fr");
    revalidatePath("/en");
    revalidatePath("/admin/settings");
    redirect("/admin/settings?status=saved");
  } catch (error) {
    if (isRedirectLikeError(error)) {
      throw error;
    }

    const message = error instanceof Error ? error.message : "Unexpected settings error.";
    redirect(`/admin/settings?status=error&message=${encodeURIComponent(message)}`);
  }
}
