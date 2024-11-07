<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

// Access the API key
$apiKey = $_ENV['TIMEZONE_API_KEY'] ?? null;


// Latitude, longitude, and Unix timestamp for the location and time you want to convert
$latitude = $_GET['lat'] ?? null;
$longitude = $_GET['lon'] ?? null;
$timestamp = $_GET['timestamp'] ?? null;

// API URL with parameters
$url = "http://api.timezonedb.com/v2.1/get-time-zone?key=$api_key&format=json&by=position&lat=$latitude&lng=$longitude&time=$timestamp";

// Make the API request
$response = file_get_contents($url);

if ($response === FALSE) {
    http_response_code(500);
    echo json_encode(['error' => 'Unable to retrieve timezone data']);
    exit;
}

// Send the result back to the frontend
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://www.anthonyjsawyer.com");
header("Access-Control-Allow-Methods: GET");
echo $response;
?>