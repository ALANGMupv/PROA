document.querySelector('.formulario-login-pagLogin')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contrasena');
    const correo = correoInput.value.trim();
    const contrasena = contrasenaInput.value;

    // Limpiar errores previos
    document.querySelectorAll('label small').forEach(el => el.remove());

    // Función para mostrar errores debajo de los labels
    function mostrarError(campo, mensaje) {
        const label = document.querySelector(`label[for="${campo.id}"]`);
        const small = document.createElement('small');
        small.textContent = mensaje;
        small.classList.add('error-texto');
        label.appendChild(small);
    }

    let valido = true;

    if (!correo) {
        mostrarError(correoInput, 'Este campo es obligatorio');
        valido = false;
    }

    if (!contrasena) {
        mostrarError(contrasenaInput, 'Este campo es obligatorio');
        valido = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo && !emailRegex.test(correo)) {
        mostrarError(correoInput, 'Correo inválido');
        valido = false;
    }

    if (!valido) return;

    // Llamada a loginBackend.php
    fetch('loginBackend.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, clave: contrasena })
    })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                window.location.href = 'catalogo.php';
            } else {
                const mensajeOriginal = data.mensaje || '';
                const mensaje = mensajeOriginal.toLowerCase();

                if (mensaje.includes('activar') || mensaje.includes('cuenta') || mensaje.includes('validar')) {
                    mostrarError(correoInput, mensajeOriginal);
                } else if (mensaje.includes('contraseña') || mensaje.includes('usuario')) {
                    mostrarToastError('Usuario o contraseña incorrectos');
                } else {
                    mostrarToastError(mensajeOriginal || 'Error desconocido');
                }
            }
        })
        .catch(error => {
            mostrarToastError('No se pudo conectar al servidor.');
            console.error('Error:', error);
        });
});

// VALIDAR TOKEN de activación si viene en la URL
const params = new URLSearchParams(window.location.search);
const token = params.get('activado');

if (token) {
    fetch(`validarRegistro.php?token=${token}`)
        .then(res => res.json())
        .then(data => {
            alert(data.mensaje); // Esto genera el diálogo NATIVO
        })
        .catch(err => {
            alert('Error al verificar la activación.');
            console.error(err);
        });
}

function mostrarToastError(mensaje) {
    const overlayError = document.createElement('div');
    overlayError.style.position = 'fixed';
    overlayError.style.top = 0;
    overlayError.style.left = 0;
    overlayError.style.width = '100%';
    overlayError.style.height = '100%';
    overlayError.style.backdropFilter = 'blur(4px)';
    overlayError.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    overlayError.style.zIndex = '999';

    const toastError = document.createElement('div');
    toastError.textContent = mensaje;
    toastError.style.position = 'fixed';
    toastError.style.top = '50%';
    toastError.style.left = '50%';
    toastError.style.transform = 'translate(-50%, -50%)';
    toastError.style.padding = '1em 2em';
    toastError.style.width = 'max-content';
    toastError.style.maxWidth = '80%';
    toastError.style.fontSize = '1.15rem';
    toastError.style.backgroundColor = '#c45f5f';
    toastError.style.color = '#fff';
    toastError.style.borderRadius = '12px';
    toastError.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
    toastError.style.textAlign = 'center';
    toastError.style.zIndex = '1000';

    document.body.appendChild(overlayError);
    document.body.appendChild(toastError);

    setTimeout(() => {
        toastError.remove();
        overlayError.remove();
    }, 1000);
}
