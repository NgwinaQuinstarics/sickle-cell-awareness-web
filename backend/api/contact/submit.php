<?php
/**
 * POST /api/contact/submit.php
 * Contact form submission
 */
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';
require_once __DIR__ . '/../../utils/Mailer.php';

Security::initHeaders();
Security::requirePost();
Security::rateLimit('contact', 3); // 3 messages per minute per IP

$data = Security::getJsonInput();
Security::checkHoneypot($data);

// Extract and validate fields
$name    = Security::sanitize($data['name'] ?? '', MAX_NAME_LENGTH);
$email   = trim($data['email'] ?? '');
$phone   = Security::sanitize($data['phone'] ?? '', 20);
$subject = Security::sanitize($data['subject'] ?? '', 100);
$message = Security::sanitize($data['message'] ?? '', MAX_MESSAGE_LENGTH);

// Validate required fields
if (strlen($name) < 2) {
    Security::abort(400, 'Please provide your full name.');
}
if (!Security::validateEmail($email)) {
    Security::abort(400, 'Please provide a valid email address.');
}
if (empty($subject)) {
    Security::abort(400, 'Please select a subject.');
}
if (strlen($message) < 20) {
    Security::abort(400, 'Message must be at least 20 characters.');
}

// Optional phone validation
if (!empty($phone) && !Security::validatePhone($phone)) {
    Security::abort(400, 'Please provide a valid Nigerian phone number.');
}

// Spam detection - simple keyword filter
$spamKeywords = ['casino', 'forex', 'bitcoin', 'crypto invest', 'click here to win', 'enlarge', 'viagra'];
foreach ($spamKeywords as $kw) {
    if (stripos($message, $kw) !== false || stripos($subject, $kw) !== false) {
        Logger::warning("Spam detected from: " . Security::getClientIp());
        // Silent success to confuse spammers
        Security::respond(['message' => 'Thank you for your message. We will get back to you shortly.']);
    }
}

$email = strtolower(filter_var($email, FILTER_SANITIZE_EMAIL));

try {
    $db  = Database::getInstance();
    $ip  = Security::getClientIp();
    $ref = strtoupper(substr(md5(uniqid()), 0, 8)); // Ticket reference

    $stmt = $db->prepare('
        INSERT INTO contact_messages (name, email, phone, subject, message, ip_address, reference, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    ');
    $stmt->execute([$name, $email, $phone ?: null, $subject, $message, $ip, $ref]);

    // Send confirmation to user
    Mailer::sendContactConfirmation($email, $name, $subject);

    // Notify admin
    Mailer::notifyAdmin(
        "New Contact: $subject",
        "Reference: $ref\nName: $name\nEmail: $email\nPhone: $phone\nSubject: $subject\n\nMessage:\n$message\n\nIP: $ip"
    );

    Logger::audit("Contact form: $email | Subject: $subject | Ref: $ref");

    Security::respond([
        'message'   => 'Your message has been received. We will respond within 24 hours.',
        'reference' => $ref,
    ]);

} catch (PDOException $e) {
    Logger::error('Contact submit error: ' . $e->getMessage());
    Security::abort(500, 'Unable to send your message. Please email us directly at hello@sicklecare.org');
}
