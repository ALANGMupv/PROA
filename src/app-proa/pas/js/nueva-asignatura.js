// nueva-asignatura.js

// Validación del campo código
const codigoInput = document.getElementById("codigo");
const errorCodigo = document.getElementById("error-codigo");

codigoInput.addEventListener("input", () => {
    const valor = codigoInput.value.trim().toUpperCase();
    codigoInput.value = valor;

    const esValido = /^[A-Z]{3}\d{3}$/.test(valor);
    if (!esValido) {
        codigoInput.classList.add("input-error");
        errorCodigo.textContent = "Debe tener formato ABC123";
    } else {
        codigoInput.classList.remove("input-error");
        errorCodigo.textContent = "";
    }
});

// Validación nombre mínimo 5 caracteres
const nombreInput = document.getElementById("Nombre");
const errorNombre = document.getElementById("error-nombre");

nombreInput.addEventListener("input", () => {
    if (nombreInput.value.trim().length < 5) {
        nombreInput.classList.add("input-error");
        errorNombre.textContent = "Debe tener al menos 5 caracteres";
    } else {
        nombreInput.classList.remove("input-error");
        errorNombre.textContent = "";
    }
});

// Validación límites en inputs tipo number
const creditosInput = document.getElementById("creditos");
creditosInput.addEventListener("input", () => {
    if (creditosInput.value > 12) creditosInput.value = 12;
    if (creditosInput.value < 1) creditosInput.value = 1;
});

const grupoInput = document.getElementById("grupo");
grupoInput.addEventListener("input", () => {
    if (grupoInput.value > 10) grupoInput.value = 10;
    if (grupoInput.value < 1) grupoInput.value = 1;
});

// Cargar datos desde el JSON de departamentos
window.addEventListener("DOMContentLoaded", () => {
    fetch("/src/api/data/asignaturas.json")
        .then(res => res.json())
        .then(asignaturas => {
            const departamentosUnicos = [...new Set(asignaturas.map(a => a.departamento))];
            rellenarSelect("dropdown-departamento", departamentosUnicos, "Seleccionar departamento");
        });

    const caracter = ["Obligatoria", "Optativa", "Básica", "TFG / TFM", "Troncal"];
    const cursos = ["2024-2025", "2025-2026", "2026-2027"];
    const semestres = ["1º", "2º"];

    rellenarSelect("dropdown-caracter", caracter);
    rellenarSelect("dropdown-curso", cursos);
    rellenarSelect("dropdown-semestre", semestres);
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
