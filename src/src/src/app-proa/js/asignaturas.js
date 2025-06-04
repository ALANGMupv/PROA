fetch('../app/chequear-sesion.php', { credentials: 'include' })
    .then(res => res.json())
    .then(usuario => {
        if (!usuario.rol) {
            window.location.replace("../../index.php");
            return;
        }

        const asignatura = JSON.parse(localStorage.getItem("asignaturaSeleccionada"));
        const submenu = document.getElementById("submenu");
        const dropdown = document.getElementById("dropdown-asignaturas");

        if (!usuario || !asignatura || !submenu || !dropdown) {
            window.location.replace("../../index.php");
            return;
        }

        const rol = usuario.rol;
        const esAlumno = rol === "alumno";
        const esProfesor = rol === "profesor";
        if (!esAlumno && !esProfesor) {
            window.location.replace("../../index.php");
            return;
        }

        // Cambiar título del submenú
        const tituloAsignatura = document.querySelector("#submenu .titulo-submenu h2");
        if (tituloAsignatura) {
            tituloAsignatura.textContent = asignatura.nombre;
        }

        // Activar enlace actual
        const rutaActual = window.location.pathname.split("/").pop();
        document.querySelectorAll("#submenu a").forEach(enlace => {
            const href = enlace.getAttribute("href");
            if (href !== "#" && href === rutaActual) {
                enlace.classList.add("activo");
            }

            if (rutaActual === "realizar-examen.php") {
                if (esAlumno && href === "examenes-alumno.php") enlace.classList.add("activo");
                if (esProfesor && href === "examenes-profesor.php") enlace.classList.add("activo");
            }
        });

        // Dropdown responsive
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

        // Cargar asignaturas desde PHP
        const ruta = esAlumno ? "../app/obtener-asignaturas-alumno.php" : "../app/obtener-asignaturas-profesor.php";
        fetch(ruta, { credentials: "include" })
            .then(res => res.json())
            .then(asignaturas => {
                if (!Array.isArray(asignaturas)) return;

                asignaturas.forEach(asig => {
                    const opcion = document.createElement("option");
                    opcion.value = asig.codigo;
                    opcion.textContent = asig.nombre;
                    if (asig.codigo === asignatura.codigo) opcion.selected = true;
                    dropdown.appendChild(opcion);
                });

                dropdown.addEventListener("change", e => {
                    const nueva = asignaturas.find(a => a.codigo === e.target.value);
                    if (nueva) {
                        localStorage.setItem("asignaturaSeleccionada", JSON.stringify({
                            nombre: nueva.nombre,
                            codigo: nueva.codigo
                        }));
                        window.location.href = esAlumno ? "asignatura-alumno.php" : "asignatura-profesor.php";
                    }
                });
            });
    });
