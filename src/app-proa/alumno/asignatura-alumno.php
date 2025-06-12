<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Inicio Alumno</title>
    <!-- Icono pestaña del navegador -->
    <link rel="icon" href="../icons/gorritoAzul.svg" type="image/svg+xml">

  <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/header-proa.css">
    <link rel="stylesheet" href="../css/mini-header.css">
  <link rel="stylesheet" href="../css/submenu-asignatura.css">
  <script src="../js/header-proa.js" defer></script>
    <script src="../js/mini-header.js" defer></script>
    <script src="../js/asignaturas.js" defer></script>
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
      <section class="panel-contenido fondoPanel">
          <?php
          $migas = [
              ['label' => 'Asignaturas', 'url' => 'index.php'],
              ['label' => 'Página Inicial de la Asignatura']
          ];
          include '../includes/migas-de-pan.inc';
          ?>
        <p>
          Selecciona una opción del submenú lateral para ver los contenidos de esta asignatura.
        </p>
      </section>
    </div>
  </div>
</main>

</body>
</html>