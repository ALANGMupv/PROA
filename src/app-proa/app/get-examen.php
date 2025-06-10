<?php
require_once '../../../env/proa.inc';
header('Content-Type: application/json');

// Validar ID del examen
$idExamen = isset($_GET['idExamen']) && is_numeric($_GET['idExamen']) ? intval($_GET['idExamen']) : null;

if (!$idExamen) {
    echo "<script>alert('ID de examen no proporcionado'); window.location.href = 'examenes-alumno.php';</script>";
    exit;
}

// Obtener datos del examen
$sqlExamen = "SELECT ce.titulo, ce.descripcion, ce.fechaFin, ce.puntosExamen
              FROM examenes e
              JOIN contenidoexamen ce ON e.idContenido = ce.idContenido
              WHERE e.idExamen = ?";

$stmt = $conn->prepare($sqlExamen);
$stmt->bind_param("i", $idExamen);
$stmt->execute();
$result = $stmt->get_result();
$examen = $result->fetch_assoc();

if (!$examen) {
    echo json_encode(['error' => 'Examen no encontrado']);
    exit;
}
$stmt->close();

// Obtener preguntas y respuestas
$sqlPreguntas = "SELECT p.idPregunta, p.enunciado, p.valorPregunta,
                        r.idRespuesta, r.respuesta, r.valorRespuesta
                 FROM examenes e
                 JOIN contenidoexamen ce ON e.idContenido = ce.idContenido
                 JOIN preguntasexamen p ON ce.idContenido = p.idContenido
                 JOIN respuestasexamen r ON p.idPregunta = r.idPregunta
                 WHERE e.idExamen = ?
                 ORDER BY p.idPregunta, r.idRespuesta";

$stmt = $conn->prepare($sqlPreguntas);
$stmt->bind_param("i", $idExamen);
$stmt->execute();
$result = $stmt->get_result();

$preguntas = [];

while ($fila = $result->fetch_assoc()) {
    $id = $fila['idPregunta'];

    if (!isset($preguntas[$id])) {
        $preguntas[$id] = [
            'idPregunta' => $fila['idPregunta'],
            'enunciado' => $fila['enunciado'],
            'valor' => $fila['valorPregunta'],
            'respuestas' => []
        ];
    }

    $preguntas[$id]['respuestas'][] = [
        'idRespuesta' => $fila['idRespuesta'],
        'texto' => $fila['respuesta'],
        'correcta' => $fila['valorRespuesta']
    ];
}

$stmt->close();
$conn->close();

echo json_encode([
    'examen' => $examen,
    'preguntas' => array_values($preguntas) // quitar claves numéricas desordenadas
]);
