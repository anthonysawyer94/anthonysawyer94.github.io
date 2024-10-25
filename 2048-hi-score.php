<?php

//Error Messages if needed
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection parameters
$host = 'database-1.c7c8se6ww0t2.us-east-1.rds.amazonaws.com';
$dbname = 'website';
$username = 'admin';
$password = 'DPIsackings!1';

// Create a new MySQL connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connected successfully to the database!<br>"; // Success message
}

// Check if it's a POST request to add a new score
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true); // Decode JSON
    $player = $data['player'];
    $score = $data['score'];

    // Insert the new score into the high_scores table
    $insert_sql = "INSERT INTO hi2024 (player, score) VALUES ('$player', '$score')";
    if ($conn->query($insert_sql) === TRUE) {
        //echo "New score added successfully.<br>";
    } else {
        //echo "Error: " . $insert_sql . "<br>" . $conn->error;
    }
}

// Fetch high scores
$sql = "SELECT player, score FROM hi2024 ORDER BY score DESC LIMIT 10";
$result = $conn->query($sql);

$scores = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $scores[] = $row;
    }
} else {
    echo "No rows bro";
}


// Return the scores as JSON
echo json_encode($scores);

$conn->close();
?>
