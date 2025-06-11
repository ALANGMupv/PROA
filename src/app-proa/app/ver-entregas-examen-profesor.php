<?php
require_once '../../../env/proa.inc';
session_start();
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$codigoAsignatura = $_GET['codigoAsignatura'] ?? null;
if (!$codigoAsignatura) {
    echo json_encode(['error' => 'Faltan datos o el código de la asignatura no es válido.']);
    exit;
}

// Obtener las entregas de los exámenes de la asignatura seleccionada
$sql = "SELECT p.nombre, c.notaExamenAlumno, re.respuesta AS respuestaAlumno, p.idUsuariosPROA
        FROM calificaciones c
        JOIN personas p ON c.idUsuariosPROA = p.idUsuariosPROA
        JOIN respuestasalumno ra ON c.idExamen = ra.idExamen AND ra.idUsuariosPROA = p.idUsuariosPROA
        JOIN respuestasexamen re ON ra.idRespuesta = re.idRespuesta
        WHERE c.codigoAsignatura = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $codigoAsignatura);
$stmt->execute();
$result = $stmt->get_result();

$entregas = [];
while ($row = $result->fetch_assoc()) {
    // Obtener las respuestas y las preguntas asociadas a cada entrega
    $idExamen = $row['idExamen'];
    $sqlRespuestas = "SELECT p.idPregunta, p.enunciado, p.valorPregunta AS valor, 
                             r.idRespuesta, r.respuesta AS texto, r.valorRespuesta AS correcta,
                             ra.idRespuesta AS respuestaAlumno
                     FROM preguntasexamen p
                     INNER JOIN respuestasexamen r ON p.idPregunta = r.idPregunta
                     LEFT JOIN respuestasalumno ra 
                        ON ra.idPregunta = p.idPregunta 
                        AND ra.idUsuariosPROA = ?
                        AND ra.idExamen = ? 
                     WHERE p.idContenido = ?";

    $stmtRespuestas = $conn->prepare($sqlRespuestas);
    $stmtRespuestas->bind_param("iii", $row['idUsuariosPROA'], $idExamen, $codigoAsignatura);
    $stmtRespuestas->execute();
    $resultRespuestas = $stmtRespuestas->get_result();

    $respuestas = [];
    while ($r = $resultRespuestas->fetch_assoc()) {
        $respuestas[] = [
            'idPregunta' => $r['idPregunta'],
            'enunciado' => $r['enunciado'],
            'valor' => $r['valor'],
            'opciones' => [
                'A' => $r['A'],
                'B' => $r['B'],
                'C' => $r['C'],
                'D' => $r['D'],
            ],
            'respuestaAlumno' => $r['respuestaAlumno'],
            'correcta' => $r['correcta']
        ];
    }

    $entregas[] = [
        'nombre' => $row['nombre'],
        'nota' => $row['notaExamenAlumno'],
        'respuestas' => $respuestas
    ];
}

echo json_encode(['entregas' => $entregas]);

?>
