document.addEventListener("DOMContentLoaded", () => {
    const correctas = {
        pregunta1: "B",
        pregunta2: "B",
        pregunta3: "B",
        pregunta4: "C",
        pregunta5: "C"
    };

    const textos = {
        pregunta1: {
            texto: "¿Qué condición debe cumplir una matriz cuadrada para que tenga inversa?",
            opciones: {
                A: "Ser semántica",
                B: "Tener determinante distinto de cero",
                C: "Ser triangular",
                D: "Tener todos sus elementos positivos"
            }
        },
        pregunta2: {
            texto: "¿Cuál es el resultado de multiplicar una matriz A de orden 2×3 por una matriz B de orden 3×2?",
            opciones: {
                A: "Una matriz 3x3",
                B: "Una matriz 2x2",
                C: "Una matriz 2x3",
                D: "No se puede multiplicar"
            }
        },
        pregunta3: {
            texto: "¿Qué propiedad tiene una matriz simétrica?",
            opciones: {
                A: "Tiene sólo valores negativos",
                B: "Su traspuesta es igual a ella misma",
                C: "Tiene determinante igual a 0",
                D: "Está llena de ceros"
            }
        },
        pregunta4: {
            texto: "¿Cuál es el resultado del producto de cualquier matriz por una matriz nula del mismo tamaño compatible?",
            opciones: {
                A: "Una matriz identidad",
                B: "La misma matriz",
                C: "Una matriz nula",
                D: "Una matriz diagonal"
            }
        },
        pregunta5: {
            texto: "El rango de una matriz es:",
            opciones: {
                A: "El número de columnas",
                B: "El número de ceros en la matriz",
                C: "La cantidad de filas no nulas",
                D: "La suma de los elementos de la diagonal"
            }
        }
    };

    const examenGuardado = JSON.parse(localStorage.getItem("examenModificado")) || {
        titulo: "Parcial Economía",
        descripcion: "Este cuestionario evalúa los conocimientos adquiridos en los temas fundamentales de Álgebra Matricial...",
        fecha: "2025-05-05",
        hora: "23:59"
    };

    // Pintar valores iniciales
    document.getElementById("titulo-examen").textContent = examenGuardado.titulo;
    document.getElementById("descripcion-examen").textContent = examenGuardado.descripcion;
    document.getElementById("fecha-limite-texto").textContent =
        `Fecha límite para completarlo: ${formatearFecha(examenGuardado.fecha)} a las ${examenGuardado.hora}.`;

    // Pintar preguntas (siempre fijas en este caso)
    const contenedor = document.getElementById("contenedor-preguntas");
    Object.entries(textos).forEach(([clave, { texto, opciones }], index) => {
        const correcta = correctas[clave];

        const htmlOpciones = ["A", "B", "C", "D"].map(letra => {
            const esCorrecta = letra === correcta;
            return `
                <label class="boton-opcion ${esCorrecta ? "color-box boton-opcion-correcta-deshabilitado" : "boton-opcion-deshabilitado"}">
                    <input type="radio" name="${clave}" value="${letra}" disabled ${esCorrecta ? "checked" : ""}>
                    <span class="letra">${letra}.</span>
                    <span class="texto">${opciones[letra]}</span>
                </label>
            `;
        }).join("");

        contenedor.innerHTML += `
            <section class="pregunta">
                <h3>Pregunta ${index + 1}</h3>
                <p class="parrafo-principal"><strong>${texto}</strong></p>
                <div class="opciones">${htmlOpciones}</div>
            </section>
        `;
    });

    // Modificar
    const btnModificar = document.getElementById("btn-modificar");
    const btnGuardar = document.getElementById("btn-guardar");

    btnModificar.addEventListener("click", () => {
        const titulo = document.getElementById("titulo-examen");
        const descripcion = document.getElementById("descripcion-examen");
        const fechaTexto = document.getElementById("fecha-limite-texto");

        // Sustituir por inputs
        titulo.outerHTML = `<input id="titulo-examen" class="input-base" value="${titulo.textContent}" />`;
        descripcion.outerHTML = `<textarea id="descripcion-examen" class="input-base" rows="4">${descripcion.textContent}</textarea>`;

        // Obtener valores actuales
        const fechaPartes = fechaTexto.textContent.match(/(\d{1,2}) de (\w+) de (\d{4}) a las (\d{2}):(\d{2})/);
        const fechaISO = examenGuardado.fecha;
        const hora = examenGuardado.hora;

        // Sustituir <p> por inputs
        fechaTexto.outerHTML = `
            <div id="fecha-editar">
                <label>Fecha:
                    <input type="date" class="input-base" id="nueva-fecha" value="${fechaISO}">
                </label>
                <label>Hora:
                    <input type="time" class="input-base" id="nueva-hora" value="${hora}">
                </label>
            </div>
        `;

        btnModificar.style.display = "none";
        btnGuardar.style.display = "inline-block";
    });

    // Guardar
    btnGuardar.addEventListener("click", () => {
        const nuevoTitulo = document.getElementById("titulo-examen").value;
        const nuevaDescripcion = document.getElementById("descripcion-examen").value;
        const nuevaFecha = document.getElementById("nueva-fecha").value;
        const nuevaHora = document.getElementById("nueva-hora").value;

        localStorage.setItem("examenModificado", JSON.stringify({
            titulo: nuevoTitulo,
            descripcion: nuevaDescripcion,
            fecha: nuevaFecha,
            hora: nuevaHora
        }));

        location.reload();
    });
});

// Utilidad para mostrar fecha en formato "5 de mayo de 2025"
function formatearFecha(fechaISO) {
    const date = new Date(fechaISO);
    const opciones = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("es-ES", opciones);
}

function convertirAFichaEditable(examen) {
    const contenedor = document.getElementById("contenedor-preguntas");
    contenedor.innerHTML = "";

    // Título
    document.getElementById("titulo-examen").outerHTML = `
        <input type="text" class="input-base" id="titulo-examen" value="${examen.titulo}" />
    `;

    // Descripción
    document.getElementById("descripcion-examen").outerHTML = `
        <textarea id="descripcion-examen" class="input-base" rows="4">${examen.descripcion}</textarea>
    `;

    // Fecha y hora
    const fechaObj = new Date(examen.fechaLimite);
    const fecha = fechaObj.toISOString().split("T")[0];
    const hora = fechaObj.toTimeString().slice(0, 5);

    contenedor.innerHTML += `
        <div class="parametros">
            <label>Fecha de entrega:
                <input type="date" class="input-base" id="fecha-editar" value="${fecha}">
            </label>
            <label>Hora:
                <input type="time" class="input-base" id="hora-editar" value="${hora}">
            </label>
        </div>
    `;

    // Preguntas y respuestas
    examen.preguntas.forEach((preg, i) => {
        const id = `pregunta${i + 1}`;
        const respuestasHTML = preg.respuestas.map((r, j) => {
            const letra = String.fromCharCode(65 + j);
            return `
                <div class="respuesta-opcion">
                    <div class="radio-grupo">
                        <input type="radio" name="${id}" ${r.correcta ? "checked" : ""}>
                        <label>${letra}.</label>
                    </div>
                    <input type="text" class="input-base input-respuesta" value="${r.texto}">
                </div>
            `;
        }).join("");

        contenedor.innerHTML += `
            <div class="pregunta-contenedor" data-id="${id}">
                <h4>Pregunta ${i + 1}</h4>
                <textarea class="input-base input-pregunta" rows="3">${preg.pregunta}</textarea>
                <div class="respuestas-contenedor">${respuestasHTML}</div>
            </div>
        `;
    });

    // Mostrar botón guardar
    document.getElementById("btn-modificar").style.display = "none";
    document.getElementById("btn-guardar").style.display = "inline-block";
}

function volverAtras() {
    window.history.back();
}
