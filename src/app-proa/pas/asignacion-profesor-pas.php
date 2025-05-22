<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asignación de Profesores</title>
    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/header-proa.css">
    <link rel="stylesheet" href="../css/submenu-asignatura.css">
    <link rel="stylesheet" href="css/asignacion.css">
    <script src="../js/header-proa.js" defer></script>
    <script src="js/panel-pas.js" defer></script>
    <script src="js/asignar-profesor.js" defer></script>
</head>
<body class="vista-pas">

<?php
$rutaBase = '../';
include $rutaBase . 'includes/header-proa.inc';;
?>

<main class="contenido-wrapper">
    <div class="contenido-principal">
        <aside id="submenu" class="submenu"></aside>

        <div class="container">
            <a href="#" id="btn-volver" class="volver-enlace">← Volver</a>

            <section class="contenido-asignatura fondoPanel">
                <h2 id="titulo-asignacion">Asignación Profesores</h2>

                <div class="bloque-listas-asignacion">
                    <div class="columna">
                        <div class="titulo-columna">
                            <h3>Profesores disponibles</h3>
                            <div class="buscador">
                                <div class="input-con-icono">
                                    <input type="text" class="input-base" id="input-buscar-profesor" placeholder="Buscar profesor...">
                                    <img src="../icons/search.svg" class="icono-buscador" alt="Buscar">
                                </div>
                            </div>
                            <p id="mensaje-sin-resultados" class="mensaje-auxiliar" style="display: none;">No se encontraron profesores con ese nombre.</p>
                            <ul id="lista-profesor-disponibles"></ul>
                        </div>
                    </div>

                    <div class="columna">
                        <div class="titulo-columna">
                            <h3>Profesores asignados</h3>
                            <ul id="lista-profesor-nuevos"></ul>
                            <button id="btn-confirmar" class="btn">Confirmar asignación</button>
                        </div>
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
