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

// Verificar si ya existe un usuario con ese email
$stmt = $conn->prepare("SELECT email FROM usuariosgti WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    die(" Correo ya registrado");
}
$stmt->close();

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

// Asignación de creedenciales de PROA para los nuevos usuarios de GTI

// Obtener el ID del nuevo usuario GTI
$idGTI = $conn->insert_id;
$conn->close(); // Cerramos la conexión con GTI

// Conectamos con la BBDD PROA
require_once '../../env/proa.inc';
if (!isset($conn)) die("Conexión a PROA no disponible");

// Listas de nombres y apellidos para generar combinaciones
$nombres = ['Lucía', 'Mateo', 'Sofía', 'Hugo', 'Martina', 'Pablo', 'Valeria', 'Leo', 'Daniela', 'Javier'];
$apellidos = ['García', 'Martínez', 'López', 'Sánchez', 'Pérez', 'Gómez', 'Rodríguez', 'Fernández', 'Ruiz', 'Moreno'];


// Roles a crear
$roles = ['alumno', 'profesor', 'pas'];

foreach ($roles as $rol) {
    // Elegir nombre y dos apellidos aleatorios
    $nombre = $nombres[array_rand($nombres)];
    $apellido1 = $apellidos[array_rand($apellidos)];
    $apellido2 = $apellidos[array_rand($apellidos)];
    while ($apellido2 === $apellido1) {
        $apellido2 = $apellidos[array_rand($apellidos)];
    }
    $apellidosConcat = "$apellido1 $apellido2";

    // Generar DNI tipo NN-NNNNNNN
    $dni = sprintf('%02d-%07d', rand(1, 99), rand(1000000, 9999999));

    // Contraseña de 6 dígitos aleatorios
    $contrasenaPlana = strval(rand(100000, 999999));
    $contrasenaHash = hash('sha256', $contrasenaPlana);

    // Generar email tipo i.apepel@institucion.es
    $inicial = strtolower(substr($nombre, 0, 1));
    $email = strtolower($inicial . '.' . substr($apellido1, 0, 3) . substr($apellido2, 0, 3)) . '@institucion.es';

    // Insertar en personas
    $stmt = $conn->prepare("INSERT INTO personas (idUsuariosGTI, email, nombre, apellidos, contraseña, dni) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssss", $idGTI, $email, $nombre, $apellidosConcat, $contrasenaHash, $dni);
    if (!$stmt->execute()) {
        die("Error al insertar persona ($rol): " . $stmt->error);
    }
    $idProa = $stmt->insert_id;
    $stmt->close();

    // Obtener idRol
    $stmt = $conn->prepare("SELECT idRol FROM roles WHERE nombreRol = ?");
    $stmt->bind_param("s", $rol);
    $stmt->execute();
    $stmt->bind_result($idRol);
    if (!$stmt->fetch()) {
        $stmt->close();
        die("No se encontró el rol '$rol'");
    }
    $stmt->close();

    // Insertar en personarol
    $stmt = $conn->prepare("INSERT INTO personarol (idUsuariosPROA, idRol) VALUES (?, ?)");
    $stmt->bind_param("ii", $idProa, $idRol);
    if (!$stmt->execute()) {
        die("Error al insertar rol ($rol): " . $stmt->error);
    }
    $stmt->close();
}

$conn->close();
?>
