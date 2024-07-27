const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const openWeatherMapApiKey = process.env.OPENWEATHERMAP_API_KEY;
const apiNinjasApiKey = process.env.API_NINJAS_API_KEY;

const airports = [
    { code: 'JFK', city: 'New York', name: 'John F. Kennedy International Airport' },
    { code: 'LAX', city: 'Los Angeles', name: 'Los Angeles International Airport' },
    { code: 'ORD', city: 'Chicago', name: 'O\'Hare International Airport' },
    { code: 'ATL', city: 'Atlanta', name: 'Hartsfield-Jackson Atlanta International Airport' },
    { code: 'LHR', city: 'London', name: 'Heathrow Airport' },
];

router.get('/', async (req, res) => {
    const { iata } = req.query;

    if (!iata) {
        return res.render('airport', { airport: null, error: 'IATA code is required' });
    }

    const airportUrl = `https://api.api-ninjas.com/v1/airports?iata=${iata.toUpperCase()}`;

    try {
        // Fetch airport data using IATA code
        const airportResponse = await fetch(airportUrl, {
            headers: { 'X-Api-Key': apiNinjasApiKey }
        });
        if (!airportResponse.ok) {
            throw new Error(`API call failed with status ${airportResponse.status}`);
        }

        const airportData = await airportResponse.json();
        if (airportData.length > 0) {
            const city = airportData[0].city;

            // Fetch weather data for the city
            const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherMapApiKey}`;

            const weatherResponse = await fetch(weatherUrl);
            if (!weatherResponse.ok) {
                throw new Error(`Weather API call failed with status ${weatherResponse.status}`);
            }

            const weatherData = await weatherResponse.json();
            console.log(airportData[0].name); //  for debugging

            const airportDetails = {
                iata: iata.toUpperCase(),
                name: airportData[0].name,
                city: city,
                country: airportData[0].country,
                weather: {
                    temperature: (weatherData.main.temp - 273.15).toFixed(2),
                    description: weatherData.weather[0].description,
                    wind_speed: weatherData.wind.speed,
                    visibility: weatherData.visibility,
                    humidity: weatherData.main.humidity
                }
            };
            res.render('airport', { airport: airportDetails });
        } else {
            res.render('airport', { airport: null, error: 'No data found for the given IATA code' });
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.render('airport', { airport: null, error: 'Error retrieving data' });
    }
});

router.get('/suggestions', async (req, res) => {
    const query = req.query.query?.toUpperCase();
    if (!query) {
        return res.json([]);
    }

    const suggestions = airports
        .filter(a => a.code.startsWith(query) || a.city.toUpperCase().startsWith(query) || a.name.toUpperCase().includes(query))
        .map(a => ({ code: a.code, city: a.city, name: a.name }));

    res.json(suggestions);
});

module.exports = router;
