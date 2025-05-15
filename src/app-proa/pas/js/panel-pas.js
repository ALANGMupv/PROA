// asignatura-pas.js (sin iconos en el menú)
document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || usuario.rol !== "pas") {
        window.location.replace("../../index.html");
        return;
    }

    const submenu = document.getElementById("submenu");

    const opciones = [
        { texto: "Creación de Asignaturas", href: "asignaturas.html" }
    ];

    const htmlSubmenu = `
        <div class="titulo-submenu">
            <h2>Administración</h2>
        </div>
        <nav class="menu colapsable" id="submenu-toggle">
            <button class="submenu-toggle-btn">
                Administración <span class="flecha">&#9662;</span>
            </button>
            <div class="submenu-items">
                ${opciones.map(op => `
                    <a href="${op.href}" class="submenu-item">
                        <span>${op.texto}</span>
                    </a>
                `).join('')}
            </div>
        </nav>
    `;

    submenu.innerHTML = htmlSubmenu;

    // Marcar como activa la opción actual según la URL
    const rutaActual = window.location.pathname.split('/').pop();

    document.querySelectorAll("#submenu a").forEach(enlace => {
        const href = enlace.getAttribute("href");
        if (href !== "#" && href === rutaActual) {
            enlace.classList.add("activo");
        }
    });

    const toggleBtn = document.querySelector(".submenu-toggle-btn");
    const items = document.querySelector(".submenu-items");

    toggleBtn?.addEventListener("click", () => {
        items.classList.toggle("visible");
    });
});

function redireccionarPagina() {
    window.location.replace('nueva-asignatura.html');
}