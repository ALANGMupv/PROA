<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require_once '../../../env/proa.inc';

$idUsuario = $_SESSION['usuario']['idUsuariosPROA'] ?? null;

if (!$idUsuario) {
    echo json_encode([]);
    exit;
}

// Recoger examenId desde GET, con validación mínima
$examenId = isset($_GET['examenId']) ? intval($_GET['examenId']) : 0;
if ($examenId <= 0) {
    echo json_encode(['error' => 'ID de examen inválido']);
    exit;
}

// Obtener datos del examen
$sqlExamen = "SELECT titulo, fecha_limite, hora_limite FROM examenes WHERE id = ?";
$stmt = $conn->prepare($sqlExamen);
$stmt->bind_param("i", $examenId);
$stmt->execute();
$resultExamen = $stmt->get_result();

if ($resultExamen->num_rows === 0) {
    echo json_encode(['error' => 'Examen no encontrado']);
    exit;
}

$examen = $resultExamen->fetch_assoc();

// Obtener preguntas y opciones del examen
$sqlPreguntas = "SELECT p.id as pregunta_id, p.texto_pregunta, o.id as opcion_id, o.texto_opcion, o.es_correcta
                 FROM preguntas p
                 LEFT JOIN opciones o ON p.id = o.pregunta_id
                 WHERE p.examen_id = ?
                 ORDER BY p.id, o.id";

$stmt = $conn->prepare($sqlPreguntas);
$stmt->bind_param("i", $examenId);
$stmt->execute();
$resultPreguntas = $stmt->get_result();

$preguntas = [];
while ($row = $resultPreguntas->fetch_assoc()) {
    $pid = $row['pregunta_id'];
    if (!isset($preguntas[$pid])) {
        $preguntas[$pid] = [
            'texto_pregunta' => $row['texto_pregunta'],
            'opciones' => []
        ];
    }
    $preguntas[$pid]['opciones'][] = [
        'id' => $row['opcion_id'],
        'texto_opcion' => $row['texto_opcion'],
        'es_correcta' => $row['es_correcta']
    ];
}

// Devolver JSON con examenId incluido
header('Content-Type: application/json');
echo json_encode([
    'examenId' => $examenId,
    'examen' => $examen,
    'preguntas' => array_values($preguntas)
]);
?>