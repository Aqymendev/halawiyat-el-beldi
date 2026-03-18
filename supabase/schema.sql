create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  short_description text not null,
  description text not null,
  price_label text,
  price_per_kg numeric(10,2),
  category text not null,
  featured boolean not null default false,
  available boolean not null default true,
  image_url text not null,
  gallery_images text[] not null default '{}',
  sort_order integer not null default 0,
  whatsapp_message text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.products add column if not exists price_per_kg numeric(10,2);

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  brand_name text not null,
  brand_subtitle text not null,
  description text not null,
  whatsapp_number text not null,
  instagram_url text not null,
  location_label text not null,
  contact_headline text not null,
  logo_url text not null,
  hero_title text not null,
  hero_accent text not null,
  hero_description text not null,
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists products_slug_idx on public.products (slug);
create index if not exists products_category_idx on public.products (category);
create index if not exists products_featured_idx on public.products (featured);
create index if not exists products_available_idx on public.products (available);
create index if not exists products_sort_order_idx on public.products (sort_order);

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Admins can view themselves" on public.admin_users;
drop policy if exists "Users can view themselves" on public.admin_users;
create policy "Users can view themselves"
on public.admin_users
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users can insert themselves" on public.admin_users;
create policy "Users can insert themselves"
on public.admin_users
for insert
to authenticated
with check (
  user_id = auth.uid()
);

drop policy if exists "Users can update themselves" on public.admin_users;
create policy "Users can update themselves"
on public.admin_users
for update
to authenticated
using (
  user_id = auth.uid()
)
with check (
  user_id = auth.uid()
);

drop policy if exists "Users can delete themselves" on public.admin_users;
create policy "Users can delete themselves"
on public.admin_users
for delete
to authenticated
using (
  user_id = auth.uid()
);

drop policy if exists "Existing admins can manage admin users" on public.admin_users;

drop policy if exists "Admins can read all products" on public.products;
drop policy if exists "Authenticated users can read all products" on public.products;
create policy "Authenticated users can read all products"
on public.products
for select
to authenticated
using (
  true
);

drop policy if exists "Admins can insert products" on public.products;
drop policy if exists "Authenticated users can insert products" on public.products;
create policy "Authenticated users can insert products"
on public.products
for insert
to authenticated
with check (
  true
);

drop policy if exists "Admins can update products" on public.products;
drop policy if exists "Authenticated users can update products" on public.products;
create policy "Authenticated users can update products"
on public.products
for update
to authenticated
using (
  true
)
with check (
  true
);

drop policy if exists "Admins can delete products" on public.products;
drop policy if exists "Authenticated users can delete products" on public.products;
create policy "Authenticated users can delete products"
on public.products
for delete
to authenticated
using (
  true
);

drop policy if exists "Admins can upload product images" on storage.objects;
drop policy if exists "Authenticated users can upload product images" on storage.objects;
create policy "Authenticated users can upload product images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'product-images'
);

drop policy if exists "Admins can update product images" on storage.objects;
drop policy if exists "Authenticated users can update product images" on storage.objects;
create policy "Authenticated users can update product images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'product-images'
)
with check (
  bucket_id = 'product-images'
);

drop policy if exists "Admins can delete product images" on storage.objects;
drop policy if exists "Authenticated users can delete product images" on storage.objects;
create policy "Authenticated users can delete product images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'product-images'
);

drop policy if exists "Admins can read all products" on public.products;
drop policy if exists "Admins can insert products" on public.products;
drop policy if exists "Admins can update products" on public.products;
drop policy if exists "Admins can delete products" on public.products;
drop policy if exists "Admins can upload product images" on storage.objects;
drop policy if exists "Admins can update product images" on storage.objects;
drop policy if exists "Admins can delete product images" on storage.objects;
drop policy if exists "Existing admins can manage admin users" on public.admin_users;

drop policy if exists "Public can read available products" on public.products;
create policy "Public can read available products"
on public.products
for select
to public
using (available = true);

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings
for select
to public
using (true);

drop policy if exists "Authenticated users can insert site settings" on public.site_settings;
create policy "Authenticated users can insert site settings"
on public.site_settings
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update site settings" on public.site_settings;
create policy "Authenticated users can update site settings"
on public.site_settings
for update
to authenticated
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
on storage.objects
for select
to public
using (bucket_id = 'product-images');

insert into public.site_settings (
  id,
  brand_name,
  brand_subtitle,
  description,
  whatsapp_number,
  instagram_url,
  location_label,
  contact_headline,
  logo_url,
  hero_title,
  hero_accent,
  hero_description
)
values (
  1,
  'Halawiyat El Beldi',
  'Moroccan Pastry Atelier',
  'Traditional Moroccan pastries, crafted with elegance for gifting, gatherings, and meaningful celebrations.',
  '212600000000',
  'https://instagram.com/your-handle',
  'Casablanca, Morocco',
  'Handmade sweets for gifts, gatherings, and special moments.',
  '/brand/brand-mark.svg',
  'Traditional Moroccan pastries,',
  'crafted with elegance.',
  'Halawiyat El Beldi presents handmade sweets for refined gifting, warm family gatherings, Ramadan tables, weddings, and special moments that deserve beauty.'
)
on conflict (id) do nothing;
