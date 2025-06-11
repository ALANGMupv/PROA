<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Exámenes Alumno</title>
    <!-- Icono pestaña del navegador -->
    <link rel="icon" href="../icons/gorritoAzul.svg" type="image/svg+xml">

    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/header-proa.css">
    <link rel="stylesheet" href="../css/mini-header.css">
    <link rel="stylesheet" href="../css/submenu-asignatura.css">
    <link rel="stylesheet" href="css/examenes-alumno.css">
    <script src="../js/header-proa.js" defer></script>
    <script src="../js/mini-header.js" defer></script>
    <script src="../js/asignaturas.js" defer></script>
    <script src="js/examenes-alumno.js" defer></script>
</head>
<body>

<?php
$rutaBase = '../';
include $rutaBase . 'includes/mini-header-proa.inc';
include $rutaBase . 'includes/header-proa.inc';;
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>

<!-- Contenedor principal de toda la página (estructura vertical) -->
<main class="contenido-wrapper">
    <!-- Contenido general en horizontal: submenú a la izquierda + contenido a la derecha -->
    <div class="contenido-principal">

        <!-- Área lateral para el submenú (se rellena dinámicamente por JS) -->
        <aside id="submenu" class="submenu">
            <?php include $rutaBase . 'includes/submenu-asignaturas.inc'; ?>
        </aside>

        <!-- Zona principal de contenido relacionada con la asignatura seleccionada -->
        <div class="contenido-asignatura">

            <!-- Contenedor del contenido que se muestra según la opción seleccionada en el submenú -->
            <section class="fondoPanel">
                <?php
                $migas = [
                    ['label' => 'Exámenes de la asignatura']
                ];
                include '../includes/migas-de-pan.inc';
                ?>

            </section>
        </div>
    </div>
</main>

<?php
$asignaturaSeleccionada = $_SESSION['asignaturaSeleccionada'] ?? null;
?>
<!-- Este div se inserta aquí para que JS pueda acceder -->
<div id="asignaturaSeleccionada" data-asignatura='<?php echo json_encode($asignaturaSeleccionada); ?>'></div>

</body>
</html>