function toggleOpciones(icono) {
    const wrapper = icono.parentElement;
    wrapper.classList.toggle('abierto');

    // Cierra los otros menús abiertos
    document.querySelectorAll('.menu-opciones-wrapper').forEach(el => {
        if (el !== wrapper) el.classList.remove('abierto');
    });
}

// Cerrar menú si se hace clic fuera
document.addEventListener('click', function (e) {
    if (!e.target.closest('.menu-opciones-wrapper')) {
        document.querySelectorAll('.menu-opciones-wrapper').forEach(el => el.classList.remove('abierto'));
    }
});
