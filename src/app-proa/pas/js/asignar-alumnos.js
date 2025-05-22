document.addEventListener("DOMContentLoaded", () => {
    const datos = JSON.parse(localStorage.getItem("asignaturaSeleccionada"));
    if (!datos) return;

    // Título dinámico
    document.getElementById("titulo-asignacion").textContent = `Asignación Alumnos – ${datos.nombre}`;

    const listaDisponibles = document.getElementById("lista-disponibles");
    const listaAsignados = document.getElementById("lista-asignados");
    const inputBuscar = document.getElementById("input-buscar-disponibles");

    let todosAlumnos = [];
    let alumnosAsignados = [...datos.alumnos]; // ya asignados
    let alumnosDisponibles = []; // se calcula después del fetch
    let hayCambios = false;


    // Cargar todos los alumnos del JSON
    fetch("../../api/data/usuarios.json")
        .then(res => res.json())
        .then(data => {
            todosAlumnos = data.filter(u => u.rol === "alumno");
            alumnosDisponibles = todosAlumnos
                .map(a => `${a.nombre} ${a.apellidos}`)
                .filter(n => !alumnosAsignados.includes(n));

            renderListas();
        });

    const dialog = document.getElementById("dialog-cambios");
    const btnCancelar = document.getElementById("cancelar-dialogo");
    const btnConfirmarSalida = document.getElementById("confirmar-salida");

    document.getElementById("btn-volver").addEventListener("click", (e) => {
        e.preventDefault();
        if (hayCambios) {
            dialog.showModal();
        } else {
            window.location.replace("asignaturas.html");
        }
    });

    btnCancelar.addEventListener("click", () => {
        dialog.close();
    });

    btnConfirmarSalida.addEventListener("click", () => {
        dialog.close();
        history.back();
    });

    // Renderiza ambas listas
    function renderListas(filtro = "") {
        // Render disponibles
        listaDisponibles.innerHTML = "";

        const encontrados = alumnosDisponibles.filter(nombre =>
            nombre.toLowerCase().includes(filtro)
        );

        const mensaje = document.getElementById("mensaje-sin-resultados");
        mensaje.style.display = encontrados.length === 0 ? "block" : "none";

        encontrados.forEach(nombreCompleto => {
            const li = document.createElement("li");
            li.classList.add("item-usuario");
            li.innerHTML = `
            <span>${nombreCompleto}</span>
            <button class="btn-icono">
                <img src="../icons/anyadir.svg" alt="Añadir">
            </button>
        `;
            li.querySelector("button").addEventListener("click", () => {
                if (!alumnosAsignados.includes(nombreCompleto)) {
                    alumnosAsignados.push(nombreCompleto);
                    alumnosDisponibles = alumnosDisponibles.filter(n => n !== nombreCompleto);
                    renderListas(filtro); // mantener filtro activo
                    mostrarNotificacion(`Alumno ${nombreCompleto} asignado`);
                }
            });
            listaDisponibles.appendChild(li);
        });

        listaAsignados.innerHTML = "";
        alumnosAsignados.forEach(nombre => {
            const li = document.createElement("li");
            li.classList.add("item-usuario");

            li.innerHTML = `
                <span>${nombre}</span>
                 <button class="btn-icono eliminar">
                    <img src="../icons/trash.svg" alt="Eliminar">
                 </button>
            `;

            li.querySelector("button").addEventListener("click", () => {
                // Quitar de asignados y volver a disponibles
                alumnosAsignados = alumnosAsignados.filter(n => n !== nombre);
                alumnosDisponibles.push(nombre);
                renderListas(inputBuscar.value); // mantener filtro si hay
                mostrarNotificacion(`Alumno ${nombre} desasignado`);
            });

            listaAsignados.appendChild(li);
        });
    }

    // Filtro en tiempo real
    inputBuscar.addEventListener("input", () => {
        renderListas(inputBuscar.value);
    });

    // Confirmar
    document.getElementById("btn-confirmar").addEventListener("click", () => {
        console.log("Alumnos asignados a", datos.nombre, alumnosAsignados);
        mostrarNotificacion("Alumnos asignados correctamente", () => {
            window.location.href = "ficha-asignatura-pas.html";
        });
    });

    // Volver
    document.getElementById("btn-volver").addEventListener("click", (e) => {
        e.preventDefault();
        history.back();
    });
});

// Notificación flotante
function mostrarNotificacion(mensaje, callback = null) {
    const notif = document.getElementById("notificacion");
    notif.textContent = mensaje;
    notif.style.display = "block";
    setTimeout(() => {
        notif.style.display = "none";
        if (callback) callback();
    }, 2000);
}
