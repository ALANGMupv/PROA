document.addEventListener("DOMContentLoaded", () => {
    const datos = JSON.parse(localStorage.getItem("asignaturaSeleccionada"));
    if (!datos) return;

    // Actualiza el título con el nombre de la asignatura (si existe el ID)
    const titulo = document.getElementById("titulo-asignacion");
    if (titulo) {
        titulo.textContent = `Asignación Alumnos - ${datos.nombre}`;
    }

    const listaDisponibles = document.getElementById("lista-alumnos-disponibles");
    const listaSeleccionados = document.getElementById("lista-alumnos-nuevos");
    const inputBusqueda = document.getElementById("input-buscar-alumno");

    let alumnosDisponibles = [];
    let seleccionados = [];

    // Cargar usuarios
    fetch("/src/api/data/usuarios.json")
        .then(res => res.json())
        .then(data => {
            alumnosDisponibles = data.filter(u => u.rol === "alumno");
            renderDisponibles();
        });

    // Render alumnos disponibles con filtro
    function renderDisponibles(filtro = "") {
        listaDisponibles.innerHTML = "";

        alumnosDisponibles.forEach(alumno => {
            const nombreCompleto = `${alumno.nombre} ${alumno.apellidos}`;
            if (filtro && !nombreCompleto.toLowerCase().includes(filtro)) return;

            const li = document.createElement("li");
            li.classList.add("item-usuario");

            li.innerHTML = `
                <span>${nombreCompleto}</span>
                <button class="btn-icono">
                    <img src="../icons/anyadir.svg" alt="Añadir">
                </button>
            `;

            li.querySelector("button").addEventListener("click", () => {
                if (!seleccionados.includes(nombreCompleto)) {
                    seleccionados.push(nombreCompleto);
                    renderSeleccionados();
                    mostrarNotificacion(`Alumno ${nombreCompleto} añadido`);
                } else {
                    mostrarNotificacion(`Alumno ${nombreCompleto} ya está en la lista`);
                }
            });

            listaDisponibles.appendChild(li);
        });
    }

    // Render alumnos seleccionados
    function renderSeleccionados() {
        listaSeleccionados.innerHTML = "";

        seleccionados.forEach(nombre => {
            const li = document.createElement("li");
            li.classList.add("item-usuario");

            li.innerHTML = `
                <span>${nombre}</span>
                <button class="btn-icono eliminar">
                    <img src="../icons/trash.svg" alt="Eliminar">
                </button>
            `;

            li.querySelector("button").addEventListener("click", () => {
                seleccionados = seleccionados.filter(n => n !== nombre);
                renderSeleccionados();
                mostrarNotificacion(`Alumno ${nombre} eliminado`);
            });

            listaSeleccionados.appendChild(li);
        });
    }

    // Búsqueda dinámica
    inputBusqueda.addEventListener("input", () => {
        const texto = inputBusqueda.value.toLowerCase();
        renderDisponibles(texto);
    });

    // Confirmar asignación
    document.getElementById("btn-confirmar").addEventListener("click", () => {
        if (seleccionados.length === 0) {
            mostrarNotificacion("No hay alumnos para asignar");
            return;
        }

        console.log("Alumnos asignados a", datos.nombre, seleccionados);
        mostrarNotificacion(`Asignados ${seleccionados.length} alumno(s) a ${datos.nombre}`);
        seleccionados = [];
        renderSeleccionados();
    });

    // Botón volver
    document.getElementById("btn-volver").addEventListener("click", (e) => {
        e.preventDefault();
        history.back();
    });
});

// Notificación flotante
function mostrarNotificacion(mensaje) {
    const notif = document.getElementById("notificacion");
    notif.textContent = mensaje;
    notif.style.display = "block";
    setTimeout(() => {
        notif.style.display = "none";
    }, 3000);
}
