<?php
require_once '../../../env/proa.inc';
session_start();

header('Content-Type: application/json');

$datos = json_decode(file_get_contents('php://input'), true);
$idExamen = $datos['idExamen'] ?? null;
$respuestas = $datos['respuestasAlumno'] ?? [];
$idUsuario = $_SESSION['usuario']['idUsuariosPROA'] ?? null;

if (!$idUsuario || !$idExamen || empty($respuestas)) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

$stmt = $conn->prepare("REPLACE INTO respuestasalumno (idUsuariosPROA, idExamen, idPregunta, idRespuesta) VALUES (?, ?, ?, ?)");

foreach ($respuestas as $respuesta) {
    $idPregunta = $respuesta['idPregunta'] ?? null;
    $idRespuesta = $respuesta['idRespuesta'] ?? null;

    if (!$idPregunta || !$idRespuesta) continue;

    $stmt->bind_param("iiii", $idUsuario, $idExamen, $idPregunta, $idRespuesta);
    $stmt->execute();
}

$stmt->close();
$conn->close();

echo json_encode(['success' => true]);
