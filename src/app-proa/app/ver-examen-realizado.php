<?php
require_once '../../../env/proa.inc';
session_start();
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$idUsuario = $_SESSION['usuario']['idUsuariosPROA'] ?? null;
$idExamen = $_GET['idExamen'] ?? null;

if (!$idUsuario || !$idExamen || !is_numeric($idExamen)) {
    echo json_encode(['error' => 'Faltan datos o el ID del examen no es válido.']);
    exit;
}

// Obtener datos del examen (incluye el idContenido para luego usarlo)
$sql = "SELECT ex.idExamen, ex.idContenido, ce.titulo, ce.descripcion, ce.fechaFin, ce.puntosExamen, cal.notaExamenAlumno
        FROM examenes ex
        INNER JOIN contenidoexamen ce ON ex.idContenido = ce.idContenido
        INNER JOIN calificaciones cal ON cal.idExamen = ex.idExamen
        WHERE ex.idExamen = ? AND cal.idUsuariosPROA = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $idExamen, $idUsuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['error' => 'No se encontró el examen.']);
    exit;
}

$examen = $result->fetch_assoc();
$idContenido = $examen['idContenido'];

// Obtener preguntas y respuestas asociadas a ese contenido
$sqlPreguntas = "SELECT p.idPregunta, p.enunciado, p.valorPregunta AS valor, 
                        r.idRespuesta, r.respuesta AS texto, r.valorRespuesta AS correcta,
                        ra.idRespuesta AS respuestaAlumno
                 FROM preguntasexamen p
                 INNER JOIN respuestasexamen r ON p.idPregunta = r.idPregunta
                 LEFT JOIN respuestasalumno ra 
                    ON ra.idPregunta = p.idPregunta 
                    AND ra.idUsuariosPROA = ? 
                    AND ra.idExamen = ?
                 WHERE p.idContenido = ?";

$stmt = $conn->prepare($sqlPreguntas);
$stmt->bind_param("iii", $idUsuario, $idExamen, $idContenido);
$stmt->execute();
$result = $stmt->get_result();

$preguntas = [];

while ($row = $result->fetch_assoc()) {
    $idPregunta = $row['idPregunta'];
    if (!isset($preguntas[$idPregunta])) {
        $preguntas[$idPregunta] = [
            'idPregunta' => $idPregunta,
            'enunciado' => $row['enunciado'],
            'valor' => $row['valor'],
            'respuestas' => [],
            'respuestaAlumno' => $row['respuestaAlumno']
        ];
    }

    $preguntas[$idPregunta]['respuestas'][] = [
        'idRespuesta' => $row['idRespuesta'],
        'texto' => $row['texto'],
        'correcta' => $row['correcta']
    ];
}

echo json_encode([
    'examen' => $examen,
    'preguntas' => array_values($preguntas)
]);
