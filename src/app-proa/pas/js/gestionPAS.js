// Función para mostrar o cerrar el menú desplegable de opciones de una fila
function toggleOpciones(icono) {
    const wrapper = icono.parentElement;
    wrapper.classList.toggle('abierto');

    // Cierra los otros menús abiertos
    document.querySelectorAll('.menu-opciones-wrapper').forEach(el => {
        if (el !== wrapper) el.classList.remove('abierto');
    });
}

// Funciones para asignar alumno o profesor
function asignarAlumno(asignatura) {
    localStorage.setItem("asignaturaSeleccionada", JSON.stringify(asignatura));
    window.location.href = "asignacion-alumnos-pas.html";
}

function asignarProfesor(asignatura) {
    localStorage.setItem("asignaturaSeleccionada", JSON.stringify(asignatura));
    window.location.href = "asignacion-profesor-pas.html";
}

// Ejecutar cuando el DOM se ha cargado completamente
document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.querySelector('.tabla-asignaturas');
    const inputBusqueda = document.querySelector('.input-textoBusqueda');
    const dropdown = document.getElementById('dropdown-asignaturas');

    let asignaturasOriginal = [];

    fetch('../../api/data/asignaturas.json')
        .then(response => response.json())
        .then(asignaturas => {
            asignaturasOriginal = asignaturas;

            // Crear lista de departamentos únicos
            const departamentos = [...new Set(asignaturas.map(a => a.departamento))].sort();
            dropdown.innerHTML = `<option value="todos">Todos los departamentos</option>`;
            departamentos.forEach(dep => {
                const option = document.createElement("option");
                option.value = normalizarTexto(dep);
                option.textContent = dep;
                dropdown.appendChild(option);
            });

            renderTabla(); // Mostrar la tabla al cargar
        })
        .catch(error => {
            console.error('Error al cargar las asignaturas:', error);
        });

    function normalizarTexto(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    function renderTabla() {
        const filtroTexto = normalizarTexto(inputBusqueda.value);
        const filtroDepartamento = dropdown.value;

        tabla.querySelectorAll('.fila:not(.encabezado)').forEach(e => e.remove());

        const asignaturasFiltradas = asignaturasOriginal.filter(asig => {
            const texto = normalizarTexto(`${asig.nombre} ${asig.codigo} ${asig.departamento}`);
            const coincideTexto = texto.includes(filtroTexto);
            const coincideDepartamento = filtroDepartamento === "todos" ||
                normalizarTexto(asig.departamento) === filtroDepartamento;

            return coincideTexto && coincideDepartamento;
        });

        asignaturasFiltradas.forEach(asig => {
            const fila = document.createElement('div');
            fila.classList.add('fila');

            fila.innerHTML = `
                <span data-label="Código">${asig.codigo}</span>
                <span data-label="Nombre">${asig.nombre}</span>
                <span data-label="Departamento">${asig.departamento}</span>
                <span data-label="Créditos">${asig.creditos}</span>
                <a href="ficha-asignatura-pas.html" class="btn ver-detalles" data-codigo="${asig.codigo}">Ver detalles</a>
                <div class="menu-opciones-wrapper" data-label="Asignar">
                    <img src="../icons/menu.svg" alt="Opciones" class="icono-opciones" onclick="toggleOpciones(this)" />
                    <div class="menu-desplegable">
                        <button onclick='asignarAlumno(${JSON.stringify(asig)})'>Asignar alumno</button>
                        <button onclick='asignarProfesor(${JSON.stringify(asig)})'>Asignar profesor</button>
                    </div>
                </div>
            `;

            fila.querySelector('.ver-detalles').addEventListener('click', () => {
                localStorage.setItem("asignaturaSeleccionada", JSON.stringify(asig));
            });

            tabla.appendChild(fila);
        });
    }

    inputBusqueda.addEventListener("input", renderTabla);
    dropdown.addEventListener("change", renderTabla);

    // Cerrar todos los menús desplegables si se hace clic fuera
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.menu-opciones-wrapper')) {
            document.querySelectorAll('.menu-opciones-wrapper').forEach(el => el.classList.remove('abierto'));
        }
    });
});
