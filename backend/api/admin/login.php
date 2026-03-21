<?php // admin/login.php
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';
require_once __DIR__ . '/../../utils/Validator.php';

Security::boot('POST', 'admin_login');
$d = Security::body();

$username = Validator::clean($d['username'] ?? '', 50);
$password = $d['password'] ?? '';
$ip       = Security::clientIp();

if (empty($username) || empty($password)) Security::abort(422, 'Username and password are required.');

try {
    $db = Database::get();
    $stmt = $db->prepare(
        'SELECT id, username, email, password_hash, role, is_active FROM admin_users WHERE username = ? OR email = ? LIMIT 1'
    );
    $stmt->execute([$username, $username]);
    $admin = $stmt->fetch();

    // Constant-time check — always verify even when user not found
    $hash = $admin['password_hash'] ?? '$2y$12$dummy.hash.prevents.timing.attack.abc';
    if (!$admin || !password_verify($password, $hash)) {
        Logger::warning('Admin login failed', ['username' => $username, 'ip' => $ip]);
        Security::abort(401, 'Incorrect credentials.');
    }

    if (!$admin['is_active']) Security::abort(403, 'This admin account is disabled.');

    // Rehash if bcrypt cost changed
    if (password_needs_rehash($admin['password_hash'], PASSWORD_BCRYPT, ['cost' => BCRYPT_COST])) {
        $db->prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?')
           ->execute([password_hash($password, PASSWORD_BCRYPT, ['cost' => BCRYPT_COST]), $admin['id']]);
    }

    $db->prepare('UPDATE admin_users SET last_login = NOW(), last_ip = ? WHERE id = ?')
       ->execute([$ip, $admin['id']]);

    $token = Security::createJwt([
        'sub'     => $admin['id'],
        'user'    => $admin['username'],
        'email'   => $admin['email'],
        'role'    => $admin['role'],
        'isAdmin' => true,
    ]);

    Logger::audit('Admin login', ['user' => $admin['username'], 'ip' => $ip]);

    Security::ok([
        'token' => $token,
        'user'  => [
            'id'       => $admin['id'],
            'username' => $admin['username'],
            'email'    => $admin['email'],
            'role'     => $admin['role'],
            'isAdmin'  => true,
        ],
        'expiresIn' => SESSION_LIFETIME,
    ]);

} catch (PDOException $e) {
    Logger::error('Admin login error: ' . $e->getMessage());
    Security::abort(500, 'Authentication service unavailable.');
}
