<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require_once '../../../env/proa.inc';

$idUsuario = $_SESSION['usuario']['idUsuariosPROA'] ?? null;

if (!$idUsuario) {
    echo json_encode(['error' => 'Usuario no autenticado']);
    exit;
}

// Recoger examenId desde GET
$examenId = isset($_GET['examenId']) ? intval($_GET['examenId']) : 0;
if ($examenId <= 0) {
    echo json_encode(['error' => 'ID de examen inválido']);
    exit;
}

// Obtener datos del examen desde la tabla contenidoexamen (no directamente de examenes)
$sqlExamen = "SELECT ce.titulo, ce.descripcion, ce.fechaFin, ce.puntosExamen
              FROM contenidoexamen ce
              INNER JOIN examenes e ON ce.idContenido = e.idContenido
              WHERE e.idExamen = ?";

$stmt = $conn->prepare($sqlExamen);
$stmt->bind_param("i", $examenId);
$stmt->execute();
$resultExamen = $stmt->get_result();

if ($resultExamen->num_rows === 0) {
    echo json_encode(['error' => 'Examen no encontrado']);
    exit;
}

$examen = $resultExamen->fetch_assoc();

// Obtener preguntas y respuestas del examen
$sqlPreguntas = "SELECT p.idPregunta, p.enunciado, p.valorPregunta AS valor, 
                        r.idRespuesta, r.respuesta AS texto, r.valorRespuesta AS correcta
                 FROM preguntasexamen p
                 LEFT JOIN respuestasexamen r ON p.idPregunta = r.idPregunta
                 WHERE p.idContenido = (SELECT idContenido FROM examenes WHERE idExamen = ?)
                 ORDER BY p.idPregunta";

$stmt = $conn->prepare($sqlPreguntas);
$stmt->bind_param("i", $examenId);
$stmt->execute();
$resultPreguntas = $stmt->get_result();

$preguntas = [];
while ($row = $resultPreguntas->fetch_assoc()) {
    $idPregunta = $row['idPregunta'];
    if (!isset($preguntas[$idPregunta])) {
        $preguntas[$idPregunta] = [
            'idPregunta' => $idPregunta,
            'enunciado' => $row['enunciado'],
            'valor' => $row['valor'],
            'respuestas' => []
        ];
    }

    $preguntas[$idPregunta]['respuestas'][] = [
        'idRespuesta' => $row['idRespuesta'],
        'texto' => $row['texto'],
        'correcta' => $row['correcta']
    ];
}

echo json_encode([
    'examenId' => $examenId,
    'examen' => $examen,
    'preguntas' => array_values($preguntas)
]);
?>
