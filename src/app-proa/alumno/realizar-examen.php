<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Realizar Examen</title>
    <link rel="icon" href="../icons/gorritoAzul.svg" type="image/svg+xml">

    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/header-proa.css">
    <link rel="stylesheet" href="../css/mini-header.css">
    <link rel="stylesheet" href="../css/submenu-asignatura.css">
    <link rel="stylesheet" href="css/pop-up.css">
    <link rel="stylesheet" href="css/realizar-examen.css">
    <script src="../js/header-proa.js" defer></script>
    <script src="../js/mini-header.js" defer></script>
    <script src="../js/asignaturas.js" defer></script>
    <script src="js/realizar-examen.js" defer></script>
</head>
<body>
<?php
$rutaBase = '../';
include $rutaBase . 'includes/mini-header-proa.inc';
include $rutaBase . 'includes/header-proa.inc';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$idExamen = $_GET['idExamen'] ?? 0;
?>
<main class="contenido-wrapper">
    <div class="contenido-principal">
        <aside id="submenu" class="submenu">
            <?php include $rutaBase . 'includes/submenu-asignaturas.inc'; ?>
        </aside>

        <div class="contenido-asignatura">
            <section class="panel-contenido fondoPanel" id="panelRealizarExamen">
                <?php
                $migas = [
                    ['label' => 'Asignaturas', 'url' => 'index.php'],
                    ['label' => 'Asignatura', 'url' => 'asignatura-alumno.php'],
                    ['label' => 'Exámenes de la Asignatura', 'url' => 'examenes-alumno.php'],
                    ['label' => 'Realizar Examen']
                ];
                include '../includes/migas-de-pan.inc';
                ?>

                <form id="formulario-examen" data-id-examen="<?= htmlspecialchars($idExamen) ?>">
                    <section class="titulo">
                        <h1 id="tituloExamen">Cargando...</h1>
                    </section>

                    <div class="mensaje-exito" id="mensajeExito" style="display: none;"></div>

                    <section class="descripcion">
                        <h2>Descripción</h2>
                        <p class="parrafo-principal" id="descripcionExamen"></p>
                        <p class="parrafo-principal fecha-limite">
                            <strong>Fecha límite para completarlo:</strong> <span id="fechaLimite"></span>
                        </p>
                    </section>

                    <hr class="separador">
                    <section class="preguntas" id="contenedorPreguntas"></section>

                    <div id="botones">
                        <button class="btn-oscuros-secundario btn-inicial" type="button" id="botonCancelar">Cancelar</button>
                        <button class="btn-oscuros btn-inicial" type="button" id="botonEnviar">Enviar</button>
                        <a href="examenes-alumno.php" class="btn-oscuros btn-atras">Atrás</a>
                    </div>

                    <!-- Popup: Confirmar envío -->
                    <div id="popup-confirmacion" class="popup">
                        <div class="contenido-popup">
                            <p class="parrafo-principal">¿Estás seguro de que deseas enviar el formulario?</p>
                            <div class="btn-popup">
                                <button id="popup-cancelar" class="btn-oscuros-secundario" type="button">Cancelar</button>
                                <button id="popup-enviar-confirmado" class="btn-oscuros" type="button">Aceptar</button>
                            </div>
                        </div>
                    </div>

                    <!-- Popup: Cancelar examen -->
                    <div id="popup-volver-cancelar" class="popup">
                        <div class="contenido-popup">
                            <p class="parrafo-principal">¿Estás seguro de que deseas salir? Se perderán los cambios no guardados.</p>
                            <div class="btn-popup">
                                <button id="popup-volver-cancelar-no" class="btn-oscuros-secundario" type="button">Cancelar</button>
                                <button id="popup-volver-cancelar-si" class="btn-oscuros" type="button">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    </div>
</main>
</body>
</html>
