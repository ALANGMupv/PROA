const formulario = document.getElementById('formulario-con-pop-up');
const popup = document.getElementById('popup-confirmacion');
const botonAceptar = document.getElementById('popup-aceptar');
const botonCancelar = document.getElementById('popup-cancelar');

let confirmarEnvio = false;


function activarPopPup(){
    popup.style.display = 'flex'; // Muestra el pop-up
}

botonAceptar.addEventListener('click', function () {
    confirmarEnvio = true;
    popup.style.display = 'none';
});

botonCancelar.addEventListener('click', function () {
    popup.style.display = 'none'; // Oculta el pop-up
});