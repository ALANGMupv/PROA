<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Recuperar Contraseña</title>
    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/login.css">
    <script src="js/header.js" defer></script>
    <script src="js/olvidoContrasenya.js" defer></script>
</head>
<body>

<!-- Include header no logueado -> solo acceden los no logueados -->
<?php
$rutaBase = '';
include 'includes/headerNoLogueado.inc';
?>
<!-- Cerramos sección header -->

<!-- Formulario de recuperar contraseña -->
<main>
<section class="login">
    <form class="formulario-login">
        <h2>Recuperar contraseña</h2>

        <p class="parrafo-terciario">
            Ingresa tu correo institucional y te guiaremos para cambiar tu contraseña.
        </p>

        <div class="campo">
            <label for="correo">Correo de la institución *</label>
            <input type="email" id="correo" class="input-base" required>
        </div>

        <button type="submit" class="btn">Enviar enlace de recuperación</button>

        <p class="texto-secundario">
            ¿Ya recuerdas tu contraseña?
            <a href="login.php" class="enlace-secundario">Iniciar sesión</a>
        </p>
    </form>
</section>
</main>

<!-- Footer-->
<?php include $rutaBase . 'includes/footer.inc'; ?>
<!-- Fin del footer-->

</body>
</html>