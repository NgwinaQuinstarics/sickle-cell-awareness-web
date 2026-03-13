<?php
/**
 * File-based rate limiter (use Redis in production for better performance)
 */
class RateLimiter {
    private string $storePath;

    public function __construct() {
        $this->storePath = sys_get_temp_dir() . '/sicklecare_rl/';
        if (!is_dir($this->storePath)) {
            mkdir($this->storePath, 0700, true);
        }
    }

    public function check(string $ip, string $action, int $limit, int $window): bool {
        $key = md5($ip . '_' . $action);
        $file = $this->storePath . $key . '.json';

        $now = time();
        $data = ['count' => 0, 'reset' => $now + $window];

        if (file_exists($file)) {
            $stored = json_decode(file_get_contents($file), true);
            if ($stored && $stored['reset'] > $now) {
                $data = $stored;
            }
        }

        $data['count']++;
        file_put_contents($file, json_encode($data), LOCK_EX);

        return $data['count'] <= $limit;
    }
}
