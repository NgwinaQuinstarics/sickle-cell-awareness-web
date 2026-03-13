<?php
/**
 * POST /api/quiz/submit.php
 */
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';
require_once __DIR__ . '/../../utils/Mailer.php';

Security::initHeaders();
Security::requirePost();
Security::rateLimit('quiz', 10);

$data      = Security::getJsonInput();
$name      = Security::sanitize($data['name'] ?? '', MAX_NAME_LENGTH);
$email     = trim($data['email'] ?? '');
$answers   = $data['answers'] ?? [];
$riskLevel = Security::sanitize($data['riskLevel'] ?? 'UNKNOWN', 20);

$validRisks = ['VERY HIGH', 'HIGH', 'MODERATE', 'LOWER', 'UNKNOWN'];
if (!in_array($riskLevel, $validRisks)) $riskLevel = 'UNKNOWN';

// Email is optional for quiz but if provided, must be valid
if (!empty($email) && !Security::validateEmail($email)) {
    Security::abort(400, 'Please provide a valid email address.');
}

$email    = !empty($email) ? strtolower(filter_var($email, FILTER_SANITIZE_EMAIL)) : null;
$answers  = array_map(fn($v) => Security::sanitize((string)$v, 200), $answers);
$ip       = Security::getClientIp();

try {
    $db = Database::getInstance();
    $stmt = $db->prepare('INSERT INTO quiz_submissions (name, email, risk_level, answers_json, ip_address, submitted_at) VALUES (?,?,?,?,?,NOW())');
    $stmt->execute([$name ?: null, $email, $riskLevel, json_encode($answers), $ip]);

    if ($email && $name) {
        Mailer::sendQuizResult($email, $name, $riskLevel, $answers);
    }
    Logger::info("Quiz submitted: risk=$riskLevel ip=$ip");

    Security::respond(['message' => 'Results saved! Check your email for your personalized guide.']);

} catch (PDOException $e) {
    Logger::error('Quiz submit error: ' . $e->getMessage());
    Security::respond(['message' => 'Results noted. Check our resources for next steps.']); // graceful fail
}
