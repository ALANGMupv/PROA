document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const submenu = document.getElementById("submenu");

    if (!usuario || usuario.rol !== "profesor") {
        window.location.replace("../../index.php");
        return;
    }

    const asignatura = JSON.parse(localStorage.getItem('asignaturaSeleccionada'));

    if (!asignatura) {
        window.location.href = "../index.php";
        return;
    }

    // Opciones del submenú
    const opciones = [
        { texto: "Horario", href: "#" },
        { texto: "Guía Docente", href: "#" },
        { texto: "Recursos", href: "#" },
        { texto: "Tareas", href: "#" },
        { texto: "Exámenes", href: "examenes-profesor.php" },
        { texto: "Calificaciones", href: "#" },
        { texto: "Ranking", href: "#" },
        { texto: "Foros", href: "#" },
        { texto: "Clases en vivo", href: "#" }
    ];

    // HTML del submenú
    const htmlSubmenu = `
        <div class="titulo-submenu">
            <h2>${asignatura.nombre}</h2>
        </div>
        <nav class="menu colapsable" id="submenu-toggle">
            <button class="submenu-toggle-btn">
                Asignatura <span class="flecha">&#9662;</span>
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

    // Activar enlace actual
    const rutaActual = window.location.pathname.split('/').pop();
    document.querySelectorAll("#submenu a").forEach(enlace => {
        const href = enlace.getAttribute("href");
        if (href !== "#" && href === rutaActual) {
            enlace.classList.add("activo");
        }
    });

    // Colapsable
    const toggleBtn = document.querySelector(".submenu-toggle-btn");
    const items = document.querySelector(".submenu-items");

    toggleBtn?.addEventListener("click", () => {
        items.classList.toggle("visible");
    });

    // Clona el botón del submenú y lo coloca en la cabecera (versión móvil)
    const cabecera = document.querySelector(".cabecera-dropdown-fija-profesor");

    if (toggleBtn && items && cabecera) {
        const botonClonado = toggleBtn.cloneNode(true);
        botonClonado.classList.add("submenu-toggle-btn-cabecera");
        cabecera.prepend(botonClonado);

        botonClonado.addEventListener("click", () => {
            items.classList.toggle("visible");
        });

        document.addEventListener("click", (e) => {
            if (items.classList.contains("visible")) {
                if (
                    !items.contains(e.target) &&
                    !botonClonado.contains(e.target)
                ) {
                    items.classList.remove("visible");
                }
            }
        });
    }
});