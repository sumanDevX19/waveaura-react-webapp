<?php
session_start();
header('Content-Type: application/json');

require __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$dsn = "mysql:host=127.0.0.1;dbname=waveaura;charset=utf8mb4";
$username = "root";
$password = "alpha";

try {
    if (!isset($_SESSION['jwt'])) {
        echo json_encode(["status" => "error", "message" => "Not logged in"]);
        exit();
    }

    if (!isset($_POST['product_id']) || !isset($_POST['quantity'])) {
        echo json_encode(["status" => "error", "message" => "Missing data"]);
        exit();
    }

    $jwt = $_SESSION['jwt'];
    $secretKey = "your_super_secret_key";
    $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
    $email = $decoded->data->email;

    $productId = intval($_POST['product_id']);
    $quantity = intval($_POST['quantity']);

    $pdo = new PDO($dsn, $username, $password);

    $stmt = $pdo->prepare("SELECT cart FROM users_data WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    $cart = json_decode($user['cart'], true);

    foreach ($cart as &$item) {
        if ($item['product_id'] == $productId) {
            $item['quantity'] = $quantity;
            break;
        }
    }

    $cartJson = json_encode($cart);
    $update = $pdo->prepare("UPDATE users_data SET cart = ? WHERE email = ?");
    $update->execute([$cartJson, $email]);

    echo json_encode(["status" => "success"]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
