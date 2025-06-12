<?php
require_once '../../env/gti.inc';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$token = $data['token'] ?? '';
$nueva = $data['nueva'] ?? '';

if (!$email || !$token || !$nueva) {
    http_response_code(400);
    echo "Faltan datos";
    exit;
}

// Se consulta si existe un usuario con ese email, ese token, y que el validez_token no haya caducado.
$stmt = $conn->prepare("SELECT contraseña FROM usuariosgti WHERE email = ? AND token = ? AND validez_token > NOW()");
$stmt->bind_param("ss", $email, $token);
$stmt->execute();
$result = $stmt->get_result();

// Si no hay coincidencias, se responde con error 403 Forbidden.
if ($result->num_rows === 0) {
    http_response_code(403);
    echo "Token inválido o caducado";
    exit;
}

$row = $result->fetch_assoc();
$hashActual = $row['contraseña'];

// Hashear nueva contraseña para comparar
$hashNuevo = hash('sha256', $nueva);

// Comparar con la actual
if ($hashNuevo === $hashActual) {
    echo "REPETIDA";
    exit;
}

// Actualizar la contraseña
$stmt = $conn->prepare("UPDATE usuariosgti SET contraseña = ?, token = NULL, validez_token = NULL WHERE email = ?");
$stmt->bind_param("ss", $hashNuevo, $email);

if ($stmt->execute()) {
    echo "OK";
} else {
    http_response_code(500);
    echo "Error al guardar";
}

$stmt->close();
$conn->close();
