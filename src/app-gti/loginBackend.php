<?php
session_start();
require_once '../../env/gti.inc';

// Obtener los datos enviados desde JavaScript (fetch)
$data = json_decode(file_get_contents('php://input'), true);

$correo = $data['correo'] ?? '';
$contrasena = $data['clave'] ?? '';
$hash = hash('sha256', $contrasena);

// Usar sentencia preparada con mysqli
$stmt = $conn->prepare("SELECT * FROM usuariosgti WHERE email = ? AND contraseña = ?");
$stmt->bind_param("ss", $correo, $hash);
$stmt->execute();

$resultado = $stmt->get_result();
$usuario = $resultado->fetch_assoc();

if ($usuario) {
    // Guardar datos como 'usuario' para GTI
    $_SESSION['usuario'] = [
        'id' => $usuario['idUsuariosGTI'],
        'nombre' => $usuario['nombre'],
        'apellidos' => $usuario['apellidos'],
        'correo' => $usuario['email']
    ];

    // Guardar también como 'usuarioGTI' para que PROA lo pueda usar
    $_SESSION['usuarioGTI'] = $_SESSION['usuario'];

    echo json_encode(['ok' => true]);
}else {
    echo json_encode(['ok' => false, 'mensaje' => 'Usuario o contraseña incorrectos']);
}
