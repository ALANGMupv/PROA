// inicio-profesor.js

document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || usuario.rol !== "profesor") {
        window.location.replace("../../index.html");
        return;
    }

    const nombreNormalizado = normalizar(`${usuario.nombre} ${usuario.apellidos}`);

    fetch("../../api/data/asignaturas.json")
        .then(res => res.json())
        .then(asignaturas => {
            const asignaturasUsuario = asignaturas.filter(asig =>
                normalizar(asig.titular) === nombreNormalizado ||
                asig.colaboradores?.some(colab => normalizar(colab) === nombreNormalizado)
            );

            renderizarAsignaturas(asignaturasUsuario);
        });

    function normalizar(str) {
        return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
    }

    function renderizarAsignaturas(asignaturas) {
        const lista = document.getElementById("lista-asignaturas");
        lista.innerHTML = "";

        asignaturas.forEach(asig => {
            const esResponsable = normalizar(asig.titular) === nombreNormalizado;

            const div = document.createElement("div");
            div.classList.add("item-asignatura");
            div.dataset.rol = esResponsable ? "responsable" : "colaborador";
            div.dataset.nombre = asig.nombre.toLowerCase();
            div.dataset.codigo = asig.codigo.toLowerCase();
            div.dataset.curso = asig.curso;
            div.dataset.semestre = asig.semestre;
            div.dataset.anyo = asig.anyo;
            if (asig.favorita) div.classList.add("favorita");

            const semestreTexto = asig.semestre === "1" ? "1º semestre" : "2º semestre";
            const anyoTexto = `${asig.anyo}/${(parseInt(asig.anyo) + 1).toString().slice(-2)}`;

            div.innerHTML = `
            <div class="asignatura-izquierda">
                <img src="../icons/book.svg" alt="Libro" class="icono-azul" />
                <div>
                    <h4>${asig.nombre}</h4>
                    <p>${asig.codigo} — ${asig.curso}º curso, ${semestreTexto}, ${anyoTexto}</p>
                </div>
            </div>
            <div class="asignatura-derecha">
                <span class="rol-profesor">${esResponsable ? "Profesor responsable" : "Profesor colaborador"}</span>
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
                window.location.href = "asignatura-profesor.html";
            });

            lista.appendChild(div);
        });

        activarEventosAsignaturas();
        aplicarFiltros();
    }


    function aplicarFiltros() {
        const mostrarSoloFavoritas = document.getElementById("btnFavoritas").classList.contains("activo");
        const rolSeleccionado = document.getElementById("filtroRol").value;
        const textoBusqueda = document.getElementById("filtroTexto").value.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        const filtroCurso = document.getElementById("filtroCurso")?.value;
        const filtroSemestre = document.getElementById("filtroSemestre")?.value;
        const filtroAnyo = document.getElementById("filtroAnyo")?.value;

        let asignaturasVisibles = 0;

        document.querySelectorAll(".item-asignatura").forEach(asignatura => {
            const esFavorita = asignatura.classList.contains("favorita");
            const rolAsignatura = asignatura.dataset.rol;
            const nombre = asignatura.dataset.nombre.normalize("NFD").replace(/\p{Diacritic}/gu, "");
            const codigo = asignatura.dataset.codigo.normalize("NFD").replace(/\p{Diacritic}/gu, "");

            const curso = asignatura.dataset.curso;
            const semestre = asignatura.dataset.semestre;
            const anyo = asignatura.dataset.anyo;

            const coincideTexto = nombre.includes(textoBusqueda) || codigo.includes(textoBusqueda);
            const pasaFiltroFavorita = !mostrarSoloFavoritas || esFavorita;
            const pasaFiltroRol = rolSeleccionado === "todos" || rolSeleccionado === rolAsignatura;
            const pasaFiltroCurso = !filtroCurso || curso === filtroCurso;
            const pasaFiltroSemestre = !filtroSemestre || semestre === filtroSemestre;
            const pasaFiltroAnyo = !filtroAnyo || anyo === filtroAnyo;

            const visible = coincideTexto && pasaFiltroFavorita && pasaFiltroRol && pasaFiltroCurso && pasaFiltroSemestre && pasaFiltroAnyo;

            asignatura.style.display = visible ? "flex" : "none";
            if (visible) asignaturasVisibles++;
        });

        const mensajeVacio = document.getElementById("mensaje-sin-favoritas");
        mensajeVacio.style.display = (mostrarSoloFavoritas && asignaturasVisibles === 0) ? "block" : "none";
    }


    function activarEventosAsignaturas() {
        document.querySelectorAll(".icono-favorito").forEach(icono => {
            icono.addEventListener("click", event => {
                event.stopPropagation();
                const contenedor = icono.closest(".item-asignatura");
                const esFavorita = icono.dataset.favorita === "true";

                icono.src = esFavorita ? "../icons/favoritos.svg" : "../icons/favoritos-relleno.svg";
                icono.dataset.favorita = esFavorita ? "false" : "true";
                contenedor.classList.toggle("favorita", !esFavorita);

                aplicarFiltros();
            });
        });
    }

    document.getElementById("btnFavoritas").addEventListener("click", e => {
        e.currentTarget.classList.toggle("activo");
        aplicarFiltros();
    });

    document.getElementById("filtroRol").addEventListener("change", aplicarFiltros);
    document.getElementById("filtroTexto").addEventListener("input", aplicarFiltros);
    document.getElementById("filtroCurso").addEventListener("change", aplicarFiltros);
    document.getElementById("filtroSemestre").addEventListener("change", aplicarFiltros);
    document.getElementById("filtroAnyo").addEventListener("change", aplicarFiltros);

    // Cargar notificaciones
    fetch("../../api/data/notificaciones.json")
        .then(res => res.json())
        .then(data => {
            const notificaciones = data[usuario.correo] || [];
            const listaNotif = document.getElementById("lista-notificaciones");
            listaNotif.innerHTML = "";

            if (notificaciones.length === 0) {
                const li = document.createElement("li");
                li.classList.add("notificacion-item");
                li.innerHTML = `<p>No tienes notificaciones recientes.</p>`;
                listaNotif.appendChild(li);
            } else {
                notificaciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                    .forEach(n => {
                        const li = document.createElement("li");
                        li.classList.add("notificacion-item");
                        li.innerHTML = `<p>${n.texto}</p><small>${n.fecha}</small>`;
                        listaNotif.appendChild(li);
                    });

                const iconoNotif = document.querySelector(".icono-notificacion");
                if (iconoNotif) {
                    const burbuja = document.createElement("span");
                    burbuja.classList.add("burbuja-notificacion");
                    iconoNotif.parentElement.style.position = "relative";
                    iconoNotif.parentElement.appendChild(burbuja);
                }
            }
        });

    const checkboxNotificaciones = document.getElementById("mostrarNotificaciones");
    const contenidoNotificaciones = document.getElementById("contenido-notificaciones");

    if (checkboxNotificaciones && contenidoNotificaciones) {
        contenidoNotificaciones.style.display = checkboxNotificaciones.checked ? "block" : "none";

        checkboxNotificaciones.addEventListener("change", () => {
            contenidoNotificaciones.style.display = checkboxNotificaciones.checked ? "block" : "none";
        });
    }
});
