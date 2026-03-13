<?php
/**
 * POST /api/pledge/submit.php
 */
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';
require_once __DIR__ . '/../../utils/Mailer.php';

Security::initHeaders();
Security::requirePost();
Security::rateLimit('pledge', 2);

$data = Security::getJsonInput();
Security::checkHoneypot($data);

$name  = Security::sanitize($data['name'] ?? '', MAX_NAME_LENGTH);
$email = trim($data['email'] ?? '');
$phone = Security::sanitize($data['phone'] ?? '', 20);
$state = Security::sanitize($data['state'] ?? '', 50);
$agree = !empty($data['agree']);

if (strlen($name) < 2) Security::abort(400, 'Please provide your full name.');
if (!Security::validateEmail($email)) Security::abort(400, 'Please provide a valid email address.');
if (empty($state)) Security::abort(400, 'Please select your state.');
if (!$agree) Security::abort(400, 'Please confirm the pledge to continue.');

$email = strtolower(filter_var($email, FILTER_SANITIZE_EMAIL));

try {
    $db = Database::getInstance();
    $ip = Security::getClientIp();

    // Prevent duplicate pledges from same email
    $stmt = $db->prepare('SELECT id FROM pledges WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        Security::respond([
            'message'       => 'You have already made the pledge! Thank you for your commitment.',
            'pledgeNumber'  => null,
        ]);
    }

    $stmt = $db->prepare('INSERT INTO pledges (name, email, phone, state, ip_address, pledged_at) VALUES (?,?,?,?,?,NOW())');
    $stmt->execute([$name, $email, $phone ?: null, $state, $ip]);
    $pledgeId = $db->lastInsertId();

    // Get total count
    $totalStmt = $db->query('SELECT COUNT(*) as total FROM pledges');
    $total     = $totalStmt->fetch()['total'];

    Mailer::sendPledgeCertificate($email, $name, $state);
    Mailer::notifyAdmin("New Pledge #$pledgeId", "Name: $name\nEmail: $email\nState: $state\nTotal pledges: $total");
    Logger::audit("Pledge #$pledgeId: $name ($email) from $state");

    Security::respond([
        'message'      => 'Your pledge has been recorded. Welcome to the movement!',
        'pledgeNumber' => $total,
    ]);

} catch (PDOException $e) {
    Logger::error('Pledge submit error: ' . $e->getMessage());
    Security::abort(500, 'Unable to record your pledge. Please try again.');
}
