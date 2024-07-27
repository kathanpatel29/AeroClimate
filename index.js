require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRouter = require('./routes/index');
const airportRouter = require('./routes/airport');
const weatherRouter = require('./routes/weather');
app.use('/', indexRouter);
app.use('/airport', airportRouter);
app.use('/weather', weatherRouter);

// Error handling
app.use((req, res) => {
    res.status(404).render('error', { message: 'Page not found', error: {} });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
