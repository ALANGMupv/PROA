<?php
// Respuesta en formato JSON
header('Content-Type: application/json');
session_start(); // Iniciamos sesión

// Conexión con la base de datos PROA
require_once '../../../env/proa.inc';

// Obtenemos los datos enviados desde JavaScript
$datos = json_decode(file_get_contents("php://input"), true);

// Extraemos correo y contraseña del JSON recibido
$correo = $datos['correo'] ?? '';
$contrasena = $datos['contrasena'] ?? '';

// Validación inicial
if (!$correo || !$contrasena) {
    echo json_encode(['exito' => false, 'mensaje' => 'Faltan datos']);
    exit;
}

// Consulta del usuario
$stmt = $conn->prepare("
    SELECT p.idUsuariosPROA, p.nombre, p.apellidos, p.email, p.contraseña, r.nombreRol
    FROM personas p
    JOIN personarol pr ON p.idUsuariosPROA = pr.idUsuariosPROA
    JOIN roles r ON pr.idRol = r.idRol
    WHERE p.email = ?
");
$stmt->bind_param("s", $correo);
$stmt->execute();
$resultado = $stmt->get_result();
$usuario = $resultado->fetch_assoc();
$stmt->close();
$conn->close();

// Validación de existencia del usuario
if (!$usuario) {
    echo json_encode(['exito' => false, 'mensaje' => 'Usuario no encontrado']);
    exit;
}

// Validación de contraseña
$hashEntrada = hash('sha256', $contrasena);
if ($usuario['contraseña'] !== $hashEntrada) {
    echo json_encode(['exito' => false, 'mensaje' => 'Contraseña incorrecta']);
    exit;
}

// Éxito: guardamos los datos en $_SESSION
$_SESSION['usuario'] = [
    'nombre' => $usuario['nombre'],
    'apellidos' => $usuario['apellidos'],
    'correo' => $usuario['email'],
    'rol' => $usuario['nombreRol']
];

// Devolvemos solo si el login fue exitoso
echo json_encode(['exito' => true]);
