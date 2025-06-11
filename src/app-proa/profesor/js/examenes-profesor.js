async function cargarExamenesProfesor() {
    const asignaturaSeleccionada = JSON.parse(localStorage.getItem('asignaturaSeleccionada'));
    const codigo = asignaturaSeleccionada?.codigo ?? asignaturaSeleccionada?.codigoAsignatura;

    if (!codigo) {
        mostrarAviso("No hay asignatura seleccionada.");
        return;
    }

    try {
        const res = await fetch(`../app/obtener-examenes.php?codigo=${encodeURIComponent(codigo)}`);
        if (!res.ok) throw new Error("Error en la respuesta del servidor");

        const data = await res.json();

        // Mantenemos tu condición original
        if (data && (data.abiertos || data.calificados || data.borradores)) {
            renderExamenes(data);
        } else {
            mostrarAviso("No hay exámenes disponibles para esta asignatura.");
        }
    } catch (err) {
        console.error(err);
        mostrarAviso("Error al cargar exámenes.");
    }
}

// Ejecutar directamente si el script tiene defer
cargarExamenesProfesor();

function renderExamenes(data) {
    const seccion = document.querySelector(".fondoPanel");

    seccion.querySelectorAll(".bloque-examenes").forEach(b => b.remove());

    seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes abiertos", data.abiertos ?? data.realizar, 'abiertos'));
    seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes cerrados", data.cerrados ?? data.porRevisar, 'cerrados'));
    seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes borradores", data.borradores, 'borradores'));
}

function crearBloque(titulo, examenes, tipo) {
    if (!examenes || examenes.length === 0) return '';

    let html = `<div class="bloque-examenes"><h3>${titulo}</h3>`;

    examenes.forEach(ex => {
        if (tipo === 'abiertos') {
            html += `
                <div class="item-examen item-examen-realizar" data-titulo="${ex.titulo}" data-examen="${ex.id}">
                    <div class="info">
                        <div class="titulo-fecha-envio">
                            <h4>${ex.titulo}</h4>
                            <div class="icono-item">
                                <img src="../icons/advertencia.svg" alt="advertencia">
                                <p class="fecha-envio">Fecha límite: ${ex.fechaLimite}</p>
                            </div>
                            <div class="icono-item">
                                <img src="../icons/pesoExamen.svg" alt="peso">
                                <p class="fecha-envio">Peso: ${ex.peso}</p>
                            </div>  
                        </div>  
                        <button class="btn-oscuros-secundario btn-visualizar-entregas">Visualizar entregas</button>
                    </div>
                </div>`;
        } else if (tipo === 'cerrados') {
            html += `
                <div class="item-examen" data-titulo="${ex.titulo}" data-examen="${ex.id}">
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
        } else if (tipo === 'borradores') {
            html += `
                <div class="item-examen" data-titulo="${ex.titulo}" data-examen="${ex.id}">
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
function redireccionarPagina(){
    window.location.replace("crear-examen-nuevo.php");
}

document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-terminar")) {
        window.location.href = "crear-examen-borrador.php";
        return;
    } else if(e.target.closest(".btn-visualizar-entregas")){
        window.location.href = "entregas-examen-profesor.php";
        return;
    }

    const item = e.target.closest(".item-examen");
    if (item && item.dataset.titulo) {
        localStorage.setItem("examenSeleccionado", JSON.stringify({
            titulo: item.dataset.titulo,
            examen: item.dataset.examen,
        }));

        // Redirige a la ficha del examen
        window.location.href = "ficha-examen-profesor.php";
    }
});
