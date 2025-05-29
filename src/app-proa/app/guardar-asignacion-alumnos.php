<?php
header('Content-Type: application/json');
require_once '../../../env/proa.inc';

$data = json_decode(file_get_contents('php://input'), true);

$codigo = $data['codigo'] ?? null;
$ids = $data['ids'] ?? [];

if (!$codigo || !is_array($ids)) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

// Eliminar asignaciones existentes
$conn->query("DELETE FROM asignacionalumno WHERE codigoAsignatura = '$codigo'");

// Insertar nuevas asignaciones
$stmt = $conn->prepare("INSERT INTO asignacionalumno (idUsuariosPROA, codigoAsignatura, idGrupo, asignaturaFavorita) VALUES (?, ?, NULL, 0)");
foreach ($ids as $id) {
    $stmt->bind_param("is", $id, $codigo);
    $stmt->execute();
}

echo json_encode(['success' => true]);
$conn->close();
