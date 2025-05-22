<header>
    <div class="header-izquierda">
        <a id="logo-proa-link" href="#">
            <img src="<?= $rutaBase ?>icons/logoBlanco.svg" alt="Logo PROA" class="logo" />
        </a>
    </div>

    <div class="header-derecha">
        <button class="boton-notificacion" popovertarget="menu-avisos">
            <img src="<?= $rutaBase ?>icons/avisos.svg" alt="Notificaciones" class="icono-notificacion">
        </button>

        <button class="usuario-caja" popovertarget="menu-usuario">
            <span id="nombre-usuario-header"></span>
            <img src="<?= $rutaBase ?>icons/perfil.svg" alt="Icono usuario" class="icono-usuario">
        </button>
    </div>
</header>

<div id="menu-usuario" popover>
    <div>Bienvenido<br><strong id="nombre-usuario-popover"></strong></div>
    <div><a href="#" id="cerrar-sesion">Cerrar sesión</a></div>
</div>

<div id="menu-avisos" popover></div>

<div class="popup" role="dialog" aria-modal="true">
    <div class="popup-contenido">
        <p>¿Estás seguro de que deseas cerrar sesión?</p>
        <div class="popup-botones">
            <button class="btn-oscuros popup-cancelar">Cancelar</button>
            <button class="btn-oscuros-secundario popup-confirmar">Cerrar sesión</button>
        </div>
    </div>
</div>
