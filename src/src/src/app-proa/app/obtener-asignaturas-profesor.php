<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

session_start();
require_once '../../../env/proa.inc';

$idUsuario = $_SESSION['usuario']['idUsuariosPROA'] ?? null;

if (!$idUsuario) {
    echo json_encode([]);
    exit;
}

// Consulta usando asignaciondocentes con rol del profesor
$sql = "
    SELECT a.codigoAsignatura, a.nombre, a.creditos, a.idCurso, a.idSemestre, 
           ad.asignaturaFavorita, ad.responsable
    FROM asignaciondocentes ad
    JOIN asignaturas a ON ad.codigoAsignatura = a.codigoAsignatura
    WHERE ad.idUsuariosPROA = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idUsuario);
$stmt->execute();
$resultado = $stmt->get_result();

$asignaturas = [];
while ($row = $resultado->fetch_assoc()) {
    $asignaturas[] = [
        'codigo'    => $row['codigoAsignatura'],
        'nombre'    => $row['nombre'],
        'curso'     => $row['idCurso'],
        'semestre'  => $row['idSemestre'],
        'favorita'  => (bool) $row['asignaturaFavorita'],
        'rol'       => $row['responsable'] ? 'responsable' : 'colaborador'
    ];
}

$stmt->close();
$conn->close();

echo json_encode($asignaturas);
