<?php
/**
 * POST /api/appointment/submit.php
 */
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';
require_once __DIR__ . '/../../utils/Mailer.php';

Security::initHeaders();
Security::requirePost();
Security::rateLimit('appointment', 5);

$data   = Security::getJsonInput();
Security::checkHoneypot($data);

$name   = Security::sanitize($data['name']   ?? '', MAX_NAME_LENGTH);
$phone  = Security::sanitize($data['phone']  ?? '', 20);
$email  = trim($data['email']  ?? '');
$date   = trim($data['date']   ?? '');
$center = Security::sanitize($data['center'] ?? '', 200);

if (strlen($name) < 2)  Security::abort(400, 'Please provide your full name.');
if (!Security::validatePhone($phone)) Security::abort(400, 'Please provide a valid Nigerian phone number.');
if (empty($center))     Security::abort(400, 'Test center is required.');

// Validate date
$d = DateTime::createFromFormat('Y-m-d', $date);
if (!$d || $d < new DateTime('today')) {
    Security::abort(400, 'Please select a valid future date.');
}

$email = !empty($email) && Security::validateEmail($email)
    ? strtolower(filter_var($email, FILTER_SANITIZE_EMAIL))
    : null;

$ip  = Security::getClientIp();
$ref = 'APT-' . strtoupper(substr(md5(uniqid()), 0, 6));

try {
    $db = Database::getInstance();
    $stmt = $db->prepare('INSERT INTO appointments (name, phone, email, preferred_date, center_name, reference, ip_address, created_at) VALUES (?,?,?,?,?,?,?,NOW())');
    $stmt->execute([$name, $phone, $email, $date, $center, $ref, $ip]);

    // Notify admin
    Mailer::notifyAdmin(
        "New Appointment Request: $ref",
        "Reference: $ref\nName: $name\nPhone: $phone\nEmail: $email\nDate: $date\nCenter: $center"
    );

    // Confirm to user via email if provided
    if ($email) {
        $body = "Hi $name,<br><br>Your appointment request at <strong>$center</strong> for <strong>$date</strong> has been received.<br><br>
        Reference: <strong>$ref</strong><br><br>The center will contact you at $phone to confirm. Please arrive 15 minutes early with a valid ID.<br><br>
        <strong>What to expect:</strong> A small blood sample will be taken. Results are typically ready in 24–48 hours.";
        Mailer::send($email, $name, "Appointment Request Confirmed — $ref", Mailer::notifyAdmin("dummy","dummy") ?: $body);
    }

    Logger::audit("Appointment $ref: $name at $center on $date");

    Security::respond([
        'message'   => 'Appointment request submitted! The center will contact you to confirm.',
        'reference' => $ref,
    ]);

} catch (PDOException $e) {
    Logger::error('Appointment error: ' . $e->getMessage());
    Security::abort(500, 'Unable to process appointment. Please call the center directly.');
}
