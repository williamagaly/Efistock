<?php
// reset_password.php

session_start();
require 'config.php';

$token = $_GET['token'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newPassword = $_POST['new_password'] ?? '';

    $stmt = $conn->prepare("SELECT id FROM users WHERE reset_token = ? AND reset_token_expiration > NOW()");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id);
        $stmt->fetch();

        $newPasswordHash = password_hash($newPassword, PASSWORD_BCRYPT);

        $stmtUpdate = $conn->prepare("UPDATE users SET password = ?, reset_token = NULL, reset_token_expiration = NULL WHERE id = ?");
        $stmtUpdate->bind_param("si", $newPasswordHash, $id);
        $stmtUpdate->execute();

        echo "Senha redefinida com sucesso. <a href='index.html'>Clique aqui</a> para fazer login.";
    } else {
        echo "Token inválido ou expirado.";
    }

    $stmt->close();
    $conn->close();
} else {
    // Exibir formulário para inserir a nova senha
    echo "
    <form method='POST'>
        <label for='new_password'>Nova Senha:</label>
        <input type='password' id='new_password' name='new_password' required>
        <button type='submit'>Redefinir Senha</button>
    </form>
    ";
}
?>
