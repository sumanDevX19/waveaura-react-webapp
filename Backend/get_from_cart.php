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
        echo json_encode(["status" => "error", "message" => "User not logged in", "redirect" => "http://localhost/WaveAura/Pages/Login.html"]);
        exit();
    }

    $jwt = $_SESSION['jwt'];
    $secretKey = "your_super_secret_key"; 

    $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
    $userEmail = $decoded->data->email;

    $pdo = new PDO($dsn, $username, $password);

    // Get user
    $stmt = $pdo->prepare("SELECT cart FROM users_data WHERE email = ?");
    $stmt->execute([$userEmail]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(["status" => "error", "message" => "User not found"]);
        exit();
    }

    $cart = json_decode($user['cart'], true);

    if (!$cart || count($cart) === 0) {
        echo json_encode(["status" => "success", "cart" => []]);
        exit();
    }

    // Extract product IDs
    $productIds = array_column($cart, 'product_id');
    $placeholders = implode(',', array_fill(0, count($productIds), '?'));

    // Get product details
    $stmt = $pdo->prepare("SELECT id, name, price, imgSrc, altText, productPageLink FROM product_details WHERE id IN ($placeholders)");
    $stmt->execute($productIds);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Merge product info with quantity
    $cartItems = [];
    foreach ($cart as $item) {
        foreach ($products as $product) {
            if ($product['id'] == $item['product_id']) {
                $cartItems[] = [
                    'id' => $product['id'],
                    'name' => $product['name'],
                    'price' => $product['price'],
                    'imgSrc' => $product['imgSrc'],
                    'altText' => $product['altText'],
                    'productPageLink' => $product['productPageLink'],
                    'quantity' => $item['quantity']
                ];
            }
        }
    }

    echo json_encode(["status" => "success", "cart" => $cartItems]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Something went wrong", "details" => $e->getMessage(), "redirect" => "http://localhost/WaveAura/Pages/Login.html"]);
}
