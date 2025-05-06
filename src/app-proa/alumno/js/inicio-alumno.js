document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || usuario.rol !== "alumno") {
        window.location.href = "../../index.html";
        return;
    }

    const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;
    const normalizar = str =>
        str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
    const nombreNormalizado = normalizar(nombreCompleto);

    fetch("../../api/data/asignaturas.json")
        .then(res => res.json())
        .then(asignaturas => {
            const asignaturasUsuario = asignaturas.filter(asig =>
                asig.alumnos?.some(alumno => normalizar(alumno) === nombreNormalizado)
            );
            renderizarAsignaturas(asignaturasUsuario);
        });

    function renderizarAsignaturas(asignaturas) {
        const lista = document.getElementById("lista-asignaturas");
        lista.innerHTML = "";

        asignaturas.forEach(asig => {
            const div = document.createElement("div");
            div.classList.add("item-asignatura");
            div.dataset.nombre = asig.nombre.toLowerCase();
            div.dataset.codigo = asig.codigo.toLowerCase();
            if (asig.favorita) div.classList.add("favorita");

            div.innerHTML = `
                <div class="asignatura-izquierda">
                    <img src="../icons/book.svg" alt="Libro" class="icono-azul" />
                    <div>
                        <h4>${asig.nombre}</h4>
                        <p>${asig.codigo}</p>
                    </div>
                </div>
                <div class="asignatura-derecha">
                    <img src="${asig.favorita ? "../icons/favoritos-relleno.svg" : "../icons/favoritos.svg"}"
                         alt="Favorito"
                         class="icono-azul icono-favorito"
                         data-favorita="${asig.favorita}" />
                </div>
            `;

            div.addEventListener("click", () => {
                localStorage.setItem("asignaturaSeleccionada", JSON.stringify({
                    nombre: asig.nombre,
                    codigo: asig.codigo
                }));
                window.location.href = "asignatura-alumno.html";
            });

            lista.appendChild(div);
        });

        activarEventosFavoritos();
        aplicarFiltros();
    }

    function activarEventosFavoritos() {
        document.querySelectorAll(".icono-favorito").forEach(icono => {
            icono.addEventListener("click", e => {
                e.stopPropagation();
                const contenedor = icono.closest(".item-asignatura");
                const esFavorita = icono.dataset.favorita === "true";

                icono.src = esFavorita ? "../icons/favoritos.svg" : "../icons/favoritos-relleno.svg";
                icono.dataset.favorita = esFavorita ? "false" : "true";
                contenedor.classList.toggle("favorita", !esFavorita);

                aplicarFiltros();
            });
        });
    }

    function aplicarFiltros() {
        const mostrarSoloFavoritas = document.getElementById("btnFavoritas").classList.contains("activo");
        const textoBusqueda = document.getElementById("filtroTexto").value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

        document.querySelectorAll(".item-asignatura").forEach(asignatura => {
            const esFavorita = asignatura.classList.contains("favorita");
            const nombre = asignatura.dataset.nombre.normalize("NFD").replace(/\p{Diacritic}/gu, "");
            const codigo = asignatura.dataset.codigo.normalize("NFD").replace(/\p{Diacritic}/gu, "");

            const coincideTexto = nombre.includes(textoBusqueda) || codigo.includes(textoBusqueda);
            const pasaFiltro = !mostrarSoloFavoritas || esFavorita;

            asignatura.style.display = (coincideTexto && pasaFiltro) ? "flex" : "none";
        });
    }

    document.getElementById("btnFavoritas").addEventListener("click", e => {
        e.currentTarget.classList.toggle("activo");
        aplicarFiltros();
    });

    document.getElementById("filtroTexto").addEventListener("input", aplicarFiltros);

    fetch("../../api/data/notificaciones.json")
        .then(res => res.json())
        .then(data => {
            const usuarioCorreo = usuario.correo;
            const notificaciones = data[usuarioCorreo] || [];

            const listaNotif = document.getElementById("lista-notificaciones");
            listaNotif.innerHTML = "";

            if (notificaciones.length === 0) {
                listaNotif.innerHTML = `<li class="notificacion-item"><p>No tienes notificaciones recientes.</p></li>`;
            } else {
                notificaciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                    .forEach(n => {
                        const li = document.createElement("li");
                        li.classList.add("notificacion-item");
                        li.innerHTML = `<p>${n.texto}</p><small>${n.fecha}</small>`;
                        listaNotif.appendChild(li);
                    });
            }
        });
});
