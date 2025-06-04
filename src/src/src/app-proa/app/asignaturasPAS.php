<?php
header('Content-Type: application/json');
require_once '../../../env/proa.inc';

$sql = "SELECT 
            a.codigoAsignatura AS codigo,
            a.nombre,
            d.nombreDepartamento AS departamento,
            a.creditos
        FROM asignaturas a
        LEFT JOIN departamentos d ON a.idDepartamento = d.idDepartamento";

$result = $conn->query($sql);

if ($result) {
    $asignaturas = [];
    while ($row = $result->fetch_assoc()) {
        $asignaturas[] = $row;
    }
    echo json_encode($asignaturas);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error en la base de datos: ' . $conn->error]);
}

$conn->close();
