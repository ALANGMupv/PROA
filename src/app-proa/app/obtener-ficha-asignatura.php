<?php
session_start();
header('Content-Type: application/json');
require_once '../../../env/proa.inc';

if (!isset($_SESSION['asignaturaSeleccionada']['codigoAsignatura'])) {
    echo json_encode(['error' => 'No hay asignatura seleccionada']);
    exit;
}

$codigo = $_SESSION['asignaturaSeleccionada']['codigoAsignatura'];

// 1. Datos de la asignatura
$sql = "SELECT 
            a.codigoAsignatura AS codigo,
            a.nombre,
            a.creditos,
            c.nombreCurso AS curso,
            s.nombreSemestre AS semestre,
            d.nombreDepartamento AS departamento,
            t.nombreTitulacion AS titulacion,
            ca.tipoCaracter AS caracter
        FROM asignaturas a
        LEFT JOIN cursos c ON a.idCurso = c.idCurso
        LEFT JOIN semestres s ON a.idSemestre = s.idSemestre
        LEFT JOIN departamentos d ON a.idDepartamento = d.idDepartamento
        LEFT JOIN titulacion t ON a.codigoTitulacion = t.codigoTitulacion
        LEFT JOIN caracteresasignatura ca ON a.idCaracter = ca.idCaracter
        WHERE a.codigoAsignatura = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $codigo);
$stmt->execute();
$res = $stmt->get_result();
$asignatura = $res->fetch_assoc();

// 2. Alumnos asignados
$sqlAlumnos = "SELECT CONCAT(p.nombre, ' ', p.apellidos) AS nombreCompleto
               FROM asignacionalumno aa
               JOIN personas p ON p.idUsuariosPROA = aa.idUsuariosPROA
               WHERE aa.codigoAsignatura = ?";
$stmt = $conn->prepare($sqlAlumnos);
$stmt->bind_param("s", $codigo);
$stmt->execute();
$res = $stmt->get_result();
$alumnos = array_column($res->fetch_all(MYSQLI_ASSOC), 'nombreCompleto');

// 3. Profesores asignados
$sqlProfes = "SELECT CONCAT(p.nombre, ' ', p.apellidos) AS nombreCompleto, ad.responsable
              FROM asignaciondocentes ad
              JOIN personas p ON p.idUsuariosPROA = ad.idUsuariosPROA
              WHERE ad.codigoAsignatura = ?";
$stmt = $conn->prepare($sqlProfes);
$stmt->bind_param("s", $codigo);
$stmt->execute();
$res = $stmt->get_result();

$titular = null;
$colaboradores = [];

while ($row = $res->fetch_assoc()) {
    if ($row['responsable']) {
        $titular = $row['nombreCompleto'];
    } else {
        $colaboradores[] = $row['nombreCompleto'];
    }
}

// Enviar todo junto
echo json_encode([
    'success' => true,
    'asignatura' => $asignatura,
    'alumnos' => $alumnos,
    'titular' => $titular,
    'colaboradores' => $colaboradores
]);

$conn->close();
