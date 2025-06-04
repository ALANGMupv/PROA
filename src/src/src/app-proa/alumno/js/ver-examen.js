// Respuestas correctas definidas para cada pregunta
const respuestasCorrectas = {
    pregunta1: "B",
    pregunta2: "B",
    pregunta3: "B",
    pregunta4: "C",
    pregunta5: "C"
};

// Texto de las preguntas
const preguntasTexto = {
    pregunta1: "¿Qué condición debe cumplir una matriz cuadrada para que tenga inversa?",
    pregunta2: "¿Cuál es el resultado de multiplicar una matriz A de orden 2×3 por una matriz B de orden 3×2?",
    pregunta3: "¿Qué propiedad tiene una matriz simétrica?",
    pregunta4: "¿Cuál es el resultado del producto de cualquier matriz por una matriz nula del mismo tamaño compatible?",
    pregunta5: "El rango de una matriz es:"
};

// Opciones para cada pregunta
const opciones = {
    pregunta1: { A: "Ser semántica", B: "Tener determinante distinto de cero", C: "Ser triangular", D: "Tener todos sus elementos positivos" },
    pregunta2: { A: "Una matriz 3x3", B: "Una matriz 2x2", C: "Una matriz 2x3", D: "No se puede multiplicar" },
    pregunta3: { A: "Tiene sólo valores negativos", B: "Su traspuesta es igual a ella misma", C: "Tiene determinante igual a 0", D: "Está llena de ceros" },
    pregunta4: { A: "Una matriz identidad", B: "La misma matriz", C: "Una matriz nula", D: "Una matriz diagonal" },
    pregunta5: { A: "El número de columnas", B: "El número de ceros", C: "La cantidad de filas no nulas", D: "La suma de los elementos de la diagonal" }
};

// Limpiar el contenedor antes de añadir las preguntas
const contenedor = document.getElementById("contenedorPreguntas");
contenedor.innerHTML = '';  // Limpiar el contenido antes de agregar nuevas preguntas

// Cargar el JSON de manera estática
const data = {
    "MAT101": {
        "cuestionario1": [
            {
                "dni": "01-9218611",
                "correo": "l.simdre@epsg.upv.es",
                "nombre": "Lief Simants Dredge",
                "fechaEntrega": "2025-05-09T22:00:00",
                "respuestas": {
                    "pregunta1": "B",
                    "pregunta2": "B",
                    "pregunta3": "B",
                    "pregunta4": "C",
                    "pregunta5": "C"
                },
                "nota": 10
            }
        ]
    }
};

// Se toma el primer cuestionario disponible de la asignatura MAT101 (por ejemplo)
const cuestionario = data["MAT101"]?.cuestionario1[0];

// Si no se encuentra un cuestionario, mostramos un mensaje de error
if (!cuestionario) {
    contenedor.innerHTML = "<p>No se ha encontrado el examen para esta asignatura.</p>";
} else {
    // Renderizamos el examen usando las respuestas del cuestionario
    renderExamenCorregido(cuestionario.respuestas, cuestionario.nota);
}

// Función para renderizar el examen corregido
function renderExamenCorregido(respuestas, notaFinal) {
    let puntajeTotal = 0;

    // Iteramos sobre las respuestas correctas y las del examen
    Object.keys(respuestasCorrectas).forEach((clave, idx) => {
        const respuestaCorrecta = respuestasCorrectas[clave];
        const respuestaAlumno = respuestas[clave] || "";
        const esCorrecta = respuestaAlumno === respuestaCorrecta;

        // Generar el HTML para las opciones
        const opcionesHtml = Object.entries(opciones[clave]).map(([letra, texto]) => {
            let clase = "boton-opcion";
            let estiloInline = "";
            if (letra === respuestaCorrecta) {
                clase += " boton-opcion-correcta-deshabilitado color-box";
                estiloInline = 'style="--color: var(--color-exito);"';
            }
            else if (letra === respuestaAlumno) {
                clase += " boton-opcion-incorrecta-deshabilitado color-box";
                estiloInline = 'style="--color: var(--color-inputError);"';
            }
            else clase += " boton-opcion-deshabilitado";

            return `
                <label class="${clase}" ${estiloInline}>
                    <input type="radio" name="${clave}" value="${letra}" disabled ${letra === respuestaAlumno ? "checked" : ""}>
                    <span class="letra">${letra}.</span>
                    <span class="texto">${texto}</span>
                </label>
            `;
        }).join("");

        // Sumar los puntos si la respuesta es correcta
        if (esCorrecta) puntajeTotal += 2;

        // Agregar el HTML de cada pregunta al contenedor
        contenedor.innerHTML += `
            <section class="pregunta" data-puntaje="2">
                <h3>Pregunta ${idx + 1}</h3>
                <p class="parrafo-principal"><strong>${preguntasTexto[clave]}</strong></p>
                <div class="calificacion-pregunta" style="display:flex;">${esCorrecta ? "2/2" : "0/2"} puntos</div>
                <div class="opciones">${opcionesHtml}</div>
            </section>
        `;
    });

    // Mostrar los resultados
    const mensajeExito = document.getElementById("mensajeExito");
    mensajeExito.style.display = "flex";
    mensajeExito.innerHTML = `<span>Calificación:</span> <p class="calificacion">${puntajeTotal}/10</p>`;
}
