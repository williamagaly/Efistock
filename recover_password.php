<?php
// recover_password.php

header('Content-Type: application/json');

require 'config.php';

$email = $_POST['email'] ?? '';

$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $token = bin2hex(random_bytes(50));
    $expiration = date('Y-m-d H:i:s', strtotime('+1 hour'));

    $stmtUpdate = $conn->prepare("UPDATE users SET reset_token = ?, reset_token_expiration = ? WHERE email = ?");
    $stmtUpdate->bind_param("sss", $token, $expiration, $email);
    $stmtUpdate->execute();

    // Aqui você enviaria o email ao usuário com o link de redefinição de senha
    // Exemplo de link: http://seusite.com/reset_password.php?token=$token
    echo json_encode(['status' => 'success', 'message' => 'Email de recuperação enviado. Verifique sua caixa de entrada.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Usuário não encontrado.']);
}

$stmt->close();
$conn->close();
?>
