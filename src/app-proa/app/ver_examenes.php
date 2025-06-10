<?php
header('Content-Type: application/json');

require_once '../../../env/proa.inc';
session_start();

$idUsuario = $_SESSION['usuario']['idUsuariosPROA'] ?? null;

if (!$idUsuario) {
    // Si no está logueado, devolver un error en formato JSON
    echo json_encode(['error' => 'No estás logueado.']);
    exit;
}

$asignatura = $_SESSION['asignaturaSeleccionada'] ?? null;
$codigoAsignatura = $asignatura['codigoAsignatura'] ?? null;

if (!$asignatura) {
    echo json_encode(['error' => 'No se ha seleccionado una asignatura.']);
    exit;
}

if (!$codigoAsignatura) {
    echo json_encode(['error' => 'No hay código.']);
    exit;
}

// Consultar los exámenes de la asignatura desde la base de datos
$sql = "SELECT ex.idExamen, ex.codigoAsignatura, ex.idGrupo, ce.titulo, ce.fechaApertura, ce.fechaFin, ce.duracion, ex.idEstado
FROM examenes ex
INNER JOIN contenidoexamen ce ON ex.idContenido = ce.idContenido
WHERE ex.codigoAsignatura = ? AND ex.idEstado IN (1, 2, 3)"; // Exámenes abiertos, en revisión y calificados

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $codigoAsignatura); // Usamos "s" para cadenas de texto (codigoAsignatura es una cadena)
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
    if ($row['idEstado'] == 1) {
        $examenes['realizar'][] = $row;
    } elseif ($row['idEstado'] == 2) {
        $examenes['porRevisar'][] = $row;
    } elseif ($row['idEstado'] == 3) {
        $examenes['calificados'][] = $row;
    }
}

$stmt->close();
$conn->close();

// Enviar los exámenes al frontend como JSON
echo json_encode($examenes);
?>
