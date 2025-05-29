<?php
session_start();
header('Content-Type: application/json');

require_once '../../../env/proa.inc';

$datos = json_decode(file_get_contents("php://input"), true);

$codigoAsignatura = $datos['codigo'] ?? '';
$favorita = $datos['favorita'] ?? false;
$idUsuario = $_SESSION['usuario']['idUsuariosPROA'] ?? null;

// Validaciones básicas
if (!$codigoAsignatura || !$idUsuario) {
    echo json_encode(['exito' => false, 'mensaje' => 'Datos incompletos']);
    exit;
}

// Verifica conexión
if (!$conn) {
    echo json_encode(['exito' => false, 'mensaje' => 'Error de conexión']);
    exit;
}

// Ejecuta la actualización
$stmt = $conn->prepare("UPDATE asignacionalumno SET asignaturaFavorita = ? WHERE idUsuariosPROA = ? AND codigoAsignatura = ?");
$stmt->bind_param("iis", $favorita, $idUsuario, $codigoAsignatura);
$exito = $stmt->execute();
$stmt->close();

// Devuelve JSON puro
echo json_encode(['exito' => $exito]);
exit;
