<?php
header('Content-Type: application/json');

require_once '../../../env/proa.inc';



session_start();

$idUsuario = $_SESSION['usuario']['idUsuariosPROA'] ?? null;

$titulo = $_POST['titulo'] ?? '';
$fechaInicio = $_POST['fechaApertura'] ?? null;
$fechaFin = $_POST['fechaCierre'] ?? null;
$duracion = $_POST['duracion'] ?? null;
$peso = $_POST['peso'] ?? null;
$puntos = $_POST['puntos'] ?? null;

$codigoAsignatura = $_POST['codigo'] ?? null;
$idGrupo = $_POST['idGrupo'] ?? null;
$idDocente = $idUsuario ?? null;
$estado = 4;

$preguntas = json_decode($_POST['preguntas'] ?? '[]', true);

if (empty($titulo) || empty($codigoAsignatura) || empty($idDocente) || empty($preguntas)) {
    echo json_encode([
        'success' => false,
        'message' => 'Faltan datos obligatorios.',
        'debug' => [
            'preguntas' => $preguntas,
        ]
    ]);
    exit;
}

// Insertar contenidoExamen
$sqlContenido = "INSERT INTO contenidoExamen (titulo, pesoExamen, puntosExamen, fechaApertura, fechaFin, duracion)
VALUES (?, ?, ?, ?, ?, ?)";
$stmtContenido = $conn->prepare($sqlContenido);
$stmtContenido->bind_param("siissi", $titulo, $peso, $puntos, $fechaInicio, $fechaFin, $duracion);
$stmtContenido->execute();

$stmtContenido->execute();
if ($stmtContenido->affected_rows == 0) {
    die(json_encode(['success' => false, 'message' => 'Error al insertar contenidoExamen.', 'error' => $stmtContenido->error]));
}

$idContenido = (int) $stmtContenido->insert_id;
$stmtContenido->close();

// Insertar examen
$sqlExamen = "INSERT INTO examenes (codigoAsignatura, idGrupo, idContenido, idEstado, idUsuariosPROA)
VALUES (?, ?, ?, ?, ?)";
$stmtExamen = $conn->prepare($sqlExamen);
$stmtExamen->bind_param("siiii", $codigoAsignatura, $idGrupo, $idContenido, $estado, $idUsuario);
$stmtExamen->execute();

if ($stmtExamen->affected_rows == 0) {
    die(json_encode(['success' => false, 'message' => 'Error al insertar examen.']));
}
$idExamen = $stmtExamen->insert_id;
$stmtExamen->close();


$sqlObtenerExamen =

// Insertar preguntas y opciones
$sqlPregunta = "INSERT INTO preguntasexamen (idContenido, enunciado, valorPregunta) VALUES (?, ?, ?)";
$stmtPregunta = $conn->prepare($sqlPregunta);

$sqlOpcion = "INSERT INTO opcionespregunta (idPregunta, textoOpcion, esCorrecta) VALUES (?, ?, ?)";
$stmtOpcion = $conn->prepare($sqlOpcion);

foreach ($preguntas as $pregunta) {
    $enunciado = $pregunta['pregunta'] ?? '';
    $valor = $pregunta['valor'] ?? '';
    $opciones = $pregunta['respuestas'] ?? [];

    if (empty($enunciado) || empty($opciones)) {

        continue;
    }


    $stmtPregunta->bind_param("isi", $idContenido, $enunciado, $valor);
    $stmtPregunta->execute();

    if ($stmtPregunta->affected_rows == 0) {
        continue;
    }
    $idPregunta = $stmtPregunta->insert_id;

    foreach ($opciones as $opcion) {
        $textoOpcion = $opcion['texto'] ?? '';
        $esCorrecta = isset($opcion['correcta']) && ($opcion['correcta'] == '1' || $opcion['correcta'] === true) ? 1 : 0;

        if (empty($textoOpcion)) {
            continue;
        }

        $stmtOpcion->bind_param("isi", $idPregunta, $textoOpcion, $esCorrecta);
        $stmtOpcion->execute();
    }
}

$stmtPregunta->close();
$stmtOpcion->close();
$conn->close();

echo json_encode([
    'success' => true,
    'message' => 'Examen creado correctamente.',
    'idContenido' => $idContenido
]);
?>
