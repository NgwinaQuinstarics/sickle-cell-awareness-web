<?php
/**
 * POST /api/auth/login.php
 * Authenticate a user and return a JWT.
 */
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';

Security::boot('POST', 'login');

$d     = Security::body();
$email = strtolower(trim($d['email']    ?? ''));
$pass  = $d['password'] ?? '';
$ip    = Security::clientIp();

if (empty($email) || empty($pass)) {
    Security::abort(422, 'Email and password are required.');
}

try {
    $db = Database::get();

    $stmt = $db->prepare(
        'SELECT id, name, email, password_hash, region, role, is_active FROM users WHERE email = ? LIMIT 1'
    );
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Always run password_verify to prevent timing attacks
    $hash = $user['password_hash'] ?? '$2y$12$invalid.hash.to.prevent.timing.attacks.pad';
    if (!$user || !password_verify($pass, $hash)) {
        Logger::warning('Login failed', ['email' => $email, 'ip' => $ip]);
        Security::abort(401, 'Incorrect email or password.');
    }

    if (!$user['is_active']) {
        Security::abort(403, 'This account has been disabled. Please contact support.');
    }

    // Upgrade hash cost if settings changed
    if (password_needs_rehash($user['password_hash'], PASSWORD_BCRYPT, ['cost' => BCRYPT_COST])) {
        $newHash = password_hash($pass, PASSWORD_BCRYPT, ['cost' => BCRYPT_COST]);
        $db->prepare('UPDATE users SET password_hash = ? WHERE id = ?')->execute([$newHash, $user['id']]);
    }

    // Record last login
    $db->prepare('UPDATE users SET last_login = NOW(), last_ip = ? WHERE id = ?')
       ->execute([$ip, $user['id']]);

    $token = Security::createJwt([
        'sub'    => $user['id'],
        'name'   => $user['name'],
        'email'  => $user['email'],
        'role'   => $user['role'],
        'region' => $user['region'],
    ]);

    Logger::audit('User login', ['id' => $user['id'], 'email' => $email, 'ip' => $ip]);

    Security::ok([
        'token' => $token,
        'user'  => [
            'id'     => $user['id'],
            'name'   => $user['name'],
            'email'  => $user['email'],
            'region' => $user['region'],
            'role'   => $user['role'],
        ],
    ]);

} catch (PDOException $e) {
    Logger::error('Login error: ' . $e->getMessage());
    Security::abort(500, 'Authentication service unavailable. Please try again.');
}
