<?php
// includes/actions/spec_details.php - Обработка запроса деталей специальности
header("Content-Type: application/json");
global $pdo;
$code = $_GET['code'] ?? '';
if (!$code) {
    throw new Exception("Не указан код специальности.");
}
$sql = "SELECT * FROM spec_codes WHERE code = :code";
$stmt = $pdo->prepare($sql);
$stmt->execute([':code' => $code]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$result) {
    throw new Exception("Специальность не найдена.");
}
echo json_encode(['result' => $result]);