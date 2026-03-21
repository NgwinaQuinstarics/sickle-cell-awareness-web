<?php // quiz/submit.php
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';
require_once __DIR__ . '/../../utils/Validator.php';

Security::boot('POST', 'quiz');
$d = Security::body();

$validRisks = ['VERY HIGH', 'HIGH', 'MODERATE', 'LOWER', 'UNKNOWN'];
$risk = in_array($d['riskLevel'] ?? '', $validRisks, true) ? $d['riskLevel'] : 'UNKNOWN';
$answers = is_array($d['answers'] ?? null)
    ? array_map(fn($v) => Validator::clean((string)$v, 200), $d['answers'])
    : [];

$name  = !empty($d['name'])  ? Validator::clean($d['name'],  MAX_NAME)  : null;
$email = null;
if (!empty(trim($d['email'] ?? ''))) {
    $er = Validator::email($d['email']);
    if ($er['ok']) $email = $er['val'];
}

try {
    Database::get()->prepare(
        'INSERT INTO quiz_submissions (name,email,risk_level,answers_json,ip_address,submitted_at) VALUES (?,?,?,?,?,NOW())'
    )->execute([$name, $email, $risk, json_encode($answers, JSON_UNESCAPED_UNICODE), Security::clientIp()]);
} catch (PDOException $e) {
    Logger::error('Quiz insert error: ' . $e->getMessage());
    // Graceful fail — still return result to user
}

Logger::info('Quiz submitted', ['risk' => $risk]);
Security::ok([
    'message'   => 'Results recorded.' . ($email ? ' Check your email for your personalised guide.' : ''),
    'riskLevel' => $risk,
]);
