# SickleCare Cameroon v3

Full-stack sickle cell disease awareness platform.
All text in English. Professional, human-designed UI.

## Structure
- `frontend/` — React 18 + Tailwind CSS 3 + Vite 5
- `backend/`  — PHP 8.1+ REST API with MySQL

## Quick Start

### Windows (XAMPP)
1. Copy `backend/` to `C:\xampp\htdocs\sicklecare\backend\`
2. Import `backend/schema.sql` in phpMyAdmin
3. Edit `backend/config/config.php` — set DB_PASS and JWT_SECRET
4. Visit `http://localhost/sicklecare/backend/api/debug_test.php` — all ✅
5. Delete debug_test.php
6. `cd frontend && npm install && npm run dev`

### .env for frontend (open with Notepad, not PowerShell)
```
VITE_API_URL=http://localhost/sicklecare/backend/api
```

## Admin
- URL: Navigate to /login, then use admin credentials
- Username: `superadmin`
- Password: `Admin@SickleCare2025`
- **Change this immediately after first login**

See `backend/SETUP.md` for full deployment instructions.
