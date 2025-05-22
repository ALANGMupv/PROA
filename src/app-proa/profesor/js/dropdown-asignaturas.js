document.addEventListener("DOMContentLoaded", () => {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // Obtiene la asignatura actualmente seleccionada del localStorage
    const asignaturaActual = JSON.parse(localStorage.getItem("asignaturaSeleccionada"));

    // Obtiene el elemento <select> donde se mostrarán las asignaturas del profesor
    const dropdown = document.getElementById("dropdown-asignaturas");

    // Si falta alguno de los elementos clave, no continúa
    if (!usuario || !asignaturaActual || !dropdown) return;

    // Carga el archivo JSON con todas las asignaturas
    fetch("../../api/data/asignaturas.json")
        .then(res => res.json())
        .then(asignaturas => {

            // Función auxiliar para normalizar cadenas (quita tildes y pone minúsculas)
            const normalizar = str =>
                str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

            // Une el nombre y apellidos del usuario actual
            const nombreUsuario = `${usuario.nombre} ${usuario.apellidos}`;
            const nombreNormalizado = normalizar(nombreUsuario);

            // Filtra solo las asignaturas donde el usuario sea titular o colaborador (para que no aparezcan todas)
            const asignaturasUsuario = asignaturas.filter(asig =>
                normalizar(asig.titular) === nombreNormalizado ||
                (asig.colaboradores || []).some(colab => normalizar(colab) === nombreNormalizado)
            );

            // Por cada asignatura del usuario, crea una opción en el dropdown
            asignaturasUsuario.forEach(asig => {
                const opcion = document.createElement("option");
                opcion.value = asig.codigo;         // El valor es el código de asignatura
                opcion.textContent = asig.nombre;   // El texto visible es el nombre
                if (asig.codigo === asignaturaActual.codigo)
                    opcion.selected = true;         // Marca como seleccionada si coincide
                dropdown.appendChild(opcion);       // Añade la opción al dropdown
            });

            // Evento: cuando se cambia la opción seleccionada en el dropdown
            dropdown.addEventListener("change", e => {
                // Busca la asignatura correspondiente al nuevo valor seleccionado
                const nueva = asignaturasUsuario.find(a => a.codigo === e.target.value);
                if (nueva) {
                    // Guarda la nueva asignatura seleccionada en localStorage
                    localStorage.setItem("asignaturaSeleccionada", JSON.stringify({
                        nombre: nueva.nombre,
                        codigo: nueva.codigo
                    }));
                    // Vuelve al index de la correspondiente asignatura del profesor
                    window.location.href = "asignatura-profesor.php";
                }
            });
        });
});
