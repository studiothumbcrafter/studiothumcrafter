# Plan: Add EmailJS to the Contact Form

## Goal
Replace the current mailto-based contact form on the Studio Thumbcrafter portfolio with a real EmailJS submission that sends inquiries directly to studiothumbcrafter@gmail.com.

## What will change
- Install the EmailJS browser SDK (`@emailjs/browser`).
- Update the contact form in `src/routes/index.tsx` so it calls `emailjs.sendForm` instead of opening a mailto link.
- Add a simple success/error state to the form (no toast library needed; inline message is enough).
- Keep the same visual style and form fields.
- Store the EmailJS public key, service ID, and template ID in environment variables so they can be updated without touching code.

## Credentials needed
EmailJS works with three values from your EmailJS dashboard:
- **Public key** — safe to expose in the browser bundle (publishable key).
- **Service ID** — identifies the email service.
- **Template ID** — identifies the email template.

The plan assumes you will create an EmailJS service + template that matches the form fields: `name`, `email`, `details`, and `requirements`. The template can send to `studiothumbcrafter@gmail.com`.

## Technical steps
1. Add `@emailjs/browser` to project dependencies.
2. In `src/routes/index.tsx`:
   - Replace `submitInquiry` with an async handler using `emailjs.sendForm`.
   - Add `useState` for `status: 'idle' | 'sending' | 'success' | 'error'`.
   - Show a short inline confirmation after success and reset the form.
   - Disable the submit button while sending.
3. Read EmailJS config from `import.meta.env` (Vite-style env vars):
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
4. Add example env entries to `.env.example` (no real values).
5. Verify the form in the live preview by submitting a test inquiry.

## Notes
- This keeps the site static/frontend-only; no backend or database is required.
- If EmailJS is unavailable or keys are missing, the form will show a clear error message instead of failing silently.
