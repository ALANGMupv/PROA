<?php
header("Content-Type: application/json");
require_once '../../../env/proa.inc';

$data = json_decode(file_get_contents("php://input"), true);

$codigo = $data['codigo'] ?? null;
$titular = $data['titular'] ?? null;
$colaboradores = $data['colaboradores'] ?? [];

if (empty($codigo) || !isset($titular)) {
    echo json_encode(['error' => 'Faltan datos obligatorios']);
    exit;
}

// Eliminar todos los anteriores
$conn->query("DELETE FROM asignaciondocentes WHERE codigoAsignatura = '$codigo'");

// Insertar responsable
$stmt = $conn->prepare("INSERT INTO asignaciondocentes (idUsuariosPROA, codigoAsignatura, responsable) VALUES (?, ?, 1)");
$stmt->bind_param("is", $titular, $codigo);
$stmt->execute();

// Insertar colaboradores
$stmt = $conn->prepare("INSERT INTO asignaciondocentes (idUsuariosPROA, codigoAsignatura, responsable) VALUES (?, ?, 0)");
foreach ($colaboradores as $id) {
    $stmt->bind_param("is", $id, $codigo);
    $stmt->execute();
}

echo json_encode(['success' => true]);
$conn->close();
