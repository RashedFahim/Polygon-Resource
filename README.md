# Polygon Resource Website

React and Vite frontend with a small Node/Express API for Contact Us email delivery.

## Development

Install dependencies, then run the API and frontend in separate terminals:

```bash
npm install
npm run server
npm run dev
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`.

After starting the API, `http://localhost:5000/api/health` should return `"emailConfigured":true`. The API logs `SMTP connection verified.` when Gmail authentication is working.

## Email Configuration

Create `server/.env` from `server/.env.example`. The API uses Nodemailer with Gmail SMTP:

- Use a Google app password for `SMTP_PASS`; never use or store a Gmail account password in the frontend.
- Set `SMTP_USER` to the Gmail account authorized to send the message.
- `CONTACT_RECIPIENT_EMAIL` defaults to `polygon.resource@gmail.com`.
- Set `CORS_ORIGIN` to the deployed frontend origin, or a comma-separated list of origins.

For a separately deployed frontend and API, set `VITE_API_BASE_URL` in the frontend environment to the API's public URL. Keep all SMTP variables on the backend only.

If SMTP verification fails, use a Google app password with 2-Step Verification enabled. Do not use the normal Gmail password. Also check Gmail's Spam folder and the backend logs for the SMTP error.

## Production

Build the frontend with `npm run build`, deploy the `dist` directory to the frontend host, and run `npm start` on a Node-compatible backend host. Configure the backend environment variables before accepting submissions.
