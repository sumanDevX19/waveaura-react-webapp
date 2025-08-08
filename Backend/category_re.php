<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
header("Referrer-Policy: no-referrer-when-downgrade");


$dsn = "mysql:host=127.0.0.1;dbname=waveaura;charset=utf8mb4";
$username = "root";  
$password = "alpha";     

try {
    $pdo = new PDO($dsn, $username, $password);

    
    $stmt = $pdo->query("SELECT * FROM category_react");

   
    $users = $stmt->fetchAll(PDO::FETCH_OBJ);

    
    echo json_encode($users);

} catch (PDOException $e) {
   
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage()
    ]);
}
