const botonDemo = document.getElementById("ctaDemo");
fetch('chequear-sesion.php')
    .then(response => response.json())
    .then(data => {
        const ctaLink = data.logueado
            ? '../app-proa/index.php' // Si está logueado, va a PROA
            : 'login.php';           // Si no, va al login de GTI

        botonDemo.setAttribute("href", ctaLink);
    })
    .catch(error => {
        console.error('Error al verificar sesión:', error);
        botonDemo.setAttribute("href", 'login.php'); // Por defecto
    });