<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
header("Referrer-Policy: no-referrer-when-downgrade");

// Show errors in browser for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database credentials
$host = "127.0.0.1"; 
$user = "root";
$pass = "alpha";
$db   = "waveaura";

try {
    // Create DB connection
    $conn = new mysqli($host, $user, $pass, $db);

    if ($conn->connect_error) {
        throw new Exception("❌ Connection Failed: " . $conn->connect_error);
    }

    // Fetch email & password from POST
    $email = $_POST['email'] ?? '';
   

    // Check if email exists
    $sql = "INSERT INTO customer (email) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s",$email);

    if ($stmt->execute()) {
            echo "<script>console.log('Email Saved Successfully')</script>";
    } else {
            throw new Exception("❌ Insert failed: " . $insertStmt->error);
    }
    

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage();
}

?>
