<?php
// procesar_examen.php

require_once '../../../env/proa.inc';
session_start();

$idUsuario = $_SESSION['idUsuariosPROA'] ?? null;


// Recibir datos del formulario (ajusta nombres y estructura según tu formulario)
$titulo = $_POST['titulo'] ?? '';
$descripcion = /*$_POST['descripcion'] ??*/ '';
$fechaInicio = $_POST['fechaApertura'] ?? null;
$fechaFin = $_POST['fechaCierre'] ?? null;
$duracion = $_POST['duracion'] ?? null; // en minutos o formato que uses
//$fechaPublicacion = date("Y-m-d H:i:s");
$peso = $_POST['peso'] ?? null;
$puntos = $_POST['puntos'] ?? null;




// Datos para la tabla examenes
$codigoAsignatura = $_POST['codigo'] ?? null;
$idGrupo = $_POST['idGrupo'] ?? null;
$idDocente = $_POST['idUsuario'] ?? null;
$estado = 1; // estado por defecto

$preguntas = $_POST['preguntas'] ?? [];

if (empty($titulo) || empty($idAsignatura) || empty($idGrupo) || empty($idDocente) || empty($preguntas)) {
    die("Faltan datos obligatorios.");
}

// 1. Insertar en contenidoexamen
$sqlContenido = "INSERT INTO contenidoExamen (
    titulo,
    descripcion,
    pesoExamen,
    puntosExamen,
    fechaApertura,
    fechaFin,
    duracion
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmtContenido = $conn->prepare($sqlContenido);
$stmtContenido->bind_param("ssiissi", $titulo, $descripcion, $peso, $puntos, $fechaInicio, $fechaFin, $duracion);
$stmtContenido->execute();

if ($stmtContenido->affected_rows == 0) {
    die("Error al insertar contenidoexamen.");
}

$idContenido = $stmtContenido->insert_id;
$stmtContenido->close();

// 2. Insertar en examenes
$sqlExamen = "INSERT INTO examenes (codigoAsignatura, idGrupo, idContenido, idEstado,idUsusariosPROA)
VALUES (?, ?, ?, ?, ?)";

$stmtExamen = $conn->prepare($sqlExamen);
$stmtExamen->bind_param("siiii", $codigoAsignatura, $idGrupo, $idContenido, $estado, $idUsuario);
$stmtExamen->execute();

if ($stmtExamen->affected_rows == 0) {
    die("Error al insertar examen.");
}
$idExamen = $stmtExamen->insert_id;
$stmtExamen->close();

// 3. Insertar preguntas y opciones
$sqlPregunta = "INSERT INTO preguntasexamen (idContenido, enunciado, valorPregunta) VALUES (?, ?, ?)";
$stmtPregunta = $conn->prepare($sqlPregunta);

$sqlOpcion = "INSERT INTO opcionespregunta (idPregunta, opcion, esCorrecta) VALUES (?, ?, ?)";
$stmtOpcion = $conn->prepare($sqlOpcion);

foreach ($preguntas as $pregunta) {
    $enunciado = $pregunta['textoPregunta'] ?? '';
    $valor = $pregunta['valor'] ?? '';
    $opciones = $pregunta['respuestas'] ?? [];

    if (empty($textoPregunta) || empty($opciones)) {
        continue; // saltar preguntas sin texto o sin opciones
    }

    // Insertar pregunta
    $stmtPregunta->bind_param("isi", $idContenido, $textoPregunta, $valor);
    $stmtPregunta->execute();

    if ($stmtPregunta->affected_rows == 0) {
        continue; // saltar si error al insertar pregunta
    }
    $idPregunta = $stmtPregunta->insert_id;

    // Insertar opciones
    foreach ($opciones as $opcion) {
        $textoOpcion = $opcion['texto'] ?? '';
        $esCorrecta = isset($opcion['seleccionada']) && ($opcion['seleccionada'] == '1' || $opcion['seleccionada'] === true) ? 1 : 0;

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