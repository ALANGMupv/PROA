document.addEventListener("DOMContentLoaded", async () => {
    const asignaturaSeleccionada = JSON.parse(document.getElementById('asignaturaSeleccionada').dataset.asignatura);

    // Verifica si el código de la asignatura está presente
    const codigo = asignaturaSeleccionada?.codigo;

    if (!codigo) {
        mostrarAviso("No se ha proporcionado un código de asignatura.");
        return;
    }

    try {
        const res = await fetch(`../app/ver_examenes.php?codigo=${encodeURIComponent(codigo)}`);
        if (!res.ok) throw new Error("Error en la respuesta del servidor");

        const data = await res.json();

        if (data && (data.realizar.length > 0 || data.porRevisar.length > 0 || data.calificados.length > 0)) {
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

    // Limpiar bloques anteriores
    seccion.querySelectorAll(".bloque-examenes").forEach(b => b.remove());

    // Insertar bloques con los exámenes
    seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes a realizar", data.realizar, 'realizar'));
    seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes por revisar", data.porRevisar, 'porRevisar'));
    seccion.insertAdjacentHTML("beforeend", crearBloque("Exámenes calificados", data.calificados, 'calificados'));

    // Agregar event listeners a los botones "Comenzar"
    document.querySelectorAll(".item-examen-realizar .btn").forEach(el => {
        el.addEventListener("click", redireccionarPagina); // Usamos el event listener
    });

    // Activar clic en exámenes calificados (después de insertarlos)
    document.querySelectorAll(".item-examen-calificado").forEach(el => {
        el.addEventListener("click", () => {
            const cuestionario = el.dataset.cuestionario; // ej: "cuestionario1"
            localStorage.setItem("cuestionarioSeleccionado", cuestionario);
            window.location.href = "examenes-realizados.php";
        });
    });
}

function crearBloque(titulo, examenes, tipo) {
    if (!examenes || examenes.length === 0) return '';

    let html = `<div class="bloque-examenes"><h3>${titulo}</h3>`;

    // Definir una fecha fija para "fechaEnvio"
    const fechaFijaEnvio = "2025-05-30 12:00:00"; // Fecha fija de ejemplo
    const notaFija = 9; // Nota fija de 9/10

    examenes.forEach(ex => {
        // Mostrar la fecha limite correctamente
        const fechaLimite = ex.fechaFin;  // Aseguramos que se está usando 'fechaFin' de la base de datos
        const fechaEnvio = fechaFijaEnvio; // Usamos la fecha fija para todos los exámenes

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
                <button class="btn" onclick="redirigirPagina()">Comenzar</button>
            </div>`;
        } else if (tipo === 'porRevisar') {
            html += `
            <div class="item-examen solo-info">
                <h4>${ex.titulo}</h4>
                <p class="fecha-envio">Enviado: ${fechaEnvio}</p> <!-- Usamos la fecha fija -->
            </div>`;
        } else if (tipo === 'calificados') {
            html += `
            <div class="item-examen item-examen-calificado" data-cuestionario="${ex.titulo}">
                <div class="info">
                    <h4>${ex.titulo}</h4>
                    <p class="fecha-envio">Enviado: ${fechaEnvio}</p> <!-- Usamos la fecha fija -->
                </div>
                <span class="nota">${notaFija}/10</span> <!-- Nota fija de 9/10 -->
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