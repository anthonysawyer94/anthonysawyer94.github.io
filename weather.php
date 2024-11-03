<?php

// Allow requests only from your website
//if (strpos($_SERVER['HTTP_REFERER'], 'https://anthonyjsawyer.com') === false) {
//    die('Unauthorized access');
//}

// Your OpenWeather API Key
$apiKey = '186fce6232608c1c135ee734a641feb9';

// The city or location to get the weather for (sent from the frontend)
//$city = $_GET['city'] ?? null;
$latitude = $_GET['lat'] ?? null;
$longitude = $_GET['lon'] ?? null;
//$time = _GET['time'] ?? null;

//if (!$city) {
//    http_response_code(400);
//    echo json_encode(['error' => 'City parameter is required']);
//    exit;
//}

// Check if both latitude and longitude are provided
if (!$latitude || !$longitude) {
    http_response_code(400);
    echo json_encode(['error' => 'Latitude and longitude parameters are required']);
    exit;
}

// The OpenWeather API URL
$apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat={$latitude}&lon={$longitude}&appid={$apiKey}";
$apiUrlTime = "https://api.openweathermap.org/data/3.0/onecall/timemachine?lat={$latitude}&lon={$longitude}&dt={$time}&appid={$apiKey}";
$apiUrlAI = "https://api.openweathermap.org/data/3.0/onecall/overview?lon=-11.8092&lat=51.509865&appid={API key}"; // AI generated weather overview for the requested date
$apiUrlMap = "https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={API key}"; //weather map!
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
