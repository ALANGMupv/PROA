document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario) {
        window.location.replace('index.html');
        return;
    }

    document.body.classList.add(`rol-${usuario.rol}`);

    // Inyectar CSS del header si no está ya
    const linkHeaderCSS = document.createElement('link');
    linkHeaderCSS.rel = 'stylesheet';
    linkHeaderCSS.href = '/src/app-proa/css/header-proa.css';
    document.head.appendChild(linkHeaderCSS);

    // Determinar ruta relativa hacia header-proa.html según la carpeta actual
    const rutaBase = location.pathname.includes('/app-proa/pas/') ||
    location.pathname.includes('/app-proa/alumno/') ||
    location.pathname.includes('/app-proa/profesor/')
        ? '../'
        : './';

    fetch(`${rutaBase}header-proa.html`)
        .then(res => res.text())
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);

            requestAnimationFrame(() => {
                // Mostrar el nombre y el rol del usuario
                const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;
                const etiquetaRol =
                    usuario.rol === 'alumno' ? ' (Alumno)' :
                        usuario.rol === 'profesor' ? ' (Profesor)' :
                            usuario.rol === 'pas' ? ' (PAS)' : '';

                const nombreHeader = document.getElementById('nombre-usuario-header');
                const nombrePopover = document.getElementById('nombre-usuario-popover');

                if (nombreHeader) nombreHeader.textContent = `${etiquetaRol} ${nombreCompleto}`;
                if (nombrePopover) nombrePopover.textContent = `${etiquetaRol} ${nombreCompleto}`;

                const logoLink = document.getElementById('logo-proa-link');
                if (logoLink) {
                    if (usuario.rol === 'alumno') {
                        logoLink.href = '../alumno/index.html';
                    } else if (usuario.rol === 'profesor') {
                        logoLink.href = '../profesor/index.html';
                    } else if (usuario.rol === 'pas') {
                        logoLink.href = '../pas/index.html';
                    }
                }

                // Cargar notificaciones
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
                            // Crear burbuja si hay notificaciones
                            const yaVistas = localStorage.getItem(`notificacionesVistas_${usuario.correo}`) === 'true';
                            const botonNotificacion = document.querySelector(".boton-notificacion");
                            if (botonNotificacion && !yaVistas) {
                                const burbuja = document.createElement("span");
                                burbuja.classList.add("burbuja-notificacion");
                                botonNotificacion.appendChild(burbuja);
                            }

                            notificaciones
                                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                                .forEach(n => {
                                    const aviso = document.createElement("div");
                                    aviso.classList.add("aviso-item");
                                    aviso.innerHTML = `<strong>${n.texto}</strong><div class="fecha-aviso">${n.fecha}</div>`;
                                    contenedorPopover.appendChild(aviso);
                                });
                        }
                    });

                // Popover de notificaciones
                const botonNotificacion = document.querySelector(".boton-notificacion");
                const menuAvisos = document.getElementById("menu-avisos");
                botonNotificacion?.addEventListener("click", e => {
                    e.preventDefault();

                    // Alternar popover
                    if (menuAvisos.matches(":popover-open")) {
                        menuAvisos.hidePopover();
                    } else {
                        menuAvisos.showPopover();
                    }

                    // Marcar notificaciones como vistas (por usuario)
                    localStorage.setItem(`notificacionesVistas_${usuario.correo}`, 'true');

                    // Eliminar burbuja
                    const burbuja = botonNotificacion.querySelector(".burbuja-notificacion");
                    if (burbuja) burbuja.remove();
                });


                // Cierre de sesión
                const cerrarSesion = document.getElementById("cerrar-sesion");
                const popup = document.querySelector(".popup");
                const confirmar = popup?.querySelector(".popup-confirmar");
                const cancelar = popup?.querySelector(".popup-cancelar");

                cerrarSesion?.addEventListener("click", e => {
                    e.preventDefault();

                    // Cerrar el popover del usuario
                    document.getElementById("menu-usuario")?.hidePopover();

                    // Mostrar el popup de confirmación
                    popup?.classList.add("activo");
                    document.body.classList.add("menu-abierto");
                });

                confirmar?.addEventListener("click", () => {
                    localStorage.removeItem("usuario");
                    localStorage.removeItem("notificacionesVistas_" + usuario.correo);


                    let rutaLogout = './index.html'; // por defecto
                    if (usuario.rol === 'pas') {
                        rutaLogout = '../index.html';
                    } else if (usuario.rol === 'alumno' || usuario.rol === 'profesor') {
                        rutaLogout = '../index.html';
                    }

                    window.location.replace(rutaLogout);
                });

                cancelar?.addEventListener("click", () => {
                    popup?.classList.remove("activo");
                    document.body.classList.remove("menu-abierto");
                });
            });
        });
});

// Recarga al volver con el botón "atrás" tras cerrar sesión
window.addEventListener("pageshow", event => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (event.persisted && !usuario) {
        window.location.reload();
    }
});
