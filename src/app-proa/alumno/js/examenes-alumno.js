document.addEventListener("DOMContentLoaded", () => {
    const asignaturaSeleccionada = JSON.parse(localStorage.getItem('asignaturaSeleccionada'));

    fetch("/src/api/data/examenes-alumno.json")
        .then(res => res.json())
        .then(data => {
            const codigo = asignaturaSeleccionada?.codigo; // ejemplo: "PRO303"
            const examenes = data[codigo];

            if (examenes) {
                renderExamenes(examenes);
            } else {
                console.warn("No hay exámenes para esta asignatura");
                mostrarAviso("No hay exámenes disponibles para esta asignatura.");
            }
        })
        .catch(err => {
            console.error("Error al cargar exámenes:", err);
            mostrarAviso("Error al cargar exámenes.");
        });

    function renderExamenes(data) {
        const seccion = document.querySelector(".fondoPanel");

        seccion.querySelectorAll(".bloque-examenes").forEach(b => b.remove());

        seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes a realizar", data.realizar, 'realizar'));
        seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes por revisar", data.porRevisar, 'porRevisar'));
        seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes calificados", data.calificados, 'calificados'));
    }

    function crearBloque(titulo, examenes, tipo) {
        if (!examenes || examenes.length === 0) return '';

        let html = `<div class="bloque-examenes"><h3>${titulo}</h3>`;

        examenes.forEach(ex => {
            if (tipo === 'realizar') {
                html += `
                <div class="item-examen item-examen-realizar">
                    <div class="info">
                        <h4>${ex.titulo}</h4>
                        <p class="fecha-limite">Fecha límite: ${ex.fechaLimite}</p>
                    </div>
                    <button class="btn" onclick="redireccionarPagina()">Comenzar</button>
                </div>`;
            } else if (tipo === 'porRevisar') {
                html += `
                <div class="item-examen solo-info">
                    <h4>${ex.titulo}</h4>
                    <p class="fecha-envio">Enviado: ${ex.fechaEnvio}</p>
                </div>`;
            } else if (tipo === 'calificados') {
                html += `
                <div class="item-examen">
                    <div class="info">
                        <h4>${ex.titulo}</h4>
                        <p class="fecha-envio">Enviado: ${ex.fechaEnvio}</p>
                    </div>
                    <span class="nota">${ex.nota}</span>
                </div>`;
            }
        });

        html += `</div>`;
        return html;
    }

    function mostrarAviso(mensaje) {
        const seccion = document.querySelector(".fondoPanel");
        seccion.insertAdjacentHTML("beforeend", `<p>${mensaje}</p>`);
    }
});

function redireccionarPagina(){
    window.location.replace("realizar-examen.html");
}
