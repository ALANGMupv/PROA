const examenSeleccionadoStr = localStorage.getItem('examenSeleccionado');
let examenId = null;  // Declarar fuera del if

if (examenSeleccionadoStr) {
    const examenSeleccionado = JSON.parse(examenSeleccionadoStr);
    examenId = examenSeleccionado?.examen;  // Asignar dentro
} else {
    console.error("No se pudo obtener el examen seleccionado del localStorage");
}

console.log(examenId);

fetch(`../app/obtener-examen.php?examenId=${examenId}`)
    .then(res => res.json())
    .then(data => {
        console.log("Examen ID recibido:", data.examenId);
        console.log("Examen:", data.examen);
        console.log("Preguntas:", data.preguntas);
        renderizarExamenProfesor(data);
    })
    .catch(err => console.error(err));

function renderizarExamenProfesor(data) {
    const examen = data.examen;
    const preguntas = data.preguntas;

    document.getElementById("titulo-examen").textContent = examen.titulo;

    // Formatear fecha
    document.getElementById("fecha-limite-texto").textContent =
        `Fecha límite para completarlo: ${formatearFecha(examen.fechaFin)}`;

    const contenedor = document.getElementById("contenedor-preguntas");

    preguntas.forEach((p, idx) => {
        const opcionesHtml = p.respuestas.map(r => {
            const esCorrecta = r.correcta == 1;
            return ` 
                <label class="boton-opcion ${esCorrecta ? "color-box boton-opcion-correcta-deshabilitado" : "boton-opcion-deshabilitado"}">
                    <input type="radio" name="pregunta${idx + 1}" value="${r.idRespuesta}" disabled ${esCorrecta ? "checked" : ""}>
                    <span class="letra">${r.texto}</span>
                </label>
            `;
        }).join('');

        contenedor.innerHTML += `
            <section class="pregunta">
                <h3>Pregunta ${idx + 1}</h3>
                <p class="parrafo-principal"><strong>${p.enunciado}</strong></p>
                <div class="opciones">${opcionesHtml}</div>
            </section>
        `;
    });
}

// Utilidad para mostrar fecha en formato "5 de mayo de 2025"
function formatearFecha(fechaISO) {
    const date = new Date(fechaISO); // Convierte a objeto Date
    const opciones = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("es-ES", opciones); // Formato español
}
