document.addEventListener('DOMContentLoaded', () => {
    // Por defecto, el enlace del botón será a la página de login
    let ctaLink = 'app-gti/pagProducto.html';

    // Intentamos recuperar al usuario desde localStorage (si está logueado)
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Seleccionamos el botón con id "ctaDemo"
    const btnCTA = document.getElementById("cta");

    // Si existe el botón, le asignamos dinámicamente el enlace correspondiente
    if (btnCTA) {
        btnCTA.setAttribute("href", ctaLink);
    }
});