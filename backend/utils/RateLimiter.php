<?php
/**
 * File-based sliding window rate limiter.
 * For high-traffic production use, swap the file I/O for Redis.
 */
class RateLimiter
{
    private string $dir;

    public function __construct()
    {
        $this->dir = sys_get_temp_dir() . '/sc_cm_rl/';
        if (!is_dir($this->dir)) {
            mkdir($this->dir, 0700, true);
        }
    }

    /**
     * Returns true if the request is allowed, false if rate-limited.
     */
    public function check(string $ip, string $action, int $limit, int $window): bool
    {
        $file = $this->dir . md5("$ip|$action") . '.json';
        $now  = time();
        $data = ['hits' => [], 'blocked_until' => 0];

        if (file_exists($file)) {
            $stored = json_decode(file_get_contents($file), true);
            if ($stored) $data = $stored;
        }

        // Still in hard-block period?
        if ($data['blocked_until'] > $now) return false;

        // Slide the window — drop hits older than $window seconds
        $data['hits'] = array_values(
            array_filter($data['hits'], fn($t) => $t > $now - $window)
        );

        $data['hits'][] = $now;

        if (count($data['hits']) > $limit) {
            $data['blocked_until'] = $now + 600; // 10-minute block after burst
            file_put_contents($file, json_encode($data), LOCK_EX);
            return false;
        }

        file_put_contents($file, json_encode($data), LOCK_EX);
        return true;
    }

    /** Periodic cleanup — call from a cron job */
    public function cleanup(): void
    {
        foreach (glob($this->dir . '*.json') as $f) {
            if (filemtime($f) < time() - 7200) @unlink($f);
        }
    }
}
