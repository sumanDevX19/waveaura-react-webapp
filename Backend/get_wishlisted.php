<?php

header("Access-Control-Allow-Origin: *"); // use your frontend URL
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

    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input['wishlist']) || !is_array($input['wishlist']) || count($input['wishlist']) === 0) {
        echo json_encode(["status" => "error", "message" => "Invalid or empty wishlist"]);
        exit();
    }

    $wishlist = $input['wishlist'];
    $placeholders = implode(',', array_fill(0, count($wishlist), '?'));

    $stmt = $pdo->prepare("SELECT id, name, price, imgSrc, altText, productPageLink FROM product_details_react WHERE id IN ($placeholders)");
    $stmt->execute($wishlist);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "products" => $products]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Server error", "details" => $e->getMessage()]);
}
