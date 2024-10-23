<?php

// Allow requests only from your website
if (strpos($_SERVER['HTTP_REFERER'], 'https://anthonyjsawyer.com') === false) {
    die('Unauthorized access');
}

// Your OpenWeather API Key
$apiKey = '186fce6232608c1c135ee734a641feb9';

// The city or location to get the weather for (sent from the frontend)
$city = $_GET['city'];

// The OpenWeather API URL
$apiUrl = "https://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$apiKey}";

// Make the API request
$weatherData = file_get_contents($apiUrl);

// Send the result back to the frontend
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: https://www.anthonyjsawyer.com");
echo $weatherData;

?>