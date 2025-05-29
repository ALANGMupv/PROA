<?php
header('Content-Type: application/json');
require_once '../../../env/proa.inc';

$codigoAsignatura = $_GET['codigo'] ?? null;
if (!$codigoAsignatura) {
    echo json_encode(['error' => 'Código de asignatura no proporcionado']);
    exit;
}

// Obtener todos los alumnos
$sql = "
    SELECT p.idUsuariosPROA, p.nombre, p.apellidos
    FROM personas p
    JOIN personarol pr ON pr.idUsuariosPROA = p.idUsuariosPROA
    WHERE pr.idRol = 1
";
$res = $conn->query($sql);
$alumnos = [];
while ($row = $res->fetch_assoc()) {
    $alumnos[] = [
        'id' => $row['idUsuariosPROA'],
        'nombreCompleto' => $row['nombre'] . ' ' . $row['apellidos']
    ];
}

// Obtener alumnos asignados a la asignatura
$sqlAsig = "
    SELECT idUsuariosPROA
    FROM asignacionalumno
    WHERE codigoAsignatura = ?
";
$stmt = $conn->prepare($sqlAsig);
$stmt->bind_param("s", $codigoAsignatura);
$stmt->execute();
$resAsig = $stmt->get_result();
$asignados = array_column($resAsig->fetch_all(MYSQLI_ASSOC), 'idUsuariosPROA');

echo json_encode([
    'todos' => $alumnos,
    'asignados' => $asignados
]);

$conn->close();
