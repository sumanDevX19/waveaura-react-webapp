<?php

header('Content-Type: application/json');

$dsn = "mysql:host=127.0.0.1;dbname=waveaura;charset=utf8mb4";
$username = "root";  
$password = "alpha";     

try {
    $pdo = new PDO($dsn, $username, $password);

    // ✅ Get the limit from the query param if provided
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : null;

    if ($limit && $limit > 0) {
        // Use LIMIT if provided
        $stmt = $pdo->prepare("SELECT * FROM product_details LIMIT :limit");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
    } else {
        // No limit provided, fetch all
        $stmt = $pdo->query("SELECT * FROM product_details");
    }

    $products = $stmt->fetchAll(PDO::FETCH_OBJ);

    echo json_encode($products);

} catch (PDOException $e) {
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage()
    ]);
}
