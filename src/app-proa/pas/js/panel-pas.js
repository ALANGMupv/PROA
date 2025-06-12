// Comprobar sesión activa mediante PHP
fetch('../app/chequear-sesion.php', { credentials: 'include' })
    .then(res => res.json())
    .then(usuario => {
        if (!usuario.rol || usuario.rol !== "pas") {
            window.location.replace("../index.php");
            return;
        }

        // Submenú toggle
        const toggleBtn = document.querySelector(".submenu-toggle-btn");
        const items = document.querySelector(".submenu-items");

        toggleBtn?.addEventListener("click", () => {
            items.classList.toggle("visible");
        });

        // Marcar opción activa del submenú
        const rutaActual = window.location.pathname.split('/').pop();
        document.querySelectorAll("#submenu a").forEach(enlace => {
            const href = enlace.getAttribute("href");
            if (href !== "#" && href === rutaActual) {
                enlace.classList.add("activo");
            }
        });
    });

// Función que redirige a nueva-asignatura.php
function redireccionarPagina() {
    window.location.replace('nueva-asignatura.php');
}
