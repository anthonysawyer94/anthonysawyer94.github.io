const targetDiv = document.getElementsByTagName('p')[0];

function currentWeather() {
    const apiKey = '186fce6232608c1c135ee734a641feb9';
    const lat = '39.769649';
    const lon = '-121.888385';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    return Promise.all([
        fetch(url).then(res => res.json())
        ])
}
currentWeather().then(data => {
    let weather = data[0].main.temp;
    const city = data[0].name
    weather = Math.round(((weather -273.15) * (9 / 5)) + 32);
    targetDiv.textContent += `- ${weather} °F in ${city}`;
    console.log(data);
    console.log(`Current Weather: ${weather} °F`);
});