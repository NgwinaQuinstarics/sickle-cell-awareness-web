<?php
require_once __DIR__ . '/../config/config.php';

class Logger {
    private static function write(string $level, string $message): void {
        if (!is_dir(LOG_PATH)) {
            mkdir(LOG_PATH, 0750, true);
        }
        $file = LOG_PATH . '/' . date('Y-m') . '-' . strtolower($level) . '.log';
        $line = sprintf("[%s] [%s] [%s] %s\n",
            date('Y-m-d H:i:s'),
            $level,
            $_SERVER['REMOTE_ADDR'] ?? 'cli',
            $message
        );
        file_put_contents($file, $line, FILE_APPEND | LOCK_EX);
    }

    public static function info(string $msg): void  { self::write('INFO', $msg); }
    public static function warning(string $msg): void { self::write('WARN', $msg); }
    public static function error(string $msg): void  { self::write('ERROR', $msg); }
    public static function audit(string $msg): void  { self::write('AUDIT', $msg); }
}
