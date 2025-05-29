<?php
session_start();
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["codigoAsignatura"]) || !isset($data["nombre"])) {
    echo json_encode(["error" => "Faltan datos"]);
    exit;
}

$_SESSION["asignaturaSeleccionada"] = [
    "codigoAsignatura" => $data["codigoAsignatura"],
    "nombre" => $data["nombre"]
];

echo json_encode(["success" => true]);
