<?php
/**
 * POST /api/newsletter/subscribe.php
 * Subscribe to newsletter
 */
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';
require_once __DIR__ . '/../../utils/Mailer.php';

Security::initHeaders();
Security::requirePost();
Security::rateLimit('newsletter', 5); // 5 subs per window per IP

$data = Security::getJsonInput();
Security::checkHoneypot($data);

// Validate
$email = trim($data['email'] ?? '');
$name  = Security::sanitize($data['name'] ?? 'Friend', MAX_NAME_LENGTH);

if (!Security::validateEmail($email)) {
    Security::abort(400, 'Please provide a valid email address.');
}

$email = strtolower(filter_var($email, FILTER_SANITIZE_EMAIL));

try {
    $db = Database::getInstance();

    // Check if already subscribed
    $stmt = $db->prepare('SELECT id, unsubscribed FROM newsletter_subscribers WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $existing = $stmt->fetch();

    if ($existing) {
        if (!$existing['unsubscribed']) {
            Security::respond(['message' => 'You are already subscribed to our newsletter!']);
        }
        // Re-subscribe
        $stmt = $db->prepare('UPDATE newsletter_subscribers SET unsubscribed = 0, name = ?, subscribed_at = NOW() WHERE email = ?');
        $stmt->execute([$name, $email]);
    } else {
        $ip = Security::getClientIp();
        $stmt = $db->prepare('INSERT INTO newsletter_subscribers (email, name, ip_address, subscribed_at) VALUES (?, ?, ?, NOW())');
        $stmt->execute([$email, $name, $ip]);
    }

    // Send welcome email
    Mailer::sendWelcome($email, $name);
    Logger::audit("Newsletter subscription: $email");

    Security::respond(['message' => 'Successfully subscribed! Check your inbox for a welcome message.']);

} catch (PDOException $e) {
    Logger::error('Newsletter subscribe error: ' . $e->getMessage());
    Security::abort(500, 'Unable to process subscription. Please try again.');
}
