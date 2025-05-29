<?php
// procesar_examen.php

require_once '../../../env/proa.inc';

// Recibir datos del formulario (ajusta nombres y estructura según tu formulario)
$titulo = $_POST['t itulo'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$fechaInicio = $_POST['fechaInicio'] ?? null;
$fechaFin = $_POST['fechaFin'] ?? null;
$duracion = $_POST['duracion'] ?? null; // en minutos o formato que uses
$fechaPublicacion = $_POST['fechaPublicacion'] ?? null;

// Datos para la tabla examenes
$idAsignatura = $_POST['idAsignatura'] ?? null;
$idGrupo = $_POST['idGrupo'] ?? null;
$idDocente = $_POST['idDocente'] ?? null;
$estado = $_POST['estado'] ?? 'pendiente'; // estado por defecto

// Preguntas y opciones - asumo estructura así:
// $_POST['preguntas'] = array de preguntas, cada una con:
// ['textoPregunta'] y ['opciones'] que es array de opciones, donde cada opción es ['textoOpcion', 'esCorrecta']

$preguntas = $_POST['preguntas'] ?? [];

if (empty($titulo) || empty($idAsignatura) || empty($idGrupo) || empty($idDocente) || empty($preguntas)) {
    die("Faltan datos obligatorios.");
}

// 1. Insertar en contenidoexamen
$sqlContenido = "INSERT INTO contenidoexamen (titulo, descripcion, fechaInicio, fechaFin, duracion, fechaPublicacion)
VALUES (?, ?, ?, ?, ?, ?)";

$stmtContenido = $conn->prepare($sqlContenido);
$stmtContenido->bind_param("ssssss", $titulo, $descripcion, $fechaInicio, $fechaFin, $duracion, $fechaPublicacion);
$stmtContenido->execute();

if ($stmtContenido->affected_rows == 0) {
    die("Error al insertar contenidoexamen.");
}

$idContenido = $stmtContenido->insert_id;
$stmtContenido->close();

// 2. Insertar en examenes
$sqlExamen = "INSERT INTO examenes (idAsignatura, idGrupo, idDocente, idContenido, estado)
VALUES (?, ?, ?, ?, ?)";

$stmtExamen = $conn->prepare($sqlExamen);
$stmtExamen->bind_param("iiiss", $idAsignatura, $idGrupo, $idDocente, $idContenido, $estado);
$stmtExamen->execute();

if ($stmtExamen->affected_rows == 0) {
    die("Error al insertar examen.");
}
$idExamen = $stmtExamen->insert_id;
$stmtExamen->close();

// 3. Insertar preguntas y opciones
$sqlPregunta = "INSERT INTO preguntasexamen (idContenido, pregunta) VALUES (?, ?)";
$stmtPregunta = $conn->prepare($sqlPregunta);

$sqlOpcion = "INSERT INTO opcionespregunta (idPregunta, opcion, esCorrecta) VALUES (?, ?, ?)";
$stmtOpcion = $conn->prepare($sqlOpcion);

foreach ($preguntas as $pregunta) {
    $textoPregunta = $pregunta['textoPregunta'] ?? '';
    $opciones = $pregunta['opciones'] ?? [];

    if (empty($textoPregunta) || empty($opciones)) {
        continue; // saltar preguntas sin texto o sin opciones
    }

    // Insertar pregunta
    $stmtPregunta->bind_param("is", $idContenido, $textoPregunta);
    $stmtPregunta->execute();

    if ($stmtPregunta->affected_rows == 0) {
        continue; // saltar si error al insertar pregunta
    }
    $idPregunta = $stmtPregunta->insert_id;

    // Insertar opciones
    foreach ($opciones as $opcion) {
        $textoOpcion = $opcion['textoOpcion'] ?? '';
        $esCorrecta = isset($opcion['esCorrecta']) && ($opcion['esCorrecta'] == '1' || $opcion['esCorrecta'] === true) ? 1 : 0;

        if (empty($textoOpcion)) {
            continue; // saltar opciones vacías
        }

        $stmtOpcion->bind_param("isi", $idPregunta, $textoOpcion, $esCorrecta);
        $stmtOpcion->execute();
    }
}

$stmtPregunta->close();
$stmtOpcion->close();

$conn->close();

echo "Examen creado correctamente con ID contenido: $idContenido";

?>
