<?php
require_once __DIR__ . '/../config/config.php';

class Validator
{
    /** Sanitize a plain string — strip, trim, HTML-encode */
    public static function clean(string $v, int $max = 500): string
    {
        return mb_substr(
            htmlspecialchars(stripslashes(trim($v)), ENT_QUOTES | ENT_HTML5, 'UTF-8'),
            0, $max, 'UTF-8'
        );
    }

    /** Validate + sanitize email */
    public static function email(string $raw): array
    {
        $email = strtolower(trim($raw));
        if (strlen($email) > MAX_EMAIL) return ['ok' => false, 'err' => 'Email address is too long.'];

        $filtered = filter_var($email, FILTER_VALIDATE_EMAIL);
        if (!$filtered) return ['ok' => false, 'err' => 'Please enter a valid email address.'];

        $domain = substr(strrchr($filtered, '@'), 1);
        if (in_array($domain, BLOCKED_DOMAINS, true)) {
            return ['ok' => false, 'err' => 'Disposable email addresses are not allowed.'];
        }

        return ['ok' => true, 'val' => $filtered];
    }

    /** Validate a required non-empty string */
    public static function required(string $v, string $field, int $min = 2, int $max = 500): array
    {
        $v = trim($v);
        if (mb_strlen($v, 'UTF-8') < $min) return ['ok' => false, 'err' => "$field must be at least $min characters."];
        if (mb_strlen($v, 'UTF-8') > $max) return ['ok' => false, 'err' => "$field is too long (max $max chars)."];
        return ['ok' => true, 'val' => $v];
    }

    /** Validate a Cameroonian phone number */
    public static function phone(string $raw): array
    {
        $clean = preg_replace('/[\s\-\(\)]/', '', $raw);
        if (!preg_match(CM_PHONE_REGEX, $clean)) {
            return ['ok' => false, 'err' => 'Please enter a valid Cameroonian phone number.'];
        }
        $digits = preg_replace('/[^0-9]/', '', $clean);
        if (strlen($digits) === 9) $digits = '237' . $digits;
        return ['ok' => true, 'val' => '+' . $digits];
    }

    /** Validate a future date string (Y-m-d) */
    public static function futureDate(string $raw): array
    {
        $d = \DateTime::createFromFormat('Y-m-d', trim($raw));
        if (!$d || $d < new \DateTime('today')) {
            return ['ok' => false, 'err' => 'Please provide a valid future date.'];
        }
        $max = (new \DateTime('today'))->modify('+3 months');
        if ($d > $max) {
            return ['ok' => false, 'err' => 'Appointment date cannot be more than 3 months away.'];
        }
        return ['ok' => true, 'val' => $d->format('Y-m-d')];
    }

    /** Validate password strength */
    public static function password(string $p): array
    {
        if (strlen($p) < 8)   return ['ok' => false, 'err' => 'Password must be at least 8 characters.'];
        if (strlen($p) > 128) return ['ok' => false, 'err' => 'Password is too long.'];
        return ['ok' => true, 'val' => $p];
    }

    /** Check for spam content in one or more strings */
    public static function isSpam(string ...$texts): bool
    {
        $combined = strtolower(implode(' ', $texts));
        foreach (SPAM_WORDS as $w) {
            if (str_contains($combined, strtolower($w))) return true;
        }
        return false;
    }

    /**
     * Run a list of validation results and return the first error message,
     * or null if all passed.
     */
    public static function first(array ...$results): ?string
    {
        foreach ($results as $r) {
            if (!$r['ok']) return $r['err'];
        }
        return null;
    }
}
