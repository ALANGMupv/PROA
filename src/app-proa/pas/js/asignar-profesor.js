document.addEventListener("DOMContentLoaded", () => {
    const datos = JSON.parse(localStorage.getItem("asignaturaSeleccionada"));
    if (!datos) return;

    // Título dinámico
    const titulo = document.getElementById("titulo-asignacion");
    if (titulo) {
        titulo.textContent = `Asignación Profesores - ${datos.nombre}`;
    }

    const listaDisponibles = document.getElementById("lista-profesor-disponibles");
    const listaSeleccionados = document.getElementById("lista-profesor-nuevos");
    const inputBusqueda = document.getElementById("input-buscar-profesor");

    let profesoresDisponibles = [];
    let seleccionados = [];

    // Cargar todos los profesores del JSON
    fetch("/src/api/data/usuarios.json")
        .then(res => res.json())
        .then(data => {
            profesoresDisponibles = data.filter(u => u.rol === "profesor");
            renderDisponibles();
        });

    // Render disponibles (solo los asignados actualmente)
    function renderDisponibles(filtro = "") {
        listaDisponibles.innerHTML = "";

        profesoresDisponibles.forEach(prof => {
            const nombreCompleto = `${prof.nombre} ${prof.apellidos}`;

            // Mostrar solo si está en los actuales (colaboradores o titular)
            const yaAsignado = datos.colaboradores.includes(nombreCompleto) || datos.titular === nombreCompleto;
            if (!yaAsignado) return;

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
                    mostrarNotificacion(`Profesor ${nombreCompleto} añadido`);
                } else {
                    mostrarNotificacion(`Profesor ${nombreCompleto} ya está en la lista`);
                }
            });

            listaDisponibles.appendChild(li);
        });
    }

    // Render seleccionados
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
                mostrarNotificacion(`Profesor ${nombre} eliminado`);
            });

            listaSeleccionados.appendChild(li);
        });
    }

    // Buscar profesores
    inputBusqueda.addEventListener("input", () => {
        const texto = inputBusqueda.value.toLowerCase();
        renderDisponibles(texto);
    });

    // Confirmar asignación
    document.getElementById("btn-confirmar").addEventListener("click", () => {
        if (seleccionados.length === 0) {
            mostrarNotificacion("No hay profesores para asignar");
            return;
        }

        console.log("Profesores asignados a", datos.nombre, seleccionados);
        mostrarNotificacion(`Asignados ${seleccionados.length} profesor(es) a ${datos.nombre}`);
        seleccionados = [];
        renderSeleccionados();
    });

    // Volver atrás
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
