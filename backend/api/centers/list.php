<?php // centers/list.php
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';
require_once __DIR__ . '/../../utils/Validator.php';

Security::setHeaders();
Security::handleCors();
Security::enforceMethod('GET');
Security::rateLimit('default');

$region = Validator::clean($_GET['region'] ?? '', 60);
if (empty($region)) Security::abort(400, 'Region parameter is required.');
if (!in_array($region, CM_REGIONS, true)) Security::abort(400, 'Invalid region.');

try {
    $db = Database::get();
    $stmt = $db->prepare('
        SELECT id, name, region, address, phone, email, hours, type,
               is_free AS free, is_certified AS certified, latitude, longitude
        FROM testing_centres
        WHERE region = ? AND is_active = 1
        ORDER BY is_free DESC, name ASC
    ');
    $stmt->execute([$region]);
    $centres = $stmt->fetchAll();

    foreach ($centres as &$c) {
        $c['free']      = (bool) $c['free'];
        $c['certified'] = (bool) $c['certified'];
        $c['latitude']  = $c['latitude']  !== null ? (float) $c['latitude']  : null;
        $c['longitude'] = $c['longitude'] !== null ? (float) $c['longitude'] : null;
    }

    Security::ok(['region' => $region, 'count' => count($centres), 'centres' => $centres]);

} catch (PDOException $e) {
    Logger::error('Centres list error: ' . $e->getMessage());
    Security::ok(['region' => $region, 'count' => 0, 'centres' => []]);
}
