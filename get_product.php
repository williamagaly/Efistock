<?php
// get_product.php

session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Acesso negado. Faça login para continuar.']);
    exit;
}

require 'config.php';

// Obter o ID do produto
$id = $_GET['id'] ?? 0;

// Preparar e executar a consulta
$stmt = $conn->prepare("SELECT * FROM produtos WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($product = $result->fetch_assoc()) {
    echo json_encode($product);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Produto não encontrado.']);
}

$stmt->close();
$conn->close();
?>
