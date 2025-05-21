<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
           content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Cambiar Contraseña</title>
    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/login.css">
    <script src="js/header.js" defer></script>
    <script src="js/nuevaContrasenya.js" defer></script>
</head>
<body>

<!-- Include header no logueado -> solo acceden los no logueados -->
<?php
$rutaBase = '';
include 'includes/headerNoLogueado.inc';
?>
<!-- Cerramos sección header -->

<!-- Formulario de cambiar contraseña -->
<main>
<section class="login">
    <form class="formulario-login">
        <h2>Establecer nueva contraseña</h2>

        <p class="parrafo-terciario">
            Para proteger tu cuenta, elige una nueva contraseña que no hayas utilizado antes. Debe contener al menos 6 caracteres e incluir números o símbolos. Memorízala o guárdala de forma segura.
        </p>

        <div class="campo">
            <label for="nueva">Nueva contraseña *</label>
            <input type="password" id="nueva" class="input-base" required>
        </div>

        <div class="campo">
            <label for="confirmar">Confirmar contraseña *</label>
            <input type="password" id="confirmar" class="input-base" required>
        </div>

        <button type="submit" class="btn">Guardar nueva contraseña</button>

        <p class="texto-secundario">
            ¿No era tu cuenta?
            <a href="login.php" class="enlace-secundario">Volver al login</a>
        </p>
    </form>
</section>
</main>

<!-- Footer-->
<?php include $rutaBase . 'includes/footer.inc'; ?>
<!-- Fin del footer-->

</body>
</html>