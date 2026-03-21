<?php
/**
 * SickleCare Cameroon — Main Configuration
 * Set all sensitive values via environment variables in production.
 * Never commit real credentials to version control.
 */

// App
define('APP_ENV',  getenv('APP_ENV')  ?: 'production');
define('APP_NAME', 'SickleCare Cameroon');
define('APP_URL',  getenv('APP_URL')  ?: 'https://sicklecare.cm');

// Database
define('DB_HOST',    getenv('DB_HOST')    ?: 'localhost');
define('DB_PORT',    (int)(getenv('DB_PORT') ?: 3306));
define('DB_NAME',    getenv('DB_NAME')    ?: 'sicklecare_db');
define('DB_USER',    getenv('DB_USER')    ?: 'sicklecare_user');
define('DB_PASS',    getenv('DB_PASS')    ?: 'CHANGE_THIS_PASSWORD');
define('DB_CHARSET', 'utf8mb4');

// CORS — list every frontend URL that is allowed to call this API
define('ALLOWED_ORIGINS', array_filter([
    getenv('FRONTEND_URL') ?: '',
    'https://sicklecare.cm',
    'https://www.sicklecare.cm',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
]));

// Security
define('JWT_SECRET',       getenv('JWT_SECRET') ?: 'REPLACE_WITH_64_CHAR_RANDOM_STRING');
define('BCRYPT_COST',      12);
define('SESSION_LIFETIME', 3600); // 1 hour

// Rate limiting — [max requests, window in seconds]
define('RATE_LIMITS', [
    'register'    => [3,  600],
    'login'       => [5,  300],
    'admin_login' => [5,  300],
    'contact'     => [3,   60],
    'newsletter'  => [5,   60],
    'pledge'      => [2,   60],
    'quiz'        => [10,  60],
    'appointment' => [5,   60],
    'default'     => [60,  60],
]);

// Email (SMTP)
define('MAIL_HOST',      getenv('MAIL_HOST')  ?: 'smtp.gmail.com');
define('MAIL_PORT',      (int)(getenv('MAIL_PORT') ?: 587));
define('MAIL_USER',      getenv('MAIL_USER')  ?: 'noreply@sicklecare.cm');
define('MAIL_PASS',      getenv('MAIL_PASS')  ?: '');
define('MAIL_FROM_NAME', APP_NAME);
define('MAIL_ADMIN',     getenv('MAIL_ADMIN') ?: 'admin@sicklecare.cm');

// Paths
define('BASE_PATH',   dirname(__DIR__));
define('LOG_PATH',    BASE_PATH . '/logs');
define('UPLOAD_PATH', BASE_PATH . '/uploads');

// Validation
define('MAX_NAME',    100);
define('MAX_EMAIL',   254);
define('MAX_MSG',     5000);
define('HONEYPOT',    'website_url');

// Blocked disposable email domains
define('BLOCKED_DOMAINS', [
    'mailinator.com', 'guerrillamail.com', 'tempmail.com',
    '10minutemail.com', 'yopmail.com', 'throwam.com', 'trashmail.com',
]);

// Spam keywords
define('SPAM_WORDS', [
    'casino', 'forex', 'bitcoin invest', 'click here to win',
    'viagra', 'enlarge', 'earn from home', 'make money fast',
]);

// Cameroon regions
define('CM_REGIONS', [
    'Centre', 'Littoral', 'West', 'North-West', 'South-West',
    'North', 'Far North', 'Adamaoua', 'East', 'South',
]);

// Cameroon phone (9 digits after optional +237 prefix)
define('CM_PHONE_REGEX', '/^(\+237|237)?[0-9]{9}$/');

// Error display
if (APP_ENV === 'development') {
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', 0);
    error_reporting(0);
}
