<?php
session_start();
header('Content-Type: application/json');

// Verificar si hay sesión GTI activa
if (!isset($_SESSION['usuarioGTI'])) {
    echo json_encode(['error' => 'Sesión GTI no activa']);
    exit;
}

$rolSolicitado = $_POST['rol'] ?? null;
$idGTI = $_SESSION['usuarioGTI']['id'] ?? null;

if (!$rolSolicitado || !$idGTI) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

// Cargar conexión
$rutaEnv = file_exists('../../env/proa.inc') ? '../../env/proa.inc' : '../../../env/proa.inc';
require_once $rutaEnv;

// Consulta: buscar persona que tenga ese rol y ese idUsuariosGTI
$stmt = $conn->prepare("
    SELECT p.email, p.contraseña
    FROM personas p
    JOIN personarol pr ON p.idUsuariosPROA = pr.idUsuariosPROA
    JOIN roles r ON pr.idRol = r.idRol
    WHERE p.idUsuariosGTI = ? AND r.nombreRol = ?
");
$stmt->bind_param("is", $idGTI, $rolSolicitado);
$stmt->execute();
$resultado = $stmt->get_result();
$persona = $resultado->fetch_assoc();
$stmt->close();
$conn->close();

if ($persona) {
    echo json_encode($persona);
} else {
    echo json_encode(['error' => 'No se encontró persona con ese rol']);
}
