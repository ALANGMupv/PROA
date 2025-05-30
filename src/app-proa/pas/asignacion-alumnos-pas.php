<!DOCTYPE html>

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Asignación de Alumnos</title>
    <!-- Icono pestaña del navegador -->
    <link rel="icon" href="../icons/gorritoAzul.svg" type="image/svg+xml">

    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/header-proa.css">
    <link rel="stylesheet" href="../css/mini-header.css">
    <link rel="stylesheet" href="../css/submenu-asignatura.css">
    <link rel="stylesheet" href="css/asignacion.css">

    <?php
    if (!isset($_SESSION['asignaturaSeleccionada'])) {
        echo "<script>window.location.href = 'asignaturas.php';</script>";
        exit;
    }
    $datos = $_SESSION['asignaturaSeleccionada'];
    ?>
    <script>
        const datos = <?php echo json_encode($datos); ?>;
    </script>

    <script src="../js/header-proa.js" defer></script>
    <script src="../js/mini-header.js" defer></script>
    <script src="js/panel-pas.js" defer></script>
    <script src="js/asignar-alumnos.js" defer></script>
</head>
<body class="vista-pas">

<?php
$rutaBase = '../';
include $rutaBase . 'includes/header-proa.inc';;
include $rutaBase . 'includes/mini-header-proa.inc';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>

<main class="contenido-wrapper">
    <div class="contenido-principal">

        <!-- Submenú lateral izquierdo para el PAS (se carga dinámicamente vía JS) -->
        <aside id="submenu" class="submenu">
            <?php include $rutaBase . 'includes/submenu-asignaturasPAS.inc'; ?>
        </aside>

        <div class="container">

            <section class="contenido-asignatura fondoPanel">
                <?php
                $migas = [
                    ['label' => 'Asignaturas', 'url' => 'asignaturas.php'],
                    ['label' => 'Ficha asignatura', 'url' => 'ficha-asignatura-pas.php'],
                    ['label' => 'Asignar alumnos']
                ];
                include 'migasdepan.php';
                ?>

                <h2 id="titulo-asignacion">Asignación Alumnos</h2>

                <div class="bloque-listas-asignacion">
                    <div class="columna">
                        <h3>Alumnos disponibles</h3>
                        <input type="text" id="input-buscar-disponibles" class="input-base" placeholder="Buscar alumno...">
                        <ul id="lista-disponibles"></ul>
                        <p id="mensaje-sin-resultados" class="mensaje-auxiliar" style="display: none;">No se encontraron alumnos con ese nombre.</p>
                    </div>
                    <div class="columna">
                        <h3>Alumnos asignados</h3>
                        <ul id="lista-asignados"></ul>
                        <button id="btn-confirmar" class="btn">Confirmar cambios</button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</main>
<div id="notificacion" class="notificacion" style="display:none;"></div>
<dialog id="dialog-cambios" class="dialog-confirmacion">
    <p>Tienes cambios sin guardar. ¿Deseas salir sin guardar?</p>
    <div class="dialog-acciones">
        <button id="cancelar-dialogo" class="btn-oscuros-secundario">Cancelar</button>
        <button id="confirmar-salida" class="btn-oscuros">Salir sin guardar</button>
    </div>
</dialog>
</body>
</html>
