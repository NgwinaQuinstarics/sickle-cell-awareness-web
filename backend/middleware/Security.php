<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../utils/Logger.php';
require_once __DIR__ . '/../utils/RateLimiter.php';

class Security {

    /**
     * Set secure HTTP headers and handle CORS
     */
    public static function initHeaders(): void {
        // Security Headers
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: DENY');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
        header('Permissions-Policy: geolocation=(), microphone=(), camera=()');
        header('Content-Security-Policy: default-src \'self\'; script-src \'self\'; style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com; font-src \'self\' https://fonts.gstatic.com;');

        if (APP_ENV === 'production') {
            header('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
        }

        // Content type
        header('Content-Type: application/json; charset=utf-8');

        // CORS
        self::handleCors();
    }

    private static function handleCors(): void {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        if (in_array($origin, ALLOWED_ORIGINS, true)) {
            header("Access-Control-Allow-Origin: $origin");
            header('Access-Control-Allow-Credentials: true');
        }
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        header('Access-Control-Max-Age: 86400');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }

    /**
     * Require POST method
     */
    public static function requirePost(): void {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            self::abort(405, 'Method not allowed.');
        }
    }

    /**
     * Require GET method
     */
    public static function requireGet(): void {
        if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
            self::abort(405, 'Method not allowed.');
        }
    }

    /**
     * Apply rate limiting (per IP)
     */
    public static function rateLimit(string $action = 'default', int $limit = API_RATE_LIMIT): void {
        $ip = self::getClientIp();
        $limiter = new RateLimiter();
        if (!$limiter->check($ip, $action, $limit, RATE_LIMIT_WINDOW)) {
            Logger::warning("Rate limit exceeded: $ip for action: $action");
            self::abort(429, 'Too many requests. Please wait before trying again.');
        }
    }

    /**
     * Parse and validate JSON input
     */
    public static function getJsonInput(): array {
        $raw = file_get_contents('php://input');
        if (empty($raw)) {
            self::abort(400, 'Request body is required.');
        }
        if (strlen($raw) > 65536) { // 64KB max
            self::abort(413, 'Request body too large.');
        }
        $data = json_decode($raw, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            self::abort(400, 'Invalid JSON format.');
        }
        return $data ?? [];
    }

    /**
     * Sanitize a string input
     */
    public static function sanitize(string $input, int $maxLen = 500): string {
        $input = trim($input);
        $input = stripslashes($input);
        $input = htmlspecialchars($input, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        return substr($input, 0, $maxLen);
    }

    /**
     * Validate email address
     */
    public static function validateEmail(string $email): bool {
        $email = filter_var(trim($email), FILTER_VALIDATE_EMAIL);
        if (!$email) return false;
        // Block disposable email domains
        $blocked = ['mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwam.com', '10minutemail.com'];
        $domain = strtolower(substr(strrchr($email, '@'), 1));
        return !in_array($domain, $blocked, true);
    }

    /**
     * Validate Nigerian phone number
     */
    public static function validatePhone(string $phone): bool {
        $phone = preg_replace('/[^0-9+]/', '', $phone);
        // Nigerian formats: +2348xxxxxxxxx, 08xxxxxxxxx, 07xxxxxxxxx
        return (bool) preg_match('/^(\+234|0)[789][01]\d{8}$/', $phone);
    }

    /**
     * Check honeypot field (bot trap)
     */
    public static function checkHoneypot(array $data): void {
        if (!empty($data[HONEYPOT_FIELD])) {
            Logger::warning('Honeypot triggered from IP: ' . self::getClientIp());
            // Silently succeed to fool bots
            http_response_code(200);
            echo json_encode(['success' => true, 'message' => 'Thank you!']);
            exit;
        }
    }

    /**
     * Get real client IP (handles proxies)
     */
    public static function getClientIp(): string {
        $keys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'];
        foreach ($keys as $key) {
            if (!empty($_SERVER[$key])) {
                $ip = explode(',', $_SERVER[$key])[0];
                $ip = trim($ip);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                    return $ip;
                }
            }
        }
        return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }

    /**
     * Abort with JSON error response
     */
    public static function abort(int $code, string $message): void {
        http_response_code($code);
        echo json_encode([
            'success'   => false,
            'message'   => $message,
            'timestamp' => time(),
        ]);
        exit;
    }

    /**
     * Success response
     */
    public static function respond(array $data, int $code = 200): void {
        http_response_code($code);
        echo json_encode(array_merge(['success' => true, 'timestamp' => time()], $data));
        exit;
    }
}
