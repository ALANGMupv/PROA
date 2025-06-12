// Código para que no se queden las preguntas abiertas al volver a la página
document.querySelectorAll('.faq-respuesta').forEach(respuesta => {
    respuesta.classList.remove('activa');
});
document.querySelectorAll('.faq-icono').forEach(icono => {
    icono.style.transform = 'rotate(0deg)';
});

// Lógica FAQ
document.querySelectorAll('.faq-pregunta').forEach(button => {
    button.addEventListener('click', () => {
        const respuesta = button.nextElementSibling;
        const icono = button.querySelector('.faq-icono');

        const isActive = respuesta.classList.contains('activa');

        if (isActive) {
            respuesta.classList.remove('activa');
            button.classList.remove('activa');
            icono.style.transform = 'rotate(0deg)';
        } else {
            respuesta.classList.add('activa');
            button.classList.add('activa');
            icono.style.transform = 'rotate(180deg)';
        }
    });
});