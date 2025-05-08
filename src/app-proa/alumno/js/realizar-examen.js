const respuestasCorrectas = {
    pregunta1: "B",
    pregunta2: "B",
    pregunta3: "B",
    pregunta4: "C",
    pregunta5: "C"
};


document.getElementById('formulario-examen').addEventListener('submit', function(e) {
    e.preventDefault(); // evita el envío real del formulario

    const respuestas = {};
    const preguntas = this.querySelectorAll('.pregunta');
    let respuestasCorrectasTotal = 0;
    let puntajeTotal = 0;
    let puntajeMaximo = 0;

    preguntas.forEach((pregunta, index) => {
        const numero = index + 1;
        const clave = `pregunta${numero}`;
        const seleccion = pregunta.querySelector('input[type="radio"]:checked');
        const valor = seleccion ? seleccion.value : null;
        const puntaje = parseInt(pregunta.dataset.puntaje) || 0;
        const divCalificacion = pregunta.querySelector('.calificacion-pregunta');

        respuestas[clave] = valor;

        // Marcar la respuesta correcta y las incorrectas seleccionadas
        const inputs = pregunta.querySelectorAll('input[type="radio"]');
        inputs.forEach((input) => {
            const label = input.closest('label');
            if (!label) return;

            if (input.value === respuestasCorrectas[clave]) {
                // ✅ Correcta
                label.classList.add('color-box');
                label.style.setProperty('--color', 'var(--color-exito)');
                label.classList.add('boton-opcion-correcta-deshabilitado');
            } else if (input.checked) {
                // ❌ Incorrecta seleccionada
                label.classList.add('color-box');
                label.style.setProperty('--color', 'var(--color-inputError)');
                label.classList.add('boton-opcion-incorrecta-deshabilitado');
            }

            // 🔒 Desactivar todos los inputs
            input.disabled = true;
            label.classList.add('boton-opcion-deshabilitado');
        });

        // Contar aciertos y mostrar puntaje por pregunta
        if (valor === respuestasCorrectas[clave]) {
            respuestasCorrectasTotal++;
            puntajeTotal += puntaje;
            if (divCalificacion) {
                divCalificacion.textContent = `${puntaje}/${puntaje} puntos`;
            }
        } else {
            if (divCalificacion) {
                divCalificacion.textContent = `0/${puntaje} puntos`;
            }
        }
        divCalificacion.style.display= `flex`;

        puntajeMaximo += puntaje;
    });


    console.log('Respuestas seleccionadas:', respuestas);

    const mensaje = document.getElementById('mensajeExito');
    mensaje.style.display = 'flex';
    mensaje.innerHTML = `
        <span>Calificación:</span>
        <p class="calificacion">${puntajeTotal}/${puntajeMaximo}</p>`;

    const divbotones = document.getElementById('botones');
    const botones = Array.from(divbotones.children); // ← convierte a array

    botones.forEach((boton) => {
        if (boton.classList.contains('btn-inicial')) {
            boton.style.display = 'none';
        } else {
            boton.style.display = 'block';
        }
    });

});

/*function procesarEnvio() {
    const respuestas = {};
    const preguntas = document.querySelectorAll('#formulario-con-pop-up .pregunta');
    let respuestasCorrectasTotal = 0;
    let puntajeTotal = 0;
    let puntajeMaximo = 0;

    preguntas.forEach((pregunta, index) => {
        const numero = index + 1;
        const clave = `pregunta${numero}`;
        const seleccion = pregunta.querySelector('input[type="radio"]:checked');
        const valor = seleccion ? seleccion.value : null;
        const puntaje = parseInt(pregunta.dataset.puntaje) || 0;
        const divCalificacion = pregunta.querySelector('.calificacion-pregunta');

        respuestas[clave] = valor;

        const inputs = pregunta.querySelectorAll('input[type="radio"]');
        inputs.forEach((input) => {
            const label = input.closest('label');
            if (!label) return;

            if (input.value === respuestasCorrectas[clave]) {
                label.classList.add('color-box');
                label.style.setProperty('--color', 'var(--color-exito)');
                label.classList.add('boton-opcion-correcta-deshabilitado');
            } else if (input.checked) {
                label.classList.add('color-box');
                label.style.setProperty('--color', 'var(--color-inputError)');
                label.classList.add('boton-opcion-incorrecta-deshabilitado');
            }

            input.disabled = true;
            label.classList.add('boton-opcion-deshabilitado');
        });

        if (valor === respuestasCorrectas[clave]) {
            respuestasCorrectasTotal++;
            puntajeTotal += puntaje;
            if (divCalificacion) {
                divCalificacion.textContent = `${puntaje}/${puntaje} puntos`;
            }
        } else {
            if (divCalificacion) {
                divCalificacion.textContent = `0/${puntaje} puntos`;
            }
        }
        divCalificacion.style.display = `flex`;

        puntajeMaximo += puntaje;
    });

    console.log('Respuestas seleccionadas:', respuestas);

    const mensaje = document.getElementById('mensajeExito');
    mensaje.style.display = 'flex';
    mensaje.innerHTML = `
        <span>Calificación:</span>
        <p class="calificacion">${puntajeTotal}/${puntajeMaximo}</p>`;

    const botonesContainer = document.getElementById('botones');
    const botones = Array.from(botonesContainer.children);

    botones.forEach((boton) => {
        if (boton.classList.contains('btn-inicial')) {
            boton.style.display = 'none';
        } else {
            boton.style.display = 'block';
        }
    });
}
*/

function irAtras(){
    window.history.back();
}


