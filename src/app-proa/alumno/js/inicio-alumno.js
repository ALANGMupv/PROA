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

    function formatearAnyo(anyo) {
        const inicio = parseInt(anyo);
        const fin = inicio + 1;
        return `${inicio}/${fin.toString().slice(-2)}`; // quedaría: 2024/25
    }

    function renderizarAsignaturas(asignaturas) {
        const lista = document.getElementById("lista-asignaturas");
        lista.innerHTML = "";

        asignaturas.forEach(asig => {
            const div = document.createElement("div");
            div.classList.add("item-asignatura");
            div.dataset.nombre = asig.nombre.toLowerCase();
            div.dataset.codigo = asig.codigo.toLowerCase();
            div.dataset.curso = asig.curso;
            div.dataset.semestre = asig.semestre;
            div.dataset.anyo = asig.anyo;
            if (asig.favorita) div.classList.add("favorita");

            div.innerHTML = `
                <div class="asignatura-izquierda">
                    <img src="../icons/book.svg" alt="Libro" class="icono-azul" />
                    <div>
                        <h4>${asig.nombre}</h4>
                        <p>${asig.codigo} — ${asig.curso}º curso, ${asig.semestre === "1" ? "1º semestre" : "2º semestre"}, ${formatearAnyo(asig.anyo)}</p>
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
        const textoBusqueda = normalizarTexto(document.getElementById("filtroTexto").value);
        const filtroCurso = document.getElementById("filtroCurso").value;
        const filtroSemestre = document.getElementById("filtroSemestre").value;
        const filtroAnyo = document.getElementById("filtroAnyo").value;

        let asignaturasVisibles = 0;

        document.querySelectorAll(".item-asignatura").forEach(asignatura => {
            const esFavorita = asignatura.classList.contains("favorita");
            const nombre = normalizarTexto(asignatura.dataset.nombre);
            const codigo = normalizarTexto(asignatura.dataset.codigo);
            const curso = asignatura.dataset.curso;
            const semestre = asignatura.dataset.semestre;
            const anyo = asignatura.dataset.anyo;

            const coincideTexto = nombre.includes(textoBusqueda) || codigo.includes(textoBusqueda);
            const pasaFiltroFavoritas = !mostrarSoloFavoritas || esFavorita;
            const pasaFiltroCurso = !filtroCurso || curso === filtroCurso;
            const pasaFiltroSemestre = !filtroSemestre || semestre === filtroSemestre;
            const pasaFiltroAnyo = !filtroAnyo || anyo === filtroAnyo;

            const visible = coincideTexto && pasaFiltroFavoritas && pasaFiltroCurso && pasaFiltroSemestre && pasaFiltroAnyo;
            asignatura.style.display = visible ? "flex" : "none";

            if (visible) asignaturasVisibles++;
        });

        const mensajeVacio = document.getElementById("mensaje-sin-favoritas");
        mensajeVacio.style.display = (mostrarSoloFavoritas && asignaturasVisibles === 0) ? "block" : "none";
    }

    function normalizarTexto(str) {
        return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
    }


    document.getElementById("btnFavoritas").addEventListener("click", e => {
        e.currentTarget.classList.toggle("activo");
        aplicarFiltros();
    });

    document.getElementById("filtroTexto").addEventListener("input", aplicarFiltros);
    document.getElementById("filtroCurso").addEventListener("change", aplicarFiltros);
    document.getElementById("filtroSemestre").addEventListener("change", aplicarFiltros);
    document.getElementById("filtroAnyo").addEventListener("change", aplicarFiltros);


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

    // Control de visibilidad del panel de notificaciones
    const checkboxNotificaciones = document.getElementById("mostrarNotificaciones");
    const contenidoNotificaciones = document.getElementById("contenido-notificaciones");

    if (checkboxNotificaciones && contenidoNotificaciones) {
        contenidoNotificaciones.style.display = checkboxNotificaciones.checked ? "block" : "none";

        checkboxNotificaciones.addEventListener("change", () => {
            contenidoNotificaciones.style.display = checkboxNotificaciones.checked ? "block" : "none";
        });
    }


});
