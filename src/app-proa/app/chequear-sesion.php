<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['usuario'])) {
    echo json_encode($_SESSION['usuario']);
} else {
    echo json_encode(['activa' => false]);
}
