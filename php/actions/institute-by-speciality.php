<?php
// includes/actions/inst_by_spec.php - Обработка запроса списка учреждений по специальности
//global $pdo;
global $pdo;
header("Content-Type: application/json");

$spec   = getFilter('spec');
$city   = getFilter('city');
$type   = $_GET['type'] ?? '';
$base   = $_GET['base'] ?? '';

$sql = "SELECT DISTINCT i.code, i.name, i.region, i.city, i.website, i.logo_path, i.type
        FROM institutes i
        JOIN institute_specialities insps ON insps.institute_code = i.code
        JOIN spec_codes sc ON sc.code = insps.spec_code
        WHERE sc.name LIKE :spec
          AND i.city LIKE :city
          AND i.type = :type
          AND insps.base = :base";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':spec' => "%$spec%",
    ':city' => "%$city%",
    ':type' => $type,
    ':base' => $base,
]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['results' => $results]);