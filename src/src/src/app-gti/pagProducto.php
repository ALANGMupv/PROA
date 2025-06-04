<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Descubre PROA</title>
    <!-- Icono pestaña del navegador -->
    <link rel="icon" href="icons/gti_morado.png" type="image/svg+xml">

    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/pagProducto.css">
    <script src="js/header.js" defer></script>
</head>
<body>

<!-- Include header no logueado -> cambiar lógica según esté logueado cuando se implemente el login.php -->
<?php
session_start();
$rutaBase = '';
if (isset($_SESSION['usuario'])) {
    include $rutaBase . 'includes/headerLogueado.inc';
} else {
    include $rutaBase . 'includes/headerNoLogueado.inc';
}
?>
<!-- Cerramos sección header -->

<!-- Primera sección -->
<section class="contenedor">
    <h1>Descubre PROA</h1>
    <p class="parrafo-principal">
        PROA, el campus virtual que convierte la educación universitaria en una experiencia dinámica y a medida para profesores y alumnos.
    </p>

    <div class="cta-contenedor">
        <p class="parrafo-secundario">
            Regístrate y prueba la demo
        </p>
        <a id="ctaDemo" class="btnCTA-PROA">Probar DEMO</a>
    </div>

    <!-- Flecha scroll -->
    <a href="#caracteristicas" class="scroll-flecha" aria-label="Ir a la siguiente sección">
        <img src="icons/flecha-abajoPROA.svg" alt="Desplazar hacia abajo">
    </a>
</section>

<!-- Segunda sección -->
<section class="caracteristicas-principales" id="caracteristicas">
    <h2>Características Principales</h2>
    <div class="caracteristicas-grid">
        <div class="caracteristica">
            <img src="icons/demoMultiperfil.svg" alt="Demo multiperfil">
            <h3>DEMO multiperfil</h3>
            <p class="parrafo-secundario">Prueba PROA como profesor, personal administrativo o alumno</p>
        </div>
        <div class="caracteristica">
            <img src="icons/accesoMultiplataforma.svg" alt="Acceso multiplataforma">
            <h3>Acceso multiplataforma</h3>
            <p class="parrafo-secundario">Navega por PROA desde tu móvil, tablet o portátil sin perder claridad ni funciones</p>
        </div>
        <div class="caracteristica">
            <img src="icons/interfazIntuitiva.svg" alt="Interfaz intuitiva">
            <h3>Interfaz intuitiva</h3>
            <p class="parrafo-secundario">Diseño centrado en el usuario para una experiencia fluida</p>
        </div>
    </div>
</section>

<!-- Tercera sección -->
<section class="seccion-diferenciadora">
    <div class="contenedor-diferenciador">
        <div class="texto-diferenciador">
            <h2>¿Qué hace a PROA diferente?</h2>
            <p class="parrafo-secundario">
                PROA es el primer módulo educativo desarrollado por GTI: un campus virtual diseñado específicamente para instituciones educativas, inicialmente orientado a universidades.
            </p>
            <p class="parrafo-secundario">
                En su versión mínima viable, PROA incluye funcionalidades clave como exámenes y calificaciones, tanto para el profesor como para el alumno, además de las funciones de gestión del PAS. Cada usuario accede con credenciales proporcionadas al registrarse, lo que permite asignar automáticamente su rol como alumno, profesor o PAS.
            </p>
            <p class="parrafo-secundario">
                Nuestra propuesta se diferencia por ofrecer una interfaz clara, intuitiva y centrada en la experiencia de usuario, eliminando las frustraciones comunes de las plataformas educativas tradicionales.
            </p>
            <p class="parrafo-secundario">
                Además, ofrecemos una demo funcional para que los representantes universitarios puedan explorar el producto antes de contratarlo, una práctica poco común en el sector.
            </p>
        </div>
        <div class="imagen-diferenciador">
            <img src="img/pcFondoPROA.png" alt="Vista de PROA en PC">
        </div>
    </div>
</section>

<!-- Última sección -->
<section class="seccion-cta-final">
    <div class="cta-final-contenedor">
        <div class="cta-final-texto">
            <h2>¿Listo para transformar la educación?</h2>
            <p class="parrafo-principal">
                ¿Tienes dudas o quieres saber más sobre PROA? <br> Nuestro equipo estará encantado de atenderte personalmente y resolver cualquier pregunta que tengas.
            </p>
            <p class="parrafo-principal">
                Rellena nuestro formulario de contacto y descubre cómo GTI puede ayudarte a transformar la experiencia educativa en tu centro. Sin compromiso, con transparencia y con la posibilidad de probar una demo funcional antes de decidir.
            </p>
        </div>
        <div class="cta-final-boton">
            <a href="contacto.php" class="btnPROA">Solicitar información</a>
        </div>
    </div>
</section>

<!-- Footer-->
<?php include $rutaBase . 'includes/footer.inc'; ?>
<!-- Fin del footer-->

</body>

<script>
    // Por defecto, el enlace del botón será a la página de login
    let ctaLink = 'login.php';

    // Intentamos recuperar al usuario desde la sesión (usando PHP)
    const usuario = <?php echo json_encode($_SESSION['usuario'] ?? null); ?>; // Recupera el usuario desde la sesión de PHP

    // Si el usuario existe, redirigimos el botón a la demo privada
    if (usuario) {
        ctaLink = '../app-proa/index.php'; // Ruta hacia el index de PROA
    }

    // Seleccionamos el botón con id "ctaDemo"
    const botonDemo = document.getElementById("ctaDemo");

    // Si existe el botón, le asignamos dinámicamente el enlace correspondiente
    if (botonDemo) {
        botonDemo.setAttribute("href", ctaLink);
    }
</script>

</html>
