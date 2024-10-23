<?php

// Allow requests only from your website
if (strpos($_SERVER['HTTP_REFERER'], 'https://anthonyjsawyer.com') === false) {
    die('Unauthorized access');
}

// Your OpenWeather API Key
$apiKey = getenv('OPENWEATHER_API_KEY'); // Load from environment variable

// The city or location to get the weather for (sent from the frontend)
$city = $_GET['city'] ?? null;

if (!$city) {
    http_response_code(400);
    echo json_encode(['error' => 'City parameter is required']);
    exit;
}

// The OpenWeather API URL
$apiUrl = "https://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$apiKey}";

// Make the API request and handle errors
$weatherData = @file_get_contents($apiUrl);

if ($weatherData === FALSE) {
    http_response_code(500);
    echo json_encode(['error' => 'Unable to retrieve weather data']);
    exit;
}

// Send the result back to the frontend
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://www.anthonyjsawyer.com");
header("Access-Control-Allow-Methods: GET");
echo $weatherData;

?>
