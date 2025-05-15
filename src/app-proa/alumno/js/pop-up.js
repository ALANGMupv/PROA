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


// Referencias al pop-up cancelar
const popupSalir = document.getElementById('popup-volver-cancelar');
const btnSalirSi = document.getElementById('popup-volver-cancelar-si');
const btnSalirNo = document.getElementById('popup-volver-cancelar-no');

// Evento para botón "Cancelar"
document.querySelector('button[type="reset"]').addEventListener('click', function(e) {
    e.preventDefault();
    popupSalir.style.display = 'flex';
});

// Evento para enlace "Volver"
document.getElementById('volver').addEventListener('click', function(e) {
    e.preventDefault();
    popupSalir.style.display = 'flex';
});

// Acción si el usuario confirma salir
btnSalirSi.addEventListener('click', function() {
    window.location.href = 'examenes-alumno.html';
});

// Cierra el pop-up si el usuario cancela
btnSalirNo.addEventListener('click', function() {
    popupSalir.style.display = 'none';
});
