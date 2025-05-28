document.querySelector('.registro-formulario')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Evitamos que el formulario se envíe y recargue la página

    const formulario = this;
    let formularioValido = true;

    // Seleccionamos todos los campos relevantes del formulario
    const campos = {
        nombre: formulario.querySelector('#nombre'),
        apellidos: formulario.querySelector('#apellidos'),
        institucion: formulario.querySelector('#institucion'),
        correo: formulario.querySelector('#correo'),
        tipo: formulario.querySelector('#tipo'),
        telefono: formulario.querySelector('#telefono'),
        contrasena: formulario.querySelector('#contrasena'),
        repetir: formulario.querySelector('#repetir'),
    };

    // Expresiones regulares para validaciones
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validación de email básico
    const passRegex = /^(?=.*[\d!@#$%^&*(),.?":{}|<>]).{6,}$/; // Mínimo 6 caracteres con número o símbolo
    const telRegex = /^\d+$/; // Solo dígitos para el teléfono

    // Limpiamos mensajes de error anteriores
    formulario.querySelectorAll('label small').forEach(el => el.remove());

    // Función para mostrar errores debajo del label correspondiente
    function mostrarError(campo, mensaje) {
        const label = formulario.querySelector(`label[for="${campo.id}"]`);
        if (label) {
            const small = document.createElement('small');
            small.textContent = mensaje;
            small.classList.add('error-texto');
            label.appendChild(small);
        }
        formularioValido = false; // Marcamos el formulario como inválido
    }

    // Validaciones campo por campo
    if (campos.nombre.value.trim() === '') {
        mostrarError(campos.nombre, 'Campo obligatorio');
    }

    if (campos.apellidos.value.trim() === '') {
        mostrarError(campos.apellidos, 'Campo obligatorio');
    }

    if (campos.institucion.value.trim() === '') {
        mostrarError(campos.institucion, 'Campo obligatorio');
    }

    const correoValor = campos.correo.value.trim();
    if (correoValor === '') {
        mostrarError(campos.correo, 'Campo obligatorio');
    } else if (!emailRegex.test(correoValor)) {
        mostrarError(campos.correo, 'Correo inválido');
    }

    if (campos.tipo.selectedIndex === 0 || campos.tipo.value === '') {
        mostrarError(campos.tipo, 'Campo obligatorio');
    }

    const telefonoValor = campos.telefono.value.trim();
    if (!telRegex.test(telefonoValor)) {
        mostrarError(campos.telefono, 'Teléfono inválido (solo números)');
    } else if (telefonoValor.length < 9) {
        mostrarError(campos.telefono, 'El teléfono debe tener al menos 9 cifras');
    }

    if (!passRegex.test(campos.contrasena.value)) {
        mostrarError(campos.contrasena, 'Mínimo 6 caracteres con un número o símbolo');
    }

    if (campos.contrasena.value !== campos.repetir.value) {
        mostrarError(campos.repetir, 'Las contraseñas no coinciden');
    }

    // Si el formulario no pasa las validaciones, no continuamos
    if (!formularioValido) return;

    // Envío de datos al servidor PHP
    const formData = new FormData(formulario);

    fetch('registrarUsuario.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then(respuesta => {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backdropFilter = 'blur(4px)';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            overlay.style.zIndex = '999';

            const toast = document.createElement('div');
            toast.textContent = respuesta.includes('Usuario insertado') ? 'Registro exitoso. Credenciales asignadas. Redirigiendo...' : 'Error: ' + respuesta;
            toast.style.position = 'fixed';
            toast.style.top = '50%';
            toast.style.left = '50%';
            toast.style.transform = 'translate(-50%, -50%)';
            toast.style.padding = '1em 2em';
            toast.style.maxWidth = '80%';
            toast.style.fontSize = '1.15rem';
            toast.style.backgroundColor = respuesta.includes('Usuario insertado') ? 'var(--color-principal)' : '#c45f5f';
            toast.style.color = '#fff';
            toast.style.borderRadius = '12px';
            toast.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
            toast.style.fontFamily = 'var(--fuente-lato)';
            toast.style.textAlign = 'center';
            toast.style.zIndex = '1000';

            document.body.appendChild(overlay);
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.remove();
                overlay.remove();
                if (respuesta.includes('Usuario insertado')) {
                    window.location.href = 'login.php';
                }
            }, 2000);
        })
        .catch(error => {
            alert('Error de conexión con el servidor.');
            console.error(error);
        });
});