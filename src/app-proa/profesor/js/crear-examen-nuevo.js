let contadorPreguntas = 1; // Ya existe Pregunta 1 en el HTML
let suma = 0; // Inicializamos la suma de puntos

document.getElementById("duracion-examen").value = "00:00";

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

// Función para manejar el envío del formulario
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
    const ahora = new Date().toISOString().slice(0, 16); // Fecha y hora actual (sin segundos)

// Validar que apertura y cierre sean posteriores al momento actual
    if (fechaApertura < ahora) {
        alert("La fecha de apertura no puede ser anterior al momento actual.");
        return;
    }

    if (fechaCierre < ahora) {
        alert("La fecha de cierre no puede ser anterior al momento actual.");
        return;
    }

// Validar que el cierre no sea anterior a la apertura
    if (fechaCierre < fechaApertura) {
        alert("La fecha de cierre no puede ser anterior a la fecha de apertura.");
        return;
    }

    document.getElementById("duracion-examen").addEventListener("input", function () {
        const [h, m] = this.value.split(":").map(Number);
        if (h > 5 || (h === 5 && m > 0)) {
            this.setCustomValidity("La duración no puede superar las 5 horas.");
        } else {
            this.setCustomValidity("");
        }
    });

    // Preparar los datos del examen
    const examenData = {
        titulo: document.getElementById("titulo-examen").value,
        descripcion: document.getElementById("descripcion-examen").value,
        fecha_apertura: document.getElementById("fecha-apertura-examen").value,
        fecha_cierre: document.getElementById("fecha-cierre-examen").value,
        peso: document.getElementById("peso-examen").value,
        duracion: document.getElementById("duracion-examen").value,
        codigo_asignatura: document.getElementById("dropdown-asignaturas").value,
        preguntas: []
    };

    // Recoger las preguntas y respuestas dinámicamente
    const preguntas = document.querySelectorAll(".pregunta-contenedor");
    preguntas.forEach(pregunta => {
        const idPregunta = pregunta.getAttribute("data-id");
        const enunciado = pregunta.querySelector(".input-pregunta").value;
        const valor = pregunta.querySelector(".input-pregunta-valor").value;

        const respuestas = [];
        const opcionesRespuesta = pregunta.querySelectorAll(".respuesta-opcion");
        opcionesRespuesta.forEach(opcion => {
            const respuesta = opcion.querySelector(".input-respuesta").value;
            const correcta = opcion.querySelector("input[type='radio']").checked;
            respuestas.push({ respuesta, correcta });
        });

        examenData.preguntas.push({ enunciado, valor, respuestas });
    });

    // Verificación de datos antes de enviarlos
    console.log(examenData);
    console.log(JSON.stringify(examenData)); // Verifica los datos enviados

    // Enviar los datos al servidor
    fetch("../app/guardar-examen.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(examenData)
    })
        .then(response => {
            // Verificar si la respuesta es JSON
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json(); // Si es JSON, parsearlo
            } else {
                return response.text(); // Si no es JSON, manejarlo como texto
            }
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            if (data.success) {
                alert("El examen se ha creado exitosamente.");
                window.location.href = "examenes-profesor.php";
            } else {
                alert("Hubo un error al crear el examen: " + data.error);
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            alert("Hubo un error al enviar los datos.");
        });

});
