<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Crear Examen Nuevo</title>
    <!-- Icono pestaña del navegador -->
    <link rel="icon" href="../icons/gorritoAzul.svg" type="image/svg+xml">

    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/header-proa.css">
    <link rel="stylesheet" href="../css/mini-header.css">
    <link rel="stylesheet" href="../css/submenu-asignatura.css">
    <!-- <link rel="stylesheet" href="css/dropdown-grupo.css"> -->
    <link rel="stylesheet" href="css/pop-up.css">
    <link rel="stylesheet" href="css/crear-examen-nuevo.css">
    <script src="../js/header-proa.js" defer></script>
    <script src="../js/mini-header.js" defer></script>
    <script src="../js/asignaturas.js" defer></script>
    <script src="js/crear-examen-nuevo.js" defer></script>
    <script src="js/pop-up.js " defer></script>
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

            <!-- SECCIÓN CREAR EXÁMENES PROFESOR -->
            <section class="panel-asignaturas fondoPanel">
                <?php
                $migas = [
                    ['label' => 'Asignaturas', 'url' => 'index.php'],
                    ['label' => 'Página Inicial de la Asignatura', 'url' => 'asignatura-profesor.php'],
                    ['label' => 'Exámenes de la Asignatura', 'url' => 'examenes-profesor.php'],
                    ['label' => 'Crear Examen Nuevo']
                ];
                include '../includes/migas-de-pan.inc';
                ?>


                <h2>Panel de creación de examen</h2>

                <form action="" id="formulario-examen">

                    <div class="datos">

                        <div class="titulo-texto">
                            <h4>Titulo del Examen: *</h4>
                            <input type="text" class="input-base" id="titulo-examen" placeholder="Ej: Cuestionario 1 del tema 1" required>
                        </div>

                        <div class="titulo-texto">
                            <h4>Descripción del Examen: *</h4>
                            <textarea class="input-base" id="descripcion-examen" placeholder="Escribe una descripción del examen..." required></textarea>
                        </div>


                        <div class="parametros">
                            <div class="contenedor-fecha-hora">
                                <label>
                                    <span>Fecha de apertura: *</span>
                                    <input type="datetime-local" class="input-base con-icono" id="fecha-apertura-examen" required>
                                </label>
                                <label>
                                    <span>Fecha de cierre: *</span>
                                    <input type="datetime-local" class="input-base with-icon" id="fecha-cierre-examen" required>
                                </label>
                            </div>
                            <div class="contenedor-valor-peso">
                                <label>
                                    <span>Peso: *</span>
                                    <div class="peso">
                                        <input type="number" class="input-base" id="peso-examen" max="40" min="0" required>
                                        <span>%</span>
                                    </div>
                                </label>

                                <label>
                                    <span>Duracion: *</span>
                                    <div class="duracion">
                                        <input type="time" class="input-base" id="duracion-examen" value="00:00"
                                               step="60"
                                               min="00:00"
                                               max="05:00" required>
                                        <span>h:min</span>
                                    </div>
                                </label>

                                <!-- <label>
                                    <span>Distribucion: *</span>
                                    <div class="input-con-icono grupo-dropdown">
                                        <select id="dropdown-valor" class="input-base seleccionador-dropdown">
                                            <option value="automatico">Proporcional</option>
                                            <option value="personalizado">Personalizado</option>
                                        </select>
                                        <img src="../icons/dropdown.svg" alt="Flecha" class="icono-dropdown">
                                    </div>
                                </label> -->

                            </div>

                        </div>
                        <div class="contenedor-puntos">
                            <label>
                                <div class="puntos">
                                    <span>Puntos Totales:</span> <span id="puntos"></span>
                                </div>
                            </label>
                        </div>

                        <div class="pregunta-contenedor" data-id="pregunta1">

                            <div class="titulo-texto-pregunta">
                                <div class="titulo-pregunta">

                                    <div class="titulo-valor">
                                        <h4>Pregunta 1</h4>
                                        <div>
                                            <span>Valor</span>
                                            <input type="number" class="input-base input-pregunta-valor" placeholder="" oninput="actualizarEstadoValorPreguntas()" required>
                                        </div>
                                    </div>

                                    <img src="../icons/trash.svg" alt="Eliminar" class="icono-eliminar" onclick="eliminarElemento(this)">
                                </div>

                                <textarea name="pregunta1" id="pregunta1" cols="30" rows="3" class="input-base input-pregunta"
                                          placeholder="Escribe la pregunta aquí..." required></textarea>
                            </div>

                            <div class="respuestas-contenedor">
                                <span class="recordatorio">NOTA: Recuerda seleccionar la respuesta correcta</span>
                                <div class="respuesta-opcion">
                                    <div class="radio-grupo">
                                        <input type="radio" id="pregunta1-a" name="pregunta1" required>
                                        <label for="pregunta1-a">A.</label>
                                    </div>
                                    <input type="text" class="input-base input-respuesta" placeholder="Escribe la respuesta aquí..." required>
                                    <img src="../icons/trash.svg" alt="Eliminar" class="icono-eliminar" onclick="eliminarElemento(this)">
                                </div>

                                <div class="respuesta-opcion">
                                    <div class="radio-grupo">
                                        <input type="radio" id="pregunta1-b" name="pregunta1" required>
                                        <label for="pregunta1-b">B.</label>
                                    </div>
                                    <input type="text" class="input-base input-respuesta" placeholder="Escribe la respuesta aquí..." required>
                                    <img src="../icons/trash.svg" alt="Eliminar" class="icono-eliminar" onclick="eliminarElemento(this)">
                                </div>
                            </div>

                            <button class="btn-agregar" onclick="añadirRespuesta(this)">
                                <span class="icono-mas">+</span>
                                Añadir respuesta
                            </button>
                        </div>

                        <button class="btn-agregar"  onclick="agregarPregunta(this)" id="btn-agregar-pregunta">
                            <span class="icono-mas">+</span>
                            Añadir pregunta
                        </button>

                        <div id="botones">
                            <button class="btn-oscuros-secundario btn-inicial" type="button" id="cancelar" onclick="activarPopPup(this)">Cancelar</button>
                            <button class="btn-oscuros-secundario btn-inicial" type="button" id="guardar-borrador" onclick="activarPopPup(this)">Guardar Borrador</button>
                            <button class="btn-oscuros" type="button" id="publicar" onclick="activarPopPup(this)">Publicar</button>
                        </div>

                        <!-- Pop-up de confirmación -->
                        <div id="popup-confirmacion" class="popup">
                            <div class="contenido-popup">
                                <p class="parrafo-principal">¿Estás seguro de que quieres publicar el examen?</p>
                                <div class="btn-popup">
                                    <button class="btn-oscuros-secundario" onclick="btnCancelar()" type="button" >Cancelar</button>
                                    <button type="submit" class="btn-oscuros" onclick="btnAceptar(this)">Aceptar</button>
                                </div>
                            </div>
                        </div>


                        <!-- Pop-up publicado -->
                        <div id="popup-publicado" class="popup">
                            <div class="contenido-popup">
                                <p class="parrafo-principal">Se ha pulicado exitosamente el examen</p>
                                <div class="btn-popup">
                                    <button class="btn-oscuros" id="aceptar-publicado" onclick="btnAceptar(this)">Aceptar</button>
                                </div>
                            </div>
                        </div>

                        <!-- Pop-up guradado -->
                        <div id="popup-guardado" class="popup">
                            <div class="contenido-popup">
                                <p class="parrafo-principal">Se ha guardado exitosamente el borrador</p>
                                <div class="btn-popup">
                                    <button class="btn-oscuros" id="aceptar-borrador" onclick="btnAceptar(this)">Aceptar</button>
                                </div>
                            </div>
                        </div>

                        <!-- Pop-up de salir -->
                        <div id="popup-salir" class="popup">
                            <div class="contenido-popup">
                                <p class="parrafo-principal">¿Estás seguro de que quieres salir y no guardar el borrador?</p>
                                <div class="btn-popup">
                                    <button class="btn-oscuros-secundario" onclick="btnCancelar()">Cancelar</button>
                                    <button class="btn-oscuros" id="aceptar-salir" onclick="btnAceptar(this)">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </section> <!-- FIN DE LA SECCIÓN CREAR EXÁMENES PROFESOR -->

        </div>
    </div> <!-- Fin del contenedor contenido-principal -->
</main>

</body>
</html>