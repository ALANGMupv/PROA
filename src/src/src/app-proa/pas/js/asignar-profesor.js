document.addEventListener("DOMContentLoaded", () => {
    if (typeof datos === "undefined" || !datos.codigoAsignatura) return;

    document.getElementById("titulo-asignacion").textContent = `Asignación Profesores – ${datos.nombre}`;

    const listaDisponibles = document.getElementById("lista-profesor-disponibles");
    const listaAsignados = document.getElementById("lista-profesor-nuevos");
    const inputBuscar = document.getElementById("input-buscar-profesor");
    const dialog = document.getElementById("dialog-cambios");
    const btnCancelar = document.getElementById("cancelar-dialogo");
    const btnConfirmarSalida = document.getElementById("confirmar-salida");

    let todosProfesores = [];
    let profesoresAsignados = [];
    let responsable = null;
    let profesoresDisponibles = [];
    let hayCambios = false;

    fetch(`../app/obtener-profesores-asignatura.php?codigo=${datos.codigoAsignatura}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) return console.error(data.error);

            todosProfesores = data.todos;
            profesoresAsignados = data.colaboradores;
            responsable = data.titular;
            profesoresDisponibles = todosProfesores.filter(p =>
                !profesoresAsignados.includes(p.id) && p.id !== responsable
            );

            renderDisponibles();
            renderAsignados();
        });

    function renderDisponibles(filtro = "") {
        listaDisponibles.innerHTML = "";
        const filtroMin = filtro.toLowerCase();
        const filtrados = profesoresDisponibles.filter(p =>
            p.nombreCompleto.toLowerCase().includes(filtroMin)
        );

        document.getElementById("mensaje-sin-resultados").style.display =
            filtrados.length === 0 ? "block" : "none";

        filtrados.forEach(p => {
            const li = document.createElement("li");
            li.className = "item-usuario";
            li.innerHTML = `
                <span>${p.nombreCompleto}</span>
                <button class="btn-icono">
                    <img src="../icons/anyadir.svg" alt="Añadir">
                </button>
            `;
            li.querySelector("button").addEventListener("click", () => {
                agregarAsignado(p, false);
                profesoresDisponibles = profesoresDisponibles.filter(x => x.id !== p.id);
                hayCambios = true;
                renderDisponibles(inputBuscar.value);
            });
            listaDisponibles.appendChild(li);
        });
    }

    function renderAsignados() {
        listaAsignados.innerHTML = "";

        if (responsable) {
            const prof = todosProfesores.find(p => p.id === responsable);
            if (prof) agregarAsignado(prof, true);
        }

        profesoresAsignados.forEach(id => {
            const prof = todosProfesores.find(p => p.id === id);
            if (prof) agregarAsignado(prof, false);
        });
    }

    function agregarAsignado(prof, esResponsable = false) {
        const li = document.createElement("li");
        li.classList.add("item-usuario");

        li.innerHTML = `
            <span>${prof.nombreCompleto}</span>
            <select class="selector-rol">
                <option value="colaborador">Colaborador</option>
                <option value="responsable" ${responsable && !esResponsable ? "disabled" : ""}>Responsable</option>
            </select>
            <button class="btn-icono eliminar"><img src="../icons/trash.svg" alt="Eliminar"></button>
        `;

        const select = li.querySelector("select");
        const eliminarBtn = li.querySelector(".eliminar");

        select.value = esResponsable ? "responsable" : "colaborador";

        select.addEventListener("change", (e) => {
            if (e.target.value === "responsable") {
                const yaResponsable = [...listaAsignados.querySelectorAll("select")].some(sel =>
                    sel !== e.target && sel.value === "responsable"
                );
                if (yaResponsable) {
                    mostrarNotificacion("Ya hay un profesor responsable");
                    e.target.value = "colaborador";
                }
            }
            hayCambios = true;
        });

        eliminarBtn.addEventListener("click", () => {
            if (select.value === "responsable") {
                responsable = null;
            } else {
                profesoresAsignados = profesoresAsignados.filter(i => i !== prof.id);
            }
            profesoresDisponibles.push(prof);
            li.remove();
            hayCambios = true;
            renderDisponibles(inputBuscar.value);
        });

        listaAsignados.appendChild(li);
    }

    inputBuscar.addEventListener("input", () => {
        renderDisponibles(inputBuscar.value);
    });

    document.getElementById("btn-volver").addEventListener("click", (e) => {
        e.preventDefault();
        if (hayCambios) dialog.showModal();
        else history.back();
    });

    btnCancelar.addEventListener("click", () => dialog.close());
    btnConfirmarSalida.addEventListener("click", () => {
        dialog.close();
        history.back();
    });

    document.getElementById("btn-confirmar").addEventListener("click", () => {
        const colaboradorIds = [];
        let nuevoResponsable = null;

        listaAsignados.querySelectorAll("li").forEach(li => {
            const nombre = li.querySelector("span").textContent;
            const select = li.querySelector("select");
            const profesor = todosProfesores.find(p => p.nombreCompleto === nombre);
            if (!profesor) return;

            if (select.value === "responsable") nuevoResponsable = profesor.id;
            else colaboradorIds.push(profesor.id);
        });

        if (!nuevoResponsable) {
            mostrarNotificacion("Debe asignarse un profesor responsable");
            return;
        }

        fetch("../app/guardar-asignacion-profesores.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                codigo: datos.codigoAsignatura,
                titular: nuevoResponsable,
                colaboradores: colaboradorIds
            })
        })
            .then(res => res.json())
            .then(resp => {
                if (resp.success) {
                    mostrarNotificacion("Asignación guardada correctamente", () => {
                        window.location.href = "ficha-asignatura-pas.php";
                    });
                } else {
                    alert("Error: " + resp.error);
                }
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
