<?php

// Depurar errores
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../../../env/proa.inc';
session_start();

if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['rol'] !== 'alumno') {
    http_response_code(403);
    echo json_encode(['error' => 'Acceso denegado']);
    exit;
}

$idAlumno = $_SESSION['usuario']['idUsuariosPROA'];

$sql = "SELECT a.codigoAsignatura, a.nombre, c.nombreCurso, s.nombreSemestre,
               aa.asignaturaFavorita, c.idCurso, s.idSemestre
        FROM asignacionalumno aa
        JOIN asignaturas a ON aa.codigoAsignatura = a.codigoAsignatura
        JOIN cursos c ON a.idCurso = c.idCurso
        JOIN semestres s ON a.idSemestre = s.idSemestre
        WHERE aa.idUsuariosPROA = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $idAlumno);
$stmt->execute();
$result = $stmt->get_result();

$asignaturas = [];
while ($row = $result->fetch_assoc()) {
    $asignaturas[] = [
        'codigo' => $row['codigoAsignatura'],
        'nombre' => $row['nombre'],
        'curso' => $row['idCurso'],
        'semestre' => $row['idSemestre'],
        'favorita' => $row['asignaturaFavorita'] == 1
    ];

}

header('Content-Type: application/json');
echo json_encode($asignaturas);