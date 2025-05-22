<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Nueva Asignatura</title>
  <link rel="stylesheet" href="../css/estilos.css" />
    <link rel="stylesheet" href="../css/header-proa.css">
  <link rel="stylesheet" href="../css/submenu-asignatura.css" />
  <link rel="stylesheet" href="css/nueva-asignatura.css" />
  <link rel="stylesheet" href="css/pop-up.css" />
  <script src="../js/header-proa.js" defer></script>
  <script src="js/panel-pas.js" defer></script>
  <script src="js/nueva-asignatura.js" defer></script>
</head>
<body class="vista-pas">

<?php
$rutaBase = '../';
include $rutaBase . 'includes/header-proa.inc';;
?>

<div class="contenido-wrapper">
  <div class="contenido-principal">
    <aside id="submenu"></aside>

    <div class="container">
      <a href="#" id="btn-volver" class="volver-enlace">← Volver</a>

      <section class="contenido-asignatura fondoPanel">
        <h2>Nueva Asignatura</h2>

        <form class="datos" id="formulario">
          <!-- Información básica -->
          <div class="contenedor-info-asignatura">
            <div class="linea"></div>
            <h3>Información de la asignatura:</h3>

            <div class="fila-triple">
              <label>
                <span>Código</span>
                <input type="text" class="input-base" id="codigo" placeholder="Ej: MAT101" required />
                <span class="error-texto" id="error-codigo"></span>
              </label>

              <label>
                <span>Nombre</span>
                <input type="text" class="input-base" id="Nombre" placeholder="Ej: Álgebra Matricial" required />
                <span class="error-texto" id="error-nombre"></span>
              </label>

              <label>
                <span>Créditos</span>
                <input type="number" class="input-base" id="creditos" value="1" min="1" max="12" />
              </label>
            </div>
          </div>

          <!-- Organización académica -->
          <div class="contenedor-organizacion-academica">
            <div class="linea"></div>
            <h3>Organización académica:</h3>

            <div class="fila-doble">
              <div class="columna">
                <label>
                  <span>Departamento</span>
                  <div class="input-con-icono">
                    <select id="dropdown-departamento" class="input-base seleccionador-dropdown">
                      <option disabled selected hidden>Seleccionar departamento</option>
                    </select>
                    <img src="../icons/dropdown.svg" alt="Flecha" class="icono-dropdown">
                  </div>
                  <span class="error-texto" id="error-departamento"></span>
                </label>

                <label>
                  <span>Grupo</span>
                  <input type="number" class="input-base" id="grupo" value="1" min="1" max="10" />
                </label>
              </div>

              <div class="columna-segunda">
                <label>
                  <span>Carácter de la asignatura</span>
                  <div class="input-con-icono">
                    <select id="dropdown-caracter" class="input-base seleccionador-dropdown">
                      <option disabled selected hidden>Seleccionar carácter de la asignatura</option>
                    </select>
                    <img src="../icons/dropdown.svg" alt="Flecha" class="icono-dropdown">
                  </div>
                  <span class="error-texto" id="error-caracter"></span>
                </label>

                <div class="fila">
                  <label>
                    <span>Curso Académico</span>
                    <div class="input-con-icono">
                      <select id="dropdown-curso" class="input-base seleccionador-dropdown">
                        <option disabled selected hidden>Seleccionar Curso Académico</option>
                      </select>
                      <img src="../icons/dropdown.svg" alt="Flecha" class="icono-dropdown">
                    </div>
                    <span class="error-texto" id="error-curso"></span>
                  </label>

                  <label>
                    <span>Semestre</span>
                    <div class="input-con-icono">
                      <select id="dropdown-semestre" class="input-base seleccionador-dropdown">
                        <option disabled selected hidden>Seleccionar Semestre</option>
                      </select>
                      <img src="../icons/dropdown.svg" alt="Flecha" class="icono-dropdown">
                    </div>
                    <span class="error-texto" id="error-semestre"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Botones -->
          <div id="botones">
            <button id="cancelar" type="button" class="btn-oscuros-secundario">Cancelar</button>
            <button id="guardar" type="button" class="btn-oscuros">Guardar</button>
          </div>

          <!-- Pop-up de Confirmación de Guardado -->
          <dialog id="popup-guardar">
            <div class="contenido-popup">
              <p>¿Deseas guardar esta asignatura?</p>
              <div class="dialog-botones">
                <button id="confirmar-guardar" class="btn-oscuros" type="button">Guardar</button>
                <button id="cancelar-guardar" class="btn-oscuros-secundario" type="button">Cancelar</button>
              </div>
            </div>
          </dialog>

          <!-- Pop-up de Confirmación de Cancelar -->
          <dialog id="popup-cancelar">
            <div class="contenido-popup">
              <p>¿Seguro que quieres cancelar? Se perderán los cambios.</p>
              <div class="dialog-botones">
                <button id="cancelar-cancelar" class="btn-oscuros-secundario" type="button">Seguir editando</button>
                <button id="confirmar-cancelar" class="btn-oscuros" type="button">Sí, cancelar</button>
              </div>
            </div>
          </dialog>


        </form>
      </section>
    </div>
  </div>
</div>


</body>
</html>
