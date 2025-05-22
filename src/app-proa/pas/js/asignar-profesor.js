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
    let hayCambios = false;

    fetch("../../api/data/usuarios.json")
        .then(res => res.json())
        .then(data => {
            todosProfesores = data.filter(u => u.rol === "profesor");
            profesoresDisponibles = todosProfesores
                .map(p => `${p.nombre} ${p.apellidos}`)
                .filter(nombre => !profesoresAsignados.includes(nombre) && nombre !== responsable);

            renderListas();
            renderAsignados();
        });

    const dialog = document.getElementById("dialog-cambios");
    const btnCancelar = document.getElementById("cancelar-dialogo");
    const btnConfirmarSalida = document.getElementById("confirmar-salida");

    document.getElementById("btn-volver").addEventListener("click", (e) => {
        e.preventDefault();
        if (hayCambios) {
            dialog.showModal();
        } else {
            history.back();
        }
    });

    btnCancelar.addEventListener("click", () => {
        dialog.close();
    });

    btnConfirmarSalida.addEventListener("click", () => {
        dialog.close();
        history.back();
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
                hayCambios = true; // se hizo un cambio
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

        selector.value = esResponsable ? "responsable" : "colaborador";

        selector.addEventListener("change", (e) => {
            hayCambios = true; // cambio de rol
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
            hayCambios = true; // eliminación = cambio
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

        hayCambios = false; // los cambios ya fueron guardados
        mostrarNotificacion("Profesores asignados correctamente", () => {
            window.location.href = "ficha-asignatura-pas.php";
        });
    });

});

function mostrarNotificacion(mensaje, callback = null) {
    const notif = document.getElementById("notificacion");
    notif.textContent = mensaje;
    notif.style.display = "block";
    setTimeout(() => {
        notif.style.display = "none";
        if (callback) callback();
    }, 2000);
}
