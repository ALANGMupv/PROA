<?php
header('Content-Type: application/json');
require_once '../../../env/proa.inc';
session_start();

$idUsuario = $_SESSION['usuario']['idUsuariosPROA'] ?? null;

if (!$idUsuario) {
    echo json_encode(['error' => 'No estás logueado.']);
    exit;
}

$asignatura = $_SESSION['asignaturaSeleccionada'] ?? null;
$codigoAsignatura = $asignatura['codigoAsignatura'] ?? null;

if (!$asignatura || !$codigoAsignatura) {
    echo json_encode(['error' => 'No se ha seleccionado una asignatura válida.']);
    exit;
}

$sql = "SELECT 
    ex.idExamen,
    ex.codigoAsignatura,
    ex.idGrupo,
    ce.titulo,
    ce.fechaApertura,
    ce.fechaFin,
    ce.duracion,
    ex.idEstado,
    ce.puntosExamen,
    cal.notaExamenAlumno,
    cal.valorExamen
FROM examenes ex
INNER JOIN contenidoexamen ce ON ex.idContenido = ce.idContenido
LEFT JOIN calificaciones cal ON cal.idExamen = ex.idExamen AND cal.idUsuariosPROA = ?
WHERE ex.codigoAsignatura = ?";


$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $idUsuario, $codigoAsignatura);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo json_encode(['error' => 'No se encontraron exámenes para esta asignatura.']);
    exit;
}

$examenes = [
    'realizar' => [],
    'porRevisar' => [],
    'calificados' => []
];

while ($row = $result->fetch_assoc()) {
    $tieneCalificacion = !is_null($row['notaExamenAlumno']);

    // Solo aparece como "a realizar" si está abierto y NO tiene calificación
    if ($row['idEstado'] == 1 && !$tieneCalificacion) {
        $examenes['realizar'][] = $row;
    }

    // Por revisar y calificados: si hay calificación, se muestran siempre
    if ($tieneCalificacion) {
        $examenes['porRevisar'][] = $row;
        $examenes['calificados'][] = $row;
    }
}

$stmt->close();
$conn->close();

echo json_encode($examenes);
?>
