<?php

//Error Messages if needed
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

require 'vendor/autoload.php'; // Include Composer's autoloader
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);

try {
    $dotenv->load(); // Load .env file
} catch (Exception $e) {
    echo json_encode([
        'error' => true,
        'message' => 'Error loading .env file: ' . $e->getMessage()
    ]);
    exit;
}

// Database connection parameters
$host = $_ENV['DB_HOST'] ?? null;
$dbname = 'website';
$username = $_ENV['DB_USER_NAME'] ?? null;
$password = $_ENV['DP_PASS'] ?? null;

// Create a new MySQL connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    //echo "Connected successfully to the database!<br>"; // Success message
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
    
    /*
    // Check if the number of scores exceeds 30
    $count_sql = "SELECT COUNT(*) as count FROM hi2024";
    $count_result = $conn->query($count_sql);
    $count_row = $count_result->fetch_assoc();

    // If there are more than 30 entries, delete the lowest scores
    if ($count_row['count'] > 30) {
        // Delete the lowest scores (ORDER BY score ASC to get the lowest)
        $delete_sql = "DELETE FROM hi2024 WHERE id NOT IN (SELECT id FROM (SELECT id FROM hi2024 ORDER BY score DESC LIMIT 30) as temp)";
        $conn->query($delete_sql);
    } else {
        echo "Error: " . $insert_sql . "<br>" . $conn->error;
    }  
        */
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
header('Content-Type: application/json');
echo json_encode($scores);

$conn->close();
?>
