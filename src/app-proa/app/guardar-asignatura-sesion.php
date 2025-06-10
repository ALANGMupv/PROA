<?php
session_start();
header('Content-Type: application/json');

// Leer datos JSON del body
$data = json_decode(file_get_contents("php://input"), true);

// TEMPORAL: Ver qué llega exactamente
file_put_contents("debug_input.txt", file_get_contents("php://input"));

// Validar que se han recibido los campos necesarios
if (
    !isset($data["codigoAsignatura"]) || empty($data["codigoAsignatura"]) ||
    !isset($data["nombre"]) || empty($data["nombre"])
) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan datos obligatorios"]);
    exit;
}

// Guardar en la sesión
$_SESSION["asignaturaSeleccionada"] = [
    "codigoAsignatura" => $data["codigoAsignatura"],
    "nombre" => $data["nombre"]
];

// Devolver respuesta exitosa
echo json_encode(["success" => true]);
