# SickleCare — Full Stack Deployment Guide

## Project Structure

```
sicklecare/
├── frontend/          # React.js (Vite) — deploy to CDN or static host
│   ├── src/
│   │   ├── components/    Navbar, Footer, Toast
│   │   ├── pages/         Home, Dangers, About, Prevention, Quiz, Centers,
│   │   │                  Living, Resources, Pledge, Contact
│   │   ├── utils/api.js   API client (talks to PHP backend)
│   │   └── hooks/         useToast
│   └── dist/          # Production build output
│
└── backend/           # PHP 8.1+ — deploy to Apache/Nginx shared hosting
    ├── api/
    │   ├── newsletter/subscribe.php
    │   ├── contact/submit.php
    │   ├── pledge/submit.php
    │   ├── quiz/submit.php
    │   ├── appointment/submit.php
    │   ├── stats/public.php
    │   └── centers/list.php
    ├── config/
    │   ├── config.php     ← Set DB credentials here
    │   └── database.php
    ├── middleware/
    │   └── Security.php   CORS, rate limiting, validation
    ├── utils/
    │   ├── Logger.php
    │   ├── RateLimiter.php
    │   └── Mailer.php
    ├── schema.sql         ← Run this first in MySQL
    └── .htaccess
```

---

## 🚀 Quick Deployment

### Step 1: Database Setup
```sql
mysql -u root -p < backend/schema.sql
```

### Step 2: Configure Backend
Edit `backend/config/config.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'sicklecare_db');
define('DB_USER', 'sicklecare_user');
define('DB_PASS', 'your_strong_password');
define('JWT_SECRET', 'random_64_character_string');
define('MAIL_USER', 'noreply@yourdomain.com');
define('MAIL_PASS', 'your_smtp_password');
```

Or use environment variables (recommended):
```bash
export DB_PASS="your_password"
export JWT_SECRET="$(openssl rand -hex 32)"
```

### Step 3: Upload Backend
- Upload `backend/` to your PHP hosting (e.g., `/public_html/api/`)
- The `config/`, `middleware/`, `utils/`, `logs/` folders must be accessible to PHP but NOT web-accessible
- Make `logs/` writable: `chmod 750 logs/`

### Step 4: Build & Deploy Frontend
```bash
cd frontend
# Set API URL
echo "VITE_API_URL=https://yourdomain.com/api" > .env.production
npm run build
# Upload dist/ to your web server or CDN
```

### Step 5: Configure Frontend API URL
In `frontend/.env.production`:
```
VITE_API_URL=https://api.sicklecare.org/api
```

---

## 🔒 Security Features

### Backend
- ✅ CORS whitelist (only your domain allowed)
- ✅ Rate limiting per IP per action
- ✅ PDO prepared statements (SQL injection prevention)
- ✅ Input sanitization & validation
- ✅ Honeypot spam trap
- ✅ Spam keyword detection
- ✅ Security HTTP headers (CSP, HSTS, X-Frame-Options)
- ✅ Secure file permissions via .htaccess
- ✅ No sensitive data in logs
- ✅ Audit trail logging
- ✅ Email confirmation for all actions
- ✅ Disposable email blocking
- ✅ Phone number validation (Nigerian format)

### Frontend
- ✅ Client-side form validation
- ✅ No secrets in frontend code
- ✅ All API calls over HTTPS
- ✅ XSS-safe React rendering

---

## 🗄️ Database Tables

| Table | Purpose |
|-------|---------|
| `newsletter_subscribers` | Email newsletter list |
| `contact_messages` | Contact form submissions |
| `pledges` | Public awareness pledges |
| `quiz_submissions` | Risk quiz responses |
| `appointments` | Testing center appointment requests |
| `testing_centers` | Directory of certified centers |
| `admin_users` | Admin dashboard access |

---

## 📧 Email Configuration

The system uses PHP `mail()` by default. For production, integrate **PHPMailer** with an SMTP provider:

```bash
# In backend directory
composer require phpmailer/phpmailer
```

Then update `Mailer.php` to use PHPMailer with your SMTP credentials.

Recommended: **SendGrid** (free tier: 100 emails/day), **Mailgun**, or **Postmark**.

---

## 🔧 PHP Requirements

- PHP 8.1+
- PDO with MySQL driver
- `pdo_mysql` extension
- `openssl` extension
- Apache with mod_rewrite OR Nginx
- MySQL 8.0+ or MariaDB 10.6+

---

## 🌐 Nginx Config (Alternative to Apache)

```nginx
server {
    listen 443 ssl http2;
    server_name api.sicklecare.org;
    root /var/www/sicklecare/backend;

    # Block sensitive directories
    location ~ ^/(config|middleware|utils|logs|uploads)/ {
        deny all;
        return 404;
    }

    # Only allow API directory
    location /api/ {
        try_files $uri $uri/ =404;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
}
```

---

## 📋 Features Summary

| Feature | Status |
|---------|--------|
| Newsletter Signup | ✅ Functional |
| Contact Form (validated) | ✅ Functional |
| Pledge System | ✅ Functional |
| Risk Assessment Quiz | ✅ Functional |
| Appointment Booking | ✅ Functional |
| Test Center Directory | ✅ Functional |
| Email Notifications | ✅ Functional |
| Rate Limiting | ✅ Active |
| Spam Protection | ✅ Active |
| Audit Logging | ✅ Active |
| Mobile Responsive | ✅ Full |
| SEO Optimized | ✅ Meta tags |

---

## 💬 Support

Email: hello@sicklecare.org  
Website: https://sicklecare.org
