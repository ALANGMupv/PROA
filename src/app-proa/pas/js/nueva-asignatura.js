// ==============================
// CARGA DE DATOS EN LOS SELECTS
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    // Cargar departamentos desde JSON
    fetch("../../api/data/asignaturas.json") // ajusta la ruta si hace falta
        .then(res => res.json())
        .then(asignaturas => {
            const departamentosUnicos = [...new Set(asignaturas.map(a => a.departamento))];
            rellenarSelect("dropdown-departamento", departamentosUnicos, "Seleccionar departamento");
        });

    // Rellenar los demás select con arrays fijos
    const caracter = ["Obligatoria", "Optativa", "Básica", "TFG / TFM", "Troncal"];
    const cursos = ["2024-2025", "2025-2026", "2026-2027"];
    const semestres = ["1º", "2º"];

    rellenarSelect("dropdown-caracter", caracter, "Seleccionar carácter de la asignatura");
    rellenarSelect("dropdown-curso", cursos, "Seleccionar Curso Académico");
    rellenarSelect("dropdown-semestre", semestres, "Seleccionar Semestre");
});

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

    opciones.forEach(valor => {
        const option = document.createElement("option");
        option.value = valor;
        option.textContent = valor;
        select.appendChild(option);
    });
}

// =========================
// VALIDACIÓN Y POPUPS
// =========================

// Inputs
const codigoInput = document.getElementById("codigo");
const nombreInput = document.getElementById("Nombre");
const creditosInput = document.getElementById("creditos");
const grupoInput = document.getElementById("grupo");

// Selects
const departamentoSelect = document.getElementById("dropdown-departamento");
const caracterSelect = document.getElementById("dropdown-caracter");
const cursoSelect = document.getElementById("dropdown-curso");
const semestreSelect = document.getElementById("dropdown-semestre");

// Errores
const errorCodigo = document.getElementById("error-codigo");
const errorNombre = document.getElementById("error-nombre");
const errorDepartamento = document.getElementById("error-departamento");
const errorCaracter = document.getElementById("error-caracter");
const errorCurso = document.getElementById("error-curso");
const errorSemestre = document.getElementById("error-semestre");

// Popups
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
    creditosInput.value = Math.min(Math.max(1, creditosInput.value), 12);
});

grupoInput.addEventListener("input", () => {
    grupoInput.value = Math.min(Math.max(1, grupoInput.value), 10);
});

// ==========================
// BOTÓN GUARDAR
// ==========================
document.getElementById("guardar").addEventListener("click", () => {
    let errores = false;

    // Código
    if (!/^[A-Z]{3}\d{3}$/.test(codigoInput.value.trim())) {
        codigoInput.classList.add("input-error");
        errorCodigo.textContent = "Debe tener formato ABC123";
        errores = true;
    } else {
        errorCodigo.textContent = "";
        codigoInput.classList.remove("input-error");
    }

    // Nombre
    if (nombreInput.value.trim().length < 5) {
        nombreInput.classList.add("input-error");
        errorNombre.textContent = "Debe tener al menos 5 caracteres";
        errores = true;
    } else {
        errorNombre.textContent = "";
        nombreInput.classList.remove("input-error");
    }

    // Selects
    if (!departamentoSelect.value) {
        departamentoSelect.classList.add("input-error");
        errorDepartamento.textContent = "Selecciona un departamento";
        errores = true;
    } else {
        errorDepartamento.textContent = "";
        departamentoSelect.classList.remove("input-error");
    }

    if (!caracterSelect.value) {
        caracterSelect.classList.add("input-error");
        errorCaracter.textContent = "Selecciona un carácter";
        errores = true;
    } else {
        errorCaracter.textContent = "";
        caracterSelect.classList.remove("input-error");
    }

    if (!cursoSelect.value) {
        cursoSelect.classList.add("input-error");
        errorCurso.textContent = "Selecciona un curso académico";
        errores = true;
    } else {
        errorCurso.textContent = "";
        cursoSelect.classList.remove("input-error");
    }

    if (!semestreSelect.value) {
        semestreSelect.classList.add("input-error");
        errorSemestre.textContent = "Selecciona un semestre";
        errores = true;
    } else {
        errorSemestre.textContent = "";
        semestreSelect.classList.remove("input-error");
    }

    if (!errores) {
        popupGuardar.showModal();
    }
});

// ==========================
// BOTÓN CONFIRMAR GUARDAR
// ==========================
document.getElementById("confirmar-guardar").addEventListener("click", () => {
    popupGuardar.close();
    window.location.href = "asignaturas.php";
});

// ==========================
// BOTÓN CANCELAR POPUP GUARDAR
// ==========================
document.getElementById("cancelar-guardar").addEventListener("click", (e) => {
    e.preventDefault();
    popupGuardar.close();
});

// ==========================
// BOTÓN PRINCIPAL CANCELAR
// ==========================
document.getElementById("cancelar").addEventListener("click", () => {
    popupCancelar.showModal();
});

// ==========================
// CONFIRMAR CANCELAR
// ==========================
document.getElementById("confirmar-cancelar").addEventListener("click", () => {
    popupCancelar.close();
    window.location.href = "asignaturas.php";
});

// ==========================
// CANCELAR CANCELAR (seguir editando)
// ==========================
document.getElementById("cancelar-cancelar").addEventListener("click", () => {
    popupCancelar.close();
});

const btnVolver = document.getElementById("btn-volver");

if (btnVolver) {
    btnVolver.addEventListener("click", (e) => {
        e.preventDefault();

        // A veces los diálogos bloquean el focus o cancelan la navegación
        const dialogsAbiertos = document.querySelectorAll("dialog[open]");
        dialogsAbiertos.forEach(dialog => dialog.close());

        // Redirige a la página anterior si existe, si no a asignaturas.php
        if (document.referrer && !document.referrer.includes(location.href)) {
            window.location.href = document.referrer;
        } else {
            window.history.back();
        }
    });
}




