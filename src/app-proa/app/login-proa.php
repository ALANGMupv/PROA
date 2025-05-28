<?php
// Respuesta en formato JSON
header('Content-Type: application/json');

// Conexión con la base de datos PROA
require_once '../../../env/proa.inc';

// Este bloque se modificará ya que los datos se rellenarán automaticamente segun el id de GTI logueado
// Obtenemos los datos enviados desde JavaScript como JSON
$datos = json_decode(file_get_contents("php://input"), true);

// Extraemos correo y contraseña del JSON recibido
$correo = $datos['correo'] ?? '';
$contrasena = $datos['contrasena'] ?? '';

// Si faltan datos, respondemos con error
if (!$correo || !$contrasena) {
    echo json_encode(['exito' => false, 'mensaje' => 'Faltan datos']);
    exit;
}
// Bloque a modificar terminado

// Buscamos al usuario en la base de datos
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

// Obtenemos los datos como array asociativo
$usuario = $resultado->fetch_assoc();

// Cerramos conexión y statement
$stmt->close();
$conn->close();

// Si no se encontró ningún usuario
if (!$usuario) {
    echo json_encode(['exito' => false, 'mensaje' => 'Usuario no encontrado']);
    exit;
}

// Hasheamos la contraseña introducida (SHA-256, igual que en GTI)
$hashEntrada = hash('sha256', $contrasena);

// Comparamos el hash con el que está en la base de datos
if ($usuario['contraseña'] !== $hashEntrada) {
    echo json_encode(['exito' => false, 'mensaje' => 'Contraseña incorrecta']);
    exit;
}

// Si todo es correcto, respondemos con éxito y los datos necesarios
echo json_encode([
    'exito' => true,
    'usuario' => [
        'nombre' => $usuario['nombre'],
        'apellidos' => $usuario['apellidos'],
        'correo' => $usuario['email'],
        'rol' => $usuario['nombreRol']
    ]
]);
