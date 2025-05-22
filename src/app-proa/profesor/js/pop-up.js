const formulario = document.getElementById('formulario-con-pop-up');
let popup;


let confirmarEnvio = false;


function activarPopPup(btn){
    if (btn.id === 'publicar'){
        popup = document.getElementById('popup-confirmacion');
        popup.style.display = 'flex'; // Muestra el pop-up
    } else if ( btn.id === 'cancelar' || btn.id === 'volver'){
        popup = document.getElementById('popup-salir');
        popup.style.display = 'flex'; // Muestra el pop-up
    } else if(btn.id === 'guardar' ){
        popup = document.getElementById('popup-guardado');
        popup.style.display = 'flex'; // Muestra el pop-up
        /*funcion guardar*/
    }
}

function btnAceptar(id){
    if (id.id === 'aceptar-salir'){
        window.location.replace("examenes-profesor.php");
    } else if ( id.id === 'aceptar-publicado'){
        window.location.replace("examenes-profesor.php");
    } else if (id.id === 'aceptar-borrador'){
        window.location.replace("examenes-profesor.php");
    }
    popup.style.display = 'none'; // Oculta el pop-up
}

function btnCancelar(){
    popup.style.display = 'none'; // Oculta el pop-up
}
