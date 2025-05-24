<?php
// includes/actions/regions.php - Обработка запроса списка регионов

//гарантирует, что клиент будет ожидать JSON.
header('Content-Type: application/json');

//Запрет вывода HTML-сообщений (ошибок) в ответ:
//ini_set('display_errors', 0);
//error_reporting(0);


global $pdo;
$region = getFilter('region');
$type   = $_GET['type'] ?? '';
$base   = $_GET['base'] ?? '';

$sql = "SELECT DISTINCT r.id, r.name, r.logo_path
        FROM regions r
        JOIN institutes i ON i.region = r.name
        JOIN institute_specialities insps ON insps.institute_code = i.code
        WHERE r.name LIKE :region
          AND i.type = :type
          AND insps.base = :base";

//$sql = "SELECT *  FROM regions ";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':region' => "%$region%",
    ':type'   => $type,
    ':base'   => $base,
]);

//$stmt->execute();

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);


echo json_encode(['results' => $results]);
//echo json_encode(['results'  => "Привет, мир!"]);
?>
