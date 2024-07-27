# AeroClimate

AeroClimate is a simple and unique website that provides users with current weather conditions and detailed information for various airports worldwide. This project is especially useful for pilots, frequent flyers, and aviation enthusiasts.

## Project Structure

AeroClimate/ \
   ├── index.js \
   ├── routes/ \
      │ ├── index.js \
      │ ├── weather.js \
      │ ├── airport.js \
   ├── public/ \
      │ ├── stylesheets/ \
      │ │ └── style.css \
      │ ├── javascripts/ \
      │ │ └── airport.js \ 
   ├── views/ \
      │ ├── index.pug \
      │ ├── weather.pug \
      │ ├── airport.pug \
      │ ├── error.pug \
      │ ├── layout.pug \
   ├── .env \
   ├── README.md \
   ├── package.json \


## Features

1. **Home Page:** Allows users to navigate to the weather or airport information pages.
2.** Weather Details Page:** Provides detailed weather information for a selected city.
3. **Airport Information Page:** Displays detailed information about an airport including the current weather conditions.

## API Integration

- **API Ninjas:** Used for fetching detailed airport information.
- **OpenWeatherMap:** Used for fetching real-time weather data.

## Installation

1. **Clone the repository:**
   ```bash
     git clone https://github.com/kathanpatel29/AeroClimate.git
     cd aeroclimate

2. Install Dependencies
   ```bash
   npm install
3. Set up environment variables:
Create a .env file in the root directory and add the following:
.env
   ```bash
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   API_NINJAS_API_KEY=your_api_ninjas_api_key

4. Run the application
    ```bash
      npm start

**Usage**

***Weather Information:*** \
Navigate to the weather page. \
Enter a city name to get the current weather conditions. \

***Airport Information:*** \
Navigate to the airport page. \
Enter an IATA code, city name, or airport name. \
Get detailed information about the airport and the current weather conditions. \

**Code Overview** \
***index.js*** :
The main entry point of the application. Sets up the Express server and routes. \
***routes/airport.js*** :
Handles routes for fetching airport and weather data. \
***routes/weather.js*** :
Handles routes for fetching weather data. \
***public/stylesheets/style.css*** :
Contains the CSS styles for the application. \
***public/javascripts/airport.js*** :
Handles the dynamic fetching of airport suggestions as the user types in the input field. \

**views** :
Contains the Pug templates for the views. \
***layout.pug:***  The main layout template. \
***index.pug:*** The home page. \
***weather.pug:*** The weather information page. \
***airport.pug:*** The airport information page. \
***error.pug:*** The error page. \

