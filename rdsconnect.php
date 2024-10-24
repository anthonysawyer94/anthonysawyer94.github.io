<?php

// Database connection parameters
$host = 'database-1.c7c8se6ww0t2.us-east-1.rds.amazonaws.com';
$dbname = 'database-1';
$username = 'admin';
$password = 'DPIsackings!1';

// Create a new MySQL connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Example: Fetching data from a table called 'users'
$sql = "SELECT * FROM poop";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output the data
    while($row = $result->fetch_assoc()) {
        echo "name: " . $row["name"]. "<br>";
    }
} else {
    echo "No records found.";
}

// Example: Inserting user data
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    
    $insert_sql = "INSERT INTO poop (name) VALUES ('$name')";
    if ($conn->query($insert_sql) === TRUE) {
        echo "New record created successfully.";
    } else {
        echo "Error: " . $insert_sql . "<br>" . $conn->error;
    }
}

// Close the connection
$conn->close();
?>