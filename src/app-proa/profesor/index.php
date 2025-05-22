<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Inicio Profesor</title>
    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/header-proa.css">
    <link rel="stylesheet" href="../css/inicio-asignaturas.css">
    <script src="../js/header-proa.js" defer></script>
    <script src="js/inicio-profesor.js" defer></script>
</head>
<body>

<?php
$rutaBase = '../';
include $rutaBase . 'includes/header-proa.inc';;
?>

<main class="contenido-principal">

    <!-- Panel de asignaturas -->
    <section class="panel-asignaturas">

        <div class="bloque-cabecera-asignaturas">
            <div class="cabecera-titulo">
                <h3 class="subtitulo-panel titulo-azul asignaturas">Tus asignaturas</h3>
            </div>

            <!-- Filtros -->
            <div class="filtros-asignaturas">

                <!-- Fila 1 -->
                <div class="fila-filtros fila-superior">
                    <div class="input-con-icono">
                        <input type="text" class="input-base input-textoBusqueda" id="filtroTexto" placeholder="Buscar por nombre / código / número ..." />
                        <img src="../icons/search.svg" class="icono-buscador" alt="Buscar" />
                    </div>

                    <button class="boton-favoritas" id="btnFavoritas">
                        <img src="../icons/favoritos.svg" alt="Favoritas" class="icono-azul" width="16" height="16" />
                        Favoritas
                    </button>
                </div>

                <!-- Fila 2 -->
                <div class="fila-filtros fila-selects">
                    <div class="contenedor-select">
                        <select id="filtroAnyo" class="input-base seleccionador-dropdown">
                            <option value="">Todos los años</option>
                            <option value="2024">2024/25</option>
                            <option value="2023">2023/24</option>
                        </select>
                    </div>
                    <div class="contenedor-select">
                        <select id="filtroCurso" class="input-base seleccionador-dropdown">
                            <option value="">Todos los cursos</option>
                            <option value="1">1º curso</option>
                            <option value="2">2º curso</option>
                            <option value="3">3º curso</option>
                            <option value="4">4º curso</option>
                        </select>
                    </div>
                    <div class="contenedor-select">
                        <select id="filtroSemestre" class="input-base seleccionador-dropdown">
                            <option value="">Todos los semestres</option>
                            <option value="1">1º semestre</option>
                            <option value="2">2º semestre</option>
                        </select>
                    </div>
                    <div class="contenedor-select">
                        <select id="filtroRol" class="input-base seleccionador-dropdown">
                            <option value="todos">Todas las responsabilidades</option>
                            <option value="responsable">Responsable</option>
                            <option value="colaborador">Colaborador</option>
                        </select>
                    </div>
                </div>
            </div>

        </div>

        <div id="lista-asignaturas" class="lista-asignaturas"></div>
        <p id="mensaje-sin-favoritas" class="mensaje-vacio" style="display: none;">
            Debes seleccionar una asignatura favorita primero. <br> Presiona el icono de favoritos a la derecha de cada asignatura para guardarla como favorita.
        </p>

    </section>

    <!-- Panel de notificaciones -->
    <aside class="panel-notificaciones">
        <!-- Toggle siempre visible -->
        <div class="toggle-notificaciones">
            <label>
                <input type="checkbox" id="mostrarNotificaciones" checked />
                Mostrar anuncios
            </label>
        </div>

        <!-- Contenido que desaparecerá -->
        <div id="contenido-notificaciones">
            <h3 class="subtitulo-panel titulo-azul">Anuncios</h3>
            <ul id="lista-notificaciones" class="lista-notificaciones"></ul>
        </div>
    </aside>


</main>

</body>
</html>
