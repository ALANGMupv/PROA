<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Inicio Alumno</title>
  <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/header-proa.css">
  <link rel="stylesheet" href="../css/submenu-asignatura.css">
  <script src="../js/header-proa.js" defer></script>
  <script src="js/dropdown-asignaturas.js" defer></script>
  <script src="js/asignatura-alumno.js" defer></script>
</head>
<body>

<?php
$rutaBase = '../';
include $rutaBase . 'includes/header-proa.inc';;
?>

<!-- Contenedor principal de toda la página (estructura vertical) -->
<main class="contenido-wrapper">

  <!-- Contenido general en horizontal: submenú a la izquierda + contenido a la derecha -->
  <div class="contenido-principal">

    <!-- Área lateral para el submenú (se rellena dinámicamente por JS) -->
    <aside id="submenu" class="submenu"></aside>

    <!-- Zona principal de contenido relacionada con la asignatura seleccionada -->
    <div class="contenido-asignatura">

      <!-- Cabecera superior del contenido (zona fija arriba del panel derecho) -->
      <!-- Aquí va el dropdown para cambiar de asignatura -->
      <div class="cabecera-dropdown-fija">
        <div class="input-con-icono">

          <!-- Dropdown con las asignaturas disponibles (relleno dinámicamente con JS) -->
          <select id="dropdown-asignaturas" class="input-base seleccionador-dropdown"></select>
          <img src="../icons/dropdownAsignaturas.svg" alt="Flecha" class="icono-dropdown">
        </div>
      </div>

      <!-- Contenedor del contenido que se muestra según la opción seleccionada en el submenú -->
      <section class="panel-contenido fondoPanel">
        <p>
          Selecciona una opción del submenú lateral para ver los contenidos de esta asignatura.
        </p>
      </section>
    </div>
  </div>
</main>

</body>
</html>