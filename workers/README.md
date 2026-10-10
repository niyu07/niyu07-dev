# Contact form Worker

This Worker validates the website contact form, checks Cloudflare Turnstile, applies a per-IP rate limit, and then asks EmailJS to send the configured template. The EmailJS template must have a fixed recipient; the request cannot choose a recipient. The form sends directly to the owner's Gmail mailbox to avoid forwarding a message back to its sending account through Cloudflare Email Routing.

## Free services and limits

- Cloudflare Workers Free includes up to 100,000 Worker requests per day. Do not switch the account to Workers Paid.
- EmailJS Free currently includes 200 sends per month. EmailJS says requests stop being processed after the quota is reached; they are not automatically billed.
- No email is sent until EmailJS and Cloudflare secrets are configured.

## EmailJS template

Create or use a service and template in EmailJS. Set the template's **To Email** to the owner's fixed Gmail mailbox, set the subject to `[niyu07.com] お問い合わせ`, set **Reply To** to `{{email}}`, and use only these parameters in the message body: `{{name}}`, `{{email}}`, and `{{message}}`. Do not make the recipient a dynamic template parameter. The public `info@niyu07.com` routing address can remain available for ordinary external email.

For server-side authorization, enable **Use Private Key** and **Allow EmailJS API for non-browser applications** in the EmailJS account security settings. Add `https://niyu07.com` to the EmailJS domain allowlist. The Worker sends that exact origin and keeps the private key server-side.

## Cloudflare configuration

1. Keep the existing Turnstile widget restricted to `niyu07.com` with action `contact`. Use its sitekey in the frontend build settings and store its secret as the Worker secret `TURNSTILE_SECRET_KEY`.
2. Set only these Worker secrets with Wrangler's interactive `secret put` command or the Cloudflare dashboard. Do not put values in source control or frontend variables:
   - `TURNSTILE_SECRET_KEY`
   - `EMAILJS_PRIVATE_KEY`
3. `ALLOWED_ORIGIN`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, and `EMAILJS_PUBLIC_KEY` are non-secret Worker variables in `wrangler.jsonc`; `ALLOWED_ORIGIN` is restricted to `https://niyu07.com`.
4. Confirm the rate-limit namespace ID in `wrangler.jsonc` is unique in the Cloudflare account. The binding allows 5 requests per IP per 60 seconds and fails closed if unavailable.
5. Deploy with `frontend/node_modules/.bin/wrangler deploy --config workers/wrangler.jsonc` only while the account remains on Workers Free.
6. The Worker is routed only at `https://niyu07.com/api/contact*`; `workers.dev` and version preview URLs are disabled. The frontend's public production settings are in `frontend/.env.production`. These contain only the API URL and public Turnstile sitekey. Never add secrets to a frontend environment file.
7. Build and publish the frontend as well as the Worker. From `frontend`, run `npm run build`. From the repository root, run `frontend/node_modules/.bin/wrangler pages deploy frontend/dist --project-name niyu07-dev --branch main`. Updating only the Worker leaves the old browser form in production and does not finish the release.

## Local development

Copy `.dev.vars.example` to `.dev.vars` and fill it with local values. Never use the production Turnstile secret in local development or commit `.dev.vars`. Start the Worker from the repository root with `frontend/node_modules/.bin/wrangler dev --config workers/wrangler.jsonc`; configure `VITE_CONTACT_API_URL` and `VITE_TURNSTILE_SITE_KEY` for the frontend separately.
