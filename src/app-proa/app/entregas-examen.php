<?php
require_once __DIR__ . '/../../../env/proa.inc';
header('Content-Type: application/json');

$codigoAsignatura = $_GET['codigoAsignatura'] ?? '';
$idExamen = $_GET['idExamen'] ?? '';

if (empty($codigoAsignatura) || empty($idExamen) || $idExamen === 'null') {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan parámetros']);
    exit;
}

$response = [
    'alumnos' => [],
    'preguntas' => [],
    'calificaciones' => [],
    'respuestasAlumnos' => []
];

// Usamos la vista directamente
$sql = "SELECT * FROM vista_detalle_examenes_alumnos 
        WHERE codigo_asignatura = ? AND id_examen = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $codigoAsignatura, $idExamen);
$stmt->execute();
$result = $stmt->get_result();

$alumnos = [];
$preguntas = [];
$calificaciones = [];
$respuestasAlumnos = [];

while ($row = $result->fetch_assoc()) {
    $idAlumno = $row['id_alumno'];
    $nombreAlumno = $row['nombre_alumno'];
    $idPregunta = $row['id_pregunta'];
    $idRespuestaAlumno = $row['id_respuesta_alumno'];
    $respuestaCorrecta = $row['respuesta_correcta'];
    $respuestaAlumno = $row['respuesta_alumno'];
    $acierto = $row['acierto_alumno'];
    $nota = $row['calificacion_total'] ?? 0;
    $respuestaCorrectaId = null;

    // Añadir alumno si no estaba ya
    if (!isset($alumnos[$idAlumno])) {
        $alumnos[$idAlumno] = ['id' => $idAlumno, 'nombre' => $nombreAlumno];
        $calificaciones[$idAlumno] = $nota;
    }

    // Guardar respuesta del alumno
    $respuestasAlumnos[$idAlumno][$idPregunta] = $idRespuestaAlumno;

    // Guardar pregunta y sus opciones
    if (!isset($preguntas[$idPregunta])) {
        $preguntas[$idPregunta] = [
            'texto' => $row['pregunta'],
            'valor' => $row['valor_total_examen'], // o valor por pregunta si lo tienes
            'opciones' => []
        ];
    }

    // Añadir opción si no está
    $yaExiste = false;
    foreach ($preguntas[$idPregunta]['opciones'] as $opcion) {
        if ($opcion['texto'] === $respuestaAlumno) {
            $yaExiste = true;
            break;
        }
    }
    if (!$yaExiste) {
        $preguntas[$idPregunta]['opciones'][] = [
            'id' => $idRespuestaAlumno,
            'texto' => $respuestaAlumno,
            'correcta' => $acierto == 1
        ];
    }
}

// Formato final
$response['alumnos'] = array_values($alumnos);
$response['preguntas'] = $preguntas;
$response['calificaciones'] = $calificaciones;
$response['respuestasAlumnos'] = $respuestasAlumnos;

$conn->close();
echo json_encode($response);
