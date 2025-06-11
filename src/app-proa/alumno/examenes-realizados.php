<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Examen Realizado</title>
    <!-- Icono pestaña del navegador -->
    <link rel="icon" href="../icons/gorritoAzul.svg" type="image/svg+xml">

  <link rel="stylesheet" href="../css/estilos.css" />
    <link rel="stylesheet" href="../css/header-proa.css">
    <link rel="stylesheet" href="../css/mini-header.css">
  <link rel="stylesheet" href="../css/submenu-asignatura.css" />
  <link rel="stylesheet" href="css/realizar-examen.css" />
  <script src="../js/header-proa.js" defer></script>
    <script src="../js/mini-header.js" defer></script>
    <script src="../js/asignaturas.js" defer></script>
  <script src="js/ver-examen.js" defer></script>
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

      <!-- Contenido del examen corregido -->
      <section id="panelRealizarExamen" class="fondoPanel">
          <?php
          $migas = [
              ['label' => 'Asignaturas', 'url' => 'index.php'],
              ['label' => 'Página Inicial de la Asignatura', 'url' => 'asignatura-alumno.php'],
              ['label' => 'Exámenes de la Asignatura', 'url' => 'examenes-alumno.php'],
              ['label' => 'Exámenes Realizados']
          ];
          include '../includes/migas-de-pan.inc';
          ?>

          <form id="formulario-examen">
          <section class="titulo">
            <h1>Cuestionario 1</h1>
          </section>

          <div id="mensajeExito" class="mensaje-exito"></div>

          <section class="preguntas" id="contenedorPreguntas"></section>
        </form>
      </section>

    </div>
  </div>
</main>

</body>
</html>
