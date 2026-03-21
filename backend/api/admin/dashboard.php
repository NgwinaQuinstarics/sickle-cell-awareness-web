<?php // admin/dashboard.php
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';

Security::setHeaders();
Security::handleCors();
Security::enforceMethod('GET');
Security::rateLimit('default');
$auth = Security::requireAuth();

try {
    $db = Database::get();

    $stats = [
        'pledges'       => (int) $db->query('SELECT COUNT(*) FROM pledges')->fetchColumn(),
        'subscribers'   => (int) $db->query('SELECT COUNT(*) FROM newsletter_subscribers WHERE unsubscribed = 0')->fetchColumn(),
        'contacts'      => (int) $db->query('SELECT COUNT(*) FROM contact_messages')->fetchColumn(),
        'new_contacts'  => (int) $db->query("SELECT COUNT(*) FROM contact_messages WHERE status = 'new'")->fetchColumn(),
        'quizzes'       => (int) $db->query('SELECT COUNT(*) FROM quiz_submissions')->fetchColumn(),
        'appointments'  => (int) $db->query('SELECT COUNT(*) FROM appointments')->fetchColumn(),
        'pending_apts'  => (int) $db->query("SELECT COUNT(*) FROM appointments WHERE status = 'pending'")->fetchColumn(),
        'users'         => (int) $db->query('SELECT COUNT(*) FROM users WHERE is_active = 1')->fetchColumn(),
    ];

    $recent_contacts = $db->query(
        'SELECT id, name, email, subject, reference, status, created_at
         FROM contact_messages ORDER BY created_at DESC LIMIT 10'
    )->fetchAll();

    $recent_appointments = $db->query(
        'SELECT id, name, phone, centre_name, preferred_date, reference, status, created_at
         FROM appointments ORDER BY created_at DESC LIMIT 10'
    )->fetchAll();

    $risk_breakdown = $db->query(
        'SELECT risk_level, COUNT(*) AS cnt FROM quiz_submissions GROUP BY risk_level ORDER BY cnt DESC'
    )->fetchAll();

    $pledges_by_region = $db->query(
        'SELECT region, COUNT(*) AS cnt FROM pledges GROUP BY region ORDER BY cnt DESC LIMIT 10'
    )->fetchAll();

    Logger::info('Admin dashboard accessed', ['user' => $auth['user']]);

    Security::ok([
        'stats'               => $stats,
        'recent_contacts'     => $recent_contacts,
        'recent_appointments' => $recent_appointments,
        'risk_breakdown'      => $risk_breakdown,
        'pledges_by_region'   => $pledges_by_region,
        'admin'               => ['username' => $auth['user'], 'role' => $auth['role']],
    ]);

} catch (PDOException $e) {
    Logger::error('Dashboard error: ' . $e->getMessage());
    Security::abort(500, 'Could not load dashboard data.');
}
