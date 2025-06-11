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
    $respuestaAlumno = $row['respuesta_alumno'];
    $acierto = $row['acierto_alumno'];
    $nota = $row['calificacion_total'] ?? 0;

    // Añadir alumno
    if (!isset($alumnos[$idAlumno])) {
        $alumnos[$idAlumno] = ['id' => $idAlumno, 'nombre' => $nombreAlumno];
        $calificaciones[$idAlumno] = $nota;
    }

    // Guardar respuesta del alumno
    $respuestasAlumnos[$idAlumno][$idPregunta] = $idRespuestaAlumno;

    // Guardar pregunta y todas sus opciones (solo si no se ha hecho antes)
    if (!isset($preguntas[$idPregunta])) {
        $preguntas[$idPregunta] = [
            'texto' => $row['pregunta'],
            'valor' => $row['valor_total_examen'],
            'opciones' => []
        ];

        // Consulta todas las opciones reales de esa pregunta
        $sqlOpciones = "SELECT idRespuesta, respuesta, valorRespuesta
                    FROM respuestasexamen
                    WHERE idPregunta = ?";
        $stmtOpciones = $conn->prepare($sqlOpciones);
        $stmtOpciones->bind_param("i", $idPregunta);
        $stmtOpciones->execute();
        $resOpciones = $stmtOpciones->get_result();

        while ($op = $resOpciones->fetch_assoc()) {
            $preguntas[$idPregunta]['opciones'][] = [
                'id' => $op['idRespuesta'],
                'texto' => $op['respuesta'],
                'correcta' => $op['valorRespuesta'] == 1
            ];
        }
    }

}

$response['alumnos'] = array_values($alumnos);
$response['preguntas'] = $preguntas;
$response['calificaciones'] = $calificaciones;
$response['respuestasAlumnos'] = $respuestasAlumnos;

$conn->close();
echo json_encode($response);

