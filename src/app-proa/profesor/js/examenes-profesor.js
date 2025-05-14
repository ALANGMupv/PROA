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

        seccion.insertAdjacentHTML("beforeend", crearBloque("Éxamenes abiertos", data.realizar, 'abiertos'));
        seccion.insertAdjacentHTML("beforeend", crearBloque("Éxamenes cerrados", data.porRevisar, 'cerrados'));
        seccion.insertAdjacentHTML("beforeend", crearBloque("Éxamenes cerrados y calificados", data.calificados, 'cerrYCal'));
        seccion.insertAdjacentHTML("beforeend", crearBloque("Éxamenes borradores", data.borradores, 'borradores'));

    }

    function crearBloque(titulo, examenes, tipo) {
        if (!examenes || examenes.length === 0) return '';

        let html;
        if (tipo === 'abiertos'){
            html = `<div class="bloque-examenes"><h3>${titulo}</h3>
            <button class="btn-oscuros" onclick="redireccionarPagina()">Crear exámen</button>`;
        } else {
            html = `<div class="bloque-examenes"><h3>${titulo}</h3>`;
        }

        examenes.forEach(ex => {
            if (tipo === 'abiertos') {
                html += `
                <div class="item-examen" data-titulo="${ex.titulo}">
                    <div class="info">
                        <h4>${ex.titulo}</h4>
                        <p class="fecha-envio">Fecha límite: ${ex.fechaLimite}</p>
                        <button class="btn-oscuros-secundario btn-visualizar-entregas">Visualizar entregas</button>
                    </div>
                </div>`;
            }else if (tipo === 'cerrados') {
                html += `
                <div class="item-examen solo-info" data-titulo="${ex.titulo}">
                    <h4>${ex.titulo}</h4>
                    <p class="fecha-envio">Enviado: ${ex.fechaEnvio}</p>
                    <button class="btn-oscuros-secundario btn-visualizar-entregas">Calificar entregas</button>
                </div>`;
            } else if (tipo == 'cerrYCal'){
                html += `
                <div class="item-examen solo-info" data-titulo="${ex.titulo}">
                    <h4>${ex.titulo}</h4>
                    <p class="fecha-envio">Enviado: ${ex.fechaEnvio}</p>
                    <button class="btn-oscuros-secundario btn-visualizar-entregas">Visualizar entregas</button>
                </div>`;
            }else if (tipo === 'borradores') {
                html += `
                <div class="item-examen" data-titulo="${ex.titulo}">
                    <div class="info">
                        <h4>${ex.titulo}</h4>
                        <button class="btn-oscuros-secundario btn-visualizar-entregas">Terminar</button>
                    </div>
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
    window.location.replace("crear-examen-nuevo.html");
}

document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-visualizar-entregas")) {
        window.location.href = "entregas-examen-profesor.html";
        return;
    }

    const item = e.target.closest(".item-examen");
    if (item && item.dataset.titulo) {
        localStorage.setItem("examenSeleccionado", JSON.stringify({
            titulo: item.dataset.titulo
        }));

        // Redirige a la ficha del examen
        window.location.href = "ficha-examen-profesor.html";
    }
});

