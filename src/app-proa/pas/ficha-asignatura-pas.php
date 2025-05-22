<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ficha Asignatura PAS</title>
    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/header-proa.css">
    <link rel="stylesheet" href="../css/submenu-asignatura.css">
    <link rel="stylesheet" href="css/ficha-asignatura-pas.css">
    <script src="../js/header-proa.js" defer></script>
    <script src="js/panel-pas.js" defer></script>
    <script src="js/ficha-asignatura-pas.js" defer></script>
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

                <h2 id="nombre-asignatura">Nombre asignatura</h2>

                <div class="bloque-datos-asignatura">
                    <div class="datos">
                        <h4>Datos de la asignatura:</h4>
                    </div>
                    <div class="informacion">
                        <p><strong>Código:</strong> <span id="codigo-asignatura"></span></p>
                        <p><strong>Departamento:</strong> <span id="departamento-asignatura"></span></p>
                        <p><strong>Curso:</strong> <span id="curso-asignatura"></span></p>
                        <p><strong>Semestre:</strong> <span id="semestre-asignatura"></span></p>
                        <p><strong>Año:</strong> <span id="anyo-asignatura"></span></p>
                        <p><strong>Créditos:</strong> <span id="creditos-asignatura"></span> cts</p>
                    </div>

                </div>

                <div class="bloque-listas-asignacion">
                    <div class="columna">
                        <div class="titulo-columna">
                            <h3>Alumnos asignados</h3>
                            <div class="buscador" id="buscador-alumno">
                                <div class="input-con-icono">
                                    <input type="text" class="input-base" id="input-buscar-alumno" placeholder="Buscar alumno...">
                                    <img src="../icons/search.svg" class="icono-buscador" alt="Buscar">
                                </div>
                                <ul id="resultados-alumnos"></ul>
                            </div>
                            <ul id="lista-alumnos"></ul>
                            <button id="btn-ir-asignacion-alumnos" class="btn-secundario">
                                <img src="../icons/anyadir-redondo.svg" alt="Agregar" class="icono-azul">Añadir más alumnos
                            </button>
                        </div>

                    </div>
                    <div class="columna">
                        <div class="titulo-columna">
                            <h3>Profesores asignados</h3>
                            <div class="buscador" id="buscador-profesor">
                                <div class="input-con-icono">
                                    <input type="text" class="input-base" id="input-buscar-profesor" placeholder="Buscar profesor...">
                                    <img src="../icons/search.svg" class="icono-buscador" alt="Buscar">
                                </div>
                                <ul id="resultados-profesor"></ul>
                            </div>
                            <ul id="lista-profesores"></ul>
                            <button id="btn-ir-asignacion-profesores" class="btn-secundario">
                                <img src="../icons/anyadir-redondo.svg" alt="Agregar" class="icono-azul">Añadir más profesores</button>

                        </div>
                    </div>
                </div>
            </section>
        </div>

    </div>
</main>
<div id="notificacion" class="notificacion" style="display: none;"></div>

</body>
</html>