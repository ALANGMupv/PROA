// Redirección inmediata si el usuario ya está logueado
const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));

if (usuarioLogueado) {
    fetch('api/data/usuarios.json')
        .then(res => res.json())
        .then(usuarios => {
            const usuarioValido = usuarios.find(u =>
                u.correo === usuarioLogueado.correo &&
                (u.rol === "alumno" || u.rol === "profesor" || u.rol === "pas")
            );

            if (usuarioValido.rol === "pas") {
                window.location.replace('pas/index.html');
            } else if (usuarioValido.rol === "alumno") {
                window.location.replace('alumno/index.html');
            } else if (usuarioValido.rol === "profesor") {
                window.location.replace('profesor/index.html');
            }

        });
}

// Lógica de login
document.querySelector('.formulario-login')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenimos el envío del formulario

    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contrasena');

    const correo = correoInput.value.trim();
    const contrasena = contrasenaInput.value;

    // Limpiar errores previos
    document.querySelectorAll('label small').forEach(el => el.remove());

    function mostrarError(campo, mensaje) {
        const label = document.querySelector(`label[for="${campo.id}"]`);
        const small = document.createElement('small');
        small.textContent = mensaje;
        small.classList.add('error-texto');
        label.appendChild(small);
    }

    let valido = true;

    // Validaciones
    if (!correo) {
        mostrarError(correoInput, 'Campo obligatorio');
        valido = false;
    }
    if (!contrasena) {
        mostrarError(contrasenaInput, 'Campo obligatorio');
        valido = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo && !emailRegex.test(correo)) {
        mostrarError(correoInput, 'Correo inválido');
        valido = false;
    }

    if (!valido) return;

    // Login simulado
    fetch('../api/data/usuarios.json')
        .then(res => res.json())
        .then(usuarios => {
            const usuariosPermitidos = usuarios.filter(u =>
                u.rol === "alumno" || u.rol === "profesor" || u.rol === "pas"
            );

            const usuario = usuariosPermitidos.find(u =>
                u.correo === correo && u.clave === contrasena
            );

            if (usuario) {
                localStorage.setItem('usuario', JSON.stringify(usuario));
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
                toast.textContent = 'Inicio de sesión exitoso. Redirigiendo...';
                toast.style.position = 'fixed';
                toast.style.top = '50%';
                toast.style.left = '50%';
                toast.style.transform = 'translate(-50%, -50%)';
                toast.style.padding = '1em 2em';
                toast.style.width = 'max-content';
                toast.style.maxWidth = '80%';
                toast.style.fontSize = '1.15rem';
                toast.style.backgroundColor = 'var(--color-primario)';
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
                    if (usuario.rol === "pas") {
                        window.location.replace('pas/index.html');
                    } else if (usuario.rol === "alumno") {
                        window.location.replace('alumno/index.html');
                    } else if (usuario.rol === "profesor") {
                        window.location.replace('profesor/index.html');
                    }
                }, 1500);

            } else {
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
                toastError.textContent = 'Usuario o contraseña incorrectos';
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
                toastError.style.fontFamily = 'var(--fuente-lato)';
                toastError.style.textAlign = 'center';
                toastError.style.zIndex = '1000';

                document.body.appendChild(overlayError);
                document.body.appendChild(toastError);

                setTimeout(() => {
                    toastError.remove();
                    overlayError.remove();
                }, 850);
            }
        })
        .catch(error => {
            alert('Error al iniciar sesión. Intenta de nuevo más tarde.');
            console.error('Error:', error);
        });
});

// Forzar recarga si se accede desde caché después de cerrar sesión
window.addEventListener('pageshow', (event) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (event.persisted && !usuario) {
        window.location.reload();
    }
});


