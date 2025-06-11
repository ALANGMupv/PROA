<!-- Submenú de asignatura (único para alumno y profesor) -->
<?php
$usuario = $_SESSION['usuario'] ?? null;
$rol = $usuario['rol'] ?? '';
$esAlumno = $rol === 'alumno';
$esProfesor = $rol === 'profesor';
?>

<!-- Dropdown en lugar del título -->
<div class="cabecera-asignatura">
    <?php include $rutaBase . 'includes/dropdown-asignaturas.inc'; ?>
</div>

<nav class="menu colapsable" id="submenu-toggle">
    <button class="submenu-toggle-btn">
        Asignatura <span class="flecha">&#9662;</span>
    </button>
    <div class="submenu-items">
        <a href="#" class="submenu-item desactivado"><span>Horario</span></a>
        <a href="#" class="submenu-item desactivado"><span>Guía Docente</span></a>
        <a href="#" class="submenu-item desactivado"><span>Recursos</span></a>
        <a href="#" class="submenu-item desactivado"><span>Tareas</span></a>

        <?php if ($esAlumno): ?>
            <a href="examenes-alumno.php" class="submenu-item"><span>Exámenes</span></a>
        <?php elseif ($esProfesor): ?>
            <a href="examenes-profesor.php" class="submenu-item"><span>Exámenes</span></a>
        <?php endif; ?>

        <a href="#" class="submenu-item desactivado"><span>Calificaciones</span></a>
        <a href="#" class="submenu-item desactivado"><span>Ranking</span></a>
        <a href="#" class="submenu-item desactivado"><span>Foros</span></a>
        <a href="#" class="submenu-item desactivado"><span>Clases en vivo</span></a>
    </div>

</nav>
