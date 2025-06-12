let contadorPreguntas = 1; // Ya existe Pregunta 1 en el HTML
let suma;

document.getElementById("peso-examen").addEventListener("input", function () {
    if (this.value > 40) {
        this.value = 40;
    }
});

function actualizarEstadoValorPreguntas() {
    // El comportamiento siempre será el de "personalizado"
    const inputsValor = document.querySelectorAll(".input-pregunta-valor");
    const spanPuntos = document.getElementById("puntos");

    // Sumar todos los valores numéricos de los inputs
    suma = 0;
    inputsValor.forEach(input => {
        const valor = parseFloat(input.value);
        if (!isNaN(valor)) {
            suma += valor;
        }
    });

    spanPuntos.textContent = suma;
}

function agregarPregunta() {
    contadorPreguntas++;
    const contenedorPreguntas = document.querySelector(".datos");
    const nuevaPregunta = document.createElement("div");
    const idPregunta = `pregunta${contadorPreguntas}`;
    nuevaPregunta.classList.add("pregunta-contenedor");
    nuevaPregunta.setAttribute("data-id", idPregunta);

    nuevaPregunta.innerHTML = `
    <div class="titulo-texto-pregunta">

      <div class="titulo-pregunta">

        <div class="titulo-valor">
          <h4>Pregunta ${contadorPreguntas}</h4>
            <div>
              <span>Valor</span>
              <input type="number" class="input-base input-pregunta-valor" placeholder="" oninput="actualizarEstadoValorPreguntas()" required>
            </div>
        </div>
        <img src="../icons/trash.svg" alt="Eliminar" class="icono-eliminar" onclick="eliminarElemento(this)">
      </div>
      <textarea name="${idPregunta}" id="${idPregunta}" cols="30" rows="3" class="input-base input-pregunta"
                placeholder="Escribe la pregunta aquí..." required></textarea>
    </div>

    <div class="respuestas-contenedor">
    <span class="recordatorio">NOTA: Recuerda seleccionar la respuesta correcta</span>
      ${generarRespuestaHTML(idPregunta, "a")}
      ${generarRespuestaHTML(idPregunta, "b")}
    </div>

    <button class="btn-agregar" onclick="añadirRespuesta(this)">
      <span class="icono-mas">+</span>
      Añadir respuesta
    </button>
  `;

    contenedorPreguntas.insertBefore(nuevaPregunta, document.getElementById("btn-agregar-pregunta"));
    actualizarEstadoValorPreguntas();
}

function generarRespuestaHTML(nombreGrupo, letra) {
    return `
    <div class="respuesta-opcion">
      <div class="radio-grupo">
        <input type="radio" id="${nombreGrupo}-${letra}" name="${nombreGrupo}" required >
        <label for="${nombreGrupo}-${letra}">${letra.toUpperCase()}.</label>
      </div>
      <input type="text" class="input-base input-respuesta" placeholder="Escribe la respuesta aquí..." required>
      <img src="../icons/trash.svg" alt="Eliminar" class="icono-eliminar" onclick="eliminarElemento(this)">
    </div>
  `;
}

function añadirRespuesta(boton) {
    const contenedorPregunta = boton.closest(".pregunta-contenedor");
    const respuestasContenedor = contenedorPregunta.querySelector(".respuestas-contenedor");
    const nombreGrupo = contenedorPregunta.getAttribute("data-id");
    const respuestas = respuestasContenedor.querySelectorAll(".respuesta-opcion");

    const nuevaLetra = String.fromCharCode(97 + respuestas.length); // 97 = 'a'
    const nuevaRespuestaHTML = generarRespuestaHTML(nombreGrupo, nuevaLetra);

    respuestasContenedor.insertAdjacentHTML("beforeend", nuevaRespuestaHTML);
}

function eliminarElemento(elemento) {
    const respuesta = elemento.closest('.respuesta-opcion');
    const pregunta = elemento.closest('.pregunta-contenedor');

    if (respuesta) {
        respuesta.remove();
    } else if (pregunta) {
        pregunta.remove();
        contadorPreguntas--;
    }
}

const formulario = document.getElementById("formulario-examen");

formulario.addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita que se recargue la página

    const asignaturaSeleccionada = JSON.parse(localStorage.getItem('asignaturaSeleccionada'));
    const codigo = asignaturaSeleccionada?.codigo;

    const datos = {
        titulo: formulario.querySelector('#titulo-examen').value, // string
        puntos: suma, // número
        peso: Number(formulario.querySelector('#peso-examen').value), // número
        fechaApertura: formulario.querySelector('#fecha-apertura-examen').value, // string con formato ISO (fecha + hora)
        fechaCierre: formulario.querySelector('#fecha-cierre-examen').value,
        duracion: Number(formulario.querySelector('#duracion-examen').value),
        codigo: codigo,
        preguntas: [],
    };

    const preguntasDOM = formulario.querySelectorAll(".pregunta-contenedor");
    preguntasDOM.forEach(p => {
        const preguntaTexto = p.querySelector("textarea").value;
        const respuestas = [];

        let valor = p.querySelector(".input-pregunta-valor").value;

        if(valor === ""){
            valor = 10/contadorPreguntas;
        }

        p.querySelectorAll(".respuesta-opcion").forEach(r => {
            const texto = r.querySelector('input[type="text"]').value;
            const seleccionada = r.querySelector('input[type="radio"]').checked;
            respuestas.push({ texto: texto, correcta: seleccionada });
        });

        datos.preguntas.push({
            pregunta: preguntaTexto,
            valor: valor,
            respuestas: respuestas,
        });
    });

    console.log(datos);

    const formData = new FormData();

    // Asegúrate de poner los mismos `name` que espera el PHP:
    formData.append('titulo', datos.titulo);
    formData.append('fechaApertura', datos.fechaApertura);
    formData.append('fechaCierre', datos.fechaCierre);
    formData.append('duracion', datos.duracion);
    formData.append('peso', datos.peso);
    formData.append('puntos', datos.puntos);
    formData.append('codigo', codigo);

    // Para preguntas (como es un array de objetos, conviene pasarlo como JSON stringificado)
    formData.append('preguntas', JSON.stringify(datos.preguntas));

    try {
        const respuesta = await fetch("../app/procesar-examen.php", {
            method: "POST",
            body: formData
        });

        const contentType = respuesta.headers.get("content-type") || "";
        console.log("Tipo de respuesta:", contentType);

        if (contentType.includes("application/json")) {
            const resultado = await respuesta.json();
            console.log("Respuesta del servidor (JSON):", resultado);

            if (resultado.success) {
                popupPublicar();
            } else {
                alert("Error al guardar el examen.");
            }
        } else {
            const texto = await respuesta.text();
            console.warn("Respuesta NO JSON:", texto);
            alert("Error inesperado. Mira la consola para más detalles.");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
});

async function popupPublicar() {
    const popup = document.getElementById('popup-publicado');
    popup.style.display = 'flex';
}

function volverAtras() {
    if (window.location.pathname.includes("crear-examen-nuevo.php")) {
        window.location.href = "examenes-profesor.php";
    } else {
        window.history.back();
    }
}
