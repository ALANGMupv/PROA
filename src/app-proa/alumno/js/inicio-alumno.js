// Comprueba si hay una sesión activa mediante fetch a PHP
fetch('../app/chequear-sesion.php', { credentials: 'include' })
    .then(res => res.json())
    .then(usuario => {
        console.log('Usuario en sesión:', usuario);
        // Si no hay sesión iniciada, redirige a la página principal
        if (!usuario.rol) {
            window.location.href = '../index.php';
            return;
        }

        // Normaliza el nombre del usuario para comparar con los datos del JSON
        const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;
        const normalizar = str =>
            str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
        const nombreNormalizado = normalizar(nombreCompleto);

        // Carga las asignaturas desde obtener-asignaturas-alumno.php filtra las del usuario actual
        fetch("../app/obtener-asignaturas-alumno.php", { credentials: "include" })
            .then(res => res.json())
            .then(asignaturas => {
                console.log("Asignaturas obtenidas:", asignaturas); // para depurar
                renderizarAsignaturas(asignaturas);
            });

        // Formatea el año académico (ej: 2024 → 2024/25)
        function formatearAnyo() {
            return "2024/25";
        }

        // Renderiza las asignaturas en pantalla
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

                // HTML interno con icono, datos y favorito
                div.innerHTML = `
                    <div class="asignatura-izquierda">
                        <img src="../icons/book.svg" alt="Libro" class="icono-azul" />
                        <div>
                            <h4>${asig.nombre}</h4>
                            <p>${asig.codigo} — ${asig.curso}º curso, ${String(asig.semestre).trim() === "1" ? "1º semestre" : "2º semestre"},${formatearAnyo(asig.anyo)}</p>
                        </div>
                    </div>
                    <div class="asignatura-derecha">
                        <img src="${asig.favorita ? "../icons/star-fill.svg" : "../icons/star.svg"}"
                            alt="Favorito"
                            class="btnAmarillo icono-favorito"
                            data-favorita="${asig.favorita}" />
                    </div>
                `;

                // Al hacer clic en la asignatura, se guarda como seleccionada y redirige
                div.addEventListener("click", () => {
                    localStorage.setItem("asignaturaSeleccionada", JSON.stringify({
                        nombre: asig.nombre,
                        codigo: asig.codigo
                    }));
                    window.location.href = "asignatura-alumno.php";
                });

                lista.appendChild(div);
            });

            activarEventosFavoritos();
            aplicarFiltros();
        }

        // Maneja el click en los iconos de favorito
        function activarEventosFavoritos() {
            document.querySelectorAll(".icono-favorito").forEach(icono => {
                icono.addEventListener("click", e => {
                    e.stopPropagation(); // Evita redirección al hacer clic en el icono
                    const contenedor = icono.closest(".item-asignatura");
                    const esFavorita = icono.dataset.favorita === "true";

                    // FETCH PARA CAMBIAR O DESASIGNAR UNA ASIGNATURA COMO FAVORITA
                    const nuevaFavorita = !esFavorita;

                    icono.src = nuevaFavorita ? "../icons/star-fill.svg" : "../icons/star.svg";
                    icono.dataset.favorita = nuevaFavorita ? "true" : "false";
                    contenedor.classList.toggle("favorita", nuevaFavorita);

                    fetch("../app/actualizar-favorita.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({
                            codigo: contenedor.dataset.codigo.toUpperCase(),
                            favorita: nuevaFavorita ? 1 : 0
                        })
                    })
                        .then(res => {
                            if (!res.ok) throw new Error("Respuesta no OK del servidor");
                            return res.json();
                        })
                        .then(data => {
                            if (!data.exito) {
                                console.error("Error al actualizar favorita:", data.mensaje);
                            }
                        })
                        .catch(error => {
                            console.error("Error en fetch:", error);
                        });
                    aplicarFiltros();
                });
            });
        }

        // Aplica los filtros activos sobre las asignaturas
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

            // Mostrar mensaje si no hay favoritas visibles
            const mensajeVacio = document.getElementById("mensaje-sin-favoritas");
            mensajeVacio.style.display = (mostrarSoloFavoritas && asignaturasVisibles === 0) ? "block" : "none";
        }

        // Normaliza textos para comparaciones sin acentos ni mayúsculas
        function normalizarTexto(str) {
            return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
        }

        // Eventos para filtros y botón de favoritas
        document.getElementById("btnFavoritas").addEventListener("click", e => {
            e.currentTarget.classList.toggle("activo");
            aplicarFiltros();
        });

        document.getElementById("filtroTexto").addEventListener("input", aplicarFiltros);
        document.getElementById("filtroCurso").addEventListener("change", aplicarFiltros);
        document.getElementById("filtroSemestre").addEventListener("change", aplicarFiltros);
        document.getElementById("filtroAnyo").addEventListener("change", aplicarFiltros);

        // ================================
        // NOTIFICACIONES
        // ================================
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

        // Mostrar u ocultar panel de notificaciones según checkbox
        const checkboxNotificaciones = document.getElementById("mostrarNotificaciones");
        const contenidoNotificaciones = document.getElementById("contenido-notificaciones");

        if (checkboxNotificaciones && contenidoNotificaciones) {
            contenidoNotificaciones.style.display = checkboxNotificaciones.checked ? "block" : "none";

            checkboxNotificaciones.addEventListener("change", () => {
                contenidoNotificaciones.style.display = checkboxNotificaciones.checked ? "block" : "none";
            });
        }
    });
