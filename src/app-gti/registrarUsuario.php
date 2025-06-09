<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once '../../env/gti.inc';
if (!isset($conn)) die("Conexión no disponible");

// Validación básica del lado servidor
$campos = ['nombre', 'apellidos', 'correo', 'contrasena', 'institucion', 'tipo'];
foreach ($campos as $campo) {
    if (empty($_POST[$campo])) {
        die("Faltan datos obligatorios: $campo");
    }
}

// Recoger datos
$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$email = $_POST['correo'];
$password = $_POST['contrasena'];
$telefono = $_POST['telefono'] ?? null;
$nombreInstitucion = trim($_POST['institucion']);
$codigoTipo = $_POST['tipo'];

// Verificar si ya existe un usuario con ese email
$stmt = $conn->prepare("SELECT email FROM usuariosgti WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    die("Correo ya registrado");
}
$stmt->close();

// Buscar o insertar institución
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

// Generar token
$token = uniqid();
$validez = date('Y-m-d H:i:s', strtotime('+1 hour'));

// Insertar usuario GTI
$stmt = $conn->prepare("INSERT INTO usuariosgti (email, nombre, apellidos, contraseña, codigoInstitucion, telefono, token, validez_token) VALUES (?, ?, ?, SHA2(?, 256), ?, ?, ?, ?)");
$stmt->bind_param("ssssssss", $email, $nombre, $apellidos, $password, $codigoInstitucion, $telefono, $token, $validez);
$stmt->execute();
if ($stmt->affected_rows === 0) {
    die("Error al insertar usuario: " . $stmt->error);
}
$idGTI = $stmt->insert_id;
$stmt->close();
$conn->close(); // Cerrar GTI

// Enviar correo de activación con PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
require_once 'includes/PHPMailer.php';
require_once 'includes/SMTP.php';

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.ethereal.email';
$mail->SMTPAuth = true;
$mail->Username = 'bulah.kertzmann87@ethereal.email';
$mail->Password = 'nfze9HdZxryNM5Cs1H';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->setFrom('registro@gti.com', 'GTI');
$mail->addAddress($email);
$mail->isHTML(true);

$href = 'http://localhost/proa/app-gti/login.php?token=' . $token;
$mail->Subject = 'Confirma tu registro';
$mail->Body = "Hola <b>$nombre $apellidos</b>,<br>Por favor confirma tu registro: <a href='$href'>$href</a>";
$mail->AltBody = "Hola $nombre $apellidos, confirma tu registro: $href";
$mail->send();

// Conectar con PROA para crear usuarios simulados
require_once '../../env/proa.inc';
if (!isset($conn)) die("Conexión PROA no disponible");

$nombres = ['Lucía', 'Mateo', 'Sofía', 'Hugo', 'Martina', 'Pablo', 'Valeria', 'Leo', 'Daniela', 'Javier'];
$apellidos = ['García', 'Martínez', 'López', 'Sánchez', 'Pérez', 'Gómez', 'Rodríguez', 'Fernández', 'Ruiz', 'Moreno'];

$roles = ['alumno', 'profesor', 'pas'];
foreach ($roles as $rol) {
    $nombre = $nombres[array_rand($nombres)];
    $apellido1 = $apellidos[array_rand($apellidos)];
    $apellido2 = $apellidos[array_rand($apellidos)];
    while ($apellido2 === $apellido1) {
        $apellido2 = $apellidos[array_rand($apellidos)];
    }
    $apellidosConcat = "$apellido1 $apellido2";
    $parte1 = sprintf('%02d', rand(1, 99));
    $parte2 = sprintf('%07d', rand(1000000, 9999999));
    $dni = "$parte1-$parte2";
    $contrasenaPlana = $parte2;
    $inicial = strtolower(substr($nombre, 0, 1));
    $email = strtolower($inicial . '.' . substr($apellido1, 0, 3) . substr($apellido2, 0, 3)) . '@institucion.es';

    $stmt = $conn->prepare("INSERT INTO personas (idUsuariosGTI, email, nombre, apellidos, contraseña, dni) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssss", $idGTI, $email, $nombre, $apellidosConcat, $contrasenaPlana, $dni);
    if (!$stmt->execute()) {
        die("Error al insertar persona ($rol): " . $stmt->error);
    }
    $idProa = $stmt->insert_id;
    $stmt->close();

    $stmt = $conn->prepare("SELECT idRol FROM roles WHERE nombreRol = ?");
    $stmt->bind_param("s", $rol);
    $stmt->execute();
    $stmt->bind_result($idRol);
    if (!$stmt->fetch()) {
        $stmt->close();
        die("No se encontró el rol '$rol'");
    }
    $stmt->close();

    $stmt = $conn->prepare("INSERT INTO personarol (idUsuariosPROA, idRol) VALUES (?, ?)");
    $stmt->bind_param("ii", $idProa, $idRol);
    if (!$stmt->execute()) {
        die("Error al insertar rol ($rol): " . $stmt->error);
    }
    $stmt->close();
}
$conn->close();
echo "OK";
?>
