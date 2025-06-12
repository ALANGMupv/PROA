console.log("Script cargado");

const rutaActual = location.pathname.split('/').pop() || 'index.php';

const enlacesMenu = document.querySelectorAll("header nav.activo a");
enlacesMenu.forEach(enlace => {
    const href = enlace.getAttribute("href");
    if (rutaActual === 'index.php') return;
    if (href.includes(rutaActual)) {
        enlace.classList.add("activo-pagina");
    }
});

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

const botonesCerrarSesion = document.querySelectorAll(".btn-cerrar-sesion");
botonesCerrarSesion.forEach(boton => {
    boton.addEventListener("click", e => {
        e.preventDefault();
        mostrarPopup("¿Estás seguro de que deseas cerrar sesión?", () => {
            const rutaCierre = location.pathname;
            const esIndex = rutaCierre.endsWith('/index.php') || rutaCierre === '/proa/src/' || rutaCierre === '/proa/src';
            const destinoCierre = esIndex ? 'app-gti/cerrarSesion.php' : 'cerrarSesion.php';
            window.location.href = destinoCierre;
        });
    });
});

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header?.classList.add('header-con-sombra');
    } else {
        header?.classList.remove('header-con-sombra');
    }
});

inicializarEventosHeader(); //Llama a la función para manejar icono de perfil

window.addEventListener('pageshow', (event) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (event.persisted && !usuario) {
        window.location.reload();
    }
});

// Función para redirección dinámica del icono de perfil
function inicializarEventosHeader() {
    const iconoPerfil = document.getElementById("icono-perfil");
    if (iconoPerfil) {
        iconoPerfil.addEventListener("click", (e) => {
            e.preventDefault();

            const ruta = location.pathname;

            // Detecta si estás en index.php dentro de src/
            const esIndex = ruta.endsWith('/index.php') || ruta.endsWith('/src/') || ruta.endsWith('/src');


            // Si estás dentro de app-gti, login.php está en la misma carpeta
            const destino = esIndex ? '/proa/app-gti/login.php' : '/proa/app-gti/login.php';


            // Redirige
            window.location.href = destino;
        });
    }
}
