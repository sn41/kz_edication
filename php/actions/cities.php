<?php
// includes/actions/cities.php - Обработка запроса списка городов
header('Content-Type: application/json');

global $pdo;
$region = getFilter('region');
$city   = getFilter('city');
$type   = $_GET['type'] ?? '';
$base   = $_GET['base'] ?? '';

$sql = "SELECT DISTINCT c.id, c.name, c.region, c.logo_path
        FROM cities c
        JOIN institutes i ON i.city = c.name AND i.region = c.region
        JOIN institute_specialities insps ON insps.institute_code = i.code
        WHERE c.region LIKE :region
          AND c.name LIKE :city
          AND i.type = :type
          AND insps.base = :base";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':region' => "%$region%",
    ':city'   => "%$city%",
    ':type'   => $type,
    ':base'   => $base,
]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['results' => $results]);