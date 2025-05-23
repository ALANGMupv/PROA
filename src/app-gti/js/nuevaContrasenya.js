document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const formulario = document.querySelector('.formulario-login');
    const seccion = document.querySelector('.nueva');

    // Si no hay email en la URL, muestra un mensaje de error
    if (!email) {
        seccion.innerHTML = '<p class="parrafo-principal">Acceso no autorizado.</p>';
        return;
    }

    fetch('../api/data/usuarios.json')
        .then(res => res.json())
        .then(usuarios => {
            const ultimosUsuarios = usuarios.slice(-3);
            const usuario = ultimosUsuarios.find(u => u.correo === email);

            if (!usuario) { // Si no se encuentra el usuario en el JSON
                seccion.innerHTML = '<p class="parrafo-principal">Acceso no autorizado.</p>';
                return;
            }

            formulario.addEventListener('submit', function (e) {
                e.preventDefault();
                let valido = true;

                const nueva = document.getElementById('nueva');
                const confirmar = document.getElementById('confirmar');
                const passRegex = /^(?=.*[\d!@#$%^&*(),.?":{}|<>]).{6,}$/;

                document.querySelectorAll('label small').forEach(el => el.remove());

                function mostrarError(campo, mensaje) {
                    const label = document.querySelector(`label[for="${campo.id}"]`);
                    const small = document.createElement('small');
                    small.textContent = mensaje;
                    small.classList.add('error-texto');
                    label.appendChild(small);
                    valido = false;
                }

                if (!passRegex.test(nueva.value)) {
                    mostrarError(nueva, 'Mínimo 6 caracteres con número o símbolo');
                }

                if (nueva.value !== confirmar.value) {
                    mostrarError(confirmar, 'Las contraseñas no coinciden');
                }

                // Verificar si es igual a la actual
                if (nueva.value === usuario.clave) {
                    mostrarError(nueva, 'La nueva contraseña no puede ser igual a la actual');
                }

                if (!valido) return;

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
                toast.textContent = 'Contraseña cambiada con éxito';
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

                // Ocultar y redirigir
                setTimeout(() => {
                    toast.remove();
                    overlay.remove();
                    window.location.href = 'login.html';
                }, 1500);
            });
        })
        .catch(error => {
            alert('Error al cargar los datos');
            console.error(error);
        });
});
