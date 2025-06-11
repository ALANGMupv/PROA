<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Contacto</title>
    <!-- Icono pestaña del navegador -->
    <link rel="icon" href="icons/gti_morado.png" type="image/svg+xml">

    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/contacto.css">
    <script src="js/header.js" defer></script>
    <script src="js/contacto.js" defer></script>
</head>
<body>

<!-- Header -->
<?php
session_start();
$rutaBase = '';
if (isset($_SESSION['usuario'])) {
    include $rutaBase . 'includes/headerLogueado.inc';
} else {
    include $rutaBase . 'includes/headerNoLogueado.inc';
}

$usuario = $_SESSION['usuario'] ?? null;
?>

<!-- Cerramos sección header -->

<!-- Formulario Contacto -->
<main>
<section class="contacto">
    <form class="formulario-contacto">
        <h2>Contáctanos</h2>
        <p class="parrafo-principal">
            ¿Tienes alguna duda sobre nuestros productos o servicios? Escríbenos y te responderemos lo antes posible.
        </p>

        <div class="grupo-campos">
            <!-- Fila 1: Nombre y apellidos -->
            <div class="fila-doble">
                <div class="campo">
                    <label for="nombre">Nombre *</label>
                    <input type="text" id="nombre" class="input-base" placeholder="Tu nombre"
                           value="<?= $usuario['nombre'] ?? '' ?>" />
                </div>
                <div class="campo">
                    <label for="apellidos">Apellidos *</label>
                    <input type="text" id="apellidos" class="input-base" placeholder="Tus apellidos"
                           value="<?= $usuario['apellidos'] ?? '' ?>" />
                </div>
            </div>

            <!-- Fila 2: Correo e institución -->
            <div class="fila-doble">
                <div class="campo">
                    <label for="email">Correo institucional *</label>
                    <input type="email" id="email" class="input-base" placeholder="correo@institucion.edu"
                           value="<?= $usuario['email'] ?? '' ?>" />
                </div>
                <div class="campo">
                    <label for="codigoInstitucion">Nombre de la institución *</label>
                    <input type="text" id="codigoInstitucion" class="input-base" placeholder="Nombre de tu institución"
                           value="<?= $usuario['nombreInstitucion'] ?? '' ?>" />
                </div>
            </div>

            <!-- Fila 3: Tipo de institución y producto -->
            <div class="fila-doble">
                <div class="campo">
                    <label for="tipo">Tipo de institución *</label>
                    <div class="input-dropdown">
                        <select id="tipo" class="seleccionador-dropdown">
                            <option disabled <?= !$usuario ? 'selected' : '' ?> hidden>Selecciona tu institución</option>
                            <?php
                            $tipos = ['Universidad', 'Instituto', 'Colegio', 'Academia Particular', 'Otros (especificar en campo mensaje)'];
                            foreach ($tipos as $tipo) {
                                $selected = (isset($usuario['tipo']) && $usuario['tipo'] === $tipo) ? 'selected' : '';
                                echo "<option $selected>$tipo</option>";
                            }
                            ?>
                        </select>
                        <img src="icons/dropdown.svg" alt="Flecha" class="icono-dropdown">
                    </div>
                </div>
                <div class="campo">
                    <label for="producto">Producto con el que tienes dudas *</label>
                    <div class="input-dropdown">
                        <select id="producto" class="seleccionador-dropdown">
                            <option selected disabled hidden>Selecciona un producto</option>
                            <option>PROA</option>
                        </select>
                        <img src="icons/dropdown.svg" alt="Flecha" class="icono-dropdown">
                    </div>
                </div>
            </div>

            <!-- Mensaje -->
            <div class="campo campo-largo">
                <label for="mensaje">Mensaje *</label>
                <textarea id="mensaje" class="input-contacto" placeholder="Escribe aquí tu duda" rows="5"></textarea>
            </div>
        </div>

        <!-- Botón enviar -->
        <div class="boton-contacto">
            <button type="submit" class="btn">Enviar</button>
        </div>
    </form>

</section>
</main>

<!-- Footer-->
<?php include $rutaBase . 'includes/footer.inc'; ?>
<!-- Fin del footer-->

</body>
</html>