const form = document.querySelector('.formulario-login');
if (!form) {
    // El formulario no está en el DOM (token inválido o caducado), no hacemos nada
    console.warn('Formulario no disponible: el token puede haber expirado.');
}

const email = form.dataset.email;
const token = form.dataset.token;

form.addEventListener('submit', e => {
    e.preventDefault();

    const nueva = document.getElementById('nueva');
    const confirmar = document.getElementById('confirmar');
    const passRegex = /^(?=.*[\d!@#$%^&*(),.?":{}|<>]).{6,}$/;
    let valido = true;

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

    if (!valido) return;

    fetch('guardarContrasenya.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, nueva: nueva.value })
    })
        .then(res => res.text())
        .then(respuesta => {
            if (respuesta === 'OK') {
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

                document.body.appendChild(overlay);
                document.body.appendChild(toast);

                setTimeout(() => {
                    toast.remove();
                    overlay.remove();
                    window.location.href = 'login.php';
                }, 1500);
            } else if (respuesta === 'REPETIDA') {
                mostrarError(nueva, 'La nueva contraseña no puede ser igual a la actual');
            } else {
                alert('Error: ' + respuesta);
            }
        })
        .catch(err => {
            alert('Error al cambiar contraseña');
            console.error(err);
        });
});
