<?php
// update.php

session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Acesso negado. Faça login para continuar.']);
    exit;
}

require 'config.php';

// Obter dados do formulário
$id          = $_POST['id'] ?? 0;
$descricao   = $_POST['descricao'] ?? '';
$codigoBarra = $_POST['codigoBarra'] ?? '';
$custo       = $_POST['custo'] ?? 0;
$precoVenda  = $_POST['precoVenda'] ?? 0;
$estoque     = $_POST['estoque'] ?? 0;
$validade    = $_POST['validade'] ?? '';

// Preparar e executar a consulta usando prepared statements
$stmt = $conn->prepare("UPDATE produtos SET descricao = ?, codigoBarra = ?, custo = ?, precoVenda = ?, estoque = ?, validade = ? WHERE id = ?");
$stmt->bind_param("ssddisi", $descricao, $codigoBarra, $custo, $precoVenda, $estoque, $validade, $id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Produto atualizado com sucesso.']);
} else {
    if ($stmt->errno == 1062) {
        // Erro de chave duplicada
        echo json_encode(['status' => 'error', 'message' => 'Erro: Já existe um produto com este código de barras.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erro ao atualizar produto: ' . $stmt->error]);
    }
}

$stmt->close();
$conn->close();
?>
