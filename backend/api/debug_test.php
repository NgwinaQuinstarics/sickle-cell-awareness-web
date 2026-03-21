<?php
/**
 * SickleCare Cameroon — Backend Diagnostic Tool
 * ─────────────────────────────────────────────────────────────
 * Visit: https://yourdomain.cm/api/debug_test.php
 *
 * ⚠️  DELETE THIS FILE after confirming everything works.
 *     Never leave diagnostic tools on a production server.
 * ─────────────────────────────────────────────────────────────
 */
header('Content-Type: application/json; charset=utf-8');
$r = [];

// 1. PHP version
$r['php_version']    = PHP_VERSION;
$r['php_version_ok'] = version_compare(PHP_VERSION, '7.4.0', '>=');

// 2. Required extensions
foreach (['pdo', 'pdo_mysql', 'json', 'mbstring', 'openssl', 'filter'] as $ext) {
    $r['extensions'][$ext] = extension_loaded($ext) ? '✅ OK' : '❌ MISSING';
}

// 3. Config file
$configPath = __DIR__ . '/../config/config.php';
if (file_exists($configPath)) {
    require_once $configPath;
    $r['config_loaded']   = true;
    $r['db_host']         = DB_HOST;
    $r['db_name']         = DB_NAME;
    $r['db_user']         = DB_USER;
    $r['db_pass_set']     = !empty(DB_PASS) && DB_PASS !== 'CHANGE_THIS_PASSWORD';
    $r['jwt_secret_set']  = !empty(JWT_SECRET) && JWT_SECRET !== 'REPLACE_WITH_64_CHAR_RANDOM_STRING';
    $r['app_env']         = APP_ENV;
    $r['allowed_origins'] = ALLOWED_ORIGINS;
} else {
    $r['config_loaded'] = false;
    $r['config_error']  = '❌ config.php not found. Check your folder structure.';
    $r['config_path']   = realpath(__DIR__ . '/..') . '/config/config.php';
    echo json_encode($r, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// 4. Database connection
if (extension_loaded('pdo_mysql')) {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        $r['db_connection'] = '✅ Connected successfully';

        // 5. Check all required tables
        $tables = ['users', 'admin_users', 'newsletter_subscribers', 'contact_messages',
                   'pledges', 'quiz_submissions', 'appointments', 'testing_centres'];
        foreach ($tables as $t) {
            $r['tables'][$t] = $pdo->query("SHOW TABLES LIKE '$t'")->rowCount() > 0
                ? '✅ Exists'
                : '❌ Missing — run schema.sql';
        }

        // 6. Test INSERT + DELETE
        try {
            $ref  = 'DBG-' . substr(md5(uniqid()), 0, 6);
            $stmt = $pdo->prepare("INSERT INTO contact_messages (name,email,subject,message,ip_address,reference) VALUES (?,?,?,?,?,?)");
            $stmt->execute(['Debug Test', 'debug@test.local', 'Debug', 'Backend diagnostic test.', '127.0.0.1', $ref]);
            $id = $pdo->lastInsertId();
            $pdo->prepare("DELETE FROM contact_messages WHERE id = ?")->execute([$id]);
            $r['write_test'] = "✅ INSERT + DELETE successful (ref: $ref, id: $id)";
        } catch (PDOException $e) {
            $r['write_test'] = '❌ Failed: ' . $e->getMessage();
        }

    } catch (PDOException $e) {
        $r['db_connection'] = '❌ Failed: ' . $e->getMessage();
        $r['fix'] = 'Check DB_HOST, DB_NAME, DB_USER, DB_PASS in config/config.php';
    }
} else {
    $r['db_connection'] = '❌ pdo_mysql extension not loaded';
}

// 7. Logs directory
$logPath = defined('LOG_PATH') ? LOG_PATH : __DIR__ . '/../logs';
$r['logs_dir_exists'] = is_dir($logPath);
$r['logs_writable']   = is_writable($logPath);
if (!$r['logs_writable']) $r['logs_fix'] = "Run: chmod 750 $logPath && chown www-data:www-data $logPath";

// 8. Request info
$r['request_method'] = $_SERVER['REQUEST_METHOD'];
$r['request_origin'] = $_SERVER['HTTP_ORIGIN'] ?? '(direct browser visit — no Origin header)';
$r['server_software']= $_SERVER['SERVER_SOFTWARE'] ?? 'unknown';
$r['script_dir']     = __DIR__;

// 9. Reminders
$r['reminders'] = [
    '⚠️  DELETE this file immediately after diagnosis is complete',
    'Set VITE_API_URL in frontend/.env to point to this server',
    'Ensure APP_ENV=production in config.php before going live',
];

echo json_encode($r, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
