<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/Logger.php';
require_once __DIR__ . '/../utils/RateLimiter.php';

class Security
{
    // Call at the top of every endpoint
    public static function boot(string $method = 'POST', string $action = 'default'): void
    {
        self::setHeaders();
        self::handleCors();
        self::enforceMethod($method);
        self::rateLimit($action);
    }

    // ── Headers ───────────────────────────────────────────────
    public static function setHeaders(): void
    {
        header_remove('X-Powered-By');
        header_remove('Server');
        header('Content-Type: application/json; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: DENY');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
        header("Content-Security-Policy: default-src 'none'");
        header('Cache-Control: no-store, no-cache, must-revalidate');
        header('Pragma: no-cache');

        if (APP_ENV === 'production') {
            header('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
        }
    }

    // ── CORS ──────────────────────────────────────────────────
    public static function handleCors(): void
    {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if (in_array($origin, ALLOWED_ORIGINS, true)) {
            header("Access-Control-Allow-Origin: $origin");
            header('Access-Control-Allow-Credentials: true');
            header('Vary: Origin');
        }

        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        header('Access-Control-Max-Age: 86400');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }

    // ── Method enforcement ────────────────────────────────────
    public static function enforceMethod(string $method): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== strtoupper($method)) {
            self::abort(405, 'Method not allowed.');
        }
    }

    // ── Rate limiting ─────────────────────────────────────────
    public static function rateLimit(string $action): void
    {
        $cfg = RATE_LIMITS[$action] ?? RATE_LIMITS['default'];
        [$limit, $window] = $cfg;
        $rl = new RateLimiter();

        if (!$rl->check(self::clientIp(), $action, $limit, $window)) {
            Logger::warning("Rate limit: $action", ['ip' => self::clientIp()]);
            self::abort(429, 'Too many requests. Please wait a moment and try again.');
        }
    }

    // ── JSON body ─────────────────────────────────────────────
    public static function body(): array
    {
        $raw = file_get_contents('php://input');
        if (empty($raw))         self::abort(400, 'Request body is required.');
        if (strlen($raw) > 65536) self::abort(413, 'Request body is too large.');
        $data = json_decode($raw, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            self::abort(400, 'Invalid JSON: ' . json_last_error_msg());
        }
        return $data ?? [];
    }

    // ── Honeypot ──────────────────────────────────────────────
    public static function honeypot(array $data): void
    {
        if (!empty($data[HONEYPOT])) {
            Logger::warning('Honeypot triggered', ['ip' => self::clientIp()]);
            self::ok(['message' => 'Thank you!']); // silent success for bots
        }
    }

    // ── Client IP ─────────────────────────────────────────────
    public static function clientIp(): string
    {
        foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_REAL_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $key) {
            if (!empty($_SERVER[$key])) {
                $ip = trim(explode(',', $_SERVER[$key])[0]);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                    return $ip;
                }
            }
        }
        return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }

    // ── Responses ─────────────────────────────────────────────
    public static function ok(array $data, int $code = 200): void
    {
        http_response_code($code);
        echo json_encode(
            array_merge(['success' => true, 'ts' => time()], $data),
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
        exit;
    }

    public static function abort(int $code, string $message): void
    {
        http_response_code($code);
        echo json_encode(['success' => false, 'message' => $message, 'ts' => time()], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ── JWT ───────────────────────────────────────────────────
    public static function createJwt(array $payload): string
    {
        $header  = self::b64u(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
        $payload['iat'] = time();
        $payload['exp'] = time() + SESSION_LIFETIME;
        $pl      = self::b64u(json_encode($payload));
        $sig     = self::b64u(hash_hmac('sha256', "$header.$pl", JWT_SECRET, true));
        return "$header.$pl.$sig";
    }

    public static function verifyJwt(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) return null;

        [$h, $p, $s] = $parts;
        $expected = self::b64u(hash_hmac('sha256', "$h.$p", JWT_SECRET, true));

        if (!hash_equals($expected, $s)) return null;

        $data = json_decode(base64_decode(strtr($p, '-_', '+/')), true);
        if (!$data || ($data['exp'] ?? 0) < time()) return null;

        return $data;
    }

    public static function requireAuth(): array
    {
        $auth  = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        $token = str_replace('Bearer ', '', $auth);

        if (empty($token)) self::abort(401, 'Authentication required.');

        $payload = self::verifyJwt($token);
        if (!$payload) self::abort(401, 'Token invalid or expired. Please sign in again.');

        return $payload;
    }

    private static function b64u(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
}
