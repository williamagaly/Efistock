<?php
// logout.php

session_start();
session_destroy();

header('Content-Type: application/json');
echo json_encode(['status' => 'success', 'message' => 'Você saiu com sucesso.']);
?>
