<?php
session_start();
header('Content-Type: application/json');

$rol = $_POST['rol'] ?? null;

if ($rol) {
    $_SESSION['usuario']['rol'] = $rol;
    echo json_encode(['exito' => true]);
} else {
    echo json_encode(['exito' => false, 'error' => 'Falta rol']);
}
