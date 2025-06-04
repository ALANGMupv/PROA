const formulario = document.getElementById('formulario-con-pop-up');
let popup;


let confirmarEnvio = false;


function activarPopPup(btn){
    if (btn.id === 'guardar'){
        popup = document.getElementById('popup-confirmacion');
        popup.style.display = 'flex'; // Muestra el pop-up
    } else if ( btn.id === 'cancelar'){
        popup = document.getElementById('popup-salir');
        popup.style.display = 'flex'; // Muestra el pop-up
    }

}

function btnAceptar(id){
    if (id.id === 'aceptar-salir'){
        window.location.replace("asignatura.html");
    } else if ( id.id === 'aceptar-guardado'){
        window.location.replace("asignatura.html");
    }
    popup.style.display = 'none'; // Oculta el pop-up
}

function btnCancelar(){
    popup.style.display = 'none'; // Oculta el pop-up
}
