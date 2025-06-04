<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Registro</title>
    <!-- Icono pestaña del navegador -->
    <link rel="icon" href="icons/gti_morado.png" type="image/svg+xml">

    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/registro.css">
    <script src="js/header.js" defer></script>
    <script src="js/registro.js" defer></script>
</head>
<body>

<!-- Include header no logueado -> solo acceden los no logueados -->
<?php
$rutaBase = '';
include 'includes/headerNoLogueado.inc';
?>
<!-- Cerramos sección header -->

<!-- Sección principal de registro -->
<main>
<section class="registro">
    <div class="contenedor-registro">

        <!-- Texto explicativo que acompaña el formulario -->
        <div class="registro-texto">
            <h2>Regístrate y empieza a probar la demo de nuestros módulos educativos</h2>
            <p class="parrafo-principal">
                Si representas a una institución educativa, completa el registro y recibirás por correo las credenciales de acceso a las demos disponibles. Prueba nuestros módulos educativos desde dentro y evalúa cómo pueden adaptarse a tu centro.
            </p>
        </div>

        <!-- Formulario para el registro de usuarios -->
        <form class="registro-formulario" action="registrarUsuario.php" method="post">

        <!-- Campos para el nombre y apellidos del usuario -->
            <div class="campo-doble">
                <div class="campo mitad">
                    <label for="nombre">Nombre *</label>
                    <input type="text" id="nombre" name="nombre" class="input-base" />
                </div>
                <div class="campo mitad">
                    <label for="apellidos">Apellidos *</label>
                    <input type="text" id="apellidos" name = "apellidos" class="input-base" />
                </div>
            </div>

            <!-- Campo doble para institución y tipo -->
            <div class="campo-doble">
                <div class="campo mitad">
                    <label for="institucion">Nombre de la institución *</label>
                    <input type="text" id="institucion" name="institucion" class="input-base" />
                </div>
                <div class="campo mitad">
                    <label for="tipo">Tipo de institución *</label>
                    <div class="input-dropdown">
                        <select id="tipo" name="tipo" class="seleccionador-dropdown">
                            <option value="" disabled selected hidden>Selecciona tu institución</option>
                            <option value="A1">Universidad</option>
                            <option value="A2">Instituto</option>
                            <option value="A3">Colegio</option>
                            <option value="A4">Academia Particular</option>
                            <option value="A5">Otros</option>
                        </select>
                        <img src="icons/dropdown.svg" alt="Flecha" class="icono-dropdown" />
                    </div>
                </div>
            </div>

            <!-- Campo doble para teléfono y correo -->
            <div class="campo-doble">
                <div class="campo mitad">
                    <label for="telefono">Teléfono *</label>
                    <input type="tel" id="telefono"  name="telefono" class="input-base" />
                </div>
                <div class="campo mitad">
                    <label for="correo">Correo de la institución *</label>
                    <input type="email" id="correo" name="correo" class="input-base" />
                </div>
            </div>

            <!-- Campo doble para contraseña y repetir contraseña -->
            <div class="campo-doble">
                <div class="campo mitad">
                    <div class="fila-label">
                        <label for="contrasena">Contraseña *</label>
                    </div>
                    <input type="password" id="contrasena" name="contrasena" class="input-base" />
                </div>
                <div class="campo mitad">
                    <label for="repetir">Repetir contraseña *</label>
                    <input type="password" id="repetir" name="repetir" class="input-base" />
                </div>
            </div>
            <span class="indicacion-contrasena">
                La contraseña debe contener al menos 6 caracteres e incluir números o símbolos.
            </span>


            <!-- Botón para enviar el formulario -->
            <button type="submit" class="btn">Registrarse</button>

            <!-- Enlace para usuarios que ya tienen cuenta -->
            <p class="texto-secundario">
                ¿Ya tienes cuenta? <a href="login.php" class="enlace-secundario">Iniciar sesión</a>
            </p>
        </form>
    </div>
</section>
</main>

<!-- Footer-->
<?php include $rutaBase . 'includes/footer.inc'; ?>
<!-- Fin del footer-->

</body>
</html>
