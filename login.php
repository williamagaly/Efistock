<?php
// login.php

session_start();
header('Content-Type: application/json');

require 'config.php';

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

$stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($id, $passwordHash);
    $stmt->fetch();
    if (password_verify($password, $passwordHash)) {
        $_SESSION['user_id'] = $id;
        echo json_encode(['status' => 'success', 'message' => 'Login efetuado com sucesso.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Senha incorreta.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Usuário não encontrado.']);
}

$stmt->close();
$conn->close();
?>
