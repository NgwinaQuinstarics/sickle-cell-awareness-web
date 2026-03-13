<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/Logger.php';

/**
 * Simple SMTP mailer (no external dependencies).
 * In production, replace with PHPMailer or SendGrid SDK.
 */
class Mailer {

    public static function send(string $to, string $toName, string $subject, string $htmlBody): bool {
        // In production, use PHPMailer with SMTP credentials
        // For now, uses PHP mail() as fallback
        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "From: " . MAIL_FROM_NAME . " <" . MAIL_USER . ">\r\n";
        $headers .= "Reply-To: " . MAIL_USER . "\r\n";
        $headers .= "X-Mailer: SickleCare/1.0\r\n";

        $result = mail($to, $subject, $htmlBody, $headers);
        if (!$result) {
            Logger::error("Mail failed to: $to | Subject: $subject");
        } else {
            Logger::info("Mail sent to: $to | Subject: $subject");
        }
        return $result;
    }

    public static function sendWelcome(string $email, string $name): void {
        $subject = 'Welcome to SickleCare — Your Genotype Journey Starts Now';
        $body = self::template('Welcome', $name, "
            <p>Thank you for joining SickleCare! You've taken an important step toward protecting your health and your family's future.</p>
            <div style='background:#FEF2F2;border-left:4px solid #C0392B;padding:16px 20px;border-radius:8px;margin:20px 0;'>
                <strong style='color:#C0392B;'>Your Next Step:</strong><br>
                Find a certified genotype testing center near you. The test is quick, often free, and could change everything.
            </div>
            <p>If you haven't been tested yet, use our <a href='https://sicklecare.org/centers' style='color:#C0392B;'>Testing Center Finder</a> to locate the nearest certified lab.</p>
        ");
        self::send($email, $name, $subject, $body);
    }

    public static function sendPledgeCertificate(string $email, string $name, string $state): void {
        $subject = 'Your SickleCare Pledge Certificate 🎉';
        $body = self::template('Pledge Confirmed', $name, "
            <div style='text-align:center;background:linear-gradient(135deg,#96281B,#C0392B);color:#fff;padding:32px;border-radius:12px;margin-bottom:24px;'>
                <div style='font-size:48px;margin-bottom:12px;'>🤝</div>
                <h2 style='font-size:22px;margin:0 0 8px;'>Pledge Confirmed!</h2>
                <p style='margin:0;opacity:0.9;'>You are now part of the movement to end sickle cell disease in Nigeria.</p>
            </div>
            <p><strong>$name</strong> from <strong>$state</strong> — you have made a solemn pledge to get genotype tested, educate your community, and support those living with sickle cell disease.</p>
            <p>Now take the most important next step:</p>
            <div style='text-align:center;margin:24px 0;'>
                <a href='https://sicklecare.org/centers' style='background:#C0392B;color:#fff;padding:14px 28px;border-radius:100px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block;'>Book My Genotype Test</a>
            </div>
        ");
        self::send($email, $name, $subject, $body);
    }

    public static function sendQuizResult(string $email, string $name, string $risk, array $answers): void {
        $riskColors = ['VERY HIGH' => '#C0392B', 'HIGH' => '#C2410C', 'MODERATE' => '#D97706', 'LOWER' => '#16A34A'];
        $color = $riskColors[$risk] ?? '#C0392B';
        $subject = "Your SickleCare Risk Assessment Results — $risk RISK";
        $body = self::template('Your Risk Assessment', $name, "
            <div style='text-align:center;background:$color;color:#fff;padding:28px;border-radius:12px;margin-bottom:24px;'>
                <div style='font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;opacity:0.85;margin-bottom:6px;'>Your Sickle Cell Risk Level</div>
                <div style='font-size:2.5rem;font-weight:900;'>$risk</div>
            </div>
            <p>Based on your answers, you have a <strong>$risk risk level</strong>. " .
            ($risk === 'VERY HIGH' || $risk === 'HIGH' ?
                'We strongly recommend getting a genotype test as soon as possible.' :
                'We still recommend getting tested to confirm your genotype and protect your family.') . "</p>
            <div style='text-align:center;margin:28px 0;'>
                <a href='https://sicklecare.org/centers' style='background:$color;color:#fff;padding:14px 28px;border-radius:100px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block;'>Find a Test Center Near Me</a>
            </div>
            <p style='font-size:12px;color:#94A3B8;'>This assessment is for educational purposes only and does not replace medical advice. Please consult a healthcare professional.</p>
        ");
        self::send($email, $name, $subject, $body);
    }

    public static function sendContactConfirmation(string $email, string $name, string $subject): void {
        $body = self::template('Message Received', $name, "
            <p>Thank you for reaching out to SickleCare. We have received your message regarding: <strong>\"$subject\"</strong></p>
            <p>Our team will respond within <strong>24 business hours</strong>. For urgent medical matters, please call your local emergency services or visit the nearest hospital.</p>
            <div style='background:#F0FDF4;border-left:4px solid #16A34A;padding:16px 20px;border-radius:8px;margin:20px 0;'>
                <strong>While you wait:</strong><br>
                Explore our <a href='https://sicklecare.org/resources' style='color:#16A34A;'>Resources Library</a> for immediate answers, or take our <a href='https://sicklecare.org/quiz' style='color:#16A34A;'>Risk Assessment Quiz</a>.
            </div>
        ");
        self::send($email, $name, 'Message Received — SickleCare Will Respond Within 24 Hours', $body);
    }

    public static function notifyAdmin(string $subject, string $content): void {
        $body = self::template('Admin Alert', 'Team', "<pre style='font-family:monospace;font-size:13px;background:#F8FAFC;padding:20px;border-radius:8px;overflow:auto;'>$content</pre>");
        self::send(MAIL_ADMIN, 'Admin', "[SICKLECARE] $subject", $body);
    }

    private static function template(string $heading, string $name, string $content): string {
        return "<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'></head>
<body style='margin:0;padding:0;background:#F1F5F9;font-family:\"Plus Jakarta Sans\",system-ui,sans-serif;'>
<div style='max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.08);'>
  <div style='background:linear-gradient(135deg,#96281B,#C0392B);padding:28px 36px;'>
    <div style='color:#fff;font-size:22px;font-weight:800;'>🩸 SickleCare</div>
    <div style='color:rgba(255,255,255,0.8);font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-top:2px;'>Know Your Genotype. Protect Your Children.</div>
  </div>
  <div style='padding:36px;'>
    <h1 style='font-size:20px;color:#0D1117;margin:0 0 8px;'>$heading</h1>
    <p style='color:#64748B;margin:0 0 24px;'>Hi $name,</p>
    $content
  </div>
  <div style='background:#F8FAFC;padding:24px 36px;border-top:1px solid #E2E8F0;'>
    <p style='margin:0;font-size:12px;color:#94A3B8;line-height:1.6;'>
      This email was sent by SickleCare Nigeria. If you did not sign up, please ignore this email.<br>
      SickleCare provides educational information only. Always consult a qualified healthcare professional for medical advice.<br>
      <a href='https://sicklecare.org' style='color:#C0392B;'>sicklecare.org</a> &nbsp;|&nbsp; <a href='mailto:hello@sicklecare.org' style='color:#C0392B;'>hello@sicklecare.org</a>
    </p>
  </div>
</div>
</body>
</html>";
    }
}
