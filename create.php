<?php
// create.php

error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401); // Não autorizado
    echo json_encode(['status' => 'error', 'message' => 'Acesso negado. Faça login para continuar.']);
    exit;
}

require 'config.php';

// Obter e validar dados do formulário
$descricao   = $_POST['descricao'] ?? '';
$codigoBarra = $_POST['codigoBarra'] ?? '';
$custo       = isset($_POST['custo']) ? floatval($_POST['custo']) : 0.0;
$precoVenda  = isset($_POST['precoVenda']) ? floatval($_POST['precoVenda']) : 0.0;
$estoque     = isset($_POST['estoque']) ? intval($_POST['estoque']) : 0;
$validade    = $_POST['validade'] ?? '';

// Validar campos obrigatórios
if (empty($descricao) || empty($codigoBarra)) {
    echo json_encode(['status' => 'error', 'message' => 'Descrição e Código de Barras são obrigatórios.']);
    exit;
}

// Validar formato da data de validade (se fornecida)
if (!empty($validade) && !DateTime::createFromFormat('Y-m-d', $validade)) {
    echo json_encode(['status' => 'error', 'message' => 'Data de validade inválida. O formato correto é AAAA-MM-DD.']);
    exit;
}

try {
    // Preparar a consulta usando prepared statements
    $stmt = $conn->prepare("INSERT INTO produtos (descricao, codigoBarra, custo, precoVenda, estoque, validade) VALUES (?, ?, ?, ?, ?, ?)");

    // Verificar se a preparação foi bem-sucedida
    if (!$stmt) {
        // Registrar o erro e enviar a resposta ao cliente
        error_log('Erro na preparação do statement: ' . $conn->error);
        echo json_encode(['status' => 'error', 'message' => 'Erro ao preparar a consulta. Por favor, tente novamente mais tarde.']);
        exit;
    }

    $stmt->bind_param("ssddis", $descricao, $codigoBarra, $custo, $precoVenda, $estoque, $validade);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Produto criado com sucesso.']);
    } else {
        // Registrar o código de erro e a mensagem para depuração
        error_log('Erro MySQL (' . $stmt->errno . '): ' . $stmt->error);
        
        // Verificar se o erro é de código de barras duplicado
        if ($stmt->errno == 1062 || strpos($stmt->error, 'Duplicate entry') !== false) {
            echo json_encode(['status' => 'error', 'message' => 'Erro: Já existe um produto com este código de barras.']);
        } else {
            // Retornar a mensagem de erro específica ao usuário
            echo json_encode(['status' => 'error', 'message' => 'Erro ao criar produto: ' . $stmt->error]);
        }
    }

} catch (mysqli_sql_exception $e) {
    // Registrar o erro no log e verificar o tipo de erro
    error_log('Erro MySQL (' . $e->getCode() . '): ' . $e->getMessage());
    
    if ($e->getCode() == 1062 || strpos($e->getMessage(), 'Duplicate entry') !== false) {
        echo json_encode(['status' => 'error', 'message' => 'Erro: Já existe um produto com este código de barras.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erro ao criar produto: ' . $e->getMessage()]);
    }

} catch (Exception $e) {
    // Capturar outras exceções
    error_log('Ocorreu um erro inesperado: ' . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.']);

} finally {
    // Fechar statement e conexão
    if (isset($stmt) && $stmt !== false) {
        $stmt->close();
    }
    if (isset($conn) && $conn !== false) {
        $conn->close();
    }
}
?>