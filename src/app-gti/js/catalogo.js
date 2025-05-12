// Validación del formulario de sugerencias
document.querySelector('.formulario-sugerencia')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const formulario = this;
    let valido = true;

    // Eliminar mensajes de error previos
    formulario.querySelectorAll('label small').forEach(el => el.remove());

    const campos = formulario.querySelectorAll('input, textarea');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function mostrarError(campo, mensaje) {
        const label = formulario.querySelector(`label[for="${campo.id}"]`);
        if (label) {
            const small = document.createElement('small');
            small.textContent = mensaje;
            small.classList.add('error-texto');
            label.appendChild(small);
        }
        valido = false;
    }

    // Validar campos
    campos.forEach(campo => {
        const valor = campo.value.trim();
        if (!valor) {
            mostrarError(campo, 'Campo obligatorio');
        } else if (campo.id === 'email' && !emailRegex.test(valor)) {
            mostrarError(campo, 'Correo inválido');
        } else if (campo.id === 'sugerencia' && valor.length < 10) {
            mostrarError(campo, 'Mínimo 10 caracteres');
        }
    });

    if (!valido) return;

    // Mostrar toast
    const toast = document.createElement('div');
    toast.textContent = '¡Gracias por tu sugerencia!';
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '1em 2em',
        backgroundColor: 'var(--color-principal)',
        color: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        fontFamily: 'var(--fuente-lato)',
        zIndex: '9999'
    });

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
        formulario.reset();
    }, 1500);
});

// Redirección condicional según login
document.addEventListener('DOMContentLoaded', () => {
    const btnDemo = document.getElementById('btnProbarDemo');
    const btnProd = document.getElementById('btnVisualizarProd');
    const usuarioGTI = JSON.parse(localStorage.getItem('usuario'));

    btnDemo?.addEventListener('click', () => {
        window.location.href = usuarioGTI ? '../app-proa/index.html' : 'login.html';
    });

    btnProd?.addEventListener('click', () => {
        window.location.href = 'pagProducto.html';
    });
});
