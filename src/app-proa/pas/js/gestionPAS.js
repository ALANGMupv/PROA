// Función para mostrar o cerrar el menú desplegable de opciones de una fila
function toggleOpciones(icono) {
    const wrapper = icono.parentElement;
    wrapper.classList.toggle('abierto'); // Alterna la clase 'abierto' para mostrar u ocultar el menú

    // Cierra los otros menús abiertos que no sean este
    document.querySelectorAll('.menu-opciones-wrapper').forEach(el => {
        if (el !== wrapper) el.classList.remove('abierto');
    });
}

// Ejecutar cuando el DOM se ha cargado completamente
document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.querySelector('.tabla-asignaturas'); // Contenedor donde se inserta la tabla
    const inputBusqueda = document.querySelector('.input-textoBusqueda'); // Input de búsqueda
    const dropdown = document.getElementById('dropdown-asignaturas'); // Dropdown de departamentos

    let asignaturasOriginal = []; // Lista original de asignaturas

    // Cargar las asignaturas desde un archivo JSON externo
    fetch('/src/api/data/asignaturas.json')
        .then(response => response.json())
        .then(asignaturas => {
            asignaturasOriginal = asignaturas; // Guardar las asignaturas cargadas

            // Crear una lista de departamentos únicos ordenados alfabéticamente
            const departamentos = [...new Set(asignaturas.map(a => a.departamento))].sort();

            // Rellenar el dropdown con los departamentos
            dropdown.innerHTML = `<option value="todos">Todos los departamentos</option>`;
            departamentos.forEach(dep => {
                const option = document.createElement("option");
                option.value = normalizarTexto(dep); // Usar texto normalizado como valor
                option.textContent = dep; // Mostrar el nombre original en la opción
                dropdown.appendChild(option); // Añadir la opción al dropdown
            });

            renderTabla(); // Mostrar la tabla inicial sin filtros
        })
        .catch(error => {
            console.error('Error al cargar las asignaturas:', error); // Mostrar error si ocurre
        });

    // Función para normalizar texto (quita acentos y pasa a minúsculas)
    function normalizarTexto(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    // Función para renderizar la tabla de asignaturas aplicando los filtros
    function renderTabla() {
        const filtroTexto = normalizarTexto(inputBusqueda.value); // Texto buscado (normalizado)
        const filtroDepartamento = dropdown.value; // Departamento seleccionado en el dropdown

        // Limpiar todas las filas anteriores excepto el encabezado
        tabla.querySelectorAll('.fila:not(.encabezado)').forEach(e => e.remove());

        // Filtrar las asignaturas según los criterios de búsqueda y departamento
        const asignaturasFiltradas = asignaturasOriginal.filter(asig => {
            const texto = normalizarTexto(`${asig.nombre} ${asig.codigo} ${asig.departamento}`);
            const coincideTexto = texto.includes(filtroTexto); // Coincide con el texto buscado
            const coincideDepartamento =
                filtroDepartamento === "todos" || // Si está seleccionado "todos"
                normalizarTexto(asig.departamento) === filtroDepartamento; // Coincide con el departamento

            return coincideTexto && coincideDepartamento; // Incluir solo si cumple ambos criterios
        });

        // Crear dinámicamente una fila por cada asignatura filtrada
        asignaturasFiltradas.forEach(asig => {
            const fila = document.createElement('div');
            fila.classList.add('fila'); // Añadir clase para estilos

            // Contenido HTML de la fila con datos de la asignatura y botones de acción
            fila.innerHTML = `
                <span data-label="Código">${asig.codigo}</span>
                <span data-label="Nombre">${asig.nombre}</span>
                <span data-label="Departamento">${asig.departamento}</span>
                <span data-label="Créditos">${asig.creditos}</span>
                <a href="ficha-asignatura-pas.html" class="btn ver-detalles" data-codigo="${asig.codigo}">Ver detalles</a>
                <div class="menu-opciones-wrapper" data-label="Asignar">
                    <img src="../icons/menu.svg" alt="Opciones" class="icono-opciones" onclick="toggleOpciones(this)" />
                    <div class="menu-desplegable">
                        <button onclick="window.location.href='asignacion-alumnos-pas.html?codigo=${asig.codigo}'">Asignar alumno</button>
                        <button onclick="window.location.href='asignacion-profesor-pas.html?codigo=${asig.codigo}'">Asignar profesor</button>
                    </div>
                </div>
            `;

            // Guardar la asignatura seleccionada en localStorage al hacer clic en "Ver detalles"
            fila.querySelector('.ver-detalles').addEventListener('click', () => {
                localStorage.setItem("asignaturaSeleccionada", JSON.stringify(asig));
            });

            // Insertar la fila en la tabla
            tabla.appendChild(fila);
        });
    }

    // Actualizar tabla cuando se escribe en el buscador
    inputBusqueda.addEventListener("input", renderTabla);

    // Actualizar tabla cuando se cambia el departamento en el dropdown
    dropdown.addEventListener("change", renderTabla);

    // Cerrar todos los menús desplegables si se hace clic fuera de ellos
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.menu-opciones-wrapper')) {
            document.querySelectorAll('.menu-opciones-wrapper').forEach(el => el.classList.remove('abierto'));
        }
    });
});
