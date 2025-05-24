<?php
// includes/db.php - Создание подключения через PDO
//global $dsn, $user, $pass, $options;
global $dsn, $user, $pass, $options;
require_once 'config.php';

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка подключения к базе данных: ' . $e->getMessage()]);
    exit;
}