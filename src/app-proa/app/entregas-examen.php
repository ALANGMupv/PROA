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

// Obtener el título del examen
$tituloExamen = "(Título no disponible)";
$sqlTitulo = "SELECT ce.titulo 
              FROM examenes e
              JOIN contenidoexamen ce ON e.idContenido = ce.idContenido
              WHERE e.idExamen = ?";
$stmtTitulo = $conn->prepare($sqlTitulo);
$stmtTitulo->bind_param("i", $idExamen);
$stmtTitulo->execute();
$resTitulo = $stmtTitulo->get_result();
if ($rowTitulo = $resTitulo->fetch_assoc()) {
    $tituloExamen = $rowTitulo['titulo'];
}

// Obtener valor total del examen
$valorExamen = 10; // por defecto
$sqlValor = "SELECT valorExamen FROM calificaciones WHERE idExamen = ? LIMIT 1";
$stmtValor = $conn->prepare($sqlValor);
$stmtValor->bind_param("i", $idExamen);
$stmtValor->execute();
$resValor = $stmtValor->get_result();
if ($rowValor = $resValor->fetch_assoc()) {
    $valorExamen = $rowValor['valorExamen'];
}

$response = [
    'alumnos' => [],
    'preguntas' => [],
    'calificaciones' => [],
    'respuestasAlumnos' => [],
    'tituloExamen' => $tituloExamen,
    'valorExamen' => $valorExamen
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
    $nota = $row['calificacion_total'] ?? 0;

    if (!isset($alumnos[$idAlumno])) {
        $alumnos[$idAlumno] = ['id' => $idAlumno, 'nombre' => $nombreAlumno];
        $calificaciones[$idAlumno] = $nota;
    }

    $respuestasAlumnos[$idAlumno][$idPregunta] = $idRespuestaAlumno;

    if (!isset($preguntas[$idPregunta])) {
        $preguntas[$idPregunta] = [
            'texto' => $row['pregunta'],
            'valor' => $row['valor_pregunta'],
            'opciones' => []
        ];

        // Obtener las opciones de respuesta
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
