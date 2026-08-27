# Polygon Resource Website

React and Vite frontend with a server-side Gmail SMTP contact endpoint.

## Development

Install dependencies, create the project-root `.env.local` from `.env.example`, and fill in the server-only values. Then run the API and frontend in separate terminals:

```bash
npm install
npm run server
npm run dev
```

The form always posts to `/api/contact`. During local development, the Vite-only proxy in `vite.config.js` forwards that path to the local API on port 5000. The proxy is not part of the production bundle.

## Email Configuration

Use a Google app password with 2-Step Verification enabled. Do not use the normal Gmail password. A local `.env.local` can contain:

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=<the Gmail account authorized to send>
SMTP_PASS=<the Google app password>
SMTP_FROM=<the same Gmail address or an authorized alias>
CONTACT_RECIPIENT_EMAIL=<the Gmail inbox that receives inquiries>
CORS_ORIGIN=http://localhost:5173
```

All SMTP values are read only by the server. No email credential belongs in a `VITE_*` variable or React code.

## Vercel

`api/contact.js` is a standalone Vercel Node function. Vercel detects it at `/api/contact`; no separate API deployment or hard-coded deployment URL is needed. The same function is also used by the local Express server.

Add these variables in Vercel Project Settings > Environment Variables for Production and any Preview environment that needs email:

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=<the Gmail account authorized to send>
SMTP_PASS=<the Google app password>
SMTP_FROM=<the same Gmail address or an authorized alias>
CONTACT_RECIPIENT_EMAIL=<the Gmail inbox that receives inquiries>
```

`CORS_ORIGIN` is not needed when the frontend and function are deployed in the same Vercel project. Do not add `VITE_API_BASE_URL`; the frontend uses the relative `/api/contact` path. Redeploy after changing Vercel variables. `/api/health` reports whether the SMTP credentials are configured without returning secret values.

## Custom Domain

Connect the domain in Vercel and complete the DNS records Vercel provides. No code or email URL changes are needed: `/api/contact` automatically runs on the custom domain. The Gmail account must have 2-Step Verification and a valid app password, and `SMTP_FROM` should be that Gmail account or an authorized Gmail alias. If email is later sent from a custom-domain mailbox, configure that mailbox's provider plus its SPF, DKIM, and DMARC records; the website domain itself does not require email verification for the Gmail SMTP setup.
