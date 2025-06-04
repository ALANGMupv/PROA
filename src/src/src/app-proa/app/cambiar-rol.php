<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['usuarioGTI'])) {
    http_response_code(403);
    echo json_encode(['error' => 'No hay sesión GTI activa']);
    exit;
}

require_once '../../../env/proa.inc';

$rolNuevo = $_POST['rol'] ?? '';
$idUsuarioGTI = $_SESSION['usuarioGTI']['id'] ?? null;

if (!$rolNuevo || !$idUsuarioGTI) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

// Buscar al usuario en personas con ese rol
$query = "SELECT p.idUsuariosPROA, p.nombre, p.apellidos, p.email
          FROM personas p
          JOIN personarol pr ON p.idUsuariosPROA = pr.idUsuariosPROA
          JOIN roles r ON pr.idRol = r.idRol
          WHERE p.idUsuariosGTI = ? AND r.nombreRol = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("is", $idUsuarioGTI, $rolNuevo);
$stmt->execute();
$result = $stmt->get_result();
$usuario = $result->fetch_assoc();
$stmt->close();

if (!$usuario) {
    http_response_code(404);
    echo json_encode(['error' => 'Usuario no encontrado para ese rol']);
    exit;
}

// Guardamos nuevo rol en sesión
$_SESSION['usuario'] = [
    'idUsuariosPROA' => $usuario['idUsuariosPROA'],
    'nombre' => $usuario['nombre'],
    'apellidos' => $usuario['apellidos'],
    'correo' => $usuario['email'],
    'rol' => $rolNuevo
];

// Redirigir a la vista del rol
switch ($rolNuevo) {
    case 'alumno':
        header('Location: ../alumno/index.php');
        break;
    case 'profesor':
        header('Location: ../profesor/index.php');
        break;
    case 'pas':
        header('Location: ../pas/index.php');
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Rol desconocido']);
}
exit;
