<?php
// search.php

session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Acesso negado. Faça login para continuar.']);
    exit;
}

require 'config.php';

// Obter a consulta de pesquisa e escapar caracteres especiais
$query = $_GET['query'] ?? '';
$query = '%' . $conn->real_escape_string($query) . '%';

// Preparar e executar a consulta usando prepared statements
$sql = "SELECT * FROM produtos WHERE descricao LIKE ? OR codigoBarra LIKE ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $query, $query);
$stmt->execute();
$result = $stmt->get_result();

$products = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

// Retornar os produtos em formato JSON
echo json_encode($products);

$stmt->close();
$conn->close();
?>
