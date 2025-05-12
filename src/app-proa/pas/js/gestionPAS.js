function toggleOpciones(icono) {
    const wrapper = icono.parentElement;
    wrapper.classList.toggle('abierto');

    // Cierra los otros menús abiertos
    document.querySelectorAll('.menu-opciones-wrapper').forEach(el => {
        if (el !== wrapper) el.classList.remove('abierto');
    });
}

// --- Cargar asignaturas desde el JSON externo y mostrarlas ---
fetch('/src/api/data/asignaturas.json')
    .then(response => response.json())
    .then(asignaturas => {
        const tabla = document.querySelector('.tabla-asignaturas');

        asignaturas.forEach(asig => {
            const fila = document.createElement('div');
            fila.classList.add('fila');

            // --- Código HTML filas asignatuaras ---
            fila.innerHTML = `
        <span data-label="Código">${asig.codigo}</span>
        <span data-label="Nombre">${asig.nombre}</span>
        <span data-label="Departamento">${asig.departamento}</span>
        <span data-label="Créditos">${asig.creditos}</span>
        <button class="btn" data-label="Ficha">Ver detalles</button>
        <div class="menu-opciones-wrapper" data-label="Asignar">
          <img src="../icons/menu.svg" alt="Opciones" class="icono-opciones" onclick="toggleOpciones(this)" />
          <div class="menu-desplegable">
            <button onclick="alert('Asignar alumno a ${asig.nombre}')">Asignar alumno</button>
            <button onclick="alert('Asignar profesor a ${asig.nombre}')">Asignar profesor</button>
          </div>
        </div>
      `;

            tabla.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error al cargar las asignaturas:', error);
    });


// Cerrar menú si se hace clic fuera
document.addEventListener('click', function (e) {
    if (!e.target.closest('.menu-opciones-wrapper')) {
        document.querySelectorAll('.menu-opciones-wrapper').forEach(el => el.classList.remove('abierto'));
    }
});
