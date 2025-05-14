document.addEventListener("DOMContentLoaded", () => {
    const datos = JSON.parse(localStorage.getItem("asignaturaSeleccionada"));
    if (!datos) return;

    // Mostrar datos básicos
    document.getElementById("nombre-asignatura").textContent = datos.nombre;
    document.getElementById("codigo-asignatura").textContent = datos.codigo;
    document.getElementById("departamento-asignatura").textContent = datos.departamento;
    document.getElementById("curso-asignatura").textContent = datos.curso;
    document.getElementById("semestre-asignatura").textContent = datos.semestre;
    document.getElementById("anyo-asignatura").textContent = datos.anyo;
    document.getElementById("creditos-asignatura").textContent = datos.creditos;

    const listaAlumnos = document.getElementById("lista-alumnos");
    const listaProfesores = document.getElementById("lista-profesores");

    // Render alumnos
    datos.alumnos.forEach(nombre => {
        const li = crearItemLista(nombre, listaAlumnos);
        listaAlumnos.appendChild(li);
    });

    // Render profesores
    const profes = [datos.titular, ...datos.colaboradores];
    profes.forEach(nombre => {
        const li = crearItemLista(nombre, listaProfesores);
        listaProfesores.appendChild(li);
    });

    // Botón volver
    document.getElementById("btn-volver").addEventListener("click", (e) => {
        e.preventDefault(); // importante para evitar que suba arriba
        window.history.back();
    });


    // Mostrar buscador ==ALUMNOS==
    const buscadorWrapper = document.getElementById("buscador-alumno");
    const inputBuscar = document.getElementById("input-buscar-alumno");
    const listaResultados = document.getElementById("resultados-alumnos");

    document.getElementById("btn-agregar-alumno").addEventListener("click", () => {
        buscadorWrapper.style.display = buscadorWrapper.style.display === "none" ? "block" : "none";
        inputBuscar.value = "";
        listaResultados.innerHTML = "";
    });

    // Cargar todos los usuarios
    let alumnosJSON = [];
    fetch("/src/api/data/usuarios.json")
        .then(res => res.json())
        .then(data => {
            alumnosJSON = data.filter(u => u.rol === "alumno");
        });

    // Buscar alumnos
    inputBuscar.addEventListener("input", () => {
        const texto = inputBuscar.value.toLowerCase();
        listaResultados.innerHTML = "";

        const encontrados = alumnosJSON.filter(al => {
            const nombreCompleto = `${al.nombre} ${al.apellidos}`.toLowerCase();
            return nombreCompleto.includes(texto);
        });

        if (encontrados.length === 0) {
            listaResultados.innerHTML = "<li>No se encontraron alumnos</li>";
            return;
        }

        encontrados.forEach(al => {
            const nombre = `${al.nombre} ${al.apellidos}`;
            const li = document.createElement("li");
            li.textContent = nombre;
            li.classList.add("resultado-busqueda");
            li.addEventListener("click", () => {
                if (!existeEnLista(nombre, listaAlumnos)) {
                    const nuevoLi = crearItemLista(nombre, listaAlumnos);
                    listaAlumnos.appendChild(nuevoLi);
                    mostrarNotificacion(`Alumno ${nombre} asignado correctamente a ${datos.nombre}`);
                } else {
                    mostrarNotificacion(`El alumno ${nombre} ya está asignado.`);
                }
                buscadorWrapper.style.display = "none";
                inputBuscar.value = "";
                listaResultados.innerHTML = "";
            });
            listaResultados.appendChild(li);
        });
    });

    // === BUSCADOR PROFESORES ===
    const buscadorProfesor = document.getElementById("buscador-profesor");
    const inputBuscarProfesor = document.getElementById("input-buscar-profesor");
    const listaResultadosProfesores = document.getElementById("resultados-profesor");
    const btnAgregarProfesor = document.getElementById("btn-agregar-profesor");

    let profesoresJSON = [];

    fetch("/src/api/data/usuarios.json")
        .then(res => res.json())
        .then(data => {
            profesoresJSON = data.filter(u => u.rol === "profesor");
        });

    btnAgregarProfesor.addEventListener("click", () => {
        buscadorProfesor.style.display = buscadorProfesor.style.display === "none" ? "block" : "none";
        inputBuscarProfesor.value = "";
        listaResultadosProfesores.innerHTML = "";
    });

    inputBuscarProfesor.addEventListener("input", () => {
        const texto = inputBuscarProfesor.value.toLowerCase();
        listaResultadosProfesores.innerHTML = "";

        const encontrados = profesoresJSON.filter(prof => {
            const nombreCompleto = `${prof.nombre} ${prof.apellidos}`.toLowerCase();
            return nombreCompleto.includes(texto);
        });

        if (encontrados.length === 0) {
            listaResultadosProfesores.innerHTML = "<li>No se encontraron profesores</li>";
            return;
        }

        encontrados.forEach(prof => {
            const nombre = `${prof.nombre} ${prof.apellidos}`;
            const li = document.createElement("li");
            li.textContent = nombre;
            li.classList.add("resultado-busqueda");
            li.addEventListener("click", () => {
                if (!existeEnLista(nombre, listaProfesores)) {
                    const nuevoLi = crearItemLista(nombre, listaProfesores);
                    listaProfesores.appendChild(nuevoLi);
                    mostrarNotificacion(`Profesor ${nombre} asignado correctamente a ${datos.nombre}`);
                } else {
                    mostrarNotificacion(`El profesor ${nombre} ya está asignado.`);
                }
                buscadorProfesor.style.display = "none";
                inputBuscarProfesor.value = "";
                listaResultadosProfesores.innerHTML = "";
            });
            listaResultadosProfesores.appendChild(li);
        });
    });

    function crearItemLista(nombre, lista) {
        const li = document.createElement("li");
        li.innerHTML = `${nombre} <img src="../icons/trash.svg" class="icono-eliminar" alt="Eliminar">`;

        li.querySelector(".icono-eliminar").addEventListener("click", () => {
            lista.removeChild(li);
            const tipo = lista.id.includes("alumnos") ? "Alumno" : "Profesor";
            mostrarNotificacion(`${tipo} ${nombre} eliminado de ${datos.nombre}`);
        });

        return li;
    }

    function existeEnLista(nombre, lista) {
        return Array.from(lista.children).some(li => li.textContent.includes(nombre));
    }
});

function mostrarNotificacion(mensaje) {
    const notif = document.getElementById("notificacion");
    if (!notif) return;
    notif.textContent = mensaje;
    notif.style.display = "block";

    setTimeout(() => {
        notif.style.display = "none";
    }, 3000);
}
