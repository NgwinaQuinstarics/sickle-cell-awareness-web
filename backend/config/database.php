<?php
require_once __DIR__ . '/config.php';

class Database {
    private static ?PDO $instance = null;

    public static function getInstance(): PDO {
        if (self::$instance === null) {
            $dsn = sprintf(
                'mysql:host=%s;port=%d;dbname=%s;charset=%s',
                DB_HOST, DB_PORT, DB_NAME, DB_CHARSET
            );
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::ATTR_PERSISTENT         => false,
                PDO::MYSQL_ATTR_FOUND_ROWS   => true,
                PDO::ATTR_TIMEOUT            => 5,
            ];
            try {
                self::$instance = new PDO($dsn, DB_USER, DB_PASS, $options);
                self::$instance->exec("SET time_zone = '+01:00'"); // WAT
            } catch (PDOException $e) {
                Logger::error('DB connection failed: ' . $e->getMessage());
                http_response_code(503);
                die(json_encode(['success' => false, 'message' => 'Service temporarily unavailable.']));
            }
        }
        return self::$instance;
    }

    // Prevent cloning and unserialization
    private function __clone() {}
    public function __wakeup() { throw new Exception('Cannot unserialize singleton.'); }
}
