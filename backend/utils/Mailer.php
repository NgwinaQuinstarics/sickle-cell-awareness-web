<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/Logger.php';

/**
 * Mailer — branded HTML email templates.
 *
 * Uses PHP mail() by default.
 * For production: install PHPMailer with `composer require phpmailer/phpmailer`
 * then uncomment the PHPMailer block in send() below.
 */
class Mailer
{
    // ── Public helpers ────────────────────────────────────────

    public static function welcome(string $to, string $name): void
    {
        self::send($to, APP_NAME . ' — Welcome to SickleCare Cameroon',
            self::tpl('Welcome to SickleCare', $name,
                '<p>Thank you for joining SickleCare Cameroon. You have taken an important step toward protecting your health and your family\'s future.</p>
                <div style="background:#fef2f2;border-left:4px solid #e22410;padding:16px 20px;border-radius:8px;margin:20px 0;">
                    <strong style="color:#e22410;">Your next step:</strong><br>
                    Find a certified genotype testing centre near you. The test is quick, often free, and could change everything for your family.
                </div>
                <div style="text-align:center;margin:24px 0;">
                    <a href="' . APP_URL . '/centres" style="background:#e22410;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">Find a Test Centre</a>
                </div>'
            )
        );
    }

    public static function contactConfirm(string $to, string $name, string $subject, string $ref): void
    {
        self::send($to, 'Message received — Ref: ' . $ref . ' | ' . APP_NAME,
            self::tpl('We received your message', $name,
                '<p>Thank you for reaching out. We have received your message about: <strong>"' . $subject . '"</strong></p>
                <p>Your reference number: <strong style="color:#e22410;">' . $ref . '</strong> — keep this for follow-ups.</p>
                <p>Our team will respond within <strong>24 business hours</strong>. For medical emergencies, call <strong>15</strong> (SAMU Cameroon) or visit your nearest hospital.</p>'
            )
        );
    }

    public static function pledgeCert(string $to, string $name, string $region): void
    {
        self::send($to, APP_NAME . ' — Your Pledge is Recorded 🎉',
            self::tpl('Pledge Confirmed!', $name,
                '<div style="text-align:center;background:linear-gradient(135deg,#96281B,#e22410);color:#fff;padding:28px;border-radius:12px;margin-bottom:24px;">
                    <div style="font-size:40px;margin-bottom:8px;">🤝</div>
                    <h2 style="margin:0 0 6px;">Pledge Confirmed!</h2>
                    <p style="margin:0;opacity:0.9;">You are part of the movement to end sickle cell disease in Cameroon.</p>
                </div>
                <p><strong>' . $name . '</strong> from <strong>' . $region . '</strong> — you have pledged to get tested, educate your community, and support those living with SCD.</p>
                <div style="text-align:center;margin:24px 0;">
                    <a href="' . APP_URL . '/centres" style="background:#e22410;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">Book My Genotype Test</a>
                </div>'
            )
        );
    }

    public static function appointmentConfirm(string $to, string $name, string $centre, string $date, string $ref): void
    {
        self::send($to, 'Appointment confirmed — ' . $ref . ' | ' . APP_NAME,
            self::tpl('Appointment Request Submitted', $name,
                '<p>Your appointment request has been received:</p>
                <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:600;">Reference</td><td style="padding:10px 12px;border:1px solid #e2e8f0;color:#e22410;font-weight:700;">' . $ref . '</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:600;">Test Centre</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">' . $centre . '</td></tr>
                    <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:600;">Preferred Date</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">' . $date . '</td></tr>
                </table>
                <div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:14px 18px;border-radius:8px;">
                    The centre will contact you to confirm. Please arrive 15 minutes early with a valid ID.
                </div>'
            )
        );
    }

    public static function notifyAdmin(string $subject, string $body): void
    {
        self::send(MAIL_ADMIN, '[' . APP_NAME . '] ' . $subject, self::tpl('Admin Alert', 'Team', $body));
    }

    // ── Core send ─────────────────────────────────────────────

    private static function send(string $to, string $subject, string $html): bool
    {
        /*
         * ── PHPMailer (recommended for production) ───────────
         * After running: composer require phpmailer/phpmailer
         * Uncomment the block below and remove the mail() fallback.
         *
         * require_once BASE_PATH . '/vendor/autoload.php';
         * use PHPMailer\PHPMailer\PHPMailer;
         * $mail = new PHPMailer(true);
         * try {
         *     $mail->isSMTP();
         *     $mail->Host       = MAIL_HOST;
         *     $mail->SMTPAuth   = true;
         *     $mail->Username   = MAIL_USER;
         *     $mail->Password   = MAIL_PASS;
         *     $mail->SMTPSecure = 'tls';
         *     $mail->Port       = MAIL_PORT;
         *     $mail->setFrom(MAIL_USER, MAIL_FROM_NAME);
         *     $mail->addAddress($to);
         *     $mail->isHTML(true);
         *     $mail->Subject = $subject;
         *     $mail->Body    = $html;
         *     $mail->AltBody = strip_tags($html);
         *     $mail->send();
         *     Logger::info('Email sent', ['to' => $to]);
         *     return true;
         * } catch (\Exception $e) {
         *     Logger::error('Email failed', ['to' => $to, 'err' => $e->getMessage()]);
         *     return false;
         * }
         */

        // ── Fallback: PHP mail() ──────────────────────────────
        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= 'From: ' . MAIL_FROM_NAME . ' <' . MAIL_USER . ">\r\n";
        $headers .= 'Reply-To: ' . MAIL_USER . "\r\n";
        $headers .= "X-Mailer: SickleCare-CM/3.0\r\n";

        $result = @mail($to, $subject, $html, $headers);

        if ($result) {
            Logger::info('Email sent', ['to' => $to, 'subject' => $subject]);
        } else {
            Logger::error('Email failed', ['to' => $to, 'subject' => $subject]);
        }

        return (bool)$result;
    }

    // ── HTML template ─────────────────────────────────────────

    private static function tpl(string $heading, string $name, string $body): string
    {
        $year    = date('Y');
        $appUrl  = APP_URL;
        $admin   = MAIL_ADMIN;
        $appName = APP_NAME;

        return "<!DOCTYPE html>
<html lang='en'>
<head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'>
<title>{$heading}</title></head>
<body style='margin:0;padding:0;background:#f1f5f9;font-family:Inter,Helvetica,Arial,sans-serif;'>
<div style='max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);'>
  <div style='background:linear-gradient(135deg,#96281B,#e22410);padding:28px 32px;'>
    <div style='color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.3px;'>🩸 {$appName}</div>
    <div style='color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin-top:2px;'>Know Your Genotype. Protect Your Family.</div>
  </div>
  <div style='padding:32px;'>
    <h1 style='font-size:18px;color:#0f172a;margin:0 0 6px;'>{$heading}</h1>
    <p style='color:#64748b;font-size:14px;margin:0 0 20px;'>Hi {$name},</p>
    <div style='font-size:14px;color:#475569;line-height:1.7;'>
      {$body}
    </div>
  </div>
  <div style='background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;'>
    <p style='margin:0;font-size:11px;color:#94a3b8;line-height:1.6;'>
      &copy; {$year} {$appName}. All rights reserved.<br>
      This platform provides educational information only. Always consult a qualified healthcare professional for medical advice.<br>
      <a href='{$appUrl}' style='color:#e22410;'>{$appUrl}</a> &nbsp;|&nbsp; <a href='mailto:{$admin}' style='color:#e22410;'>{$admin}</a>
    </p>
  </div>
</div>
</body></html>";
    }
}
