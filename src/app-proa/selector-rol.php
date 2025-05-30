<?php
session_start();

// Verifica que haya sesión iniciada desde GTI
if (!isset($_SESSION['usuario']['id'])) {
    header('Location: ../../index.php');
    exit;
}

require_once '../../env/gti.inc';

$idUsuarioGTI = $_SESSION['usuario']['id'];

// Consulta los roles disponibles en PROA para este usuario
$stmt = $pdo->prepare("SELECT pr.idRol, r.nombreRol
                       FROM personas p
                       JOIN personarol pr ON p.idUsuariosPROA = pr.idUsuariosPROA
                       JOIN rol r ON pr.idRol = r.idRol
                       WHERE p.idUsuariosGTI = ?");
$stmt->execute([$idUsuarioGTI]);
$roles = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Si solo tiene un rol, se puede redirigir directamente
if (count($roles) === 1) {
    $_SESSION['rol'] = $roles[0]['nombreRol'];
    switch ($_SESSION['rol']) {
        case 'alumno':
            header('Location: alumno/index.php');
            break;
        case 'profesor':
            header('Location: profesor/index.php');
            break;
        case 'pas':
            header('Location: pas/index.php');
            break;
        default:
            header('Location: ../../index.php');
            break;
    }
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Selecciona tu rol</title>
    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/mini-header.css">
</head>
<body>

<div class="mini-header-proa">
    <p>Has iniciado sesión con GTI como <strong><?= htmlspecialchars($_SESSION['usuario']['nombre']) ?></strong>.</p>
    <p>Selecciona el rol con el que quieres entrar en PROA:</p>
    <form action="cambiar-rol.php" method="post">
        <?php foreach ($roles as $rol): ?>
            <button type="submit" name="rol" value="<?= htmlspecialchars($rol['nombreRol']) ?>" class="btn btn-principal">
                Acceder como <?= ucfirst($rol['nombreRol']) ?>
            </button>
        <?php endforeach; ?>
    </form>
</div>

</body>
</html>
