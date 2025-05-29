document.querySelector('.formulario-login-pagLogin')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenimos el envío del formulario (recarga de la página)

    // Obtenemos los campos del formulario
    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contrasena');

    // Obtenemos y limpiamos los valores ingresados por el usuario
    const correo = correoInput.value.trim();
    const contrasena = contrasenaInput.value;

    // Eliminamos mensajes de error previos (si los hay)
    document.querySelectorAll('label small').forEach(el => el.remove());

    // Función para mostrar errores debajo de un label
    function mostrarError(campo, mensaje) {
        const label = document.querySelector(`label[for="${campo.id}"]`);
        const small = document.createElement('small');
        small.textContent = mensaje;
        small.classList.add('error-texto');
        label.appendChild(small);
    }

    let valido = true;

    // Validamos si los campos están vacíos
    if (!correo) {
        mostrarError(correoInput, 'Este campo es obligatorio');
        valido = false;
    }

    if (!contrasena) {
        mostrarError(contrasenaInput, 'Este campo es obligatorio');
        valido = false;
    }

    // Expresión regular para validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validamos formato del correo electrónico
    if (correo && !emailRegex.test(correo)) {
        mostrarError(correoInput, 'Correo inválido');
        valido = false;
    }

    // Si hay errores, no continuamos con la petición
    if (!valido) return;

    // Autenticación (login simulado)

    fetch('loginBackend.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            correo: correo,
            clave: contrasena
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                window.location.href = '../index.php';
            } else {
                mostrarToastError('Usuario o contraseña incorrectos');
            }
        })
        .catch(error => {
            alert('Error al iniciar sesión. Intenta de nuevo más tarde.');
            console.error('Error:', error);
        });

});