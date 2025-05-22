document.addEventListener('DOMContentLoaded', () => {
    // Ruta actual para marcar el enlace activo en el header
    const rutaActual = location.pathname.split('/').pop() || 'index.php';

    const enlacesMenu = document.querySelectorAll("header nav.activo a");
    enlacesMenu.forEach(enlace => {
        const href = enlace.getAttribute("href");
        if (rutaActual === 'index.php') return;
        if (href.includes(rutaActual)) {
            enlace.classList.add("activo-pagina");
        }
    });

    // Interacciones del menú hamburguesa
    const btnHamburguesa = document.getElementById("hamburguesa");
    const menuMovil = document.querySelector("nav.menu-movil");
    const btnCerrar = document.getElementById("cerrar-menu");

    btnHamburguesa?.addEventListener("click", () => {
        menuMovil?.classList.remove("oculto");
        document.body.classList.add("menu-abierto");
    });

    btnCerrar?.addEventListener("click", () => {
        menuMovil?.classList.add("oculto");
        document.body.classList.remove("menu-abierto");
    });

    // Popup de confirmación para cerrar sesión
    const mostrarPopup = (mensajeTexto, onConfirmar, onCancelar) => {
        const popup = document.querySelector(".popup");
        if (!popup) return;

        const mensaje = popup.querySelector("p");
        const btnConfirmar = popup.querySelector(".popup-confirmar");
        const btnCancelar = popup.querySelector(".popup-cancelar");

        mensaje.textContent = mensajeTexto;
        popup.classList.add("activo");
        document.body.classList.add("menu-abierto");

        const cerrarPopup = () => {
            popup.classList.remove("activo");
            document.body.classList.remove("menu-abierto");
            btnConfirmar.onclick = null;
            btnCancelar.onclick = null;
        };

        btnConfirmar.onclick = () => {
            cerrarPopup();
            if (typeof onConfirmar === 'function') onConfirmar();
        };

        btnCancelar.onclick = () => {
            cerrarPopup();
            if (typeof onCancelar === 'function') onCancelar();
        };
    };

    // Función de cierre de sesión con confirmación
    const botonesCerrarSesion = document.querySelectorAll(".btn-cerrar-sesion");
    botonesCerrarSesion.forEach(boton => {
        boton.addEventListener("click", e => {
            e.preventDefault();
            mostrarPopup("¿Estás seguro de que deseas cerrar sesión?", () => {
                localStorage.removeItem("usuario");
                window.location.reload();
            });
        });
    });
});

// Forzar recarga si el usuario ha cerrado sesión y vuelve con el botón atrás
window.addEventListener('pageshow', (event) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (event.persisted && !usuario) {
        window.location.reload();
    }
});
