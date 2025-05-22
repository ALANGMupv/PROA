document.addEventListener('DOMContentLoaded', () => {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // Obtiene el elemento HTML donde se insertará el submenú
    const submenu = document.getElementById("submenu");

    // Si no hay usuario o su rol no es "alumno", redirige a la página de inicio
    if (!usuario || usuario.rol !== "alumno") {
        window.location.replace("../../index.php");
        return;
    }

    // Obtiene del localStorage la asignatura seleccionada
    const asignatura = JSON.parse(localStorage.getItem('asignaturaSeleccionada'));

    // Si no hay asignatura seleccionada, redirige a la página anterior
    if (!asignatura) {
        window.location.href = "../index.php";
        return;
    }

    // Define las opciones del submenú (textos y enlaces)
    const opciones = [
        { texto: "Horario", href: "#" },
        { texto: "Guía Docente", href: "#" },
        { texto: "Recursos", href: "#" },
        { texto: "Tareas", href: "#" },
        { texto: "Exámenes", href: "examenes-alumno.php" },
        { texto: "Calificaciones", href: "#" },
        { texto: "Ranking", href: "#" },
        { texto: "Foros", href: "#" },
        { texto: "Clases en vivo", href: "#" }
    ];

    // Genera el HTML del submenú con título y opciones
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

    // Inserta ese HTML dentro del contenedor submenu (en el aside)
    submenu.innerHTML = htmlSubmenu;


    // ============================
    // MENÚ ASIGNATURAS (Responsive)
    // ============================

    // Selecciona los elementos necesarios: botón de menú, contenedor de opciones y la cabecera
    const submenuToggle = document.querySelector(".submenu-toggle-btn");
    const submenuItems = document.querySelector(".submenu-items");
    const cabecera = document.querySelector(".cabecera-dropdown-fija");

    // Si todos existen, ejecuta:
    if (submenuToggle && submenuItems && cabecera) {
        // Crea un clon del botón del submenú
        const botonClonado = submenuToggle.cloneNode(true);

        // Le añade una clase extra para que se comporte como botón en la cabecera responsive
        botonClonado.classList.add("submenu-toggle-btn-cabecera");

        // Inserta el clon al inicio de la cabecera (antes del dropdown de asignaturas)
        cabecera.prepend(botonClonado);

        // Añade evento: cuando se clickea el clon, alterna la visibilidad del menú
        botonClonado.addEventListener("click", () => {
            submenuItems.classList.toggle("visible");
        });

        // Cierra el submenú si haces clic fuera de él
        document.addEventListener("click", (e) => {
            if (submenuItems.classList.contains("visible")) {
                if (
                    !submenuItems.contains(e.target) &&
                    !botonClonado.contains(e.target)
                ) {
                    submenuItems.classList.remove("visible");
                }
            }
        });
    }

    // =============================
    // Activar enlace del submenú
    // =============================

    // Obtiene la última parte de la URL actual (el nombre del archivo HTML)
    const rutaActual = window.location.pathname.split('/').pop();

    // Recorre todos los enlaces del submenú
    document.querySelectorAll("#submenu a").forEach(enlace => {
        const href = enlace.getAttribute("href");

        // Si el href coincide con la ruta actual, añade la clase "activo"
        if (href !== "#" && href === rutaActual) {
            enlace.classList.add("activo");
        }

        // Excepción: si estamos en realizar-examen.php, activamos también "Exámenes"
        if (rutaActual === "realizar-examen.php" && href === "examenes-alumno.php") {
            enlace.classList.add("activo");
        }
    });

});
