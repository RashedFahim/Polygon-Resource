# Polygon Resource Website

React and Vite frontend with a PHP/PHPMailer Gmail SMTP contact endpoint for shared hosting.

## Local Development

The form posts to the same-origin `/api/contact.php` path. Vite proxies that path to a local PHP server; no Node API server is required.

1. Copy `contact-config.example.php` to `contact-config.php` in the project root and fill in the server-only values.
2. Start PHP from the project root:

```bash
php -S 127.0.0.1:8000 -t public
```

3. In a second terminal, run:

```bash
npm install
npm run dev
```

The local config is ignored by Git. Never put SMTP credentials in React code or a `VITE_*` variable.

## Server Configuration

`contact-config.example.php` is a template. The real `contact-config.php` must remain outside the web root and return these values:

```php
return [
    'SMTP_HOST' => 'smtp.gmail.com',
    'SMTP_PORT' => 587,
    'SMTP_ENCRYPTION' => 'tls',
    'SMTP_USERNAME' => 'your-gmail-address@gmail.com',
    'SMTP_APP_PASSWORD' => 'your-google-app-password',
    'SMTP_FROM' => 'your-gmail-address@gmail.com',
    'RECIPIENT_EMAIL' => 'rashedfahimchowdhury@gmail.com',
];
```

The PHP endpoint reads that file from the directory immediately above `public_html`. It also supports server environment variables with the same names. `SMTP_FROM` must be the authenticated Gmail address or an authorized Gmail alias; it is never the visitor's address. The visitor's address is used only as `Reply-To`.

## Hestia Deployment

Build the static site locally:

```bash
npm run build
```

Upload the contents of `dist/` into Hestia's `public_html/`, preserving the generated structure. The important files are:

```text
public_html/
├── index.html
├── assets/
├── api/
│   ├── contact.php
│   ├── .htaccess
│   └── vendor/
│       ├── autoload.php
│       └── phpmailer/
├── .htaccess
└── other public assets
```

Upload a configured copy of `contact-config.php` to the domain directory above `public_html`, not into `public_html` or `public_html/api`. Create `.contact-rate-limit/` beside `public_html` if PHP cannot create it automatically. The PHP user needs write permission on that directory; `0700` or the hosting account's normal private-directory permission is appropriate. Public files can retain Hestia's normal `0644` permissions and directories `0755`.

Make the private config readable by the PHP account but not publicly writable, for example `0600` or `0640` according to Hestia's account/group setup.

The root `.htaccess` serves real files and directories before applying the React Router fallback, so `/api/contact.php` is executed by PHP instead of being rewritten to `index.html`. The API `.htaccess` also prevents an accidentally uploaded PHP config file from being downloaded.

No Composer command or Node process is required on Hestia. PHPMailer and its Composer autoloader are already included under `public/api/vendor/` and are copied into `dist/api/vendor/` by Vite.

## Testing

After upload, confirm the endpoint rejects non-POST requests:

```bash
curl -i https://polygon-resource.com/api/contact.php
```

A `405` JSON response is expected. Submit a valid JSON test with the endpoint URL:

```bash
curl -i -X POST https://polygon-resource.com/api/contact.php \
  -H "Content-Type: application/json" \
  --data '{"name":"Test Visitor","email":"your-test-email@example.com","phone":"1712345678","phoneCode":"+880","country":"Bangladesh","message":"SMTP delivery test","website":""}'
```

A successful request returns JSON with `Your trade inquiry has been sent successfully.`. Check the recipient inbox and spam folder for the message sent to `rashedfahimchowdhury@gmail.com`. The email subject begins with `New Trade Query -` and includes the visitor name, and replying to it goes to the visitor.

## Gmail Setup

The Gmail account used by `SMTP_USERNAME` must have 2-Step Verification enabled. Create a Google App Password and put that value in `SMTP_APP_PASSWORD`; do not use the normal Gmail account password. If Google Workspace policies disable App Passwords, use an SMTP mailbox/provider supported by the hosting account instead.
