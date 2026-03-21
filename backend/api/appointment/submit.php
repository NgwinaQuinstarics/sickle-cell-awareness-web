<?php // appointment/submit.php
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';
require_once __DIR__ . '/../../utils/Validator.php';
require_once __DIR__ . '/../../utils/Mailer.php';

Security::boot('POST', 'appointment');
$d = Security::body();
Security::honeypot($d);

$nameR   = Validator::required($d['name']   ?? '', 'Name',        2, MAX_NAME);
$phoneR  = Validator::phone(   $d['phone']  ?? '');
$centreR = Validator::required($d['center'] ?? $d['centre'] ?? '', 'Test centre', 2, 200);
$dateR   = Validator::futureDate($d['date'] ?? '');

$err = Validator::first($nameR, $phoneR, $centreR, $dateR);
if ($err) Security::abort(422, $err);

$name   = Validator::clean($nameR['val'],   MAX_NAME);
$phone  = $phoneR['val'];
$centre = Validator::clean($centreR['val'], 200);
$date   = $dateR['val'];
$email  = null;

if (!empty(trim($d['email'] ?? ''))) {
    $er = Validator::email($d['email']);
    if ($er['ok']) $email = $er['val'];
}

$ip  = Security::clientIp();
$ref = 'APT-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 6));

try {
    Database::get()->prepare(
        'INSERT INTO appointments (name,phone,email,preferred_date,centre_name,reference,status,ip_address,created_at) VALUES (?,?,?,?,?,?,"pending",?,NOW())'
    )->execute([$name, $phone, $email, $date, $centre, $ref, $ip]);

    if ($email) Mailer::appointmentConfirm($email, $name, $centre, $date, $ref);

    Mailer::notifyAdmin(
        "New Appointment: $ref",
        "<p><strong>$name</strong> | $phone | $centre | <strong>$date</strong><br>Ref: $ref</p>"
    );

    Logger::audit('Appointment booked', ['ref' => $ref, 'centre' => $centre, 'date' => $date]);
    Security::ok([
        'message'   => 'Appointment request sent! The centre will contact you to confirm.',
        'reference' => $ref,
    ]);

} catch (PDOException $e) {
    Logger::error('Appointment error: ' . $e->getMessage());
    Security::abort(500, 'Could not process your request. Please call the centre directly.');
}
