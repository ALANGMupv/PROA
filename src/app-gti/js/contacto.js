// Añadimos un listener al formulario de contacto solo si existe en el DOM
document.querySelector('.formulario-contacto')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que se envíe el formulario y recargue la página

    const formulario = this;
    let formularioValido = true;

    // Seleccionamos todos los campos del formulario (inputs, selects y textarea)
    const campos = formulario.querySelectorAll('input, select, textarea');

    // Expresión regular para validar correos electrónicos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Eliminamos cualquier mensaje de error anterior que haya en el formulario
    formulario.querySelectorAll('label small').forEach(el => el.remove());

    // Función para mostrar un mensaje de error debajo de una etiqueta <label>
    function mostrarError(campo, mensaje) {
        const label = formulario.querySelector(`label[for="${campo.id}"]`);
        if (label) {
            const small = document.createElement('small');
            small.textContent = mensaje;
            small.classList.add('error-texto');
            label.appendChild(small); // Insertamos el mensaje justo debajo de la etiqueta
        }
        formularioValido = false; // Marcamos que hay errores en el formulario
    }

    // Recorremos todos los campos del formulario para validarlos uno a uno
    campos.forEach(campo => {
        const valor = campo.value.trim(); // Quitamos espacios en blanco

        // Validamos si el campo está vacío (para inputs y textarea)
        if ((campo.tagName === 'INPUT' || campo.tagName === 'TEXTAREA') && valor === '') {
            mostrarError(campo, 'Campo obligatorio');
            return;
        }

        // Validamos si no se ha seleccionado una opción en el select
        if (campo.tagName === 'SELECT' && (campo.selectedIndex === 0 || campo.value === '')) {
            mostrarError(campo, 'Campo obligatorio');
            return;
        }

        // Validación de nombre y apellidos
        if (campo.id === 'nombre' && valor.length < 2) {
            mostrarError(campo, 'Introduce tu nombre');
        }

        if (campo.id === 'apellidos' && valor.length < 2) {
            mostrarError(campo, 'Introduce tus apellidos');
        }

        // Validación de formato de correo electrónico
        if (campo.id === 'email' && valor !== '' && !emailRegex.test(valor)) {
            mostrarError(campo, 'Correo inválido');
        }

        // Validación de longitud mínima del mensaje
        if (campo.id === 'mensaje' && valor.length < 10) {
            mostrarError(campo, 'El mensaje debe tener al menos 10 caracteres');
        }
    });

    // Si algún campo no es válido, detenemos el proceso
    if (!formularioValido) return;

    // Crear fondo difuminado detrás del toast
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backdropFilter = 'blur(4px)';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    overlay.style.zIndex = '999';

    // Crear el toast encima del fondo
    const toast = document.createElement('div');
    toast.textContent = 'Consulta enviada correctamente';
    toast.style.position = 'fixed';
    toast.style.top = '50%';
    toast.style.left = '50%';
    toast.style.transform = 'translate(-50%, -50%)';
    toast.style.padding = '1em 2em';
    toast.style.width = 'max-content';
    toast.style.maxWidth = '80%';
    toast.style.fontSize = '1.15rem';
    toast.style.backgroundColor = 'var(--color-principal)';
    toast.style.color = '#fff';
    toast.style.borderRadius = '12px';
    toast.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
    toast.style.fontFamily = 'var(--fuente-lato)';
    toast.style.textAlign = 'center';
    toast.style.zIndex = '1000';

    // Añadir al DOM
    document.body.appendChild(overlay);
    document.body.appendChild(toast);

    // Ocultamos el toast y limpiamos el formulario después de 1.5 segundos
    setTimeout(() => {
        toast.remove();
        overlay.remove();
        formulario.reset();
    }, 1500);
});
