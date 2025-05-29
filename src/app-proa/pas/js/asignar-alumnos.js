document.getElementById("titulo-asignacion").textContent = `Asignación Alumnos – ${datos.nombre}`;

const listaDisponibles = document.getElementById("lista-disponibles");
const listaAsignados = document.getElementById("lista-asignados");
const inputBuscar = document.getElementById("input-buscar-disponibles");
const dialog = document.getElementById("dialog-cambios");

const btnCancelar = document.getElementById("cancelar-dialogo");
const btnConfirmarSalida = document.getElementById("confirmar-salida");

let todosAlumnos = [];
let alumnosAsignados = [];
let alumnosDisponibles = [];
let hayCambios = false;

// Obtener alumnos reales
fetch("../app/obtener-alumnos-asignatura.php?codigo=" + datos.codigoAsignatura)
    .then(res => res.json())
    .then(data => {
        if (data.error) return console.error(data.error);

        todosAlumnos = data.todos.map(a => ({
            id: a.id, // usamos solo .id, no idUsuariosPROA
            nombreCompleto: a.nombreCompleto
        }));

        alumnosAsignados = data.asignados.map(id => parseInt(id));
        alumnosDisponibles = todosAlumnos.filter(a => !alumnosAsignados.includes(a.id));

        renderDisponibles();
        renderAsignados();
    });

function renderDisponibles(filtro = "") {
    const filtroMin = filtro.toLowerCase();
    const mensaje = document.getElementById("mensaje-sin-resultados");

    listaDisponibles.innerHTML = "";

    const disponiblesFiltrados = alumnosDisponibles.filter(a =>
        a.nombreCompleto.toLowerCase().includes(filtroMin)
    );

    mensaje.style.display = disponiblesFiltrados.length === 0 ? "block" : "none";

    disponiblesFiltrados.forEach(a => {
        const li = document.createElement("li");
        li.className = "item-usuario";
        li.innerHTML = `
      <span>${a.nombreCompleto}</span>
      <button class="btn-icono"><img src="../icons/anyadir.svg" alt="Añadir"></button>
    `;
        li.querySelector("button").addEventListener("click", () => {
            alumnosAsignados.push(a.id);
            alumnosDisponibles = alumnosDisponibles.filter(b => b.id !== a.id);
            hayCambios = true;
            mostrarNotificacion(`Alumno ${a.nombreCompleto} asignado`);
            renderDisponibles(inputBuscar.value);
            renderAsignados();
        });
        listaDisponibles.appendChild(li);
    });
}

function renderAsignados() {
    listaAsignados.innerHTML = "";

    alumnosAsignados.forEach(id => {
        const alumno = todosAlumnos.find(a => a.id === id);
        if (!alumno) return;

        const li = document.createElement("li");
        li.className = "item-usuario";
        li.innerHTML = `
            <span>${alumno.nombreCompleto}</span>
            <button class="btn-icono eliminar"><img src="../icons/trash.svg" alt="Eliminar"></button>
        `;
        li.querySelector("button").addEventListener("click", () => {
            alumnosDisponibles.push(alumno);
            alumnosAsignados = alumnosAsignados.filter(i => i !== id);
            hayCambios = true;
            mostrarNotificacion(`Alumno ${alumno.nombreCompleto} desasignado`);
            renderDisponibles(inputBuscar.value);
            renderAsignados();
        });
        listaAsignados.appendChild(li);
    });

    alumnosDisponibles = todosAlumnos.filter(a => !alumnosAsignados.includes(a.id));
}


inputBuscar.addEventListener("input", () => {
    renderDisponibles(inputBuscar.value);
});

document.getElementById("btn-confirmar").addEventListener("click", () => {
    const payload = {
        codigo: datos.codigoAsignatura,
        ids: alumnosAsignados
    };

    fetch("../app/guardar-asignacion-alumnos.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(resp => {
            if (resp.success) {
                mostrarNotificacion("Asignación guardada", () => {
                    window.location.href = "ficha-asignatura-pas.php";
                });
            } else {
                alert("Error al guardar: " + resp.error);
            }
        });
});

document.getElementById("btn-volver").addEventListener("click", (e) => {
    e.preventDefault();
    if (hayCambios) {
        dialog.showModal();
    } else {
        history.back();
    }
});

btnCancelar.addEventListener("click", () => dialog.close());
btnConfirmarSalida.addEventListener("click", () => {
    dialog.close();
    history.back();
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
