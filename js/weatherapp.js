const weatherResult = document.getElementById('weatherResult');
const container = document.getElementsByClassName('container')[0]; // Select container once

async function getWeather(lat, lon) {
    try {
        // Fetch weather data
        const response = await fetch(`weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) throw new Error('Failed to fetch weather data.');

        const weatherData = await response.json();

        // Extract relevant data
        const temp = Math.round(weatherData.main.temp);
        const feelsLike = Math.round(weatherData.main.feels_like);
        const humidity = weatherData.main.humidity;
        const city = weatherData.name;
        const description = weatherData.weather[0].description;
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
                <p><strong>Temperature:</strong> ${temp}°F</p>
                <p><strong>Feels Like:</strong> ${feelsLike}°F</p>
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
                const lang = navigator.language;
                //console.log('lang:', lang);
                const cookies = navigator.cookieEnabled;
                //console.log('cookies:', cookies);
                //console.log('Position Data', position);
                navigator.getBattery().then(function(battery) {
                    //console.log("Battery Level: " + battery.level * 100 + "%");
                    //console.log("Charging: " + (battery.charging ? "Yes" : "No"));
                    //console.log("Charging Time: " + battery.chargingTime + " seconds");
                    //console.log("Discharging Time: " + battery.dischargingTime + " seconds");
                });
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