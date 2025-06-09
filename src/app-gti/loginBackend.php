<?php
session_start();
require_once '../../env/gti.inc';

$data = json_decode(file_get_contents('php://input'), true);

$correo = $data['correo'] ?? '';
$contrasena = $data['clave'] ?? '';
$hash = hash('sha256', $contrasena);

$stmt = $conn->prepare("SELECT * FROM usuariosgti WHERE email = ? AND contraseña = ?");
$stmt->bind_param("ss", $correo, $hash);
$stmt->execute();

$resultado = $stmt->get_result();
$usuario = $resultado->fetch_assoc();

if ($usuario) {
    if ($usuario['estado'] != 1) {
        echo json_encode(['ok' => false, 'mensaje' => 'Debes activar tu cuenta desde el correo.']);
        exit;
    }

    $_SESSION['usuario'] = [
        'id' => $usuario['idUsuariosGTI'],
        'nombre' => $usuario['nombre'],
        'apellidos' => $usuario['apellidos'],
        'correo' => $usuario['email']
    ];

    $_SESSION['usuarioGTI'] = $_SESSION['usuario'];
    echo json_encode(['ok' => true]);
} else {
    echo json_encode(['ok' => false, 'mensaje' => 'Usuario o contraseña incorrectos']);
}
