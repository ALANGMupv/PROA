document.addEventListener('DOMContentLoaded', () => {
    // Ruta de redirección del botón CTA
    const ctaLink = 'app-gti/pagProducto.php';

    // Obtener usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Selección del botón CTA
    const btnCTA = document.getElementById("cta");

    // Asignación dinámica del enlace si el botón existe
    if (btnCTA) {
        btnCTA.setAttribute("href", ctaLink);
    }
});