<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HomePage PAS</title>
    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/header-proa.css">
    <link rel="stylesheet" href="../css/submenu-asignatura.css">
    <script src="../js/header-proa.js" defer></script>
    <script src="js/panel-pas.js" defer></script>
</head>
<body class="vista-pas">

<?php
$rutaBase = '../';
include $rutaBase . 'includes/header-proa.inc';;
?>

<div class="contenido-wrapper">
    <div class="contenido-principal">

        <!-- SUBMENÚ PAS (se inyecta dinámicamente aquí) -->
        <aside id="submenu"></aside>

        <!-- CONTENIDO DERECHO -->
        <section class="panel-contenido fondoPanel">
            <h2>Panel de Gestión</h2>
            <p>
                Bienvenido/a al panel de administración de asignaturas. Desde este espacio podrás gestionar todos los aspectos relacionados con las asignaturas del sistema.
            </p>
            <p>
                Para comenzar, utiliza el submenú lateral y accede a las secciones de creación de asignaturas, asignación de profesores y de alumnos.
            </p>
            <p>
                Asegúrate de completar cada paso para que las asignaturas estén correctamente configuradas y puedan ser consultadas por los usuarios correspondientes.
            </p>
        </section>

    </div>
</div>
</body>

</html>
