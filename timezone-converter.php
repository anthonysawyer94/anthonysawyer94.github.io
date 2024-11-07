<?php

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

// Access the API key
$apiKey = $_ENV['TIMEZONE_API_KEY'] ?? null;


// Latitude, longitude, and Unix timestamp for the location and time you want to convert
$latitude = $_GET['lat'] ?? null;
$longitude = $_GET['lon'] ?? null;
$timestamp = $_GET['timestamp'] ?? null;
$state = $_GET['state'] ?? null;

// Define an array mapping U.S. states to timezone names
$stateToTimezone = [
    'AL' => 'America/Chicago',    // Alabama
    'AK' => 'America/Anchorage',  // Alaska
    'AZ' => 'America/Phoenix',    // Arizona (does not observe DST)
    'AR' => 'America/Chicago',    // Arkansas
    'CA' => 'America/Los_Angeles', // California
    'CO' => 'America/Denver',     // Colorado
    'CT' => 'America/New_York',   // Connecticut
    'DE' => 'America/New_York',   // Delaware
    'FL' => 'America/New_York',   // Florida (most of the state)
    'GA' => 'America/New_York',   // Georgia
    'HI' => 'Pacific/Honolulu',   // Hawaii (does not observe DST)
    'ID' => 'America/Boise',      // Idaho (most of the state)
    'IL' => 'America/Chicago',    // Illinois
    'IN' => 'America/Indiana/Indianapolis', // Indiana (most of the state)
    'IA' => 'America/Chicago',    // Iowa
    'KS' => 'America/Chicago',    // Kansas (most of the state)
    'KY' => 'America/New_York',   // Kentucky (eastern part)
    'LA' => 'America/Chicago',    // Louisiana
    'ME' => 'America/New_York',   // Maine
    'MD' => 'America/New_York',   // Maryland
    'MA' => 'America/New_York',   // Massachusetts
    'MI' => 'America/Detroit',    // Michigan
    'MN' => 'America/Chicago',    // Minnesota
    'MS' => 'America/Chicago',    // Mississippi
    'MO' => 'America/Chicago',    // Missouri
    'MT' => 'America/Denver',     // Montana
    'NE' => 'America/Chicago',    // Nebraska (most of the state)
    'NV' => 'America/Los_Angeles', // Nevada
    'NH' => 'America/New_York',   // New Hampshire
    'NJ' => 'America/New_York',   // New Jersey
    'NM' => 'America/Denver',     // New Mexico
    'NY' => 'America/New_York',   // New York
    'NC' => 'America/New_York',   // North Carolina
    'ND' => 'America/Chicago',    // North Dakota (most of the state)
    'OH' => 'America/New_York',   // Ohio
    'OK' => 'America/Chicago',    // Oklahoma
    'OR' => 'America/Los_Angeles', // Oregon (most of the state)
    'PA' => 'America/New_York',   // Pennsylvania
    'RI' => 'America/New_York',   // Rhode Island
    'SC' => 'America/New_York',   // South Carolina
    'SD' => 'America/Chicago',    // South Dakota (most of the state)
    'TN' => 'America/Chicago',    // Tennessee (central part)
    'TX' => 'America/Chicago',    // Texas (most of the state)
    'UT' => 'America/Denver',     // Utah
    'VT' => 'America/New_York',   // Vermont
    'VA' => 'America/New_York',   // Virginia
    'WA' => 'America/Los_Angeles', // Washington
    'WV' => 'America/New_York',   // West Virginia
    'WI' => 'America/Chicago',    // Wisconsin
    'WY' => 'America/Denver'      // Wyoming
];


// Function to get timezone name from state abbreviation
function getTimezoneByState($state) {
    global $stateToTimezone;
    $state = strtoupper($state);  // Convert to uppercase for consistency
    return $stateToTimezone[$state] ?? null;
}

$timezone = getTimezoneByState($state);

// API URL with parameters
$url = "http://api.timezonedb.com/v2.1/convert-time-zone?key=$apiKey&format=json&from=America/Los_Angeles&to=$timezone&time=$timestamp";

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