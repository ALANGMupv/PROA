let popup; // Definimos 'popup' como una variable global

// Función para manejar la apertura de los popups
function activarPopPup(btn) {
    if (btn.id === 'publicar') {
        popup = document.getElementById('popup-confirmacion');
    } else if (btn.id === 'cancelar' || btn.id === 'volver') {
        popup = document.getElementById('popup-salir');
    } else if(btn.id === 'guardar') {
        popup = document.getElementById('popup-guardado');
    }

    if (popup) {
        popup.style.display = 'flex'; // Muestra el pop-up
    }
}

// Función para manejar el botón Cancelar (cerrar el popup)
function btnCancelar() {
    if (popup) {
        popup.style.display = 'none'; // Cierra el popup
    }
}

// Función para manejar el botón Aceptar (de acuerdo con el popup que se muestra)
function btnAceptar(boton) {
    if (boton.id === 'aceptar-salir') {
        window.location.replace("examenes-profesor.php"); // Redirige si se cancela la creación
    } else if (boton.id === 'aceptar-publicado') {
        // Validar que todos los campos estén completos antes de publicar
        const formulario = document.getElementById("formulario-examen");
        const inputsRequeridos = formulario.querySelectorAll('[required]');
        let camposCompletos = true;

        inputsRequeridos.forEach(input => {
            if (!input.value.trim()) {
                camposCompletos = false;
                input.classList.add('error'); // Agregar clase de error
            } else {
                input.classList.remove('error');
            }
        });

        if (!camposCompletos) {
            alert('Por favor, completa todos los campos obligatorios.');
            return; // Detiene la ejecución si algún campo está vacío
        }

        // Aquí puedes añadir la lógica para enviar los datos al servidor si todo es correcto
        alert("El examen se ha publicado exitosamente.");
        window.location.replace("examenes-profesor.php");
    } else if (boton.id === 'aceptar-borrador') {
        alert("El examen se ha guardado como borrador.");
        window.location.replace("examenes-profesor.php");
    }

    if (popup) {
        popup.style.display = 'none'; // Cierra el popup
    }
}
