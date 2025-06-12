<?php
require_once '../../env/gti.inc';
header('Content-Type: application/json');

if (!isset($conn)) {
    echo json_encode(['ok' => false, 'mensaje' => 'Conexión no disponible']);
    exit;
}

$token = $_GET['token'] ?? null;

if (!$token) {
    echo json_encode(['ok' => false, 'mensaje' => 'Token no proporcionado.']);
    exit;
}

$stmt = $conn->prepare("SELECT idUsuariosGTI FROM usuariosgti WHERE token = ? AND validez_token >= NOW()");
$stmt->bind_param("s", $token);
$stmt->execute();
$stmt->bind_result($idUsuario);

if ($stmt->fetch()) {
    $stmt->close();

    $stmt = $conn->prepare("UPDATE usuariosgti SET estado = 1, token = NULL, validez_token = NULL WHERE idUsuariosGTI = ?");
    $stmt->bind_param("i", $idUsuario);
    $stmt->execute();
    $stmt->close();

    echo json_encode(['ok' => true, 'mensaje' => 'Cuenta activada correctamente. Ya puedes iniciar sesión.']);
} else {
    echo json_encode(['ok' => false, 'mensaje' => 'Token inválido o caducado. Solicita un nuevo registro.']);
}
$conn->close();
