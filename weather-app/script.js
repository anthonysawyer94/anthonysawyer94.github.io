const form = document.getElementById('locationForm');
const weatherResult = document.getElementById('weatherResult');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    try {
        const response = await fetch(`https://www.anthonyjsawyer.com/weather?lat=${latitude}&lon=${longitude}`);
        if (!response.ok) throw new Error('Failed to fetch weather data.');

        const weatherData = await response.json();

        // Display the data dynamically
        weatherResult.innerHTML = `
            <h2>Weather Data</h2>
            <p><strong>Temperature:</strong> ${weatherData.temperature}°C</p>
            <p><strong>Condition:</strong> ${weatherData.condition}</p>
            <p><strong>Humidity:</strong> ${weatherData.humidity}%</p>
        `;
    } catch (error) {
        weatherResult.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});
