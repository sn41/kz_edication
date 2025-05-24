<?php
// includes/actions/institutes.php - Обработка запроса списка учебных заведений
header("Content-Type: application/json");
global $pdo;
$region    = getFilter('region');
$city      = getFilter('city');
$institute = getFilter('institute');
$type      = $_GET['type'] ?? '';
$base      = $_GET['base'] ?? '';

$sql = "SELECT DISTINCT i.code, i.name, i.region, i.city, i.website, i.logo_path, i.type
        FROM institutes i
        JOIN institute_specialities insps ON insps.institute_code = i.code
        WHERE i.region LIKE :region
          AND i.city LIKE :city
          AND i.name LIKE :institute
          AND i.type = :type
          AND insps.base = :base";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':region'    => "%$region%",
    ':city'      => "%$city%",
    ':institute' => "%$institute%",
    ':type'      => $type,
    ':base'      => $base,
]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['results' => $results]);