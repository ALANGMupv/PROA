// ==============================
// CARGA DE DATOS EN LOS SELECTS
// ==============================

fetch("../app/cargar-datos-asignatura.php")
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error(data.error);
            return;
        }

        rellenarSelect("dropdown-titulacion", data.titulacion, "Seleccionar titulación");
        rellenarSelect("dropdown-curso", data.departamentos, "Seleccionar Departamento");
        rellenarSelect("dropdown-semestre", data.semestres, "Seleccionar Semestre");
        rellenarSelect("dropdown-caracter", data.caracteresasignatura, "Seleccionar carácter de la asignatura");
    })
    .catch(err => console.error("Error al cargar datos para dropdowns:", err));

function rellenarSelect(id, opciones, placeholder = null) {
    const select = document.getElementById(id);
    select.innerHTML = "";

    if (placeholder) {
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = placeholder;
        defaultOption.disabled = true;
        defaultOption.selected = true;
        select.appendChild(defaultOption);
    }

    opciones.forEach(op => {
        const option = document.createElement("option");
        option.value = op.id;
        option.textContent = op.nombre;
        select.appendChild(option);
    });
}

// =========================
// VALIDACIÓN Y POPUPS
// =========================

const codigoInput = document.getElementById("codigo");
const nombreInput = document.getElementById("Nombre");
const creditosInput = document.getElementById("creditos");

const titulacionSelect = document.getElementById("dropdown-titulacion");
const departamentoSelect = document.getElementById("dropdown-curso");
const cursoSelect = document.getElementById("dropdown-curso-logico");
const semestreSelect = document.getElementById("dropdown-semestre");
const caracterSelect = document.getElementById("dropdown-caracter");

const errorCodigo = document.getElementById("error-codigo");
const errorNombre = document.getElementById("error-nombre");
const errorDepartamento = document.getElementById("error-curso");
const errorSemestre = document.getElementById("error-semestre");
const errorCaracter = document.getElementById("error-caracter");

const popupGuardar = document.getElementById("popup-guardar");
const popupCancelar = document.getElementById("popup-cancelar");

// Validaciones dinámicas
codigoInput.addEventListener("input", () => {
    const valor = codigoInput.value.trim().toUpperCase();
    codigoInput.value = valor;
    if (/^[A-Z]{3}\d{3}$/.test(valor)) {
        codigoInput.classList.remove("input-error");
        errorCodigo.textContent = "";
    }
});

nombreInput.addEventListener("input", () => {
    if (nombreInput.value.trim().length >= 5) {
        nombreInput.classList.remove("input-error");
        errorNombre.textContent = "";
    }
});

creditosInput.addEventListener("input", () => {
    let val = parseInt(creditosInput.value);
    if (!isNaN(val)) {
        creditosInput.value = Math.min(Math.max(1, val), 12);
    }
});

// ==========================
// BOTÓN GUARDAR
// ==========================

document.getElementById("guardar").addEventListener("click", () => {
    let errores = false;

    if (!/^[A-Z]{3}\d{3}$/.test(codigoInput.value.trim())) {
        codigoInput.classList.add("input-error");
        errorCodigo.textContent = "Debe tener formato ABC123";
        errores = true;
    }

    if (nombreInput.value.trim().length < 5) {
        nombreInput.classList.add("input-error");
        errorNombre.textContent = "Debe tener al menos 5 caracteres";
        errores = true;
    }

    if (!departamentoSelect.value) {
        departamentoSelect.classList.add("input-error");
        errorDepartamento.textContent = "Selecciona un departamento";
        errores = true;
    }

    if (!caracterSelect.value) {
        caracterSelect.classList.add("input-error");
        errorCaracter.textContent = "Selecciona un carácter";
        errores = true;
    }

    if (!cursoSelect.value) {
        cursoSelect.classList.add("input-error");
        errorCurso.textContent = "Selecciona un curso académico";
        errores = true;
    }

    if (!semestreSelect.value) {
        semestreSelect.classList.add("input-error");
        errorSemestre.textContent = "Selecciona un semestre";
        errores = true;
    }

    if (!errores) {
        popupGuardar.showModal();
    }
});

// ==========================
// BOTÓN CONFIRMAR GUARDAR
// ==========================

document.getElementById("confirmar-guardar").addEventListener("click", () => {
    const datos = {
        codigoAsignatura: codigoInput.value.trim(),
        nombre: nombreInput.value.trim(),
        creditos: parseInt(creditosInput.value),
        codigoTitulacion: titulacionSelect.value,
        idCurso: parseInt(cursoSelect.value),
        idSemestre: parseInt(semestreSelect.value),
        idDepartamento: parseInt(departamentoSelect.value),
        idCaracter: parseInt(caracterSelect.value)
    };

    console.log("Datos que se envían:", datos);
    fetch("../app/guardar-asignatura.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
        .then(res => res.json())
        .then(respuesta => {
            if (respuesta.success) {
                popupGuardar.close();
                window.location.href = "asignaturas.php";
            } else {
                alert("Error al guardar: " + respuesta.error);
            }
        })
        .catch(err => {
            console.error("Error en la petición:", err);
            alert("Error en el guardado.");
        });
});

// ==========================
// BOTONES CANCELAR Y VOLVER
// ==========================

document.getElementById("cancelar-guardar").addEventListener("click", e => {
    e.preventDefault();
    popupGuardar.close();
});

document.getElementById("cancelar").addEventListener("click", () => {
    popupCancelar.showModal();
});

document.getElementById("confirmar-cancelar").addEventListener("click", () => {
    popupCancelar.close();
    window.location.href = "asignaturas.php";
});

document.getElementById("cancelar-cancelar").addEventListener("click", () => {
    popupCancelar.close();
});

const btnVolver = document.getElementById("btn-volver");

if (btnVolver) {
    btnVolver.addEventListener("click", (e) => {
        e.preventDefault();
        const dialogsAbiertos = document.querySelectorAll("dialog[open]");
        dialogsAbiertos.forEach(dialog => dialog.close());
        if (document.referrer && !document.referrer.includes(location.href)) {
            window.location.href = document.referrer;
        } else {
            window.history.back();
        }
    });
}