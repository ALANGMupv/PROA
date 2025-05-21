<header>
    <div class="header-izquierda">
        <a href="../index.php">
            <img src="../img/logoGTI.svg" alt="Logo GTI" class="logo">
        </a>
    </div>

    <div class="header-derecha">
        <nav class="activo">
            <a href="catalogo.php">Catálogo</a>
            <a href="preguntasFrecuentes.php">Preguntas Frecuentes</a>
            <a href="contacto.php">Contacto</a>
        </nav>
        <div class="perfil-logeado">
            <a href="#" class="btn-cerrar-sesion">
                <img src="../icons/cerrarSesion.svg" alt="Cerrar sesión" class="icono-perfil">
            </a>
        </div>
    </div>

    <button id="hamburguesa">
        <div></div><div></div><div></div>
    </button>
</header>

<nav class="menu-movil oculto">
    <div class="menu-superior">
        <a href="../index.php">
            <img src="../img/logoGTI.svg" alt="Logo GTI" class="logo-menu">
        </a>
        <button id="cerrar-menu">✕</button>
    </div>
    <ul class="menu-enlaces">
        <li><a href="catalogo.php">Catálogo</a></li>
        <li><a href="preguntasFrecuentes.php">Preguntas Frecuentes</a></li>
        <li><a href="contacto.php">Contacto</a></li>
    </ul>
    <div class="menu-acciones">
        <button class="btn btn-secundario btn-cerrar-sesion">Cerrar sesión</button>
    </div>
</nav>

<div class="popup" role="dialog" aria-modal="true">
    <div class="popup-contenido">
        <p class="parrafo-secundario">¿Estás seguro de que deseas continuar?</p>
        <div class="popup-botones">
            <button class="btn btn-principal popup-cancelar">Cancelar</button>
            <button class="btn btn-secundario popup-confirmar">Cerrar Sesión</button>
        </div>
    </div>
</div>
