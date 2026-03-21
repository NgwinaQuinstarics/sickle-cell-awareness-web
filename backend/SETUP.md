# SickleCare Cameroon — Setup & Deployment Guide

## Project Structure

```
sicklecare_cameroon/
├── frontend/                    ← React 18 + Tailwind CSS 3 + Vite 5
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx   Sticky responsive navbar with auth state
│   │   │   │   ├── Footer.jsx   Newsletter subscription + links
│   │   │   │   └── Guards.jsx   ProtectedRoute, AdminRoute, GuestRoute
│   │   │   └── ui/
│   │   │       └── index.jsx    Reusable: Spinner, Field, Modal, Accordion,
│   │   │                        StatCard, FeatureCard, RiskBadge, CompatTable
│   │   ├── context/
│   │   │   └── AuthContext.jsx  JWT auth state (login/register/adminLogin)
│   │   ├── hooks/
│   │   │   └── index.js         useForm, useAsync, useFetch, useStats,
│   │   │                        useCentres, useLocalStorage, useDisclosure,
│   │   │                        useScrolled, useOutsideClick, useQuiz
│   │   ├── pages/
│   │   │   ├── Home.jsx         Landing page with live stats
│   │   │   ├── Auth.jsx         Login + Register with validation
│   │   │   ├── InfoPages.jsx    About, Dangers, Prevention, Living, Resources
│   │   │   ├── FuncPages.jsx    Centres, Contact, Quiz, Pledge, Dashboard, App
│   │   │   └── Admin.jsx        Protected admin panel
│   │   ├── utils/
│   │   │   └── api.js           Axios client with JWT interceptors
│   │   └── App.jsx              Router with all routes
│   ├── .env                     ← Edit VITE_API_URL here
│   ├── .env.example
│   ├── package.json             Stable versions (Vite 5, React 18)
│   └── tailwind.config.js
│
└── backend/                     ← PHP 8.1+ REST API
    ├── .htaccess                Apache security hardening
    ├── .env.example
    ├── schema.sql               ← Import this FIRST
    ├── SETUP.md                 This file
    ├── config/
    │   ├── config.php           ⚙️ Set your credentials here
    │   └── database.php         Secure PDO singleton
    ├── middleware/
    │   └── Security.php         CORS, rate limiting, JWT, headers, honeypot
    ├── utils/
    │   ├── Logger.php           Rotating log files (redacts passwords)
    │   ├── RateLimiter.php      Sliding window with hard-block
    │   ├── Validator.php        Centralised input validation
    │   └── Mailer.php           Branded HTML email templates
    ├── api/
    │   ├── debug_test.php       🔍 Diagnostics — DELETE after use
    │   ├── auth/
    │   │   ├── register.php     POST — create user account
    │   │   └── login.php        POST — login + return JWT
    │   ├── contact/submit.php   POST — contact form
    │   ├── newsletter/subscribe.php POST — email signup
    │   ├── pledge/submit.php    POST — awareness pledge
    │   ├── quiz/submit.php      POST — risk quiz results
    │   ├── appointment/submit.php POST — book test appointment
    │   ├── centers/list.php     GET  — test centres by region
    │   ├── stats/public.php     GET  — live public counters
    │   └── admin/
    │       ├── login.php        POST — admin JWT auth
    │       ├── dashboard.php    GET  — admin stats (JWT)
    │       └── messages.php     GET/POST — message management (JWT)
    ├── logs/                    Auto-created, must be writable
    └── uploads/                 Reserved for future use
```

---

## Quick Start — Windows (XAMPP / Laragon)

### Backend
```cmd
# 1. Copy backend/ folder to:
C:\xampp\htdocs\sicklecare\backend\

# 2. Open phpMyAdmin → Create database: sicklecare_db
# 3. Import: backend/schema.sql

# 4. Edit backend/config/config.php:
define('DB_PASS', 'your_mysql_password');
define('JWT_SECRET', 'generate_with_openssl_rand_-hex_32');
define('APP_ENV', 'development');

# 5. Test: http://localhost/sicklecare/backend/api/debug_test.php
# 6. Delete debug_test.php after all checks pass
```

### Frontend
```cmd
cd frontend

# Install dependencies
npm install

# Edit .env (use Notepad — NOT PowerShell echo)
# Set: VITE_API_URL=http://localhost/sicklecare/backend/api

# Start dev server
npm run dev
# Opens at http://localhost:5173
```

---

## Quick Start — Linux / VPS

```bash
# Import schema
mysql -u root -p < backend/schema.sql

# Set permissions
chmod 750 backend/logs/ backend/uploads/
chown www-data:www-data backend/logs/ backend/uploads/
chmod 640 backend/config/config.php

# Set environment variables (add to .htaccess or server config)
export DB_PASS="strong_password"
export JWT_SECRET="$(openssl rand -hex 32)"
export APP_URL="https://yourdomain.cm"
export FRONTEND_URL="https://yourdomain.cm"

# Build frontend
cd frontend
echo "VITE_API_URL=https://yourdomain.cm/api" > .env.production
npm install
npm run build
# Deploy dist/ to your web root
```

---

## API Reference

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | /api/auth/register.php | None | Create user account |
| POST | /api/auth/login.php | None | Login → JWT |
| POST | /api/contact/submit.php | None | Contact form |
| POST | /api/newsletter/subscribe.php | None | Newsletter |
| POST | /api/pledge/submit.php | None | Awareness pledge |
| POST | /api/quiz/submit.php | None | Risk quiz |
| POST | /api/appointment/submit.php | None | Book appointment |
| GET | /api/centers/list.php?region=X | None | Test centres |
| GET | /api/stats/public.php | None | Public counters |
| POST | /api/admin/login.php | None | Admin login → JWT |
| GET | /api/admin/dashboard.php | JWT Bearer | Admin stats |
| GET | /api/admin/messages.php | JWT Bearer | Messages list |
| POST | /api/admin/messages.php?action=update_status | JWT Bearer | Update status |

---

## Security Checklist Before Going Live

- [ ] Changed default admin password (superadmin / Admin@SickleCare2025)
- [ ] DB_PASS set to a strong unique password
- [ ] JWT_SECRET generated (64 random chars: `openssl rand -hex 32`)
- [ ] ALLOWED_ORIGINS includes only your real domain
- [ ] APP_ENV set to `production`
- [ ] HTTPS active and redirect uncommented in .htaccess
- [ ] `debug_test.php` deleted
- [ ] `logs/` writable by web server user
- [ ] PHPMailer installed for reliable email delivery
- [ ] All forms tested end-to-end from the frontend

---

## Default Admin

| Field | Value |
|-------|-------|
| URL | /login (use admin login via adminLogin API) |
| Username | `superadmin` |
| Password | `Admin@SickleCare2025` |
| **⚠️ Change immediately after first login** | |

---

## PHP Requirements

- PHP 7.4+ (8.1+ strongly recommended)
- Extensions: `pdo_mysql`, `mbstring`, `openssl`, `json`
- MySQL 8.0+ or MariaDB 10.6+
- Apache with `mod_rewrite` enabled (or Nginx equivalent)
