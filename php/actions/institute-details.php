<?php
// php/actions/inst_details.php - Обработка запроса деталей учебного заведения

global $pdo;
header("Content-Type: application/json");

$code = $_GET['code'] ?? '';
if (!$code) {
    throw new Exception("Не указан код учебного заведения.");
}
$sql = "SELECT * FROM institutes WHERE code = :code";
$stmt = $pdo->prepare($sql);
$stmt->execute([':code' => $code]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$result) {
    throw new Exception("Учебное заведение не найдено.");
}
echo json_encode(['result' => $result]);


//header("Content-Type: application/json");
//$host = "localhost";
//$db = "education_db";
//$user = "root";
//$pass = "";
//$charset = "utf8mb4";
//
//$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
//$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
//
//try {
//    $pdo = new PDO($dsn, $user, $pass, $options);
//} catch (PDOException $e) {
//    echo json_encode(["error" => "Ошибка подключения к БД"]);
//    exit;
//}
//
//$action = $_GET["action"] ?? "";
//
//if ($action === "getInstitution") {
//    $stmt = $pdo->query("SELECT description FROM institutions WHERE id=1");
//    $data = $stmt->fetch(PDO::FETCH_ASSOC);
//    echo json_encode($data);
//} elseif ($action === "getBases") {
//    $stmt = $pdo->query("SELECT DISTINCT base FROM specialties");
//    $data = $stmt->fetchAll(PDO::FETCH_COLUMN);
//    echo json_encode($data);
//} elseif ($action === "getSpecialties") {
//    $stmt = $pdo->query("SELECT name, base FROM specialties WHERE institution_id=1");
//    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
//    echo json_encode($data);
//} else {
//    echo json_encode(["error" => "Неверный запрос"]);
//}
