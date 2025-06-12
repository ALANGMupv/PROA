fetch("../app/obtener-ficha-asignatura.php")
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            alert("Error al cargar la asignatura");
            return;
        }

        const asig = data.asignatura;

        document.getElementById("nombre-asignatura").textContent = asig.nombre;
        document.getElementById("codigo-asignatura").textContent = asig.codigo;
        document.getElementById("departamento-asignatura").textContent = asig.departamento;
        document.getElementById("curso-asignatura").textContent = asig.curso;
        document.getElementById("semestre-asignatura").textContent = asig.semestre;
        document.getElementById("anyo-asignatura").textContent = "2024/2025"; // puedes ajustar esto si deseas

        document.getElementById("creditos-asignatura").textContent = asig.creditos;

        // Añadir los nuevos campos: carácter y titulación
        const info = document.querySelector(".informacion");
        info.insertAdjacentHTML("beforeend", `
            <p><strong>Carácter:</strong> ${asig.caracter}</p>
            <p><strong>Titulación:</strong> ${asig.titulacion}</p>
        `);

        const listaAlumnos = document.getElementById("lista-alumnos");
        data.alumnos.forEach(nombre => {
            const li = document.createElement("li");
            li.textContent = nombre;
            listaAlumnos.appendChild(li);
        });

        const listaProfesores = document.getElementById("lista-profesores");
        const profes = [data.titular, ...(data.colaboradores || [])];

        profes.forEach(nombre => {
            if (!nombre) return; // Salta si es null, undefined o string vacío

            const li = document.createElement("li");
            const esResponsable = nombre === data.titular;

            li.innerHTML = `
        ${nombre}
        ${esResponsable ? '<span class="rol-profesor"> (Responsable)</span>' : '<span class="rol-profesor"> (Colaborador)</span>'}
    `;
            listaProfesores.appendChild(li);
        });


        // Buscadores
        document.getElementById("input-buscar-alumno").addEventListener("input", e => {
            const texto = e.target.value.toLowerCase();
            Array.from(listaAlumnos.children).forEach(li => {
                li.style.display = li.textContent.toLowerCase().includes(texto) ? "" : "none";
            });
        });

        document.getElementById("input-buscar-profesor").addEventListener("input", e => {
            const texto = e.target.value.toLowerCase();
            Array.from(listaProfesores.children).forEach(li => {
                li.style.display = li.textContent.toLowerCase().includes(texto) ? "" : "none";
            });
        });
    });

// Botones fuera del fetch

document.getElementById("btn-ir-asignacion-alumnos").addEventListener("click", () => {
    window.location.href = "asignacion-alumnos-pas.php";
});

document.getElementById("btn-ir-asignacion-profesores").addEventListener("click", () => {
    window.location.href = "asignacion-profesor-pas.php";
});
