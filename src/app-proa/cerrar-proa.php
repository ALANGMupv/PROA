<?php
session_start();

// Elimina solo la sesión del usuario seleccionado en PROA
unset($_SESSION['usuario']);
unset($_SESSION['rol']);

// Redirige a la pantalla de selección de rol (login PROA)
header('Location: ../index.php');
exit;
