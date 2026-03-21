<?php // contact/submit.php
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';
require_once __DIR__ . '/../../utils/Validator.php';
require_once __DIR__ . '/../../utils/Mailer.php';

Security::boot('POST', 'contact');
$d = Security::body();
Security::honeypot($d);

$nameR = Validator::required($d['name']    ?? '', 'Name',    2, MAX_NAME);
$emlR  = Validator::email(   $d['email']   ?? '');
$subR  = Validator::required($d['subject'] ?? '', 'Subject', 2, 120);
$msgR  = Validator::required($d['message'] ?? '', 'Message', 20, MAX_MSG);

$err = Validator::first($nameR, $emlR, $subR, $msgR);
if ($err) Security::abort(422, $err);

$name    = Validator::clean($nameR['val'], MAX_NAME);
$email   = $emlR['val'];
$subject = Validator::clean($subR['val'],  120);
$message = Validator::clean($msgR['val'],  MAX_MSG);
$phone   = null;

if (!empty(trim($d['phone'] ?? ''))) {
    $pr = Validator::phone($d['phone']);
    if ($pr['ok']) $phone = $pr['val'];
}

if (Validator::isSpam($name, $subject, $message)) {
    Logger::warning('Spam contact', ['ip' => Security::clientIp()]);
    Security::ok(['message' => 'Your message has been sent.', 'reference' => 'SC-FILTERED']);
}

$ip  = Security::clientIp();
$ref = 'SC-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 8));

try {
    $db = Database::get();
    $db->prepare(
        'INSERT INTO contact_messages (name,email,phone,subject,message,ip_address,reference,created_at) VALUES (?,?,?,?,?,?,?,NOW())'
    )->execute([$name, $email, $phone, $subject, $message, $ip, $ref]);

    Mailer::contactConfirm($email, $name, $subject, $ref);
    Mailer::notifyAdmin(
        "New Contact: $subject [$ref]",
        "<p><strong>$name</strong> ($email)</p><p>Subject: $subject</p><p>$message</p><p>Ref: $ref | IP: $ip</p>"
    );

    Logger::audit('Contact submitted', ['ref' => $ref, 'email' => $email]);
    Security::ok([
        'message'   => 'Your message has been sent. We will respond within 24 hours.',
        'reference' => $ref,
    ]);

} catch (PDOException $e) {
    Logger::error('Contact error: ' . $e->getMessage());
    Security::abort(500, 'Could not send your message. Please email us directly at ' . MAIL_ADMIN);
}
