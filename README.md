# Halawiyat El Beldi

Premium Moroccan pastry showcase built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide React, and Supabase.

## Highlights

- Luxury storefront inspired by the uploaded logo palette and Moroccan arch framing
- WhatsApp-first ordering flow with reusable prefilled message helper
- Product gallery, category filter, search, sort, featured badges, and detail pages
- Protected admin dashboard with login, product CRUD, image uploads, featured toggles, availability control, and sort order management
- Supabase SQL schema with RLS policies and storage bucket policies
- Seed data and local SVG artwork so the site feels complete immediately
- SEO metadata, sitemap, robots, semantic structure, and responsive layouts

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn-style UI components
- Framer Motion
- Lucide React
- Supabase Auth, Database, and Storage

## Folder Structure

```text
app/
components/
lib/
public/
supabase/
styles/
types/
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

3. Create a Supabase project.

4. In the Supabase SQL editor, run:

- `supabase/schema.sql`
- `supabase/seed.sql`

5. Create an admin auth user in Supabase:

- Open Authentication -> Users
- Create a user with email/password
- Copy the user UUID
- Insert that UUID into `public.admin_users`

Example:

```sql
insert into public.admin_users (user_id)
values ('YOUR_AUTH_USER_UUID');
```

6. Start the development server:

```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See [.env.example](./.env.example).

- `NEXT_PUBLIC_SITE_URL`: public site URL for metadata and sitemap
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: current public client key
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: legacy public client key fallback
- `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET`: storage bucket name for product images
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: WhatsApp number used in order links
- `NEXT_PUBLIC_INSTAGRAM_URL`: Instagram profile link
- `NEXT_PUBLIC_LOCATION_LABEL`: location shown in the contact section

## Admin Usage Guide

1. Go to `/admin/login`
2. Sign in with the email/password that exists in Supabase Auth
3. Make sure the same auth user exists in `public.admin_users`
4. Open the dashboard to:
   - add a product
   - upload a main image
   - upload optional gallery images
   - edit descriptions and WhatsApp message text
   - mark items featured or unavailable
   - set `sortOrder` to control display order
   - delete products with confirmation

## Supabase Notes

### Database

- `public.products` stores storefront products
- `public.admin_users` gates admin-only product management

### Storage

- Bucket name defaults to `product-images`
- The schema creates the bucket and adds public read plus admin write policies
- Main images and gallery uploads are stored under product-specific folders

### RLS

- Public visitors can read products where `available = true`
- Admin users can read all products
- Only admin users can insert, update, and delete products

## Seed Data Notes

- Seed data points to local `/public/images/products/*.svg` artwork
- Once you upload real images in the admin dashboard, new image URLs will come from Supabase Storage
- The storefront can also fall back to local sample data if Supabase is not configured yet

## Deployment Notes

### Vercel

1. Push the project to GitHub
2. Import it into Vercel
3. Add the same environment variables from `.env.local`
4. Run the Supabase SQL schema and seed files once
5. Redeploy after environment variables are saved

### Supabase

- Use email/password authentication
- Keep the anon key in client env vars
- Do not expose the service role key in the app

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Command Guide

- `npm run dev`: starts the local Next.js development server
- `npm run build`: creates the production build
- `npm run start`: serves the production build locally
- `npm run lint`: runs Next.js ESLint checks
- `npm run typecheck`: runs TypeScript without emitting files
