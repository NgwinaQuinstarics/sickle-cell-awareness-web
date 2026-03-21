<?php
/**
 * POST /api/auth/register.php
 * Register a new user account.
 */
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';
require_once __DIR__ . '/../../utils/Validator.php';
require_once __DIR__ . '/../../utils/Mailer.php';

Security::boot('POST', 'register');

$d = Security::body();
Security::honeypot($d);

// Validate all fields
$nameR   = Validator::required($d['name']     ?? '', 'Name',     2, MAX_NAME);
$emailR  = Validator::email(   $d['email']    ?? '');
$passR   = Validator::password( $d['password'] ?? '');
$regionR = Validator::required($d['region']   ?? '', 'Region',   2, 60);

$err = Validator::first($nameR, $emailR, $passR, $regionR);
if ($err) Security::abort(422, $err);

// Validate region value
if (!in_array($regionR['val'], CM_REGIONS, true)) {
    Security::abort(422, 'Invalid region selected.');
}

$name   = Validator::clean($nameR['val'],   MAX_NAME);
$email  = $emailR['val'];
$pass   = $passR['val'];
$region = $regionR['val'];
$ip     = Security::clientIp();

try {
    $db = Database::get();

    // Check for duplicate email
    $stmt = $db->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        Security::abort(409, 'This email is already registered. Please sign in or use a different email.');
    }

    $hash = password_hash($pass, PASSWORD_BCRYPT, ['cost' => BCRYPT_COST]);

    $stmt = $db->prepare(
        'INSERT INTO users (name, email, password_hash, region, ip_address, created_at) VALUES (?,?,?,?,?,NOW())'
    );
    $stmt->execute([$name, $email, $hash, $region, $ip]);

    $userId = (int) $db->lastInsertId();
    $token  = Security::createJwt([
        'sub'    => $userId,
        'name'   => $name,
        'email'  => $email,
        'role'   => 'user',
        'region' => $region,
    ]);

    Mailer::welcome($email, $name);
    Logger::audit('User registered', ['id' => $userId, 'email' => $email, 'region' => $region]);

    Security::ok([
        'message' => 'Account created successfully!',
        'token'   => $token,
        'user'    => [
            'id'     => $userId,
            'name'   => $name,
            'email'  => $email,
            'region' => $region,
            'role'   => 'user',
        ],
    ]);

} catch (PDOException $e) {
    Logger::error('Register error: ' . $e->getMessage());
    Security::abort(500, 'Could not create your account. Please try again.');
}
