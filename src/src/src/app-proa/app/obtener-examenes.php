<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require_once '../../../env/proa.inc';

$idUsuario = $_SESSION['usuario']['idUsuariosPROA'] ?? null;

if (!$idUsuario) {
    echo json_encode([]);
    exit;
}

$codigo = $_GET['codigo'] ?? '';
if (!$codigo) {
    echo json_encode([]);
    exit;
}

$sql = "
    SELECT 
        ce.titulo,
        ce.fechaFin AS fechaLimite,
        ce.pesoExamen AS peso,
        ee.nombreEstado,
        e.idExamen
    FROM examenes e
    INNER JOIN contenidoexamen ce ON e.idContenido = ce.idContenido
    INNER JOIN estadosexamen ee ON e.idEstado = ee.idEstado
    WHERE e.codigoAsignatura = ? AND e.idUsuariosPROA = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $codigo, $idUsuario);
$stmt->execute();
$resultado = $stmt->get_result();

$examenes = [
    'abiertos'   => [],
    'cerrados' => [],
    'borradores' => []
];

while ($row = $resultado->fetch_assoc()) {
    $examen = [
        'titulo'      => $row['titulo'],
        'fechaLimite' => $row['fechaLimite'],
        'peso'        => $row['peso'],
        'id'          => $row['idExamen']
    ];

    // Clasifica según nombreEstado
    switch (strtolower($row['nombreEstado'])) {
        case 'abierto':
            $examenes['abiertos'][] = $examen;
            break;
        case 'Cerrado':
            $examenes['cerrados'][] = $examen;
            break;
        case 'Borrador':
            $examenes['borradores'][] = $examen;
            break;
        default:
            // Si tiene otro estado, lo puedes ignorar o registrar
            break;
    }
}

$stmt->close();
$conn->close();

echo json_encode($examenes);
?>
