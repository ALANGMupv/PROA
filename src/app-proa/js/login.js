function procesarLogin() {
    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contrasena');

    const correo = correoInput.value.trim();
    const contrasena = contrasenaInput.value.trim();

    document.querySelectorAll('label small').forEach(el => el.remove());

    function mostrarError(campo, mensaje) {
        const label = document.querySelector(`label[for="${campo.id}"]`);
        const small = document.createElement('small');
        small.textContent = mensaje;
        small.classList.add('error-texto');
        label.appendChild(small);
    }

    let valido = true;

    if (!correo) {
        mostrarError(correoInput, 'Campo obligatorio');
        valido = false;
    }
    if (!contrasena) {
        mostrarError(contrasenaInput, 'Campo obligatorio');
        valido = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo && !emailRegex.test(correo)) {
        mostrarError(correoInput, 'Correo inválido');
        valido = false;
    }

    if (!valido) return;

    fetch('app/login-proa.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ correo, contrasena })
    })
        .then(res => res.text())
        .then(text => {
            console.log("Respuesta cruda del servidor:", text);
            let respuesta;
            try {
                respuesta = JSON.parse(text);
            } catch (e) {
                console.error("No se pudo parsear la respuesta como JSON:", e);
                return;
            }

            if (respuesta.exito) {
                fetch('app/chequear-sesion.php', { credentials: 'include' })
                    .then(res => res.json())
                    .then(usuario => {
                        console.log("Usuario desde sesión:", usuario);

                        if (!usuario.rol) {
                            alert("Error al recuperar la sesión. Intenta de nuevo.");
                            return;
                        }

                        const rol = usuario.rol;
                        if (rol === "pas") {
                            window.location.replace('./pas/index.php');
                        } else if (rol === "alumno") {
                            window.location.href = './alumno/index.php';
                        } else if (rol === "profesor") {
                            window.location.replace('./profesor/index.php');
                        } else {
                            alert("Rol no reconocido");
                        }
                    });
            } else {
                mostrarToastError('Usuario o contraseña incorrectos');
            }
        })
        .catch(error => {
            alert('Error al iniciar sesión. Intenta de nuevo más tarde.');
            console.error('Error:', error);
        });
}

// Activar login manual por botón
document.querySelector('.formulario-login')?.addEventListener('submit', function (e) {
    e.preventDefault();
    procesarLogin();
});

// Autocompletar login al hacer clic en los botones del mini-header (solo en login de PROA)
document.querySelectorAll('.btn-header-rol').forEach(boton => {
    boton.addEventListener('click', () => {
        const rol = boton.dataset.rol;

        // Primero: autocompletar login
        fetch('app/obtener-persona-proa.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
            body: new URLSearchParams({ rol })
        })
            .then(res => res.json())
            .then(datos => {
                if (datos.email && datos.contraseña) {
                    document.getElementById('correo').value = datos.email;
                    document.getElementById('contrasena').value = datos.contraseña;
                }
            });

        // Segundo: guardar el rol en la sesión
        fetch('app/marcar-rol-en-sesion.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            credentials: 'include',
            body: new URLSearchParams({ rol })
        })
            .then(() => {
                // Tercero: marcar botón activo en el DOM
                document.querySelectorAll('.btn-header-rol').forEach(btn => {
                    btn.classList.remove('activo');
                });
                boton.classList.add('activo');
            });
    });
});


function mostrarToastError(mensaje) {
    const overlayError = document.createElement('div');
    overlayError.style.position = 'fixed';
    overlayError.style.top = 0;
    overlayError.style.left = 0;
    overlayError.style.width = '100%';
    overlayError.style.height = '100%';
    overlayError.style.backdropFilter = 'blur(4px)';
    overlayError.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    overlayError.style.zIndex = '999';

    const toastError = document.createElement('div');
    toastError.textContent = mensaje;
    toastError.style.position = 'fixed';
    toastError.style.top = '50%';
    toastError.style.left = '50%';
    toastError.style.transform = 'translate(-50%, -50%)';
    toastError.style.padding = '1em 2em';
    toastError.style.width = 'max-content';
    toastError.style.maxWidth = '80%';
    toastError.style.fontSize = '1.15rem';
    toastError.style.backgroundColor = '#c45f5f';
    toastError.style.color = '#fff';
    toastError.style.borderRadius = '12px';
    toastError.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
    toastError.style.fontFamily = 'var(--fuente-lato)';
    toastError.style.textAlign = 'center';
    toastError.style.zIndex = '1000';

    document.body.appendChild(overlayError);
    document.body.appendChild(toastError);

    setTimeout(() => {
        toastError.remove();
        overlayError.remove();
    }, 1000);
}
