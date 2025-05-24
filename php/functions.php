<?php
// includes/functions.php - Общие функции для проекта

// Если значение фильтра отсутствует или пустое, возвращаем пустую строку (для конструкций LIKE)
function getFilter($key) {
    return isset($_GET[$key]) && $_GET[$key] !== '' ? $_GET[$key] : '';
}