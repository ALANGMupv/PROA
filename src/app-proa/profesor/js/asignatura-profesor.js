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

    // Cambia el título dinámicamente
    const tituloAsignatura = document.querySelector("#submenu .titulo-submenu h2");
    if (tituloAsignatura) {
        tituloAsignatura.textContent = asignatura.nombre;
    }

    // Activar enlace actual
    const rutaActual = window.location.pathname.split('/').pop();
    document.querySelectorAll("#submenu a").forEach(enlace => {
        const href = enlace.getAttribute("href");
        if (href !== "#" && href === rutaActual) {
            enlace.classList.add("activo");
        }

        if (rutaActual === "realizar-examen.php" && href === "examenes-profesor.php") {
            enlace.classList.add("activo");
        }
    });

    // Responsive: clonar botón de colapsar
    const toggleBtn = document.querySelector(".submenu-toggle-btn");
    const items = document.querySelector(".submenu-items");
    const cabecera = document.querySelector(".cabecera-dropdown-fija");

    if (toggleBtn && items && cabecera) {
        const botonClonado = toggleBtn.cloneNode(true);
        botonClonado.classList.add("submenu-toggle-btn-cabecera");
        cabecera.prepend(botonClonado);

        botonClonado.addEventListener("click", () => {
            items.classList.toggle("visible");
        });

        document.addEventListener("click", (e) => {
            if (items.classList.contains("visible")) {
                if (!items.contains(e.target) && !botonClonado.contains(e.target)) {
                    items.classList.remove("visible");
                }
            }
        });
    }
});
