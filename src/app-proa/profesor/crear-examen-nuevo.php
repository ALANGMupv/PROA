<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Crear Examen Nuevo</title>
  <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/header-proa.css">
  <link rel="stylesheet" href="../css/submenu-asignatura.css">
  <link rel="stylesheet" href="css/dropdown-grupo.css">
  <link rel="stylesheet" href="css/pop-up.css">
  <link rel="stylesheet" href="css/crear-examen-nuevo.css">
  <script src="../js/header-proa.js" defer></script>
  <script src="js/asignatura-profesor.js" defer></script>
  <script src="js/crear-examen-nuevo.js" defer></script>
  <script src="js/pop-up.js " defer></script>
  <script src="js/dropdown-asignaturas.js" defer></script>
</head>
<body>

<?php
$rutaBase = '../';
include $rutaBase . 'includes/header-proa.inc';;
?>

<main class="contenido-wrapper"> <!-- Contenedor principal del contenido -->

  <div class="contenido-principal"> <!-- Contenedor que agrupa el submenú y el contenido principal -->
    <aside id="submenu" class="submenu"></aside> <!-- Submenú lateral (se rellena dinámicamente) -->
    <div class="contenido-asignatura"> <!-- Área principal donde se muestra el contenido relacionado con la asignatura -->
      <div class="cabecera-dropdown-fija-profesor"> <!-- Barra superior con filtros desplegables para el profesor -->

        <!-- Aquí se inyecta dinámicamente el botón del submenú en responsive -->

        <div class="contenedor-dropdowns"> <!-- Contenedor agrupador de los dos dropdowns -->
          <!-- Dropdown para seleccionar grupo (PL1, PL2...) -->
          <div class="input-con-icono grupo-dropdown">
            <select id="dropdown-grupo" class="input-base seleccionador-dropdown">
              <option value="todos">Todos</option>
              <option value="pl1">Grupo PL1</option>
              <option value="pl2">Grupo PL2</option>
            </select>
            <img src="../icons/dropdownAsignaturasAzul.svg" alt="Flecha" class="icono-dropdown">
          </div>

          <!-- Dropdown para seleccionar asignatura (rellenado dinámicamente con JS) -->
          <div class="input-con-icono asignatura-dropdown">
            <select id="dropdown-asignaturas" class="input-base seleccionador-dropdown"></select>
            <img src="../icons/dropdownAsignaturas.svg" alt="Flecha" class="icono-dropdown">
          </div>
        </div>
      </div>

      <a href="#" id="volver" class="volver-enlace" onclick="activarPopPup(this)">← Volver</a>

      <!-- SECCIÓN CREAR EXÁMENES PROFESOR -->
    <section class="panel-asignaturas fondoPanel">

      <h2>Panel de creación de examen</h2>

      <form id="formulario-examen">

        <div class="datos">

          <div class="titulo-texto">
            <h4>Titulo del Examen: *</h4>
            <input type="text" class="input-base" id="titulo-examen" placeholder="Ej: Cuestionario 1 del tema 1" required>
          </div>

          <div class="parametros">
            <div class="contenedor-fecha-hora">
              <label>
                <span>Fecha de entrega: *</span>
                <input type="date" class="input-base con-icono" id="fecha-examen" required>
              </label>
              <label>
                <span>Hora: *</span>
                <input type="time" class="input-base with-icon" id="hora-examen" required>
              </label>
            </div>
            <div class="contenedor-valor-peso">
              <label>
                <span>Peso: *</span>
                <div class="peso">
                  <input type="number" class="input-base" id="peso-examen" max="40" required>
                  <span>%</span>
                </div>
              </label>
              <label>
                <span>Distribucion: *</span>
                <div class="input-con-icono grupo-dropdown">
                  <select id="dropdown-valor" class="input-base seleccionador-dropdown">
                    <option value="automatico">Automatico</option>
                    <option value="personalizado">Personalizado</option>
                  </select>
                  <img src="../icons/dropdown.svg" alt="Flecha" class="icono-dropdown">
                </div>
              </label>
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
            <button class="btn-oscuros-secundario btn-inicial" type="button" id="guardar" onclick="activarPopPup(this)">Guardar Borrador</button>
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