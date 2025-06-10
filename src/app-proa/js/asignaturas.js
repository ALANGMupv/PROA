fetch('../app/chequear-sesion.php', { credentials: 'include' })
    .then(res => res.json())
    .then(async usuario => {
        if (!usuario.rol) {
            window.location.replace("../../index.php");
            return;
        }

        const submenu = document.getElementById("submenu");
        const dropdown = document.getElementById("dropdown-asignaturas");

        if (!submenu || !dropdown) {
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

        let asignatura = null;
        try {
            asignatura = JSON.parse(localStorage.getItem("asignaturaSeleccionada"));
            // Forzar compatibilidad con propiedades anteriores
            if (asignatura?.codigoAsignatura && !asignatura.codigo) {
                asignatura.codigo = asignatura.codigoAsignatura;
            }
        } catch (e) {
            console.warn("Asignatura en localStorage malformada o nula:", e);
        }

        // Guardar en la sesión de PHP al cargar
        if (asignatura && asignatura.codigo && asignatura.nombre) {
            try {
                await fetch("../app/guardar-asignatura-sesion.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        codigoAsignatura: asignatura.codigo,
                        nombre: asignatura.nombre
                    }),
                    credentials: "include"
                });
            } catch (error) {
                console.error("Error al guardar asignatura en sesión:", error);
            }
        }

        // Cambiar título del submenú
        const tituloAsignatura = document.querySelector("#submenu .titulo-submenu h2");
        if (tituloAsignatura && asignatura?.nombre) {
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

                dropdown.innerHTML = "";

                asignaturas.forEach(asig => {
                    const opcion = document.createElement("option");
                    opcion.value = asig.codigo;
                    opcion.textContent = asig.nombre;

                    if (asignatura?.codigo && asig.codigo === asignatura.codigo) {
                        opcion.selected = true;
                    }

                    dropdown.appendChild(opcion);
                });

                dropdown.dispatchEvent(new Event("change"));

                dropdown.addEventListener("change", async e => {
                    const nueva = asignaturas.find(a => a.codigo === e.target.value);
                    if (nueva) {
                        const nuevaAsignatura = {
                            nombre: nueva.nombre,
                            codigoAsignatura: nueva.codigo
                        };

                        localStorage.setItem("asignaturaSeleccionada", JSON.stringify(nuevaAsignatura));

                        try {
                            const response = await fetch("../app/guardar-asignatura-sesion.php", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(nuevaAsignatura),
                                credentials: "include"
                            });

                            const result = await response.json();
                            if (result.success) {
                                window.location.href = esAlumno ? "asignatura-alumno.php" : "asignatura-profesor.php";
                            } else {
                                console.error("Error al guardar asignatura en sesión:", result);
                            }
                        } catch (error) {
                            console.error("Error al hacer fetch:", error);
                        }
                    }
                });
            });
    });
