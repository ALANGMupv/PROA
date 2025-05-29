<?php
header('Content-Type: application/json');
require_once '../../../env/proa.inc';

$codigoAsignatura = $_GET['codigo'] ?? null;
if (!$codigoAsignatura) {
    echo json_encode(['error' => 'Código de asignatura no proporcionado']);
    exit;
}

// Obtener IDs de alumnos ya asignados
$sqlAsig = "
    SELECT idUsuariosPROA
    FROM asignacionalumno
    WHERE codigoAsignatura = ?
";
$stmt = $conn->prepare($sqlAsig);
$stmt->bind_param("s", $codigoAsignatura);
$stmt->execute();
$resAsig = $stmt->get_result();
$asignadosIds = array_column($resAsig->fetch_all(MYSQLI_ASSOC), 'idUsuariosPROA');

// Obtener todos los alumnos NO asignados
$placeholders = implode(',', array_fill(0, count($asignadosIds), '?'));
$params = $asignadosIds;
$types = str_repeat('i', count($params));

$sql = "
    SELECT p.idUsuariosPROA, p.nombre, p.apellidos
    FROM personas p
    JOIN personarol pr ON pr.idUsuariosPROA = p.idUsuariosPROA
    WHERE pr.idRol = 1"
    . (count($params) > 0 ? " AND p.idUsuariosPROA NOT IN ($placeholders)" : "");

$stmt = $conn->prepare($sql);
if (count($params) > 0) {
    $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$res = $stmt->get_result();

$alumnos = [];
while ($row = $res->fetch_assoc()) {
    $alumnos[] = [
        'id' => $row['idUsuariosPROA'],
        'nombreCompleto' => $row['nombre'] . ' ' . $row['apellidos']
    ];
}

echo json_encode([
    'todos' => $alumnos,
    'asignados' => $asignadosIds
]);

$conn->close();
