document.addEventListener("DOMContentLoaded", () => {
    const asignatura = JSON.parse(localStorage.getItem("asignaturaSeleccionada"));
    const codigo = asignatura?.codigo || "PRO303";  // Aquí se obtiene el código de la asignatura seleccionada

    let entregasOriginales = []; // Almacenará las entregas de los estudiantes

    // Fetch al backend para obtener las entregas de los exámenes
    fetch(`../app/ver-entregas-examen-profesor.php?codigoAsignatura=${encodeURIComponent(codigo)}`)
        .then(res => res.json())
        .then(data => {
            entregasOriginales = data.entregas || [];
            renderLista(entregasOriginales);  // Renderiza la lista de entregas
        })
        .catch(err => {
            console.error(err);
            mostrarError("Error al cargar las entregas.");
        });

    document.getElementById("filtroTexto").addEventListener("input", (e) => {
        const texto = e.target.value.toLowerCase();
        const entregasFiltradas = entregasOriginales.filter(entrega =>
            entrega.nombre.toLowerCase().includes(texto)
        );
        renderLista(entregasFiltradas);  // Filtra las entregas por nombre
    });

    function renderLista(entregas) {
        const lista = document.getElementById("lista-alumnos");
        lista.innerHTML = "";

        entregas.forEach(entrega => {
            const div = document.createElement("div");
            div.classList.add("alumno-item");
            div.innerHTML = `<strong>${entrega.nombre}</strong><p>Nota: ${entrega.nota}/10</p>`;

            div.addEventListener("click", () => {
                document.querySelectorAll(".alumno-item").forEach(item => {
                    item.classList.remove("activo");
                });

                div.classList.add("activo");  // Marca el alumno seleccionado
                renderDetalle(entrega);  // Muestra los detalles de la entrega
            });

            lista.appendChild(div);
        });
    }

    function renderDetalle(entrega) {
        const container = document.getElementById("detalle-entrega");

        container.innerHTML = `
        <section class="encabezado">
            <h2>${entrega.nombre}</h2>
            <button id="btn-volver2" class="btn-oscuros btn-atras">Atrás</button>
        </section>
        <p>Calificación: ${entrega.nota}/10</p>
        <hr class="separador" />
        ${renderPreguntas(entrega.respuestas)}
    `;

        document.getElementById("btn-volver2").addEventListener("click", () => {
            container.innerHTML = `<p>Selecciona un alumno para ver su entrega.</p>`;
            document.querySelectorAll(".alumno-item").forEach(item => item.classList.remove("activo"));
        });
    }

    function renderPreguntas(respuestas) {
        return respuestas.map((respuesta, index) => {
            return `
            <section class="pregunta">
                <h3>Pregunta ${index + 1}</h3>
                <p class="parrafo-principal"><strong>${respuesta.enunciado}</strong></p>
                <div class="calificacion-pregunta">${respuesta.correcta ? "2/2 puntos" : "0/2 puntos"}</div>
                <div class="opciones">
                    ${["A", "B", "C", "D"].map(letra => {
                const checked = letra === respuesta.respuestaAlumno ? "checked" : "";
                const clase = letra === respuesta.correcta
                    ? "color-box boton-opcion-correcta-deshabilitado"
                    : letra === respuesta.respuestaAlumno
                        ? "color-box boton-opcion-incorrecta-deshabilitado"
                        : "boton-opcion-deshabilitado";

                return `
                        <label class="boton-opcion ${clase}">
                            <input type="radio" name="pregunta${index + 1}" value="${letra}" disabled ${checked}>
                            <span class="letra">${letra}.</span>
                            <span class="texto">${respuesta.opciones[letra]}</span>
                        </label>`;
            }).join("")}
                </div>
            </section>`;
        }).join("");
    }

    function mostrarError(mensaje) {
        document.getElementById('contenedorPreguntas').innerHTML = `<p>${mensaje}</p>`;
    }
});
