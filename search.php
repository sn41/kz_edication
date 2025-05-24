<?php
// search.php - Диспетчер запросов
header('Content-Type: application/json');

require_once 'php/db.php';
require_once 'php/functions.php';

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'regions':
        require_once 'php/actions/regions.php';
        break;
    case 'cities':
        require_once 'php/actions/cities.php';
        break;
    case 'institutes':
        require_once 'php/actions/institutes.php';
        break;
    case 'specialities':
        require_once 'php/actions/specialities.php';
        break;
    case 'inst_by_spec':
        require_once 'php/actions/institute-by-speciality.php';
        break;
    case 'speciality-details':
        require_once 'php/actions/speciality-details.php';
        break;
    case 'institute-details':
        require_once 'php/actions/institute-details.php';
        break;
    default:
        echo json_encode(['error' => 'Неизвестное действие.']);
        break;
}