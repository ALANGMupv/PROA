<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>GTI</title>
    <!-- Icono pestaña del navegador -->
    <link rel="icon" href="app-gti/icons/iconGTI.png" type="image/svg+xml">

    <link rel="stylesheet" href="app-gti/css/estilos.css">
    <link rel="stylesheet" href="app-gti/css/header.css">
    <link rel="stylesheet" href="app-gti/css/footer.css">
    <link rel="stylesheet" href="app-gti/css/landing.css">

    <!-- Scripts para insertar el header dinámicamente y gestionar el CTA -->
    <script src="app-gti/js/header.js" defer></script>
    <script src="app-gti/js/landing.js" defer></script>
</head>
<body>

<!-- Include header no logueado -> cambiar lógica según esté logueado cuando se implemente el login.php -->
<?php
$rutaBase = 'app-gti/';
include $rutaBase . 'includes/headerNoLogueado.inc';
?>
<!-- Cerramos sección header -->


<!-- SECCIÓN HERO / PRINCIPAL -->
<section class="contenedor">
    <div class="contenido">
        <h1>Innovación en Tecnología Educativa</h1>
        <p class="parrafo-principal">
            Ayudamos a instituciones educativas a gestionar sus contenidos a través de módulos intuitivos y fáciles de usar que garantizan una conexión efectiva entre docentes y alumnos.
        </p>
        <a id="cta" class="btnCTA" href="#">Conoce nuestra solución</a>
    </div>

    <!-- Flecha scroll -->
    <a href="#quienes-somos" class="scroll-flecha" aria-label="Ir a la siguiente sección">
        <img src="app-gti/icons/flechaLanding.svg" alt="Desplazar hacia abajo">
    </a>
</section>

<!-- SECCIÓN DIFERENCIADORA -->
<section class="seccion-diferenciadora" id="quienes-somos">
    <div class="contenedor-diferenciador">
        <div class="texto-diferenciador">
            <h2>¿Quiénes somos?</h2>
            <p class="parrafo-secundario">
                GTI es una empresa emergente especializada en el desarrollo de productos digitales para el sector educativo. Nuestro enfoque está en crear herramientas modernas, intuitivas y accesibles que respondan a las necesidades reales de las instituciones académicas.
            </p>
            <p class="parrafo-secundario">
                Actualmente nos encontramos en fase de lanzamiento de nuestro primer producto, PROA, una interfaz de gestión diseñada para mejorar la organización y comunicación interna en entornos educativos.
            </p>
            <p class="parrafo-secundario">
                Nuestro compromiso es ofrecer soluciones funcionales y efectivas, priorizando la experiencia de usuario y la simplicidad en cada módulo que desarrollamos. GTI nace con la misión de transformar la gestión educativa a través de la tecnología.
            </p>
        </div>
        <div class="imagen-diferenciador">
            <img src="app-gti/img/imagenBrainGTI.png" alt="Personas trabajando en una mesa">
        </div>
    </div>
</section>

<!-- Footer-->
<?php include $rutaBase . 'includes/footer.inc'; ?>
<!-- Fin del footer-->

</body>
</html>
