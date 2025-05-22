<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Entregas Examen Profesor</title>
    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/header-proa.css">
    <link rel="stylesheet" href="../css/submenu-asignatura.css">
    <link rel="stylesheet" href="css/dropdown-grupo.css">
    <link rel="stylesheet" href="css/entregas-profesor.css">
    <script src="../js/header-proa.js" defer></script>
    <script src="js/asignatura-profesor.js" defer></script>
    <script src="js/dropdown-asignaturas.js" defer></script>
    <script src="js/entregas-profesor.js" defer></script>

</head>
<body>

<?php
$rutaBase = '../';
include $rutaBase . 'includes/header-proa.inc';;
?>

<main class="contenido-wrapper"> <!-- Contenedor principal del contenido -->

    <div class="contenido-principal"> <!-- Contenedor que agrupa el submenú y el contenido principal -->
        <aside id="submenu" class="submenu"></aside> <!-- Submenú lateral (se rellena dinámicamente) -->
        <div class="contenido-asignatura"> <!-- Área principal donde se muestra el contenido relacionado con la asignatura -->
            <div class="cabecera-dropdown-fija-profesor"> <!-- Barra superior con filtros desplegables para el profesor -->

                <!-- Aquí se inyecta dinámicamente el botón del submenú en responsive -->

                <div class="contenedor-dropdowns"> <!-- Contenedor agrupador de los dos dropdowns -->
                    <!-- Dropdown para seleccionar grupo (PL1, PL2...) -->
                    <div class="input-con-icono grupo-dropdown">
                        <select id="dropdown-grupo" class="input-base seleccionador-dropdown">
                            <option value="todos">Todos</option>
                            <option value="pl1">Grupo PL1</option>
                            <option value="pl2">Grupo PL2</option>
                        </select>
                        <img src="../icons/dropdownAsignaturasAzul.svg" alt="Flecha" class="icono-dropdown">
                    </div>

                    <!-- Dropdown para seleccionar asignatura (rellenado dinámicamente con JS) -->
                    <div class="input-con-icono asignatura-dropdown">
                        <select id="dropdown-asignaturas" class="input-base seleccionador-dropdown"></select>
                        <img src="../icons/dropdownAsignaturas.svg" alt="Flecha" class="icono-dropdown">
                    </div>
                </div>
            </div>

            <a href="examenes-profesor.php" id="btn-volver" class="volver-enlace">← Volver</a>



            <section class="panel-contenido fondoPanel">
            <section class="titulo">
                <h1>Entregas del Cuestionario 1</h1>
            </section>

            <div class="contenedor-entregas">
                <!-- Lista de alumnos -->
                <aside class="lista-alumnos">
                    <div class="input-con-icono input-base">
                        <input type="text" class="input-base input-textoBusqueda" id="filtroTexto" placeholder="Nombre alumno..." />
                        <img src="../icons/search.svg" class="icono-buscador" alt="Buscar" />
                    </div>
                    <div id="lista-alumnos"></div>
                </aside>

                <!-- Detalle de la entrega -->
                <section class="entrega-estilo-alumno fondoPanel" id="detalle-entrega">
                    <p>Selecciona un alumno para ver su entrega.</p>
                </section>
            </div>
        </section>
        </div>
    </div>
</main>
</body>
</html>
