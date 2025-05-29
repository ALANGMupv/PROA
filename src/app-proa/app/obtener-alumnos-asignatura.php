<?php
header('Content-Type: application/json');
require_once '../../../env/proa.inc';

$codigoAsignatura = $_GET['codigo'] ?? null;
if (!$codigoAsignatura) {
    echo json_encode(['error' => 'Código de asignatura no proporcionado']);
    exit;
}

// 1. Obtener IDs de alumnos asignados
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

// 2. Obtener TODOS los alumnos (no filtrar por asignados)
$sqlTodos = "
    SELECT p.idUsuariosPROA, p.nombre, p.apellidos
    FROM personas p
    JOIN personarol pr ON pr.idUsuariosPROA = p.idUsuariosPROA
    WHERE pr.idRol = 1
";
$res = $conn->query($sqlTodos);

$alumnos = [];
while ($row = $res->fetch_assoc()) {
    $alumnos[] = [
        'id' => (int) $row['idUsuariosPROA'],
        'nombreCompleto' => $row['nombre'] . ' ' . $row['apellidos']
    ];
}

echo json_encode([
    'todos' => $alumnos,
    'asignados' => array_map('intval', $asignadosIds) // Asegura que sean enteros
]);

$conn->close();
