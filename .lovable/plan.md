# Plan: Connect Lovable Cloud + Store Contact Inquiries

## Goal
Add a real backend to the Studio Thumbcrafter portfolio by enabling Lovable Cloud, then use it to save every contact-form submission so inquiries are never lost and can be reviewed later.

## What will change
1. **Enable Lovable Cloud** — this provisions a managed PostgreSQL database, auth, and serverless functions with zero external accounts.
2. **Create an `inquiries` table** — stores name, email, video details, requirements, and submission timestamp. Public can INSERT; only the owner can read.
3. **Update the contact form** — keep EmailJS as the email delivery, but also save the same inquiry to the database via a server function.
4. **Add a simple admin view** (optional, gated to your email) — a protected page at `/admin` where you can sign in and view all submitted inquiries.

## Why this approach
- Lovable Cloud is the default backend for Lovable projects — no Supabase dashboard needed.
- The contact form already works through EmailJS; adding a database copy gives you a backup and an audit log.
- Keeping EmailJS means you still get emailed immediately while the database stores the record.

## Steps
1. Enable Lovable Cloud for this project.
2. Write a migration that creates `public.inquiries` with columns: `id`, `name`, `email`, `details`, `requirements`, `created_at`.
3. Add RLS policy: anyone can insert; only the project owner can select.
4. Create `src/lib/inquiries.functions.ts` with a `submitInquiry` server function that inserts into the table.
5. Update `src/routes/index.tsx` contact form to call `submitInquiry` alongside EmailJS.
6. (Optional) Create `src/routes/_authenticated/admin/index.tsx` to list inquiries after signing in.
7. Verify by submitting a test inquiry and confirming it appears in the admin view or database.

## Notes
- No payment integration is needed for this.
- No user accounts are required for visitors; only you need an account to view stored inquiries.
- The public-facing portfolio stays unchanged except for the extra save step.
