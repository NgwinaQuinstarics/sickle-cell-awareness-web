-- ============================================================
-- SickleCare Database Schema
-- Run this SQL to create all required tables
-- ============================================================

CREATE DATABASE IF NOT EXISTS sicklecare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sicklecare_db;

-- ============================================================
-- Newsletter Subscribers
-- ============================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id             INT UNSIGNED     NOT NULL AUTO_INCREMENT,
    email          VARCHAR(255)     NOT NULL,
    name           VARCHAR(100)     NOT NULL DEFAULT '',
    ip_address     VARCHAR(45)      NOT NULL DEFAULT '',
    unsubscribed   TINYINT(1)       NOT NULL DEFAULT 0,
    unsubscribed_at DATETIME        NULL,
    subscribed_at  DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_email (email),
    KEY idx_subscribed (unsubscribed, subscribed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Contact Form Messages
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    name       VARCHAR(100)  NOT NULL,
    email      VARCHAR(255)  NOT NULL,
    phone      VARCHAR(20)   NULL,
    subject    VARCHAR(100)  NOT NULL,
    message    TEXT          NOT NULL,
    ip_address VARCHAR(45)   NOT NULL,
    reference  VARCHAR(8)    NOT NULL,
    status     ENUM('new','read','replied','spam') NOT NULL DEFAULT 'new',
    created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_reference (reference),
    KEY idx_status (status),
    KEY idx_created (created_at),
    KEY idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Pledges
-- ============================================================
CREATE TABLE IF NOT EXISTS pledges (
    id         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    name       VARCHAR(100)  NOT NULL,
    email      VARCHAR(255)  NOT NULL,
    phone      VARCHAR(20)   NULL,
    state      VARCHAR(50)   NOT NULL,
    ip_address VARCHAR(45)   NOT NULL,
    verified   TINYINT(1)    NOT NULL DEFAULT 0,
    pledged_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_email (email),
    KEY idx_state (state),
    KEY idx_pledged (pledged_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Quiz Submissions
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_submissions (
    id           INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    name         VARCHAR(100)  NULL,
    email        VARCHAR(255)  NULL,
    risk_level   ENUM('VERY HIGH','HIGH','MODERATE','LOWER','UNKNOWN') NOT NULL DEFAULT 'UNKNOWN',
    answers_json JSON          NOT NULL,
    ip_address   VARCHAR(45)   NOT NULL,
    submitted_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_risk (risk_level),
    KEY idx_submitted (submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Appointment Requests
-- ============================================================
CREATE TABLE IF NOT EXISTS appointments (
    id             INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    name           VARCHAR(100)  NOT NULL,
    phone          VARCHAR(20)   NOT NULL,
    email          VARCHAR(255)  NULL,
    preferred_date DATE          NOT NULL,
    center_name    VARCHAR(200)  NOT NULL,
    reference      VARCHAR(10)   NOT NULL,
    status         ENUM('pending','confirmed','cancelled','completed') NOT NULL DEFAULT 'pending',
    ip_address     VARCHAR(45)   NOT NULL,
    notes          TEXT          NULL,
    created_at     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_reference (reference),
    KEY idx_status (status),
    KEY idx_date (preferred_date),
    KEY idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Testing Centers Directory
-- ============================================================
CREATE TABLE IF NOT EXISTS testing_centers (
    id           INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    name         VARCHAR(200)  NOT NULL,
    state        VARCHAR(50)   NOT NULL,
    lga          VARCHAR(100)  NOT NULL DEFAULT '',
    address      TEXT          NOT NULL,
    phone        VARCHAR(50)   NOT NULL DEFAULT '',
    email        VARCHAR(255)  NULL,
    hours        VARCHAR(100)  NOT NULL DEFAULT 'Mon–Fri 8AM–5PM',
    type         VARCHAR(50)   NOT NULL DEFAULT 'Hospital',
    is_free      TINYINT(1)    NOT NULL DEFAULT 0,
    is_certified TINYINT(1)    NOT NULL DEFAULT 1,
    is_active    TINYINT(1)    NOT NULL DEFAULT 1,
    latitude     DECIMAL(10,8) NULL,
    longitude    DECIMAL(11,8) NULL,
    created_at   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_state (state),
    KEY idx_active (is_active),
    KEY idx_free (is_free)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Rate Limiting (optional — DB-based alternative to files)
-- ============================================================
CREATE TABLE IF NOT EXISTS rate_limits (
    id         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    ip_hash    CHAR(32)      NOT NULL,
    action     VARCHAR(50)   NOT NULL,
    count      INT           NOT NULL DEFAULT 1,
    reset_at   INT UNSIGNED  NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_ip_action (ip_hash, action),
    KEY idx_reset (reset_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Admin Users (for admin dashboard)
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id           INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    username     VARCHAR(50)   NOT NULL,
    email        VARCHAR(255)  NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  -- bcrypt
    role         ENUM('super_admin','admin','moderator') NOT NULL DEFAULT 'moderator',
    last_login   DATETIME      NULL,
    is_active    TINYINT(1)    NOT NULL DEFAULT 1,
    created_at   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_username (username),
    UNIQUE KEY uk_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Seed Initial Data — Sample Testing Centers
-- ============================================================
INSERT IGNORE INTO testing_centers (name, state, lga, address, phone, hours, type, is_free, is_certified) VALUES
('Lagos University Teaching Hospital (LUTH)', 'Lagos', 'Mushin', 'Idi-Araba, Surulere, Lagos', '01-774-0020', 'Mon–Fri 8AM–5PM', 'Teaching Hospital', 1, 1),
('Lagos Island General Hospital', 'Lagos', 'Lagos Island', '1 Broad Street, Lagos Island', '01-263-0372', 'Mon–Fri 8AM–4PM', 'Government Hospital', 1, 1),
('National Hospital Abuja', 'FCT Abuja', 'Municipal', 'Central Business District, Abuja', '09-523-5300', 'Mon–Fri 8AM–5PM', 'Federal Hospital', 1, 1),
('Aminu Kano Teaching Hospital', 'Kano', 'Municipal', 'Zaria Road, Kano', '064-661-261', 'Mon–Fri 8AM–5PM', 'Teaching Hospital', 1, 1),
('University of Port Harcourt Teaching Hospital', 'Rivers', 'Obio-Akpor', 'East-West Road, Port Harcourt', '084-230-921', 'Mon–Fri 8AM–5PM', 'Teaching Hospital', 1, 1),
('University College Hospital (UCH)', 'Oyo', 'Ibadan North', 'Queen Elizabeth II Road, Ibadan', '02-241-1768', 'Mon–Fri 8AM–5PM', 'Teaching Hospital', 1, 1),
('Enugu State University Teaching Hospital (ESUTH)', 'Enugu', 'Enugu North', 'Parklane, Enugu', '042-259-611', 'Mon–Fri 8AM–5PM', 'Teaching Hospital', 1, 1);

-- ============================================================
-- Create dedicated DB user (run as MySQL root)
-- ============================================================
-- CREATE USER 'sicklecare_user'@'localhost' IDENTIFIED BY 'your_strong_password';
-- GRANT SELECT, INSERT, UPDATE ON sicklecare_db.* TO 'sicklecare_user'@'localhost';
-- GRANT DELETE ON sicklecare_db.rate_limits TO 'sicklecare_user'@'localhost';
-- FLUSH PRIVILEGES;
