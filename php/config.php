<?php

// includes/config.php - Конфигурация подключения к базе данных
$host = 'localhost';
$db = 'edic2';
$user = 'root';
$pass = '';
$charset = 'utf8';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
];