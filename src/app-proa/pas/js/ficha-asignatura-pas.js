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
        const li = document.createElement("li");
        li.textContent = nombre;
        listaAlumnos.appendChild(li);
    });

    // Render profesores
    const profes = [datos.titular, ...datos.colaboradores];
    profes.forEach(nombre => {
        const li = document.createElement("li");
        li.textContent = nombre;
        listaProfesores.appendChild(li);
    });

    // Botón volver
    document.getElementById("btn-volver").addEventListener("click", (e) => {
        e.preventDefault();
        window.history.back();
    });

    // Buscador alumnos activo por defecto
    const inputBuscar = document.getElementById("input-buscar-alumno");
    inputBuscar.addEventListener("input", () => {
        const texto = inputBuscar.value.toLowerCase();
        Array.from(listaAlumnos.children).forEach(li => {
            li.style.display = li.textContent.toLowerCase().includes(texto) ? "" : "none";
        });
    });

    // Buscador profesores activo por defecto
    const inputBuscarProfesor = document.getElementById("input-buscar-profesor");
    inputBuscarProfesor.addEventListener("input", () => {
        const texto = inputBuscarProfesor.value.toLowerCase();
        Array.from(listaProfesores.children).forEach(li => {
            li.style.display = li.textContent.toLowerCase().includes(texto) ? "" : "none";
        });
    });
});

const btnAsignarAlumnos = document.getElementById("btn-ir-asignacion-alumnos");
if (btnAsignarAlumnos) {
    btnAsignarAlumnos.addEventListener("click", () => {
        window.location.href = "asignacion-alumnos-pas.html";
    });
}

const btnAsignarProfesores = document.getElementById("btn-ir-asignacion-profesores");
if (btnAsignarProfesores) {
    btnAsignarProfesores.addEventListener("click", () => {
        window.location.href = "asignacion-profesor-pas.html";
    });
}
