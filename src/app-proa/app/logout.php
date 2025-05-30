<?php
ini_set('session.cookie_path', '/'); // Acceso global
session_start();

// Elimina solo la sesión del usuario PROA
unset($_SESSION['usuario']);
unset($_SESSION['rol']);

// Mantenemos usuarioGTI intacto
// $_SESSION['usuarioGTI'] sigue disponible

http_response_code(200); // Todo OK
