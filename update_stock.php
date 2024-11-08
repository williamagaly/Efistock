<?php
// update_stock.php

session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Acesso negado. Faça login para continuar.']);
    exit;
}

require 'config.php';

// Obter dados
$id = $_POST['id'] ?? 0;
$estoque = $_POST['estoque'] ?? 0;

// Preparar e executar a consulta
$stmt = $conn->prepare("UPDATE produtos SET estoque = ? WHERE id = ?");
$stmt->bind_param("ii", $estoque, $id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Estoque atualizado com sucesso.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao atualizar estoque: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
