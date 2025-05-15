document.addEventListener("DOMContentLoaded", () => {
    const datos = JSON.parse(localStorage.getItem("asignaturaSeleccionada"));
    if (!datos) return;

    document.getElementById("titulo-asignacion").textContent = `Asignación Profesores – ${datos.nombre}`;

    const listaDisponibles = document.getElementById("lista-profesor-disponibles");
    const listaAsignados = document.getElementById("lista-profesor-nuevos");
    const inputBuscar = document.getElementById("input-buscar-profesor");

    let todosProfesores = [];
    let profesoresAsignados = [...(datos.colaboradores || [])];
    let responsable = datos.titular || null;
    let profesoresDisponibles = [];

    fetch("/src/api/data/usuarios.json")
        .then(res => res.json())
        .then(data => {
            todosProfesores = data.filter(u => u.rol === "profesor");
            profesoresDisponibles = todosProfesores
                .map(p => `${p.nombre} ${p.apellidos}`)
                .filter(nombre => !profesoresAsignados.includes(nombre) && nombre !== responsable);

            renderListas();
            renderAsignados();
        });

    function renderListas(filtro = "") {
        listaDisponibles.innerHTML = "";

        const encontrados = profesoresDisponibles.filter(nombre =>
            nombre.toLowerCase().includes(filtro)
        );

        encontrados.forEach(nombre => {
            const li = document.createElement("li");
            li.classList.add("item-usuario");
            li.innerHTML = `
                <span>${nombre}</span>
                <button class="btn-icono">
                    <img src="../icons/anyadir.svg" alt="Añadir">
                </button>
            `;
            li.querySelector("button").addEventListener("click", () => {
                agregarAsignado(nombre);
                profesoresDisponibles = profesoresDisponibles.filter(n => n !== nombre);
                renderListas();
            });
            listaDisponibles.appendChild(li);
        });
    }

    function renderAsignados() {
        if (responsable) agregarAsignado(responsable, true);
        profesoresAsignados.forEach(nombre => agregarAsignado(nombre, false));
    }


    function agregarAsignado(nombre, esResponsable = false) {
        const li = document.createElement("li");
        li.classList.add("item-usuario");

        li.innerHTML = `
        <span>${nombre}</span>
        <select class="selector-rol">
            <option value="colaborador">Colaborador</option>
            <option value="responsable" ${responsable && !esResponsable ? "disabled" : ""}>Responsable</option>
        </select>
        <button class="btn-icono eliminar">
            <img src="../icons/trash.svg" alt="Eliminar">
        </button>
    `;

        const selector = li.querySelector("select");
        const eliminarBtn = li.querySelector(".eliminar");

        // Establecer el valor del selector si ya era responsable
        selector.value = esResponsable ? "responsable" : "colaborador";

        selector.addEventListener("change", (e) => {
            if (e.target.value === "responsable") {
                const yaResponsable = [...listaAsignados.querySelectorAll(".selector-rol")].some(sel =>
                    sel !== e.target && sel.value === "responsable"
                );
                if (yaResponsable) {
                    mostrarNotificacion("Ya hay un profesor responsable");
                    e.target.value = "colaborador";
                }
            }
        });

        eliminarBtn.addEventListener("click", () => {
            profesoresDisponibles.push(nombre);
            li.remove();
            renderListas();
        });

        listaAsignados.appendChild(li);
    }


    inputBuscar.addEventListener("input", () => {
        renderListas(inputBuscar.value.toLowerCase());
    });

    document.getElementById("btn-confirmar").addEventListener("click", () => {
        const asignados = [];
        let nuevoResponsable = null;

        listaAsignados.querySelectorAll("li").forEach(li => {
            const nombre = li.querySelector("span").textContent;
            const rol = li.querySelector("select").value;
            if (rol === "responsable") nuevoResponsable = nombre;
            else asignados.push(nombre);
        });

        if (!nuevoResponsable) {
            mostrarNotificacion("Debe asignarse un profesor responsable");
            return;
        }

        console.log("Asignación final:");
        console.log("Titular:", nuevoResponsable);
        console.log("Colaboradores:", asignados);

        mostrarNotificacion("Profesores asignados correctamente");
    });

    document.getElementById("btn-volver").addEventListener("click", (e) => {
        e.preventDefault();
        history.back();
    });
});

function mostrarNotificacion(mensaje) {
    const notif = document.getElementById("notificacion");
    notif.textContent = mensaje;
    notif.style.display = "block";
    setTimeout(() => notif.style.display = "none", 3000);
}
