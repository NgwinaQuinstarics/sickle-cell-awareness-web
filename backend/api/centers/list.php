<?php
/**
 * GET /api/centers/list.php?state=Lagos
 */
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';

Security::initHeaders();
Security::requireGet();
Security::rateLimit('centers', 30);

$state = Security::sanitize($_GET['state'] ?? '', 50);

if (empty($state)) {
    Security::abort(400, 'State parameter is required.');
}

try {
    $db = Database::getInstance();
    $stmt = $db->prepare('SELECT name, address, phone, hours, is_free AS free, is_certified AS certified, type FROM testing_centers WHERE state = ? AND is_active = 1 ORDER BY is_free DESC, name ASC');
    $stmt->execute([$state]);
    $centers = $stmt->fetchAll();

    Security::respond([
        'state'   => $state,
        'count'   => count($centers),
        'centers' => $centers,
    ]);

} catch (PDOException $e) {
    Logger::error('Centers list error: ' . $e->getMessage());
    Security::respond(['state' => $state, 'count' => 0, 'centers' => []]);
}
