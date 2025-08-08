<?php
session_start();

require __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Show errors in browser for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$dsn = "mysql:host=127.0.0.1;dbname=waveaura;charset=utf8mb4";
$username = "root";
$password = "alpha";

try {
    // Check if JWT token exists in session
    if (!isset($_SESSION['jwt'])) {
        echo json_encode(["status" => "error", "message" => "User not logged in", "redirect" => "http://localhost/WaveAura/Pages/Login.html"]);
        exit();
    }

    // Check for product_id in POST
    if (!isset($_POST['product_id'])) {
        echo json_encode(["status" => "error", "message" => "Product ID is required"]);
        exit();
    }

    $jwt = $_SESSION['jwt'];
    $secretKey = "your_super_secret_key"; // 🔒 Replace with your actual secret key

    // Decode the JWT token
    $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
    $userEmail = $decoded->data->email;

    // Connect to DB
    $pdo = new PDO($dsn, $username, $password);

    // Find user by email
    $stmt = $pdo->prepare("SELECT id, cart FROM users_data WHERE email = ?");
    $stmt->execute([$userEmail]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(["status" => "error", "message" => "User not found"]);
        exit();
    }

    $user_id = $user['id'];
    $product_id = intval($_POST['product_id']);

    $cart = [];
    if (!empty($user['cart'])) {
        $cart = json_decode($user['cart'], true);
    }

    // Add or update product in cart
    $found = false;
    foreach ($cart as &$item) {
        if ($item['product_id'] == $product_id) {
            $item['quantity'] += 1;
            $found = true;
            break;
        }
    }
    unset($item);

    if (!$found) {
        $cart[] = ['product_id' => $product_id, 'quantity' => 1];
    }

    $cart_json = json_encode($cart);

    // Update cart in database
    $update = $pdo->prepare("UPDATE users_data SET cart = ? WHERE id = ?");
    $update->execute([$cart_json, $user_id]);

    echo json_encode(["status" => "success", "message" => "Product added to cart"]);

} catch (\Firebase\JWT\ExpiredException $e) {
    echo json_encode(["status" => "error", "message" => "Token expired", "redirect" => "http://localhost/WaveAura/Pages/Login.html"]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Something 1 went wrong", "details" => $e->getMessage(), "redirect" => "http://localhost/WaveAura/Pages/Login.html"]);
}
