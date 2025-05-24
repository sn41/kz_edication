<?php
// includes/actions/specialities.php - Обработка запроса списка специальностей
header("Content-Type: application/json");

global $pdo;
$region = getFilter('region');
$city = getFilter('city');
$institute_name = getFilter('institute_name');
$speciality_name = getFilter('speciality_name');
$type = $_GET['type'] ?? '';
$base = $_GET['base'] ?? '';

$sql = "SELECT DISTINCT sc.code, sc.name
        FROM spec_codes sc
        JOIN institute_specialities insps ON insps.spec_code = sc.code
        JOIN institutes i ON i.code = insps.institute_code
        WHERE i.region LIKE :region
        AND i.city LIKE :city
        AND sc.name LIKE :speciality_name
        AND i.name LIKE :institute_name
        AND insps.base = :base
        AND i.type = :type

        ";

$stmt = $pdo->prepare($sql);

$stmt->execute([
    ':region' => "%$region%",
    ':city' => "%$city%",
    ':base' => $base,
    ':type' => $type,
    ':speciality_name' => "%$speciality_name%",
    ':institute_name' => "%$institute_name%",
]);

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['results' => $results]);