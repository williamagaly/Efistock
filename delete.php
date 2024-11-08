<?php
// delete.php

session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Acesso negado. Faça login para continuar.']);
    exit;
}

require 'config.php';

// Obter o ID do produto a ser excluído
$id = $_POST['id'] ?? 0;

// Preparar e executar a consulta usando prepared statements
$stmt = $conn->prepare("DELETE FROM produtos WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Produto excluído com sucesso.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao excluir produto: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
