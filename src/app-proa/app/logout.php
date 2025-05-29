<?php
ini_set('session.cookie_path', '/'); // Asegura acceso global a la cookie
session_start();
session_unset();
session_destroy();
http_response_code(200); // Respuesta correcta al frontend
