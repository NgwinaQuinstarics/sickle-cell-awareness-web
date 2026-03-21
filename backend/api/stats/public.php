<?php // stats/public.php
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';

Security::setHeaders();
Security::handleCors();
Security::enforceMethod('GET');
Security::rateLimit('default');

try {
    $db = Database::get();
    Security::ok([
        'pledges'     => (int) $db->query('SELECT COUNT(*) FROM pledges')->fetchColumn(),
        'subscribers' => (int) $db->query('SELECT COUNT(*) FROM newsletter_subscribers WHERE unsubscribed = 0')->fetchColumn(),
        'quizzes'     => (int) $db->query('SELECT COUNT(*) FROM quiz_submissions')->fetchColumn(),
        'centres'     => (int) $db->query('SELECT COUNT(*) FROM testing_centres WHERE is_active = 1')->fetchColumn(),
    ]);
} catch (PDOException $e) {
    Logger::error('Stats error: ' . $e->getMessage());
    // Return fallback so the frontend never breaks
    Security::ok(['pledges' => 0, 'subscribers' => 0, 'quizzes' => 0, 'centres' => 0]);
}
