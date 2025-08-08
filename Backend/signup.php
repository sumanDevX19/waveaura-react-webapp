<?php


header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
// Show errors during development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database credentials
$host = "127.0.0.1"; 
$user = "root";
$pass = "alpha";
$db   = "waveaura";

try {
    // Connect to database
    $conn = new mysqli($host, $user, $pass, $db);

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Get form data
    $name     = $_POST['fname']   ?? '';
    $email    = $_POST['email']   ?? '';
    $password = $_POST['password'] ?? '';
    $gender   = $_POST['gender']  ?? '';
    $city     = $_POST['city']    ?? '';

    // Check if email already exists
    $checkSql = "SELECT * FROM users_data WHERE email = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $result = $checkStmt->get_result();

    if ($result->num_rows > 0) {
        // Email already registered
        echo "<script>console.log('Email already exists!')</script>";
    } else {
        // Hash password securely
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insert new user
        $insertSql = "INSERT INTO users_data (name, email, password, gender, city) VALUES (?, ?, ?, ?, ?)";
        $insertStmt = $conn->prepare($insertSql);
        $insertStmt->bind_param("sssss", $name, $email, $hashedPassword, $gender, $city);

        if ($insertStmt->execute()) {
            echo "<script>console.log('✅ User registered successfully!')</script>";
        } else {
            throw new Exception("❌ Insert failed: " . $insertStmt->error);
        }

        $insertStmt->close();
    }

    $checkStmt->close();
    $conn->close();

} catch (Exception $e) {
    // Handle any thrown exception
    echo "<script>console.error('{$e->getMessage()}');</script>";
}
?>
