<?php
require_once '../../../env/proa.inc';
session_start();

header('Content-Type: application/json');

// Leer datos enviados desde fetch
$datos = json_decode(file_get_contents('php://input'), true);
$idExamen = $datos['idExamen'] ?? null;
$nota = $datos['puntajeTotal'] ?? null;
$valorExamen = $datos['puntajeMaximo'] ?? null;
$idUsuario = $_SESSION['usuario']['idUsuariosPROA'] ?? null;

// Validar campos
if (!$idUsuario || !$idExamen || $nota === null || $valorExamen === null) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

// Preparar y ejecutar la consulta
$stmt = $conn->prepare("REPLACE INTO calificaciones (idExamen, idUsuariosPROA, notaExamenAlumno, valorExamen) VALUES (?, ?, ?, ?)");
$stmt->bind_param("iidd", $idExamen, $idUsuario, $nota, $valorExamen);
$ok = $stmt->execute();

if ($ok) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al guardar en la base de datos']);
}

$stmt->close();
$conn->close();
