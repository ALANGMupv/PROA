// ======================
// CARGA DEL HEADER PROA
// ======================
document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario) {
        window.location.replace('index.php');
        return;
    }

    document.body.classList.add(`rol-${usuario.rol}`);

    // Crear y cargar CSS del header
    const linkHeaderCSS = document.createElement('link');
    linkHeaderCSS.rel = 'stylesheet';
    linkHeaderCSS.href = '../css/header-proa.css';


    // Esperar a que el CSS esté completamente cargado
    linkHeaderCSS.onload = () => {
        const rutaBase = location.pathname.includes('/app-proa/pas/') ||
        location.pathname.includes('/app-proa/alumno/') ||
        location.pathname.includes('/app-proa/profesor/')
            ? '../'
            : './';

        fetch(`${rutaBase}header-proa.php`)
            .then(res => res.text())
            .then(html => {
                document.body.insertAdjacentHTML('afterbegin', html);

                requestAnimationFrame(() => {
                    const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;
                    const etiquetaRol = usuario.rol === 'alumno' ? ' (Alumno)' :
                        usuario.rol === 'profesor' ? ' (Profesor)' :
                            usuario.rol === 'pas' ? ' (PAS)' : '';

                    const nombreHeader = document.getElementById('nombre-usuario-header');
                    const nombrePopover = document.getElementById('nombre-usuario-popover');

                    if (nombreHeader) nombreHeader.textContent = `${etiquetaRol} ${nombreCompleto}`;
                    if (nombrePopover) nombrePopover.textContent = `${etiquetaRol} ${nombreCompleto}`;


                    // Notificaciones
                    fetch(`${rutaBase}../api/data/notificaciones.json`)
                        .then(res => res.json())
                        .then(data => {
                            const notificaciones = data[usuario.correo] || [];
                            const contenedorPopover = document.getElementById("menu-avisos");
                            contenedorPopover.innerHTML = "";

                            if (notificaciones.length === 0) {
                                const sinAvisos = document.createElement("div");
                                sinAvisos.classList.add("aviso-item");
                                sinAvisos.innerHTML = `<strong>No tienes notificaciones nuevas</strong>`;
                                contenedorPopover.appendChild(sinAvisos);
                            } else {
                                const yaVistas = localStorage.getItem(`notificacionesVistas_${usuario.correo}`) === 'true';
                                const botonNotificacion = document.querySelector(".boton-notificacion");
                                if (botonNotificacion && !yaVistas) {
                                    const burbuja = document.createElement("span");
                                    burbuja.classList.add("burbuja-notificacion");
                                    botonNotificacion.appendChild(burbuja);
                                }

                                notificaciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).forEach(n => {
                                    const aviso = document.createElement("div");
                                    aviso.classList.add("aviso-item");
                                    aviso.innerHTML = `<strong>${n.texto}</strong><div class="fecha-aviso">${n.fecha}</div>`;
                                    contenedorPopover.appendChild(aviso);
                                });
                            }
                        });

                    // Mostrar popover
                    const botonNotificacion = document.querySelector(".boton-notificacion");
                    const menuAvisos = document.getElementById("menu-avisos");
                    botonNotificacion?.addEventListener("click", e => {
                        e.preventDefault();
                        if (menuAvisos.matches(":popover-open")) {
                            menuAvisos.hidePopover();
                        } else {
                            menuAvisos.showPopover();
                        }
                        localStorage.setItem(`notificacionesVistas_${usuario.correo}`, 'true');
                        botonNotificacion.querySelector(".burbuja-notificacion")?.remove();
                    });

                    // Cierre de sesión
                    const cerrarSesion = document.getElementById("cerrar-sesion");
                    const popup = document.querySelector(".popup");
                    const confirmar = popup?.querySelector(".popup-confirmar");
                    const cancelar = popup?.querySelector(".popup-cancelar");

                    cerrarSesion?.addEventListener("click", e => {
                        e.preventDefault();
                        document.getElementById("menu-usuario")?.hidePopover();
                        popup?.classList.add("activo");
                        document.body.classList.add("menu-abierto");
                    });

                    confirmar?.addEventListener("click", () => {
                        localStorage.removeItem("usuario");
                        localStorage.removeItem("notificacionesVistas_" + usuario.correo);
                        let rutaLogout = '../index.php';
                        window.location.replace(rutaLogout);
                    });

                    cancelar?.addEventListener("click", () => {
                        popup?.classList.remove("activo");
                        document.body.classList.remove("menu-abierto");
                    });
                });
            });
    };

    document.head.appendChild(linkHeaderCSS);
});

// Refrescar si se vuelve a la página después de cerrar sesión
window.addEventListener("pageshow", event => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (event.persisted && !usuario) {
        window.location.reload();
    }
});
