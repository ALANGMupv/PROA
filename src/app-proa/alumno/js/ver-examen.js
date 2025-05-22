const respuestasCorrectas = {
    pregunta1: "B",
    pregunta2: "B",
    pregunta3: "B",
    pregunta4: "C",
    pregunta5: "C"
};

const preguntasTexto = {
    pregunta1: "¿Qué condición debe cumplir una matriz cuadrada para que tenga inversa?",
    pregunta2: "¿Cuál es el resultado de multiplicar una matriz A de orden 2×3 por una matriz B de orden 3×2?",
    pregunta3: "¿Qué propiedad tiene una matriz simétrica?",
    pregunta4: "¿Cuál es el resultado del producto de cualquier matriz por una matriz nula del mismo tamaño compatible?",
    pregunta5: "El rango de una matriz es:"
};

const opciones = {
    pregunta1: { A: "Ser semántica", B: "Tener determinante distinto de cero", C: "Ser triangular", D: "Tener todos sus elementos positivos" },
    pregunta2: { A: "Una matriz 3x3", B: "Una matriz 2x2", C: "Una matriz 2x3", D: "No se puede multiplicar" },
    pregunta3: { A: "Tiene sólo valores negativos", B: "Su traspuesta es igual a ella misma", C: "Tiene determinante igual a 0", D: "Está llena de ceros" },
    pregunta4: { A: "Una matriz identidad", B: "La misma matriz", C: "Una matriz nula", D: "Una matriz diagonal" },
    pregunta5: { A: "El número de columnas", B: "El número de ceros", C: "La cantidad de filas no nulas", D: "La suma de los elementos de la diagonal" }
};

const usuario = JSON.parse(localStorage.getItem("usuario"));
const asignatura = JSON.parse(localStorage.getItem("asignaturaSeleccionada"));

if (!usuario || !asignatura) {
    document.getElementById("panelRealizarExamen").innerHTML = "<p>Error: falta usuario o asignatura</p>";
} else {
    fetch("../../api/data/entregas-examenes.json")
        .then(res => res.json())
        .then(data => {
            const examen = data[asignatura.codigo]?.cuestionario1?.find(e => e.correo === usuario.correo);
            if (!examen) {
                document.getElementById("panelRealizarExamen").innerHTML = "<p>No has realizado este examen.</p>";
                return;
            }

            renderExamenCorregido(examen.respuestas, examen.nota);
        })
        .catch(() => {
            document.getElementById("panelRealizarExamen").innerHTML = "<p>Error al cargar los datos del examen.</p>";
        });
}

function renderExamenCorregido(respuestas, notaFinal) {
    const contenedor = document.getElementById("contenedorPreguntas");
    let puntajeTotal = 0;

    Object.keys(respuestasCorrectas).forEach((clave, idx) => {
        const respuestaCorrecta = respuestasCorrectas[clave];
        const respuestaAlumno = respuestas[clave] || "";
        const esCorrecta = respuestaAlumno === respuestaCorrecta;

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

        if (esCorrecta) puntajeTotal += 2;

        contenedor.innerHTML += `
      <section class="pregunta" data-puntaje="2">
        <h3>Pregunta ${idx + 1}</h3>
        <p class="parrafo-principal"><strong>${preguntasTexto[clave]}</strong></p>
        <div class="calificacion-pregunta" style="display:flex;">${esCorrecta ? "2/2" : "0/2"} puntos</div>
        <div class="opciones">${opcionesHtml}</div>
      </section>
    `;
    });

    document.getElementById("mensajeExito").style.display = "flex";
    document.getElementById("mensajeExito").innerHTML = `<span>Calificación:</span> <p class="calificacion">${puntajeTotal}/10</p>`;
}