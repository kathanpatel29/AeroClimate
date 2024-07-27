const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const openWeatherMapApiKey = process.env.OPENWEATHERMAP_API_KEY;

router.get('/', (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.render('weather', { weather: null, error: 'Please provide a city' });
    }
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherMapApiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                throw new Error(data.message);
            }
            res.render('weather', { weather: { ...data, city: city }, error: null });
        })
        .catch(error => {
            res.render('weather', { weather: null, error: error.message });
        });
});

module.exports = router;
