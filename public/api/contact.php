<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');

const MAX_REQUEST_BYTES = 32768;
const MAX_RATE_LIMIT_ENTRIES = 1000;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: no-referrer');
header('Permissions-Policy: camera=(), geolocation=(), microphone=(), payment=()');

/**
 * Return one consistent response without exposing server-side details.
 */
function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function config_value(array $config, string $key, string $default = ''): string
{
    $value = $config[$key] ?? getenv($key);

    if (!is_string($value) && !is_numeric($value)) {
        return $default;
    }

    $value = trim((string) $value);
    return $value !== '' ? $value : $default;
}

function field_value(array $payload, string $field): string
{
    if (!array_key_exists($field, $payload)) {
        return '';
    }

    if (!is_string($payload[$field])) {
        respond(400, ['message' => 'Please provide a valid inquiry.']);
    }

    return trim($payload[$field]);
}

function contains_control_characters(string $value, bool $allowNewlines = false): bool
{
    if ($allowNewlines) {
        return preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/', $value) === 1;
    }

    return preg_match('/[\x00-\x1F\x7F-\x9F]/', $value) === 1;
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function single_line(string $value): string
{
    $value = preg_replace('/[\r\n\t]+/', ' ', $value) ?? '';
    $value = preg_replace('/\s+/', ' ', $value) ?? '';
    return trim($value);
}

function normalize_message(string $value): string
{
    return trim(str_replace(["\r\n", "\r"], "\n", $value));
}

function is_list_array(array $value): bool
{
    $expectedKey = 0;
    foreach (array_keys($value) as $key) {
        if ($key !== $expectedKey) {
            return false;
        }
        $expectedKey++;
    }

    return true;
}

function client_address(): string
{
    // Do not trust forwarded headers on shared hosting.
    return isset($_SERVER['REMOTE_ADDR']) && is_string($_SERVER['REMOTE_ADDR'])
        ? $_SERVER['REMOTE_ADDR']
        : 'unknown';
}

/**
 * A small file-backed limiter works across normal PHP requests on one host.
 * The directory is deliberately outside public_html by default.
 */
function check_rate_limit(string $directory, string $scope, string $value, int $limit, int $window): ?bool
{
    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) {
        return null;
    }

    $filename = $directory . DIRECTORY_SEPARATOR . $scope . '-' . hash('sha256', $value) . '.json';
    $handle = @fopen($filename, 'c+');

    if ($handle === false || !@flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }

        return null;
    }

    $contents = stream_get_contents($handle);
    $timestamps = json_decode($contents ?: '[]', true);
    $now = time();

    if (!is_array($timestamps)) {
        $timestamps = [];
    }

    $timestamps = array_values(array_filter($timestamps, static function ($timestamp) use ($now, $window): bool {
        return is_int($timestamp) && $timestamp > ($now - $window);
    }));

    $allowed = count($timestamps) < $limit;
    if ($allowed) {
        $timestamps[] = $now;
    }

    // Keep individual limiter files bounded even if a file is manually edited.
    if (count($timestamps) > MAX_RATE_LIMIT_ENTRIES) {
        $timestamps = array_slice($timestamps, -MAX_RATE_LIMIT_ENTRIES);
    }

    rewind($handle);
    ftruncate($handle, 0);
    fwrite($handle, json_encode($timestamps));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);

    return $allowed;
}

function generic_mail_error(): void
{
    respond(502, ['message' => 'We could not send your inquiry right now. Please try again later.']);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['message' => 'Method not allowed.']);
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (!is_string($contentType) || preg_match('/^application\/json(?:\s*;|$)/i', $contentType) !== 1) {
    respond(415, ['message' => 'Please submit a JSON inquiry.']);
}

$contentLength = $_SERVER['CONTENT_LENGTH'] ?? null;
if ($contentLength !== null) {
    if (!is_string($contentLength) || !ctype_digit($contentLength) || (int) $contentLength > MAX_REQUEST_BYTES) {
        respond(413, ['message' => 'Your inquiry is too large.']);
    }
}

$rawBody = file_get_contents('php://input', false, null, 0, MAX_REQUEST_BYTES + 1);
if ($rawBody === false || strlen($rawBody) > MAX_REQUEST_BYTES) {
    respond(413, ['message' => 'Your inquiry is too large.']);
}

try {
    $payload = json_decode($rawBody, true, 512, JSON_THROW_ON_ERROR);
} catch (Throwable $error) {
    respond(400, ['message' => 'Please submit a valid inquiry.']);
}

if (!is_array($payload) || is_list_array($payload)) {
    respond(400, ['message' => 'Please submit a valid inquiry.']);
}

$allowedFields = [
    'name',
    'email',
    'phone',
    'phoneCode',
    'country',
    'message',
    'website',
    // Supported for future form fields without changing the current UI.
    'company',
    'subject',
    'queryType',
];

foreach (array_keys($payload) as $field) {
    if (!in_array($field, $allowedFields, true)) {
        respond(400, ['message' => 'Please provide a valid inquiry.']);
    }
}

$inquiry = [
    'name' => field_value($payload, 'name'),
    'email' => field_value($payload, 'email'),
    'phone' => field_value($payload, 'phone'),
    'phoneCode' => field_value($payload, 'phoneCode'),
    'country' => field_value($payload, 'country'),
    'message' => normalize_message(field_value($payload, 'message')),
    'company' => field_value($payload, 'company'),
    'subject' => field_value($payload, 'subject'),
    'queryType' => field_value($payload, 'queryType'),
];
$honeypot = field_value($payload, 'website');

$limits = [
    'name' => 120,
    'email' => 254,
    'phone' => 30,
    'phoneCode' => 6,
    'country' => 100,
    'message' => 5000,
    'website' => 200,
    'company' => 160,
    'subject' => 180,
    'queryType' => 120,
];

foreach ($limits as $field => $limit) {
    $value = $field === 'website' ? $honeypot : $inquiry[$field];
    if (text_length($value) > $limit) {
        respond(400, ['message' => 'Please keep your inquiry within the allowed length.']);
    }
}

foreach (['name', 'email', 'phone', 'phoneCode', 'country', 'company', 'subject', 'queryType'] as $field) {
    if (contains_control_characters($inquiry[$field])) {
        respond(400, ['message' => 'Please provide valid inquiry details.']);
    }
}

if (contains_control_characters($inquiry['message'], true)) {
    respond(400, ['message' => 'Please provide valid inquiry details.']);
}

$requiredFields = ['name', 'email', 'phone', 'phoneCode', 'message'];
foreach ($requiredFields as $field) {
    if ($inquiry[$field] === '') {
        respond(400, ['message' => 'Please complete all required fields.']);
    }
}

if (filter_var($inquiry['email'], FILTER_VALIDATE_EMAIL) === false) {
    respond(400, ['message' => 'Please provide a valid email address.']);
}

if (preg_match('/^[0-9\s()\-]+$/', $inquiry['phone']) !== 1) {
    respond(400, ['message' => 'Please provide a valid phone number.']);
}

$phoneDigits = preg_replace('/\D+/', '', $inquiry['phone']) ?? '';
if (strlen($phoneDigits) < 6 || strlen($phoneDigits) > 15) {
    respond(400, ['message' => 'Please provide a valid phone number.']);
}

$allowedPhoneCodes = [
    '+880', '+61', '+973', '+32', '+1', '+86', '+45', '+20', '+33', '+49', '+852', '+91',
    '+62', '+39', '+81', '+965', '+60', '+960', '+977', '+31', '+64', '+47', '+968', '+92',
    '+63', '+974', '+966', '+65', '+82', '+34', '+46', '+41', '+886', '+66', '+90', '+971',
    '+44',
];
if (!in_array($inquiry['phoneCode'], $allowedPhoneCodes, true)) {
    respond(400, ['message' => 'Please provide a valid country calling code.']);
}

$allowedCountries = [
    'Bangladesh', 'Australia', 'Bahrain', 'Belgium', 'Canada', 'China', 'Denmark', 'Egypt',
    'France', 'Germany', 'Hong Kong', 'India', 'Indonesia', 'Italy', 'Japan', 'Kuwait',
    'Malaysia', 'Maldives', 'Nepal', 'Netherlands', 'New Zealand', 'Norway', 'Oman',
    'Pakistan', 'Philippines', 'Qatar', 'Saudi Arabia', 'Singapore', 'South Korea', 'Spain',
    'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Turkey', 'United Arab Emirates',
    'United Kingdom', 'United States',
];
if ($inquiry['country'] !== '' && !in_array($inquiry['country'], $allowedCountries, true)) {
    respond(400, ['message' => 'Please provide a valid country.']);
}

// A filled honeypot is treated as a successful no-op so bots do not learn the rule.
if ($honeypot !== '') {
    respond(200, ['message' => 'Your trade inquiry has been sent successfully.']);
}

$projectDirectory = dirname(__DIR__, 2);
$configFile = $projectDirectory . DIRECTORY_SEPARATOR . 'contact-config.php';
$config = [];
if (is_readable($configFile)) {
    $loadedConfig = require $configFile;
    if (is_array($loadedConfig)) {
        $config = $loadedConfig;
    }
}

$rateLimitDirectory = config_value(
    $config,
    'CONTACT_RATE_LIMIT_DIR',
    $projectDirectory . DIRECTORY_SEPARATOR . '.contact-rate-limit'
);

$ipLimit = check_rate_limit($rateLimitDirectory, 'ip', client_address(), 5, 15 * 60);
if ($ipLimit === null) {
    respond(503, ['message' => 'We could not send your inquiry right now. Please try again later.']);
}
if (!$ipLimit) {
    header('Retry-After: 900');
    respond(429, ['message' => 'Too many inquiries. Please try again later.']);
}

$emailLimit = check_rate_limit($rateLimitDirectory, 'email', strtolower($inquiry['email']), 3, 60 * 60);
if ($emailLimit === null) {
    respond(503, ['message' => 'We could not send your inquiry right now. Please try again later.']);
}
if (!$emailLimit) {
    header('Retry-After: 3600');
    respond(429, ['message' => 'Too many inquiries. Please try again later.']);
}

$globalLimit = check_rate_limit($rateLimitDirectory, 'global', 'all', 100, 15 * 60);
if ($globalLimit === null) {
    respond(503, ['message' => 'We could not send your inquiry right now. Please try again later.']);
}
if (!$globalLimit) {
    header('Retry-After: 900');
    respond(429, ['message' => 'Too many inquiries. Please try again later.']);
}

$smtpHost = config_value($config, 'SMTP_HOST', 'smtp.gmail.com');
$smtpPort = (int) config_value($config, 'SMTP_PORT', '587');
$smtpEncryption = strtolower(config_value($config, 'SMTP_ENCRYPTION', 'tls'));
$smtpUsername = config_value($config, 'SMTP_USERNAME');
$smtpAppPassword = preg_replace('/\s+/', '', config_value($config, 'SMTP_APP_PASSWORD')) ?? '';
$recipientEmail = config_value($config, 'RECIPIENT_EMAIL', 'rashedfahimchowdhury@gmail.com');
$senderEmail = config_value($config, 'SMTP_FROM', $smtpUsername);

if (
    $smtpUsername === ''
    || $smtpAppPassword === ''
    || $smtpPort < 1
    || $smtpPort > 65535
    || !in_array($smtpEncryption, ['tls', 'starttls', 'ssl'], true)
    || filter_var($smtpUsername, FILTER_VALIDATE_EMAIL) === false
    || filter_var($senderEmail, FILTER_VALIDATE_EMAIL) === false
    || filter_var($recipientEmail, FILTER_VALIDATE_EMAIL) === false
) {
    respond(503, ['message' => 'We could not send your inquiry right now. Please try again later.']);
}

$autoloadFile = __DIR__ . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';
if (!is_readable($autoloadFile)) {
    respond(503, ['message' => 'We could not send your inquiry right now. Please try again later.']);
}

require_once $autoloadFile;

$customerLabel = single_line($inquiry['name']);
if ($inquiry['company'] !== '') {
    $customerLabel .= ' / ' . single_line($inquiry['company']);
}
$subjectLabel = function_exists('mb_substr')
    ? mb_substr($customerLabel, 0, 140, 'UTF-8')
    : substr($customerLabel, 0, 140);
$mailSubject = 'New Trade Query - ' . ($subjectLabel !== '' ? $subjectLabel : 'Website Visitor');

$details = [
    ['Name', $inquiry['name']],
    ['Business Email', $inquiry['email']],
    ['Phone Number', $inquiry['phone']],
    ['Country Code', $inquiry['phoneCode']],
    ['Country', $inquiry['country'] !== '' ? $inquiry['country'] : 'Not provided'],
];
if ($inquiry['company'] !== '') {
    $details[] = ['Company', $inquiry['company']];
}
if ($inquiry['subject'] !== '') {
    $details[] = ['Subject', $inquiry['subject']];
}
if ($inquiry['queryType'] !== '') {
    $details[] = ['Query Type', $inquiry['queryType']];
}

$textLines = [
    'A new trade query was submitted through the Polygon Resource website.',
    '',
];
foreach ($details as $detail) {
    $textLines[] = $detail[0] . ': ' . $detail[1];
}
$textLines[] = '';
$textLines[] = 'Message:';
$textLines[] = $inquiry['message'];
$plainText = implode("\n", $textLines);

$htmlDetails = '';
foreach ($details as $index => $detail) {
    $rowColor = $index % 2 === 0 ? '#fffdf8' : '#f7fbf3';
    $htmlDetails .= '<tr style="background:' . $rowColor . ';">'
        . '<td style="padding:12px 14px;border-bottom:1px solid #e2eddc;color:#1f4732;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;vertical-align:top;width:38%;">'
        . escape_html($detail[0]) . '</td>'
        . '<td style="padding:12px 14px;border-bottom:1px solid #e2eddc;color:#1c1a14;font-size:15px;line-height:1.5;vertical-align:top;">'
        . escape_html($detail[1]) . '</td></tr>';
}

$logoPath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'logo.png';
$logoHtml = is_readable($logoPath)
    ? '<img src="cid:polygon-resource-logo" alt="Polygon Resource logo" width="68" height="68" style="display:block;width:68px;height:68px;object-fit:contain;border:0;">'
    : '';
$htmlMessage = nl2br(escape_html($inquiry['message']), false);
$html = '<!doctype html>'
    . '<html lang="en"><head><meta charset="utf-8"><meta name="color-scheme" content="light">'
    . '<title>New Trade Query</title></head>'
    . '<body style="margin:0;padding:24px 12px;background-color:#f1f6ec;color:#1c1a14;font-family:Arial,Helvetica,sans-serif;">'
    . '<div style="max-width:640px;margin:0 auto;overflow:hidden;border:1px solid #dbeed1;border-radius:16px;background-color:#fffdf8;">'
    . '<div style="height:5px;background-color:#6ba539;"></div>'
    . '<div style="padding:30px 32px;background-color:#1f4732;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>'
    . ($logoHtml !== '' ? '<td style="width:78px;vertical-align:middle;"><div style="width:68px;height:68px;padding:4px;border:2px solid #b7d995;border-radius:50%;background-color:#fffdf8;">' . $logoHtml . '</div></td>' : '')
    . '<td style="padding-left:18px;vertical-align:middle;"><p style="margin:0 0 8px;color:#b7d995;font-size:11px;font-weight:700;letter-spacing:1.8px;">AGRI-TRADE &amp; GLOBAL REACH</p>'
    . '<h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.2;font-weight:700;">New Trade Query</h1></td></tr></table>'
    . '<div style="height:1px;margin:24px 0 16px;background-color:#3d7a4a;"></div>'
    . '<p style="margin:0;color:#e8f3df;font-size:15px;line-height:1.5;">A new produce and agricultural trade inquiry was submitted through your website.</p></div>'
    . '<div style="padding:28px 32px;"><p style="margin:0 0 12px;color:#6ba539;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Inquiry Details</p>'
    . '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #dbeed1;border-radius:10px;border-collapse:separate;overflow:hidden;">'
    . $htmlDetails . '</table>'
    . '<div style="margin-top:24px;padding:20px;background-color:#f4f8ef;border-left:4px solid #dd8f2a;border-radius:8px;">'
    . '<p style="margin:0 0 8px;color:#6ba539;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Field Notes</p>'
    . '<h2 style="margin:0 0 10px;color:#1f4732;font-size:18px;line-height:1.3;">Message</h2>'
    . '<p style="margin:0;color:#3f493d;font-size:15px;line-height:1.65;">' . $htmlMessage . '</p></div></div>'
    . '<div style="padding:16px 32px;background-color:#edf5e7;color:#6b7e62;font-size:12px;line-height:1.5;">Polygon Resource &bull; Fresh produce from Bangladesh to the world</div>'
    . '</div></body></html>';

try {
    $mailer = new PHPMailer(true);
    $mailer->isSMTP();
    $mailer->Host = $smtpHost;
    $mailer->Port = $smtpPort;
    $mailer->SMTPAuth = true;
    $mailer->Username = $smtpUsername;
    $mailer->Password = $smtpAppPassword;
    $mailer->Timeout = 15;
    $mailer->CharSet = PHPMailer::CHARSET_UTF8;
    $mailer->SMTPDebug = 0;

    if ($smtpEncryption === 'ssl') {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } else {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mailer->SMTPAutoTLS = true;
    }

    $mailer->setFrom($senderEmail, 'Polygon Resource Website');
    $mailer->addAddress($recipientEmail);
    $mailer->addReplyTo($inquiry['email'], $inquiry['name']);
    if (is_readable($logoPath)) {
        $mailer->addEmbeddedImage($logoPath, 'polygon-resource-logo', 'polygon-resource-logo.png');
    }
    $mailer->isHTML(true);
    $mailer->Subject = $mailSubject;
    $mailer->Body = $html;
    $mailer->AltBody = $plainText;
    $mailer->send();
} catch (Exception $error) {
    error_log('Polygon Resource contact email failed: ' . get_class($error));
    generic_mail_error();
} catch (Throwable $error) {
    error_log('Polygon Resource contact email failed: ' . get_class($error));
    generic_mail_error();
}

respond(200, ['message' => 'Your trade inquiry has been sent successfully.']);
