const idExamen = document.getElementById('formulario-examen').dataset.idExamen;

fetch(`../app/get-examen.php?idExamen=${idExamen}`)
    .then(res => res.json())
    .then(data => {
        if (data.error) return alert(data.error);

        document.getElementById('tituloExamen').textContent = data.examen.titulo;
        document.getElementById('descripcionExamen').textContent = data.examen.descripcion;
        document.getElementById('fechaLimite').textContent = new Date(data.examen.fechaFin).toLocaleString();

        const contenedor = document.getElementById('contenedorPreguntas');
        data.preguntas.forEach((pregunta, index) => {
            const section = document.createElement('section');
            section.className = 'pregunta';
            section.dataset.puntaje = pregunta.valor;

            section.innerHTML = `
                <h3>Pregunta ${index + 1}</h3>
                <p class="parrafo-principal"><strong>${pregunta.enunciado}</strong></p>
                <div class="calificacion-pregunta"></div>
                <div class="opciones">
                    ${pregunta.respuestas.map((r, i) => `
                        <label class="boton-opcion">
                            <input type="radio" name="pregunta${pregunta.idPregunta}" value="${r.idRespuesta}" data-correcta="${r.correcta}">
                            <span class="letra">${String.fromCharCode(65 + i)}.</span>
                            <span class="texto">${r.texto}</span>
                        </label>
                    `).join('')}
                </div>
            `;
            contenedor.appendChild(section);
        });
    });

// Función que procesa y envía el examen
function enviarExamen() {
    const formulario = document.getElementById('formulario-examen');
    const preguntas = formulario.querySelectorAll('.pregunta');
    let puntajeTotal = 0;
    let puntajeMaximo = 0;
    const respuestasAlumno = [];

    preguntas.forEach((pregunta) => {
        const puntaje = parseInt(pregunta.dataset.puntaje);
        puntajeMaximo += puntaje;
        const respuestaSeleccionada = pregunta.querySelector('input[type="radio"]:checked');
        const idRespuesta = respuestaSeleccionada ? respuestaSeleccionada.value : null;
        const esCorrecta = respuestaSeleccionada?.dataset.correcta === "1";

        const divCalificacion = pregunta.querySelector('.calificacion-pregunta');
        divCalificacion.textContent = esCorrecta ? `${puntaje}/${puntaje} puntos` : `0/${puntaje} puntos`;
        divCalificacion.style.display = 'flex';

        if (esCorrecta) puntajeTotal += puntaje;

        respuestasAlumno.push({
            idPregunta: pregunta.querySelector('input').name.replace('pregunta', ''),
            idRespuesta
        });

        pregunta.querySelectorAll('input[type="radio"]').forEach(input => {
            const label = input.closest('label');
            label.classList.add('boton-opcion-deshabilitado');
            input.disabled = true;

            if (input.dataset.correcta === "1") {
                label.classList.add('color-box');
                label.style.setProperty('--color', 'var(--color-exito)');
                label.classList.add('boton-opcion-correcta-deshabilitado');
            } else if (input.checked) {
                label.classList.add('color-box');
                label.style.setProperty('--color', 'var(--color-inputError)');
                label.classList.add('boton-opcion-incorrecta-deshabilitado');
            }
        });
    });

    document.getElementById('mensajeExito').style.display = 'flex';
    document.getElementById('mensajeExito').innerHTML = `<span>Calificación:</span><p class="calificacion">${puntajeTotal}/${puntajeMaximo}</p>`;
    document.querySelectorAll('.btn-inicial').forEach(btn => btn.style.display = 'none');

    // Guardar nota
    fetch('../app/guardar-calificacion.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idExamen, puntajeTotal, puntajeMaximo })
    });

    // Guardar respuestas seleccionadas
    fetch('../app/guardar-respuestas.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idExamen, respuestasAlumno })
    });

    // Ocultar popup
    document.getElementById('popup-confirmacion').style.display = 'none';
}

// Botón "Enviar" → mostrar popup
document.getElementById('botonEnviar').addEventListener('click', () => {
    document.getElementById('popup-confirmacion').style.display = 'flex';
});

// Popup de envío → cancelar
document.getElementById('popup-cancelar').addEventListener('click', () => {
    document.getElementById('popup-confirmacion').style.display = 'none';
});

// Popup de envío → confirmar
document.getElementById('popup-enviar-confirmado').addEventListener('click', () => {
    enviarExamen();
});

// Botón Cancelar → mostrar popup de cancelar
document.getElementById('botonCancelar').addEventListener('click', () => {
    document.getElementById('popup-volver-cancelar').style.display = 'flex';
});

// Popup cancelar → quedarse
document.getElementById('popup-volver-cancelar-no').addEventListener('click', () => {
    document.getElementById('popup-volver-cancelar').style.display = 'none';
});

// Popup cancelar → salir sin guardar
document.getElementById('popup-volver-cancelar-si').addEventListener('click', () => {
    window.location.href = 'examenes-alumno.php';
});
