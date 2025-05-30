<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Si no hay sesión GTI ni sesión PROA, salimos
if (!isset($_SESSION['usuarioGTI']) && !isset($_SESSION['usuario'])) {
    echo "<!-- No hay sesión activa -->";
    return;
}

// Detectar la ruta del archivo de conexión
$rutaEnv = file_exists('../../env/proa.inc') ? '../../env/proa.inc' : '../../../env/proa.inc';
require_once $rutaEnv;

// Obtener el ID de usuario GTI (prioriza GTI si está disponible)
$idUsuarioGTI = $_SESSION['usuarioGTI']['id'] ?? $_SESSION['usuario']['id'] ?? null;

// Nombre completo desde sesión GTI si existe
if (isset($_SESSION['usuarioGTI'])) {
    $nombreGTI = $_SESSION['usuarioGTI']['nombre'] ?? '';
    $apellidoGTI = $_SESSION['usuarioGTI']['apellidos'] ?? '';
} else {
    $nombreGTI = $_SESSION['usuario']['nombre'] ?? '';
    $apellidoGTI = $_SESSION['usuario']['apellidos'] ?? '';
}
$nombreCompletoGTI = trim($nombreGTI . ' ' . $apellidoGTI);

// Consultar roles asociados al usuario GTI
$roles = [];

if ($idUsuarioGTI) {
    $query = "SELECT r.nombreRol
              FROM personas p
              JOIN personarol pr ON p.idUsuariosPROA = pr.idUsuariosPROA
              JOIN roles r ON pr.idRol = r.idRol
              WHERE p.idUsuariosGTI = ?";

    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $idUsuarioGTI);
    mysqli_stmt_execute($stmt);
    $resultado = mysqli_stmt_get_result($stmt);

    while ($fila = mysqli_fetch_assoc($resultado)) {
        $roles[] = $fila['nombreRol'];
    }
}
?>

<!-- MINI HEADER -->
<div class="mini-header-proa">
    <p>
        Sesión GTI: <strong><?= htmlspecialchars($nombreCompletoGTI) ?></strong> | Navegar como:
        <?php foreach ($roles as $rol): ?>
            <button class="btn-header-rol" data-rol="<?= htmlspecialchars($rol) ?>">
                <?= ucfirst($rol) ?>
            </button>
        <?php endforeach; ?>
    </p>
</div>
