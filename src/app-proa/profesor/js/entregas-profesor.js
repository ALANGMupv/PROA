document.addEventListener("DOMContentLoaded", () => {
    const asignatura = JSON.parse(localStorage.getItem("asignaturaSeleccionada"));
    const codigo = asignatura?.codigo || "PRO303";

    let entregasOriginales = []; // Global

    fetch("../../api/data/entregas-examenes.json")
        .then(res => res.json())
        .then(data => {
            entregasOriginales = data[codigo]?.cuestionario1 || [];
            renderLista(entregasOriginales);
        });

    document.getElementById("filtroTexto").addEventListener("input", (e) => {
        const texto = e.target.value.toLowerCase();
        const entregasFiltradas = entregasOriginales.filter(entrega =>
            entrega.nombre.toLowerCase().includes(texto)
        );
        renderLista(entregasFiltradas);
    });


    function renderLista(entregas) {
        const lista = document.getElementById("lista-alumnos");
        lista.innerHTML = "";

        entregas.forEach(entrega => {
            const div = document.createElement("div");
            div.classList.add("alumno-item");
            div.innerHTML = `<strong>${entrega.nombre}</strong><p>Nota: ${entrega.nota}/10</p>`;

            div.addEventListener("click", () => {
                // Quitar clase activa a todos los alumnos
                document.querySelectorAll(".alumno-item").forEach(item => {
                    item.classList.remove("activo");
                });

                // Añadir clase activa al seleccionado
                div.classList.add("activo");

                renderDetalle(entrega);
            });

            lista.appendChild(div);
        });
    }

    function renderDetalle(entrega) {
        const container = document.getElementById("detalle-entrega");

        container.innerHTML = `
        <section class="encabezado">
            <h2>${entrega.nombre}</h2>
            <button id="btn-volver2" class="btn-oscuros btn-atras">Atrás</button>
        </section>
        <p>Fecha de entrega: ${new Date(entrega.fechaEntrega).toLocaleString()}</p>
        <p>Calificación: ${entrega.nota}/10</p>
        <hr class="separador" />
        ${renderPreguntas(entrega.respuestas)}
    `;

        document.getElementById("btn-volver2").addEventListener("click", () => {
            container.innerHTML = `<p>Selecciona un alumno para ver su entrega.</p>`;
            document.querySelectorAll(".alumno-item").forEach(item => item.classList.remove("activo"));
        });
    }

    function renderPreguntas(respuestas) {
        const correctas = {
            pregunta1: "B",
            pregunta2: "B",
            pregunta3: "B",
            pregunta4: "C",
            pregunta5: "C"
        };

        const textos = {
            pregunta1: {
                texto: "¿Qué condición debe cumplir una matriz cuadrada para que tenga inversa?",
                opciones: {
                    A: "Ser semántica",
                    B: "Tener determinante distinto de cero",
                    C: "Ser triangular",
                    D: "Tener todos sus elementos positivos"
                }
            },
            pregunta2: {
                texto: "¿Cuál es el resultado de multiplicar una matriz A de orden 2×3 por una matriz B de orden 3×2?",
                opciones: {
                    A: "Una matriz 3x3",
                    B: "Una matriz 2x2",
                    C: "Una matriz 2x3",
                    D: "No se puede multiplicar"
                }
            },
            pregunta3: {
                texto: "¿Qué propiedad tiene una matriz simétrica?",
                opciones: {
                    A: "Tiene sólo valores negativos",
                    B: "Su traspuesta es igual a ella misma",
                    C: "Tiene determinante igual a 0",
                    D: "Está llena de ceros"
                }
            },
            pregunta4: {
                texto: "¿Cuál es el resultado del producto de cualquier matriz por una matriz nula del mismo tamaño compatible?",
                opciones: {
                    A: "Una matriz identidad",
                    B: "La misma matriz",
                    C: "Una matriz nula",
                    D: "Una matriz diagonal"
                }
            },
            pregunta5: {
                texto: "El rango de una matriz es:",
                opciones: {
                    A: "El número de columnas",
                    B: "El número de ceros en la matriz",
                    C: "La cantidad de filas no nulas",
                    D: "La suma de los elementos de la diagonal"
                }
            }
        };

        return Object.entries(respuestas).map(([clave, respuesta], index) => {
            const correcta = correctas[clave];
            const opciones = textos[clave].opciones;
            const texto = textos[clave].texto;

            return `
            <section class="pregunta">
                <h3>Pregunta ${index + 1}</h3>
                <p class="parrafo-principal"><strong>${texto}</strong></p>
                <div class="calificacion-pregunta">${respuesta === correcta ? "2/2 puntos" : "0/2 puntos"}</div>
                <div class="opciones">
                    ${["A", "B", "C", "D"].map(letra => {
                const checked = letra === respuesta ? "checked" : "";
                const clase = letra === correcta
                    ? "color-box boton-opcion-correcta-deshabilitado"
                    : letra === respuesta
                        ? "color-box boton-opcion-incorrecta-deshabilitado"
                        : "boton-opcion-deshabilitado";

                return `
                        <label class="boton-opcion ${clase}">
                            <input type="radio" name="${clave}" value="${letra}" disabled ${checked}>
                            <span class="letra">${letra}.</span>
                            <span class="texto">${opciones[letra]}</span>
                        </label>`;
            }).join("")}
                </div>
            </section>
            `;
        }).join("");
    }

});

function volverAtras() {
    window.history.back();
}

