<?php
session_start();
header('Content-Type: application/json');

// Incluir la conexión a la base de datos
require_once '../../../env/proa.inc';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Verificar que la conexión a la base de datos esté establecida
if (!$conn) {
    error_log("Error: Conexión a la base de datos no establecida.");
    echo json_encode(['error' => 'Error en la conexión a la base de datos']);
    exit;
}

// Obtener los encabezados para verificar el tipo de contenido
$headers = getallheaders();
error_log("Encabezados de la solicitud: " . print_r($headers, true));

// Verificar el tipo de contenido
if (!isset($headers['Content-Type']) || strpos($headers['Content-Type'], 'application/json') === false) {
    error_log("Error: Content-Type no es JSON.");
    echo json_encode(['error' => 'El tipo de contenido no es JSON']);
    exit;
}

error_log("Encabezados de la solicitud: " . print_r(getallheaders(), true));


// Obtener los datos del examen desde el frontend (enviado por JSON)
$json_data = file_get_contents("php://input");

// Si `php://input` está vacío, intentamos obtener datos desde `$_POST`
if (!isset($headers['Content-Type']) || strpos($headers['Content-Type'], 'application/json') === false) {
    error_log("Advertencia: Content-Type no es JSON, intentando con `$_POST`.");
    $json_data = json_encode($_POST);
} else {
    $json_data = file_get_contents("php://input");
}

if (empty($json_data)) {
    error_log("Advertencia: `php://input` está vacío, intentando con `$_POST`.");
    $json_data = json_encode($_POST);
}

// Depuración: muestra el cuerpo de la solicitud recibido
error_log("Cuerpo de la solicitud: " . $json_data);

// Decodificar los datos JSON
$data = json_decode($json_data, true);

// Si no se puede decodificar el JSON, devolver el error
if ($data === null) {
    error_log("Error al decodificar JSON: " . json_last_error_msg());
    echo json_encode([
        'error' => 'Error al decodificar el JSON',
        'message' => json_last_error_msg(),
        'received_data' => $json_data
    ]);
    exit;
}

// Depuración: muestra los datos decodificados
error_log("Datos decodificados: " . print_r($data, true));

// Verificar si los datos están presentes
if (!isset($data['titulo'], $data['descripcion'], $data['fecha_apertura'], $data['fecha_cierre'],
    $data['peso'], $data['duracion'], $data['preguntas'])) {

    error_log("Error: Faltan datos obligatorios.");
    http_response_code(400);
    echo json_encode([
        'error' => 'Faltan datos obligatorios',
        'missing_fields' => [
            'titulo' => $data['titulo'] ?? null,
            'descripcion' => $data['descripcion'] ?? null,
            'fecha_apertura' => $data['fecha_apertura'] ?? null,
            'fecha_cierre' => $data['fecha_cierre'] ?? null,
            'peso' => $data['peso'] ?? null,
            'duracion' => $data['duracion'] ?? null,
            'preguntas' => isset($data['preguntas']) ? count($data['preguntas']) : 0
        ]
    ]);
    exit;
}

// Insertar contenido del examen
$stmt = $conn->prepare("INSERT INTO contenidoexamen (titulo, descripcion, fechaApertura, fechaFin, pesoExamen, duracion) 
                       VALUES (?, ?, ?, ?, ?, ?)");

if (!$stmt) {
    error_log("Error al preparar consulta para contenidoexamen: " . $conn->error);
    echo json_encode(['error' => 'Error al preparar la consulta para contenidoexamen', 'message' => $conn->error]);
    exit;
}

$stmt->bind_param("ssssss", $data['titulo'], $data['descripcion'], $data['fecha_apertura'],
    $data['fecha_cierre'], $data['peso'], $data['duracion']);
if (!$stmt->execute()) {
    error_log("Error al ejecutar consulta para contenidoexamen: " . $stmt->error);
    echo json_encode(['error' => 'Error al ejecutar la consulta para contenidoexamen', 'message' => $stmt->error]);
    exit;
}

$idContenido = $stmt->insert_id;
error_log("ID de contenido insertado: " . $idContenido);

// Insertar examen en la tabla `examenes`
$idProfesor = $_SESSION['usuario']['idUsuariosPROA'];
$stmt = $conn->prepare("INSERT INTO examenes (codigoAsignatura, idContenido, idEstado, idUsuariosPROA) 
                       VALUES (?, ?, 1, ?)");

if (!$stmt) {
    error_log("Error al preparar consulta para examenes: " . $conn->error);
    echo json_encode(['error' => 'Error al preparar la consulta para examenes', 'message' => $conn->error]);
    exit;
}

$stmt->bind_param("sii", $data['codigo_asignatura'], $idContenido, $idProfesor);
if (!$stmt->execute()) {
    error_log("Error al ejecutar consulta para examenes: " . $stmt->error);
    echo json_encode(['error' => 'Error al ejecutar la consulta para examenes', 'message' => $stmt->error]);
    exit;
}

$idExamen = $stmt->insert_id;
error_log("ID de examen insertado: " . $idExamen);

// Verificar si las preguntas están siendo procesadas
error_log("Preguntas recibidas: " . print_r($data['preguntas'], true));

// Insertar preguntas
foreach ($data['preguntas'] as $pregunta) {
    error_log("Procesando pregunta: " . $pregunta['enunciado']);  // Depuración
    $stmt = $conn->prepare("INSERT INTO preguntasexamen (enunciado, valorPregunta, idContenido) 
                           VALUES (?, ?, ?)");
    if (!$stmt) {
        error_log("Error al preparar consulta para preguntasexamen: " . $conn->error);
        echo json_encode(['error' => 'Error al preparar la consulta para preguntasexamen', 'message' => $conn->error]);
        exit;
    }

    $stmt->bind_param("ssi", $pregunta['enunciado'], $pregunta['valor'], $idContenido);
    if (!$stmt->execute()) {
        error_log("Error al ejecutar consulta para preguntasexamen: " . $stmt->error);
        echo json_encode(['error' => 'Error al ejecutar la consulta para preguntasexamen', 'message' => $stmt->error]);
        exit;
    }

    $idPregunta = $stmt->insert_id;
    error_log("ID de pregunta insertado: " . $idPregunta);

    // Insertar respuestas
    foreach ($pregunta['respuestas'] as $respuesta) {
        error_log("Procesando respuesta: " . $respuesta['respuesta']);  // Depuración
        $valorRespuesta = $respuesta['correcta'] ? 1 : 0;
        $stmt = $conn->prepare("INSERT INTO respuestasexamen (respuesta, valorRespuesta, idPregunta) 
                               VALUES (?, ?, ?)");
        if (!$stmt) {
            error_log("Error al preparar consulta para respuestasexamen: " . $conn->error);
            echo json_encode(['error' => 'Error al preparar la consulta para respuestasexamen', 'message' => $conn->error]);
            exit;
        }

        $stmt->bind_param("sii", $respuesta['respuesta'], $valorRespuesta, $idPregunta);
        if (!$stmt->execute()) {
            error_log("Error al ejecutar consulta para respuestasexamen: " . $stmt->error);
            echo json_encode(['error' => 'Error al ejecutar la consulta para respuestasexamen', 'message' => $stmt->error]);
            exit;
        }

        error_log("Respuesta insertada para la pregunta " . $idPregunta);
    }
}

echo json_encode(['success' => true, 'message' => 'Examen creado exitosamente']);
?>
