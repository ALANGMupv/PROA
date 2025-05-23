// Redirección inmediata si ya hay un usuario logueado
window.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario) {
        window.location.href = '../index.html';
    }
});

document.querySelector('.formulario-login-pagLogin')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenimos el envío del formulario (recarga de la página)

    // Obtenemos los campos del formulario
    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contrasena');

    // Obtenemos y limpiamos los valores ingresados por el usuario
    const correo = correoInput.value.trim();
    const contrasena = contrasenaInput.value;

    // Eliminamos mensajes de error previos (si los hay)
    document.querySelectorAll('label small').forEach(el => el.remove());

    // Función para mostrar errores debajo de un label
    function mostrarError(campo, mensaje) {
        const label = document.querySelector(`label[for="${campo.id}"]`);
        const small = document.createElement('small');
        small.textContent = mensaje;
        small.classList.add('error-texto');
        label.appendChild(small);
    }

    let valido = true;

    // Validamos si los campos están vacíos
    if (!correo) {
        mostrarError(correoInput, 'Este campo es obligatorio');
        valido = false;
    }

    if (!contrasena) {
        mostrarError(contrasenaInput, 'Este campo es obligatorio');
        valido = false;
    }

    // Expresión regular para validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validamos formato del correo electrónico
    if (correo && !emailRegex.test(correo)) {
        mostrarError(correoInput, 'Correo inválido');
        valido = false;
    }

    // Si hay errores, no continuamos con la petición
    if (!valido) return;

    // Autenticación (login simulado)

    // Cargamos los usuarios desde el archivo JSON
    fetch('../api/data/usuarios.json')
        .then(res => res.json())
        .then(usuarios => {
            // Tomamos solo los últimos 3 usuarios del archivo (los de GTI)
            const ultimosUsuarios = usuarios.slice(-3);

            // Buscamos un usuario que coincida con correo y contraseña
            const usuario = ultimosUsuarios.find(u =>
                u.correo === correo && u.clave === contrasena
            );

            if (usuario) {
                // Si se encuentra el usuario, lo guardamos en localStorage
                localStorage.setItem('usuario', JSON.stringify(usuario));

                // Mostramos mensaje de éxito tipo "toast"
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
                toast.textContent = 'Inicio de sesión exitoso. Redirigiendo...';
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
                toast.style.zIndex = '1000'; // encima del overlay

                // Añadir al DOM
                document.body.appendChild(overlay);
                document.body.appendChild(toast);

                // Esperar y redirigir
                setTimeout(() => {
                    toast.remove();
                    overlay.remove();
                    window.location.href = '../index.html';
                }, 1500);


            } else {
                // Si no se encuentra el usuario, mostramos error tipo toast con fondo difuminado
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
            // Si ocurre un error en la petición, mostramos alerta genérica
            alert('Error al iniciar sesión. Intenta de nuevo más tarde.');
            console.error('Error:', error);
        });
});
