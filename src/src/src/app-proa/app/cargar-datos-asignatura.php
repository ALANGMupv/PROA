<?php
header('Content-Type: application/json');
require_once '../../../env/proa.inc';

$datos = [];

$tablas = [
    'departamentos' => ['id' => 'idDepartamento', 'nombre' => 'nombreDepartamento'],
    'titulacion' => ['id' => 'codigoTitulacion', 'nombre' => 'nombreTitulacion'],
    'cursos' => ['id' => 'idCurso', 'nombre' => 'nombreCurso'],
    'semestres' => ['id' => 'idSemestre', 'nombre' => 'nombreSemestre'],
    'caracteresasignatura' => ['id' => 'idCaracter', 'nombre' => 'tipoCaracter']
];

foreach ($tablas as $tabla => $campos) {
    $sql = "SELECT {$campos['id']} AS id, {$campos['nombre']} AS nombre FROM $tabla";
    $res = $conn->query($sql);
    if ($res) {
        $datos[$tabla] = $res->fetch_all(MYSQLI_ASSOC);
    } else {
        $datos[$tabla] = [];
    }
}

echo json_encode($datos);
$conn->close();
?>
