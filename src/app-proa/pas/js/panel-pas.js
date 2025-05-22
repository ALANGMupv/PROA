document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || usuario.rol !== "pas") {
        window.location.replace("../../index.php");
        return;
    }

    const toggleBtn = document.querySelector(".submenu-toggle-btn");
    const items = document.querySelector(".submenu-items");

    toggleBtn?.addEventListener("click", () => {
        items.classList.toggle("visible");
    });

    // Marcar como activa la opción actual según la URL
    const rutaActual = window.location.pathname.split('/').pop();
    document.querySelectorAll("#submenu a").forEach(enlace => {
        const href = enlace.getAttribute("href");
        if (href !== "#" && href === rutaActual) {
            enlace.classList.add("activo");
        }
    });
});

function redireccionarPagina() {
    window.location.replace('nueva-asignatura.php');
}
