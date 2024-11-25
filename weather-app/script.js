const weatherResult = document.getElementById('weatherResult');

async function getWeather(lat, lon) {
    try {
        const response = await fetch(`https://www.anthonyjsawyer.com/weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) throw new Error('Failed to fetch weather data.');

        const weatherData = await response.json();

        // Display the data dynamically
        weatherResult.innerHTML = `
            <h2>Weather Data</h2>
            <p><strong>Temperature:</strong> ${weatherData.main.temp}°C</p>
            <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
        `;
    } catch (error) {
        weatherResult.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeather(latitude, longitude);
            },
            (error) => {
                weatherResult.innerHTML = `<p style="color: red;">Error: Unable to retrieve location (${error.message}).</p>`;
            }
        );
    } else {
        weatherResult.innerHTML = `<p style="color: red;">Error: Geolocation is not supported by your browser.</p>`;
    }
}

// Get the user's location and fetch weather data on page load
window.addEventListener('load', getLocation);
