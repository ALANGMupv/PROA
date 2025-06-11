const params = new URLSearchParams(window.location.search);
const codigoDesdeURL = params.get("codigoAsignatura");
const idExamen = params.get("idExamen");

let asignatura = null;

try {
    asignatura = JSON.parse(localStorage.getItem("asignaturaSeleccionada"));
} catch (e) {
    console.warn("Asignatura malformada en localStorage:", e);
}

if ((!asignatura || !asignatura.codigoAsignatura) && codigoDesdeURL) {
    asignatura = {
        nombre: "(Asignatura desde URL)",
        codigoAsignatura: codigoDesdeURL
    };
    localStorage.setItem("asignaturaSeleccionada", JSON.stringify(asignatura));

    fetch("../app/guardar-asignatura-sesion.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(asignatura),
        credentials: "include"
    }).catch(error => {
        console.error("Error al guardar asignatura en sesión:", error);
    });
}

const codigo = asignatura?.codigoAsignatura;
let url = `../app/entregas-examen.php?codigoAsignatura=${codigo}`;
if (idExamen !== null && idExamen !== "null") {
    url += `&idExamen=${idExamen}`;
}

let entregasOriginales = [];

fetch(url)
    .then(res => res.json())
    .then(data => {
        entregasOriginales = transformarDatosBD(data);
        renderLista(entregasOriginales);
    })
    .catch(err => console.error("Error:", err));

document.getElementById("filtroTexto").addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    const filtradas = entregasOriginales.filter(entrega =>
        entrega.nombre.toLowerCase().includes(texto)
    );
    renderLista(filtradas);
});

function obtenerIdExamenDeURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("idExamen");
}

function transformarDatosBD(data) {
    return data.alumnos.map(alumno => {
        const respuestas = {};
        const nota = data.calificaciones?.[alumno.id] || 0;

        if (data.respuestasAlumnos?.[alumno.id]) {
            Object.entries(data.respuestasAlumnos[alumno.id]).forEach(([idPregunta, idRespuesta]) => {
                const pregunta = data.preguntas[idPregunta];
                if (pregunta) {
                    const opcion = pregunta.opciones.find(op => op.id == idRespuesta);
                    if (opcion) {
                        respuestas[`pregunta${idPregunta}`] = {
                            id: opcion.id,
                            texto: opcion.texto,
                            correcta: opcion.correcta,
                            pregunta: {
                                texto: pregunta.texto,
                                opciones: pregunta.opciones
                            }
                        };
                    }
                }
            });
        }

        return {
            id: alumno.id,
            nombre: alumno.nombre,
            nota,
            fechaEntrega: new Date().toISOString(),
            respuestas
        };
    });
}

function renderLista(entregas) {
    const lista = document.getElementById("lista-alumnos");
    lista.innerHTML = "";
    entregas.forEach(entrega => {
        const div = document.createElement("div");
        div.classList.add("alumno-item");
        div.innerHTML = `<strong>${entrega.nombre}</strong><p>Nota: ${entrega.nota}/10</p>`;
        div.addEventListener("click", () => {
            document.querySelectorAll(".alumno-item").forEach(i => i.classList.remove("activo"));
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
        document.querySelectorAll(".alumno-item").forEach(i => i.classList.remove("activo"));
    });
}

function renderPreguntas(respuestas) {
    return Object.entries(respuestas).map(([clave, r], i) => {
        const correcta = r.pregunta.opciones.find(op => op.correcta)?.id;
        return `
            <section class="pregunta">
                <h3>Pregunta ${i + 1}</h3>
                <p class="parrafo-principal"><strong>${r.pregunta.texto}</strong></p>
                <div class="calificacion-pregunta">${r.id === correcta ? "2/2 puntos" : "0/2 puntos"}</div>
                <div class="opciones">
                    ${r.pregunta.opciones.map(op => {
            const checked = op.id === r.id ? "checked" : "";
            const clase = op.correcta
                ? "color-box boton-opcion-correcta-deshabilitado"
                : op.id === r.id
                    ? "color-box boton-opcion-incorrecta-deshabilitado"
                    : "boton-opcion-deshabilitado";
            return `
                        <label class="boton-opcion ${clase}">
                            <input type="radio" name="${clave}" value="${op.id}" disabled ${checked}>
                            <span class="letra">${String.fromCharCode(65 + i)}.</span>
                            <span class="texto">${op.texto}</span>
                        </label>`;
        }).join("")}
                </div>
            </section>`;
    }).join("");
}

function volverAtras() {
    window.history.back();
}
