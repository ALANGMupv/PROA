<?php
header('Content-Type: application/json');
require_once '../../../env/proa.inc';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos no recibidos correctamente']);
    exit;
}

$codigo = $data['codigoAsignatura'];
$titulacion = $data['codigoTitulacion'];
$nombre = $data['nombre'];
$creditos = $data['creditos'];
$idCurso = $data['idCurso'];
$idSemestre = $data['idSemestre'];
$idDepartamento = $data['idDepartamento'];
$idCaracter = $data['idCaracter'];


$sql = "INSERT INTO asignaturas (codigoAsignatura, codigoTitulacion, nombre, creditos, idCurso, idSemestre, idDepartamento, idCaracter)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssiiiii", $codigo, $titulacion, $nombre, $creditos, $idCurso, $idSemestre, $idDepartamento, $idCaracter);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al guardar la asignatura: ' . $conn->error]);
}

$conn->close();
?>
