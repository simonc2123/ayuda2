<?php
// Permitir el acceso desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir los métodos POST y OPTIONS
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Permitir las cabeceras especificadas
header("Access-Control-Allow-Headers: Content-Type");

// Si es una solicitud OPTIONS, responde con un 200 OK sin procesar la solicitud
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Si es una solicitud POST, procesa los datos
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los datos JSON de la solicitud
    $jsonData = file_get_contents('php://input');
    $requestData = json_decode($jsonData);

    // Verificar si los campos username y password están presentes
    $username = isset($requestData->username) ? $requestData->username : '';
    $password = isset($requestData->password) ? $requestData->password : '';

    if (empty($username) || empty($password)) {
        // Si faltan campos, responder con un código de estado 400 Bad Request
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "Please fill all the fields"));
        exit();
    }

    /* Connecting to the database. */
    $host = "localhost";
    $db_name = "taller";
    $db_username = "root";
    $db_password = "";
    $conn = mysqli_connect($host, $db_username, $db_password, $db_name);

    // Check connection
    if (!$conn) {
        http_response_code(500);
        echo json_encode(array("success" => false, "message" => "Database connection failed"));
        exit();
    }

    // Use prepared statement to prevent SQL injection
    $query = "SELECT * FROM users WHERE username = ? AND password = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "ss", $username, $password);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);

    if (mysqli_stmt_num_rows($stmt) > 0) {
        echo json_encode(array("success" => true, "message" => "Login successful"));
    } else {
        echo json_encode(array("success" => false, "message" => "Login failed"));
        http_response_code(401);
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
?>
