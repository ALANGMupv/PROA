<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once '../../env/gti.inc';
if (!isset($conn)) die("Conexión no disponible");

// Validación básica del lado servidor (por si alguien desactiva JS)
$campos = ['nombre', 'apellidos', 'correo', 'contrasena', 'institucion', 'tipo'];
foreach ($campos as $campo) {
    if (empty($_POST[$campo])) {
        die("Faltan datos obligatorios: $campo");
    }
}

// Recoger los datos directamente
$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$email = $_POST['correo'];
$password = $_POST['contrasena'];
$telefono = $_POST['telefono'] ?? null;
$nombreInstitucion = trim($_POST['institucion']);
$codigoTipo = $_POST['tipo'];

// Buscar si la institución ya existe
$stmt = $conn->prepare("SELECT codigoInstitucion FROM institucion WHERE nombreInstitucion = ?");
$stmt->bind_param("s", $nombreInstitucion);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($codigoInstitucion);
    $stmt->fetch();
    $stmt->close();
} else {
    $stmt->close();

    $query = "SELECT MAX(CAST(codigoInstitucion AS UNSIGNED)) FROM institucion";
    $result = $conn->query($query);
    $max = $result->fetch_row()[0] ?? 0;
    $nuevoCodigo = str_pad($max + 1, 3, '0', STR_PAD_LEFT);

    $stmt = $conn->prepare("INSERT INTO institucion (codigoInstitucion, codigoTipoInstitucion, nombreInstitucion) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nuevoCodigo, $codigoTipo, $nombreInstitucion);
    if (!$stmt->execute()) {
        die("Error al insertar la institución: " . $stmt->error);
    }
    $stmt->close();
    $codigoInstitucion = $nuevoCodigo;
}

// Insertar nuevo usuario
$stmt = $conn->prepare("INSERT INTO usuariosgti (email, nombre, apellidos, contraseña, codigoInstitucion, telefono) VALUES (?, ?, ?, SHA2(?, 256), ?, ?)");
$stmt->bind_param("ssssss", $email, $nombre, $apellidos, $password, $codigoInstitucion, $telefono);
$stmt->execute();

if ($stmt->affected_rows === 0) {
    die("No se insertó el usuario. Error: " . $stmt->error);
} else {
    echo "Usuario insertado correctamente";
}

$stmt->close();
$conn->close();
?>
