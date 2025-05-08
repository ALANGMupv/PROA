const formulario = document.getElementById('formulario-con-pop-up');
const popup = document.getElementById('popup-confirmacion');
const botonAceptar = document.getElementById('popup-aceptar');
const botonCancelar = document.getElementById('popup-cancelar');

let confirmarEnvio = false;

formulario.addEventListener('submit', function (e) {
    if (!confirmarEnvio) {
        e.preventDefault(); // Evita el envío inmediato
        popup.style.display = 'flex'; // Muestra el pop-up
    }
});

botonAceptar.addEventListener('click', function () {
    confirmarEnvio = true;
    popup.style.display = 'none';
    procesarEnvio(); // Envia el formulario manualmente
});

botonCancelar.addEventListener('click', function () {
    popup.style.display = 'none'; // Oculta el pop-up
});
