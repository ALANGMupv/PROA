// asignatura-pas.js (sin iconos en el menú)
document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || usuario.rol !== "pas") {
        window.location.replace("../../index.html");
        return;
    }

    const submenu = document.getElementById("submenu-asignatura");

    const opciones = [
        { texto: "Asignaturas", href: "#" },
        { texto: "Asignaciones Profesores", href: "#" },
        { texto: "Asignaciones Alumnos", href: "#" }
    ];

    const htmlSubmenu = `
        <div class="titulo-submenu-pas">
            <img src="../icons/administracionPAS.svg" alt="Administración" class="icono-inicio" />
            <h2>Administración</h2>
        </div>
        <nav class="menu-pas colapsable" id="submenu-toggle">
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

    const toggleBtn = document.querySelector(".submenu-toggle-btn");
    const items = document.querySelector(".submenu-items");

    toggleBtn?.addEventListener("click", () => {
        items.classList.toggle("visible");
    });
});
