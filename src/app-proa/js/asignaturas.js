document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
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

    // Cambia el título del submenú
    const tituloAsignatura = document.querySelector("#submenu .titulo-submenu h2");
    if (tituloAsignatura) {
        tituloAsignatura.textContent = asignatura.nombre;
    }

    // Activar enlace actual en el submenú
    const rutaActual = window.location.pathname.split("/").pop();
    document.querySelectorAll("#submenu a").forEach(enlace => {
        const href = enlace.getAttribute("href");
        if (href !== "#" && href === rutaActual) {
            enlace.classList.add("activo");
        }

        // Compatibilidad con realizar-examen.php
        if (rutaActual === "realizar-examen.php") {
            if (esAlumno && href === "examenes-alumno.php") enlace.classList.add("activo");
            if (esProfesor && href === "examenes-profesor.php") enlace.classList.add("activo");
        }
    });

    // Dropdown responsive: clona el botón del submenú
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

    // Cargar asignaturas en el dropdown
    fetch("../../api/data/asignaturas.json")
        .then(res => res.json())
        .then(asignaturas => {
            const normalizar = str => str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
            const nombreNormalizado = normalizar(`${usuario.nombre} ${usuario.apellidos}`);

            let asignaturasUsuario = [];
            if (esAlumno) {
                asignaturasUsuario = asignaturas.filter(asig =>
                    asig.alumnos?.some(al => normalizar(al) === nombreNormalizado)
                );
            } else {
                asignaturasUsuario = asignaturas.filter(asig =>
                    normalizar(asig.titular) === nombreNormalizado ||
                    (asig.colaboradores || []).some(colab => normalizar(colab) === nombreNormalizado)
                );
            }

            asignaturasUsuario.forEach(asig => {
                const opcion = document.createElement("option");
                opcion.value = asig.codigo;
                opcion.textContent = asig.nombre;
                if (asig.codigo === asignatura.codigo) opcion.selected = true;
                dropdown.appendChild(opcion);
            });

            dropdown.addEventListener("change", e => {
                const nueva = asignaturasUsuario.find(a => a.codigo === e.target.value);
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
