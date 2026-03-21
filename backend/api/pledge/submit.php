<?php // pledge/submit.php
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';
require_once __DIR__ . '/../../utils/Validator.php';
require_once __DIR__ . '/../../utils/Mailer.php';

Security::boot('POST', 'pledge');
$d = Security::body();
Security::honeypot($d);

if (empty($d['agree'])) Security::abort(422, 'Please confirm the pledge to continue.');

$nameR   = Validator::required($d['name']   ?? '', 'Name',   2, MAX_NAME);
$emlR    = Validator::email(   $d['email']  ?? '');
$regionR = Validator::required($d['region'] ?? '', 'Region', 2, 60);

$err = Validator::first($nameR, $emlR, $regionR);
if ($err) Security::abort(422, $err);

if (!in_array($regionR['val'], CM_REGIONS, true)) Security::abort(422, 'Invalid region selected.');

$name   = Validator::clean($nameR['val'],   MAX_NAME);
$email  = $emlR['val'];
$region = $regionR['val'];
$phone  = null;

if (!empty(trim($d['phone'] ?? ''))) {
    $pr = Validator::phone($d['phone']);
    if ($pr['ok']) $phone = $pr['val'];
}

$ip = Security::clientIp();

try {
    $db = Database::get();

    // Prevent duplicate pledges
    $stmt = $db->prepare('SELECT id FROM pledges WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        Security::ok([
            'message'       => 'You have already taken the pledge. Thank you for your commitment!',
            'alreadyPledged'=> true,
        ]);
    }

    $db->prepare(
        'INSERT INTO pledges (name, email, phone, region, ip_address, pledged_at) VALUES (?,?,?,?,?,NOW())'
    )->execute([$name, $email, $phone, $region, $ip]);

    $pledgeId = (int) $db->lastInsertId();
    $total    = (int) $db->query('SELECT COUNT(*) FROM pledges')->fetchColumn();

    Mailer::pledgeCert($email, $name, $region);
    Mailer::notifyAdmin(
        "New Pledge #$pledgeId — $region",
        "<p><strong>$name</strong> ($email) from <strong>$region</strong> just took the pledge. Total pledges: <strong>$total</strong></p>"
    );

    Logger::audit('Pledge submitted', ['id' => $pledgeId, 'email' => $email, 'region' => $region]);
    Security::ok([
        'message'      => 'Your pledge has been recorded. Welcome to the movement!',
        'pledgeNumber' => $total,
    ]);

} catch (PDOException $e) {
    Logger::error('Pledge error: ' . $e->getMessage());
    Security::abort(500, 'Could not record your pledge. Please try again.');
}
