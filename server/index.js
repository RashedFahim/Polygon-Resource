import express from 'express';
import { getEmailStatus, handleContactRequest } from '../api/contact.js';

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

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
  res.json(getEmailStatus());
});

app.post(['/api/contact', '/'], handleContactRequest);

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
