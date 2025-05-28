<?php
require_once '../../env/gti.inc';

// Verifica que el campo email fue enviado mediante POST. Si no está, devuelve error 400 Bad Request y termina la ejecución.
if (!isset($_POST['email'])) {
    http_response_code(400);
    echo "Falta el email";
    exit;
}

$email = trim($_POST['email']);

// Verificar si el usuario existe
$stmt = $conn->prepare("SELECT idUsuariosGTI FROM usuariosgti WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$resultado = $stmt->get_result();

// Si no se encuentra ningún usuario con ese correo, se responde con error 404 Not Found.
if ($resultado->num_rows === 0) {
    http_response_code(404);
    echo "Correo no encontrado";
    exit;
}

// Generar token seguro y su caducidad.
$token = bin2hex(random_bytes(16)); // token seguro
$validez = date("Y-m-d H:i:s", strtotime("+10 minutes")); // caduca en 10 min

$stmt = $conn->prepare("UPDATE usuariosgti SET token = ?, validez_token = ? WHERE email = ?");
$stmt->bind_param("sss", $token, $validez, $email);

// Si se actualiza correctamente, se devuelve el token al frontend, que lo usará para redirigir al usuario a la página nuevaContrasenya.php. Si ocurre un error en la base de datos, se devuelve un error 500.(internal server error).
if ($stmt->execute()) {
    echo $token;
} else {
    http_response_code(500);
    echo "Error al generar el enlace";
}

$stmt->close();
$conn->close();
