<?php
// Permitir el acceso desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir los métodos POST y OPTIONS
header("Access-Control-Allow-Methods: *");

// Permitir las cabeceras especificadas
header("Access-Control-Allow-Headers: Content-Type");

// Establecer el tipo de contenido de la respuesta como JSON
header("Content-Type: application/json");

/* Connecting to the database. */
$host = "localhost";
$db_name = "taller";
$username = "root";
$pass = "";
$conn = mysqli_connect($host, $username, $pass) 
or trigger_error(mysqli_error($conn), E_USER_ERROR);
mysqli_select_db($conn, $db_name);

/* Getting the values from the form. */
$name = isset($_POST['name']) ? $_POST['name'] : '';
$description = isset($_POST['description']) ? $_POST['description'] : '';
$price = isset($_POST['price']) ? $_POST['price'] : '';

if (empty($name) || empty($description) || empty($price)) {
    // Array para almacenar los nombres de los campos faltantes
    $missingFields = [];

    // Verificar qué campos están vacíos y agregarlos al array
    if (empty($name)) {
        $missingFields[] = 'name';
    }
    if (empty($description)) {
        $missingFields[] = 'description';
    }
    if (empty($price)) {
        $missingFields[] = 'price';
    }

    // Devolver un mensaje de error en formato JSON con los campos faltantes
    echo json_encode(array("success" => false, "message" => "Please fill all the fields. Missing fields: " . implode(', ', $missingFields)));
    exit;
}

/* Inserting the values from the form into the database. */
$query = "INSERT INTO items (name, description, price) VALUES ('".$name."', '".$description."', '".$price."')";
$query_execute = mysqli_query($conn, $query) or die (mysqli_error($conn));

// Si la inserción fue exitosa, devolver una respuesta de éxito en formato JSON
echo json_encode(array("success" => true, "message" => "Item added successfully"));

mysqli_close($conn);
?>
