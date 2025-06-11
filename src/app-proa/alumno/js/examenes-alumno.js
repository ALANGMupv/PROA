(async () => {
    const divDatos = document.getElementById('asignaturaSeleccionada');
    let asignaturaSeleccionada = null;

    // Si no existe el div o está vacío, usar localStorage
    if (!divDatos || !divDatos.dataset.asignatura || divDatos.dataset.asignatura === "null") {
        const local = localStorage.getItem("asignaturaSeleccionada");
        if (local) {
            try {
                asignaturaSeleccionada = JSON.parse(local);
                // Guardar en sesión PHP
                await fetch("../app/guardar-asignatura-sesion.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(asignaturaSeleccionada)
                });
            } catch (e) {
                console.error("Error guardando asignatura en sesión:", e);
                mostrarAviso("Error al seleccionar la asignatura.");
                return;
            }
        } else {
            mostrarAviso("No se ha proporcionado una asignatura válida.");
            return;
        }
    } else {
        asignaturaSeleccionada = JSON.parse(divDatos.dataset.asignatura);
    }

    const codigo = asignaturaSeleccionada?.codigoAsignatura;
    if (!codigo) {
        mostrarAviso("No se ha proporcionado un código de asignatura.");
        return;
    }

    try {
        const res = await fetch(`../app/ver_examenes.php?codigo=${encodeURIComponent(codigo)}`);
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
})();

function renderExamenes(data) {
    const seccion = document.querySelector(".fondoPanel");
    seccion.querySelectorAll(".bloque-examenes").forEach(b => b.remove());

    seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes a realizar", data.realizar, 'realizar'));
    seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes en revisión", data.porRevisar, 'porRevisar'));
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
        <button class="btn" data-id="${ex.idExamen}">Comenzar</button>
    </div>`;
        } else if (tipo === 'porRevisar') {
            html += `
    <div class="item-examen solo-info">
        <h4>${ex.titulo}</h4>
        <p class="fecha-envio">Enviado: ${fechaEnvio}</p>
    </div>`;
        } else if (tipo === 'calificados') {
            const nota = (ex.notaExamenAlumno !== null)
                ? `${ex.notaExamenAlumno}/${ex.valorExamen ?? ex.puntosExamen}`
                : '—';
            html += `
    <div class="item-examen item-examen-calificado" data-cuestionario="${ex.idExamen}">
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

function redireccionarPagina(e) {
    const idExamen = e.currentTarget.dataset.id;
    if (!idExamen) {
        alert("No se pudo determinar el ID del examen.");
        return;
    }
    window.location.href = `realizar-examen.php?idExamen=${idExamen}`;
}
