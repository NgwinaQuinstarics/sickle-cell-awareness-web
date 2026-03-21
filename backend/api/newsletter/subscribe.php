<?php // newsletter/subscribe.php
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';
require_once __DIR__ . '/../../utils/Validator.php';
require_once __DIR__ . '/../../utils/Mailer.php';

Security::boot('POST', 'newsletter');
$d = Security::body();
Security::honeypot($d);

$emlR = Validator::email($d['email'] ?? '');
if (!$emlR['ok']) Security::abort(422, $emlR['err']);

$email = $emlR['val'];
$name  = Validator::clean($d['name'] ?? 'Friend', MAX_NAME);
$ip    = Security::clientIp();

try {
    $db = Database::get();

    $stmt = $db->prepare('SELECT id, unsubscribed FROM newsletter_subscribers WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $existing = $stmt->fetch();

    if ($existing) {
        if (!$existing['unsubscribed']) {
            Security::ok(['message' => 'You are already subscribed. Thank you!']);
        }
        $db->prepare(
            'UPDATE newsletter_subscribers SET unsubscribed = 0, name = ?, ip_address = ?, subscribed_at = NOW() WHERE email = ?'
        )->execute([$name, $ip, $email]);
    } else {
        $db->prepare(
            'INSERT INTO newsletter_subscribers (email, name, ip_address, subscribed_at) VALUES (?,?,?,NOW())'
        )->execute([$email, $name, $ip]);
    }

    Mailer::welcome($email, $name);
    Logger::audit('Newsletter subscribe', ['email' => $email]);
    Security::ok(['message' => 'Subscribed successfully! Check your inbox for a welcome email.']);

} catch (PDOException $e) {
    Logger::error('Newsletter error: ' . $e->getMessage());
    Security::abort(500, 'Subscription failed. Please try again.');
}
