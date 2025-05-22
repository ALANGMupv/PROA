document.addEventListener("DOMContentLoaded", () => {
    const asignaturaSeleccionada = JSON.parse(localStorage.getItem('asignaturaSeleccionada'));

    fetch("../../api/data/examenes-alumno.json")
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

        seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes abiertos", data.realizar, 'abiertos'));
        seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes cerrados", data.calificados, 'cerrados'));
        seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes borradores", data.borradores, 'borradores'));

    }

    function crearBloque(titulo, examenes, tipo) {
        if (!examenes || examenes.length === 0) return '';

        let html;
        if (tipo === 'abiertos'){
            html = `<div class="bloque-examenes"><h3>${titulo}</h3>
            <button class="btn-oscuros" id="btn-crear" onclick="redireccionarPagina()">Crear examen</button>`;
        } else {
            html = `<div class="bloque-examenes"><h3>${titulo}</h3>`;
        }

        examenes.forEach(ex => {
            if (tipo === 'abiertos') {
                html += `
                <div class="item-examen item-examen-realizar" data-titulo="${ex.titulo}">
                    <div class="info">
                        <div class="titulo-fecha-envio">
                            <h4>${ex.titulo}</h4>
                            <div class="icono-item">
                                <img src="../icons/advertencia.svg" alt="advertencia">
                                <p class="fecha-envio">Fecha límite: ${ex.fechaLimite}</p>
                            </div>
                            <div class="icono-item">
                                <img src="../icons/pesoExamen.svg" alt="advertencia">
                                <p class="fecha-envio">Peso: ${ex.peso}</p>
                            </div>  
                        </div>  
                                              
                        <button class="btn-oscuros-secundario btn-visualizar-entregas">Visualizar entregas</button>
                    </div>
                </div>`;
            } else if (tipo == 'cerrados'){
                html += `
                <div class="item-examen" data-titulo="${ex.titulo}">
                    <div class="info">
                        <div class="titulo-fecha-envio">
                            <h4>${ex.titulo}</h4>
                            <div class="icono-item">
                                <img src="../icons/advertencia.svg" alt="advertencia"><p class="fecha-envio">Fecha límite: ${ex.fechaLimite}</p>
                            </div>
                            <div class="icono-item">
                                <img src="../icons/pesoExamen.svg" alt="advertencia"><p class="fecha-envio">Peso: ${ex.peso}</p>
                            </div>  
                        </div>  
                                              
                        <button class="btn-oscuros-secundario btn-visualizar-entregas">Visualizar entregas</button>
                    </div>
                </div>`;
            }else if (tipo === 'borradores') {
                html += `
                <div class="item-examen" data-titulo="${ex.titulo}">
                    <div class="info">
                        <h4>${ex.titulo}</h4>
                        <button class="btn-oscuros-secundario btn-visualizar-entregas btn-terminar">Continuar</button>
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
    if (e.target.closest(".btn-terminar")) {
        window.location.href = "crear-examen-borrador.html";
        return;
    } else if(e.target.closest(".btn-visualizar-entregas")){
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