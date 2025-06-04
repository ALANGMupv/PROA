<?php
session_start();

if (isset($_SESSION['usuario'])) {
    echo json_encode(['logueado' => true]);
} else {
    echo json_encode(['logueado' => false]);
}
