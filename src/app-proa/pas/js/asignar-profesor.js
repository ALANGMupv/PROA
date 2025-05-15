document.addEventListener("DOMContentLoaded", () => {
    const datos = JSON.parse(localStorage.getItem("asignaturaSeleccionada"));
    if (!datos) return;

    // Título dinámico
    const titulo = document.getElementById("titulo-asignacion");
    if (titulo) {
        titulo.textContent = `Asignación Profesores – ${datos.nombre}`;
    }

    // Elementos del DOM
    const listaDisponibles = document.getElementById("lista-profesor-disponibles");
    const listaAsignados = document.getElementById("lista-profesor-nuevos");
    const inputBuscar = document.getElementById("input-buscar-profesor");
    const mensaje = document.getElementById("mensaje-sin-resultados");

    let todosProfesores = [];
    let profesoresAsignados = [datos.titular, ...(datos.colaboradores || [])].filter(Boolean);
    let profesoresDisponibles = [];

    // Cargar desde el JSON
    fetch("/src/api/data/usuarios.json")
        .then(res => res.json())
        .then(data => {
            todosProfesores = data.filter(u => u.rol === "profesor");
            profesoresDisponibles = todosProfesores
                .map(p => `${p.nombre} ${p.apellidos}`)
                .filter(nombre => !profesoresAsignados.includes(nombre));

            renderListas();
        });

    // Render de listas
    function renderListas(filtro = "") {
        listaDisponibles.innerHTML = "";
        listaAsignados.innerHTML = "";

        const disponiblesFiltrados = profesoresDisponibles.filter(nombre =>
            nombre.toLowerCase().includes(filtro.toLowerCase())
        );

        // Mostrar mensaje si no hay resultados
        if (mensaje) {
            mensaje.style.display = disponiblesFiltrados.length === 0 ? "block" : "none";
        }

        // Render disponibles
        disponiblesFiltrados.forEach(nombre => {
            const li = document.createElement("li");
            li.classList.add("item-usuario");
            li.innerHTML = `
                <span>${nombre}</span>
                <button class="btn-icono">
                    <img src="../icons/anyadir.svg" alt="Añadir">
                </button>
            `;
            li.querySelector("button").addEventListener("click", () => {
                profesoresDisponibles = profesoresDisponibles.filter(n => n !== nombre);
                profesoresAsignados.push(nombre);
                renderListas(inputBuscar.value);
                mostrarNotificacion(`Profesor ${nombre} asignado`);
            });
            listaDisponibles.appendChild(li);
        });

        // Render asignados
        profesoresAsignados.forEach(nombre => {
            const li = document.createElement("li");
            li.classList.add("item-usuario");
            li.innerHTML = `
                <span>${nombre}</span>
                <button class="btn-icono eliminar">
                    <img src="../icons/trash.svg" alt="Eliminar">
                </button>
            `;
            li.querySelector("button").addEventListener("click", () => {
                profesoresAsignados = profesoresAsignados.filter(n => n !== nombre);
                profesoresDisponibles.push(nombre);
                renderListas(inputBuscar.value);
                mostrarNotificacion(`Profesor ${nombre} eliminado`);
            });
            listaAsignados.appendChild(li);
        });
    }

    // Búsqueda dinámica
    inputBuscar.addEventListener("input", () => {
        renderListas(inputBuscar.value);
    });

    // Confirmar
    document.getElementById("btn-confirmar").addEventListener("click", () => {
        console.log("Profesores asignados a", datos.nombre, profesoresAsignados);
        mostrarNotificacion(`Se han asignado ${profesoresAsignados.length} profesor(es) a ${datos.nombre}`);
    });

    // Volver
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
