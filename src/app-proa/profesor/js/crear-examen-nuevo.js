let contadorPreguntas = 2; // Ya existe Pregunta 1 en el HTML

function agregarPregunta() {
    const contenedorPreguntas = document.querySelector(".datos");
    const nuevaPregunta = document.createElement("div");
    const idPregunta = `pregunta${contadorPreguntas}`;
    nuevaPregunta.classList.add("pregunta-contenedor");
    nuevaPregunta.setAttribute("data-id", idPregunta);

    nuevaPregunta.innerHTML = `
    <div class="titulo-texto-pregunta">
      <div class="titulo-pregunta">
        <h4>Pregunta ${contadorPreguntas}</h4>
        <img src="../icons/trash.svg" alt="Eliminar" class="icono-eliminar" onclick="eliminarElemento(this)">
      </div>
      <textarea name="${idPregunta}" id="${idPregunta}" cols="30" rows="3" class="input-base input-pregunta"
                placeholder="Escribe la pregunta aquí..." required></textarea>
    </div>

    <div class="respuestas-contenedor">
      ${generarRespuestaHTML(idPregunta, "a")}
      ${generarRespuestaHTML(idPregunta, "b")}
    </div>

    <button class="btn-agregar" onclick="añadirRespuesta(this)">
      <span class="icono-mas">+</span>
      Añadir respuesta
    </button>
  `;

    contenedorPreguntas.insertBefore(nuevaPregunta, document.getElementById("btn-agregar-pregunta"));
    contadorPreguntas++;
}

function generarRespuestaHTML(nombreGrupo, letra) {
    return `
    <div class="respuesta-opcion">
      <div class="radio-grupo">
        <input type="radio" id="${nombreGrupo}-${letra}" name="${nombreGrupo} required" >
        <label for="${nombreGrupo}-${letra}">${letra.toUpperCase()}.</label>
      </div>
      <input type="text" class="input-base input-respuesta" placeholder="Escribe la respuesta aquí..." required>
      <img src="../icons/trash.svg" alt="Eliminar" class="icono-eliminar" onclick="eliminarElemento(this)">
    </div>
  `;
}

function agregarRespuesta(btn) {
    const contenedor = btn.previousElementSibling; // .respuestas-contenedor justo antes del botón
    if (!contenedor || !contenedor.classList.contains("respuestas-contenedor")) return;

    const letra = String.fromCharCode(65 + contadorRespuestas); // Genera letras: A, B, C, etc.

    const nuevaRespuesta = document.createElement("div");
    nuevaRespuesta.classList.add("respuesta-opcion");
    nuevaRespuesta.innerHTML = `
    <div class="radio-grupo">
      <input type="radio" id="opcion-${letra.toLowerCase()}" name="pregunta1" required>
      <label for="opcion-${letra.toLowerCase()}">${letra}.</label>
    </div>
    <input type="text" class="input-base input-respuesta" placeholder="Escribe la respuesta aquí..." required>
    <img src="../icons/trash.svg" alt="Eliminar" class="icono-eliminar" onclick="eliminarElemento(this)">
  `;

    contenedor.appendChild(nuevaRespuesta);
    contadorRespuestas++;
}

function añadirRespuesta(boton) {
    const contenedorPregunta = boton.closest(".pregunta-contenedor");
    const respuestasContenedor = contenedorPregunta.querySelector(".respuestas-contenedor");
    const nombreGrupo = contenedorPregunta.getAttribute("data-id");
    const respuestas = respuestasContenedor.querySelectorAll(".respuesta-opcion");

    const nuevaLetra = String.fromCharCode(97 + respuestas.length); // 97 = 'a'
    const nuevaRespuestaHTML = generarRespuestaHTML(nombreGrupo, nuevaLetra);

    respuestasContenedor.insertAdjacentHTML("beforeend", nuevaRespuestaHTML);
}

function eliminarElemento(elemento) {
    const respuesta = elemento.closest('.respuesta-opcion');
    const pregunta = elemento.closest('.pregunta-contenedor');

    if (respuesta) {
        respuesta.remove();
    } else if (pregunta) {
        pregunta.remove();
        contadorPreguntas--;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario-examen");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita que se recargue la página

        const datos = {
            titulo: formulario.querySelector('#titulo-examen').value,
            valor:formulario.querySelector('#valor-examen').value,
            peso: formulario.querySelector('#peso-examen').value,
            fecha: formulario.querySelector('#fecha-examen').value,
            hora: formulario.querySelector('#hora-examen').value,
            preguntas: [],
        };

        const preguntasDOM = formulario.querySelectorAll(".pregunta-contenedor");
        preguntasDOM.forEach(p => {
            const preguntaTexto = p.querySelector("textarea").value;
            const respuestas = [];

            p.querySelectorAll(".respuesta-opcion").forEach(r => {
                const texto = r.querySelector('input[type="text"]').value;
                const seleccionada = r.querySelector('input[type="radio"]').checked;
                respuestas.push({ texto, correcta: seleccionada });
            });

            datos.preguntas.push({
                pregunta: preguntaTexto,
                respuestas
            });
        });

        console.log("Examen creado:", datos);

        popupPublicar();

    });
});

async function popupPublicar() {
    const popup = document.getElementById('popup-publicado');
    popup.style.display = 'flex';
}
