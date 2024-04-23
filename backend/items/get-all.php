<?php
// Permitir el acceso desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir los métodos POST y OPTIONS
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Permitir las cabeceras especificadas
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$db_name = "taller";
$username = "root";
$pass = "";
$conn = mysqli_connect($host, $username, $pass)
or trigger_error(mysqli_error($conn), E_USER_ERROR);
mysqli_select_db($conn, $db_name);

/* Getting the id from the post request and then it is making a query to the database. */
$query = "SELECT * FROM items";

/* Making a query to the database. */
$query_execute = mysqli_query($conn, $query) or die (mysqli_error($conn));
echo json_encode(mysqli_fetch_all($query_execute, MYSQLI_ASSOC));
mysqli_close($conn);

?>