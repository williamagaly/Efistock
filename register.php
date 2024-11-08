<?php
// register.php

session_start();
header('Content-Type: application/json');

require 'config.php';

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Email inválido.']);
    exit;
}

$passwordHash = password_hash($password, PASSWORD_BCRYPT);

$stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
$stmt->bind_param("ss", $email, $passwordHash);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Usuário registrado com sucesso.']);
} else {
    if ($stmt->errno == 1062) {
        echo json_encode(['status' => 'error', 'message' => 'Erro: Este email já está registrado.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erro ao registrar usuário: ' . $stmt->error]);
    }
}

$stmt->close();
$conn->close();
?>
