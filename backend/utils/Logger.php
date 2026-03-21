<?php
require_once __DIR__ . '/../config/config.php';

class Logger
{
    private static function write(string $level, string $msg, array $ctx = []): void
    {
        if (!is_dir(LOG_PATH)) {
            mkdir(LOG_PATH, 0750, true);
        }

        // Redact sensitive keys before logging
        foreach (['password', 'pass', 'token', 'secret', 'card', 'cvv'] as $k) {
            if (isset($ctx[$k])) $ctx[$k] = '[REDACTED]';
        }

        $ctxStr = $ctx ? ' | ' . json_encode($ctx, JSON_UNESCAPED_UNICODE) : '';
        $ip     = $_SERVER['REMOTE_ADDR'] ?? 'cli';
        $line   = sprintf("[%s][%s][%s] %s%s\n", date('Y-m-d H:i:s'), $level, $ip, $msg, $ctxStr);

        file_put_contents(
            LOG_PATH . '/' . date('Y-m') . '-' . strtolower($level) . '.log',
            $line,
            FILE_APPEND | LOCK_EX
        );
    }

    public static function info(string $m, array $c = []): void    { self::write('INFO',  $m, $c); }
    public static function warning(string $m, array $c = []): void  { self::write('WARN',  $m, $c); }
    public static function error(string $m, array $c = []): void    { self::write('ERROR', $m, $c); }
    public static function audit(string $m, array $c = []): void    { self::write('AUDIT', $m, $c); }
    public static function debug(string $m, array $c = []): void
    {
        if (APP_ENV === 'development') self::write('DEBUG', $m, $c);
    }
}
