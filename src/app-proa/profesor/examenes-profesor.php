<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Asignatura Profesor</title>
  <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/header-proa.css">
    <link rel="stylesheet" href="../css/mini-header.css">
  <link rel="stylesheet" href="../css/submenu-asignatura.css">
    <!-- <link rel="stylesheet" href="css/dropdown-grupo.css"> -->
  <link rel="stylesheet" href="css/examenes-profesor.css">
  <script src="../js/header-proa.js" defer></script>
    <script src="../js/mini-header.js" defer></script>
  <script src="../js/asignaturas.js" defer></script>
  <script src="js/examenes-profesor.js" defer></script>
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

<main class="contenido-wrapper"> <!-- Contenedor principal del contenido -->

    <!-- Contenido general en horizontal: submenú a la izquierda + contenido a la derecha -->
    <div class="contenido-principal">

        <!-- Área lateral para el submenú (se rellena dinámicamente por JS) -->
        <aside id="submenu" class="submenu">
            <?php include $rutaBase . 'includes/submenu-asignaturas.inc'; ?>
        </aside>

        <!-- Zona principal de contenido relacionada con la asignatura seleccionada -->
        <div class="contenido-asignatura">

            <section class="panel-contenido fondoPanel">
                <?php
                $migas = [
                    ['label' => 'Asignaturas', 'url' => 'index.php'],
                    ['label' => 'Página Inicial de la Asignatura', 'url' => 'asignatura-profesor.php'],
                    ['label' => 'Exámenes de la Asignatura']
                ];
                include '../includes/migas-de-pan.inc';
                ?>
                <div class="contenedor-btn-crear">
                    <button class="btn-oscuros" id="btn-crear" onclick="redireccionarPagina()">Crear examen</button>
                </div>
            </section>

        </div>
  </div> <!-- Fin del contenedor contenido principal -->
</main>

</body>
</html>
