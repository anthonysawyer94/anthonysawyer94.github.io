const weatherResult = document.getElementById('weatherResult');
const container = document.getElementsByClassName('container')[0]; // Select container once

// Fetch and display weather data
async function getWeather(lat, lon) {
    try {
        // Fetch weather data from API
        const response = await fetch(`https://www.anthonyjsawyer.com/weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) throw new Error('Failed to fetch weather data.');

        const weatherData = await response.json();

        // Remove placeholder elements
        console.log('container:', container);
        const h1 = container.querySelector('h1'); // Declare explicitly
        const ptag = container.querySelector('p');
        if (ptag) ptag.remove();
        if (h1) h1.remove();

        // Display fetched data
        weatherResult.innerHTML = `
            <h2>Weather Data</h2>
            <p><strong>Temperature:</strong> ${weatherData.main.temp}°C</p>
            <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
        `;
    } catch (error) {
        // Display error message
        weatherResult.innerHTML = `
            <p style="color: red;">Error: ${error.message}</p>
            <p>Please check your internet connection or enable location services.</p>
        `;
    }
}

// Get user's location and fetch weather data
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords; // Destructure coords
                getWeather(latitude, longitude);
            },
            (error) => {
                // Handle location errors
                weatherResult.innerHTML = `<p style="color: red;">Error: Unable to retrieve location (${error.message}).</p>`;
            }
        );
    } else {
        weatherResult.innerHTML = `<p style="color: red;">Error: Geolocation is not supported by your browser.</p>`;
    }
}

// Fetch weather data on page load
window.addEventListener('load', getLocation);
