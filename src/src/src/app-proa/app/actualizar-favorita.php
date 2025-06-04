<?php
session_start();
header('Content-Type: application/json');

require_once '../../../env/proa.inc';

$datos = json_decode(file_get_contents("php://input"), true);

$codigoAsignatura = $datos['codigo'] ?? '';
$favorita = $datos['favorita'] ?? false;
$idUsuario = $_SESSION['usuario']['idUsuariosPROA'] ?? null;
$rol = $_SESSION['usuario']['rol'] ?? null;

if (!$codigoAsignatura || !$idUsuario || !$rol) {
    echo json_encode(['exito' => false, 'mensaje' => 'Datos incompletos']);
    exit;
}

// Seleccionar tabla según el rol
if ($rol === 'alumno') {
    $query = "UPDATE asignacionalumno SET asignaturaFavorita = ? WHERE idUsuariosPROA = ? AND codigoAsignatura = ?";
} elseif ($rol === 'profesor') {
    $query = "UPDATE asignaciondocentes SET asignaturaFavorita = ? WHERE idUsuariosPROA = ? AND codigoAsignatura = ?";
} else {
    echo json_encode(['exito' => false, 'mensaje' => 'Rol no válido']);
    exit;
}

$stmt = $conn->prepare($query);
$stmt->bind_param("iis", $favorita, $idUsuario, $codigoAsignatura);
$exito = $stmt->execute();
$stmt->close();

echo json_encode(['exito' => $exito]);
exit;
