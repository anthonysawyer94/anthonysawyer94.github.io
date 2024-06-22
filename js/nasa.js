//const dotenv = require('dotenv');
//const KEY = process.env.API_KEY
const api = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.API_KEY}`;

//const api = 'http://localhost:3000/api/data';

async function fetchData() {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        console.log(data);
        const length = data.photos.length;
        const marsPix = [];
        
        for (let i = 0; i < 4; i++) {
            marsPix.push(data.photos[i].img_src);
        }
        console.log('This is the pix:', marsPix);

        const element = document.getElementById('nasa');
        element.src = data.photos[8].img_src;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();