let contadorPreguntas = 1; // Ya existe Pregunta 1 en el HTML
let suma = 0; // Inicializamos la suma de puntos

// Limitar el valor máximo del peso del examen
document.getElementById("peso-examen").addEventListener("input", function () {
    if (this.value > 40) {
        this.value = 40;
    }
});

// Función para actualizar los puntos totales (solo en modo personalizado)
function actualizarEstadoValorPreguntas() {
    const inputsValor = document.querySelectorAll(".input-pregunta-valor");
    const spanPuntos = document.getElementById("puntos");

    // Recalcular la suma de puntos
    suma = 0;
    inputsValor.forEach(input => {
        const valor = parseFloat(input.value);
        if (!isNaN(valor) && valor > 0) {
            suma += valor;
        }
    });

    // Mostrar el total de los puntos
    spanPuntos.textContent = suma;
}

// Función para agregar preguntas
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
        <textarea name="${idPregunta}" id="${idPregunta}" cols="30" rows="3" class="input-base input-pregunta" placeholder="Escribe la pregunta aquí..." required></textarea>
    </div>
    <div class="respuestas-contenedor">
        <span class="recordatorio">NOTA: Recuerda seleccionar la respuesta correcta</span>
        ${generarRespuestaHTML(idPregunta, "a")}
        ${generarRespuestaHTML(idPregunta, "b")}
    </div>
    <button class="btn-agregar" onclick="añadirRespuesta(this)">
        <span class="icono-mas">+</span>
        Añadir respuesta
    </button>
  `;

    contenedorPreguntas.insertBefore(nuevaPregunta, document.getElementById("btn-agregar-pregunta"));
    actualizarEstadoValorPreguntas(); // Recalcular los puntos después de añadir la nueva pregunta
}

// Generar respuestas dinámicamente
function generarRespuestaHTML(nombreGrupo, letra) {
    return `
    <div class="respuesta-opcion">
        <div class="radio-grupo">
            <input type="radio" id="${nombreGrupo}-${letra}" name="${nombreGrupo}" required >
            <label for="${nombreGrupo}-${letra}">${letra.toUpperCase()}.</label>
        </div>
        <input type="text" class="input-base input-respuesta" placeholder="Escribe la respuesta aquí..." required>
        <img src="../icons/trash.svg" alt="Eliminar" class="icono-eliminar" onclick="eliminarElemento(this)">
    </div>
  `;
}

// Función para añadir nuevas respuestas a una pregunta
function añadirRespuesta(boton) {
    const contenedorPregunta = boton.closest(".pregunta-contenedor");
    const respuestasContenedor = contenedorPregunta.querySelector(".respuestas-contenedor");
    const nombreGrupo = contenedorPregunta.getAttribute("data-id");
    const respuestas = respuestasContenedor.querySelectorAll(".respuesta-opcion");

    const nuevaLetra = String.fromCharCode(97 + respuestas.length); // 97 = 'a'
    const nuevaRespuestaHTML = generarRespuestaHTML(nombreGrupo, nuevaLetra);

    respuestasContenedor.insertAdjacentHTML("beforeend", nuevaRespuestaHTML);
}

// Función para eliminar una respuesta o pregunta
function eliminarElemento(elemento) {
    const respuesta = elemento.closest('.respuesta-opcion');
    const pregunta = elemento.closest('.pregunta-contenedor');

    if (respuesta) {
        respuesta.remove();
    } else if (pregunta) {
        pregunta.remove();
        contadorPreguntas--;
    }

    // Recalcular los puntos después de eliminar una pregunta o respuesta
    actualizarEstadoValorPreguntas();
}

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario-examen");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita que se recargue la página

        // Validación de que todos los campos estén completos
        const inputsRequeridos = formulario.querySelectorAll('[required]');
        let camposCompletos = true;

        inputsRequeridos.forEach(input => {
            if (!input.value.trim()) {
                camposCompletos = false;
                input.classList.add('error'); // Agregar clase de error
            } else {
                input.classList.remove('error');
            }
        });

        if (!camposCompletos) {
            alert('Por favor, completa todos los campos obligatorios.');
            return; // Detiene la ejecución si algún campo está vacío
        }

        // Validación de las fechas
        const fechaApertura = document.getElementById("fecha-apertura-examen").value;
        const fechaCierre = document.getElementById("fecha-cierre-examen").value;
        const fechaHoy = new Date().toISOString().slice(0, 16); // Para comparar solo la fecha y hora (sin segundos)

        if (fechaApertura < fechaHoy || fechaCierre < fechaHoy) {
            alert("Las fechas de apertura y cierre no pueden ser anteriores al día de hoy.");
            return; // Detiene la ejecución si las fechas no son válidas
        }

        // Aquí ya no enviamos nada al servidor, solo mostramos un mensaje de éxito
        alert("El examen se ha creado exitosamente con los puntos calculados.");
    });

    // Ejecutar al inicio para establecer el estado inicial correctamente
    actualizarEstadoValorPreguntas();
});

// Popup cuando se publica el examen
async function popupPublicar() {
    const popup = document.getElementById('popup-publicado');
    popup.style.display = 'flex';
}
