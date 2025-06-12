document.querySelector('.formulario-login')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const correoInput = document.getElementById('correo');
    const correo = correoInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    document.querySelectorAll('label small').forEach(el => el.remove());

    function mostrarError(campo, mensaje) {
        const label = document.querySelector(`label[for="${campo.id}"]`);
        const small = document.createElement('small');
        small.textContent = mensaje;
        small.classList.add('error-texto');
        label.appendChild(small);
    }

    if (!emailRegex.test(correo)) {
        mostrarError(correoInput, 'Correo inválido');
        return;
    }

    // Buscar si existe el correo
    fetch('validarCorreo.php', {
        method: 'POST',
        body: new URLSearchParams({ email: correo })
    })
        .then(res => res.text())
        .then(token => {
            if (token.startsWith('Correo no encontrado') || token.length < 30) {
                mostrarError(correoInput, 'Correo no encontrado');
                return;
            }

            // Crear fondo difuminado
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backdropFilter = 'blur(4px)';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            overlay.style.zIndex = '999';

            // Crear toast centrado
            const toast = document.createElement('div');
            toast.textContent = 'Enlace de recuperación enviado al correo';
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
                window.location.href = `nuevaContrasenya.php?email=${encodeURIComponent(correo)}&token=${token}`;
            }, 1500);
        })
        .catch(error => {
            alert('Error al procesar la solicitud.');
            console.error(error);
        });
});