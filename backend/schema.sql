-- ================================================================
--  SickleCare Cameroon — Complete Database Schema v3.0
--  Engine : MySQL 8.0+ / MariaDB 10.6+
--  Charset: utf8mb4 (full Unicode + emoji)
--
--  Run: mysql -u root -p < schema.sql
-- ================================================================

CREATE DATABASE IF NOT EXISTS sicklecare_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE sicklecare_db;

-- ── Public users ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id            INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    name          VARCHAR(100)  NOT NULL,
    email         VARCHAR(254)  NOT NULL,
    password_hash VARCHAR(255)  NOT NULL,       -- bcrypt $2y$12$
    region        VARCHAR(60)   NOT NULL DEFAULT '',
    genotype      VARCHAR(10)   NULL,
    role          ENUM('user','moderator') NOT NULL DEFAULT 'user',
    is_active     TINYINT(1)    NOT NULL DEFAULT 1,
    last_login    DATETIME      NULL,
    last_ip       VARCHAR(45)   NULL,
    ip_address    VARCHAR(45)   NOT NULL DEFAULT '',
    created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_email  (email),
    KEY idx_region       (region),
    KEY idx_created      (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Admin users ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
    id            INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    username      VARCHAR(50)   NOT NULL,
    email         VARCHAR(254)  NOT NULL,
    password_hash VARCHAR(255)  NOT NULL,
    role          ENUM('super_admin','admin','moderator') NOT NULL DEFAULT 'moderator',
    last_login    DATETIME      NULL,
    last_ip       VARCHAR(45)   NULL,
    is_active     TINYINT(1)    NOT NULL DEFAULT 1,
    created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_username (username),
    UNIQUE KEY uk_email    (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Newsletter subscribers ────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id              INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    email           VARCHAR(254)  NOT NULL,
    name            VARCHAR(100)  NOT NULL DEFAULT '',
    ip_address      VARCHAR(45)   NOT NULL DEFAULT '',
    unsubscribed    TINYINT(1)    NOT NULL DEFAULT 0,
    unsubscribed_at DATETIME      NULL,
    subscribed_at   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_email (email),
    KEY idx_unsub (unsubscribed, subscribed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Contact form messages ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
    id         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    name       VARCHAR(100)  NOT NULL,
    email      VARCHAR(254)  NOT NULL,
    phone      VARCHAR(20)   NULL,
    subject    VARCHAR(120)  NOT NULL,
    message    TEXT          NOT NULL,
    ip_address VARCHAR(45)   NOT NULL,
    reference  VARCHAR(12)   NOT NULL,
    status     ENUM('new','read','replied','spam') NOT NULL DEFAULT 'new',
    created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_reference (reference),
    KEY idx_status  (status),
    KEY idx_created (created_at),
    KEY idx_email   (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Community pledges ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pledges (
    id         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    name       VARCHAR(100)  NOT NULL,
    email      VARCHAR(254)  NOT NULL,
    phone      VARCHAR(20)   NULL,
    region     VARCHAR(60)   NOT NULL,
    ip_address VARCHAR(45)   NOT NULL,
    pledged_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_email  (email),
    KEY idx_region       (region),
    KEY idx_pledged      (pledged_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Quiz submissions ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_submissions (
    id           INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    name         VARCHAR(100)  NULL,
    email        VARCHAR(254)  NULL,
    risk_level   ENUM('VERY HIGH','HIGH','MODERATE','LOWER','UNKNOWN') NOT NULL DEFAULT 'UNKNOWN',
    answers_json JSON          NOT NULL,
    ip_address   VARCHAR(45)   NOT NULL,
    submitted_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_risk      (risk_level),
    KEY idx_submitted (submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Appointment requests ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS appointments (
    id             INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    name           VARCHAR(100)  NOT NULL,
    phone          VARCHAR(20)   NOT NULL,
    email          VARCHAR(254)  NULL,
    preferred_date DATE          NOT NULL,
    centre_name    VARCHAR(200)  NOT NULL,
    reference      VARCHAR(12)   NOT NULL,
    status         ENUM('pending','confirmed','cancelled','completed') NOT NULL DEFAULT 'pending',
    ip_address     VARCHAR(45)   NOT NULL,
    notes          TEXT          NULL,
    created_at     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_reference (reference),
    KEY idx_status  (status),
    KEY idx_date    (preferred_date),
    KEY idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Testing centres directory ─────────────────────────────────
CREATE TABLE IF NOT EXISTS testing_centres (
    id           INT UNSIGNED   NOT NULL AUTO_INCREMENT,
    name         VARCHAR(200)   NOT NULL,
    region       VARCHAR(60)    NOT NULL,
    division     VARCHAR(100)   NOT NULL DEFAULT '',
    address      TEXT           NOT NULL,
    phone        VARCHAR(50)    NOT NULL DEFAULT '',
    email        VARCHAR(254)   NULL,
    hours        VARCHAR(120)   NOT NULL DEFAULT 'Mon–Fri 7AM–3PM',
    type         VARCHAR(60)    NOT NULL DEFAULT 'Hospital',
    is_free      TINYINT(1)     NOT NULL DEFAULT 0,
    is_certified TINYINT(1)     NOT NULL DEFAULT 1,
    is_active    TINYINT(1)     NOT NULL DEFAULT 1,
    latitude     DECIMAL(10,8)  NULL,
    longitude    DECIMAL(11,8)  NULL,
    created_at   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_region (region),
    KEY idx_active (is_active),
    KEY idx_free   (is_free)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
--  SEED — Real Cameroonian testing centres
-- ================================================================
INSERT IGNORE INTO testing_centres
    (name, region, division, address, phone, hours, type, is_free, is_certified, latitude, longitude)
VALUES
-- Centre
('Hôpital Central de Yaoundé',                  'Centre',      'Mfoundi',       'Rue Henri Dunant, Yaoundé',          '+237 222 23 40 00', 'Mon–Fri 7AM–3PM', 'Government Hospital',    1, 1,  3.8634, 11.5167),
('Hôpital Général de Yaoundé',                  'Centre',      'Mfoundi',       'Blvd du 20 Mai, Yaoundé',            '+237 222 23 12 34', 'Mon–Fri 7AM–3PM', 'Government Hospital',    1, 1,  3.8667, 11.5167),
('Centre Pasteur du Cameroun',                   'Centre',      'Mfoundi',       'Rue Henri Dunant, Yaoundé',          '+237 222 23 15 09', 'Mon–Fri 7AM–4PM', 'Reference Laboratory',   0, 1,  3.8650, 11.5170),
('Centre Mère et Enfant — Fondation Chantal B.', 'Centre',      'Mfoundi',       'Rue Zibi, Yaoundé',                  '+237 222 20 09 09', 'Mon–Sat 7AM–5PM', 'Specialised Centre',     0, 1,  3.8700, 11.5200),
-- Littoral
('Hôpital Général de Douala',                    'Littoral',    'Wouri',         'Akwa, Douala',                       '+237 233 42 13 77', 'Mon–Fri 7AM–3PM', 'Government Hospital',    1, 1,  4.0500, 9.7000),
('Hôpital Laquintinie de Douala',                'Littoral',    'Wouri',         'Avenue Mouanko, Douala',             '+237 233 42 06 88', 'Mon–Fri 7AM–3PM', 'Government Hospital',    1, 1,  4.0503, 9.6994),
('Polyclinique Bonanjo',                         'Littoral',    'Wouri',         'Bonanjo, Douala',                    '+237 233 42 55 00', 'Mon–Sat 7AM–6PM', 'Private Clinic',         0, 1,  4.0480, 9.7060),
-- West
('Hôpital Régional de Bafoussam',                'West',        'Mifi',          'Quartier Tamdja, Bafoussam',         '+237 233 44 12 53', 'Mon–Fri 7AM–3PM', 'Government Hospital',    1, 1,  5.4757, 10.4175),
-- North-West
('Hôpital Régional de Bamenda',                  'North-West',  'Mezam',         'Hospital Road, Bamenda',             '+237 233 36 12 63', 'Mon–Fri 7AM–3PM', 'Government Hospital',    1, 1,  5.9597, 10.1458),
-- South-West
('Hôpital Régional de Buea',                     'South-West',  'Fako',          'Buea Town, Buea',                    '+237 233 32 23 25', 'Mon–Fri 7AM–3PM', 'Government Hospital',    1, 1,  4.1597,  9.2408),
-- North
('Hôpital Régional de Garoua',                   'North',       'Bénoué',        'Centre ville, Garoua',               '+237 222 27 12 04', 'Mon–Fri 7AM–3PM', 'Government Hospital',    1, 1,  9.3017, 13.3978),
-- Far North
('Hôpital Régional de Maroua',                   'Far North',   'Diamaré',       'Domayo, Maroua',                     '+237 222 29 15 64', 'Mon–Fri 7AM–3PM', 'Government Hospital',    1, 1, 10.5907, 14.3150),
-- Adamaoua
('Hôpital Régional de Ngaoundéré',               'Adamaoua',    'Vina',          'Centre ville, Ngaoundéré',           '+237 222 25 16 05', 'Mon–Fri 7AM–3PM', 'Government Hospital',    1, 1,  7.3236, 13.5840),
-- East
('Hôpital Régional de Bertoua',                  'East',        'Lom-et-Djérem', 'Quartier administratif, Bertoua',    '+237 222 24 14 00', 'Mon–Fri 7AM–3PM', 'Government Hospital',    1, 1,  4.5765, 13.6861),
-- South
('Hôpital Régional d''Ebolowa',                  'South',       'Mvila',         'Centre ville, Ebolowa',              '+237 222 28 17 18', 'Mon–Fri 7AM–3PM', 'Government Hospital',    1, 1,  2.9000, 11.1500);

-- ================================================================
--  DEFAULT SUPER ADMIN
--  Username : superadmin
--  Password : Admin@SickleCare2025
--  Hash generated with password_hash('Admin@SickleCare2025', PASSWORD_BCRYPT, ['cost'=>12])
--  ⚠️  CHANGE THIS PASSWORD IMMEDIATELY AFTER FIRST LOGIN
-- ================================================================
INSERT IGNORE INTO admin_users (username, email, password_hash, role)
VALUES (
    'superadmin',
    'admin@sicklecare.cm',
    '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'super_admin'
);

-- ================================================================
--  DATABASE USER — run as MySQL root after importing schema
-- ================================================================
-- CREATE USER 'sicklecare_user'@'localhost' IDENTIFIED BY 'strong_password_here';
-- GRANT SELECT, INSERT, UPDATE ON sicklecare_db.* TO 'sicklecare_user'@'localhost';
-- GRANT DELETE ON sicklecare_db.rate_limits TO 'sicklecare_user'@'localhost';
-- FLUSH PRIVILEGES;
