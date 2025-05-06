document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const submenu = document.getElementById("submenu-asignatura");

    if (!usuario || usuario.rol !== "profesor") {
        window.location.replace("../../index.html");
        return;
    }

    const asignatura = JSON.parse(localStorage.getItem('asignaturaSeleccionada'));

    if (!asignatura) {
        window.location.href = "../inicio-profesor.html";
        return;
    }

    // Mostrar nombre y código de la asignatura
    document.getElementById('titulo-asignatura').textContent = asignatura.nombre;
    document.getElementById('codigo-asignatura').textContent = `Código: ${asignatura.codigo}`;

    // Opciones del submenú para profesor (sin iconos)
    const opciones = [
        { texto: "Horario", href: "#" },
        { texto: "Guía Docente", href: "#" },
        { texto: "Recursos", href: "#" },
        { texto: "Tareas", href: "#" },
        { texto: "Exámenes", href: "#" },
        { texto: "Calificaciones", href: "#" },
        { texto: "Participación", href: "#" },
        { texto: "Foros", href: "#" },
        { texto: "Clases en vivo", href: "#" }
    ];

    let htmlSubmenu = `
        <nav class="menu-lateral colapsable" id="submenu-toggle">
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

    // Activar colapso en móvil
    const toggleBtn = document.querySelector(".submenu-toggle-btn");
    const items = document.querySelector(".submenu-items");

    toggleBtn?.addEventListener("click", () => {
        items.classList.toggle("visible");
    });
});
