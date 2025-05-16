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
    toast.textContent = '¡Gracias por tu sugerencia!';
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

    // Esperar, quitar el toast y resetear el formulario
    setTimeout(() => {
        toast.remove();
        overlay.remove();
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
