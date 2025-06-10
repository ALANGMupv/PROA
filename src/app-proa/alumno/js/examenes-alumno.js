document.addEventListener("DOMContentLoaded", async () => {
    const asignaturaSeleccionada = JSON.parse(document.getElementById('asignaturaSeleccionada').dataset.asignatura);
    const codigo = asignaturaSeleccionada?.codigoAsignatura;

    if (!codigo) {
        mostrarAviso("No se ha proporcionado un código de asignatura.");
        return;
    }

    try {
        const res = await fetch(`../app/ver_examenes.php?codigo=${encodeURIComponent(codigo)}`);
        if (!res.ok) throw new Error("Error en la respuesta del servidor");

        const data = await res.json();

        if (data.error) {
            mostrarAviso(data.error);
            return;
        }

        if (data.realizar?.length > 0 || data.porRevisar?.length > 0 || data.calificados?.length > 0) {
            renderExamenes(data);
        } else {
            mostrarAviso("No hay exámenes disponibles para esta asignatura.");
        }
    } catch (err) {
        console.error(err);
        mostrarAviso("Error al cargar exámenes.");
    }
});

function renderExamenes(data) {
    const seccion = document.querySelector(".fondoPanel");
    seccion.querySelectorAll(".bloque-examenes").forEach(b => b.remove());

    seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes a realizar", data.realizar, 'realizar'));
    seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes por revisar", data.porRevisar, 'porRevisar'));
    seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes calificados", data.calificados, 'calificados'));

    document.querySelectorAll(".item-examen-realizar .btn").forEach(el => {
        el.addEventListener("click", redireccionarPagina);
    });

    document.querySelectorAll(".item-examen-calificado").forEach(el => {
        el.addEventListener("click", () => {
            const cuestionario = el.dataset.cuestionario;
            localStorage.setItem("cuestionarioSeleccionado", cuestionario);
            window.location.href = "examenes-realizados.php";
        });
    });
}

function crearBloque(titulo, examenes, tipo) {
    if (!examenes || examenes.length === 0) return '';
    let html = `<div class="bloque-examenes"><h3>${titulo}</h3>`;

    const fechaFijaEnvio = "2025-05-30 12:00:00";

    examenes.forEach(ex => {
        const fechaLimite = ex.fechaFin;
        const fechaEnvio = fechaFijaEnvio;

        if (tipo === 'realizar') {
            html += `
            <div class="item-examen item-examen-realizar">
                <div class="info">
                    <h4>${ex.titulo}</h4>
                    <p class="fecha-limite">
                        <img src="../icons/advertenciaFecha.svg" class="icono-fecha" alt="Icono advertencia">
                        Fecha límite: ${fechaLimite}
                    </p>
                </div>
                <button class="btn">Comenzar</button>
            </div>`;
        } else if (tipo === 'porRevisar') {
            html += `
            <div class="item-examen solo-info">
                <h4>${ex.titulo}</h4>
                <p class="fecha-envio">Enviado: ${fechaEnvio}</p>
            </div>`;
        } else if (tipo === 'calificados') {
            const nota = ex.notaExamenAlumno !== null ? `${ex.notaExamenAlumno}/10` : '—';
            html += `
            <div class="item-examen item-examen-calificado" data-cuestionario="${ex.titulo}">
                <div class="info">
                    <h4>${ex.titulo}</h4>
                    <p class="fecha-envio">Enviado: ${fechaEnvio}</p>
                </div>
                <span class="nota">${nota}</span>
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

function redireccionarPagina() {
    console.log("Redirigiendo al examen...");
    window.location.href = "realizar-examen.php";
}
