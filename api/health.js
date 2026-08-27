export default function handler(_req, res) {
  res.status(200).json({
    ok: true,
    emailConfigured: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
  });
}
