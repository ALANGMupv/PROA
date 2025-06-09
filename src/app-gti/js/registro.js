document.querySelector('.registro-formulario')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const formulario = this;
    let formularioValido = true;

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[\d!@#$%^&*(),.?":{}|<>]).{6,}$/;
    const telRegex = /^\d+$/;

    formulario.querySelectorAll('label small').forEach(el => el.remove());

    function mostrarError(campo, mensaje) {
        const label = formulario.querySelector(`label[for="${campo.id}"]`);
        if (label) {
            const small = document.createElement('small');
            small.textContent = mensaje;
            small.classList.add('error-texto');
            label.appendChild(small);
        }
        formularioValido = false;
    }

    if (campos.nombre.value.trim() === '') mostrarError(campos.nombre, 'Campo obligatorio');
    if (campos.apellidos.value.trim() === '') mostrarError(campos.apellidos, 'Campo obligatorio');
    if (campos.institucion.value.trim() === '') mostrarError(campos.institucion, 'Campo obligatorio');

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

    if (!formularioValido) return;

    // Mostrar spinner circular
    const overlay = document.createElement('div');
    overlay.id = 'spinner-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';

    const spinner = document.createElement('div');
    spinner.style.width = '48px';
    spinner.style.height = '48px';
    spinner.style.border = '5px solid #ccc';
    spinner.style.borderTop = '5px solid rgb(160, 58, 111)';
    spinner.style.borderRadius = '50%';
    spinner.style.animation = 'spin 1s linear infinite';

    overlay.appendChild(spinner);
    document.body.appendChild(overlay);

    // Inyectar animación @keyframes
    if (!document.getElementById('spinner-style')) {
        const style = document.createElement('style');
        style.id = 'spinner-style';
        style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        `;
        document.head.appendChild(style);
    }

    const formData = new FormData(formulario);

    fetch('registrarUsuario.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then(respuesta => {
            overlay.remove();

            if (respuesta.trim() === 'OK') {
                document.getElementById('dialog-confirmacion')?.showModal();
                formulario.reset();
            } else {
                alert('Error: ' + respuesta);
            }
        })
        .catch(error => {
            overlay.remove();
            alert('Error al conectar con el servidor.');
            console.error(error);
        });
});
