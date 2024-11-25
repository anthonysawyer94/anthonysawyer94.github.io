const weatherResult = document.getElementById('weatherResult');
const container = document.getElementsByClassName('container')[0]; // Select container once

async function getWeather(lat, lon) {
    try {
        // Fetch weather data
        const response = await fetch(`https://www.anthonyjsawyer.com/weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) throw new Error('Failed to fetch weather data.');

        const weatherData = await response.json();

        // Extract relevant data
        const temp = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const city = weatherData.name;
        const description = weatherData.weather[0].main;
        const windSpeed = weatherData.wind.speed;
        const icon = weatherData.weather[0].icon; // Get weather icon

        // Remove placeholder elements
        const h1 = container.querySelector('h1');
        const ptag = container.querySelector('p');
        if (ptag) ptag.remove();
        if (h1) h1.remove();

        // Display weather data dynamically
        weatherResult.innerHTML = `
            <div class="weather-card">
                <h2 style="color: black;">${city}</h2>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
                <p><strong>Temperature:</strong> ${temp}°C</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
            </div>
        `;
    } catch (error) {
        weatherResult.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords; // Destructure coords
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

// Fetch weather data on page load
window.addEventListener('load', getLocation);
