<?php // admin/messages.php — GET list + POST update status
require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../middleware/Security.php';
require_once __DIR__ . '/../../utils/Logger.php';
require_once __DIR__ . '/../../utils/Validator.php';

Security::setHeaders();
Security::handleCors();
Security::rateLimit('default');
$auth = Security::requireAuth();

$method = $_SERVER['REQUEST_METHOD'];

try {
    $db = Database::get();

    if ($method === 'GET') {
        $page   = max(1, (int) ($_GET['page']  ?? 1));
        $limit  = min(50, (int) ($_GET['limit'] ?? 20));
        $offset = ($page - 1) * $limit;
        $status = $_GET['status'] ?? '';

        $where  = '';
        $params = [];
        if (in_array($status, ['new', 'read', 'replied', 'spam'], true)) {
            $where    = 'WHERE status = ?';
            $params[] = $status;
        }

        $total    = (int) $db->query("SELECT COUNT(*) FROM contact_messages $where")->fetchColumn();
        $stmt     = $db->prepare(
            "SELECT id, name, email, subject, message, reference, status, phone, created_at
             FROM contact_messages $where ORDER BY created_at DESC LIMIT $limit OFFSET $offset"
        );
        $stmt->execute($params);

        Security::ok([
            'messages'   => $stmt->fetchAll(),
            'total'      => $total,
            'page'       => $page,
            'totalPages' => (int) ceil($total / $limit),
        ]);
    }

    if ($method === 'POST') {
        $action = $_GET['action'] ?? '';
        $d      = Security::body();
        $id     = (int) ($d['id'] ?? 0);

        if ($action === 'update_status') {
            $allowed = ['new', 'read', 'replied', 'spam'];
            $s = $d['status'] ?? '';
            if (!in_array($s, $allowed, true)) Security::abort(422, 'Invalid status value.');
            $db->prepare('UPDATE contact_messages SET status = ? WHERE id = ?')->execute([$s, $id]);
            Logger::audit('Message status updated', ['id' => $id, 'status' => $s, 'by' => $auth['user']]);
            Security::ok(['message' => 'Status updated.']);
        }

        Security::abort(400, 'Unknown action.');
    }

    Security::abort(405, 'Method not allowed.');

} catch (PDOException $e) {
    Logger::error('Admin messages error: ' . $e->getMessage());
    Security::abort(500, 'Could not process request.');
}
