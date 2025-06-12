const idExamen = localStorage.getItem("cuestionarioSeleccionado");

if (!idExamen || isNaN(idExamen)) {
    mostrarError("Examen no válido o no seleccionado.");
} else {
    fetch(`../app/ver-examen-realizado.php?idExamen=${encodeURIComponent(idExamen)}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) return mostrarError(data.error);
            renderizarExamenCorregido(data);
        })
        .catch(err => {
            console.error(err);
            mostrarError("Error al cargar el examen.");
        });
}

function mostrarError(mensaje) {
    document.getElementById('contenedorPreguntas').innerHTML = `<p>${mensaje}</p>`;
}

function renderizarExamenCorregido(data) {
    const examen = data.examen;
    const preguntas = data.preguntas;

    document.querySelector(".titulo h1").textContent = examen.titulo;

    let puntajeTotal = 0;
    let puntajeMaximo = 0;
    const contenedor = document.getElementById("contenedorPreguntas");

    preguntas.forEach((p, idx) => {
        const idRespuestaAlumno = p.respuestaAlumno;
        const opcionesHtml = p.respuestas.map(r => {
            const esCorrecta = r.correcta == 1;
            const esSeleccionada = r.idRespuesta == idRespuestaAlumno;

            let clase = "boton-opcion";
            let estilo = "";

            if (esCorrecta) {
                clase += " boton-opcion-correcta-deshabilitado color-box";
                estilo = '--color: var(--color-exito);';
            } else if (esSeleccionada) {
                clase += " boton-opcion-incorrecta-deshabilitado color-box";
                estilo = '--color: var(--color-inputError);';
            } else {
                clase += " boton-opcion-deshabilitado";
            }

            return `
                <label class="${clase}" style="${estilo}">
                    <input type="radio" disabled ${esSeleccionada ? "checked" : ""}>
                    <span class="letra"></span>
                    <span class="texto">${r.texto}</span>
                </label>
            `;
        }).join('');

        const obtuvoPuntos = p.respuestas.some(r => r.correcta == 1 && r.idRespuesta == idRespuestaAlumno);
        const puntos = obtuvoPuntos ? p.valor : 0;
        puntajeTotal += puntos;
        puntajeMaximo += parseInt(p.valor);

        contenedor.innerHTML += `
            <section class="pregunta" data-puntaje="${p.valor}">
                <h3>Pregunta ${idx + 1}</h3>
                <p class="parrafo-principal"><strong>${p.enunciado}</strong></p>
                <div class="calificacion-pregunta" style="display:flex;">${puntos}/${p.valor} puntos</div>
                <div class="opciones">${opcionesHtml}</div>
            </section>
        `;
    });

    const mensajeExito = document.getElementById("mensajeExito");
    mensajeExito.style.display = "flex";
    mensajeExito.innerHTML = `<span>Calificación:</span><p class="calificacion">${puntajeTotal}/${puntajeMaximo}</p>`;
}
