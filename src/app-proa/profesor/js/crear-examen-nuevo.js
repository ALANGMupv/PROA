let contadorPreguntas = 1; // Ya existe Pregunta 1 en el HTML
const dropdownValor = document.getElementById("dropdown-valor");
let suma;
function actualizarEstadoValorPreguntas() {
    const esAutomatico = dropdownValor.value === "automatico";
    const inputsValor = document.querySelectorAll(".input-pregunta-valor");
    const spanPuntos = document.getElementById("puntos");

    inputsValor.forEach(input => {
        input.disabled = esAutomatico;
    });

    if (esAutomatico) {
        spanPuntos.textContent = "10";
        suma = 10;
        inputsValor.forEach(input => {
            input.value = ""
        })
    } else {
        // Sumar todos los valores numéricos de los inputs
        suma = 0;
        inputsValor.forEach(input => {
            const valor = parseFloat(input.value);
            if (!isNaN(valor)) {
                suma += valor;
            }
        });
        spanPuntos.textContent = suma;
    }
}
function agregarPregunta() {
    contadorPreguntas++;
    const contenedorPreguntas = document.querySelector(".datos");
    const nuevaPregunta = document.createElement("div");
    const idPregunta = `pregunta${contadorPreguntas}`;
    nuevaPregunta.classList.add("pregunta-contenedor");
    nuevaPregunta.setAttribute("data-id", idPregunta);

    nuevaPregunta.innerHTML = `
    <div class="titulo-texto-pregunta">

      <div class="titulo-pregunta">

        <div class="titulo-valor">
          <h4>Pregunta ${contadorPreguntas}</h4>
            <div>
              <span>Valor</span>
              <input type="number" class="input-base input-pregunta-valor" placeholder="" oninput="actualizarEstadoValorPreguntas()" required>
            </div>
        </div>
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
    actualizarEstadoValorPreguntas();
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

        const fechaTexto = formulario.querySelector('#fecha-examen').value; // formato: YYYY-MM-DD
        const horaTexto = formulario.querySelector('#hora-examen').value;   // formato: HH:MM

        // Combinar fecha y hora en formato ISO 8601 (ej. 2025-05-09T19:40:00)
        const fechaHora = fechaTexto && horaTexto ? `${fechaTexto}T${horaTexto}:00` : null;


        const datos = {
            titulo: formulario.querySelector('#titulo-examen').value, // string
            puntos: suma, // número
            peso: Number(formulario.querySelector('#peso-examen').value), // número
            fecha: fechaHora, // string con formato ISO (fecha + hora)
            preguntas: [],
        };

        const preguntasDOM = formulario.querySelectorAll(".pregunta-contenedor");
        preguntasDOM.forEach(p => {
            const preguntaTexto = p.querySelector("textarea").value;
            const respuestas = [];

            let valor = p.querySelector(".input-pregunta-valor").value;

            if(valor === ""){
                valor = 10/contadorPreguntas;
            }


            p.querySelectorAll(".respuesta-opcion").forEach(r => {
                const texto = r.querySelector('input[type="text"]').value;
                const seleccionada = r.querySelector('input[type="radio"]').checked;
                respuestas.push({ texto, correcta: seleccionada });
            });

            datos.preguntas.push({
                pregunta: preguntaTexto,
                valor: valor,
                respuestas
            });
        });

        console.log("Examen creado:", datos);

        popupPublicar();

    });

    // Escuchar cambios en el dropdown
    dropdownValor.addEventListener("change", actualizarEstadoValorPreguntas);

    // Ejecutar al inicio para establecer el estado inicial correctamente
    actualizarEstadoValorPreguntas();
});

async function popupPublicar() {
    const popup = document.getElementById('popup-publicado');
    popup.style.display = 'flex';
}
