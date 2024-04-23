<?php
// Permitir el acceso desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir los métodos POST y OPTIONS
header("Access-Control-Allow-Methods: *");

// Permitir las cabeceras especificadas
header("Access-Control-Allow-Headers: Content-Type");
/* Connecting to the database. */
$host = "localhost";
$db_name = "taller";
$username = "root";
$pass = "";
$conn = mysqli_connect($host, $username, $pass) 
or trigger_error(mysqli_error($conn), E_USER_ERROR);
mysqli_select_db($conn, $db_name);

/* Deleting the data from the database. */
$id = $_POST['id'];
$query = "DELETE FROM items WHERE id = '".$id."'";
$query_execute = mysqli_query($conn, $query) or die (mysqli_error($conn));
mysqli_close($conn);

?>