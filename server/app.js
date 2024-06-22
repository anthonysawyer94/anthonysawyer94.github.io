const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3000;


// Serve static files from the public directory
app.use(cors({
    origin: 'https://www.anthonyjsawyer.com',
    optionsSuccessStatus: 200,
    }));

// Middleware


// API route to fetch data from NASA
app.get('/api/data', async (req, res) => {
    try {
        const KEY = process.env.API_KEY;
        const api = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${KEY}`;
        const response = await fetch(api);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
