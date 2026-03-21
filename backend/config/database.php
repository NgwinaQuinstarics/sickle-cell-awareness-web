<?php
require_once __DIR__ . '/config.php';

class Database
{
    private static ?PDO $instance = null;

    public static function get(): PDO
    {
        if (self::$instance === null) {
            $dsn = sprintf(
                'mysql:host=%s;port=%d;dbname=%s;charset=%s',
                DB_HOST, DB_PORT, DB_NAME, DB_CHARSET
            );
            try {
                self::$instance = new PDO($dsn, DB_USER, DB_PASS, [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                    PDO::ATTR_TIMEOUT            => 5,
                ]);
                self::$instance->exec("SET time_zone = '+01:00'"); // WAT
                self::$instance->exec(
                    "SET sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO'"
                );
            } catch (PDOException $e) {
                Logger::error('DB connection failed: ' . $e->getMessage());
                http_response_code(503);
                echo json_encode([
                    'success' => false,
                    'message' => 'Service temporarily unavailable.',
                ]);
                exit;
            }
        }
        return self::$instance;
    }

    private function __clone() {}
    public function __wakeup(): void { throw new \Exception('Cannot unserialize singleton.'); }
}
