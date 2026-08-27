import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const logoPath = path.join(serverDirectory, '..', 'public', 'logo.png');
dotenv.config({ path: path.join(serverDirectory, '.env') });
dotenv.config({ path: path.join(serverDirectory, '..', '.env') });

const app = express();
const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'polygon.resource@gmail.com';
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9\s()-]+$/;
const fieldLimits = {
  name: 120,
  email: 254,
  phone: 30,
  phoneCode: 6,
  country: 100,
  message: 5000,
};

app.disable('x-powered-by');
app.set('trust proxy', true);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const requestOrigin = `${req.protocol}://${req.get('host')}`;
  const originIsAllowed = !origin
    || origin === requestOrigin
    || allowedOrigins.includes('*')
    || allowedOrigins.includes(origin);

  if (origin && !originIsAllowed) {
    return res.sendStatus(403);
  }

  if (origin && originIsAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Vary', 'Origin');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(originIsAllowed ? 204 : 403);
  }

  return next();
});

app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, emailConfigured: Boolean(transporter) });
});

const readText = (value) => (typeof value === 'string' ? value.trim() : '');

const singleLine = (value) => value.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]));

function validateInquiry(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { errors: ['Please provide your inquiry details.'] };
  }

  const inquiry = {
    name: readText(body.name),
    email: readText(body.email),
    phone: readText(body.phone),
    phoneCode: readText(body.phoneCode),
    country: readText(body.country) || 'Not provided',
    message: readText(body.message),
  };
  const errors = [];

  if (!inquiry.name || inquiry.name.length > fieldLimits.name) {
    errors.push('Please provide your name.');
  }

  if (!inquiry.email || inquiry.email.length > fieldLimits.email || !emailPattern.test(inquiry.email)) {
    errors.push('Please provide a valid email address.');
  }

  const phoneDigits = inquiry.phone.replace(/\D/g, '');
  if (
    !inquiry.phone
    || inquiry.phone.length > fieldLimits.phone
    || !phonePattern.test(inquiry.phone)
    || phoneDigits.length < 6
  ) {
    errors.push('Please provide a valid phone number.');
  }

  if (!/^\+\d{1,4}$/.test(inquiry.phoneCode) || inquiry.phoneCode.length > fieldLimits.phoneCode) {
    errors.push('Please provide a valid country calling code.');
  }

  if (!inquiry.message || inquiry.message.length > fieldLimits.message) {
    errors.push('Please provide a message.');
  }

  for (const [field, limit] of Object.entries(fieldLimits)) {
    if (inquiry[field].length > limit && !errors.includes(`The ${field} field is too long.`)) {
      errors.push(`The ${field} field is too long.`);
    }
  }

  return { inquiry, errors };
}

function createTransporter() {
  const user = readText(process.env.SMTP_USER);
  const pass = process.env.SMTP_PASS;
  const smtpPort = Number.parseInt(process.env.SMTP_PORT || '465', 10);

  if (!user || !pass || !Number.isInteger(smtpPort)) {
    return null;
  }

  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE.toLowerCase() === 'true'
    : smtpPort === 465;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: smtpPort,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

const transporter = createTransporter();

if (transporter) {
  transporter.verify()
    .then(() => console.log('SMTP connection verified.'))
    .catch((error) => {
      console.error('SMTP connection verification failed:', error instanceof Error ? error.message : error);
    });
} else {
  console.error('Email service is not configured. Set SMTP_USER and SMTP_PASS in server/.env.');
}

app.post(['/api/contact', '/'], async (req, res) => {
  const { inquiry, errors } = validateInquiry(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ message: errors[0] });
  }

  if (!transporter) {
    return res.status(503).json({
      message: 'The email service is not configured. Please try again later.',
    });
  }

  const customerLabel = singleLine(inquiry.name);
  const subject = `New Trade Query - ${customerLabel || 'Website Visitor'}`.slice(0, 180);
  const details = [
    ['Name', inquiry.name],
    ['Business Email', inquiry.email],
    ['Phone Number', inquiry.phone],
    ['Country Code', inquiry.phoneCode],
    ['Country', inquiry.country],
  ];
  const text = [
    'A new trade query was submitted through the Polygon Resource website.',
    '',
    ...details.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    inquiry.message,
  ].join('\n');
  const htmlDetails = details
    .map(([label, value], index) => (
      `<tr style="background:${index % 2 === 0 ? '#fffdf8' : '#f7fbf3'};">`
      + `<td style="padding:12px 14px;border-bottom:1px solid #e2eddc;color:#1f4732;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;vertical-align:top;width:38%;">${escapeHtml(label)}</td>`
      + `<td style="padding:12px 14px;border-bottom:1px solid #e2eddc;color:#1c1a14;font-size:15px;line-height:1.5;vertical-align:top;">${escapeHtml(value)}</td></tr>`
    ))
    .join('');
  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="color-scheme" content="light">
        <meta name="supported-color-schemes" content="light">
        <title>New Trade Query</title>
      </head>
      <body style="margin:0;padding:24px 12px;background-color:#f1f6ec;color:#1c1a14;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:640px;margin:0 auto;overflow:hidden;border:1px solid #dbeed1;border-radius:16px;background-color:#fffdf8;box-shadow:0 12px 35px rgba(31,71,50,.12);">
          <div style="height:5px;background-color:#6ba539;"></div>
          <div style="padding:30px 32px;background-color:#1f4732;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="width:78px;vertical-align:middle;">
                  <div style="width:68px;height:68px;padding:4px;border:2px solid #b7d995;border-radius:50%;background-color:#fffdf8;">
                    <img src="cid:polygon-resource-logo" alt="Polygon Resource logo" width="68" height="68" style="display:block;width:68px;height:68px;object-fit:contain;border:0;">
                  </div>
                </td>
                <td style="padding-left:18px;vertical-align:middle;">
                  <p style="margin:0 0 8px;color:#b7d995;font-size:11px;font-weight:700;letter-spacing:1.8px;">AGRI-TRADE &bull; GLOBAL REACH</p>
                  <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.2;font-weight:700;">New Trade Query</h1>
                </td>
              </tr>
            </table>
            <div style="height:1px;margin:24px 0 16px;background-color:#3d7a4a;"></div>
            <p style="margin:0;color:#e8f3df;font-size:15px;line-height:1.5;">A new produce and agricultural trade inquiry was submitted through your website.</p>
          </div>
          <div style="padding:28px 32px;">
            <p style="margin:0 0 12px;color:#6ba539;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Inquiry Details</p>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #dbeed1;border-radius:10px;border-collapse:separate;overflow:hidden;">
              ${htmlDetails}
            </table>
            <div style="margin-top:24px;padding:20px;background-color:#f4f8ef;border-left:4px solid #dd8f2a;border-radius:8px;">
              <p style="margin:0 0 8px;color:#6ba539;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Field Notes</p>
              <h2 style="margin:0 0 10px;color:#1f4732;font-size:18px;line-height:1.3;">Message</h2>
              <p style="margin:0;color:#3f493d;font-size:15px;line-height:1.65;white-space:normal;">${escapeHtml(inquiry.message).replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          <div style="padding:16px 32px;background-color:#edf5e7;color:#6b7e62;font-size:12px;line-height:1.5;">Polygon Resource &bull; Fresh produce from Bangladesh to the world</div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipientEmail,
      replyTo: inquiry.email,
      subject,
      text,
      html,
      attachments: existsSync(logoPath)
        ? [{ filename: 'polygon-resource-logo.png', path: logoPath, cid: 'polygon-resource-logo' }]
        : [],
    });

    console.log('Contact inquiry email sent successfully.');
    return res.json({ message: 'Your trade inquiry has been sent successfully.' });
  } catch (error) {
    console.error('Failed to send contact inquiry email:', error instanceof Error ? error.message : error);
    return res.status(502).json({
      message: 'We could not send your inquiry right now. Please try again later.',
    });
  }
});

app.use((error, _req, res, next) => {
  if (error?.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Please submit a valid inquiry.' });
  }

  if (res.headersSent) {
    return next(error);
  }

  console.error('Contact API error:', error instanceof Error ? error.message : error);
  return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
});

export default app;
