<?php
require_once '../../env/gti.inc';
$rutaBase = '';

if (!isset($conn)) die("Conexión no disponible");

// Recogemos token de la URL
$token = $_GET['token'] ?? null;

if (!$token) {
    $mensaje = "Token no proporcionado.";
    $clase = "error";
} else {
    $stmt = $conn->prepare("SELECT idUsuariosGTI FROM usuariosgti WHERE token = ? AND validez_token >= NOW()");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $stmt->bind_result($idUsuario);

    if ($stmt->fetch()) {
        $stmt->close();

        // Actualizar estado y limpiar token
        $stmt = $conn->prepare("UPDATE usuariosgti SET estado = 1, token = NULL, validez_token = NULL WHERE idUsuariosGTI = ?");
        $stmt->bind_param("i", $idUsuario);
        $stmt->execute();
        $stmt->close();

        $mensaje = "¡Cuenta activada correctamente! Ya puedes iniciar sesión.";
        $clase = "exito";
    } else {
        $mensaje = "Token inválido o caducado. Solicita un nuevo registro.";
        $clase = "error";
    }
}
$conn->close();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Activación de cuenta</title>
    <link rel="icon" href="icons/gti_morado.png" type="image/svg+xml">
    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/validarRegistro.css">
    <script src="js/header.js" defer></script>
</head>
<body>

<?php include $rutaBase . 'includes/headerNoLogueado.inc'; ?>

<main>
    <div class="mensaje <?= $clase ?>">
        <p><?= $mensaje ?></p>
        <?php if ($clase === "exito"): ?>
            <a href="<?= $rutaBase ?>login.php">Ir al login</a>
        <?php endif; ?>
    </div>
</main>

<?php include $rutaBase . 'includes/footer.inc'; ?>

</body>
</html>
