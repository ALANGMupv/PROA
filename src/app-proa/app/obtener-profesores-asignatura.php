<?php
header("Content-Type: application/json");
require_once '../../../env/proa.inc';

$codigo = $_GET['codigo'] ?? null;
if (!$codigo) {
    echo json_encode(['error' => 'Código no proporcionado']);
    exit;
}

// Obtener todos los profesores posibles
$sqlTodos = "
    SELECT p.idUsuariosPROA, CONCAT(p.nombre, ' ', p.apellidos) AS nombreCompleto
    FROM personas p
    JOIN personarol r ON r.idUsuariosPROA = p.idUsuariosPROA
    WHERE r.idRol = 2
";
$result = $conn->query($sqlTodos);
$todos = [];
while ($row = $result->fetch_assoc()) {
    $todos[] = [
        'id' => (int)$row['idUsuariosPROA'],
        'nombreCompleto' => $row['nombreCompleto']
    ];
}

// Obtener los ya asignados
$sqlAsignados = "
    SELECT idUsuariosPROA, responsable
    FROM asignaciondocentes
    WHERE codigoAsignatura = ?
";
$stmt = $conn->prepare($sqlAsignados);
$stmt->bind_param("s", $codigo);
$stmt->execute();
$res = $stmt->get_result();

$responsable = null;
$colaboradores = [];

while ($row = $res->fetch_assoc()) {
    $id = (int)$row['idUsuariosPROA'];
    if ($row['responsable']) {
        $responsable = $id;
    } else {
        $colaboradores[] = $id;
    }
}

echo json_encode([
    'todos' => $todos,
    'titular' => $responsable,
    'colaboradores' => $colaboradores
]);
$conn->close();
