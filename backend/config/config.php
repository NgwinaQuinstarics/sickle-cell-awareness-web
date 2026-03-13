<?php
/**
 * SickleCare Platform — Main Configuration
 * Keep this file OUTSIDE the web root in production
 */

define('APP_ENV', getenv('APP_ENV') ?: 'production');
define('APP_VERSION', '1.0.0');
define('APP_NAME', 'SickleCare');

// Database Configuration — override with environment variables in production
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'sicklecare_db');
define('DB_USER', getenv('DB_USER') ?: 'sicklecare_user');
define('DB_PASS', getenv('DB_PASS') ?: 'change_this_strong_password');
define('DB_CHARSET', 'utf8mb4');
define('DB_PORT', (int)(getenv('DB_PORT') ?: 3306));

// Security
define('ALLOWED_ORIGINS', [
    'https://sicklecare.org',
    'https://www.sicklecare.org',
    'http://localhost:5173',   // Vite dev server
    'http://localhost:3000',
]);
define('JWT_SECRET', getenv('JWT_SECRET') ?: 'CHANGE_THIS_IN_PRODUCTION_RANDOM_64_CHAR_STRING');
define('API_RATE_LIMIT', 60);      // requests per window
define('RATE_LIMIT_WINDOW', 60);   // seconds

// Email (SMTP)
define('MAIL_HOST', getenv('MAIL_HOST') ?: 'smtp.gmail.com');
define('MAIL_PORT', (int)(getenv('MAIL_PORT') ?: 587));
define('MAIL_USER', getenv('MAIL_USER') ?: 'noreply@sicklecare.org');
define('MAIL_PASS', getenv('MAIL_PASS') ?: 'your_app_password');
define('MAIL_FROM_NAME', 'SickleCare Nigeria');
define('MAIL_ADMIN', 'admin@sicklecare.org');

// Paths
define('BASE_PATH', dirname(__DIR__));
define('LOG_PATH', BASE_PATH . '/logs');
define('UPLOAD_PATH', BASE_PATH . '/uploads');

// Limits
define('MAX_MESSAGE_LENGTH', 5000);
define('MAX_NAME_LENGTH', 100);
define('UPLOAD_MAX_SIZE', 5 * 1024 * 1024); // 5MB

// Honeypot field name (bot trap)
define('HONEYPOT_FIELD', 'website_url');
